import React from 'react';
import type { Announcement } from '../types.ts';
import TimelineItem from './TimelineItem.tsx';

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

export default Timeline;