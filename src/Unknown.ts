function funcAny(data: any) {
  console.log(data.name);
}

function funcUnknown(data: unknown) {
  // error
  console.log(data.name);
  if (
    data !== null &&
    data instanceof Object &&
    'name' in data &&
    typeof data.name === 'string'
  ) {
    console.log(data.name.length);
  }
}
