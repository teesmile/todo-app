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
          <span className="text-gray-500 text-sm">◯ Pending</span>
        )}
      </div>
    </li>
  );
};

export default TodoItem;