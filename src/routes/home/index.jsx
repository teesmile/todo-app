import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Pagination from "@/components/Pagination";
import TodoItem from "@/components/TodoItem";
import useFetch from "@/hooks/useFetch";

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

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const skip = (page - 1) * limit;

  const apiUrl = "https://dummyjson.com/todos";
  const apiParams = { limit: 150 };

  const { data, loading, error, create, update, remove, refetch } = useFetch(
    apiUrl,
    apiParams
  );

  // Add new todo
  const handleAddTodo = async (todoText) => {
    try {
      await create({
        todo: todoText,
        completed: false,
        userId: 1,
      });
      refetch();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Toggle todo completion status
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await update(id, {
        completed: !currentStatus,
      });
      refetch(); // Refresh the todo list
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await remove(id);
      refetch(); // Refresh the todo list
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const filteredTodos = () => {
    let todos = data?.todos || [];

    if (searchParams.filter === "completed") {
      todos = todos.filter((todo) => todo.completed);
    } else if (searchParams.filter === "active") {
      todos = todos.filter((todo) => !todo.completed);
    }

    if (searchParams.search) {
      todos = todos.filter((todo) =>
        todo.todo.toLowerCase().includes(searchParams.search.toLowerCase())
      );
    }

    return todos;
  };

  const paginatedTodos = filteredTodos().slice(skip, skip + limit);
  const totalItems = filteredTodos().length;
  const totalPages = Math.ceil(totalItems / limit);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      search: {
        ...searchParams,
        search: localSearch,
        filter: localFilter,
        page: 1,
      },
    });
  };

  if (loading) {
    return (
      <div className="p-4 space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
   <div className="p-4 max-w-xl mx-auto">
      <h1 className="px-3 text-2xl font-bold mb-4 text-blue-600">Todo List</h1>
      {/* Add Todo Form */}
      <div className="mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const todoText = e.currentTarget.todoText.value;
            if (todoText.trim()) {
              handleAddTodo(todoText);
              e.currentTarget.reset();
            }
          }}
        >
          <div className="flex gap-2">
            <Input
              name="todoText"
              placeholder="Add a new todo..."
              className="flex-1"
            />
            <Button type="submit">Add</Button>
          </div>
        </form>
      </div>
          <form onSubmit={handleSubmit} className="w-full p-6 space-y-4 px-3">
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

      <div className="space-y-2 mb-8">
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo) => (
            <Link
              key={todo.id}
              to="/todos/$id"
              params={{ id: todo.id }}
              search={searchParams}
              className="block"
            >
              <TodoItem todo={todo} />
            </Link>
          ))
        ) : (
          <div className="text-center py-8 text-muted">No todos found</div>
        )}
      </div>

      {totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          
        />
      )}
    </div>
  );
}

export default Home;
