
import React, { useState, useEffect } from 'react';
import { 
    CalendarDaysIcon, 
    PresentationChartBarIcon,
    ClockIcon,
    Cog6ToothIcon,
    ExclamationTriangleIcon,
    ListBulletIcon,
    ArrowPathIcon,
    ArrowDownTrayIcon
} from './icons';
import { sampleStudents } from '../data/studentData';

export interface ReportConfig {
  ca: number;
  exam: number;
}

interface MidTermReportProps {
  onViewReport: (studentId: string, config: ReportConfig) => void;
  allClasses: string[];
}

interface SelectInputProps {
    icon: React.ReactNode;
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ icon, label, options, value, onChange }) => (
    <div>
        <label className="flex items-center text-sm font-medium text-slate-600 mb-1.5">
            {icon}
            <span className="ml-2">{label}</span>
        </label>
        <div className="relative">
             <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
        </div>
    </div>
);

interface CheckboxCardProps {
    id: string;
    label: string;
    percentage: number;
    checked: boolean;
    onChange: (id: string, checked: boolean) => void;
}

const CheckboxCard: React.FC<CheckboxCardProps> = ({ id, label, percentage, checked, onChange }) => (
     <label htmlFor={id} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200 ${checked ? 'bg-white border-indigo-600 ring-2 ring-indigo-200' : 'bg-white border-slate-300'}`}>
        <div className="flex items-center">
            <div className="relative flex items-center">
                 <input
                    id={id}
                    type="checkbox"
                    className="appearance-none h-5 w-5 border-2 border-slate-400 rounded-md checked:bg-indigo-600 checked:border-transparent focus:outline-none"
                    checked={checked}
                    onChange={(e) => onChange(id, e.target.checked)}
                />
                {checked && (
                    <svg className="absolute left-0.5 top-0.5 w-4 h-4 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className="ml-3 text-sm font-medium text-slate-800">{label}</span>
        </div>
        <span className="text-sm font-semibold text-white bg-green-500 px-2.5 py-0.5 rounded-full">{percentage}%</span>
    </label>
);

interface GeneratedReport {
    studentId: string;
    studentName: string;
    term: string;
    date: string;
    time: string;
    generated: string;
    config: ReportConfig;
}


export const MidTermReport: React.FC<MidTermReportProps> = ({ onViewReport, allClasses }) => {
    const [session, setSession] = useState('2025/2026');
    const [className, setClassName] = useState(allClasses.find(c => c.startsWith('SS')) || allClasses[0] || '');
    const [term, setTerm] = useState('First Term');
    const [selectedCAs, setSelectedCAs] = useState<Record<string, boolean>>({});
    const [showWarning, setShowWarning] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [reports, setReports] = useState<GeneratedReport[]>([]);
    
    const isSeniorClass = className.startsWith('SS');
    
    const assessmentConfig = isSeniorClass 
        ? { schemes: [{id: 'ca30', label: 'C.A 30', percentage: 30}, {id: 'exam70', label: 'EXAM 70', percentage: 70}], config: {ca: 30, exam: 70} }
        : { schemes: [{id: 'ca40', label: 'C.A 40', percentage: 40}, {id: 'exam60', label: 'EXAM 60', percentage: 60}], config: {ca: 40, exam: 60} };

    useEffect(() => {
        setSelectedCAs({});
    }, [isSeniorClass]);

    const handleGenerate = () => {
        const hasSelection = Object.values(selectedCAs).some(v => v);
        if (!hasSelection) {
            setShowWarning(true);
            return;
        }
        setShowWarning(false);
        setIsGenerating(true);
        setProgress(0);
    };

    useEffect(() => {
        if (isGenerating) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    const next = prev + Math.random() * 20;
                    if (next >= 100) {
                        clearInterval(interval);
                        setIsGenerating(false);

                        const studentToReport = sampleStudents.find(s => s.class === className) || sampleStudents[isSeniorClass ? 1 : 0];
                        
                        const newReport: GeneratedReport = {
                             studentId: studentToReport.id,
                             studentName: studentToReport.name,
                             term: 'Mid-term',
                             date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
                             time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                             generated: 'Just now',
                             config: assessmentConfig.config,
                        };

                        setReports(prev => [newReport, ...prev]);
                        setSelectedCAs({});
                        return 100;
                    }
                    return next;
                });
            }, 300);
            return () => clearInterval(interval);
        }
    }, [isGenerating, assessmentConfig.config, className, isSeniorClass]);

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
                <div className="space-y-4">
                     <SelectInput 
                        icon={<CalendarDaysIcon className="h-5 w-5 text-slate-500" />}
                        label="Academic Session"
                        options={['2025/2026', '2024/2025']}
                        value={session}
                        onChange={setSession}
                    />
                    <SelectInput 
                        icon={<PresentationChartBarIcon className="h-5 w-5 text-slate-500" />}
                        label="Class"
                        options={allClasses}
                        value={className}
                        onChange={setClassName}
                    />
                     <SelectInput 
                        icon={<ClockIcon className="h-5 w-5 text-slate-500" />}
                        label="Term"
                        options={['First Term', 'Second Term', 'Third Term']}
                        value={term}
                        onChange={setTerm}
                    />
                    <button onClick={handleGenerate} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-green-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
                        <Cog6ToothIcon className="h-5 w-5" />
                        <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
                    </button>
                </div>
            </div>

            {showWarning && (
                 <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-md" role="alert">
                    <div className="flex">
                        <div className="py-1"><ExclamationTriangleIcon className="h-6 w-6 text-orange-500 mr-4" /></div>
                        <div>
                            <p className="font-bold">CA Selection Required</p>
                            <p className="text-sm">Please select at least one CA scheme. Select the CAs that have been completed so far this term.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
                <h3 className="flex items-center text-sm font-medium text-slate-600 mb-3">
                    <ListBulletIcon className="h-5 w-5 mr-2" />
                    Select Continuous Assessments (CA) to Include
                </h3>
                <div className="space-y-3">
                    {assessmentConfig.schemes.map(scheme => (
                        <CheckboxCard 
                            key={scheme.id}
                            id={scheme.id} 
                            label={scheme.label}
                            percentage={scheme.percentage} 
                            checked={!!selectedCAs[scheme.id]} 
                            onChange={(id, chk) => setSelectedCAs(p => ({...p, [id]: chk}))}
                        />
                    ))}
                </div>
            </div>
            
             <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
                <h3 className="flex items-center text-sm font-medium text-slate-600 mb-3">
                    <ListBulletIcon className="h-5 w-5 mr-2" />
                    Generation Progress
                </h3>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="flex items-center text-base font-semibold text-slate-800">
                        <ClockIcon className="h-5 w-5 mr-2 text-slate-500" />
                        Recent Mid-Term Reports
                    </h3>
                    <button className="flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-md transition-colors">
                        <ArrowPathIcon className="h-4 w-4" />
                        <span>Refresh</span>
                    </button>
                </div>
                <div className="space-y-2">
                    <div className="hidden sm:grid grid-cols-3 gap-4 text-xs font-semibold text-slate-500 uppercase px-3 pb-2 border-b">
                        <span>Student</span>
                        <span>Generated On</span>
                        <span className="text-right">Action</span>
                    </div>
                    {reports.map(report => (
                         <div key={report.studentId + report.time} className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center bg-slate-50/80 p-3 rounded-md">
                            <div className="font-medium text-slate-800 text-sm truncate">{report.studentName}</div>
                            <div className="text-xs text-slate-500">
                                {report.date}, {report.time}
                                <div className="text-green-600">{report.generated}</div>
                            </div>
                            <div className="col-span-2 sm:col-span-1 flex justify-end">
                                <button onClick={() => onViewReport(report.studentId, report.config)} className="flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                                    <ArrowDownTrayIcon className="h-4 w-4"/>
                                    <span>View Report</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
};