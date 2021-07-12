<?php
namespace App\EventSubscribers\Agenda\Events;

use App\Entity\Agenda\Event as AgendaEvent;
use App\Events\Agenda\Events\AgendaEventEditEvent;
use App\Repository\Agenda\CategoryRepository;
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
  private CategoryRepository $categoryRepository;

  public function __construct(
    SerializerInterface $serializer, 
    Validation $validator, 
    EntityManagerInterface $em, 
    CategoryRepository $categoryRepository
    )
  {
    $this->serializer = $serializer;
    $this->validator = $validator;
    $this->em = $em;
    $this->categoryRepository = $categoryRepository;
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
    $categoryName = json_decode($event->getData(), true)['category'];
    $category = $categoryName !== $editedEvent->getCategory()->getName() ? $this->categoryRepository->findOneBy(['name' => $categoryName]) : null;
    
    $this->serializer->deserialize($event->getData(), AgendaEvent::class, 'json', [
      AbstractNormalizer::GROUPS => 'event:edit',
      AbstractNormalizer::OBJECT_TO_POPULATE => $editedEvent
    ]);

    if ($category !== null) {
      $editedEvent->setCategory($category);
    }

    $this->validator->validate($editedEvent, $event);

    if (!isset($editedEvent->errors)) {
      $this->em->flush();
    }
  }
}