<?php
namespace App\EventSubscribers\Agenda\Events;

use App\Entity\Agenda\Event as AgendaEvent;
use App\Events\Agenda\Events\AgendaEventCreateEvent;
use App\Service\Validation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AgendaEventCreateSubscriber implements EventSubscriberInterface
{

  private $em;
  private $validator;

  public function __construct(EntityManagerInterface $em, Validation $validator)
  {
    $this->em = $em;
    $this->validator = $validator;
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

    $this->validator->validate($agenda_event, $event);

    if (!isset($agenda_event->errors)) {
      $this->em->persist($agenda_event);
      $this->em->flush();
    }
  }
}