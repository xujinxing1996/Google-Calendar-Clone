{
  const PRIORITIES = ['High', 'Medium', 'Low'] as const;
  type Priority = (typeof PRIORITIES)[number];
  type Todo = {
    title: string;
    description: string;
  };
  
  function func(todo: Todo) {
    if (isPriority(todo.description)) {
      return todo.description
    }

    return todo.description;
  }

  function isPriority(description: string): description is Priority {
    return PRIORITIES.includes(description as Priority);
  }
}
