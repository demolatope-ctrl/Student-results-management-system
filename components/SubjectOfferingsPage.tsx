
import React, { useState } from 'react';
import { Student } from '../types';
import { sampleStudents } from '../data/studentData';
import { BookOpenIcon, CheckIcon, SaveIcon, UserIcon, UsersIcon } from './icons';

const optionalSubjects = ['Further Maths', 'Data Processing', 'Economics', 'Technical Drawing', 'Visual Arts'];

interface SubjectOfferingsPageProps {
    allClasses: string[];
}

export const SubjectOfferingsPage: React.FC<SubjectOfferingsPageProps> = ({ allClasses }) => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [fetchedStudents, setFetchedStudents] = useState<Student[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [assignments, setAssignments] = useState<Record<string, boolean>>({});
    const [isSaving, setIsSaving] = useState(false);

    const handleFetchStudents = () => {
        if (!selectedClass || !selectedSubject) return;
        setIsFetching(true);
        setFetchedStudents([]);
        setTimeout(() => { 
            const studentsInClass = sampleStudents.filter(s => s.class === selectedClass);
            setFetchedStudents(studentsInClass);
            // In a real app, you'd fetch existing assignments here.
            // For now, we'll start with none assigned.
            const initialAssignments = studentsInClass.reduce((acc, student) => {
                acc[student.id] = false;
                return acc;
            }, {} as Record<string, boolean>);
            setAssignments(initialAssignments);
            setIsFetching(false);
        }, 1000);
    };

    const handleAssignmentChange = (studentId: string) => {
        setAssignments(prev => ({
            ...prev,
            [studentId]: !prev[studentId]
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        console.log("Saving assignments:", {
            class: selectedClass,
            subject: selectedSubject,
            assignments,
        });
        setTimeout(() => {
            setIsSaving(false);
            // Maybe show a success toast here
        }, 1500);
    };

    const selectedCount = Object.values(assignments).filter(Boolean).length;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white p-6 rounded-xl shadow-lg">
                <h2 className="font-bold text-lg mb-2">How to use:</h2>
                <p>Select a class, choose an optional subject, then check the boxes for students taking that subject.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Manage Subject Offerings</h2>
                <div className="space-y-5">
                    <div>
                        <label htmlFor="select-class" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Select Class <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="select-class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full pl-3 pr-10 py-2.5 text-slate-800 bg-white border border-purple-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="" disabled>-- Choose a class --</option>
                            {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="select-subject" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Select Optional Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="select-subject"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full pl-3 pr-10 py-2.5 text-slate-800 bg-slate-100 border border-slate-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>-- Choose a subject --</option>
                            {optionalSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <button
                        onClick={handleFetchStudents}
                        disabled={!selectedClass || !selectedSubject || isFetching}
                        className="w-full flex items-center justify-center py-3 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isFetching ? (
                            <>
                                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                <span>Fetching...</span>
                            </>
                        ) : 'Fetch Students'}
                    </button>
                </div>
            </div>

            {fetchedStudents.length > 0 && (
                 <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200/80">
                     <div className="flex justify-between items-center mb-4 pb-4 border-b">
                         <div>
                            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                                <UsersIcon className="w-6 h-6 text-indigo-500"/>
                                Students in {selectedClass}
                            </h3>
                            <p className="text-sm text-slate-500">Assigning for <span className="font-semibold text-slate-700">{selectedSubject}</span></p>
                         </div>
                         <div className="text-center">
                            <p className="text-2xl font-bold text-indigo-600">{selectedCount}</p>
                            <p className="text-xs font-medium text-slate-500">Selected</p>
                         </div>
                     </div>
                     <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                        {fetchedStudents.map(student => (
                            <label key={student.id} htmlFor={`student-${student.id}`} className="flex items-center p-3 rounded-lg has-[:checked]:bg-indigo-50 transition-colors cursor-pointer">
                                <div className="relative flex items-center">
                                    <input
                                        id={`student-${student.id}`}
                                        type="checkbox"
                                        checked={!!assignments[student.id]}
                                        onChange={() => handleAssignmentChange(student.id)}
                                        className="appearance-none h-5 w-5 border-2 border-slate-300 rounded checked:bg-indigo-600 checked:border-indigo-600 transition"
                                    />
                                    {assignments[student.id] && <CheckIcon className="h-4 w-4 text-white absolute top-0.5 left-0.5 pointer-events-none" />}
                                </div>
                                <div className="ml-4 flex-grow">
                                    <p className="font-semibold text-slate-800">{student.name}</p>
                                    <p className="text-xs text-slate-500">ID: {student.id}</p>
                                </div>
                            </label>
                        ))}
                     </div>
                     <div className="mt-6 pt-4 border-t">
                         <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-lg shadow-md bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <SaveIcon className="w-5 h-5"/>
                             {isSaving ? 'Saving...' : 'Save Assignments'}
                         </button>
                     </div>
                 </div>
            )}
        </div>
    );
};