import {
  AI_PROMPTS,
  AI_PROMPTS_AR,
  DEMO_SUGGESTIONS,
  DEMO_SUGGESTIONS_AR,
  ERROR_MESSAGES,
  APP_CONFIG,
} from "../constants";

export const generateAIContent = async (
  field,
  setAiSuggestionPopup,
  currentLanguage = "en"
) => {
  console.log("generateAIContent called with field:", field);

  setAiSuggestionPopup({
    isOpen: true,
    field,
    suggestion: "",
    isLoading: true,
    error: null,
  });

  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(ERROR_MESSAGES.MISSING_API_KEY);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      APP_CONFIG.API_TIMEOUT
    );

    const prompts = currentLanguage === "ar" ? AI_PROMPTS_AR : AI_PROMPTS;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: APP_CONFIG.OPENAI_MODEL,
        messages: [
          {
            role: "user",
            content:
              prompts[field] ||
              "Write a professional paragraph for an assistance application.",
          },
        ],
        max_tokens: APP_CONFIG.OPENAI_MAX_TOKENS,
        temperature: APP_CONFIG.OPENAI_TEMPERATURE,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(ERROR_MESSAGES.INVALID_API_KEY);
      } else if (response.status === 429) {
        throw new Error(ERROR_MESSAGES.RATE_LIMITED);
      } else if (response.status >= 500) {
        throw new Error(ERROR_MESSAGES.SERVICE_UNAVAILABLE);
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content?.trim();

    if (!suggestion) {
      throw new Error(ERROR_MESSAGES.NO_SUGGESTION);
    }

    setAiSuggestionPopup((prev) => ({
      ...prev,
      suggestion,
      isLoading: false,
    }));
  } catch (error) {
    console.error("OpenAI API Error:", error);

    // Fallback to demo content when API is unavailable
    if (
      error.message.includes("Rate limit") ||
      error.message.includes("API key") ||
      error.message.includes("429")
    ) {
      console.log("Using fallback demo content due to API limitation");

      const demoSuggestions =
        currentLanguage === "ar" ? DEMO_SUGGESTIONS_AR : DEMO_SUGGESTIONS;
      const suggestions = demoSuggestions[field] || [
        currentLanguage === "ar"
          ? "محتوى طلب مساعدة مهني تم إنشاؤه."
          : "Professional assistance application content generated.",
      ];
      const randomSuggestion =
        suggestions[Math.floor(Math.random() * suggestions.length)];

      setTimeout(() => {
        setAiSuggestionPopup((prev) => ({
          ...prev,
          suggestion: randomSuggestion,
          isLoading: false,
          error: null,
        }));
      }, APP_CONFIG.AI_PROCESSING_DELAY);

      return;
    }

    let errorMessage = ERROR_MESSAGES.GENERAL_ERROR;

    if (error.name === "AbortError") {
      errorMessage = ERROR_MESSAGES.REQUEST_TIMEOUT;
    } else if (error.message.includes("service is temporarily unavailable")) {
      errorMessage = error.message;
    }

    setAiSuggestionPopup((prev) => ({
      ...prev,
      isLoading: false,
      error: errorMessage,
    }));
  }
};
