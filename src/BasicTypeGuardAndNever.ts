{
  type Todo = {
    name: string;
    priority: 'High' | 'Normal' | 'Low';
    description?: string;
    date: string | Date;
  };

  function renderTodo(todo: Todo) {
    if (typeof todo.date === 'string') {
      console.log(todo.date.length);
    }
    if (todo.date instanceof Date) {
      console.log(todo.date.getDate);
    }
    console.log('todo', todo.description?.length);
    console.log(todo.priority)
    switch(todo.priority) {
        case 'High':
            break;
        case 'Normal':
            break;
        case 'Low':
            break;
        case 'w':
            break;
        default:
            console.log(todo.priority);
    }
  }

  const todo: Todo = { name: 'xjx', date: '2024', priority: 'High' };

  renderTodo(todo);
}
