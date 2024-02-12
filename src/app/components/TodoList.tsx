"use client";

import { useEffect, useState } from "react";
import { Todo } from "../types/todo";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

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
      <h1>Todo list</h1>
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
            <p>{todo.title}</p>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
