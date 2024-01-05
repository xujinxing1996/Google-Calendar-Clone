{
  function func(name: string): number
  function func(name: number, age: number): number
  function func(name: string | number, age?: number) {
    if (age) {
        return age;
    }

    return 1;
  }

  func('xx');
  func(3, 1);
}
