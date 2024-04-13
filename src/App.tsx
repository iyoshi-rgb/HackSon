import React, { useEffect, useState } from "react";
import { fetchTest } from "./utils/supabasefunction";

interface Todo {
  id: number;
  title: string;
  content: string;
}

function App() {
  //test用
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const fetchTodo = async () => {
    const todoList = (await fetchTest()) as Todo[];
    setTodoList(todoList);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  console.log(todoList);
  //

  return (
    <>
      <p className="text-red-300">Hello</p>
    </>
  );
}

export default App;
