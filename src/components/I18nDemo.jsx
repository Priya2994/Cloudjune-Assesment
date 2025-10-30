import { useTranslation } from 'react-i18next'

const I18nDemo = () => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    
    // Update document direction for RTL/LTR
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{t('app.title')}</h3>
          <p className="text-sm text-gray-600">{t('app.subtitle')}</p>
          <p className="text-xs text-gray-500 mt-1">
            Current Language: {i18n.language === 'en' ? 'English' : 'العربية'}
          </p>
        </div>
        <button
          onClick={toggleLanguage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {i18n.language === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
    </div>
  )
}

export default I18nDemo