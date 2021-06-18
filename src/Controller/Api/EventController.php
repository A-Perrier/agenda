<?php
namespace App\Controller\Api;

use App\Entity\Agenda\Event as AgendaEvent;
use App\Events\Agenda\Events\AgendaEventCreateEvent;
use App\Repository\Agenda\CategoryRepository;
use Exception;
use App\Repository\Agenda\EventRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventController extends AbstractController
{
  private $dispatcher;
  private $serializer;
  private $eventRepository;
  private $categoryRepository;

  public function __construct(
    EventDispatcherInterface $dispatcher, 
    SerializerInterface $serializer, 
    EventRepository $eventRepository,
    CategoryRepository $categoryRepository
    )
  {
    $this->dispatcher = $dispatcher;
    $this->serializer = $serializer;
    $this->eventRepository = $eventRepository;
    $this->categoryRepository = $categoryRepository;
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
                ->setDate($data['date'])
    ;

    $event = new AgendaEventCreateEvent($agendaEvent);
    $this->dispatcher->dispatch($event, AgendaEvent::CREATE_EVENT);

    if (isset($agendaEvent->errors)) return $this->json($agendaEvent->errors, Response::HTTP_BAD_REQUEST);
    return $this->json($agendaEvent->getId(), Response::HTTP_OK);
  }


  /**
   * @Route("/api/events/{date<([0-9]{2}-){2}[0-9]{4}>}", name="api/event_getByDate", methods={"GET"})
   */
  public function findAllByDate(Request $request, $date)
  {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('GET')) throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);
    
    $events = $this->eventRepository->findBy(['date' => $date]);
    
    return $this->json(
      $this->serializer->serialize($events, 'json', ['groups' => 'event:fetch']),
      Response::HTTP_OK
    );
  }
}