"use client";
import { useState } from "react";
import { Todo } from "../types/todo";

export default function AddTask() {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!title) alert("TODOタイトルを入力してください");
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
          setTitle(null);
          setDescription(null);
        }}
      >
        <input
          type="text"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todoのタイトルを入力してください"
        />
        <input
          type="text"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="TODOの説明を入力してください。"
        />
        <button type="submit">追加</button>
      </form>
    </>
  );
}
