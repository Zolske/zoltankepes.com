export default function Button({
  tip = "",
  size = "sm",
  title = "click me",
  style = 3,
  type = "button",
  aria = "",
  disable = false,
  iconLeft = <></>,
  iconRight = <></>,
  padding = "pl-2 pr-2 pt-1 pb-1",
  margin = "m-2",
  border = "primary-400",
  border_width = "2",
  text_color = "primary-500",
  hover_bg = "primary-600",
  hover_text_color = "[#FFFFFF]",
  bg = "",
  callBack = () => {},
}) {
  let buttonStyle = "";
  if (!disable) {
    switch (style) {
      case 1:
        buttonStyle =
          "border border-primary-500 border-2 bg-primary-500 text-[#FFFFFF] font-black hover:bg-primary-600 hover:border-primary-500 shadow-md";
        break;
      case 2:
        buttonStyle =
          "border border-primary-300 border-2 bg-primary-300 text-[#FFFFFF] font-black hover:bg-primary-600 hover:border-primary-300 shadow-md";
        break;
      case 3:
        // buttonStyle =
        //   "border border-primary-400 border-2 text-primary-500 font-black hover:bg-primary-600 hover:text-[#FFFFFF] shadow-md";
        buttonStyle = `border border-${border} border-${border_width} bg-${bg} text-${text_color} font-black hover:bg-${hover_bg} hover:text-${hover_text_color} shadow-md`;
        break;
      case 4:
        buttonStyle =
          "border border-neutral-300 border-2 text-neutral-400 font-black hover:bg-primary-600 hover:text-[#FFFFFF] shadow-md";
        break;
      case 5:
        buttonStyle =
          "border border-red-500 border-2 bg-red-600 text-[#fff] font-black hover:bg-primary-600 hover:text-[#FFFFFF] shadow-md";
        break;
      case 6:
        buttonStyle =
          "border border-red-500 border-2 text-red-600 font-black hover:bg-primary-600 hover:text-[#FFFFFF] shadow-md";
        break;
      case 7:
        buttonStyle =
          "border border-green-500 border-2 bg-green-600 text-[#fff] font-black hover:bg-primary-600 hover:text-[#FFFFFF] shadow-md";
        break;
      case 8:
        buttonStyle =
          "border border-green-500 border-2 text-green-600 font-black hover:bg-primary-600 hover:text-[#FFFFFF] shadow-md";
        break;
    }
  } else {
    buttonStyle =
      "border border-neutral-300 border-2 text-neutral-400 bg-neutral-200 cursor-default shadow-none border-dotted";
  }

  function handleClick() {
    if (!disable) {
      callBack();
    }
  }

  return (
    <>
      {type === "button" && (
        <button
          className={` rounded-md ${padding} ${margin} text-${size} ${buttonStyle}`}
          title={disable ? "Button is disabled." : tip}
          aria-label={disable ? "Button is disabled." : aria}
          onClick={handleClick}
        >
          {iconLeft}
          {title}
          {iconRight}
        </button>
      )}
      {type === "submit" && (
        <button
          className={` rounded-md ${padding} ${margin} text-${size} ${buttonStyle}`}
          title={disable ? "Button is disabled." : tip}
          aria-label={disable ? "Button is disabled." : aria}
          onClick={handleClick}
          type="submit"
        >
          {iconLeft}
          {title}
          {iconRight}
        </button>
      )}
      {type === "reset" && (
        <button
          className={` rounded-md ${padding} ${margin} text-${size} ${buttonStyle}`}
          title={disable ? "Button is disabled." : tip}
          aria-label={disable ? "Button is disabled." : aria}
          onClick={handleClick}
          type="reset"
        >
          {iconLeft}
          {title}
          {iconRight}
        </button>
      )}
    </>
  );
}
