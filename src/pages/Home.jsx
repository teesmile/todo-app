import React from 'react';
import useFetch from '../hooks/useFetch';
import TodoItem from '../components/TodoItem';

const Home = () => {
  
  const { data, loading, error } = useFetch('https://dummyjson.com/todos');

  // If we're still waiting, show a "Loading" message.
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  // If something goes wrong, show an error message.
  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  // DummyJSON returns an object with a "todos" array. If it's not present, we fallback to data.
  const todos = data?.todos || data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
