import { SVGProps } from "react";

const PictureIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path fill="url(#pattern0_51_26)" d="M0 0h30v30H0z"></path>
    <defs>
      <pattern
        id="pattern0_51_26"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_51_26" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6UlEQVR4nO3WQQ7BUBAG4HcMgqPYa+wcgpkmdoJ5FmwdwE2EI9hIOoMTlL0jkNeSiLZa0Sci708mafKa+aaTt6hSLi62ozFoE8pJo1ysFPBRg3hJ2BzYQjEuAg5Tvtguqm9lFSaQpe4FtWFf6oS8+hpswHvfCe4b/w+b9Ro8QkHWb8MEvNDdbdVU9PyVywU8Tb6zG1mFCWWmMmLO0jYz8A+VIptRr+AsNA0n5E2R4XQZcKI58Lworj6FH5sTyDl3OCwRjptzh0CaecPpsuEicXDmOmyW+p0fARDPJk7A4djnVtkX18VFPecKyskBBwhn5AEAAAAASUVORK5CYII="
        id="image0_51_26"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default PictureIcon;
