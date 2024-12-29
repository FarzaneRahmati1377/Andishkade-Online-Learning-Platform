import * as MuiIcons from "@mui/icons-material";

interface IconProps {
  iconName: string;
  fontSize?:"small" | "medium" | "large";
}
const IconDisplay = ({ iconName, fontSize = "small"}: IconProps) => {
  const IconComponent = MuiIcons[iconName as keyof typeof MuiIcons];
  if (!IconComponent) {
    return null;
  }

  return <IconComponent fontSize={fontSize} />;
};

export default IconDisplay;
