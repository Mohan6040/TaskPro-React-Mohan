const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const createTask = async (task: { title: string; userId: number }) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
};

export const updateTaskStatus = async (
  taskId: number,
  updates: { completed: boolean }
) => {
  const response = await fetch(`${API_URL}/todos/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
};

export const deleteTaskApi = async (taskId: number) => {
  const response = await fetch(`${API_URL}/todos/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return true;
};