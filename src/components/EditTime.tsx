import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  createDynamicMask,
  formatDurationToHours,
  formatDurationToMs,
} from "@/lib/utils";
import MaskedInput from "react-text-mask";

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

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter": {
          handleChange(changeTime);
          break;
        }
        case "Escape": {
          setIsEditing(false);
          break;
        }
        default:
        //no-op
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [handleChange]);

  return (
    <MaskedInput
      mask={createDynamicMask(time)}
      value={changeTime}
      onChange={(e) => setChangeTime(e.target.value)}
      placeholder="00:00:00"
      render={(ref, props) => (
        <Input
          autoFocus
          ref={ref}
          className="text-center w-[100px] !text-[16px] !py-1"
          {...props}
        />
      )}
    />
  );
}
