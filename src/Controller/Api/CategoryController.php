<?php
namespace App\Controller\Api;

use App\Entity\Agenda\Category;
use App\Events\Agenda\Categories\CategoryCreateEvent;
use App\Http\HTTP;
use App\Repository\Agenda\CategoryRepository;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
{
  private $dispatcher;
  private $serializer;

  public function __construct(EventDispatcherInterface $dispatcher, SerializerInterface $serializer)
  {
    $this->dispatcher = $dispatcher;
    $this->serializer = $serializer;
  }

  /**
   * @Route("/api/categories", name="api/category_create", methods={"POST"})
   */
  public function create(Request $request) {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('POST')) throw new Exception("Aucune action possible à cet endroit", HTTP::BAD_REQUEST);

    $category = $this->serializer->deserialize($request->getContent(), Category::class, 'json');

    $event = new CategoryCreateEvent($category);
    $this->dispatcher->dispatch($event, Category::CREATE_EVENT);

    return $this->json($category->getId(), HTTP::CREATED);
  }

  /**
   * @Route("/api/categories", name="api/category_findAll", methods={"GET"})
   */
  public function findAll(Request $request, CategoryRepository $categoryRepository) {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('GET')) throw new Exception("Aucune action possible à cet endroit", HTTP::BAD_REQUEST);

    $categories = $categoryRepository->findAll();

    return $this->json(
      $this->serializer->serialize($categories, 'json', ['groups' => 'category:fetch']), 
      HTTP::OK
    );
  }

}