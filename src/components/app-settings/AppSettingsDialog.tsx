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
import { Separator } from "@/components/ui/separator";
import DarkThemeSwitch from "./DarkThemeSwitch";
import { RemoveAllTodoItemsDialog } from "./RemoveAllTodoItemsDialog";
import KeybindRow from "./KeybindRow";
import { LayoutGrid, Settings, Keyboard } from "lucide-react";

export default function AppSettingsDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          onKeyDown={(e) => e.preventDefault()}
          onKeyUp={(e) => e.preventDefault()}
        >
          <LayoutGrid />
          Settings
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Application Settings</AlertDialogTitle>
          <AlertDialogDescription className="space-y-6">
            <div className="mt-2">
              <h3 className="flex items-center font-semibold text-lg mb-4 space-x-2">
                <Settings size={25} /> <span>Settings</span>
              </h3>
              <div className="mt-6 space-y-4">
                <DarkThemeSwitch />
                <RemoveAllTodoItemsDialog />
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="flex items-center font-semibold text-lg mb-4 space-x-2">
                <Keyboard /> <span>Keybinds</span>
              </h2>
              <div className="mt-6 space-y-6">
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
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
