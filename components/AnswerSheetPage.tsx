
import React, { useState } from 'react';

interface AnswerSheetPageProps {
    allClasses: string[];
}

export const AnswerSheetPage: React.FC<AnswerSheetPageProps> = ({ allClasses }) => {
    const [selectedClass, setSelectedClass] = useState('');

    return (
        <div className="max-w-md mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Personalized Answer Sheets</h1>
                <p className="mt-2 text-slate-500">Generate exam answer sheets with student information pre-printed</p>
            </div>
            
            <div className="bg-violet-500 text-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
                <div className="w-16 h-16 bg-white rounded-full flex-shrink-0"></div>
                <h2 className="text-2xl font-semibold">Generate Answer Sheets</h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200/80">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="select-class" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Select Class <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="select-class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full pl-3 pr-10 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <option value="" disabled>-- Choose a class --</option>
                            {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <button 
                        disabled={!selectedClass}
                        className="w-full bg-violet-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-violet-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        Generate Answer Sheets
                    </button>
                </div>
            </div>
        </div>
    );
};