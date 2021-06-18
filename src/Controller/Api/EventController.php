<?php
namespace App\Controller\Api;

use App\Repository\Agenda\EventRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventController extends AbstractController
{
  private $dispatcher;
  private $serializer;
  private $eventRepository;

  public function __construct(
    EventDispatcherInterface $dispatcher, 
    SerializerInterface $serializer, 
    EventRepository $eventRepository
    )
  {
    $this->dispatcher = $dispatcher;
    $this->serializer = $serializer;
    $this->eventRepository = $eventRepository;
  }

  /**
   * @Route("/api/events", name="api/event_create", methods={"POST"})
   */
  public function create(Request $request)
  {
    dd($request->getContent());
  }
}