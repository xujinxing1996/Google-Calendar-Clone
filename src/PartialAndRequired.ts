{
  type Todo = {
    title: string;
    completed: boolean;
    address?: {
      street?: string;
    };
  };

  type PartialFormTodo = Partial<Todo>;
  type RequiredFormTodo = Required<Todo>;

  // 非option的属性会被required的属性覆盖
  type ComplexFormTodo = Required<Pick<Todo, 'title'>> & Omit<Todo, 'title'>;
  // 覆盖实现
  type ComplexFormTodoOverride = Required<Pick<Todo, 'title'>> & Todo;
  // 还是会被required覆盖
  type ComplexFormTodoPartial = Partial<Pick<Todo, 'title'>> & Todo;
  // 可以用omit解决
  type ComplexFormTodoOmit = Partial<Pick<Todo, 'title'>> & Omit<Todo, 'title'>;

  const formTodo: ComplexFormTodoOmit = {
    // title: 's',
    completed: false,
  };

  type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>> & T;
  type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>> &
    Omit<T, 'title'>;

  const formTodo2: RequiredPick<Todo, 'title'> = {
    title: 't',
    completed: true,
  };

  const formTodo3: PartialPick<Todo, 'title'> = {
    // title: 't',
    completed: true,
  };
}
