import { SVGProps } from "react";

const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path fill="url(#pattern0_65_181)" d="M0 0h30v30H0z"></path>
    <defs>
      <pattern
        id="pattern0_65_181"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_65_181" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA2klEQVR4nO2WTQrCMBBGcwFdeB4PoLhy4QVUMBPoUjDTRa/nrhMRdG09RDf+kBahYNBMqAEhD2b9yJcvYYRIOEAoZxrMFcE8Po6kWksC0RcoqfoqbYbu7RjVjxh8pPbEZq0l3axcA2XRxKJJp0c5MsTBcuwUKVRssSV73blX4bpF4opzRWOnXFLNipUr9k3DSRJbUtSYygXpOZk//UC2y9OAtwi4R0u6sMS4Keet2ExD5Va6UzRhiTXQuVgdRyIG+LbOUJXDYVFk+2FcMfygSC6iFMlFlCIlRESeVJVsck0OrEAAAAAASUVORK5CYII="
        id="image0_65_181"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default CopyIcon;
