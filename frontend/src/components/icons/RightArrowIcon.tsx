import { SVGProps } from "react";

const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path fill="url(#pattern0_61_229)" d="M0 0h20v20H0z"></path>
    <defs>
      <pattern
        id="pattern0_61_229"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_61_229" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAb0lEQVR4nO3UsQmAQAyF4VtCwQUlKRwgadxNC0FPeaeF4yiiK3gnZz5I/RcJcc4YY75GGZ0yfEso44YpjMrhUA5b1Lg0SyGE9Y5j19pXFndCoX/28foIYU4SVobP98jkN9GLMKY0D4QxJHmZxpj8nZ2O+qY1/RdgAAAAAElFTkSuQmCC"
        id="image0_61_229"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default RightArrowIcon;
