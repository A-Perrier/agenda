<?php
namespace App\EventSubscribers\Agenda\Categories;

use App\Entity\Agenda\Category;
use Doctrine\ORM\EntityManagerInterface;
use App\Events\Agenda\Categories\CategoryCreateEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CategoryCreateSubscriber implements EventSubscriberInterface
{
  private $em;

  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
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
    
    $this->em->persist($category);
    $this->em->flush();
  }
}