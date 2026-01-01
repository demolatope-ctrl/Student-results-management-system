
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Student } from '../types';
import { sampleStudents } from '../data/studentData';
import { 
    PlusIcon, 
    SearchIcon, 
    FilterIcon, 
    ArrowPathIcon, 
    XIcon, 
    DotsVerticalIcon, 
    MaleIcon,
    UserIcon,
    EyeIcon,
    PencilAltIcon,
    SwitchHorizontalIcon,
    KeyIcon,
    UsersIcon,
    GraduationCapIcon,
    TrashIcon
} from './icons';
import { CreateStudentForm } from './CreateStudentForm';
import { StudentCreationSuccess } from './StudentCreationSuccess';

const Banner: React.FC<{ onAddNew: () => void }> = ({ onAddNew }) => (
    <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold">Students Management</h1>
        <p className="mt-2 text-violet-200">Manage and organize your school students efficiently</p>
        <button 
            onClick={onAddNew}
            className="mt-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm"
        >
            <PlusIcon className="w-6 h-6" />
            <span>Add New Student</span>
        </button>
    </div>
);

const FilterControls: React.FC<{
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedClass: string;
    setSelectedClass: (c: string) => void;
    perPage: number;
    setPerPage: (p: number) => void;
    allClasses: string[];
}> = ({ searchTerm, setSearchTerm, selectedClass, setSelectedClass, perPage, setPerPage, allClasses }) => (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label className="flex items-center text-sm font-medium text-slate-600 mb-1.5">
                    <SearchIcon className="h-5 w-5 mr-2 text-slate-400"/>
                    Search Students
                </label>
                <input 
                    type="text"
                    placeholder="Search by name or roll number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-3 pr-4 py-2 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
             <div>
                <label className="flex items-center text-sm font-medium text-slate-600 mb-1.5">
                    <FilterIcon className="h-5 w-5 mr-2 text-slate-400"/>
                    Filter by Class
                </label>
                 <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="All Classes">All Classes</option>
                    {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Per Page</label>
                 <select
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="w-full pl-3 pr-10 py-2 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
             <button className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md transition-colors">
                <XIcon className="h-4 w-4" />
                <span>Clear Filters</span>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-md transition-colors">
                <ArrowPathIcon className="h-4 w-4" />
                <span>Refresh</span>
            </button>
        </div>
    </div>
);

const StudentListCard: React.FC<{ student: Student }> = ({ student }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const menuItems = [
        { label: 'View Details', icon: EyeIcon, color: 'text-indigo-500' },
        { label: 'Update Student Details', icon: PencilAltIcon, color: 'text-green-500' },
        { label: 'Update Class', icon: SwitchHorizontalIcon, color: 'text-blue-500' },
        { label: 'Password', icon: KeyIcon, color: 'text-orange-500', divider: true },
        { label: 'Parents', icon: UsersIcon, color: 'text-cyan-500', highlighted: true },
        { label: 'Alumni', icon: GraduationCapIcon, color: 'text-slate-500' },
        { label: 'Delete', icon: TrashIcon, color: 'text-red-500', divider: true, isDelete: true },
    ];

    return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200/80 relative">
        <div className="flex items-start justify-between">
             <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <UserIcon className="w-8 h-8"/>
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 uppercase">{student.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">{student.id}</span>
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">{student.status}</span>
                    </div>
                </div>
            </div>
            <button 
                onClick={() => setIsMenuOpen(prev => !prev)}
                className="p-1 text-slate-500 hover:bg-slate-100 rounded-full"
            >
                <DotsVerticalIcon className="w-5 h-5"/>
            </button>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-sm">
            <div>
                <p className="text-xs text-slate-500 mb-0.5">Class</p>
                <p className="font-semibold text-cyan-800 bg-cyan-100 px-2.5 py-1 rounded-md">{student.class}</p>
            </div>
            <div>
                <p className="text-xs text-slate-500 mb-0.5">Gender</p>
                <p className="flex items-center gap-1.5 font-semibold text-violet-800 bg-violet-100 px-2.5 py-1 rounded-md">
                    <MaleIcon className="w-4 h-4" />
                    {student.gender}
                </p>
            </div>
        </div>

        {isMenuOpen && (
            <div ref={menuRef} className="absolute top-12 right-4 z-10 w-56 bg-white rounded-lg shadow-xl border border-slate-200/80 py-1.5 animate-fade-in-down">
                <ul>
                    {menuItems.map(item => (
                        <React.Fragment key={item.label}>
                        {item.divider && <li className="h-px bg-slate-200 my-1.5"></li>}
                        <li>
                            <a href="#" className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors ${item.highlighted ? 'bg-slate-100 text-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}>
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span className={item.isDelete ? 'font-semibold' : ''}>{item.label}</span>
                            </a>
                        </li>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        )}
         <style>{`
            @keyframes fade-in-down {
                0% { opacity: 0; transform: translateY(-10px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-down {
                animation: fade-in-down 0.15s ease-out forwards;
            }
        `}</style>
    </div>
    );
};

const AddStudentMethod: React.FC<{ onBack: () => void; onCreateForm: () => void }> = ({ onBack, onCreateForm }) => (
     <div className="max-w-2xl mx-auto">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80 mb-6 text-center">
             <h2 className="text-xl font-bold text-slate-800">Choose Your Method to Create New Students</h2>
        </div>
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-violet-200 text-center">
                 <h3 className="text-lg font-bold text-violet-700">Using on-site form</h3>
                 <p className="text-slate-600 my-3">Use the on-site form to create a new student account individually.</p>
                 <button onClick={onCreateForm} className="bg-violet-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-violet-700 transition-colors">
                    Create Student Form
                 </button>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-emerald-200 text-center">
                 <h3 className="text-lg font-bold text-emerald-700">Import Students (Excel)</h3>
                 <p className="text-slate-600 my-3">Bulk-add new students by uploading an Excel file.</p>
                 <button className="bg-emerald-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-emerald-700 transition-colors">
                    Import Students
                 </button>
            </div>
        </div>
        <div className="mt-8 text-center">
            <button onClick={onBack} className="text-sm font-semibold text-slate-600 hover:text-slate-800">
                &larr; Back to Student List
            </button>
        </div>
    </div>
);

interface StudentsPageProps {
    allClasses: string[];
}

export const StudentsPage: React.FC<StudentsPageProps> = ({ allClasses }) => {
    const [view, setView] = useState<'list' | 'add_method' | 'create_form' | 'create_success'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('All Classes');
    const [perPage, setPerPage] = useState(25);
    const [successInfo, setSuccessInfo] = useState({ count: 0, className: '' });

    const filteredStudents = useMemo(() => {
        return sampleStudents
            .filter(student => 
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.id.includes(searchTerm)
            )
            .filter(student =>
                selectedClass === 'All Classes' || student.class === selectedClass
            )
    }, [searchTerm, selectedClass]);

    const handleSaveSuccess = (studentCount: number, className: string) => {
        setSuccessInfo({ count: studentCount, className: className });
        setView('create_success');
    };

    if (view === 'add_method') {
        return <AddStudentMethod onBack={() => setView('list')} onCreateForm={() => setView('create_form')} />;
    }

    if (view === 'create_form') {
        return <CreateStudentForm onBack={() => setView('add_method')} onSaveSuccess={handleSaveSuccess} allClasses={allClasses} />;
    }
    
    if (view === 'create_success') {
        return <StudentCreationSuccess 
            studentCount={successInfo.count}
            className={successInfo.className}
            onAddMore={() => setView('add_method')}
            onGoToList={() => setView('list')}
        />;
    }

    return (
        <div className="space-y-6">
            <Banner onAddNew={() => setView('add_method')} />
            <FilterControls 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                perPage={perPage}
                setPerPage={setPerPage}
                allClasses={allClasses}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredStudents.slice(0, perPage).map(student => (
                    <StudentListCard key={student.id} student={student} />
                ))}
            </div>
        </div>
    );
};