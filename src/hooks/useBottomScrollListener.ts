import { useEffect, RefObject } from 'react';

const useBottomScrollListener = (
  onBottom: () => void,
  offset: number = 0,
  ref?: RefObject<HTMLElement>
) => {
  const handleScroll = () => {
    let isAtBottom = false;

    if (!ref) {
      isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
    } else if (ref.current) {
      const element = ref.current;
      isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + offset;
    }

    if (isAtBottom) {
      onBottom();
    }
  };

  useEffect(() => {
    const target = ref?.current || window;

    target.addEventListener('scroll', handleScroll);

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [ref, offset, onBottom]);
};

export default useBottomScrollListener;
