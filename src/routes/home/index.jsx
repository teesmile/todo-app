// src/routes/home/index.jsx
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import Pagination from "../../components/Pagination";
import TodoItem from "../../components/TodoItem";

const fetchTodos = async ({ page = 1, limit = 10 }) => {
  const validatedPage = Number(page) || 1;
  const validatedLimit = Number(limit) || 10;
  const skip = (validatedPage - 1) * validatedLimit;

  const response = await fetch(
    `https://dummyjson.com/todos?limit=${validatedLimit}&skip=${skip}`
  );
  if (!response.ok) throw new Error("Error fetching todos");
  return response.json();
};

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
  }),
  component: Home,
});

function Home() {
  const search = Route.useSearch();
  const page = Number(search.page) || 1;
  const limit = Number(search.limit) || 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", { page, limit }],
    queryFn: () => fetchTodos({ page, limit }),
  });

  if (isLoading) return (
    <div className="p-4 space-y-2">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
      ))}
    </div>
  );

  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Todo List</h1>
      <div className="space-y-3 mb-8">
        {data?.todos?.map((todo) => (
          <ul key={todo.id} className="list-none">
            <Link
              to="/todos/$id"
              params={{ id: todo.id }}
              search={{ page }} // Preserve current page
              className="block hover:bg-gray-50 p-3 rounded"
            >
              <TodoItem todo={todo} />
            </Link>
          </ul>
        ))}
      </div>
      {data?.total && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(data.total / limit)}
        />
      )}
    </div>
  );
}

export default Home;