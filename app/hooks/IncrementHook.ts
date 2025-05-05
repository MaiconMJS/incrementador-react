/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { ButtonType } from "@/app/enum/ButtonType";
import { NumberType } from "@/app/enum/NumberType";

export const IncrementHook = () => {
  const [number, setNumber] = useState({
    [NumberType.N1]: 0,
    [NumberType.N2]: 0,
  });

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
          setNumber((prev) => ({
            ...prev,
            [NumberType.N1]: prev[NumberType.N1] + 1,
          }));
        }, 1000);
        intervalRef.current = job;
      } else {
        animateButton(buttonType);
        const job = setTimeout(() => {
          setNumber((prev) => ({
            ...prev,
            [NumberType.N1]: prev[NumberType.N1] + 1,
          }));
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
    if (number[NumberType.N1] > 0 || number[NumberType.N2] > 0) {
      animateButton(ButtonType.ZERO);
      setNumber({ [NumberType.N1]: 0, [NumberType.N2]: 0 });
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
      if (number[NumberType.N2] > 0)
        setNumber((prev) => ({
          ...prev,
          [NumberType.N2]: prev[NumberType.N2] - 1,
        }));
      setNumber((prev) => ({
        ...prev,
        [NumberType.N2]: prev[NumberType.N2] + number[NumberType.N1],
      }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [number[NumberType.N1]]);

  return {
    pressed,
    manualIncrement,
    autoIncrement,
    zeroIncrement,
    stopIncrement,
    number,
  };
};
