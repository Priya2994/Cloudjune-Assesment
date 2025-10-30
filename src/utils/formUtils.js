import { FORM_FIELDS } from '../constants'

// Get fields for a specific step
export const getFieldsForStep = (step) => {
  switch (step) {
    case 1:
      return FORM_FIELDS.STEP_1
    case 2:
      return FORM_FIELDS.STEP_2
    case 3:
      return FORM_FIELDS.STEP_3
    default:
      return []
  }
}

// Check if all fields in a step are filled and valid
export const isStepComplete = (step, formValues, errors) => {
  const fieldsForStep = getFieldsForStep(step)
  
  const allFieldsFilled = fieldsForStep.every(field => {
    const value = formValues[field]
    return value && value.toString().trim() !== ''
  })
  
  const hasErrors = fieldsForStep.some(field => errors[field])
  
  return allFieldsFilled && !hasErrors
}