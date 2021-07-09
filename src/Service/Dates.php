<?php
namespace App\Service;

use DateTime;

class Dates
{

  /**
   * Takes a date string in french format (e.g. 23-06-2021) and makes it a DateTime object
   *
   * @param string $date
   * @return DateTime
   */
  public function frFormatToDateTime (string $date): DateTime
  {
    $exploded = explode('-', $date);
    $day = $exploded[0];
    $month = $exploded[1];
    $year = $exploded[2];
  
    return new DateTime("{$year}-{$month}-{$day}");
  }


  /**
   * Takes a date string in french format (e.g. 23-06-2021) and makes it suitable for a database query
   *
   * @param string $date
   * @return string
   */
  public function frFormatToEng (string $date): string
  {
    $exploded = explode('-', $date);
    $day = $exploded[0];
    $month = $exploded[1];
    $year = $exploded[2];
  
    return "{$year}-{$month}-{$day}";
  }
}