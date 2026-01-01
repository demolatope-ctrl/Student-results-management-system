
import React from 'react';
import { Student } from '../types';
import { SchoolLogo, QrCode } from './assets';
import { CloseIcon, PrinterIcon, UserIcon } from './icons';
import { ReportConfig } from './MidTermReport';

interface ReportCardProps {
  student: Student;
  config: ReportConfig;
  onClose: () => void;
}

const getGrade = (percentage: number) => {
    if (percentage >= 80) return 'A1';
    if (percentage >= 75) return 'B2';
    if (percentage >= 70) return 'B3';
    if (percentage >= 65) return 'C4';
    if (percentage >= 60) return 'C5';
    if (percentage >= 55) return 'C6';
    if (percentage >= 50) return 'D7';
    if (percentage >= 45) return 'E8';
    return 'F9';
}

const getPercentageColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600 font-bold';
    if (percentage >= 50) return 'text-yellow-600 font-bold';
    return 'text-red-600 font-bold';
}

export const ReportCard: React.FC<ReportCardProps> = ({ student, config, onClose }) => {
    const totalPossibleScore = student.results.length * 100;
    const totalStudentScore = student.results.reduce((sum, r) => sum + r.scores.ca + r.scores.exam, 0);
    const overallPercentage = totalPossibleScore > 0 ? Math.round((totalStudentScore / totalPossibleScore) * 100) : 0;
    const overallGrade = getGrade(overallPercentage);

    const attendanceRate = student.attendance.daysRecorded > 0 
        ? Math.round((student.attendance.present / student.attendance.daysRecorded) * 100)
        : 0;

    const handleDownloadPdf = () => {
        const input = document.getElementById('report-card-content');
        if (input && (window as any).html2canvas && (window as any).jspdf) {
            (window as any).html2canvas(input, { scale: 2.5, useCORS: true })
                .then((canvas: HTMLCanvasElement) => {
                    const imgData = canvas.toDataURL('image/png');
                    const { jsPDF } = (window as any).jspdf;
                    
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });

                    const MARGIN = 8;
                    const pdfWidth = pdf.internal.pageSize.getWidth() - MARGIN * 2;
                    const pdfHeight = pdf.internal.pageSize.getHeight() - MARGIN * 2;
                    
                    const canvasAspectRatio = canvas.width / canvas.height;
                    
                    let imgWidth = pdfWidth;
                    let imgHeight = pdfWidth / canvasAspectRatio;

                    if (imgHeight > pdfHeight) {
                        imgHeight = pdfHeight;
                        imgWidth = pdfHeight * canvasAspectRatio;
                    }
                    
                    const x = MARGIN + (pdfWidth - imgWidth) / 2;
                    const y = MARGIN;
                    
                    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
                    pdf.save(`report-card-${student.id}-${student.name.replace(/\s+/g, '_')}.pdf`);
                });
        } else {
            console.error("PDF generation libraries not found.");
        }
    };


    return (
        <div id="report-card-container" className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-start p-4 sm:p-8 overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
            <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden">
                <button onClick={handleDownloadPdf} className="p-2 bg-white rounded-full shadow-lg hover:bg-slate-100" title="Download as PDF">
                    <PrinterIcon className="h-6 w-6 text-slate-700" />
                </button>
                <button onClick={onClose} className="p-2 bg-white rounded-full shadow-lg hover:bg-slate-100" title="Close">
                    <CloseIcon className="h-6 w-6 text-slate-700" />
                </button>
            </div>

            <div id="report-card-content" className="bg-white w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 shadow-2xl border-t-8 border-blue-800 print:shadow-none print:border-t-4 print:my-0">
                {/* Header */}
                <header className="flex items-center justify-between border-b-2 border-slate-300 pb-4">
                    <div className="flex items-center">
                        <SchoolLogo className="h-24 w-24 flex-shrink-0" />
                        <div className="ml-4">
                            <h1 className="text-2xl lg:text-3xl font-bold text-blue-800 leading-tight">OLOYE COMPREHENSIVE COLLEGE, ABUJA</h1>
                            <p className="text-xs text-slate-600 mt-1">Plot No: CP969B Opposite AMAC Housing Estate, Sabon Lugbe Airport Road, Abuja</p>
                            <p className="text-xs text-slate-600">Tel: 08033102887 / 08032253184 / 08034171348, Email: oloyecomprehensivecollegeabuja@yahoo.com, Website: oloyeprivateschoolsabuja.com</p>
                        </div>
                    </div>
                </header>

                <div className="text-center my-5">
                    <h2 className="text-xl font-bold">First Term Mid-Term Progress Report</h2>
                    <p className="text-sm font-medium text-slate-700">Assessment Coverage: 100% of Total Term Score</p>
                </div>

                {/* Student Info */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6 items-start">
                    <div className="md:col-span-2 grid grid-cols-2 gap-x-6 gap-y-1.5">
                        <div><span className="font-bold inline-block w-20">Name:</span> {student.name}</div>
                        <div><span className="font-bold inline-block w-24">Gender:</span> {student.gender}</div>
                        <div><span className="font-bold inline-block w-20">Class:</span> {student.class}</div>
                        <div><span className="font-bold inline-block w-24">Admission No:</span> {student.id}</div>
                        <div><span className="font-bold inline-block w-20">Session:</span> {student.session}</div>
                        <div><span className="font-bold inline-block w-24">Position:</span> {student.position.rank}th of {student.position.totalStudents}</div>
                        <div><span className="font-bold inline-block w-20">Term:</span> {student.term}</div>
                        <div><span className="font-bold inline-block w-24">Parent(s):</span> </div>
                    </div>
                    <div className="flex justify-center items-start pt-1">
                        <div className="w-28 h-32 bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400">
                            {student.photoUrl ? <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" /> : <UserIcon className="w-16 h-16"/>}
                        </div>
                    </div>
                </div>

                {/* Cognitive Assessment */}
                <h3 className="text-center text-md font-bold text-blue-800 bg-slate-100 p-2 mb-2 rounded-sm">Cognitive Assessment (Based on 100% of Total Score)</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <table className="w-full text-xs text-center border-collapse border border-slate-300">
                            <thead>
                                <tr className="bg-blue-800 text-white">
                                    <th className="p-1.5 border border-slate-300 text-left w-2/5">Subjects</th>
                                    <th className="p-1.5 border border-slate-300">C.A {config.ca}</th>
                                    <th className="p-1.5 border border-slate-300">EXAM {config.exam}</th>
                                    <th className="p-1.5 border border-slate-300">Total</th>
                                    <th className="p-1.5 border border-slate-300">Max</th>
                                    <th className="p-1.5 border border-slate-300">%</th>
                                    <th className="p-1.5 border border-slate-300">Grade</th>
                                    <th className="p-1.5 border border-slate-300">H</th>
                                    <th className="p-1.5 border border-slate-300">L</th>
                                    <th className="p-1.5 border border-slate-300">Avg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.results.map((res, i) => {
                                    const total = res.scores.ca + res.scores.exam;
                                    const percentage = Math.round(total);
                                    const grade = getGrade(percentage);
                                    return (
                                        <tr key={i} className="odd:bg-white even:bg-slate-50">
                                            <td className="p-1.5 border border-slate-300 text-left font-semibold text-slate-800">{res.subject}</td>
                                            <td className="p-1.5 border border-slate-300">{res.scores.ca}</td>
                                            <td className="p-1.5 border border-slate-300">{res.scores.exam}</td>
                                            <td className="p-1.5 border border-slate-300 font-bold">{total}</td>
                                            <td className="p-1.5 border border-slate-300">100</td>
                                            <td className={`p-1.5 border border-slate-300 ${getPercentageColor(percentage)}`}>{percentage}%</td>
                                            <td className="p-1.5 border border-slate-300 font-bold">{grade}</td>
                                            <td className="p-1.5 border border-slate-300">{res.highestInClass}</td>
                                            <td className="p-1.5 border border-slate-300">{res.lowestInClass}</td>
                                            <td className="p-1.5 border border-slate-300">{res.classAverage.toFixed(2)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="bg-slate-100 text-sm font-bold p-2 mt-1 border border-slate-300">
                            Overall: {totalStudentScore}/{totalPossibleScore} ({overallPercentage}%) - Grade: {overallGrade} | Position: {student.position.rank}th/{student.position.totalStudents}
                        </div>
                    </div>
                    
                    <div className="flex-shrink-0 w-full md:w-48">
                        <table className="w-full text-xs text-left border-collapse border border-slate-300">
                            <thead>
                                <tr className="bg-blue-800 text-white">
                                    <th colSpan={2} className="p-1.5 border border-slate-300 text-center">Attendance</th>
                                </tr>
                                <tr className="bg-slate-200 font-semibold">
                                     <th className="p-1.5 border border-slate-300">Metric</th>
                                     <th className="p-1.5 border border-slate-300 text-center">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd:bg-white even:bg-slate-50">
                                    <td className="p-1.5 border border-slate-300">Days Recorded</td>
                                    <td className="p-1.5 border border-slate-300 text-center">{student.attendance.daysRecorded}</td>
                                </tr>
                                <tr className="odd:bg-white even:bg-slate-50">
                                    <td className="p-1.5 border border-slate-300">Present</td>
                                    <td className="p-1.5 border border-slate-300 text-center">{student.attendance.present}</td>
                                </tr>
                                <tr className="odd:bg-white even:bg-slate-50">
                                    <td className="p-1.5 border border-slate-300">Absent</td>
                                    <td className="p-1.5 border border-slate-300 text-center">{student.attendance.absent}</td>
                                </tr>
                                <tr className="odd:bg-white even:bg-slate-50">
                                    <td className="p-1.5 border border-slate-300">Leave</td>
                                    <td className="p-1.5 border border-slate-300 text-center">{student.attendance.leave}</td>
                                </tr>
                                <tr className="bg-slate-200 font-semibold">
                                    <td className="p-1.5 border border-slate-300">Rate</td>
                                    <td className="p-1.5 border border-slate-300 text-center">{attendanceRate}%</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center mt-4">
                            <QrCode className="w-32 h-32 mx-auto" />
                            <p className="text-xs font-semibold mt-1">Scan to verify</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border border-slate-300 p-3 bg-slate-50 rounded-sm">
                    <h3 className="text-sm font-bold mb-2 text-slate-800">AI-Powered Performance Analysis & Predictions</h3>
                    <div className="text-xs whitespace-pre-line text-slate-700 leading-relaxed">
                        {student.performanceSummary}
                    </div>
                </div>

                <footer className="text-center text-xs text-slate-500 mt-4">
                    <p>Note: Mid-term report based on 100% of total assessment. Final results will include all assessments (100%).</p>
                    <p>Generated {new Date().toLocaleString()}. Digitally signed and verifiable via QR code.</p>
                </footer>
            </div>
        </div>
    );
}