import { useState } from "react";

function useInput(validation, initialValue) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isBlur, setIsBlur] = useState();

  const isValid = validation(inputValue);
  const error = !isValid && isBlur;

  function inputHandler(event) {
    setInputValue(event.currentTarget.value);
  }

  function blurHandler(event) {
    setIsBlur(true);
  }

  function clearInput() {
    setInputValue(initialValue);
    setIsBlur(false);
  }

  function setInput(val) {
    setInputValue(val);
  }

  return {
    inputValue,
    error,
    isValid,
    inputHandler,
    blurHandler,
    clearInput,
    setInput,
  };
}

export default useInput;
