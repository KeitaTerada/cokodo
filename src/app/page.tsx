import { neon } from "@neondatabase/serverless";

type Todos = {
  id: string;
  title: string;
  desciption: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  priority: boolean;
};

async function getTodos() {
  const sql = neon(process.env.DATABASE_URL);
  const responce = await sql`SELECT * FROM "Todos"`;
  return responce;
}

export default async function Page() {
  const data = await getTodos();
  console.log(data);
  return (
    <>
      <h1>Todoリスト</h1>
    </>
  );
}
