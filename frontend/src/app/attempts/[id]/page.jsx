"use client"
import React, {useEffect, useState} from 'react';
import { useSession} from 'next-auth/react'; // Assuming you are using next-auth for session management
import { getAttempt } from '@app/api/attemptsService';
import {useParams, useSearchParams} from "next/navigation";

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
        <>
            This is attempt {attemptId}.
            <div>
                {attemptData.data.question_title}
            </div>
            <div>
                {attemptData.data.code}
            </div>
        </>
    );
};

export default AttemptPage;
