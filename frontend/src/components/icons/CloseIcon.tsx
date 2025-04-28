import { SVGProps } from "react";

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="url(#pattern0_38_215)" d="M0 0h24v24H0z"></path>
    <defs>
      <pattern
        id="pattern0_38_215"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_38_215" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzElEQVR4nO2W0QqDMAxF/YkN9zWFhND8e/c0H/Y5k8yXTbqaxIzC5oWCYK+nifbaYTj0lyKiMyJeZci11w8ARe1n5hMA3BDxIQMA7jnnixbq9uNS6dP0Yp40K5c5MrfiLy6wBv4JqgbzqlWrB1TbtuVJKY2bYCs8DGqBh0OV721q3fNswze1qgqv1AsPhWrhX4FqwZaEC291GJwdH9duOPXYTqwIB0+8NmVJpDA4O2IwBI69fovY6yDAlaOLJZF2+WlZeTEd1gL9h35DM5Wd5V3CWFA0AAAAAElFTkSuQmCC"
        id="image0_38_215"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default CloseIcon;
