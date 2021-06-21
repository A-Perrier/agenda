<?php
namespace App\EventSubscribers\Agenda\Events;

use App\Entity\Agenda\Event as AgendaEvent;
use App\Events\Agenda\Events\AgendaEventDeleteEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AgendaEventDeleteSubscriber implements EventSubscriberInterface
{

  private $em;

  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  public static function getSubscribedEvents()
  {
    return [
      AgendaEvent::DELETE_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(AgendaEventDeleteEvent $event)
  {
    $agenda_event = $event->getAgendaEvent();
    
    $this->em->remove($agenda_event);
    $this->em->flush();
  }
}