import { SVGProps } from "react";

const CreateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path fill="url(#pattern0_49_8)" d="M0 0h30v30H0z"></path>
    <defs>
      <pattern
        id="pattern0_49_8"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_49_8" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABD0lEQVR4nO2WPQrCQBBGcxIRW72AjbXiMQSdyQXMrp7E42hhmRkRrET8aaxEsFdGXEGNOCarIuTBQkgmeXybj5AgyPkQ3U5cNEhjA7wzSK3gW/TDuGyQtxb5KPKHAYtx0yBvZCDtMsD7qD2puqQilWMDVBG5JH8UA619Si3y4iwDqrjkcj4hsV/p9Rry1iVPJLUY+NALuXaWtqcFizS/naFlhJOSX3FWqfATqeBuCN4kkzSt+L5Il7Vw7XWF8yp+lVSk0nav4ldJBZGqnqcVa9+pOohVDlqggaZI3sUGeKRpr//ESDOLNJTkid/eT4m15OKn5Fv9vXJBtl+f5D8TWinE3PApF2kUUj3z1uX8HScVGusBYtupGwAAAABJRU5ErkJggg=="
        id="image0_49_8"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default CreateIcon;
