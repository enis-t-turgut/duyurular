
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- From types.ts ---
interface Announcement {
  date: string;
  title: string;
  description: string;
  file: string;
}

// --- From services/announcementService.ts ---
const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await fetch('./announcements.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data as Announcement[];
};

// --- From components/icons/ExternalLinkIcon.tsx ---
const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

// --- From components/Header.tsx ---
interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 py-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
                <p className="mt-2 text-md md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">{subtitle}</p>
            </div>
        </header>
    );
};

// --- From components/TimelineItem.tsx ---
interface TimelineItemProps {
  announcement: Announcement;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ announcement, isLeft }) => {
  const { date, title, description, file } = announcement;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const desktopClasses = isLeft ? 'md:flex-row-reverse' : '';

  return (
    <div className={`relative md:flex md:items-center ${desktopClasses}`}>
      {/* Desktop Spacer */}
      <div className="hidden md:block md:w-1/2"></div>
      
      {/* Marker */}
      <div className="absolute top-1 left-4 w-4 h-4 bg-brand-primary rounded-full ring-4 ring-slate-50 dark:ring-slate-900 md:relative md:left-auto md:transform md:-translate-x-1/2"></div>
      
      {/* Card */}
      <div className="ml-12 md:ml-0 md:w-1/2 md:p-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:border-brand-primary/50 hover:shadow-lg transition-all duration-300">
          <time className="mb-2 block text-sm font-normal leading-none text-slate-400 dark:text-slate-500">{formattedDate}</time>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="my-3 font-normal text-slate-600 dark:text-slate-300">{description}</p>
          <a href={file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:ring-offset-slate-800 rounded-lg">
            Read more
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

// --- From components/Timeline.tsx ---
interface TimelineProps {
  announcements: Announcement[];
}

const Timeline: React.FC<TimelineProps> = ({ announcements }) => {
  return (
    <div className="relative">
      {/* The timeline line */}
      <div 
        className="absolute top-0 left-4 md:left-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2"
        aria-hidden="true"
      ></div>
      <div className="space-y-12">
        {announcements.map((announcement, index) => (
          <TimelineItem 
            key={index} 
            announcement={announcement} 
            isLeft={index % 2 !== 0} // Alternates starting from the right side on desktop
          />
        ))}
      </div>
    </div>
  );
};

// --- From App.tsx ---
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

// --- Original index.tsx content ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
