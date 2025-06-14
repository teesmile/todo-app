import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import Pagination from "../../components/Pagination";
import TodoItem from "../../components/TodoItem";
import useFetch from "../../hooks/useFetch";

const searchSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().default(""),
  filter: z.enum(["all", "completed", "active"]).default("all"),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: Home,
});

function Home() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const [localSearch, setLocalSearch] = useState(searchParams.search || "");
  const [localFilter, setLocalFilter] = useState(searchParams.filter || "all");

  // Ensure numbers are properly parsed
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const skip = (page - 1) * limit;

  let apiUrl = "https://dummyjson.com/todos";
  const apiParams = {
    limit: limit,
    skip: skip,
    q: searchParams.search,
  };

  if (searchParams.filter === "completed") {
    apiUrl = "https://dummyjson.com/todos/completed";
  } else if (searchParams.filter === "active") {
    apiUrl = "https://dummyjson.com/todos?completed=false";
  }

  const { data, loading, error } = useFetch(apiUrl, apiParams);

  const filteredTodos = () => {
    const todos = data?.todos || [];
    return searchParams.search
      ? todos.filter((todo) =>
          todo.todo.toLowerCase().includes(searchParams.search.toLowerCase())
        )
      : todos;
  };

  const totalItems = data?.total || filteredTodos().length;
  const totalPages = Math.ceil(totalItems / limit);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      search: {
        ...searchParams,
        search: localSearch,
        filter: localFilter,
        page: 1, // Reset to first page when filtering/searching
      },
    });
  };

  if (loading)
    return (
      <div className="p-4 space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
        ))}
      </div>
    );

  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className=" px-3 text-2xl font-bold mb-4 text-blue-600">Todo List</h1>

      {/* Simplified Form */}
      <form onSubmit={handleSubmit} className="w-full p-6 space-y-4 px-3 ">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            name="search"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search todos..."
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          
          <select
            name="filter"
            value={localFilter}
            onChange={(e) => setLocalFilter(e.target.value)}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-700"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
          
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-700 text-white px-4 py-3 rounded hover:bg-blue-800"
          >
            Apply
          </button>
        </div>
      </form>

      <div className="space-y-3 mb-8">
        {filteredTodos().length > 0 ? (
          filteredTodos().map((todo) => (
            <div key={todo.id} className="list-none">
              <Link
              
                to="/todos/$id"
                params={{ id: todo.id }}
                search={searchParams}
                className="block hover:bg-gray-50 p-3 rounded"
              >
                <ul>
                <TodoItem todo={todo} />
                </ul>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No todos found matching your criteria
          </div>
        )}
      </div>

      {totalPages > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

export default Home;