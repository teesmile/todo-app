import React from 'react';

const TodoItem = ({ todo }) => {
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
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
        <span className="text-gray-500 text-sm">◯ Pending</span>
      </div>
    )}
  </div>
</li>

  );
};

export default TodoItem;