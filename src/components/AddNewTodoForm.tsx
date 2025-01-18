import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TodoListItem } from "@/types";
import { getTodoList, setLocalStorageValue } from "@/lib/utils";
import { useGlobalContext } from "@/contexts";
import { v4 as uuid } from "uuid";
import { useEffect, useRef } from "react";

const formSchema = z.object({
  taskName: z.string(),
});

interface AddNewTodoFormProps {
  setSelectedItem: (value: TodoListItem) => void;
}

export default function AddNewTodoForm({
  setSelectedItem,
}: AddNewTodoFormProps) {
  const context = useGlobalContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
    },
  });

  const onSubmit = ({ taskName }: z.infer<typeof formSchema>) => {
    const newTask: TodoListItem = {
      id: uuid(),
      name: taskName,
      timeSpent: 0,
      paused: true,
    };

    const todoList = getTodoList();
    const updatedTodoList = [newTask, ...todoList];
    context.setTodoList(updatedTodoList);
    setLocalStorageValue("todoList", updatedTodoList);

    form.reset();
    inputRef.current.blur();
    setSelectedItem(updatedTodoList[0]);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!e.ctrlKey || e.code !== "KeyN") return;

    setSelectedItem(null);
    form.setFocus("taskName");
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="taskName"
          render={({ field }) => (
            <FormItem className="flex-grow mr-4">
              <FormControl ref={inputRef}>
                <Input placeholder="Write a new task..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.getValues("taskName")}>
          Add
        </Button>
      </form>
    </Form>
  );
}
