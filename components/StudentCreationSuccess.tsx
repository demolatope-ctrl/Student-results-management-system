
import React from 'react';
import { CheckBadgeIcon, PlusIcon, ListBulletIcon } from './icons';

interface StudentCreationSuccessProps {
    studentCount: number;
    className: string;
    onAddMore: () => void;
    onGoToList: () => void;
}

export const StudentCreationSuccess: React.FC<StudentCreationSuccessProps> = ({ studentCount, className, onAddMore, onGoToList }) => {
    return (
        <div className="max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                    <CheckBadgeIcon className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Creation Successful!</h2>
                <p className="text-slate-600 mt-3 text-lg">
                    You have successfully added <span className="font-bold text-green-700">{studentCount}</span> new student{studentCount !== 1 && 's'} to class <span className="font-bold text-green-700">{className}</span>.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onAddMore}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 text-violet-700 font-semibold bg-violet-100 rounded-lg hover:bg-violet-200 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Add More Students</span>
                    </button>
                    <button
                        onClick={onGoToList}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-semibold bg-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <ListBulletIcon className="h-5 w-5" />
                        <span>View Student List</span>
                    </button>
                </div>
            </div>
        </div>
    );
};