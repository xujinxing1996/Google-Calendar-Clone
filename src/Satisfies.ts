{
    type Todo = {
        name: string;
        date: string | Date;
        completed: boolean;
    };

    // error
    const todo1: Todo = {
        name: 'xjx',
        date: new Date(),
        completed: false,
    };

    todo1.date.getDate();

    // success
    const todo2 = {
        name: 'xjx',
        date: new Date(),
        completed: 1,
    } satisfies Todo ;

    todo2.date.getDate();
}