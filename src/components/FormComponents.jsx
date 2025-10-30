import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const StepTitle = ({ step, title }) => {
  const { t } = useTranslation()
  
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {t('app.step', { current: step })}: {title}
          </h2>
        </div>
        <div className="text-right mt-2 sm:mt-0">
          <div className="text-sm text-gray-500">{t('validation.required')} *</div>
          <div className="text-xs text-gray-400 mt-1">All fields must be completed</div>
        </div>
      </div>
    </div>
  )
}

export const FormField = ({ name, label, type = "text", placeholder, required = false, children, ...props }) => {
  const { register, formState: { errors }, getValues } = useFormContext()
  const { t } = useTranslation()
  
  // Simple validation rules - focus only on name field
  const getValidationRules = () => {
    const rules = {}
    
    if (required) {
      rules.required = t('validation.required')
    }
    
    // Name field: only letters and spaces allowed
    if (name === 'name') {
      rules.pattern = {
        value: /^[a-zA-Z\s]+$/,
        message: t('validation.nameInvalid')
      }
    }
    
    // National ID field: exactly 8 digits or letters
    if (name === 'nationalId') {
      rules.validate = {
        exactLength: (value) => {
          if (!value) return true;
          if (value.length < 8) {
            return t('validation.nationalIdTooShort');
          }
          if (value.length > 8) {
            return t('validation.nationalIdTooLong');
          }
          if (!/^[0-9a-zA-Z]+$/.test(value)) {
            return t('validation.nationalIdInvalid');
          }
          return true;
        }
      }
    }
    
    // Email field: proper email format
    if (name === 'email') {
      rules.pattern = {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: t('validation.email')
      }
    }
    
    // Mobile field: proper mobile number format
    if (name === 'mobile' || name === 'phone') {
      rules.validate = {
        validMobile: (value) => {
          if (!value) return true;
          
          // First check: only digits and optional + at start
          if (!/^(\+?[0-9]+)$/.test(value)) {
            return t('validation.phoneOnlyNumbers');
          }
          
          // Second check: must not contain any letters or special characters
          if (/[a-zA-Z\s\-().,;:!@#$%^&*]/.test(value)) {
            return t('validation.phoneOnlyNumbers');
          }
          
          // Remove optional + for length check
          const cleanNumber = value.replace(/^\+/, '');
          
          // Must have at least 10 digits and max 15 digits
          if (cleanNumber.length < 10) {
            return t('validation.phoneTooShort');
          }
          if (cleanNumber.length > 15) {
            return t('validation.phoneTooLong');
          }
          
          return true;
        }
      }
    }
    
    return rules
  }

  // Check if current field value is valid
  const isCurrentValueValid = () => {
    const currentValue = getValues(name) || ''
    
    // For name field, check if it contains only letters and spaces
    if (name === 'name') {
      return /^[a-zA-Z\s]*$/.test(currentValue) // Allow empty while typing
    }
    
    // For national ID field, check length and characters
    if (name === 'nationalId') {
      if (currentValue.length === 0) return true; // Allow empty while typing
      if (currentValue.length !== 8) return false; // Must be exactly 8 characters
      return /^[0-9a-zA-Z]{8}$/.test(currentValue); // Must be alphanumeric
    }
    
    // For email field, check if it's a valid email format
    if (name === 'email') {
      if (currentValue.length === 0) return true; // Allow empty while typing
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(currentValue);
    }
    
    // For mobile field, check if it's a valid mobile number
    if (name === 'mobile' || name === 'phone') {
      if (currentValue.length === 0) return true; // Allow empty while typing
      
      // Reject any letters, spaces, or special characters immediately
      if (/[a-zA-Z\s\-().,;:!@#$%^&*]/.test(currentValue)) return false;
      
      // Only allow digits and optional + at the start
      if (!/^(\+?[0-9]*)$/.test(currentValue)) return false;
      
      return true;
    }
    
    return true // Other fields are valid by default for now
  }

  // Register field with validation
  const registerField = register(name, getValidationRules())

  if (children) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
        )}
      </div>
    )
  }

  const currentValue = getValues(name) || ''
  const hasError = !!errors[name]
  const isValid = isCurrentValueValid()
  
  // Determine border color
  const getBorderColor = () => {
    if (hasError && !isValid) return 'border-red-500 focus:ring-red-500 focus:border-red-500'
    if (currentValue && isValid) return 'border-green-500 focus:ring-blue-500 focus:border-blue-500'
    return 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
  }
  
  // Determine if error should show
  const shouldShowError = hasError && !isValid

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        className={`form-input transition-colors duration-200 ${getBorderColor()}`}
        placeholder={placeholder}
        {...registerField}
        {...props}
      />
      {shouldShowError && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  )
}

// Simple SelectField for other form fields
export const SelectField = ({ name, label, options, required = false, placeholder }) => {
  const { register, formState: { errors } } = useFormContext()
  const { t } = useTranslation()
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className="form-select"
        {...register(name, { required: required ? t('validation.required') : false })}
      >
        <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  )
}

// Simple TextAreaField for other form fields
export const TextAreaField = ({ name, label, required = false, placeholder, rows = 4, onGenerateAI }) => {
  const { register, formState: { errors } } = useFormContext()
  const { t } = useTranslation()
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {(name === 'financialSituation' || name === 'employmentCircumstances' || name === 'reasonForApplying') && onGenerateAI ? (
          <button
            type="button"
            onClick={() => onGenerateAI(name)}
            className="btn-ai"
          >
            ✨ {t('ai.generateSuggestion')}
          </button>
        ) : null}
      </div>
      <textarea
        className="form-textarea"
        rows={rows}
        placeholder={placeholder}
        {...register(name, { required: required ? t('validation.required') : false })}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  )
}