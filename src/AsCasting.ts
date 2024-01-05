{
    type Todo = {
        name: string;
        completed: boolean;
    };
    
    fetch('we').then((res) => res.json()).then((todo) => todo as Todo).then((todo) => todo);
}