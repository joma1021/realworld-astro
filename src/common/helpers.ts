export const validateInput = (input: unknown) => {
  return typeof input === "string" && input.length > 0;
};
