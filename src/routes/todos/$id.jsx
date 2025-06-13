import React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

const fetchTodo = async (id) => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`);
  if (!response.ok) throw new Error('Error fetching todo');
  return response.json();
};

const TodoDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery(['todo', id], () => fetchTodo(id));

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Detail</h1>
      <div className="p-4 border rounded mb-4">
        <p><strong>ID:</strong> {data.id}</p>
        <p><strong>Description:</strong> {data.todo}</p>
        <p><strong>Completed:</strong> {data.completed ? 'Yes' : 'No'}</p>
      </div>
      <Link 
        to="/" 
        search={{ page: 1 }} // Maintain pagination state when returning
        className="text-blue-500 underline"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default TodoDetail;