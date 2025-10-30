// Form field configurations
export const FORM_FIELDS = {
  STEP_1: [
    "name",
    "nationalId",
    "dateOfBirth",
    "gender",
    "address",
    "city",
    "state",
    "country",
    "phone",
    "email",
  ],
  STEP_2: [
    "maritalStatus",
    "dependents",
    "employmentStatus",
    "monthlyIncome",
    "housingStatus",
  ],
  STEP_3: [
    "financialSituation",
    "employmentCircumstances",
    "reasonForApplying",
  ],
};

// Form default values
export const FORM_DEFAULT_VALUES = {
  // Step 1: Personal Information
  name: "",
  nationalId: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  email: "",

  // Step 2: Family & Financial Info
  maritalStatus: "",
  dependents: "",
  employmentStatus: "",
  monthlyIncome: "",
  housingStatus: "",

  // Step 3: Situation Descriptions
  financialSituation: "",
  employmentCircumstances: "",
  reasonForApplying: "",
};

// OpenAI prompts for content generation
export const AI_PROMPTS = {
  financialSituation:
    "Write a professional, empathetic paragraph describing someone's current financial difficulties. Include details about unexpected expenses, income challenges, and the impact on basic needs. Keep it between 50-100 words and make it sound personal and genuine.",
  employmentCircumstances:
    "Write a professional paragraph describing someone's current employment situation who needs assistance. Include details about job stability, working hours, and efforts to improve their situation. Keep it between 50-100 words and make it sound authentic.",
  reasonForApplying:
    "Write a professional, compelling paragraph explaining why someone is applying for financial assistance. Include how the assistance will help them achieve stability and independence. Keep it between 50-100 words and make it sincere.",
};

// Arabic prompts for AI content generation
export const AI_PROMPTS_AR = {
  financialSituation:
    "اكتب فقرة مهنية ومتعاطفة تصف الصعوبات المالية الحالية لشخص ما. تشمل التفاصيل حول النفقات غير المتوقعة وتحديات الدخل والتأثير على الاحتياجات الأساسية. اجعلها بين 50-100 كلمة واجعلها تبدو شخصية وحقيقية.",
  employmentCircumstances:
    "اكتب فقرة مهنية تصف الوضع الوظيفي الحالي لشخص يحتاج المساعدة. تشمل التفاصيل حول استقرار العمل وساعات العمل والجهود المبذولة لتحسين الوضع. اجعلها بين 50-100 كلمة واجعلها تبدو أصيلة.",
  reasonForApplying:
    "اكتب فقرة مهنية مقنعة تشرح لماذا يتقدم شخص ما للحصول على المساعدة المالية. تشمل كيف ستساعدهم المساعدة في تحقيق الاستقرار والاستقلالية. اجعلها بين 50-100 كلمة واجعلها صادقة.",
};

// Demo suggestions for fallback when OpenAI API is unavailable
export const DEMO_SUGGESTIONS = {
  financialSituation: [
    "I am currently experiencing financial difficulties due to unexpected medical expenses and reduced working hours. Despite maintaining a steady job, my monthly expenses exceed my income, making it challenging to meet basic needs and maintain financial stability.",
    "My financial situation has become challenging due to a combination of increased living costs and reduced income opportunities. I am working hard to manage my expenses but require temporary assistance to meet essential needs while working toward financial recovery.",
    "I find myself in a difficult financial position following recent unexpected expenses and changes in my employment situation. While I remain committed to improving my circumstances, I currently need support to cover basic living expenses and maintain stability.",
  ],
  employmentCircumstances: [
    "I am currently employed part-time in the retail sector. My employment has been stable for the past two years, though I am seeking additional income opportunities to improve my financial situation. I have relevant skills and experience that could support full-time employment.",
    "I work in a seasonal position which provides steady income during peak periods but leaves gaps during slower months. I am actively pursuing additional training and job opportunities to create more consistent employment and income stability.",
    "My current employment provides valuable experience and steady part-time income, but I am seeking to expand my working hours or find additional employment opportunities. I have strong work ethic and relevant skills that make me a reliable employee.",
  ],
  reasonForApplying: [
    "I am applying for this assistance program to help bridge the gap between my current financial obligations and income. This support would enable me to stabilize my situation while I work towards increasing my earning capacity and achieving long-term financial independence.",
    "This assistance program would provide crucial support during a challenging period in my life. I am committed to using this help responsibly to maintain stability while I work on improving my long-term financial situation and career prospects.",
    "I believe this assistance program aligns with my goals of achieving financial stability and independence. The support would help me manage immediate needs while I focus on building skills and opportunities for sustainable long-term success.",
  ],
};

