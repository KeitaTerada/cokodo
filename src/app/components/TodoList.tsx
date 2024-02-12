"use client";

import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import Image from "next/image";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTItle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    const gettodo = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`);
      const todos = await response.json();
      setTodos(todos);
    };
    gettodo();
  }, []);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!title) alert("タイトルを入力してください");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/todo`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, description }),
            }
          );
          const newTodo = await response.json();

          setTodos([...todos, newTodo]);
          setTItle(null);
          setDescription(null);
        }}
      >
        <div>
          <p className="font-medium text-3xl">タイトル</p>
          <input
            className="w-full py-4 mb-10 rounded-lg border border-gray-400 text-3xl outline-black"
            id="title"
            type="text"
            value={title || ""}
            onChange={(e) => setTItle(e.target.value)}
          />
        </div>
        <div>
          <p className="font-medium text-3xl">タスク詳細</p>
          <input
            className="w-full py-4 mb-16 rounded-lg border border-gray-400 text-3xl outline-black"
            id="description"
            type="text"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-[#2A96BF] text-white w-full mb-14 py-3 text-2xl font-bold rounded-lg"
        >
          追加
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            className="bg-white mb-7 p-7 items-center rounded-lg flex justify-between"
            key={todo.id}
          >
            <div className="flex">
              {/* チェック処理 */}
              <input
                className="mr-7"
                type="checkbox"
                checked={todo.status}
                onChange={async () => {
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ status: todo.status }),
                    }
                  );
                  const updateTodo = await response.json();
                  setTodos(
                    todos.map((todo) => {
                      if (todo.id === updateTodo.id) {
                        return updateTodo;
                      } else {
                        return todo;
                      }
                    })
                  );
                }}
              />
              <div>
                <p className="text-3xl">{todo.title}</p>
                <p className="text-[#ACABAB]">{todo.description}</p>
              </div>
            </div>
            {/* 削除処理 */}
            <button
              onClick={async (e) => {
                e.preventDefault();
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                  {
                    method: "DELETE",
                  }
                );
                const deleteTodo = await response.json();
                setTodos(todos.filter((todo) => todo.id !== deleteTodo.id));
              }}
            >
              <Image
                src="/images/trash_box.png"
                alt="trashbox"
                width={20}
                height={15}
              />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
