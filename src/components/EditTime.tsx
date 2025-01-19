import { useState } from "react";
import type { KeyboardEvent } from "react";
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
  isActiveItem: boolean;
  setActiveItem: () => void;
}

export default function EditTime({
  time,
  setTime,
  setIsEditing,
  isActiveItem,
  setActiveItem,
}: EditTimeProps) {
  const [changeTime, setChangeTime] = useState(formatDurationToHours(time));

  const handleTimeChange = (updatedTime: string) => {
    const msValue = formatDurationToMs(updatedTime);
    setTime(msValue);
    setIsEditing(false);
  };

  const handleInputChange = (updatedTime: string) => {
    setActiveItem();
    setChangeTime(updatedTime);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!isActiveItem) return;

    switch (e.code) {
      case "Enter": {
        handleTimeChange(changeTime);
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

  return (
    <MaskedInput
      mask={createDynamicMask(time)}
      value={changeTime}
      onClick={() => setActiveItem()}
      onChange={(e) => handleInputChange(e.target.value)}
      onKeyUp={(e) => handleKeyUp(e)}
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
