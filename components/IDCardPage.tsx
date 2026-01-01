
import React, { useState } from 'react';
import { 
    UsersIcon, 
    PencilIcon, 
    InformationCircleIcon, 
    GridIcon, 
    CheckIcon, 
    GlobeAltIcon, 
    ArrowTopRightOnSquareIcon,
    ArrowPathIcon,
    IDCardIcon
} from './icons';

interface IDCardPageProps {
    allClasses: string[];
}

export const IDCardPage: React.FC<IDCardPageProps> = ({ allClasses }) => {
    const [selectedClass, setSelectedClass] = useState('');

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                        <IDCardIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Generate Student ID Cards</h1>
                        <p className="mt-1 text-indigo-200">Create professional ID cards for your students</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80 space-y-4">
                <div>
                    <label className="flex items-center text-sm font-medium text-slate-600 mb-1.5">
                        <UsersIcon className="h-5 w-5 mr-2 text-slate-400" />
                        Select Class
                    </label>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="" disabled>Choose a class to get started</option>
                        {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
                    <PencilIcon className="h-5 w-5" />
                    <span>Generate ID Cards</span>
                </button>
            </div>
            
            <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl text-cyan-800">
                <div className="flex items-start">
                    <InformationCircleIcon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                        <span className="font-bold">Note:</span> ID cards will include student photos, QR codes for verification, and portal access information. Generation may take a few minutes for large classes.
                    </p>
                </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-lg">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-white/20 p-3 rounded-full mb-3">
                        <GridIcon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold">QR Code Features</h2>
                    <div className="w-full grid grid-cols-2 gap-4 mt-4 text-left py-4 border-y border-white/20">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/20 mb-2">
                                <CheckIcon className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold">Attendance</h3>
                            <p className="text-sm text-pink-200">Quick marking</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/20 mb-2">
                                <GlobeAltIcon className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold">Portal Access</h3>
                            <p className="text-sm text-pink-200">Direct login</p>
                        </div>
                    </div>
                    <button className="mt-4 flex items-center justify-center gap-2 bg-white text-rose-500 font-semibold py-2.5 px-6 rounded-lg hover:bg-rose-50 transition-colors w-full sm:w-auto">
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        <span>Test QR Verification</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 overflow-hidden">
                <div className="p-5 bg-gradient-to-br from-slate-700 to-slate-800 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2"><ArrowPathIcon className="w-6 h-6"/> Recent ID Card Batches</h2>
                        <p className="text-sm text-slate-300">Manage your generated ID cards</p>
                    </div>
                    <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">0 Total</span>
                </div>
                <div className="p-12 text-center text-slate-500">
                    <IDCardIcon className="w-20 h-20 mx-auto text-slate-300" />
                    <h3 className="text-lg font-semibold text-slate-700 mt-4">No ID cards generated yet</h3>
                    <p className="mt-1">Generate your first batch of student ID cards using the form above</p>
                </div>
            </div>

        </div>
    );
};