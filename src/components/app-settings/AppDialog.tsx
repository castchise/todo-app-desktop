import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DarkThemeSwitch from "./DarkThemeSwitch";
import { RemoveAllTodoItemsDialog } from "./RemoveAllTodoItemsDialog";
import KeybindRow from "./KeybindRow";
import { LayoutGrid, Settings, Keyboard } from "lucide-react";

export default function AppDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onKeyDown={(e) => e.preventDefault()}
          onKeyUp={(e) => e.preventDefault()}
        >
          <LayoutGrid />
          Application
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="">Application</DialogTitle>
          <div className="!mt-6 space-y-6 text-slate-600 dark:text-white">
            <Separator />
            <div>
              <h3 className="mb-4 flex items-center space-x-2 font-semibold">
                <Settings style={{ color: "inherit" }} /> <span>Settings</span>
              </h3>
              <div className="mt-6 space-y-4">
                <DarkThemeSwitch />
                <RemoveAllTodoItemsDialog />
              </div>
            </div>

            <Separator />
            <div>
              <h3 className="mb-4 flex items-center space-x-2 font-semibold">
                <Keyboard style={{ color: "inherit" }} /> <span>Keybinds</span>
              </h3>
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
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