// Arabic demo suggestions for fallback when OpenAI API is unavailable
export const DEMO_SUGGESTIONS_AR = {
  financialSituation: [
    "أواجه حاليًا صعوبات مالية بسبب النفقات الطبية غير المتوقعة وتقليل ساعات العمل. على الرغم من الحفاظ على وظيفة ثابتة، تتجاوز نفقاتي الشهرية دخلي، مما يجعل من الصعب تلبية الاحتياجات الأساسية والحفاظ على الاستقرار المالي.",
    "أصبح وضعي المالي صعباً بسبب مزيج من ارتفاع تكاليف المعيشة وتقليل فرص الدخل. أعمل بجد لإدارة نفقاتي ولكنني أحتاج إلى مساعدة مؤقتة لتلبية الاحتياجات الأساسية أثناء العمل على التعافي المالي.",
    "أجد نفسي في وضع مالي صعب بعد النفقات غير المتوقعة الأخيرة والتغييرات في وضعي الوظيفي. بينما أبقى ملتزماً بتحسين ظروفي، أحتاج حالياً إلى الدعم لتغطية نفقات المعيشة الأساسية والحفاظ على الاستقرار.",
  ],
  employmentCircumstances: [
    "أعمل حالياً بدوام جزئي في قطاع التجزئة. كانت وظيفتي مستقرة خلال العامين الماضيين، رغم أنني أسعى للحصول على فرص دخل إضافية لتحسين وضعي المالي. لدي مهارات وخبرة ذات صلة يمكن أن تدعم العمل بدوام كامل.",
    "أعمل في منصب موسمي يوفر دخلاً ثابتاً خلال فترات الذروة لكنه يترك فجوات خلال الأشهر الأبطأ. أسعى بنشاط للحصول على تدريب إضافي وفرص عمل لخلق استقرار أكثر ثباتاً في التوظيف والدخل.",
    "توفر وظيفتي الحالية خبرة قيمة ودخلاً ثابتاً بدوام جزئي، لكنني أسعى لتوسيع ساعات عملي أو العثور على فرص عمل إضافية. لدي أخلاقيات عمل قوية ومهارات ذات صلة تجعلني موظفاً موثوقاً.",
  ],
  reasonForApplying: [
    "أتقدم بطلب للحصول على برنامج المساعدة هذا للمساعدة في سد الفجوة بين التزاماتي المالية الحالية ودخلي. هذا الدعم سيمكنني من استقرار وضعي أثناء عملي نحو زيادة قدرتي على الكسب وتحقيق الاستقلال المالي طويل المدى.",
    "سيوفر برنامج المساعدة هذا دعماً حاسماً خلال فترة صعبة في حياتي. أنا ملتزم باستخدام هذه المساعدة بمسؤولية للحفاظ على الاستقرار أثناء عملي على تحسين وضعي المالي طويل المدى وآفاق مهنتي.",
    "أعتقد أن برنامج المساعدة هذا يتماشى مع أهدافي في تحقيق الاستقرار والاستقلال المالي. سيساعدني الدعم في إدارة الاحتياجات الفورية أثناء تركيزي على بناء المهارات والفرص للنجاح المستدام طويل المدى.",
  ],
};

// Application configuration
export const APP_CONFIG = {
  TOTAL_STEPS: 3,
  VALIDATION_POLLING_INTERVAL: 100, // milliseconds - faster validation check
  API_TIMEOUT: 30000, // 30 seconds
  AI_PROCESSING_DELAY: 1000, // milliseconds for fallback content
  OPENAI_MODEL: "gpt-3.5-turbo",
  OPENAI_MAX_TOKENS: 150,
  OPENAI_TEMPERATURE: 0.7,
};

// Success rate for mock API (for demonstration)
export const MOCK_API_SUCCESS_RATE = 0.9; // 90% success rate

// Error messages
export const ERROR_MESSAGES = {
  MISSING_API_KEY:
    "OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your .env file.",
  INVALID_API_KEY: "Invalid API key. Please check your OpenAI API key.",
  RATE_LIMITED: "Rate limit exceeded. Please try again in a moment.",
  SERVICE_UNAVAILABLE:
    "OpenAI service is temporarily unavailable. Please try again later.",
  REQUEST_TIMEOUT:
    "Request timed out. Please check your internet connection and try again.",
  NO_SUGGESTION: "No suggestion received from OpenAI. Please try again.",
  GENERAL_ERROR: "Failed to generate suggestion. Please try again.",
  SUBMISSION_FAILED: "Submission failed",
};

// Mock API responses
export const MOCK_API_RESPONSES = {
  SUCCESS: {
    message: "Application has been received and is under review",
    estimatedProcessingTime: "3-5 business days",
  },
  FAILURE: {
    message: "Service temporarily unavailable. Please try again later.",
    errorCode: "SERVICE_UNAVAILABLE",
  },
};
