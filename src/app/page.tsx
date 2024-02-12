"use client";
import AddTask from "./components/AddTask";
import { TodoList } from "./components/TodoList";
import { useState } from "react";

export default function TodoPage() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full h-screen bg-[#F6F6F6]">
        <div className="w-1/2 pt-48 mx-auto">
          <div className="mb-64">
            <p className="font-bold text-6xl">タスク管理</p>
            <TodoList></TodoList>
            <div className="w-2/5 rounded-2xl bg-[rgba(0, 0, 0, 0.5)]] text-blue-600 text-3xl py-4">
              <AddTask buttonLabel="+ タスクの追加"></AddTask>
            </div>
          </div>
          <div className="">
            <p className="font-bold text-4xl">終了済みタスク</p>
          </div>
        </div>
      </div>
    </>
  );
}
