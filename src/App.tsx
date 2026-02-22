import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ZodiacWheel from './components/ZodiacWheel';
import SignDetails from './components/SignDetails';
import DailyReading from './components/DailyReading';
import StarField from './components/StarField';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire', ruling: 'Mars' },
  { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth', ruling: 'Venus' },
  { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air', ruling: 'Mercury' },
  { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water', ruling: 'Moon' },
  { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire', ruling: 'Sun' },
  { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth', ruling: 'Mercury' },
  { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air', ruling: 'Venus' },
  { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water', ruling: 'Pluto' },
  { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire', ruling: 'Jupiter' },
  { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth', ruling: 'Saturn' },
  { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air', ruling: 'Uranus' },
  { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water', ruling: 'Neptune' },
];

function App() {
  const [selectedSign, setSelectedSign] = useState<number | null>(null);
  const [showReading, setShowReading] = useState(false);
  const [moonPhase, setMoonPhase] = useState('Waxing Gibbous');

  useEffect(() => {
    const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    const dayOfMonth = new Date().getDate();
    setMoonPhase(phases[dayOfMonth % 8]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a12] text-[#f5f0e6] overflow-x-hidden relative">
      <StarField />

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#1a1528]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a0a12] to-transparent" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#3d2c5e]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#1e3a5f]/20 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 md:pt-12 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[#c9a86c] text-xl md:text-2xl">✧</span>
            <span className="text-[#c9a86c]/60 text-xs tracking-[0.4em] uppercase font-light">Celestial Guidance</span>
            <span className="text-[#c9a86c] text-xl md:text-2xl">✧</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#f5f0e6]">
            <span className="text-[#c9a86c]">A</span>stral <span className="text-[#c9a86c]">O</span>racle
          </h1>
          <p className="mt-4 text-[#8a8598] font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Unlock the secrets written in the stars. Your cosmic journey awaits.
          </p>
        </motion.div>

        {/* Moon Phase Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute top-8 right-4 md:right-8 flex items-center gap-2 text-xs text-[#8a8598]"
        >
          <span className="text-[#c9a86c] text-lg">☽</span>
          <span className="hidden sm:inline">{moonPhase}</span>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-8 pb-20 md:pb-24">
        {/* Zodiac Wheel Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-8 md:mt-12"
        >
          <ZodiacWheel
            signs={zodiacSigns}
            selectedSign={selectedSign}
            onSelectSign={setSelectedSign}
          />
        </motion.section>

        {/* Sign Details */}
        <AnimatePresence mode="wait">
          {selectedSign !== null && (
            <SignDetails
              sign={zodiacSigns[selectedSign]}
              onGetReading={() => setShowReading(true)}
            />
          )}
        </AnimatePresence>

        {/* Daily Reading Modal */}
        <AnimatePresence>
          {showReading && selectedSign !== null && (
            <DailyReading
              sign={zodiacSigns[selectedSign]}
              onClose={() => setShowReading(false)}
            />
          )}
        </AnimatePresence>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 text-[#c9a86c] text-6xl md:text-8xl font-serif pointer-events-none select-none"
        >
          ⊛
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-6 px-4 text-center">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a86c]/30 to-transparent mx-auto mb-4" />
        <p className="text-[#5a5468] text-xs font-light tracking-wide">
          Requested by @jianke2 · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}

export default App;
