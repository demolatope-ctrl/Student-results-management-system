
import React, { useState } from 'react';
import { Student } from '../types';
import { parseStudentInfo } from '../services/geminiService';
import { CloseIcon, SparkleIcon } from './icons';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Student) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setError('Please enter student details.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const newStudent = await parseStudentInfo(inputText);
      onAddStudent(newStudent);
      setInputText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = () => {
    setInputText('Create a record for Alice Johnson, student ID AJ-456. Scores are: Math 95, History 88, Physics 91, and Art 99.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-out scale-95 animate-modal-pop-in">
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Add Student with AI</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">
            <CloseIcon className="h-6 w-6 text-slate-500" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-slate-600 mb-4">
            Describe the student and their results in one go. The AI will parse the information and create a new record.
          </p>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., John Doe, ID 123, Math: 85, Science: 92..."
              className="w-full h-40 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              disabled={isLoading}
            />
          </div>
           <button 
            onClick={handleSuggestionClick}
            className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 transition-colors"
            disabled={isLoading}
          >
            Try an example
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-end items-center gap-4 p-5 bg-slate-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 transition-all"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
                <>
                <SparkleIcon className="h-5 w-5"/>
                <span>Create Record</span>
                </>
            )}
          </button>
        </div>
      </div>
       <style>{`
          @keyframes modal-pop-in {
            0% {
              transform: scale(0.95);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-modal-pop-in {
            animation: modal-pop-in 0.2s ease-out forwards;
          }
        `}</style>
    </div>
  );
};
