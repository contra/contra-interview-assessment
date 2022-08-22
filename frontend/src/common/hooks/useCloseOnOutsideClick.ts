import { useEffect } from "react";

const useCloseOnOutsideClick = (
  insideRef :  React.RefObject<HTMLElement | null>,
  outsideRef :  React.RefObject<HTMLElement | null>,
  handler : (event: React.MouseEvent) => void
  ) => {
  useEffect(() => {
    const listener = (event : MouseEvent | TouchEvent) => {
      if (!insideRef.current || insideRef.current.contains(event.target)) {
        return;
      }
      if (outsideRef.current) {
        if (outsideRef.current.contains(event.target)) {
          handler(event);
        }
        return;
      } else {
        handler(event);
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [insideRef, outsideRef, handler]);
};

export default useCloseOnOutsideClick;