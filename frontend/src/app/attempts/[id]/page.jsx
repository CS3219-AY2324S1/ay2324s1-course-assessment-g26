"use client"
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
                .then(response => {
                    setAttemptData(response);
                })
                .catch(error => {
                    console.error('Error fetching attempt:', error);
                });
        }
    }, [session, attemptId]);

    if (!attemptData?.data) return <div>No attempt data found.</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Your saved attempt</h1>
            <h2 className="text-xl mb-2">Question: {attemptData.data.question_title}</h2>
            <p className="mb-4">Attempt saved on: {new Date(attemptData.data.attempt_datetime).toLocaleString()}</p>
            <div className="border p-4 rounded-lg">
                <AttemptReader code={attemptData.data.code} language={attemptData.data.language} />
            </div>
        </div>
    );
};

export default AttemptPage;
