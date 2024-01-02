// basic
{
    type Person = {
        name: string;
        age: number;
        isProgrammer?: boolean;
    };

    function getValue(key: keyof Person, person: Person) {
        return person[key];
    }
    
    // string | number | boolean | undefined
    const age = getValue('age', { name: 'xjx', age: 22 });
}