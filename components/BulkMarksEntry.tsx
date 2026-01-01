
import React, { useState } from 'react';
import { GraduationCapIcon, CalendarDaysIcon, BookOpenIcon, CheckBadgeIcon, ArrowRightIcon } from './icons';

const SelectCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children?: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
        <div className="flex items-center mb-4">
            <div className="text-indigo-600 mr-3">{icon}</div>
            <h3 className="text-md font-semibold text-slate-800">{title} <span className="text-red-500">*</span></h3>
        </div>
        {children}
    </div>
);

const Dropdown = ({ label, options, value, onChange, focused = false }: { label: string, options: string[], value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, focused?: boolean }) => (
    <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2.5 text-slate-900 bg-white border rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${focused ? 'border-indigo-500' : 'border-slate-300'}`}
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
        </div>
    </div>
);

const CheckboxOption = ({ id, label, percentage, checked, onChange }: { id: string, label: string, percentage: number, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <label htmlFor={id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 cursor-pointer transition-all">
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                checked={checked}
                onChange={onChange}
            />
            <span className="ml-3 text-sm font-medium text-slate-700">{label}</span>
        </div>
        <span className="text-sm font-semibold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">{percentage}%</span>
    </label>
);

interface BulkMarksEntryProps {
    allClasses: string[];
    allSubjects: string[];
}

export const BulkMarksEntry: React.FC<BulkMarksEntryProps> = ({ allClasses, allSubjects }) => {
    const [selectedClass, setSelectedClass] = useState(allClasses[0] || '');
    const [selectedTerm, setSelectedTerm] = useState('1st Term');
    const [selectedSubject, setSelectedSubject] = useState(allSubjects[0] || '');
    const [caSchemes, setCaSchemes] = useState({ ca30: false, exam70: false });

    const handleSchemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaSchemes({
            ...caSchemes,
            [e.target.id]: e.target.checked
        });
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg mb-6 border border-emerald-200">
                <p className="text-sm">
                    Enter scores for previous terms. Perfect for bulk mark entry or catching up on missed assessments.
                </p>
            </div>
            <div className="space-y-6">
                <SelectCard icon={<GraduationCapIcon className="h-6 w-6"/>} title="Select Class">
                    <Dropdown
                        label="Class"
                        options={allClasses}
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    />
                </SelectCard>
                <SelectCard icon={<CalendarDaysIcon className="h-6 w-6"/>} title="Select Term">
                     <Dropdown
                        label="Term"
                        options={['1st Term', '2nd Term', '3rd Term']}
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                    />
                </SelectCard>
                <SelectCard icon={<BookOpenIcon className="h-6 w-6"/>} title="Select Subject">
                     <Dropdown
                        label="Subject"
                        options={allSubjects}
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        focused={true}
                    />
                </SelectCard>
                <SelectCard icon={<CheckBadgeIcon className="h-6 w-6"/>} title="Select CA Schemes">
                    <p className="text-sm text-slate-500 mb-4">Select one or more CA schemes for this assessment</p>
                    <div className="space-y-3">
                        <CheckboxOption
                            id="ca30"
                            label="C.A 30"
                            percentage={30}
                            checked={caSchemes.ca30}
                            onChange={handleSchemeChange}
                        />
                        <CheckboxOption
                            id="exam70"
                            label="EXAM 70"
                            percentage={70}
                            checked={caSchemes.exam70}
                            onChange={handleSchemeChange}
                        />
                    </div>
                </SelectCard>
            </div>
            <div className="mt-8">
                 <button
                    className="w-full flex items-center justify-center gap-3 bg-slate-200 text-slate-500 font-semibold py-4 rounded-lg cursor-not-allowed transition-all"
                    disabled
                 >
                    <ArrowRightIcon className="h-5 w-5"/>
                    <span>Proceed to Enter Marks</span>
                </button>
            </div>
        </div>
    );
};