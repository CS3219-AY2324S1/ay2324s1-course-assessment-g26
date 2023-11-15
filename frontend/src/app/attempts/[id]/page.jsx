'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getAttempt } from '@app/api/attemptsService';
import AttemptReader from '@components/AttemptReader';

const AttemptPage = ({ params }) => {
  const [attemptData, setAttemptData] = useState(null);
  const { data: session } = useSession();
  const attemptId = params.id;

  useEffect(() => {
    if (session && attemptId) {
      getAttempt(session.user.email, attemptId)
        .then((response) => {
          setAttemptData(response);
        })
        .catch((error) => {
          console.error('Error fetching attempt:', error);
        });
    }
  }, [session, attemptId]);

  if (!attemptData?.data) return <div>No attempt data found.</div>;

  return (
    <>
      {/* <h1>This is attempt {attemptId}.</h1> */}
      <h2>Question: {attemptData.data.question_title}</h2>
      <p>
        Attempted on:{' '}
        {new Date(attemptData.data.attempt_datetime).toLocaleDateString()}
      </p>
      <div>
        <AttemptReader
          code={attemptData.data.code}
          language={attemptData.data.language}
        />
      </div>
    </>
  );
};

export default AttemptPage;
