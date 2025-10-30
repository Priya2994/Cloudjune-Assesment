/**
 * LocalStorage utility functions for saving form progress
 */

const STORAGE_KEY = "financial_assistance_form";
const STORAGE_STEP_KEY = "financial_assistance_form_step";

/**
 * Save form data to localStorage
 * @param {Object} formData - The form data to save
 */
export const saveFormData = (formData) => {
  try {
    const dataToSave = {
      ...formData,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    console.log("Form data saved to localStorage");
  } catch (error) {
    console.error("Error saving form data to localStorage:", error);
  }
};

/**
 * Load form data from localStorage
 * @returns {Object|null} The saved form data or null if not found
 */
export const loadFormData = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return parsed;
    }
    return null;
  } catch (error) {
    console.error("Error loading form data from localStorage:", error);
    return null;
  }
};

/**
 * Save current step to localStorage
 * @param {number} step - The current step number
 */
export const saveCurrentStep = (step) => {
  try {
    localStorage.setItem(STORAGE_STEP_KEY, step.toString());
  } catch (error) {
    console.error("Error saving current step to localStorage:", error);
  }
};

/**
 * Load current step from localStorage
 * @returns {number} The saved step number or 1 if not found
 */
export const loadCurrentStep = () => {
  try {
    const savedStep = localStorage.getItem(STORAGE_STEP_KEY);
    return savedStep ? parseInt(savedStep, 10) : 1;
  } catch (error) {
    console.error("Error loading current step from localStorage:", error);
    return 1;
  }
};

/**
 * Clear all saved form data from localStorage
 */
export const clearFormData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_STEP_KEY);
    console.log("Form data cleared from localStorage");
  } catch (error) {
    console.error("Error clearing form data from localStorage:", error);
  }
};

/**
 * Check if there is saved form data
 * @returns {boolean} True if saved data exists
 */
export const hasSavedData = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch (error) {
    console.error("Error checking for saved data:", error);
    return false;
  }
};

/**
 * Get the timestamp when data was last saved
 * @returns {string|null} ISO timestamp or null
 */
export const getLastSavedTime = () => {
  try {
    const savedData = loadFormData();
    return savedData?.savedAt || null;
  } catch (error) {
    console.error("Error getting last saved time:", error);
    return null;
  }
};
