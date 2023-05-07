import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const TodoList: React.FC = () => {
  const { todos, loading, error, page, limit } = useTypedSelector(
    (state) => state.todo
  );
  const { fetchTodos, setTodoPage } = useActions();
  const pages = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetchTodos(page, limit);
  }, [page]);

  if (loading) return <h3>loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      {todos.map((todo) => (
        <p key={todo.id}>
          {todo.id} - {todo.title}
        </p>
      ))}
      <div style={{ display: "flex" }}>
        {pages.map((p) => (
          <div
            key={p}
            onClick={() => setTodoPage(p)}
            style={{
              border: p === page ? "3px solid red" : "1px solid grey",
              padding: 10,
              marginRight: 5,
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
