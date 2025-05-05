"use client";

import { Display } from "@/app/components/Display";
import { ButtonStyle } from "@/app/components/ButtonStyle";
import { Strings } from "@/app/resources/Strings";
import { Dimens } from "@/app/resources/Dimens";
import { IncrementHook } from "@/app/hooks/IncrementHook";
import { useSystemTheme } from "@/app/services/systemTheme";
import { Theme } from "@/app/resources/Theme";
import { Styles } from "../resources/Styles";

export const HomeView = () => {
  const {
    pressed,
    manualIncrement,
    autoIncrement,
    zeroIncrement,
    stopIncrement,
    number,
  } = IncrementHook();

  useSystemTheme();

  return (
    <main
      className={`flex flex-col h-screen justify-center items-center ${Theme.system}`}
    >
      <Display n1={number.n1} n2={number.n2} />
      <section className="flex flex-row justify-evenly w-3/4 px-7">
        <ButtonStyle
          nome={Strings.nameButton.manual}
          isPressed={pressed.manual}
          style={Styles.ButtonStyles.Manual}
          onClick={manualIncrement}
        />
        <ButtonStyle
          nome={Strings.nameButton.auto}
          isPressed={pressed.auto}
          style={Styles.ButtonStyles.Auto}
          onClick={autoIncrement}
        />
      </section>
      <section
        className={`flex flex-row justify-evenly w-3/4 px-7 ${Dimens.stopZeroPadding}`}
      >
        <ButtonStyle
          nome={Strings.nameButton.stop}
          isPressed={pressed.stop}
          style={Styles.ButtonStyles.Stop}
          onClick={stopIncrement}
        />
        <ButtonStyle
          nome={Strings.nameButton.zero}
          isPressed={pressed.zero}
          style={Styles.ButtonStyles.Zero}
          onClick={zeroIncrement}
        />
      </section>
    </main>
  );
};
