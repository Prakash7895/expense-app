import { useEffect, useState } from 'react';

const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function resizeHandler(e: any) {
      setWidth(e.target.innerWidth);
    }
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return width;
};

export default useResize;
