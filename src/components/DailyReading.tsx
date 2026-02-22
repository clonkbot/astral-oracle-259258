import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Sign {
  name: string;
  symbol: string;
  dates: string;
  element: string;
  ruling: string;
}

interface Props {
  sign: Sign;
  onClose: () => void;
}

const readings: Record<string, string[]> = {
  Aries: [
    "A bold opportunity awaits you today. Trust your instincts and take the leap—the universe rewards courage.",
    "Your fire burns bright, Aries. Channel that energy into something creative before the day ends.",
    "A challenging conversation may arise, but your natural leadership will guide you through."
  ],
  Taurus: [
    "Slow down and savor the moment, Taurus. Beauty surrounds you—notice the small pleasures today.",
    "Financial matters align in your favor. Trust the process you've been building.",
    "Someone from your past may resurface. Approach with an open heart but grounded expectations."
  ],
  Gemini: [
    "Your curiosity leads you to unexpected discoveries today. Follow the thread—it's worth exploring.",
    "Communication flows easily. Use this gift to bridge a gap that's been troubling you.",
    "Multiple paths present themselves. Trust that whichever you choose, you'll find your way."
  ],
  Cancer: [
    "Your intuition is heightened today. That gut feeling? It's right. Trust it completely.",
    "Home and family matters take center stage. Create a sanctuary for yourself and those you love.",
    "Old emotional patterns surface for healing. This is growth, Cancer—embrace it gently."
  ],
  Leo: [
    "The spotlight finds you naturally today. Step into it with grace and let your light shine.",
    "Creative inspiration strikes—capture it before it fades. Your art matters more than you know.",
    "Generosity returns to you tenfold. What you give today plants seeds for tomorrow's abundance."
  ],
  Virgo: [
    "Details matter today, and you see them all. Use this clarity to solve a lingering puzzle.",
    "Your body communicates wisdom. Listen to what it needs—rest, movement, or nourishment.",
    "Perfectionism softens into acceptance. What is good enough today is truly enough."
  ],
  Libra: [
    "Balance tips in your favor today. Harmony you've sought arrives in unexpected forms.",
    "Partnerships deepen through honest conversation. Say what needs to be said, beautifully.",
    "Aesthetic choices matter—trust your eye. The beauty you create reflects your inner state."
  ],
  Scorpio: [
    "Transformation is not always comfortable, but it is always powerful. You emerge stronger today.",
    "Hidden truths rise to the surface. You have the courage to face what others cannot.",
    "Intensity serves you well—channel it into passion rather than obsession."
  ],
  Sagittarius: [
    "Adventure calls, even in small ways. Say yes to the invitation that expands your world.",
    "Your optimism is contagious today. Share it generously—others need your light.",
    "Wisdom arrives through experience. The lesson you learn today becomes tomorrow's teaching."
  ],
  Capricorn: [
    "Your disciplined approach pays dividends. The mountain you've been climbing reveals its summit.",
    "Structure supports your dreams today. Build the framework that will hold your vision.",
    "Rest is part of success, Capricorn. Allow yourself to pause without guilt."
  ],
  Aquarius: [
    "Innovation strikes like lightning today. Your unique perspective solves an old problem.",
    "Community connections strengthen. The collective needs your visionary contribution.",
    "Independence and intimacy find balance. You can be free and deeply connected."
  ],
  Pisces: [
    "Dreams hold messages today. Pay attention to symbols and signs upon waking.",
    "Your empathy is a superpower, not a weakness. Boundaries help you share it sustainably.",
    "Creative flow opens wide. Surrender to the current and see where it carries you."
  ]
};

export default function DailyReading({ sign, onClose }: Props) {
  const [reading, setReading] = useState('');
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [luckyColor, setLuckyColor] = useState('');

  const colors = ['Golden', 'Midnight Blue', 'Emerald', 'Crimson', 'Silver', 'Violet', 'Coral', 'Sage'];

  useEffect(() => {
    const signReadings = readings[sign.name];
    const dayIndex = new Date().getDate() % signReadings.length;
    setReading(signReadings[dayIndex]);
    setLuckyNumber(Math.floor(Math.random() * 99) + 1);
    setLuckyColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [sign.name]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a12]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1a1528] to-[#12101a] rounded-2xl border border-[#c9a86c]/20 overflow-hidden"
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a86c]/50 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#5a5468] hover:text-[#c9a86c] transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="pt-8 pb-4 px-6 text-center border-b border-[#c9a86c]/10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#c9a86c]/60">✧</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#5a5468]">Daily Oracle</span>
            <span className="text-[#c9a86c]/60">✧</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl text-[#c9a86c] drop-shadow-[0_0_15px_rgba(201,168,108,0.4)]">
              {sign.symbol}
            </span>
            <div className="text-left">
              <h3 className="font-serif text-2xl text-[#f5f0e6]">{sign.name}</h3>
              <p className="text-xs text-[#5a5468]">{today}</p>
            </div>
          </div>
        </div>

        {/* Reading Content */}
        <div className="p-6 md:p-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#f5f0e6] text-base md:text-lg leading-relaxed text-center font-light italic"
          >
            "{reading}"
          </motion.p>

          {/* Lucky indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center gap-8"
          >
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#c9a86c]/10 flex items-center justify-center mb-2 mx-auto border border-[#c9a86c]/30">
                <span className="text-[#c9a86c] font-serif text-lg">{luckyNumber}</span>
              </div>
              <p className="text-[9px] uppercase tracking-wider text-[#5a5468]">Lucky Number</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#c9a86c]/10 flex items-center justify-center mb-2 mx-auto border border-[#c9a86c]/30">
                <span className="text-[#c9a86c] text-lg">◆</span>
              </div>
              <p className="text-[9px] uppercase tracking-wider text-[#5a5468]">{luckyColor}</p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full border border-[#c9a86c]/30 text-[#c9a86c] text-sm uppercase tracking-wider hover:bg-[#c9a86c]/10 transition-colors"
          >
            Close Reading
          </button>
        </div>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a86c]/30 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
