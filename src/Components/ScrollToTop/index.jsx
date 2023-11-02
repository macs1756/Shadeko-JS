import React from 'react';
import { useLocation } from 'react-router';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const el = document.getElementById('wr'); // id of the parent
    if (el) {
      el.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;



