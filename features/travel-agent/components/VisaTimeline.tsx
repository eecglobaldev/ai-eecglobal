
import React from 'react';
import { ClockIcon, CalendarIcon, CheckIcon, PlaneIcon } from './Icons';

interface VisaTimelineProps {
  processingTime: string;
}

const VisaTimeline: React.FC<VisaTimelineProps> = ({ processingTime }) => {
  // Parsing logic to estimate dates
  const parseDays = (text: any): number => {
    // Defensive coding: Cast input to string safely
    const safeText = typeof text === 'string' ? text : String(text || "");
    if (!safeText) return 15; // default fallback
    
    // Extract numbers like "15-30" or "6-8 weeks"
    const numbers = safeText.match(/\d+/g);
    if (!numbers) return 15; // default fallback

    const avg = numbers.reduce((a, b) => a + parseInt(b), 0) / numbers.length;
    
    if (safeText.toLowerCase().includes('week')) {
        return avg * 7;
    }
    return avg;
  };

  const estimatedProcessingDays = parseDays(processingTime);
  const prepDays = 7; // Approx time for user to gather docs
  const totalDays = prepDays + estimatedProcessingDays + 3; // +3 for buffer/passport return

  const formatDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const steps = [
    {
      title: "Prepare Docs",
      date: formatDate(0),
      desc: "Get checklist ready",
      status: "current",
      icon: CheckIcon
    },
    {
      title: "Submit App",
      date: formatDate(prepDays),
      desc: "Appointment / Biometrics",
      status: "upcoming",
      icon: CalendarIcon
    },
    {
      title: "Processing",
      date: "~ " + Math.round(estimatedProcessingDays) + " Days",
      desc: "Consulate Review",
      status: "upcoming",
      icon: ClockIcon
    },
    {
      title: "Fly",
      date: formatDate(totalDays),
      desc: "Visa Stamped",
      status: "upcoming",
      icon: PlaneIcon
    }
  ];

  return (
    <div className="w-full py-6">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
         <ClockIcon className="w-4 h-4" /> 
         Estimated Timeline
      </h3>
      
      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="absolute top-5 left-4 right-4 h-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
        {/* Connecting Line (Mobile) */}
        <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-700 md:hidden"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
           {steps.map((step, idx) => (
             <div key={idx} className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 group">
                
                {/* Node Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 flex-shrink-0 transition-all duration-500
                    ${idx === 0 
                      ? 'bg-violet-600 border-violet-100 dark:border-violet-900 text-white shadow-lg shadow-violet-500/30 scale-110' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500 group-hover:border-violet-300 dark:group-hover:border-violet-700 group-hover:text-violet-500'
                    }
                `}>
                   <step.icon className="w-4 h-4" />
                </div>

                {/* Text Content */}
                <div className="text-left md:text-center">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${idx === 0 ? 'text-violet-600 dark:text-violet-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {step.date}
                    </p>
                    <h4 className={`font-bold text-sm md:text-base ${idx === 0 ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                        {step.desc}
                    </p>
                </div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
             *Dates are estimated based on the current <strong>{processingTime || "Standard"}</strong> processing window.
          </p>
      </div>
    </div>
  );
};

export default VisaTimeline;
