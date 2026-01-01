
import React, { useState } from 'react';

interface OfflineAttendanceSheetPageProps {
    allClasses: string[];
}

export const OfflineAttendanceSheetPage: React.FC<OfflineAttendanceSheetPageProps> = ({ allClasses }) => {
    const [selectedClass, setSelectedClass] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const canGenerate = selectedClass && startDate && endDate;

    return (
        <div className="max-w-md mx-auto space-y-8">
            <div className="bg-gradient-to-br from-green-400 to-green-500 text-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
                <div className="w-16 h-16 bg-white rounded-full flex-shrink-0"></div>
                <h2 className="text-2xl font-semibold">Generate Attendance Sheet</h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200/80">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="select-class" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Select Class <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="select-class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full pl-3 pr-10 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="" disabled>-- Choose a class --</option>
                            {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="start-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                     <div>
                        <label htmlFor="end-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button 
                        disabled={!canGenerate}
                        className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-green-600 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        Generate Attendance Sheet
                    </button>
                </div>
            </div>
        </div>
    );
};