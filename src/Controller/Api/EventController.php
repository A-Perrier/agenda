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
    ;

    $event = new AgendaEventCreateEvent($agendaEvent);
    $this->dispatcher->dispatch($event, AgendaEvent::CREATE_EVENT);
    
    return $this->json($agendaEvent->getId(), Response::HTTP_OK);
  }
}