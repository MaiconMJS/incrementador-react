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
    manualIncrementORAutoIncrement(ButtonType.MANUAL, false);
  }

  function manualIncrementORAutoIncrement(
    buttonType: ButtonType,
    temporizador: boolean
  ) {
    if (!intervalRef.current) {
      if (temporizador) {
        animateButton(buttonType);
        const job = setInterval(() => {
          setNumber((prev) => ({ ...prev, n1: prev.n1 + 1 }));
        }, 1000);
        intervalRef.current = job;
      } else {
        animateButton(buttonType);
        const job = setTimeout(() => {
          setNumber((prev) => ({ ...prev, n1: prev.n1 + 1 }));
          intervalRef.current = null;
        }, 1000);
        intervalRef.current = job;
      }
    }
  }

  function autoIncrement() {
    manualIncrementORAutoIncrement(ButtonType.AUTO, true);
  }

  function zeroIncrement() {
    if (number.n1 > 0 || number.n2 > 0) {
      animateButton(ButtonType.ZERO);
      setNumber({ n1: 0, n2: 0 });
    }
    clearIntervalCaseStopOrZero(ButtonType.ZERO);
  }

  function clearIntervalCaseStopOrZero(buttonType: ButtonType) {
    if (intervalRef.current) {
      animateButton(buttonType);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function stopIncrement() {
    clearIntervalCaseStopOrZero(ButtonType.STOP);
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
