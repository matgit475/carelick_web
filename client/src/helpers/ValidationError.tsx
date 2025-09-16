const validationError = (error: any, key: string, name: string) => {
  return (
    error?.status === 422 && JSON.parse(error?.message)?.errors[key]?.[name]
  );
};

export default validationError;
