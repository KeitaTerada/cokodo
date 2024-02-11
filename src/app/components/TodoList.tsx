"use client";

import { useEffect, useState } from "react";
import { Todo } from "../types/todo";

export function TodoList() {
  const [inputValue, setInputValue] = useState<string | null>(null);
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
    /* liタグの中に各タスクをいれる  */
    <>
      <h1>Todo list</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.status}
              onChange={async () => {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/todo${todo.id}`,
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
            <p>{todo.title}</p>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
