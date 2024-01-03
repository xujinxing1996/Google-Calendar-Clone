function wait(duration: number) {
    // 如果不指定generic 
    // 在.then的时候会获得unknow
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve('ss'), duration);
  });
}

wait(1000).then((value) => console.log(value));


// async
{
    // fetch已经提供了Promise<Response>
    async function wait() {
       return await fetch('ss');
    }

    wait().then((value) => console.log(value.json()));
}