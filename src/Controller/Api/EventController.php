<?php
namespace App\Controller\Api;

use Exception;
use App\Repository\Agenda\EventRepository;
use App\Entity\Agenda\Event as AgendaEvent;
use App\Repository\Agenda\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Events\Agenda\Events\AgendaEventCreateEvent;
use App\Events\Agenda\Events\AgendaEventDeleteEvent;
use App\Service\Dates;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventController extends AbstractController
{
  private $dispatcher;
  private $serializer;
  private $eventRepository;
  private $categoryRepository;
  private $datesService;

  public function __construct(
    EventDispatcherInterface $dispatcher, 
    SerializerInterface $serializer, 
    EventRepository $eventRepository,
    CategoryRepository $categoryRepository,
    Dates $datesService
    )
  {
    $this->dispatcher = $dispatcher;
    $this->serializer = $serializer;
    $this->eventRepository = $eventRepository;
    $this->categoryRepository = $categoryRepository;
    $this->datesService = $datesService;
  }

  /**
   * @Route("/api/events", name="api/event_create", methods={"POST"})
   */
  public function create(Request $request)
  {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('POST')) throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);
    
    $data = json_decode($request->getContent(), true);

    $category = $this->categoryRepository->findOneBy(['name' => $data['category']]);
    if (!$category) return $this->json("Vous devez indiquer une catégorie", Response::HTTP_BAD_REQUEST);

    $agendaEvent = new AgendaEvent();
    $agendaEvent->setCategory($category)
                ->setName($data['name'])
                ->setTime($data['time'])
                ->setDate($this->datesService->frFormatToDateTime($data['date']))
    ;

    $event = new AgendaEventCreateEvent($agendaEvent);
    $this->dispatcher->dispatch($event, AgendaEvent::CREATE_EVENT);

    if (isset($agendaEvent->errors)) return $this->json($agendaEvent->errors, Response::HTTP_BAD_REQUEST);
    return $this->json(
      $this->serializer->serialize($agendaEvent, 'json', ['groups' => 'event:fetch']), 
      Response::HTTP_OK);
  }


  /**
   * @Route("/api/events/{date<[0-9]{1,2}-[0-9]{2}-[0-9]{4}>}", name="api/event_getByDate", methods={"GET"})
   */
  public function findAllByDate(Request $request, $date)
  {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('GET')) throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);
    
    $events = $this->eventRepository->findBy(['date' => $this->datesService->frFormatToDateTime($date)], ['time' => 'ASC']);
    
    return $this->json(
      $this->serializer->serialize($events, 'json', ['groups' => 'event:fetch']),
      Response::HTTP_OK
    );
  }


  /**
   * @Route("/api/events/until/{date<[0-9]{1,2}-[0-9]{2}-[0-9]{4}>}", name="api/event_getUntil", methods={"GET"})
   */
  public function findAllUntil(Request $request, $date)
  {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('GET')) throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);

    // On veut créer une requête qui ira collecter les bons évènements
    $events = $this->eventRepository->findFromNowUntil($this->datesService->frFormatToEng($date), ['date' => 'ASC']);

    return $this->json(
      $this->serializer->serialize($events, 'json', ['groups' => 'event:fetch']),
      Response::HTTP_OK
    );
  }


  /**
   * @Route("/api/events", name="api/event_findAll", methods={"GET"})
   */
  public function findAll(Request $request)
  {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('GET')) throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);
    
    $events = $this->eventRepository->findBy([], ['time' => 'ASC']);

    return $this->json(
      $this->serializer->serialize($events, 'json', ['groups' => 'event:fetch']),
      Response::HTTP_OK
    );
  }


  /**
   * @Route("/api/events/{id<\d+>}", name="api/event_delete", methods={"DELETE"})
   */
  public function delete(Request $request, int $id) {
    if (
        !$request->isXmlHttpRequest() || 
        !$request->isMethod('DELETE') ||
        !$id
      )
        throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);
      
    $event = $this->eventRepository->find($id);
    if (!$event) return $this->json("Merci de ne pas altérer les données", Response::HTTP_NOT_FOUND);

    $event = new AgendaEventDeleteEvent($event);
    $this->dispatcher->dispatch($event, AgendaEvent::DELETE_EVENT);
  
    return $this->json(Response::HTTP_OK, Response::HTTP_OK);
  }
}