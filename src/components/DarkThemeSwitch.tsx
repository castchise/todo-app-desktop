import React, { useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Moon } from "lucide-react";

export default function DarkThemeSwitch() {
  const [darkmode, setDarkmode] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={darkmode}
        onCheckedChange={(isDarkMode: boolean) => setDarkmode(isDarkMode)}
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
