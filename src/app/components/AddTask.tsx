"use client";
import { useState } from "react";
import { Todo } from "../types/todo";

export default function AddTask() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!inputValue) alert("入力してください");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/todo`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title: inputValue }),
            }
          );
          const newTodo = await response.json();

          setTodos([...todos, newTodo]);
          setInputValue(null);
        }}
      >
        <input
          id="title"
          type="text"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Todoを入力してください"
        />
        <input
          id="descriptiopn"
          type="text"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Todoを入力してください"
        />
        <button type="submit">追加</button>
      </form>
    </>
  );
}
