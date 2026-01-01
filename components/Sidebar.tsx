
import React, { useState } from 'react';
import { User } from '../types';
import {
  HomeIcon,
  MarksEntryIcon,
  AILearningHubIcon,
  AIStudioIcon,
  AICBTIcon,
  AttendanceIcon,
  ResultGenerationIcon,
  UsersIcon,
  DocumentsIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CloseIcon,
  CogIcon,
  LogoutIcon,
} from './icons';

interface SchoolSettings {
  name: string;
  logo: React.ReactNode | string;
}

interface SidebarProps {
  user: User;
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
  schoolSettings: SchoolSettings;
}

export const navItems = [
  { name: 'Home', icon: HomeIcon, roles: ['Admin', 'Teacher'] },
  { 
    name: 'Marks Entry', 
    icon: MarksEntryIcon,
    roles: ['Admin', 'Teacher'],
    subItems: [
      'Continuous Assessments',
      'Bulk Marks Entry',
      'Early Years',
      'Socio-emotional skills',
      'Gradebook',
    ]
  },
  { name: 'AI Learning Hub', icon: AILearningHubIcon, roles: ['Admin'] },
  { name: 'AI Studio', icon: AIStudioIcon, new: true, roles: ['Admin'] },
  { name: 'AI CBT', icon: AICBTIcon, roles: ['Admin'] },
  { name: 'Attendance', icon: AttendanceIcon, roles: ['Admin', 'Teacher'] },
  { 
    name: 'Result Generation', 
    icon: ResultGenerationIcon,
    roles: ['Admin'],
    subItems: [
      'Mid-term Report',
      'Term Report',
      'Session Report',
      'Student Report',
      'Subject Performance',
      'Broadsheet',
    ]
  },
  {
    name: 'Users',
    icon: UsersIcon,
    roles: ['Admin', 'Teacher'], // Teacher can see Students
    subItems: ['Students', 'Subjects Offering'],
  },
  { 
    name: 'Documents', 
    icon: DocumentsIcon,
    roles: ['Admin'],
    subItems: ['ID Cards', 'Answer Sheets', 'Offline Marksheets', 'Offline Attendance Sheet'],
  },
  { name: 'Settings', icon: CogIcon, roles: ['Admin'] }
];

const NavItem: React.FC<{
  item: any;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center p-3 text-base font-medium rounded-lg group transition-all duration-200 ${
        isActive
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <item.icon
        className={`w-6 h-6 transition-all duration-200 ${
          isActive ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-900'
        }`}
      />
      <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
      {'new' in item && item.new && (
        <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-white bg-indigo-600 rounded-full">
          New
        </span>
      )}
    </a>
  </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ user, activePage, setActivePage, isOpen, setIsOpen, onLogout, schoolSettings }) => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(['Marks Entry', 'Result Generation', 'Users', 'Documents']);

  const handleItemClick = (pageName: string) => {
    setActivePage(pageName);
    if (window.innerWidth < 1024) {
      setIsOpen(false); // Close sidebar on mobile after selection
    }
  };
  
  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns(prev => 
        prev.includes(itemName) 
            ? prev.filter(i => i !== itemName) 
            : [...prev, itemName]
    );
  };
  
  const userNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 w-72 h-full transition-transform transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:w-72 lg:flex-shrink-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 flex flex-col bg-white shadow-lg lg:shadow-none lg:border-r">
          <div className="flex items-center justify-between pl-2.5 mb-5">
             <a href="#" className="flex items-center">
                {typeof schoolSettings.logo === 'string' ? <img src={schoolSettings.logo} alt="School Logo" className="h-10 w-10 mr-3 rounded-md object-cover" /> : schoolSettings.logo}
                <span className="self-center text-xl font-semibold whitespace-nowrap text-slate-800">{schoolSettings.name}</span>
            </a>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-slate-100 lg:hidden">
              <CloseIcon className="h-6 w-6 text-slate-500" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            <ul className="space-y-2">
                {userNavItems.map((item) => {
                    const subItems = 'subItems' in item ? item.subItems : undefined;
                    
                    // Teachers can only see 'Students' under 'Users'
                    const filteredSubItems = user.role === 'Teacher' && item.name === 'Users' ? ['Students'] : subItems;

                    if (filteredSubItems && Array.isArray(filteredSubItems)) {
                    const isDropdownOpen = openDropdowns.includes(item.name);
                    const isParentActive = filteredSubItems.includes(activePage);

                    return (
                    <li key={item.name}>
                        <button
                        type="button"
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center w-full p-3 text-base font-medium rounded-lg group transition-all duration-200 text-left ${
                            isParentActive
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                        >
                        <item.icon
                            className={`w-6 h-6 transition-all duration-200 ${
                            isParentActive
                                ? 'text-slate-800'
                                : 'text-slate-500 group-hover:text-slate-900'
                            }`}
                        />
                        <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
                        <ChevronDownIcon
                            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                            isDropdownOpen ? 'rotate-180' : ''
                            }`}
                        />
                        </button>
                        {isDropdownOpen && (
                        <ul className="pt-2 mt-1 space-y-1.5">
                            {filteredSubItems.map((subItemName) => {
                            const isSubItemActive = activePage === subItemName;
                            return (
                                <li key={subItemName}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    handleItemClick(subItemName);
                                    }}
                                    className={`flex items-center w-full py-2.5 px-3 text-base font-medium rounded-lg group transition-all duration-200 ${
                                    isSubItemActive
                                        ? 'bg-violet-500 text-white shadow'
                                        : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                                    }`}
                                >
                                    <div className="w-6 h-6 flex items-center justify-center">
                                    <span className={`w-2 h-2 border rounded-full transition-all duration-200 ${
                                        isSubItemActive ? 'border-white bg-white' : 'border-slate-500 group-hover:border-violet-700'
                                    }`}></span>
                                    </div>
                                    <span className="ml-3">{subItemName}</span>
                                </a>
                                </li>
                            );
                            })}
                        </ul>
                        )}
                    </li>
                    );
                } else {
                    return (
                    <NavItem
                        key={item.name}
                        item={item}
                        isActive={activePage === item.name}
                        onClick={() => handleItemClick(item.name)}
                    />
                    );
                }
                })}
            </ul>
          </div>
           <div className="pt-4 mt-4 border-t border-slate-200">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center p-3 text-base font-medium rounded-lg group transition-all duration-200 text-slate-600 hover:bg-slate-100"
                >
                    <LogoutIcon className="w-6 h-6 text-slate-500 group-hover:text-slate-900" />
                    <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </button>
            </div>
        </div>
      </aside>
    </>
  );
};