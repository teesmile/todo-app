import React from 'react';


const TodoItem = ({ todo }) => {
  if (!todo) return <div className="p-4 text-red-500">Todo data missing</div>;
  return (
    <li className={`p-3 border rounded mb-2 ${todo.completed ? 'bg-green-50' : ''}`}>
  <div className="flex justify-between items-center">
    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
      {todo.todo}
    </span>

    {todo.completed ? (
      <span className="text-green-500 text-sm">✓ Completed</span>
    ) : (
      <div className="flex items-center gap-2">
      
        <span className="text-gray-400 text-sm">◯ Pending</span>
      </div>
    )}
  </div>
</li>

  );
};

export default TodoItem;