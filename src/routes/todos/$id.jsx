import { createFileRoute, useRouter } from "@tanstack/react-router";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/todos/$id")({
  component: TodoDetail,
});

function TodoDetail() {
  const { id } = Route.useParams();
  const router = useRouter();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, check if it's a local todo
        const todosData = localStorage.getItem('todos_app_data');
        if (todosData) {
          const todos = JSON.parse(todosData);
          const localTodo = todos.find(t => t.id === id);
          
          if (localTodo) {
            setTodo(localTodo);
            setLoading(false);
            return;
          }
        }
        
        // If not found locally, try API
        const response = await fetch(`https://dummyjson.com/todos/${id}`);
        
        // Handle 404 specifically
        if (response.status === 404) {
          throw new Error(`Todo with ID ${id} not found`);
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTodo(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  return (
    <ErrorBoundary>
      <div className="p-4 max-w-xl mx-auto">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage error={error} router={router} />
        ) : todo ? (
          <TodoDetailContent data={todo} />
        ) : (
          <NotFound router={router} />
        )}
      </div>
    </ErrorBoundary>
  );
}

function TodoDetailContent({ data }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Todo Detail</h1>
      <div className="p-4 border rounded mb-4 bg-white outline-1 outline-blue-400">
        <p className="mb-2">
          <strong>Title:</strong> {data.todo.trim().split(/\s+/)[0]}
        </p>
        <p className="mb-2">
          <strong>Description:</strong> {data.todo}
        </p>
        <p className="mb-2">
          <strong>Status:</strong>
          <span
            className={`ml-2 px-2 py-1 rounded text-sm ${
              data.completed
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {data.completed ? "Completed" : "Pending"}
          </span>
        </p>

        <div className="flex items-center gap-2 group">
          <input
            type="checkbox"
            checked={data.completed}
            readOnly
            className="border border-blue-400 text-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer"
          />
        </div>
      </div>
      <Link
        to="/"
        search={(prev) => ({ ...prev, page: 1 })}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Todo List
      </Link>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="p-4 space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
      ))}
    </div>
  );
}

function ErrorMessage({ error, router }) {
  return (
    <div className="p-4 text-red-500">
      <p className="mb-4">Error: {error.message}</p>
      <button
        onClick={() => router.history.back()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
}


export default TodoDetail;