import { useState } from 'react'
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
import { FORM_DEFAULT_VALUES, APP_CONFIG, ERROR_MESSAGES } from './constants'

function App() {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionData, setSubmissionData] = useState(null)

  // Initialize form
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { handleSubmit, setValue, trigger } = methods

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
      console.log('Submitting application data:', data)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockApiResponse = await mockSubmitApplication(data)
      
      if (mockApiResponse.success) {
        setSubmissionData(mockApiResponse)
        setIsSubmitted(true)
        console.log('Submission successful:', mockApiResponse)
      } else {
        throw new Error(mockApiResponse.message || t('validation.required'))
      }
      
    } catch (error) {
      console.error('Submission error:', error)
      alert(`Submission failed: ${error.message}`)
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
    methods.reset()
    setCurrentStep(1)
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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