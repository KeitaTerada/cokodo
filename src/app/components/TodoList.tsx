"use client";

import { useEffect, useState } from "react";
import { Todo } from "../types/todo";

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
          <p>タイトル</p>
          <input
            id="title"
            type="text"
            value={title || ""}
            onChange={(e) => setTItle(e.target.value)}
          />
        </div>
        <div>
          <p>タスク詳細</p>
          <input
            id="description"
            type="text"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* チェック処理 */}
            <input
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
              削除
            </button>
            <p className="">{todo.title}</p>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
