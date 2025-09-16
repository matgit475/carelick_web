import * as React from "react";

const useToggleVisibility = () => {
  // State for controlling password visibility
  const [showPassword, setShowPassword] = React.useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    showPassword,
    togglePasswordVisibility,
  };
};

export default useToggleVisibility;
