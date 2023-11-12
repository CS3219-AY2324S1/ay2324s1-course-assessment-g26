import axios from 'axios';

export async function GET(req, { params }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_QUESTION_BACKEND_URL}/questions/${params.id}`
  );
  if (response.status !== 200) {
    // throw new Error(error.response?.data?.message);
    console.log('ERROR');
  }

  return Response.json(response.data);
}

export async function PATCH(req, res, { params }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_QUESTION_BACKEND_URL}/questions/${params.id}`
  );
  if (response.status !== 200) {
    // throw new Error(error.response?.data?.message);
    console.log('ERROR');
  }

  return Response.json(response.data);
}
