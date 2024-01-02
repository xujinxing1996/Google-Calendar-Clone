// basic
// 如果添加一个新的skillLevel类型：比如 "Master"
// 需要在两个定义的地方同时添加"Master"
{
  type Person = {
    name: string;
    skillLevel: 'Beginner' | 'Intermediate' | 'Expert' | 'Master';
  };

  const printSkillLevel = (
    skillLevel: 'Beginner' | 'Intermediate' | 'Expert' | 'Master'
  ) => {
    console.log(skillLevel);
  };

  const person: Person = { name: 'xjx', skillLevel: 'Beginner' };

  printSkillLevel(person.skillLevel);

  // 使用Index Types 和 type可以带来更好的维护

  // Index Types:

  // type Person = {
  //   name: string;
  //   skillLevel: "Beginner" | "Intermediate" | "Expert";
  // };

  // const printSkillLevel = (skillLevel: Person["skillLevel"]) => {
  //   console.log(skillLevel);
  // };

  // const person: Person = { name: 'xjx', skillLevel: 'Beginner' };

  // printSkillLevel(person.skillLevel);

  // Type:

  // type Person = {
  //   name: string;
  //   skillLevel: SkillLevel;
  // };

  // type SkillLevel = "Beginner" | "Intermediate" | "Expert" ;

  // const printSkillLevel = (skillLevel: SkillLevel) => {
  //   console.log(skillLevel);
  // };

  // const person: Person = { name: 'xjx', skillLevel: 'Beginner' };

  // printSkillLevel(person.skillLevel);
}

{
  type Person = {
    name: string;
    skillLevel: 'Beginner' | 'Intermediate' | 'Expert';
  };

  type PeopleGroupedBySkillLevel = {
    [index: string]: Person[];
  };

  const a: PeopleGroupedBySkillLevel = {
    'Beginner': [{ name: 'xjx', skillLevel: 'Beginner' }],
  };
}

{
    const a = ['a', 'b', true];
    // string
    type A = (typeof a)[number];
}

{
    const a = {name: 'JXx', age: 22};
    // string
    type A = (typeof a)['name'];

    // number
    type B = (typeof a)['age'];
}

{
    const a = {name: 'JXx', age: 22};
    
    // string | number
    type A = (typeof a)[keyof typeof a];
}

