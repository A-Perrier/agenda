<?php
namespace App\EventSubscribers\Agenda\Categories;

use App\Entity\Agenda\Category;
use Doctrine\ORM\EntityManagerInterface;
use App\Events\Agenda\Categories\CategoryDeleteEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CategoryDeleteSubscriber implements EventSubscriberInterface
{
  private $em;

  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  public static function getSubscribedEvents()
  {
    return [
      Category::DELETE_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(CategoryDeleteEvent $event)
  {
    $category = $event->getCategory();
    
    $this->em->remove($category);
    $this->em->flush();
  }
}