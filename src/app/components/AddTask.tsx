"use client";
import { useState } from "react";
import { Todo } from "../types/todo";

type ModalProps = {
  buttonLabel: string;
};

export default function AddTask({ buttonLabel }: ModalProps) {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={toggleModal}>{buttonLabel}</button>
      {isOpen && (
        <form
          className="rounded"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!title) alert("入力してください");
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
          <div>
            <p className="font-bold">タイトル</p>
            <input
              id="title"
              type="text"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todoを入力してください"
            />
          </div>
          <div>
            <p className="font-bold">タスク詳細</p>
            <input
              id="descriptiopn"
              type="text"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Todoを入力してください"
            />
          </div>
          <div className="rounded-xl bg-blue-400 text-white-400 font-bold">
            <button onClick={toggleModal} type="submit">
              追加
            </button>
          </div>
        </form>
      )}
    </>
  );
}
