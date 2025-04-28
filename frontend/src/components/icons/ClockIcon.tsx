import { SVGProps } from "react";

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path fill="url(#pattern0_38_211)" d="M0 0h20v20H0z"></path>
    <defs>
      <pattern
        id="pattern0_38_211"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#image0_38_211" transform="scale(.03333)"></use>
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACI0lEQVR4nO2WS04bQRCGvQm5QBa8ghd4FcKOVRAnIGQXOAPBvA4SFAQKAeUAiUGsiFnwuEQCiCOwI04kLGHri8r5WypNxjM9Boks+KUR09Vd/qjqqu4plR71vwl4DlSBQ+AC+K3H3uvAAjB8n8AhYBu4JV9toAaU7wp9AzT0ozfAF2AWGFWU9lRkM2BTa81nplfooiIwfbVUR/iMALsu+movkbaBFrDk7OPAOvDD7bG9fwBeunXL8m1HR87fPQ3p7UCBp8BHl4E0GWgT6JPPiuw/gYEY8OeQXgc9TQG9AiZT7CcOvifbdkzLtFQknT0FttLCcz5p2nB73lRHDGWBq4lox7ulNwds//yY5q3aTe+ywNYeprcaW9HQA9i0pnlrNdNBFviyswQqGp/RO/i75q3PTRdZ4FDN9cT4Hzmfqy5LGpo/9eM7g0Pf2t8u8EZi+xr3kmrBsuCFUl3Xotm84kqBT3QprjmNM4vLrjZTzUXSioAbdMrZzOeFfiOc3fNZ4GE1uzX9iGx2DBbVunzLUQeICdiR867GfcBxAegR8ES++7J9KuUJGHTVvOzgGzlpb+nmCtBV2a+B/lywnGbctbji7GNWNFaxwC899v4+7KmDhmtxOgqaOLfDOb0X9jzHp+zSa74LhaBBwGvdp6hIamqPik6k8Okzp+ptuvQWizQp4Jn2LuZj71YfhvkXf6z0ZTIPfAPO3R7b+4HmslvmUaUH0B+7jyNVUl/KVQAAAABJRU5ErkJggg=="
        id="image0_38_211"
        width="30"
        height="30"
        preserveAspectRatio="none"
      ></image>
    </defs>
  </svg>
);

export default ClockIcon;
