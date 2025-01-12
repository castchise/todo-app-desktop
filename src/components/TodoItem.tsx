import { TodoListItem } from "@/types";

export default function TaskItem({ name, timeSpent, isPaused }: TodoListItem) {
  return (
    <div className="p-2 bg-slate-400 rounded flex space-x-2">
      <div>
        <p>Name: </p>
        <p>{name}</p>
      </div>
      <div>
        <p>timeSpent: </p>
        <p>{timeSpent}</p>
      </div>
      <div>
        <p>isPaused: </p>
        <p>{isPaused}</p>
      </div>
    </div>
  );
}
