import axios from 'axios';

export async function DELETE(req) {
  const body = await req.json();
  // console.log(body);
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_QUESTION_BACKEND_URL}/questions/${body.id}`
  );
  if (response.status !== 200) {
    // throw new Error(error.response?.data?.message);
    console.log('ERROR');
  }

  return Response.json(response.data);
}
