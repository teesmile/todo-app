import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react"; // Added useEffect import
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]); // Added local todos state

  // Ensure numbers are properly parsed
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const skip = (page - 1) * limit;

  // Always fetch all todos and filter client-side
  const apiUrl = "https://dummyjson.com/todos";
  const apiParams = {
    limit: 150, 
  };

  const { data, loading, error } = useFetch(apiUrl, apiParams);

  // Initialize todos from API data
  useEffect(() => {
    if (data?.todos) {
      setTodos(data.todos);
    }
  }, [data]);

  const filteredTodos = () => {
    let filtered = [...todos]; // Use local todos state
    
    // Apply filter
    if (searchParams.filter === "completed") {
      filtered = filtered.filter(todo => todo.completed);
    } else if (searchParams.filter === "active") {
      filtered = filtered.filter(todo => !todo.completed);
    }
    
    // Apply search
    if (searchParams.search) {
      filtered = filtered.filter(todo =>
        todo.todo.toLowerCase().includes(searchParams.search.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleAddTodo = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: newTodo,
          completed: false,
          userId: 5,
        })
      });
      
      const result = await response.json();
      
      // Add new todo to beginning of the list with temporary ID
      setTodos(prev => [{
        ...result,
        id: Date.now() // Temporary unique ID since dummyjson doesn't persist
      }, ...prev]);
      
      setIsModalOpen(false);
      setNewTodo('');
      
      // Reset filters to show the new todo
      setLocalSearch('');
      setLocalFilter('all');
      navigate({
        search: {
          ...searchParams,
          search: '',
          filter: 'all',
          page: 1,
        },
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Apply pagination to the filtered results
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
      <h1 className="px-3 text-2xl font-bold mb-4 text-blue-600">Todo List</h1>

      <form onSubmit={handleSubmit} className="w-full p-6 space-y-4 px-3">
  <div className="flex flex-col sm:flex-row gap-3">
    <input
      name="search"
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      placeholder="Search todos..."
      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    
    
    <button
      type="button"
      onClick={() => setIsModalOpen(true)}
      className="w-full sm:w-auto bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 flex items-center justify-center"
    >
      <span className="text-xl">+</span>
    </button>
    
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
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo) => (
            <div key={todo.id} className="list-none flex items-center gap-3 rounded-lg hover:shadow-md transition-shadow">
              <Link
                to="/todos/$id"
                params={{ id: todo.id }}
                search={searchParams}
                className="flex-1 hover:bg-gray-50 rounded"
              >
                <TodoItem todo={todo} />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No todos found matching your criteria
          </div>
        )}
      </div>

     {totalPages > 1 && (
  <Pagination 
    currentPage={page} 
    totalPages={totalPages}
    searchParams={searchParams}
  />
)}
 {isModalOpen && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg overflow-auto">
      <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter todo text..."
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={!newTodo.trim()}
        >
          Add Todo
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Home;