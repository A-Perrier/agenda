<?php
namespace App\EventSubscribers\Agenda\Categories;

use App\Entity\Agenda\Category;
use Doctrine\ORM\EntityManagerInterface;
use App\Events\Agenda\Categories\CategoryCreateEvent;
use App\Service\Validation;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CategoryCreateSubscriber implements EventSubscriberInterface
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
      Category::CREATE_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(CategoryCreateEvent $event)
  {
    $category = $event->getCategory();
    
    $this->validator->validate($category, $event);

    if (!isset($category->errors)) {
      $this->em->persist($category);
      $this->em->flush();
    }
  }
}