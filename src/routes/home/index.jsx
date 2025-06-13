// src/routes/home/index.jsx
import React from 'react';
import { Link, useSearch , createFileRoute} from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';
import Pagination from '../../components/Pagination';
import TodoItem from '../../components/TodoItem';

// This function fetches todos given the page and limit.
const fetchTodos = async (page = 1, limit = 10) => {
  const response = await fetch(
    `https://dummyjson.com/todos?limit=${limit}&skip=${(page - 1) * limit}`
  );
  console.log('Fetching todos with:', { page, limit });
  if (!response.ok) throw new Error('Error fetching todos');
  return response.json();
};

// Using createFileRoute to define the route with validated search parameters.
export const Route = createFileRoute('/')({
  validateSearch: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
  }),
  component: Home,
});

function Home() {
  // Read the current search values (page and limit)
  const search = Route.useSearch();
  const { page, limit } = search;

  // Use TanStack Query to fetch todos when the page or limit changes.
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos', { page, limit }],
    queryFn: () => fetchTodos(page, limit),
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {/* It's best practice to use a single <ul> with <li> elements for semantic HTML */}
      <ul className="space-y-2 mb-6">
        {data.todos.map((todo) => (
          <ul key={todo.id}>
            <Link to={`/todos/${todo.id}`} className="block">
              <TodoItem todo={todo} />
            </Link>
          </ul>
        ))}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(data.total / limit)}
        basePath="/" // Assumes the Home route is at "/"
      />
    </div>
  );
}

export default Home;
