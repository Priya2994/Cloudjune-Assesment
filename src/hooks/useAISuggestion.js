import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { generateAIContent } from "../utils/aiUtils";

export const useAISuggestion = (setValue, trigger, checkCurrentStepValid) => {
  const { i18n } = useTranslation();
  const [aiSuggestionPopup, setAiSuggestionPopup] = useState({
    isOpen: false,
    field: "",
    suggestion: "",
    isLoading: false,
    error: null,
  });

  const handleGenerateAI = (field) => {
    generateAIContent(field, setAiSuggestionPopup, i18n.language);
  };

  const handleEditSuggestion = (editedText) => {
    setValue(aiSuggestionPopup.field, editedText);
    trigger(aiSuggestionPopup.field);
    setAiSuggestionPopup({
      isOpen: false,
      field: "",
      suggestion: "",
      isLoading: false,
      error: null,
    });
    setTimeout(() => {
      checkCurrentStepValid();
    }, 0);
  };

  const handleDiscardSuggestion = () => {
    setAiSuggestionPopup({
      isOpen: false,
      field: "",
      suggestion: "",
      isLoading: false,
      error: null,
    });
  };

  return {
    aiSuggestionPopup,
    handleGenerateAI,
    handleEditSuggestion,
    handleDiscardSuggestion,
  };
};
