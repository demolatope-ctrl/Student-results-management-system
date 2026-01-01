
import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { generatePerformanceSummary } from '../services/geminiService';
import { CloseIcon, SparkleIcon } from './icons';

interface StudentDetailModalProps {
  student: Student;
  onClose: () => void;
}

const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800';
    if (score >= 75) return 'bg-sky-100 text-sky-800';
    if (score >= 60) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
};


export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const generatedSummary = await generatePerformanceSummary(student);
        setSummary(generatedSummary);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate summary.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-out scale-95 animate-modal-pop-in">
        <div className="flex justify-between items-center p-5 border-b border-slate-200 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
            <p className="text-sm text-slate-500">{student.id}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">
            <CloseIcon className="h-6 w-6 text-slate-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Results</h3>
              <ul className="space-y-2">
                {student.results.map((result, index) => {
                  const totalScore = result.scores.ca + result.scores.exam;
                  return (
                    <li key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                      <span className="font-medium text-slate-600">{result.subject}</span>
                      <span className={`px-3 py-1 text-sm font-bold rounded-full ${getScoreColor(totalScore)}`}>
                        {totalScore}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-700 mb-3">
                <SparkleIcon className="h-5 w-5 text-indigo-500"/>
                <span>AI Performance Summary</span>
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg min-h-[150px]">
                {isLoading && <div className="flex justify-center items-center h-full"><div className="h-6 w-6 border-2 border-t-transparent border-indigo-500 rounded-full animate-spin"></div></div>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {!isLoading && !error && (
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{summary}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-5 bg-slate-50 rounded-b-xl flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 transition-all"
          >
            Close
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