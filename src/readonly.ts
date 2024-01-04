type Person = {
    name: string;
    idCard?: string;
};

const person = { name: 'xjx', id: '1' } as const;

type PersonRequired1 = typeof person;

type PersonRequired = Required<Person>;