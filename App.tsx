
import React, { useState, useEffect } from 'react';
import type { Announcement } from './types.ts';
import { getAnnouncements } from './services/announcementService.ts';
import Header from './components/Header.tsx';
import Timeline from './components/Timeline.tsx';

const App: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await getAnnouncements();
        // Sort announcements by date, newest first
        const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setAnnouncements(sortedData);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
            setError(`Failed to load announcements. Please ensure 'announcements.json' exists and is correctly formatted. Error: ${err.message}`);
        } else {
            setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          <p className="ml-4 text-slate-600 dark:text-slate-400">Loading Announcements...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20 px-4">
          <p className="text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-300 p-4 rounded-lg">{error}</p>
        </div>
      );
    }
    
    if (announcements.length === 0) {
        return (
             <div className="text-center py-20 px-4">
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">No Announcements Yet</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Check back later for updates!</p>
            </div>
        )
    }

    return <Timeline announcements={announcements} />;
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <Header 
        title="Project Announcements"
        subtitle="Stay up to date with the latest news and updates for our project."
      />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;