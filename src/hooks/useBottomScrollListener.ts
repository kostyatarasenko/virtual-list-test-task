import { useEffect } from 'react';

const useBottomScrollListener = (onBottom: () => void, offset: number = 0) => {
  const handleScroll = () => {
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
    if (isAtBottom) {
      onBottom();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};
export default useBottomScrollListener;
