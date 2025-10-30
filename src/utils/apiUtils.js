import { MOCK_API_SUCCESS_RATE, MOCK_API_RESPONSES } from "../constants";

export const mockSubmitApplication = async (data) => {
  // Simulate random success/failure for demonstration
  const isSuccess = Math.random() > 1 - MOCK_API_SUCCESS_RATE;

  if (isSuccess) {
    return {
      success: true,
      referenceId: `APP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      message: MOCK_API_RESPONSES.SUCCESS.message,
      estimatedProcessingTime:
        MOCK_API_RESPONSES.SUCCESS.estimatedProcessingTime,
      data: {
        submittedAt: new Date().toISOString(),
        status: "pending_review",
        applicantId:
          data.nationalId || `USER-${Math.floor(Math.random() * 10000)}`,
      },
    };
  } else {
    return {
      success: false,
      message: MOCK_API_RESPONSES.FAILURE.message,
      errorCode: MOCK_API_RESPONSES.FAILURE.errorCode,
    };
  }
};
