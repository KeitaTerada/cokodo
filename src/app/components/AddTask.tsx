"use client";
import { useState } from "react";

type ModalProps = {
  buttonLabel: string;
};

const AddTask = ({ buttonLabel }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <button onClick={toggleModal}>{buttonLabel}</button>
      {isOpen && (
        <div className="rounded">
          <div>
            <p className="font-bold">タイトル</p>
            <input></input>
          </div>
          <div>
            <p className="font-bold">タスク詳細</p>
            <input></input>
          </div>
          <div className="rounded-xl bg-blue-400 text-white-400 font-bold">
            <button onClick={toggleModal}>タスクの追加</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
