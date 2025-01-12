import { TodoListItem } from "@/types";

export default function TaskItem({
  name,
  timeLeft,
  isDone,
  isPaused,
}: TodoListItem) {
  return (
    <div className="p-2 bg-slate-400 rounded flex space-x-2">
      <div>
        <p>Name: </p>
        <p>{name}</p>
      </div>
      <div>
        <p>timeLeft: </p>
        <p>{timeLeft}</p>
      </div>
      <div>
        <p>isDone: </p>
        <p>{isDone}</p>
      </div>
      <div>
        <p>isPaused: </p>
        <p>{isPaused}</p>
      </div>
    </div>
  );
}
