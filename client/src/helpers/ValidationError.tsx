import React from "react";

const validationError = (fieldErrors: any, key: string) => {
  const arr = fieldErrors?.errors?.[key];
  if (arr?.length == 1) return arr[0];
  else if (arr?.length > 1)
    return (
      <ul>
        {arr.map((error: any) => (
          <li>{error}</li>
        ))}
      </ul>
    );
  else null;
};

export default validationError;
