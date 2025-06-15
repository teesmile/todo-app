import React from "react";
import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <div className="group flex items-center gap-3 py-3 px-4 hover:bg-muted/50 rounded-lg">
      <span className={`flex-1 ${todo.completed ? 'line-through text-muted-200' : 'text-primary'}`}>
        {todo.todo}
      </span>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
        
        <span 
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className="cursor-pointer"
        >
          {todo.completed ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0 stroke-green-500 stroke-2" />
          ) : (
            <Circle className="h-5 w-5 flex-shrink-0 " />
          )}
        </span>
      </div>
    </div>
  );
};

export default TodoItem;