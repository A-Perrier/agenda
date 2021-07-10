<?php
namespace App\Events\Agenda\Events;

use App\Entity\Agenda\Event as AgendaEvent;
use App\Interfaces\EventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class AgendaEventEditEvent extends Event implements EventInterface
{
  private AgendaEvent $agenda_event;
  private $data;

  public function __construct (AgendaEvent $agenda_event, $data)
  {
    $this->agenda_event = $agenda_event;
    $this->data = $data;
  }

  public function getAgendaEvent (): AgendaEvent
  {
    return $this->agenda_event;
  }

  public function getData ()
  {
    return $this->data;
  }
}