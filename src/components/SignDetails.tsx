import { motion } from 'framer-motion';

interface Sign {
  name: string;
  symbol: string;
  dates: string;
  element: string;
  ruling: string;
}

interface Props {
  sign: Sign;
  onGetReading: () => void;
}

const signDescriptions: Record<string, { trait: string; strength: string; weakness: string; compatibility: string }> = {
  Aries: { trait: 'The Pioneer', strength: 'Courageous & Confident', weakness: 'Impatient', compatibility: 'Leo, Sagittarius' },
  Taurus: { trait: 'The Stabilizer', strength: 'Patient & Reliable', weakness: 'Stubborn', compatibility: 'Virgo, Capricorn' },
  Gemini: { trait: 'The Communicator', strength: 'Adaptable & Witty', weakness: 'Indecisive', compatibility: 'Libra, Aquarius' },
  Cancer: { trait: 'The Nurturer', strength: 'Intuitive & Protective', weakness: 'Moody', compatibility: 'Scorpio, Pisces' },
  Leo: { trait: 'The Performer', strength: 'Creative & Generous', weakness: 'Arrogant', compatibility: 'Aries, Sagittarius' },
  Virgo: { trait: 'The Analyst', strength: 'Practical & Meticulous', weakness: 'Overcritical', compatibility: 'Taurus, Capricorn' },
  Libra: { trait: 'The Harmonizer', strength: 'Diplomatic & Fair', weakness: 'Indecisive', compatibility: 'Gemini, Aquarius' },
  Scorpio: { trait: 'The Transformer', strength: 'Passionate & Resourceful', weakness: 'Jealous', compatibility: 'Cancer, Pisces' },
  Sagittarius: { trait: 'The Explorer', strength: 'Optimistic & Adventurous', weakness: 'Tactless', compatibility: 'Aries, Leo' },
  Capricorn: { trait: 'The Achiever', strength: 'Disciplined & Ambitious', weakness: 'Pessimistic', compatibility: 'Taurus, Virgo' },
  Aquarius: { trait: 'The Visionary', strength: 'Independent & Humanitarian', weakness: 'Detached', compatibility: 'Gemini, Libra' },
  Pisces: { trait: 'The Dreamer', strength: 'Empathetic & Artistic', weakness: 'Escapist', compatibility: 'Cancer, Scorpio' },
};

const elementColors: Record<string, string> = {
  Fire: 'from-orange-500/20 to-red-600/20',
  Earth: 'from-emerald-600/20 to-amber-700/20',
  Air: 'from-sky-400/20 to-violet-400/20',
  Water: 'from-blue-500/20 to-cyan-400/20',
};

export default function SignDetails({ sign, onGetReading }: Props) {
  const details = signDescriptions[sign.name];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-12 md:mt-16 max-w-2xl mx-auto"
    >
      {/* Sign Header */}
      <div className="text-center mb-8">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, delay: 0.2 }}
          className="inline-block text-6xl md:text-7xl text-[#c9a86c] mb-4 drop-shadow-[0_0_20px_rgba(201,168,108,0.4)]"
        >
          {sign.symbol}
        </motion.span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0e6] mb-2">{sign.name}</h2>
        <p className="text-[#c9a86c] text-sm tracking-wider">{details.trait}</p>
        <p className="text-[#5a5468] text-xs mt-1">{sign.dates}</p>
      </div>

      {/* Element & Ruling Planet */}
      <div className="flex justify-center gap-6 md:gap-12 mb-8">
        <div className="text-center">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${elementColors[sign.element]} flex items-center justify-center mb-2 mx-auto border border-[#c9a86c]/20`}>
            <span className="text-[#c9a86c] text-lg">
              {sign.element === 'Fire' && '🜂'}
              {sign.element === 'Earth' && '🜃'}
              {sign.element === 'Air' && '🜁'}
              {sign.element === 'Water' && '🜄'}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-[#5a5468]">Element</p>
          <p className="text-sm text-[#8a8598]">{sign.element}</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1a1528] flex items-center justify-center mb-2 mx-auto border border-[#c9a86c]/20">
            <span className="text-[#c9a86c] text-xl">☉</span>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-[#5a5468]">Ruler</p>
          <p className="text-sm text-[#8a8598]">{sign.ruling}</p>
        </div>
      </div>

      {/* Traits Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-[#1a1528]/60 backdrop-blur-sm rounded-lg p-5 border border-[#c9a86c]/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#c9a86c]">✦</span>
            <span className="text-[10px] uppercase tracking-wider text-[#5a5468]">Strength</span>
          </div>
          <p className="text-[#f5f0e6] text-sm">{details.strength}</p>
        </div>
        <div className="bg-[#1a1528]/60 backdrop-blur-sm rounded-lg p-5 border border-[#c9a86c]/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#8a8598]">✧</span>
            <span className="text-[10px] uppercase tracking-wider text-[#5a5468]">Challenge</span>
          </div>
          <p className="text-[#f5f0e6] text-sm">{details.weakness}</p>
        </div>
        <div className="bg-[#1a1528]/60 backdrop-blur-sm rounded-lg p-5 border border-[#c9a86c]/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#c9a86c]">♡</span>
            <span className="text-[10px] uppercase tracking-wider text-[#5a5468]">Compatibility</span>
          </div>
          <p className="text-[#f5f0e6] text-sm">{details.compatibility}</p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <button
          onClick={onGetReading}
          className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a86c] to-[#a88b4a] text-[#0a0a12] font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,108,0.4)] active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2 justify-center">
            <span>Reveal Today's Reading</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </button>
      </motion.div>
    </motion.section>
  );
}
