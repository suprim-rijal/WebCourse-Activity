import { useState } from "react";

// Small helper for controlled inputs:
// const email = useField("email");  ->  <input {...email} />
const useField = (type, initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};

export default useField;
