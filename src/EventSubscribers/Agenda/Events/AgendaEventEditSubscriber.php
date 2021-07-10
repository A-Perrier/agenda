<?php
namespace App\EventSubscribers\Agenda\Events;

use App\Entity\Agenda\Event as AgendaEvent;
use App\Events\Agenda\Events\AgendaEventEditEvent;
use App\Service\Validation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class AgendaEventEditSubscriber implements EventSubscriberInterface
{
  private SerializerInterface $serializer;
  private Validation $validator;
  private EntityManagerInterface $em;

  public function __construct(SerializerInterface $serializer, Validation $validator, EntityManagerInterface $em)
  {
    $this->serializer = $serializer;
    $this->validator = $validator;
    $this->em = $em;
  }

  public static function getSubscribedEvents()
  {
    return [
      AgendaEvent::EDIT_EVENT => [
        ['process', 10]
      ]
    ];
  }


  public function process (AgendaEventEditEvent $event)
  {
    $editedEvent = $event->getAgendaEvent();

    $this->serializer->deserialize($event->getData(), AgendaEvent::class, 'json', [
      AbstractNormalizer::GROUPS => 'event:edit',
      AbstractNormalizer::OBJECT_TO_POPULATE => $editedEvent
    ]);

    $this->validator->validate($editedEvent, $event);

    if (!isset($editedEvent->errors)) {
      $this->em->flush();
    }
  }
}