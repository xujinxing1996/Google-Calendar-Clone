// basic
{
  type Person = {
    name: string;
    age: number;
  };

  type GroupedPeople<T> = {
    [index: string]: T;
  };

  type GroupedPeopleRecord<T> = Record<string, T>;

  const person: GroupedPeopleRecord<string | number> = { name: 'xjx', age: 12 };
}
