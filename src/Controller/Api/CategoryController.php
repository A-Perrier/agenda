<?php
namespace App\Controller\Api;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CategoryController extends AbstractController
{
  private $dispatcher;

  /**
   * @Route("/api/categories", name="api/category_create", methods={"POST"})
   */
  public function create(Request $request) {
    dd($request->getContent());
  }

}