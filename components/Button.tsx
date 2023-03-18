export default function Button({
  tip = "",
  size = "sm",
  title = "click me",
  style = 3,
  type = "button",
  aria = "",
  disable = false,
  callBack = () => {},
}) {
  let buttonStyle = "";
  if (!disable) {
    switch (style) {
      case 1:
        buttonStyle =
          "border border-primary-500 border-2 bg-primary-500 text-[#FFFFFF] font-black hover:bg-primary-600 hover:border-primary-500 shadow-xl";
        break;
      case 2:
        buttonStyle =
          "border border-primary-300 border-2 bg-primary-300 text-[#FFFFFF] font-black hover:bg-primary-600 hover:border-primary-300 shadow-xl";
        break;
      case 3:
        buttonStyle =
          "border border-primary-400 border-2 text-primary-500 font-black hover:bg-primary-600 hover:text-[#FFFFFF] shadow-xl";
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
          className={` rounded-md pl-2 pr-2 pt-1 pb-1 m-2 text-${size} ${buttonStyle}`}
          title={disable ? "Button is disabled." : tip}
          aria-label={disable ? "Button is disabled." : aria}
          onClick={handleClick}
        >
          {title}
        </button>
      )}
      {type === "submit" && (
        <button
          className={` rounded-md pl-2 pr-2 pt-1 pb-1 m-2 text-${size} ${buttonStyle}`}
          title={disable ? "Button is disabled." : tip}
          aria-label={disable ? "Button is disabled." : aria}
          onClick={handleClick}
          type="submit"
        >
          {title}
        </button>
      )}
      {type === "reset" && (
        <button
          className={` rounded-md pl-2 pr-2 pt-1 pb-1 m-2 text-${size} ${buttonStyle}`}
          title={disable ? "Button is disabled." : tip}
          aria-label={disable ? "Button is disabled." : aria}
          onClick={handleClick}
          type="reset"
        >
          {title}
        </button>
      )}
    </>
  );
}
