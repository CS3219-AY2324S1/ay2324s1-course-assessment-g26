'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestionForm from '@components/QuestionForm';
import MaintainerRoute from '@app/api/auth/[...nextauth]/MaintainerRoute';

const AddQuestion = () => {
  const router = useRouter();
  // Submitting state will change the text on the button
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    // id: '', // TODO: Should be generated when adding to the database
    title: '',
    description: '',
    categories: '',
    complexity: '',
  });
  const addQuestion = async (e) => {
    // Prevent page reload
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/add-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
        }),
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <QuestionForm
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={addQuestion}
    />
  );
};

export default MaintainerRoute(AddQuestion);
