import { useState } from "react";

export default function ButtonToggle({
  tip = "",
  size = "sm",
  style = 3,
  callBack = () => "do nothing, overwrite if needed",
  onOff = true,
  disable = false,
}) {
  const [toggleStyle, setToggleStyle] = useState("translate-x-0");
  const [buttonOff, setButtonOff] = useState(false);

  // >>> start >>> function runs when button is clicked
  function handleClick() {
    if (!disable) {
      setToggleStyle(
        toggleStyle === "translate-x-0" ? "translate-x-[22px]" : "translate-x-0"
      );
      if (onOff) {
        setButtonOff(buttonOff === true ? false : true);
        callBack();
      }
    }
  }
  // <<< end <<< function runs when button is clicked

  // >>> start >>> button style, depending on the "style" Prop
  let buttonStyle = "";
  let ballStyle = "";
  switch (style) {
    case 1:
      buttonStyle =
        "border border-primary-500 bg-primary-500 hover:bg-primary-600 group";
      ballStyle =
        "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100";
      break;
    case 2:
      buttonStyle =
        "border border-primary-300 bg-primary-300 hover:bg-primary-600 group";
      ballStyle =
        "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100";
      break;
    case 3:
      buttonStyle =
        "border border-primary-400 bg-primary-100 hover:bg-primary-600 group";
      ballStyle =
        "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100";
      break;
  }
  // <<< end <<< button style, depending on the "style" Prop

  const buttonOffStyle = "border border-neutral-200 bg-neutral-200 group";
  const buttonOffBallStyle =
    "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100";
  const buttonDisabled =
    "border border-neutral-200 bg-neutral-200 opacity-75 cursor-default";
  const buttonBallDisabled =
    "bg-[#FFFFFF] text-[#FFFFFF] opacity-75 cursor-default";

  // >>> start >>> size values, depending on "size" Prop
  let height = "h-[16px]";
  let width = "w-[26px]";
  let heightBall = "h-[18px]";
  let widthBall = "w-[18px]";
  switch (size) {
    case "sm":
      height = "h-[30px]";
      width = "w-[54px]";
      heightBall = "h-[24px]";
      widthBall = "w-[24px]";
      break;
    case "base":
      height = "h-[36px]";
      width = "w-[58px]";
      heightBall = "h-[30px]";
      widthBall = "w-[30px]";
      break;
  }
  // <<< end <<< size values, depending on "size" Prop

  return (
    <>
      <button
        className={`shadow-xl m-2 ${
          disable ? buttonDisabled : buttonOff ? buttonOffStyle : buttonStyle
        } ${width} ${height} rounded-full`}
        title={disable ? "Button is disabled" : tip}
        onClick={handleClick}
      >
        <div
          className={`${widthBall} ${heightBall} ${
            disable
              ? buttonBallDisabled
              : buttonOff
              ? buttonOffBallStyle
              : ballStyle
          } ${toggleStyle} rounded-full m-[2px]`}
        >
          {/* the dot below needs to stay so the ButtonToggle lines up with Buttons when put in a line next to each other */}
          .
        </div>
      </button>
    </>
  );
}
