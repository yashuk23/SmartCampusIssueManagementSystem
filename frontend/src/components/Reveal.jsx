import { useEffect, useRef, useState } from "react";

const Reveal = ({ children, className = "" }) => {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`reveal-on-scroll${visible ? " revealed" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
};

export default Reveal;
