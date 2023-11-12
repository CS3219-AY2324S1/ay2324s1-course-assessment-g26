import axios from 'axios';

export async function POST(req, res) {
  const body = await req.json();
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_QUESTION_BACKEND_URL}/questions/new`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.status !== 200) {
    // throw new Error(error.response?.data?.message);
    console.log('ERROR');
  }

  return Response.json(response.data);
}
