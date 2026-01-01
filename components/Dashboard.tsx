
import React, { useMemo } from 'react';
import { Student } from '../types';
import { GraduationCapIcon, ClipboardListIcon, TrendingUpIcon, UsersIcon } from './icons';

interface DashboardProps {
  students: Student[];
}

const getAverageScore = (results: Student['results']) => {
  if (!results || results.length === 0) return 0;
  const total = results.reduce((sum, result) => sum + (result.scores.ca + result.scores.exam), 0);
  return Math.round(total / results.length);
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; note?: string }> = ({ icon, title, value, note }) => (
    <div className="bg-white p-5 rounded-xl shadow-md border flex">
        <div className="flex-shrink-0 mr-4">
            <div className="bg-indigo-100 text-indigo-600 rounded-lg h-12 w-12 flex items-center justify-center">
                {icon}
            </div>
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
            {note && <p className="text-xs text-slate-500 mt-1">{note}</p>}
        </div>
    </div>
);


export const Dashboard: React.FC<DashboardProps> = ({ students }) => {

  const dashboardStats = useMemo(() => {
    if (students.length === 0) {
      return {
        totalStudents: 0,
        classAverage: 0,
        topPerformer: { name: 'N/A', average: 0 },
        topSubject: { name: 'N/A', average: 0 },
      };
    }

    const totalStudents = students.length;

    let totalScore = 0;
    let totalSubjectsCount = 0;
    const subjectStats: { [key: string]: { total: number; count: number } } = {};
    let topPerformer = { name: '', average: -1 };

    students.forEach(student => {
      const studentAverage = getAverageScore(student.results);
      if (studentAverage > topPerformer.average) {
        topPerformer = { name: student.name, average: studentAverage };
      }

      student.results.forEach(result => {
        const subjectTotal = result.scores.ca + result.scores.exam;
        totalScore += subjectTotal;
        totalSubjectsCount++;
        if (!subjectStats[result.subject]) {
          subjectStats[result.subject] = { total: 0, count: 0 };
        }
        subjectStats[result.subject].total += subjectTotal;
        subjectStats[result.subject].count++;
      });
    });

    const classAverage = totalSubjectsCount > 0 ? Math.round(totalScore / totalSubjectsCount) : 0;

    let topSubject = { name: 'N/A', average: -1 };
    Object.entries(subjectStats).forEach(([subject, data]) => {
      const average = Math.round(data.total / data.count);
      if (average > topSubject.average) {
        topSubject = { name: subject, average };
      }
    });

    return {
      totalStudents,
      classAverage,
      topPerformer,
      topSubject,
    };
  }, [students]);

  return (
    <div className="mb-8">
       <h2 className="text-xl font-bold text-slate-800 mb-4">Dashboard</h2>
       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard 
                icon={<UsersIcon className="h-6 w-6"/>}
                title="Total Students"
                value={String(dashboardStats.totalStudents)}
            />
            <StatCard 
                icon={<ClipboardListIcon className="h-6 w-6"/>}
                title="Class Average"
                value={`${dashboardStats.classAverage}%`}
            />
             <StatCard 
                icon={<TrendingUpIcon className="h-6 w-6"/>}
                title="Top Performer"
                value={dashboardStats.topPerformer.name}
                note={`Avg: ${dashboardStats.topPerformer.average}%`}
            />
             <StatCard 
                icon={<GraduationCapIcon className="h-6 w-6"/>}
                title="Top Subject"
                value={dashboardStats.topSubject.name}
                note={`Avg: ${dashboardStats.topSubject.average}%`}
            />
       </div>
    </div>
  );
};