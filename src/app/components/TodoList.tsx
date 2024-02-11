import { getAllTodos } from "../api/todo/getTods";

export default function TodoList({}) {
  const data = getAllTodos();
  return (
    /* liタグの中に各タスクをいれる  */
    <>
      <ul>
        <li></li>
      </ul>
    </>
  );
}
