
const StepIndicator = ({ currentStep, isStepValid }) => (
  <div className="flex items-center justify-center mb-5 mt-8 px-4">
    {[1, 2, 3].map((step, index) => (
      <div key={step} className="flex items-center">
        <div className={`step-indicator ${
          step === currentStep ? 'active' : 
          step < currentStep ? 'completed' : 
          isStepValid(step) ? 'bg-blue-200 text-blue-700' : 'inactive'
        }`}>
          {step < currentStep ? '✓' : step}
        </div>
        {index < 2 && (
          <div className={`step-line mx-2 w-8 sm:w-16 ${
            step < currentStep ? 'completed' : ''
          }`} />
        )}
      </div>
    ))}
  </div>
)

export default StepIndicator