import { createFileRoute } from "@tanstack/react-router";
import ErrorBoundary from "../../components/ErrorBoundary";
import useFetch from "../../hooks/useFetch";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/todos/$id")({
  component: TodoDetail,
});

function TodoDetail() {
  const { id } = Route.useParams();
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/todos/${id}`
  );

  return (
    <ErrorBoundary>
      <div className="p-4 max-w-xl mx-auto">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : data ? (
          <TodoDetailContent data={data} />
        ) : (
          <NotFound />
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



// Loading state
function LoadingSkeleton() {
  return (
    <div className="p-4 space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
      ))}
    </div>
  );
}

// Error state
function ErrorMessage({ error }) {
  return (
    <div className="p-4 text-red-500">
      Error: {error.message}
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

export default TodoDetail;
