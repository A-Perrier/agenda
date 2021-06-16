<?php
namespace App\Events\Agenda\Categories;

use App\Entity\Agenda\Category;
use Symfony\Contracts\EventDispatcher\Event;

class CategoryDeleteEvent extends Event
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