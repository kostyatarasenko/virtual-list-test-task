const concatenateStrings = (...args: (string | number)[]): string => {
  return args.join(' ');
}

export {
  concatenateStrings,
};
