
import React, { useState } from 'react';
import { SaveIcon, GraduationCapIcon, BookOpenIcon, PlusIcon } from './icons';

interface SchoolSettings {
    name: string;
    logo: React.ReactNode | string;
}

interface SettingsPageProps {
    settings: SchoolSettings;
    setSettings: React.Dispatch<React.SetStateAction<SchoolSettings>>;
    allClasses: string[];
    allSubjects: string[];
    onAddClass: (className: string) => boolean;
    onAddSubject: (subjectName: string) => boolean;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings, allClasses, allSubjects, onAddClass, onAddSubject }) => {
    const [schoolName, setSchoolName] = useState(settings.name);
    const [logoPreview, setLogoPreview] = useState<string | null>(typeof settings.logo === 'string' ? settings.logo : null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [newSubjectName, setNewSubjectName] = useState('');

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSaveChanges = () => {
        setSettings({
            name: schoolName,
            logo: logoPreview || settings.logo,
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleAddClassClick = () => {
        if (onAddClass(newClassName)) {
            setNewClassName('');
        }
    };

    const handleAddSubjectClick = () => {
        if (onAddSubject(newSubjectName)) {
            setNewSubjectName('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>

            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-700 mb-4 pb-4 border-b">School Information</h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="school-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                            School Name
                        </label>
                        <input
                            id="school-name"
                            type="text"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className="w-full px-3 py-2 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            School Logo
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-md bg-slate-100 flex items-center justify-center border overflow-hidden">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-slate-500 text-center">No Logo</span>
                                )}
                            </div>
                            <div>
                                <input
                                    type="file"
                                    id="logo-upload"
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/svg+xml"
                                    onChange={handleLogoChange}
                                />
                                <label htmlFor="logo-upload" className="cursor-pointer bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors">
                                    Upload New Logo
                                </label>
                                <p className="text-xs text-slate-500 mt-2">PNG, JPG, or SVG. Recommended: 100x100px.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-end">
                    <button 
                        onClick={handleSaveChanges}
                        className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
                    >
                        <SaveIcon className="w-5 h-5" />
                        <span>Save Changes</span>
                    </button>
                </div>

                 {showSuccess && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium">
                        Settings updated successfully!
                    </div>
                )}
            </div>
            
            {/* Manage Classes */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-700 mb-4 pb-4 border-b flex items-center gap-3">
                    <GraduationCapIcon className="w-6 h-6 text-slate-500" />
                    Manage Classes
                </h2>
                <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-2 font-medium">Existing Classes:</p>
                    <div className="flex flex-wrap gap-2">
                        {allClasses.map(c => (
                            <span key={c} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">{c}</span>
                        ))}
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                    <label htmlFor="new-class-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Add New Class
                    </label>
                    <div className="flex gap-2">
                        <input 
                            id="new-class-name"
                            type="text"
                            value={newClassName}
                            onChange={(e) => setNewClassName(e.target.value)}
                            placeholder="e.g., SS 3B"
                            className="flex-grow px-3 py-2 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button 
                            onClick={handleAddClassClick}
                            className="flex items-center gap-2 bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Manage Subjects */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-700 mb-4 pb-4 border-b flex items-center gap-3">
                    <BookOpenIcon className="w-6 h-6 text-slate-500" />
                    Manage Subjects
                </h2>
                <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-2 font-medium">Existing Subjects:</p>
                    <div className="flex flex-wrap gap-2">
                        {allSubjects.map(s => (
                            <span key={s} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">{s}</span>
                        ))}
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                    <label htmlFor="new-subject-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Add New Subject
                    </label>
                    <div className="flex gap-2">
                        <input 
                            id="new-subject-name"
                            type="text"
                            value={newSubjectName}
                            onChange={(e) => setNewSubjectName(e.target.value)}
                            placeholder="e.g., BIOLOGY"
                            className="flex-grow px-3 py-2 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button 
                            onClick={handleAddSubjectClick}
                            className="flex items-center gap-2 bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};