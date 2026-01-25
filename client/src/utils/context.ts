export const throwContextError = (hook: string, provider: string): void => {
  throw new Error(`${hook} must be used inside ${provider}`);
};
