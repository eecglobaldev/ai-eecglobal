import React from 'react';
import {IMAGES} from '../constant';


const stories = [
    {
        name: 'Aarav P.',
        university: 'University of Melbourne',
        quote: '"The AI pinpointed the exact weak spot in my GS answers regarding my study gap. The practice sessions and feedback were brutal but necessary. I went into the real interview with 100% confidence. Visa granted!"',
        imageUrl: IMAGES.male1,
    },
    {
        name: 'Meera K.',
        university: 'UNSW Sydney',
        quote: '"My marriage was recent, and I was worried it would be a red flag. The tool generated so many specific questions about it, and the model answers helped me frame my situation honestly and positively. It made all the difference."',
        imageUrl: IMAGES.female1,
    },
    {
        name: 'Vikram S.',
        university: 'Monash University',
        quote: '"For me, it was the financial questions. The AI didn\'t just ask \'who is your sponsor\', it drilled down into my father\'s income and ITR details. That level of specific practice is something you can\'t get anywhere else. This tool is a game-changer."',
        imageUrl: IMAGES.male2,
    },
];

const StoryCard: React.FC<typeof stories[0]> = ({ name, university, quote, imageUrl }) => (
    <div className="group bg-white dark:bg-slate-800/60 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/50 dark:hover:shadow-teal-400/20 dark:hover:border-teal-500/50">
        <div className="flex items-start gap-4">
            <img className="w-12 h-12 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover:scale-110" src={imageUrl} alt={`Photo of ${name}`} />
            <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200">{name}</h4>
                <p className="text-xs font-medium text-teal-600 dark:text-teal-400">{university}</p>
            </div>
        </div>
        <blockquote className="mt-4 text-slate-600 dark:text-slate-400 italic before:content-['“'] before:mr-1 before:text-2xl before:font-serif after:content-['”'] after:ml-1 after:text-2xl after:font-serif">
            {quote}
        </blockquote>
    </div>
);

export const SuccessStories: React.FC = () => {
    return (
        <div id="success-stories">
            <div className="max-w-6xl mx-auto px-4">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-green-400 dark:to-cyan-500">From Preparation to Approval</h2>
                    <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">Real journeys from Indian students who used this tool to secure their Australian visa.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stories.map(story => <StoryCard key={story.name} {...story} />)}
                </div>
            </div>
        </div>
    );
};