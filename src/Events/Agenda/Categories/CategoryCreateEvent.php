<?php
namespace App\Events\Agenda\Categories;

use App\Entity\Agenda\Category;
use App\Interfaces\EventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class CategoryCreateEvent extends Event implements EventInterface
{
  private $category;

  public function __construct(Category $category)
  {
    $this->category = $category;
  }

  public function getCategory(): Category
  {
    return $this->category;
  }

}