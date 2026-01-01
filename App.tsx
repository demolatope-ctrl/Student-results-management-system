
import React, { useState } from 'react';
import { Student, User } from './types';
import { Sidebar, navItems } from './components/Sidebar';
import { MainHeader } from './components/MainHeader';
import { BulkMarksEntry } from './components/BulkMarksEntry';
import { MidTermReport, ReportConfig } from './components/MidTermReport';
import { ReportCard } from './components/ReportCard';
import { sampleStudents } from './data/studentData';
import { StudentsPage } from './components/StudentsPage';
import { SubjectOfferingsPage } from './components/SubjectOfferingsPage';
import { IDCardPage } from './components/IDCardPage';
import { AnswerSheetPage } from './components/AnswerSheetPage';
import { OfflineMarksheetPage } from './components/OfflineMarksheetPage';
import { OfflineAttendanceSheetPage } from './components/OfflineAttendanceSheetPage';
import { LoginPage } from './components/LoginPage';
import { mockUsers } from './data/userData';
import { SettingsPage } from './components/SettingsPage';
import { LogoIcon } from './components/icons';

interface ViewingReportState {
  student: Student;
  config: ReportConfig;
}

interface SchoolSettings {
  name: string;
  logo: React.ReactNode | string;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [viewingReport, setViewingReport] = useState<ViewingReportState | null>(null);
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>({
    name: 'oloyecomprehens',
    logo: <LogoIcon className="h-10 w-10 mr-3" />,
  });

  const [allClasses, setAllClasses] = useState([
    'JS 1A', 'JS 1B', 'JS 1C', 'JS 2A', 'JS 2B', 'JS 2C', 'JS 3A', 'JS 3B', 'JS 3C', 'JS 3D',
    'SS 1A', 'SS 1B', 'SS 2A', 'SS 2B', 'SS 3A'
  ].sort());

  const [allSubjects, setAllSubjects] = useState([
      'MATHEMATICS', 'ENGLISH LANGUAGE', 'BASIC SCIENCE & TECHNOLOGY', 'HISTORY', 
      'CIVIC EDUCATION', 'AGRICULTURAL SCIENCE', 'SOCIAL STUDIES', 'BUSINESS STUDIES', 
      'HOME ECONOMICS', 'SECURITY EDUCATION', 'HAUSA LANGUAGE', 'YORUBA LANGUAGE', 
      'IGBO LANGUAGE', 'C.R.S', 'I.R.K', 'COMMERCE', 'FINANCIAL ACCOUNTING', 
      'ANIMAL HUSBANDRY', 'DATA PROCESSING', 'MARKETING', 'GEOGRAPHY', 
      'COMPUTER STUDIES', 'ECONOMICS', 'TECHNICAL DRAWING', 'FURTHER MATHS', 
      'LITERATURE IN ENGLISH', 'GOVERNMENT'
  ].sort());

  const handleAddClass = (newClass: string) => {
    if (newClass && !allClasses.includes(newClass.toUpperCase())) {
        setAllClasses(prev => [...prev, newClass.toUpperCase()].sort());
        return true;
    }
    return false;
  };

  const handleAddSubject = (newSubject: string) => {
      const subjectUpper = newSubject.toUpperCase();
      if (newSubject && !allSubjects.includes(subjectUpper)) {
          setAllSubjects(prev => [...prev, subjectUpper].sort());
          return true;
      }
      return false;
  };

  const handleLogin = (username: string, password: string):boolean => {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setActivePage('Home');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleViewReport = (studentId: string, config: ReportConfig) => {
    const student = sampleStudents.find(s => s.id === studentId);
    if (student) {
        setViewingReport({ student, config });
    } else {
      console.error("Student not found:", studentId);
    }
  };

  const handleCloseReport = () => {
    setViewingReport(null);
  };
  
  const renderContent = () => {
    if (!currentUser) return null; // Should not happen if layout is rendered
    
    // Simple placeholder for Home
    if (activePage === 'Home') {
        return (
             <div className="flex items-center justify-center h-full bg-white rounded-lg shadow">
                <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800">Welcome, {currentUser.role}</h2>
                <p className="text-slate-500 mt-2">Select an option from the sidebar to get started.</p>
                </div>
            </div>
        )
    }

    if (activePage === 'Settings') {
        return <SettingsPage 
          settings={schoolSettings} 
          setSettings={setSchoolSettings}
          allClasses={allClasses}
          allSubjects={allSubjects}
          onAddClass={handleAddClass}
          onAddSubject={handleAddSubject}
        />
    }

    const marksEntryItem = navItems.find(item => item.name === 'Marks Entry' && 'subItems' in item);
    const marksEntrySubItems = (marksEntryItem && 'subItems' in marksEntryItem) ? marksEntryItem.subItems : [];
    
    const resultGenItem = navItems.find(item => item.name === 'Result Generation' && 'subItems' in item);
    const resultGenSubItems = (resultGenItem && 'subItems' in resultGenItem) ? resultGenItem.subItems : [];

    const usersItem = navItems.find(item => item.name === 'Users' && 'subItems' in item);
    const usersSubItems = (usersItem && 'subItems' in usersItem) ? usersItem.subItems : [];

    const documentsItem = navItems.find(item => item.name === 'Documents' && 'subItems' in item);
    const documentsSubItems = (documentsItem && 'subItems' in documentsItem) ? documentsItem.subItems : [];


    if (marksEntrySubItems.includes(activePage)) {
      return <BulkMarksEntry allClasses={allClasses} allSubjects={allSubjects} />;
    }

    if (resultGenSubItems.includes(activePage)) {
        if (activePage === 'Mid-term Report') {
            return <MidTermReport onViewReport={handleViewReport} allClasses={allClasses} />;
        }
    }
    
    if (usersSubItems.includes(activePage)) {
        if (activePage === 'Students') {
            return <StudentsPage allClasses={allClasses} />;
        }
        if (activePage === 'Subjects Offering') {
            return <SubjectOfferingsPage allClasses={allClasses} />;
        }
    }
    
    if (documentsSubItems.includes(activePage)) {
       if (activePage === 'ID Cards') {
         return <IDCardPage allClasses={allClasses} />;
       }
       if (activePage === 'Answer Sheets') {
         return <AnswerSheetPage allClasses={allClasses} />;
       }
       if (activePage === 'Offline Marksheets') {
         return <OfflineMarksheetPage allClasses={allClasses} allSubjects={allSubjects} />;
       }
       if (activePage === 'Offline Attendance Sheet') {
        return <OfflineAttendanceSheetPage allClasses={allClasses} />;
      }
    }

    return (
      <div className="flex items-center justify-center h-full bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">{activePage}</h2>
          <p className="text-slate-500 mt-2">This page is under construction.</p>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <Sidebar 
        user={currentUser}
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        onLogout={handleLogout}
        schoolSettings={schoolSettings}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainHeader user={currentUser} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
         {renderContent()}
        </main>
      </div>

       {viewingReport && (
        <ReportCard 
          student={viewingReport.student} 
          config={viewingReport.config}
          onClose={handleCloseReport} 
        />
      )}
    </div>
  );
};

export default App;