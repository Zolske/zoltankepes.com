export default function ButtonToggle({
  tip = "",
  size = "sm",
  title = "click me",
  type = 3,
}) {
  let buttonStyle = "";
  let ballStyle = "";
  switch (type) {
    case 1:
      buttonStyle = "bg-primary-500 hover:bg-primary-600 group";
      ballStyle =
        "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100";
      break;
    case 2:
      buttonStyle = "bg-primary-300 hover:bg-primary-600 group";
      ballStyle =
        "bg-[#FFFFFF] group-hover:bg-primary-100 text-[#FFFFFF] group-hover:text-primary-100";
      break;
    case 3:
      buttonStyle =
        "border border-primary-400 border-2 bg-primary-100 hover:bg-primary-600 group";
      ballStyle =
        "bg-primary-400 group-hover:bg-primary-100 text-primary-400 group-hover:text-primary-100";
      break;
  }

  let height = "h-[16px]";
  let width = "w-[26px]";
  let heightBall = "h-[18px]";
  let widthBall = "w-[18px]";
  switch (size) {
    case "sm":
      height = "h-[30px]";
      width = "w-[46px]";
      heightBall = "h-[24px]";
      widthBall = "w-[24px]";
      break;
    case "base":
      height = "h-[36px]";
      width = "w-[52px]";
      heightBall = "h-[30px]";
      widthBall = "w-[30px]";
      break;
  }
  return (
    <>
      <button
        className={`shadow-xl m-2 ${buttonStyle} ${width} ${height} rounded-full`}
        title={tip}
      >
        <div
          className={`${widthBall} ${heightBall} ${ballStyle} rounded-full m-[2px]`}
        >
          {/* the dot below needs to stay so the ButtonToggle lines up with Buttons */}
          .
        </div>
      </button>
    </>
  );
}
