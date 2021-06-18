<?php
namespace App\EventSubscribers\Agenda\Events;

use App\Entity\Agenda\Event as AgendaEvent;
use App\Events\Agenda\Events\AgendaEventCreateEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AgendaEventCreateSubscriber implements EventSubscriberInterface
{

  private $em;

  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  public static function getSubscribedEvents()
  {
    return [
      AgendaEvent::CREATE_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(AgendaEventCreateEvent $event)
  {
    $agenda_event = $event->getAgendaEvent();

    $this->em->persist($agenda_event);
    $this->em->flush();
  }
}