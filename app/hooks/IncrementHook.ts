/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import ButtonType from "@/app/enum/ButtonType";

const IncrementHook = () => {
  const [number, setNumber] = useState({ n1: 0, n2: 0 });

  const [pressed, setPressed] = useState({
    [ButtonType.MANUAL]: false,
    [ButtonType.AUTO]: false,
    [ButtonType.ZERO]: false,
    [ButtonType.STOP]: false,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function animateButton(name: ButtonType) {
    setPressed((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setPressed((prev) => ({ ...prev, [name]: false }));
    }, 100);
  }

  function manualIncrement() {
    if (!intervalRef.current) {
      animateButton(ButtonType.MANUAL);
      const job = setTimeout(() => {
        setNumber((prev) => ({ ...prev, n1: prev.n1 + 1 }));
        intervalRef.current = null;
      }, 1000);
      intervalRef.current = job;
    }
  }

  function autoIncrement() {
    if (!intervalRef.current) {
      animateButton(ButtonType.AUTO);
      const job = setInterval(() => {
        setNumber((prev) => ({ ...prev, n1: prev.n1 + 1 }));
      }, 1000);
      intervalRef.current = job;
    }
  }

  function zeroIncrement() {
    if (number.n1 > 0 || number.n2 > 0) {
      animateButton(ButtonType.ZERO);
      setNumber((prev) => ({ n1: (prev.n1 = 0), n2: (prev.n2 = 0) }));
    }
    if (intervalRef.current) {
      animateButton(ButtonType.ZERO);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function stopIncrement() {
    if (intervalRef.current) {
      animateButton(ButtonType.STOP);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (number.n2 > 0) setNumber((prev) => ({ ...prev, n2: prev.n2 - 1 }));
      setNumber((prev) => ({ ...prev, n2: prev.n2 + number.n1 }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [number.n1]);

  return {
    pressed,
    manualIncrement,
    autoIncrement,
    zeroIncrement,
    stopIncrement,
    number,
  };
};

export default IncrementHook;
