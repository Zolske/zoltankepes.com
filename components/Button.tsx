export default function Button({
  tip = "",
  size = "sm",
  title = "click me",
  style = 3,
  type = "button",
  aria = "",
}) {
  let buttonStyle = "";
  switch (style) {
    case 1:
      buttonStyle =
        "border border-primary-500 border-2 bg-primary-500 text-[#FFFFFF] font-black hover:bg-primary-600 hover:border-primary-500";
      break;
    case 2:
      buttonStyle =
        "border border-primary-300 border-2 bg-primary-300 text-[#FFFFFF] font-black hover:bg-primary-600 hover:border-primary-300";
      break;
    case 3:
      buttonStyle =
        "border border-primary-400 border-2 text-primary-500 font-black hover:bg-primary-600 hover:text-[#FFFFFF]";
      break;
  }
  return (
    <>
      {type === "button" && (
        <button
          className={` rounded-md pl-2 pr-2 pt-1 pb-1  shadow-xl m-2 text-${size} ${buttonStyle}`}
          title={tip}
          aria-label={aria}
        >
          {title}
        </button>
      )}
      {type === "submit" && (
        <button
          className={` rounded-md pl-2 pr-2 pt-1 pb-1  shadow-xl m-2 text-${size} ${buttonStyle}`}
          title={tip}
          aria-label={aria}
          type="submit"
        >
          {title}
        </button>
      )}
      {type === "reset" && (
        <button
          className={` rounded-md pl-2 pr-2 pt-1 pb-1  shadow-xl m-2 text-${size} ${buttonStyle}`}
          title={tip}
          aria-label={aria}
          type="reset"
        >
          {title}
        </button>
      )}
    </>
  );
}
