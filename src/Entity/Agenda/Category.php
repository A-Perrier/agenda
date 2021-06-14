<?php

namespace App\Entity\Agenda;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\Agenda\CategoryRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 */
class Category
{
    public const CREATE_EVENT = 'category.create';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"category:fetch"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"category:fetch"})
     * @Assert\NotBlank(message="La catégorie doit avoir un nom")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=7)
     * @Groups({"category:fetch"})
     * @Assert\NotNull(message="La catégorie doit être associée à une couleur")
     */
    private $color;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }
}
