import QuestionCard from '@components/QuestionCard';
import CodeEditor from '@components/CodeEditor';
import { useEffect, useState } from 'react';

const Workspace = ({ questionId, roomId, language, onSaveAttempt }) => {
  const [currentCode, setCurrentCode] = useState('');

  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
  };


  console.log(
    'We are now in room:',
    roomId,
    'doing question:',
    questionId,
    'using language:',
    language
  );
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2">
        <QuestionCard questionId={questionId} />
      </div>
      <div className="w-1/2">
        <CodeEditor roomId={roomId} language={language} onCodeChange={handleCodeChange}/>
        <button 
          className="mt-4 px-3 py-1 text-white bg-blue-600 hover:bg-blue-600 rounded"
          onClick={() => onSaveAttempt(currentCode)}>Save Current Code
        </button>
      </div>
    </div>
  );
};

export default Workspace;
