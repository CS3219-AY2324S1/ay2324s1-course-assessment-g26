import QuestionCard from '@components/QuestionCard';
import CodeEditor from '@components/CodeEditor';
import { useEffect, useState } from 'react';

const Workspace = ({ questionId, roomId, language, onSaveAttempt }) => {
  const [currentCode, setCurrentCode] = useState('');
  const [saveFeedback, setSaveFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveAttempt(currentCode);
      setSaveFeedback('Code saved successfully!');
      setTimeout(() => {
        setSaveFeedback('');
        setIsSaving(false);
      }, 3000); // Clear message and reset button after 3 seconds
    } catch (error) {
      setSaveFeedback('Failed to save. Try again.');
      setTimeout(() => {
        setSaveFeedback('');
        setIsSaving(false);
      }, 5000); // Clear message and reset button after 5 seconds
    }
  };

  // Define button classes based on isSaving state
  const buttonClass = isSaving
    ? "px-3 py-1 text-white bg-gray-400 cursor-not-allowed rounded"
    : "px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded";

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2">
        <QuestionCard questionId={questionId} />
      </div>
      <div className="w-1/2">
        <CodeEditor roomId={roomId} language={language} onCodeChange={handleCodeChange} />
        <div className="flex justify-center items-center mt-4">
          <button 
            className={buttonClass}
            onClick={handleSave}
            disabled={isSaving}
          >
            {saveFeedback || 'Save Current Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
