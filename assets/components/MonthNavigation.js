import React from 'react';
import { RightIcon, LeftIcon } from '../shared/svg'

const MonthNavigation = ({ children }) => {

  return ( 
    <div className="month-navigation">
      { children }
    </div>
   );
}
 
export default MonthNavigation;