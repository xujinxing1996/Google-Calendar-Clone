{
  function getSecond<ArrayType>(array: ArrayType[]) {
    return array[1];
  }

  const a = [1, 2];
  const b = ['tt', 'tt'];

  const restA = getSecond(a);
  //   const restA = getSecond<number>(a);
  const restB = getSecond(b);

  const c = new Set<string>();
  // error
  c.add(1);

  type APIResponse<T extends object = { status: number }> = {
    data: T;
    isError: boolean;
  };

  type UserResponse = APIResponse<{ name: string }>;

  function aToO<T>(array: [string, T][]) {
    return array.reduce<{ [index: string]: T }>((prev, current) => {
      const [key, value] = current;
      prev[key] = value;
      return prev;
    }, {});
  }

  const arr: [string, number | boolean][] = [
    ['keyOne', 1],
    ['keyTwo', 2],
    ['keyThree', true],
  ];

  const obj = aToO(arr);
}
