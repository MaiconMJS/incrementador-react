import ButtonProps from "@/app/props/ButtonProps";
import Dimens from "@/app/Dimens";

const ButtonStyle = ({ nome, style, isPressed, onClick }: ButtonProps) => {
  return (
    <button
      className={`transition-transform duration-150} ${
        isPressed ? Dimens.scale.pressed : Dimens.scale.release
      } ${style}`}
      onClick={onClick}
    >
      {nome}
    </button>
  );
};
export default ButtonStyle;
