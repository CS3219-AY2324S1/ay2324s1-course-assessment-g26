import axios from 'axios';

const attemptsServiceClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_EXPRESS_SERVER,
    // other custom settings
});

export const createAttemptRecord = async (email, question_id, question_title, code) => {
  try {
      console.log(`Creating new attempt for question ${question_id}:${question_title} by ${email}`);

      console.log("CODE IS: " + code);

      const response = await attemptsServiceClient.post(
          `attempts/${email}`, {question_id: question_id, question_title: question_title, code:code }
      );
      return response;

  } catch (error) {
      throw new Error(error.response?.data?.message);
  }
};


export const getAttemptHistory = async (email) => {
    try {
        console.log(`Retrieving attempt history for ${email}`);
        const response = await attemptsServiceClient.get(
            `/attempts/${email}`
        );
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
};

export const getAttempt = async (email, attempt_id) => {
    try {
        console.log(`Retrieving attempt ${attempt_id} for ${email}`);
        const response = await attemptsServiceClient.get(
            `/attempts/${email}/${attempt_id}`
        );
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
};
