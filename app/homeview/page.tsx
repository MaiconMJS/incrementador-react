"use client";

import Display from "@/app/components/Display";
import ButtonStyle from "@/app/components/ButtonStyle";
import Names from "@/app/resources/Names";
import Dimens from "@/app/resources/Dimens";
import IncrementHook from "@/app/hooks/IncrementHook";
import useSystemTheme from "@/app/services/systemTheme";
import Theme from "@/app/resources/Theme";

const HomeView = () => {
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
          nome={Names.nameButton.manual}
          isPressed={pressed.manual}
          style="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 focus:ring-blue-300 font-medium rounded-full text-xs px-5 w-50 py-2.5 h-12 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={manualIncrement}
        />
        <ButtonStyle
          nome={Names.nameButton.auto}
          isPressed={pressed.auto}
          style="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-0 focus:ring-green-300 font-medium rounded-full text-xs px-5 w-50 h-12 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={autoIncrement}
        />
      </section>
      <section
        className={`flex flex-row justify-evenly w-3/4 px-7 ${Dimens.stopZeroPadding}`}
      >
        <ButtonStyle
          nome={Names.nameButton.stop}
          isPressed={pressed.stop}
          style="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-0 focus:ring-red-300 font-medium rounded-full text-xs px-5 py-2.5 text-center w-50 h-12 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={stopIncrement}
        />
        <ButtonStyle
          nome={Names.nameButton.zero}
          isPressed={pressed.zero}
          style="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-0 focus:ring-gray-300 font-medium rounded-full text-xs px-5 py-2.5 w-50 h-12 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={zeroIncrement}
        />
      </section>
    </main>
  );
};

export default HomeView;
