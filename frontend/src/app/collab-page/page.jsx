'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Matching from '@components/Matching';
import Workspace from '@components/Workspace';
import Chatbox from '@components/Chatbox';

import { useSession } from 'next-auth/react';
import { createAttemptRecord } from '@app/api/attemptsService';
import axios from 'axios';

const CollabPage = ({ params }) => {
  const { data: session } = useSession();
  const userEmail = session?.user.email;

  const [questionId, setQuestionId] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [roomId, setRoomId] = useState('');
  const [language, setLanguage] = useState('python');
  const [isMatched, setIsMatched] = useState(false);
  const [socket, setSocket] = useState(null);

  const onMatch = (newSocket, roomId, questionId, language) => {
    setSocket(newSocket);
    setRoomId(roomId);
    setQuestionId(questionId);
    setLanguage(language);
    setIsMatched(true);
    fetchQuestionTitle(questionId);
  };

  const fetchQuestionTitle = async (id) => {
    try {
      const response = await axios.get(`/api/questions/${id}`);
      setQuestionTitle(response.data.title);

    } catch (error) {
      console.error("Error fetching question title:", error);
    }
  };

  const handleSaveAttempt = async (code) => {
    try {
      // Assuming you have the user's email and questionId available here
      console.log("user email is: " + userEmail);
      console.log("question id is: " + questionId);
      console.log("question title is: " + questionTitle);
      console.log("code is: " + code);

      const response = await createAttemptRecord(userEmail, questionId, questionTitle, code);

      console.log('Save successful:', response);
      // Additional logic after successful save

    } catch (error) {
      console.error('Error saving attempt:', error);
      // Error handling
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full h-full justify-center items-center">
        {isMatched && (
          <Workspace
            questionId={questionId}
            roomId={roomId}
            language={language}
            onSaveAttempt={handleSaveAttempt}
          />
        )}
        <Matching onMatch={onMatch} isMatched={isMatched} />
        {isMatched && socket && roomId && (
          <Chatbox socket={socket} roomId={roomId} />
        )}
      </div>
    </div>
  );
};

export default CollabPage;
