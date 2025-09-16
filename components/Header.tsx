import React from 'react';

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

export default Header;