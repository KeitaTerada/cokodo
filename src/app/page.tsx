import { TodoList } from "./components/TodoList";
import AddTask from "./components/AddTask";
import { useState } from "react";

export default function TodoPage() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-1/2 mt-48 mx-auto">
        <div className="mb-64">
          <p className="font-bold text-6xl">タスク管理</p>
          <TodoList></TodoList>
          <div className="z-2 w-2/5 rounded-2xl bg-[rgba(0, 0, 0, 0.5)]] text-blue-600 text-3xl text-center py-4">
            <AddTask buttonLabel="+ タスクの追加"></AddTask>
          </div>
        </div>
        <div className="">
          <p className="font-bold text-4xl">終了済みタスク</p>
        </div>
      </div>
    </>
  );
}
