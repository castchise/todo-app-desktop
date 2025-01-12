import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Moon } from "lucide-react";
import { useGlobalContext } from "@/contexts";
import { setLocalStorageValue } from "@/lib/utils";

export default function DarkThemeSwitch() {
  const { darkmode, setDarkmode } = useGlobalContext();

  const handleDarkModeSwitch = (isDarkMode: boolean) => {
    setLocalStorageValue("darkmode", isDarkMode);
    setDarkmode(isDarkMode);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={darkmode}
        onCheckedChange={(isDarkMode: boolean) =>
          handleDarkModeSwitch(isDarkMode)
        }
        id="darkmode"
      />

      <Label htmlFor="darkmode" className="flex items-center">
        <Moon
          className="mr-1"
          size={14}
          fill={darkmode ? "black" : "transparent"}
        />
        Dark Mode
      </Label>
    </div>
  );
}
