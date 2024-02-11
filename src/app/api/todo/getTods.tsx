import { neon } from "@neondatabase/serverless";
import TodoList from "@/app/components/TodoList";

type TodosProps = {
  id: string;
  title: string;
  desciption: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  priority: boolean;
};

export async function getAllTodos() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT * FROM "Todos"`;
  console.log(response);
  return { props: { data: response } };
}
