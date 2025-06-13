import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

// export const Route = createFileRoute('/todos/$id')({
//   component: TodoDetail,
// });

const fetchTodo = async (id) => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`);
  if (!response.ok) throw new Error('Error fetching todo');
  return response.json();
};

export default function TodoDetail() {
 const { id } = Route.useParams();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodo({ id }),
  });
  if (isLoading) return (
    <div className="p-4 space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
      ))}
    </div>
  );

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
        search={{ page: 1 }}
        className="text-blue-500 underline hover:text-blue-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
}