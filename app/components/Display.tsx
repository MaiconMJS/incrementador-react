import DisplayProps from "@/app/props/DisplayProps";
import Dimens from "@/app/resources/Dimens";

const Display = ({ n1, n2 }: DisplayProps) => {
  return (
    <section
      className={`flex flex-row justify-evenly w-3/4 ${Dimens.displayPadding}`}
    >
      <p
        className={`${Dimens.displayTextSize} font-extrabold text-blue-600/100 dark:text-blue-500/100`}
      >
        N1: {n1}
      </p>
      <p
        className={`${Dimens.displayTextSize} font-extrabold text-blue-600/100 dark:text-blue-500/100`}
      >
        N2: {n2}
      </p>
    </section>
  );
};
export default Display;
