type Todo = {
  id: string;
  name: string;
  status: string;
  complete: boolean;
};

type NewTodo = Pick<Todo, 'name' | 'status' | 'complete'>;

type NewTodo2 = Omit<Todo, 'id'>

function saveTodo(todo: NewTodo): Todo {
  return { ...todo, id: crypto.randomUUID() };
}

function renderTodo(todo: Todo) {
  const div = document.createElement('div');
  div.id = todo.id;
}
