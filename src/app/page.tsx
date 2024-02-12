"use client";
import AddTask from "./components/AddTask";
import { TodoList } from "./components/TodoList";
import { useState } from "react";

export default function TodoPage() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-1/2 mt-48 mx-auto">
        <div className="mb-64">
          <p className="font-bold text-6xl">タスク管理</p>
          <TodoList />
        </div>
      </div>
    </>
  );
}
