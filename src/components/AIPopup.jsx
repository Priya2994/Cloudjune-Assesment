import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AIPopup = ({ 
  aiSuggestionPopup, 
  onEditSuggestion, 
  onDiscardSuggestion 
}) => {
  const { t } = useTranslation()
  const [editedText, setEditedText] = useState('')

  // Update editedText when suggestion changes
  React.useEffect(() => {
    if (aiSuggestionPopup.suggestion) {
      setEditedText(aiSuggestionPopup.suggestion)
    }
  }, [aiSuggestionPopup.suggestion])

  if (!aiSuggestionPopup.isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            {t('ai.generateSuggestion')}
          </h3>
          <p className="text-gray-600 mt-1">
            {t('ai.editSuggestion')}
          </p>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {aiSuggestionPopup.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">{t('ai.loading')}</span>
            </div>
          ) : aiSuggestionPopup.error ? (
            <div className="text-center py-8">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h4 className="text-lg font-medium text-gray-800 mb-2">{t('ai.errorGenerating')}</h4>
                <p className="text-gray-600">{aiSuggestionPopup.error}</p>
              </div>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onDiscardSuggestion}
                  className="btn-secondary"
                >
                  {t('ai.close')}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('ai.editSuggestion')}:
              </label>
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={t('ai.loading')}
              />

              <div className="flex gap-3 justify-end">
                <button
                  onClick={onDiscardSuggestion}
                  className="btn-secondary"
                >
                  {t('ai.discard')}
                </button>
                <button
                  onClick={() => onEditSuggestion(editedText)}
                  className="btn-primary"
                  disabled={!editedText.trim()}
                >
                  {t('ai.useSuggestion')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIPopup