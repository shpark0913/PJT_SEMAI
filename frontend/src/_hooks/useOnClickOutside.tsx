import React, {useEffect} from 'react';

function UseOnClickOutside(ref: React.RefObject<HTMLDivElement>, handler: any) {
  useEffect(() => {
    const listener = (e:any) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler();
    }
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // clenup 함수
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }

  }, [ref, handler])
}

export default UseOnClickOutside;