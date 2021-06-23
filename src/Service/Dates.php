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
}