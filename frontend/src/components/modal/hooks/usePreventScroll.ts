import { useEffect } from 'react';
import styles from '../modal.module.css';

const usePreventScroll = () => {
  useEffect(() => {
    const scrollClassName = styles['_freeze-bg-scroll'] as string;

    // Only first mounted modal should be remove scroll class from body when unmounted
    const isFirstModal = !document.body.classList.contains(scrollClassName);

    if(isFirstModal) document.body.classList.add(scrollClassName);
    return () => {
      if(isFirstModal) document.body.classList.remove(styles['_freeze-bg-scroll'] as string);
    };
  }, []);
};

export default usePreventScroll;
