import React from 'react';

const RightIcon = ({onClick = null, fill = null}) => {
  return (
  <svg 
    onClick={onClick} 
    fill={ fill ? fill : '#F9FBFF' }
    className="icon" width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="25" height="25" rx="2.5" stroke="#D2DEEE"/>
  <path d="M10.3672 17.8336C10.1768 17.4709 10.25 17.0259 10.5467 16.7434L13.7169 13.7241C14.1307 13.33 14.1307 12.6699 13.7169 12.2758L10.5467 9.25655C10.25 8.97404 10.1768 8.52904 10.3672 8.16634C10.6502 7.62722 11.3705 7.50865 11.8114 7.92858L16.376 12.2758C16.7898 12.6699 16.7898 13.33 16.376 13.7241L11.8114 18.0714C11.3705 18.4913 10.6502 18.3727 10.3672 17.8336Z" fill="#D2DEEE"/>
  </svg>
  )
}

const LeftIcon = ({onClick = null, fill = null}) => {
  return (
  <svg 
    onClick={onClick} 
    fill={ fill ? fill : '#F9FBFF' }
    className="icon" width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="25" height="25" rx="2.5" stroke="#D2DEEE"/>
  <path d="M15.6328 8.16592C15.8232 8.52862 15.75 8.97361 15.4533 9.25612L12.2831 12.2754C11.8693 12.6695 11.8693 13.3296 12.2831 13.7237L15.4533 16.743C15.75 17.0255 15.8232 17.4705 15.6328 17.8332C15.3498 18.3723 14.6295 18.4909 14.1886 18.0709L9.62398 13.7237C9.21019 13.3296 9.21019 12.6695 9.62398 12.2754L14.1886 7.92816C14.6295 7.50822 15.3498 7.6268 15.6328 8.16592Z" fill="#D2DEEE"/>
  </svg>
  )
}

export {
  RightIcon,
  LeftIcon
}