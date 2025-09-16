import React from 'react';
import type { Announcement } from '../types';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

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

export default TimelineItem;