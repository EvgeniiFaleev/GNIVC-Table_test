export const debounce = (fn: (input: any)=> void, time: number) => {
  let timer: NodeJS.Timeout;

  return (input: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(input);
    }, time);
  };
};
