import { useState, useEffect, useCallback } from "react";
import { isStepComplete } from "../utils/formUtils";
import { APP_CONFIG } from "../constants";

export const useFormValidation = (methods, currentStep) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const {
    getValues,
    formState: { errors },
  } = methods;

  const checkCurrentStepValid = useCallback(() => {
    const formValues = getValues();
    const isValid = isStepComplete(currentStep, formValues, errors);
    setIsButtonEnabled(isValid);
  }, [currentStep, getValues, errors]);

  // Check button state when step changes or form values change
  useEffect(() => {
    checkCurrentStepValid();
    // Make function available globally for input onChange handlers
    window.checkCurrentStepValid = checkCurrentStepValid;
    return () => {
      delete window.checkCurrentStepValid;
    };
  }, [checkCurrentStepValid]);

  // Re-check validation more frequently when there are errors
  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0
    const interval = setInterval(() => {
      checkCurrentStepValid();
    }, hasErrors ? 500 : APP_CONFIG.VALIDATION_POLLING_INTERVAL); // Check more frequently if there are errors

    return () => clearInterval(interval);
  }, [checkCurrentStepValid, errors]);

  const isStepValid = (step) => {
    const formValues = getValues();
    return isStepComplete(step, formValues, errors);
  };

  return {
    isButtonEnabled,
    isStepValid,
    checkCurrentStepValid,
  };
};
