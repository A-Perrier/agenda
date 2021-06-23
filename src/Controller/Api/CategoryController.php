<?php
namespace App\Controller\Api;

use App\Entity\Agenda\Category;
use App\Events\Agenda\Categories\CategoryCreateEvent;
use App\Events\Agenda\Categories\CategoryDeleteEvent;
use App\Http\HTTP;
use App\Repository\Agenda\CategoryRepository;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
{
  private $dispatcher;
  private $serializer;
  private $categoryRepository;

  public function __construct(
    EventDispatcherInterface $dispatcher, 
    SerializerInterface $serializer, 
    CategoryRepository $categoryRepository
    )
  {
    $this->dispatcher = $dispatcher;
    $this->serializer = $serializer;
    $this->categoryRepository = $categoryRepository;
  }

  /**
   * @Route("/api/categories", name="api/category_create", methods={"POST"})
   */
  public function create(Request $request) {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('POST')) throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);

    $category = $this->serializer->deserialize($request->getContent(), Category::class, 'json');

    $event = new CategoryCreateEvent($category);
    $this->dispatcher->dispatch($event, Category::CREATE_EVENT);
    
    if (isset($category->errors)) return $this->json($category->errors, Response::HTTP_BAD_REQUEST);

    return $this->json($category->getId(), Response::HTTP_CREATED);
  }

  /**
   * @Route("/api/categories", name="api/category_findAll", methods={"GET"})
   */
  public function findAll(Request $request) {
    if (!$request->isXmlHttpRequest() || !$request->isMethod('GET')) throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);

    $categories = $this->categoryRepository->findAll();

    return $this->json(
      $this->serializer->serialize($categories, 'json', ['groups' => 'category:fetch']), 
      Response::HTTP_OK
    );
  }

  /**
   * @Route("/api/categories/{id<\d+>}", name="api/category_delete", methods={"DELETE"})
   */
  public function delete(Request $request, int $id) {
    if (
        !$request->isXmlHttpRequest() || 
        !$request->isMethod('DELETE') ||
        !$id
      )
        throw new Exception("Aucune action possible à cet endroit", Response::HTTP_BAD_REQUEST);
      
    $category = $this->categoryRepository->find($id);
    if (!$category) return $this->json("Merci de ne pas altérer les données", Response::HTTP_NOT_FOUND);

    $event = new CategoryDeleteEvent($category);
    $this->dispatcher->dispatch($event, Category::DELETE_EVENT);
  
    return $this->json(Response::HTTP_OK, Response::HTTP_OK);
  }

}