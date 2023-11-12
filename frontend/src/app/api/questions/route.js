import axios from 'axios';

export async function GET(request) {
  const response = await axios.get(
    new URL('questions', process.env.NEXT_PUBLIC_QUESTION_BACKEND_URL).href
  );
  if (response.status !== 200) {
    // throw new Error(error.response?.data?.message);
    console.log('ERROR');
  }

  return Response.json(response.data);
}
