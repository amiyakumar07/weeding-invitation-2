import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface RSVPFormData {
  name: string;
  guests: number;
  message: string;
  attending: string;
}

export default function RSVPForm({ lang }: { lang: 'en' | 'hi' }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RSVPFormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: RSVPFormData) => {
    console.log('RSVP Data:', data);
    setIsSubmitted(true);
    reset();
  };

  const text = {
    title: lang === 'en' ? 'RSVP' : 'आर.एस.वी.पी',
    desc: lang === 'en' ? 'Will you join us?' : 'क्या आप हमारे साथ शामिल होंगे?',
    name: lang === 'en' ? 'Full Name' : 'पूरा नाम',
    guests: lang === 'en' ? 'Number of Guests' : 'मेहमानों की संख्या',
    attending: lang === 'en' ? 'Are you attending?' : 'क्या आप आ रहे हैं?',
    yes: lang === 'en' ? 'Yes, I’ll be there' : 'हाँ, मैं वहां रहूँगा/रहूँगी',
    no: lang === 'en' ? 'Sorry, I can’t make it' : 'क्षमा करें, मैं नहीं आ पाऊंगा/पाऊंगी',
    message: lang === 'en' ? 'A message for the couple' : 'कपल के लिए एक संदेश',
    submit: lang === 'en' ? 'Send Response' : 'जवाब भेजें',
    success: lang === 'en' ? 'Thank you for responding!' : 'जवाब देने के लिए धन्यवाद!',
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-wedding-gold/5 rounded-2xl border border-wedding-gold/20">
        <div className="w-16 h-16 bg-wedding-gold rounded-full flex items-center justify-center text-white mb-4">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif text-wedding-gold mb-2">{text.success}</h3>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-stone-900 rounded-3xl border border-wedding-gold/20 shadow-xl">
      <h2 className="text-3xl font-serif text-center mb-1 text-wedding-gold">{text.title}</h2>
      <p className="text-center text-wedding-accent mb-8 italic">{text.desc}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-stone-200">
        <div>
          <label className="block text-xs uppercase tracking-widest text-wedding-accent mb-2 font-semibold">
            {text.name}
          </label>
          <input
            {...register('name', { required: true })}
            className="w-full px-4 py-3 border-b border-wedding-gold/30 focus:border-wedding-gold outline-none transition-colors rounded-none bg-transparent"
            placeholder={lang === 'en' ? 'Enter your name' : 'अपना नाम दर्ज करें'}
          />
          {errors.name && <span className="text-rose-500 text-[10px] mt-1 uppercase">Required</span>}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-wedding-accent mb-2 font-semibold">
            {text.guests}
          </label>
          <select
            {...register('guests', { required: true })}
            className="w-full px-4 py-3 bg-stone-800 border-b border-wedding-gold/30 focus:border-wedding-gold outline-none transition-colors rounded-xl"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-wedding-accent mb-4 font-semibold">
            {text.attending}
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" {...register('attending')} value="yes" className="accent-wedding-gold" defaultChecked />
              <span className="text-sm text-stone-300 group-hover:text-wedding-gold transition-colors">{text.yes}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" {...register('attending')} value="no" className="accent-wedding-gold" />
              <span className="text-sm text-stone-300 group-hover:text-wedding-gold transition-colors">{text.no}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-wedding-accent mb-2 font-semibold">
            {text.message}
          </label>
          <textarea
            {...register('message')}
            rows={3}
            className="w-full px-4 py-3 bg-stone-800 border border-wedding-gold/20 focus:border-wedding-gold outline-none transition-colors rounded-xl text-stone-200"
            placeholder="..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-wedding-gold text-white py-4 rounded-full font-serif text-xl hover:bg-wedding-accent transition-colors shadow-lg"
        >
          {text.submit}
        </button>
      </form>
    </div>
  );
}
