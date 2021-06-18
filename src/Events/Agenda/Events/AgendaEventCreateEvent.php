<?php
namespace App\Events\Agenda\Events;

use App\Entity\Agenda\Event as AgendaEvent;
use Symfony\Contracts\EventDispatcher\Event;

class AgendaEventCreateEvent extends Event
{
  private $agenda_event;

  public function __construct(AgendaEvent $agenda_event)
  {
    $this->agenda_event = $agenda_event;
  }

  public function getAgendaEvent (): AgendaEvent
  {
    return $this->agenda_event;
  }
}