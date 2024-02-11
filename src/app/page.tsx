import { TodoList } from "./components/TodoList";
import AddTask from "./components/AddTask";

export default function TodoPage() {
  return (
    <>
      <div className="w-1/2 mt-48 mx-auto">
        <p className="font-bold text-6xl">タスク管理</p>
        <TodoList></TodoList>
        <div className="bg-gray-100 text-blue-600 text-center">
          <button>+ タスクの追加</button>
        </div>
      </div>
    </>
  );
}
