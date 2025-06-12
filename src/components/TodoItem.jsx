import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <li className="p-3 border rounded mb-4">
      {todo.todo}
    </li>
  );
};

export default TodoItem;
