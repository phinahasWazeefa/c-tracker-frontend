"use client"
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from './breakpoints';

export default function useResponsive(){
  const isDesktop = useMediaQuery({ minWidth: breakpoints.sm+1 });
  const isMobile = useMediaQuery({ maxWidth: breakpoints.sm });
 
  return {
    isDesktop,
    isMobile,
  };
};


// minWidth is used to check if the viewport width is equal to or greater than the specified value.
// maxWidth is used to check if the viewport width is equal to or smaller than the specified value.