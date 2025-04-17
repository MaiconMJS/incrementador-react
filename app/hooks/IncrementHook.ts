/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";

const IncrementHook = () => {
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);

  const [pressed, setPressed] = useState({
    manual: false,
    auto: false,
    zero: false,
    stop: false,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function animateButton(name: keyof typeof pressed) {
    setPressed((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setPressed((prev) => ({ ...prev, [name]: false }));
    }, 100);
  }

  function manualIncrement() {
    if (!intervalRef.current) {
      animateButton("manual");
      const job = setTimeout(() => {
        setN1((prev) => prev + 1);
        intervalRef.current = null;
      }, 1000);
      intervalRef.current = job;
    }
  }

  function autoIncrement() {
    if (!intervalRef.current) {
      animateButton("auto");
      const job = setInterval(() => {
        setN1((prev) => prev + 1);
      }, 1000);
      intervalRef.current = job;
    }
  }

  function zeroIncrement() {
    if (n1 > 0 || n2 > 0) {
      animateButton("zero");
      setN1(0);
      setN2(0);
    }
    if (intervalRef.current) {
      animateButton("zero");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function stopIncrement() {
    if (intervalRef.current) {
      animateButton("stop");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (n2 > 0) setN2((prev) => prev - 1);
      setN2((prev) => prev + n1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [n1]);

  return {
    pressed,
    manualIncrement,
    autoIncrement,
    zeroIncrement,
    stopIncrement,
    n1,
    n2,
  };
};

export default IncrementHook;
