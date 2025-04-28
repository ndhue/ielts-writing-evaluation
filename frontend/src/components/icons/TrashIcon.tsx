import { SVGProps } from "react";

const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path fill="url(#pattern0_51_27)" d="M0 0h30v30H0z"></path>
    <defs>
      <pattern
        id="pattern0_51_27"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_51_27" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbUlEQVR4nGNgGAWDFVRmXjhelXnxPyq+cIw6hmdcPIxpOHkYZNaAWFyVeeEQVUJj+IIqKgX1qMUEwWhQV40mrszR7HRxtAD5P1pkEgVGYJGZceEx5e2tC4/IsPiiJyWWgyytyLrgQbLFo2DYAAA7VeOMVroNUQAAAABJRU5ErkJggg=="
        id="image0_51_27"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default TrashIcon;
