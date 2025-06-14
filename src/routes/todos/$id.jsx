// $id.jsx - Todo Detail Page
import { createFileRoute, Link } from '@tanstack/react-router';
import useFetch from '../../hooks/useFetch';

export const Route = createFileRoute('/todos/$id')({
  component: TodoDetail,
});

function TodoDetail() {
  const { id } = Route.useParams();
  
  const { data, loading, error } = useFetch(`https://dummyjson.com/todos/${id}`);

  if (loading) return (
    <div className="p-4 space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
      ))}
    </div>
  );

  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 max-w-xl mx-auto ">
      <h1 className="text-2xl font-bold mb-4 text-blue-600 ">Todo Detail</h1>
      <div className="p-4 border rounded mb-4 bg-white outline-1 outline-blue-400">
        <p className="mb-2"><strong>Title:</strong> {data?.todo.trim().split(/\s+/)[0]}</p>
        <p className="mb-2"><strong>Description:</strong> {data?.todo}</p>
        <p className="mb-2">
          <strong>Status:</strong> 
          <span className={`ml-2 px-2 py-1 rounded text-sm ${data?.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {data?.completed ? 'Completed' : 'Pending'}
          </span>
        </p>
      </div>
      <Link 
        to="/" 
        search={{ page: 1 }}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Todo List
      </Link>
    </div>
  );
}

export default TodoDetail;