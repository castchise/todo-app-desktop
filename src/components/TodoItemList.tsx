import type { TodoListItem } from "@/types";
import TodoItem from "./TodoItem";

interface TodoItemListProps {
  todoList: TodoListItem[];
}

export default function TodoItemList({ todoList }: TodoItemListProps) {
  return todoList.map((todoListItem) => (
    <TodoItem key={todoListItem.id} {...todoListItem} />
  ));
}
