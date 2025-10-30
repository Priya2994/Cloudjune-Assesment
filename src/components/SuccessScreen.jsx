
import { useTranslation } from 'react-i18next'

const SuccessScreen = ({ 
  submissionData, 
  onSubmitAnother, 
  onPrint 
}) => {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        {submissionData && (<><h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {t('success.title')}
              </h1><p className="text-gray-600 mb-6">
                      {t('success.message')}
                  </p></>)}
       
    
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onSubmitAnother}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {t('success.submitAnother')}
          </button>
          
          <button
            onClick={onPrint}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            {t('success.print')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessScreen