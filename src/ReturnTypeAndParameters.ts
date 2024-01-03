function checkLength(a: string, b: number) {
    return a.length > b;
};

type ReturnOfLengthCheck = ReturnType<typeof checkLength>;

type ParametersOfLengthCheck = Parameters<typeof checkLength>;