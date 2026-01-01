
import React, { useState, useMemo, useEffect } from 'react';
import { CheckIcon } from './icons';

const SuccessToast: React.FC = () => (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in-down">
        <div className="flex items-center gap-3 bg-green-500 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-lg">
            <CheckIcon className="w-5 h-5" />
            <span>Marksheet generated successfully!</span>
        </div>
        <style>{`
            @keyframes fade-in-down {
                0% { opacity: 0; transform: translate(-50%, -20px); }
                100% { opacity: 1; transform: translate(-50%, 0); }
            }
            .animate-fade-in-down {
                animation: fade-in-down 0.3s ease-out forwards;
            }
        `}</style>
    </div>
);

interface OfflineMarksheetPageProps {
    allClasses: string[];
    allSubjects: string[];
}

export const OfflineMarksheetPage: React.FC<OfflineMarksheetPageProps> = ({ allClasses, allSubjects }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const subjectAndClassOptions = useMemo(() => 
        allClasses.flatMap(cls => 
            allSubjects.map(sub => `${sub} (${cls})`)
        ).sort()
    , [allClasses, allSubjects]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            // Simulate PDF creation and download as shown in video
            const { jsPDF } = (window as any).jspdf;
            const pdf = new jsPDF();
            pdf.text(`Offline Marksheet for ${selectedOption}`, 10, 10);
            pdf.text("Student Name: ________________________", 10, 20);
            pdf.text("Score: ________", 10, 30);
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'offline_marksheet.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setIsGenerating(false);
            setShowToast(true);
            setSelectedOption('');
        }, 2500);
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <>
        {showToast && <SuccessToast />}
        <div className="max-w-md mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Offline Marksheets</h1>
                <p className="mt-2 text-slate-500">Generate printable marksheets for recording student grades</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
                <div className="w-16 h-16 bg-white rounded-full flex-shrink-0"></div>
                <h2 className="text-2xl font-semibold">Generate Marksheet</h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200/80">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="select-subject" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Select Subject and Class <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="select-subject"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="w-full pl-3 pr-10 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="" disabled>-- Choose a subject --</option>
                            {subjectAndClassOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={!selectedOption || isGenerating}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-semibold py-3 rounded-lg shadow-sm hover:from-orange-500 hover:to-orange-600 transition-all disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                <span>Generating...</span>
                            </>
                        ) : 'Generate Marksheet'}
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};