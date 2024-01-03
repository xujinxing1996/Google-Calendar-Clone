{
  let a = 1 as const;
  const b = 2;

  // error
  a = 3;

  const o = { name: 'xjx' } as const;
  // error
  o.name = 'test';

  const skillLevel = ['Beginner', 'Intermediate', 'Expert'] as const;
  type SkillLevelEnums = (typeof skillLevel)[number];

  const level: SkillLevelEnums = 'ddd';
}
