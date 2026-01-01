
import React, { useState, useMemo } from 'react';
import { InformationCircleIcon, GraduationCapIcon, UsersIcon, PlusIcon, SaveIcon, ExclamationTriangleIcon, ClipboardListIcon } from './icons';

interface CreateStudentFormProps {
    onBack: () => void;
    onSaveSuccess: (studentCount: number, className: string) => void;
    allClasses: string[];
}

const ToggleSwitch = ({ enabled, setEnabled }: { enabled: boolean, setEnabled: (e: boolean) => void }) => (
    <button
        type="button"
        className={`${enabled ? 'bg-violet-600' : 'bg-slate-300'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2`}
        onClick={() => setEnabled(!enabled)}
    >
        <span className="sr-only">Use setting</span>
        <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
    </button>
);


export const CreateStudentForm: React.FC<CreateStudentFormProps> = ({ onBack, onSaveSuccess, allClasses }) => {
    const [selectedClass, setSelectedClass] = useState('');
    const [autoGenerate, setAutoGenerate] = useState(true);
    const [students, setStudents] = useState([{ id: 1, name: '' }]);
    const [error, setError] = useState('');

    const addStudent = () => {
        setStudents([...students, { id: Date.now(), name: '' }]);
    };
    
    const handleStudentNameChange = (id: number, name: string) => {
        setStudents(students.map(s => s.id === id ? {...s, name} : s));
    };
    
    const validStudents = useMemo(() => students.filter(s => s.name.trim() !== ''), [students]);
    const isSaveDisabled = !selectedClass || validStudents.length === 0;

    const handleSave = () => {
        if (isSaveDisabled) {
            setError('Please select a class and enter at least one student name.');
            return;
        }
        setError('');
        // Here you would typically send data to a backend.
        // For this demo, we'll just proceed to the success screen.
        onSaveSuccess(validStudents.length, selectedClass);
    };


    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-violet-600 text-white font-bold text-lg p-4 rounded-xl flex items-center gap-3 shadow-lg">
                <PlusIcon className="h-6 w-6" />
                <span>Create New Students</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <div className="flex items-start">
                    <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-blue-800">Name Input Guidelines:</h3>
                        <ul className="list-disc list-inside text-sm text-blue-700 mt-1 space-y-1">
                            <li><span className="font-semibold">Two Names:</span> First Name + Last Name (e.g., "John Smith")</li>
                            <li><span className="font-semibold">Three Names:</span> First Name + Middle Name + Last Name (e.g., "John Michael Smith")</li>
                            <li><span className="font-semibold">Note:</span> Middle name is optional. Maximum of 3 names allowed.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 space-y-4">
                <div>
                    <label className="flex items-center text-sm font-medium text-slate-700 mb-1.5">
                        <GraduationCapIcon className="h-5 w-5 text-slate-500 mr-2"/>
                        Select Class <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="" disabled>Choose a class...</option>
                        {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="border-t border-slate-200 my-4"></div>
                <div>
                    <label className="flex items-center text-sm font-medium text-slate-700 mb-1.5">
                        <ClipboardListIcon className="h-5 w-5 text-slate-500 mr-2"/>
                        Roll Number Generation
                    </label>
                    <div className="flex items-center gap-4">
                        <ToggleSwitch enabled={autoGenerate} setEnabled={setAutoGenerate} />
                        <div>
                            <p className="font-medium text-slate-800">Auto Generate Roll Numbers</p>
                            <p className="text-xs text-slate-500">Toggle to manually input roll numbers</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="flex items-center text-lg font-bold text-slate-800">
                        <UsersIcon className="h-6 w-6 mr-2 text-slate-500" />
                        Student Information
                    </h3>
                    <span className="font-bold text-cyan-700 bg-cyan-100 px-4 py-1.5 rounded-full">{validStudents.length} Student{validStudents.length !== 1 && 's'}</span>
                </div>
                <div className="space-y-4">
                    {students.map((student, index) => (
                        <div key={student.id} className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                             <label htmlFor={`student_name_${student.id}`} className="block text-sm font-medium text-slate-600 mb-1.5">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                             <input
                                id={`student_name_${student.id}`}
                                type="text"
                                placeholder="Enter 2-3 names (e.g. John Doe)"
                                value={student.name}
                                onChange={(e) => handleStudentNameChange(student.id, e.target.value)}
                                className="w-full px-3 py-2 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                                <ExclamationTriangleIcon className="h-4 w-4" />
                                Enter names separated by spaces (2-3 names only)
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-col gap-4">
                     <button
                        onClick={addStudent}
                        className="w-full flex items-center justify-center gap-2 py-3 text-violet-700 font-semibold border-2 border-violet-200 rounded-lg hover:bg-violet-50 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add Another Student</span>
                    </button>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <button
                        onClick={handleSave}
                        disabled={isSaveDisabled}
                        className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        <SaveIcon className="h-5 w-5"/>
                        <span>Save All Students</span>
                    </button>
                </div>
            </div>
             <div className="mt-8 text-center">
                <button onClick={onBack} className="text-sm font-semibold text-slate-600 hover:text-slate-800">
                    &larr; Back
                </button>
            </div>
        </div>
    );
};