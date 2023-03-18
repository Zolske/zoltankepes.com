import { useState } from "react";
import { useEffect } from "react";

export default function ButtonToggle({
  tipLeft = "on",
  tipRight = "off",
  ariaLeft = "",
  ariaRight = "",
  size = "sm",
  style = 3,
  onOff = true,
  disable = false,
  switchRight = false,
  switchOff = false,
  callBack = () => {},
}) {
  const [toggleStyle, setToggleStyle] = useState(
    switchRight
      ? onOff
        ? "translate-x-[24px]"
        : "translate-x-[39px]"
      : "translate-x-0"
  );
  const [buttonOff, setButtonOff] = useState(false);

  useEffect(() => {
    if (switchOff && onOff) {
      setToggleStyle("translate-x-[24px]");
      setButtonOff(true);
    }
  }, [onOff, switchOff]);

  if (ariaLeft === "" && tipLeft !== "on") {
    ariaLeft = tipLeft;
  }
  if (ariaRight === "" && tipRight !== "off") {
    ariaRight = tipRight;
  }

  // >>> start >>> function runs when button is clicked
  function handleClick() {
    if (!disable) {
      callBack();
      setToggleStyle(
        toggleStyle === "translate-x-0"
          ? onOff
            ? "translate-x-[24px]"
            : "translate-x-[39px]"
          : "translate-x-0"
      );
      if (onOff) {
        setButtonOff(buttonOff === true ? false : true);
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
        "border-2 border-primary-500 bg-primary-500 hover:bg-primary-600 group shadow-xl";
      ballStyle =
        "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100";
      break;
    case 2:
      buttonStyle =
        "border-2 border-primary-300 bg-primary-300 hover:bg-primary-600 group shadow-xl";
      ballStyle =
        "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100";
      break;
    case 3:
      buttonStyle =
        "border-2 border-primary-400  hover:bg-primary-600 group shadow-xl";
      ballStyle =
        "bg-primary-400 group-hover:bg-primary-100 text-primary-400 group-hover:text-primary-100";
      break;
  }
  // <<< end <<< button style, depending on the "style" Prop

  const buttonOffStyle =
    "border-2 border-neutral-300 bg-neutral-200 group shadow-none border-dashed";
  const buttonOffBallStyle =
    "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100 ";
  const buttonDisabled =
    "border-2 border-neutral-300 bg-neutral-200 opacity-60 cursor-default shadow-none border-dotted";
  const buttonBallDisabled =
    "bg-[#FFFFFF] text-[#FFFFFF] opacity-75 cursor-default";

  // >>> start >>> size values, depending on "size" Prop
  let height = "h-[16px]";
  let width = onOff ? "w-[26px]" : "w-[41px]";
  let heightBall = "h-[18px]";
  let widthBall = "w-[18px]";
  switch (size) {
    case "sm":
      height = "h-[32px]";
      width = onOff ? "w-[56px]" : "w-[71px]";
      heightBall = "h-[24px]";
      widthBall = "w-[24px]";
      break;
    case "base":
      height = "h-[41px]";
      width = onOff ? "w-[62px]" : "w-[77px]";
      heightBall = "h-[30px]";
      widthBall = "w-[30px]";
      break;
  }
  // <<< end <<< size values, depending on "size" Prop

  return (
    <>
      <button
        className={`m-2 ${
          disable ? buttonDisabled : buttonOff ? buttonOffStyle : buttonStyle
        } ${width} ${height} rounded-full`}
        title={
          disable
            ? "Button is disabled."
            : toggleStyle === "translate-x-0"
            ? tipLeft
            : tipRight
        }
        aria-label={
          disable
            ? "Button is disabled."
            : toggleStyle === "translate-x-0"
            ? ariaLeft
            : ariaRight
        }
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
