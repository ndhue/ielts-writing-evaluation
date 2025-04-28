import { SVGProps } from "react";

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path fill="url(#pattern0_38_244)" d="M0 0h20v20H0z"></path>
    <defs>
      <pattern
        id="pattern0_38_244"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_38_244" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7klEQVR4nO3UPUoDURDA8ZDClLFUrPUKehLxEMZjaCOKB9LSjyqLB9BG1EqRiJY/GVwhjfo2TD4I+4eBZXeW/5s3816n07KIoIcDXOO9jngexLdpSTdQ+Z1h5Eyj0uoP6bg8r3Lf21vKfqb4poH4KlM8aiAeZYobMa+K35aix4N5TXWvPqP/ETkraeKxm2s405vrh6gmtjL6WA9cxGX9LrfSlpmCLnZwhAs84bOOR5zjENuRmyFcxwmeG5zjWNQx1iYRruIMHyYn/j1Fv1S6hXt53GGzRHwrn6pEHMOSzUOJeA+vidIX7Bb1uWWp+AK3aDl9rK/F7wAAAABJRU5ErkJggg=="
        id="image0_38_244"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default UserIcon;
