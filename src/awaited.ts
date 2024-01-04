async function fuc() {
  return 3;
}

type Value = Awaited<ReturnType<typeof fuc>>;
