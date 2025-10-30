import { useTranslation } from 'react-i18next'
import { StepTitle, FormField, SelectField, TextAreaField } from './FormComponents'

export const Step1PersonalInfo = () => {
  const { t } = useTranslation()
  
  return (
    <div className="px-6 py-6">
      <StepTitle step={1} title={t('steps.step1')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          name="name"
          label={t('fields.name')}
          placeholder={t('placeholders.enterName')}
          required
        />
        
        <FormField
          name="nationalId"
          label={t('fields.nationalId')}
          placeholder={t('placeholders.enterNationalId')}
          required
        />
        
        <FormField
          name="dateOfBirth"
          label={t('fields.dateOfBirth')}
          type="date"
          required
        />
        
        <SelectField
          name="gender"
          label={t('fields.gender')}
          required
          options={[
            { value: 'male', label: t('options.male') },
            { value: 'female', label: t('options.female') },
            { value: 'other', label: t('options.otherGender') }
          ]}
        />
        
        <FormField
          name="address"
          label={t('fields.address')}
          placeholder={t('placeholders.enterAddress')}
          required
        />
        
        <FormField
          name="city"
          label={t('fields.city')}
          placeholder={t('placeholders.enterCity')}
          required
        />
        
        <FormField
          name="state"
          label={t('fields.state')}
          placeholder={t('placeholders.enterState')}
          required
        />
        
        <FormField
          name="country"
          label={t('fields.country')}
          placeholder={t('placeholders.enterCountry')}
          required
        />
        
        <FormField
          name="phone"
          label={t('fields.phone')}
          placeholder={t('placeholders.enterPhone')}
          type="tel"
          required
        />
        
        <FormField
          name="email"
          label={t('fields.email')}
          placeholder={t('placeholders.enterEmail')}
          type="email"
          required
        />
      </div>
    </div>
  )
}

export const Step2FamilyFinancial = () => {
  const { t } = useTranslation()
  
  return (
    <div className="px-6 py-6">
      <StepTitle step={2} title={t('steps.step2')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <SelectField
          name="maritalStatus"
          label={t('fields.maritalStatus')}
          required
          options={[
            { value: 'single', label: t('options.single') },
            { value: 'married', label: t('options.married') },
            { value: 'divorced', label: t('options.divorced') },
            { value: 'widowed', label: t('options.widowed') }
          ]}
        />
        
        <FormField
          name="dependents"
          label={t('fields.dependents')}
          placeholder={t('placeholders.enterDependents')}
          type="number"
          required
        />
        
        <SelectField
          name="employmentStatus"
          label={t('fields.employmentStatus')}
          required
          options={[
            { value: 'employed', label: t('options.employed') },
            { value: 'unemployed', label: t('options.unemployed') },
            { value: 'self-employed', label: t('options.selfEmployed') },
            { value: 'student', label: t('options.student') },
            { value: 'retired', label: t('options.retired') }
          ]}
        />
        
        <FormField
          name="monthlyIncome"
          label={t('fields.monthlyIncome')}
          placeholder={t('placeholders.enterIncome')}
          type="number"
          required
        />
        
        <SelectField
          name="housingStatus"
          label={t('fields.housingStatus')}
          required
          options={[
            { value: 'owned', label: t('options.owned') },
            { value: 'rented', label: t('options.rented') },
            { value: 'with-family', label: t('options.withFamily') },
            { value: 'other', label: t('options.otherHousing') }
          ]}
        />
      </div>
    </div>
  )
}

export const Step3SituationDescription = ({ onGenerateAI }) => {
  const { t } = useTranslation()
  
  return (
    <div className="px-6 py-6">
      <StepTitle step={3} title={t('steps.step3')} />
      <div className="space-y-6">
        <TextAreaField
          name="financialSituation"
          label={t('fields.financialSituation')}
          placeholder={t('placeholders.describeFinancialSituation')}
          required
          onGenerateAI={onGenerateAI}
        />
        
        <TextAreaField
          name="employmentCircumstances"
          label={t('fields.employmentCircumstances')}
          placeholder={t('placeholders.describeEmployment')}
          required
          onGenerateAI={onGenerateAI}
        />
        
        <TextAreaField
          name="reasonForApplying"
          label={t('fields.reasonForApplying')}
          placeholder={t('placeholders.explainReason')}
          required
          onGenerateAI={onGenerateAI}
        />
      </div>
    </div>
  )
}