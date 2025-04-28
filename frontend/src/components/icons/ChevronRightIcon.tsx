import { SVGProps } from "react";

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path fill="url(#pattern0_38_239)" d="M0 0h20v20H0z"></path>
    <defs>
      <pattern
        id="pattern0_38_239"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_38_239" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3klEQVR4nO3WMQrCQBCF4Z+AWNkJgpWFB7DQ0iqVrTZ6B/USxkOk0it4AIONoOAZBAUrsRNBFCOBFZbBTjKRJQ+2/phldnYgz58lAmJztkBJC95ZcHIWgKcB14CzwAOU0gbuFvwCBlr4SFR9A1paeCjwE1DVgAvASuBroKiBl4G9wOcopQFcBZ70gEq6prs/8BPoaOGBqPoC1DVgz0yyWIxVd+FpFlfdE831APwsntMwbbQCHAU6c3ZkhgI9mBtINeMv32IzbdQ3XWsvAv0sVp8JLi97SwvdaK63efg1bx9lay4TR1IYAAAAAElFTkSuQmCC"
        id="image0_38_239"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default ChevronRightIcon;
