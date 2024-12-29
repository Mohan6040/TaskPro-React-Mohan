import React from 'react';
import { CheckCircle2, Circle, Trash2, Edit } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTaskStore();

  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleComplete}
          className="text-gray-500 hover:text-green-500 dark:text-gray-400"
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <span
          className={`text-gray-800 dark:text-gray-200 ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {task.title}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface TaskListProps {
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const { tasks, filter } = useTaskStore();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;