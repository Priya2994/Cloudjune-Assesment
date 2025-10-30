import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SuccessScreen from './components/SuccessScreen'
import StepIndicator from './components/StepIndicator'
import AIPopup from './components/AIPopup'
import LanguageSwitcher from './components/LanguageSwitcher'
import { Step1PersonalInfo, Step2FamilyFinancial, Step3SituationDescription } from './components/StepComponents'
import { useFormValidation } from './hooks/useFormValidation'
import { useAISuggestion } from './hooks/useAISuggestion'
import { mockSubmitApplication } from './utils/apiUtils'
import { getFieldsForStep } from './utils/formUtils'
import { saveFormData, loadFormData, saveCurrentStep, loadCurrentStep, clearFormData, hasSavedData } from './utils/localStorage'
import { FORM_DEFAULT_VALUES, APP_CONFIG } from './constants'

function App() {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionData, setSubmissionData] = useState(null)
  const [showRestorePrompt, setShowRestorePrompt] = useState(false)
  const [formKey, setFormKey] = useState(0) // Key to force re-render
  const [allowAutoSave, setAllowAutoSave] = useState(false) // Control auto-save

  // Initialize form with default values (will be overridden if loading from localStorage)
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { handleSubmit, setValue, trigger, watch, reset } = methods

  // Watch all form values for auto-save
  const formValues = watch()

  // Load saved data on mount
  useEffect(() => {
    if (hasSavedData()) {
      setShowRestorePrompt(true)
      // Don't allow auto-save until user makes a choice
      setAllowAutoSave(false)
    } else {
      // No saved data, allow auto-save immediately
      setAllowAutoSave(true)
    }
  }, [])

  // Auto-save form data whenever it changes
  useEffect(() => {
    // Only run auto-save if explicitly allowed
    if (!allowAutoSave) {
      return
    }

    const timeoutId = setTimeout(() => {
      // Only save if not submitted and has some data
      if (!isSubmitted && formValues) {
        saveFormData(formValues)
        saveCurrentStep(currentStep)
      }
    }, 500) // Debounce saves by 500ms

    return () => clearTimeout(timeoutId)
  }, [formValues, currentStep, isSubmitted, allowAutoSave])

  // Handle restore saved data
  const handleRestoreSavedData = () => {
    const savedData = loadFormData()
    const savedStep = loadCurrentStep()
    
    if (savedData) {
      // Remove the savedAt timestamp from data
      const { savedAt: _savedAt, ...formDataToRestore } = savedData
      const completeData = { ...FORM_DEFAULT_VALUES, ...formDataToRestore }
      // Use reset to populate all form values at once
      reset(completeData, {
        keepDefaultValues: false,
        keepDirty: false,
        keepErrors: false
      })
      setCurrentStep(savedStep)
      setFormKey(prev => prev + 1)
      setTimeout(() => {
        trigger().then(() => {
          checkCurrentStepValid()
        })
      }, 200)
    } else {
      console.log('No saved data found')
    }
    
    // Enable auto-save after restore choice is made
    setAllowAutoSave(true)
    setShowRestorePrompt(false)
  }

  // Handle discard saved data
  const handleDiscardSavedData = () => {
    clearFormData()
    // Enable auto-save after discard choice is made
    setAllowAutoSave(true)
    setShowRestorePrompt(false)
  }

  // Custom hooks
  const { isButtonEnabled, isStepValid, checkCurrentStepValid } = useFormValidation(methods, currentStep)
  const { aiSuggestionPopup, handleGenerateAI, handleEditSuggestion, handleDiscardSuggestion } = useAISuggestion(setValue, trigger, checkCurrentStepValid)

  // Navigation functions
  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isStepValidResult = await trigger(fieldsToValidate)
    
    if (isStepValidResult && currentStep < APP_CONFIG.TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockApiResponse = await mockSubmitApplication(data)
      
      if (mockApiResponse.success) {
        setSubmissionData(mockApiResponse)
        setIsSubmitted(true)
        // Clear saved data after successful submission
        clearFormData()
        console.log('Submission successful:', mockApiResponse)
      } else {
        throw new Error(mockApiResponse.message || t('validation.required'))
      }
      
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo />
      case 2:
        return <Step2FamilyFinancial />
      case 3:
        return <Step3SituationDescription onGenerateAI={handleGenerateAI} />
      default:
        return <Step1PersonalInfo />
    }
  }

  // Reset form function
  const resetForm = () => {
    setIsSubmitted(false)
    setSubmissionData(null)
    reset(FORM_DEFAULT_VALUES)
    setCurrentStep(1)
    clearFormData()
  }

  // Success screen
  if (isSubmitted) {
    return (
      <SuccessScreen 
        submissionData={submissionData}
        onSubmitAnother={resetForm}
        onPrint={() => window.print()}
      />
    )
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px- md:px-4">
          
          {/* Restore Progress Prompt */}
          {showRestorePrompt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  📋 {t('app.restoreProgress') || 'Restore Progress?'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('app.restoreMessage') || 'We found a saved application in progress. Would you like to continue where you left off?'}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleRestoreSavedData}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {t('app.restore') || 'Restore'}
                  </button>
                  <button
                    onClick={handleDiscardSavedData}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    {t('app.startFresh') || 'Start Fresh'}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
              
              <div className="py-6 px-6">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t('app.title')}</h1>
                <p className="text-blue-100">{t('app.subtitle')}</p>
              </div>
              <div>
                 <LanguageSwitcher />
              </div>
            </div>
            
            <StepIndicator currentStep={currentStep} isStepValid={isStepValid} />
            
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" key={formKey}>
              {renderCurrentStep()}
              
              {/* Navigation buttons */}
              <div className="flex justify-between items-center px-6 pb-6">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`btn-secondary ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {t('navigation.previous')}
                </button>
                
                {currentStep < APP_CONFIG.TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isButtonEnabled}
                    className={`btn-primary ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {t('navigation.next')}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isButtonEnabled || isSubmitting}
                    className={`btn-primary bg-green-600 hover:bg-green-700 focus:ring-green-500 ${(!isButtonEnabled || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? t('navigation.submitting') : t('navigation.submit')}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* AI Popup */}
      <AIPopup 
        aiSuggestionPopup={aiSuggestionPopup}
        onEditSuggestion={handleEditSuggestion}
        onDiscardSuggestion={handleDiscardSuggestion}
      />
    </FormProvider>
  )
}

export default App