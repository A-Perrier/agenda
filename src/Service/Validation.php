<?php
namespace App\Service;

use App\Interfaces\EventInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class Validation 
{
  private $validator;

  public function __construct(ValidatorInterface $validator)
  {
    $this->validator = $validator;
  }


  public function validate(object $component, ?EventInterface $event = null)
  {
    $errors = $this->validator->validate($component);

    $parsedErrors = [];

    if (count($errors) > 0) {

        for ($i = 0; $i < count($errors); $i++) {
            $parsedErrors[$errors->get($i)->getPropertyPath()] = $errors->get($i)->getMessage();
        }

        if ($event) $event->stopPropagation();
        $component->errors = $parsedErrors;
    }

    return $errors;
  }
}