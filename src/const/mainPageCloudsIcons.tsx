import CloudIconOne from "@/svg/cloudIcons/CloudIconOne";
import CloudIconTwo from "@/svg/cloudIcons/CloudIconTwo";
import CloudIconThree from "@/svg/cloudIcons/CloudIconThree";
import CloudIconFour from "@/svg/cloudIcons/CloudIconFour";
import SvgComponent from "@/ui/SvgComponent/SvgComponent";

export const elementsData = [
    {
      element: <CloudIconOne />,
      top: "0",
      left: "70",
      id: "cloud-icon-1",
      renderIn: ".main-screen",
    },
    {
      element: <CloudIconTwo />,
      top: "93%",
      left: "0",
      relativeTo: "main",
      id: "cloud-icon-2",
    },
    {
      element: <SvgComponent svgContent={<CloudIconThree />} />,
      top: "93%",
      right: "20",
      relativeTo: "main",
      id: "cloud-icon-3",
    },
    {
      element: <SvgComponent svgContent={<CloudIconFour />} />,
      top: "73%",
      left: "28%",
      id: "cloud-icon-4",
      zIndex: "1",
      renderIn: ".services-screen",
    },
  ];