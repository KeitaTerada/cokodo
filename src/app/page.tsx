import AddTask from "./components/AddTask";
import { TodoList } from "./components/TodoList";

export default function Home() {
  return (
    <>
      <TodoList />
      <AddTask />
    </>
  );
}
