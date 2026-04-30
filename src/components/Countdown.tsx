import { useEffect, useState } from 'react';
import { intervalToDuration, isPast } from 'date-fns';

interface CountdownProps {
  targetDate: string;
  lang: 'en' | 'hi';
}

export default function Countdown({ targetDate, lang }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const expirationDate = new Date(targetDate);
      if (isPast(expirationDate)) {
        clearInterval(timer);
        return;
      }

      const duration = intervalToDuration({
        start: new Date(),
        end: expirationDate,
      });

      setTimeLeft(duration);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const labels = {
    days: lang === 'en' ? 'Days' : 'दिन',
    hours: lang === 'en' ? 'Hours' : 'घंटे',
    minutes: lang === 'en' ? 'Minutes' : 'मिनट',
    seconds: lang === 'en' ? 'Seconds' : 'सेकंड',
  };

  return (
    <div className="flex justify-center gap-4 sm:gap-8 py-8">
      {[
        { value: timeLeft.days ?? 0, label: labels.days },
        { value: timeLeft.hours ?? 0, label: labels.hours },
        { value: timeLeft.minutes ?? 0, label: labels.minutes },
        { value: timeLeft.seconds ?? 0, label: labels.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border border-wedding-gold/30 rounded-full flex items-center justify-center bg-white shadow-sm mb-2">
            <span className="font-serif text-2xl sm:text-3xl text-wedding-gold font-light">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-wedding-accent font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
