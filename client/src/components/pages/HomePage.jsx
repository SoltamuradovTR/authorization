import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchTodos} from "../../redux/features/todos";

function HomePage() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.todos.loading);
  const todos = useSelector((state) => state.todos.items);
  const error = useSelector((state) => state.todos.error);

  useEffect(()=> {
    dispatch(fetchTodos())
  }, [dispatch])

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul>
      {todos.map((todo) => {
        return <li>{todo.text}</li>;
      })}
    </ul>
  );
}

export default HomePage;
