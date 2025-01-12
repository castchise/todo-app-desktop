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

const formSchema = z.object({
  taskName: z.string(),
});

export default function AddNewTodoForm() {
  const context = useGlobalContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
    },
  });

  function onSubmit({ taskName }: z.infer<typeof formSchema>) {
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="taskName"
          render={({ field }) => (
            <FormItem className="flex-grow mr-4">
              <FormControl>
                <Input placeholder="Write a new task..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
