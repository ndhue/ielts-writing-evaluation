import { SVGProps } from "react";

const DocumentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path fill="url(#pattern0_38_236)" d="M0 0h20v20H0z"></path>
    <defs>
      <pattern
        id="pattern0_38_236"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_38_236" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAn0lEQVR4nO3WMQ6CQBBG4TkXWXuN17AQEy+NHoIGn4WbaCHI7D8QNfsSyuFLZigwq5kZsAeuzK8HWnl5wAVft/ycVNjbARgyfl4NtseMjlMAh+AUwjKOAOf548sH1y4GA2kC75eEXRsZrcJq47v94lU3jtkUCSfH7CYSlvpJuCm57So35s1tI2CpCtdVK7+3U3XPN38I2AXhHbCdDf91d4GI6+7G6NZgAAAAAElFTkSuQmCC"
        id="image0_38_236"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default DocumentIcon;
