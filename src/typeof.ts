// basic
// 使用typeof 提高可维护
{
    const person = { name: 'xjx', age: 22 };
    const people: { name: string; age: number; }[] = [];

    people.push({ name: 'tt', age: 23 });
}

// typeof
{
    const person = { name: 'xjx', age: 22 };
    const people: (typeof person)[] = [];

    people.push({ name: 'tt', age: 23 });
}

// funcType
{
    function sayHi(name: string) {
        console.log(name)
    }

    type FuncType = typeof sayHi;
}