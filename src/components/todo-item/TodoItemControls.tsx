import ConfirmationDialog from "@/components/ConfirmationDialog";
import EditTime from "@/components/EditTime";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/contexts";
import { formatDurationToHours } from "@/lib/utils";
import { TodoListItem } from "@/types";
import { Trash2 } from "lucide-react";

interface TodoItemControlProps {
  todoItem: TodoListItem;
  isEditingTime: boolean;
  isRemovingItem: boolean;
  handleRemoveTask: () => void;
  time: number;
  setTime: (value: number) => void;
  setIsEditingTime: (value: boolean) => void;
  handleEditTaskTime: () => void;
  isActiveTodoItem: boolean;
  setSelectedItem: (value: TodoListItem) => void;
  setIsRemovingItem: (value: boolean) => void;
}

export default function TodoItemControls({
  todoItem,
  isEditingTime,
  isRemovingItem,
  handleRemoveTask,
  time,
  setTime,
  setIsEditingTime,
  handleEditTaskTime,
  isActiveTodoItem,
  setSelectedItem,
  setIsRemovingItem,
}: TodoItemControlProps) {
  const { removeTodoItem, todoList } = useGlobalContext();

  return (
    <>
      <div className="ml-auto flex items-center">
        {isEditingTime ? (
          <EditTime
            time={time}
            setTime={setTime}
            setIsEditing={setIsEditingTime}
            isActiveItem={isActiveTodoItem}
            setActiveItem={() => setSelectedItem(todoItem as TodoListItem)}
          />
        ) : (
          <Button
            variant="ghost"
            className="font-normal text-md"
            onClick={handleEditTaskTime}
          >
            {formatDurationToHours(time)}
          </Button>
        )}
        <Button size="icon" variant="ghost" onClick={handleRemoveTask}>
          <Trash2 />
        </Button>
      </div>

      <ConfirmationDialog
        open={isRemovingItem}
        onOpenChange={setIsRemovingItem}
        onSubmit={() => {
          const currentIndex = todoList.findIndex(
            (todoListItem) => todoListItem.id === todoItem.id
          );
          const nextSelection =
            currentIndex === 0 ? todoList[1] : todoList[currentIndex - 1];
          setSelectedItem(nextSelection);
          removeTodoItem(todoItem.id);
        }}
      />
    </>
  );
}
