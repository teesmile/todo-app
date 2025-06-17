import React from "react";
import { CircleCheck, CircleDashed, Trash2, SquarePen } from "lucide-react";

const TodoItem = ({ todo }) => {
  if (!todo) return <div className="p-4 text-red-500">Todo data missing</div>;
  return (
    <li
      className={`p-3 border rounded mb-2 ${
        todo.completed ? "bg-green-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`flex-grow ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.todo}
        </span>

        <div
          className="flex items-center gap-[1/2] pr-2 pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          {todo.completed ? (
            <CircleCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
          ) : (
            <CircleDashed className="h-5 w-5 text-gray-400 flex-shrink-0" />
          )}

          <div className="pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Delete todo");
              }}
              className="text-gray-400 hover:text-red-500 transition-colors ml-1"
              aria-label="Delete todo "
            >
              <Trash2 className="p-0 h-5 w-5 flex-shrink-0" />
            </button>
           
           
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
