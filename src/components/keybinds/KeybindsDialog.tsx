import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";
import { Separator } from "../ui/separator";
import KeybindRow from "./KeybindRow";

export function KeybindsDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onKeyDown={(e) => e.preventDefault()}
          onKeyUp={(e) => e.preventDefault()}
        >
          <Keyboard />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Keybinds</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mt-4 space-y-6">
              <div className="space-y-4">
                <KeybindRow
                  hotkeys={["Ctrl", "N"]}
                  description="Create new task (focus input)"
                />
                <KeybindRow
                  hotkeys={["ArrowUp", "ArrowDown"]}
                  description="Navigate through task list"
                />
              </div>
              <Separator />
              <div className="space-y-4">
                <KeybindRow
                  hotkeys={["Space"]}
                  description="Pause/Resume currently selected task"
                />
                <KeybindRow
                  hotkeys={["Ctrl", "E"]}
                  description="Edit time of currently selected task"
                />
                <KeybindRow
                  hotkeys={["Delete"]}
                  description="Remove currently selected task"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
