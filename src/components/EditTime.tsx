import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { formatDurationToHours, formatDurationToMs } from "@/lib/utils";
import { Button } from "./ui/button";

interface EditTimeProps {
  time: number;
  setTime: (value: number) => void;
  setIsEditing: (value: boolean) => void;
}

export default function EditTime({
  time,
  setTime,
  setIsEditing,
}: EditTimeProps) {
  const [changeTime, setChangeTime] = useState(formatDurationToHours(time));

  const handleChange = (updatedTime: string) => {
    const msValue = formatDurationToMs(updatedTime);
    setTime(msValue);
    setIsEditing(false);
  };

  //   useEffect(() => {
  //     const handleKeyUp = (e: KeyboardEvent) => {
  //       switch (e.key) {
  //         case "Enter": {
  //           alert("Enter");
  //           break;
  //         }
  //         case "Escape": {
  //           alert("Escape");
  //           break;
  //         }
  //         default:
  //         //no-op
  //       }
  //     };

  //     document.addEventListener("keyup", handleKeyUp);

  //     return () => document.removeEventListener("keyup", handleKeyUp);
  //   }, []);

  return (
    <div className="flex items-center">
      <Input
        autoFocus
        value={changeTime}
        onChange={(e) => setChangeTime(e.target.value)}
      />

      <Button type="button" onClick={() => handleChange(changeTime)}>
        Ok
      </Button>
    </div>
  );
}
