
import React from 'react';
import { Student } from '../types';
import { PresentationChartBarIcon } from './icons';

interface StudentCardProps {
  student: Student;
  onSelect: (student: Student) => void;
}

const getAverageScore = (results: Student['results']) => {
  if (results.length === 0) return 0;
  const total = results.reduce((sum, result) => sum + (result.scores.ca + result.scores.exam), 0);
  return Math.round(total / results.length);
};

const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500 bg-emerald-100';
    if (score >= 75) return 'text-sky-500 bg-sky-100';
    if (score >= 60) return 'text-amber-500 bg-amber-100';
    return 'text-red-500 bg-red-100';
};

export const StudentCard: React.FC<StudentCardProps> = ({ student, onSelect }) => {
  const average = getAverageScore(student.results);
  const colorClasses = getPerformanceColor(average);

  return (
    <div
      onClick={() => onSelect(student)}
      className="bg-white rounded-xl shadow-md p-5 border border-transparent hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{student.name}</h3>
          <p className="text-sm text-slate-500">{student.id}</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${colorClasses}`}>
          <span>{average}%</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-slate-600">
           <PresentationChartBarIcon className="h-5 w-5 text-slate-400"/>
           <span>{student.results.length} Subjects</span>
        </div>
        <span className="text-indigo-600 font-semibold group-hover:underline">View Details →</span>
      </div>
    </div>
  );
};