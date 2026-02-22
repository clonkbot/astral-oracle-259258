import { motion } from 'framer-motion';

interface Sign {
  name: string;
  symbol: string;
  dates: string;
  element: string;
  ruling: string;
}

interface Props {
  signs: Sign[];
  selectedSign: number | null;
  onSelectSign: (index: number) => void;
}

export default function ZodiacWheel({ signs, selectedSign, onSelectSign }: Props) {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Desktop Wheel View */}
      <div className="hidden md:block relative aspect-square max-w-2xl mx-auto">
        {/* Outer ring decoration */}
        <div className="absolute inset-0 rounded-full border border-[#c9a86c]/20" />
        <div className="absolute inset-4 rounded-full border border-[#c9a86c]/10" />
        <div className="absolute inset-8 rounded-full border border-[#c9a86c]/5" />

        {/* Center ornament */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            className="text-[#c9a86c]/20 text-8xl"
          >
            ✦
          </motion.div>
        </div>

        {/* Zodiac signs arranged in a circle */}
        {signs.map((sign, index) => {
          const angle = (index * 30 - 90) * (Math.PI / 180);
          const radius = 42;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);

          return (
            <motion.button
              key={sign.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.08, type: 'spring', damping: 15 }}
              onClick={() => onSelectSign(index)}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`group flex flex-col items-center gap-1 p-3 rounded-full transition-all duration-500 ${
                selectedSign === index
                  ? 'bg-[#c9a86c]/20 scale-110'
                  : 'hover:bg-[#c9a86c]/10'
              }`}
            >
              <span
                className={`text-3xl transition-all duration-300 ${
                  selectedSign === index
                    ? 'text-[#c9a86c] drop-shadow-[0_0_10px_rgba(201,168,108,0.5)]'
                    : 'text-[#8a8598] group-hover:text-[#c9a86c]'
                }`}
              >
                {sign.symbol}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider transition-colors duration-300 ${
                  selectedSign === index ? 'text-[#c9a86c]' : 'text-[#5a5468] group-hover:text-[#8a8598]'
                }`}
              >
                {sign.name}
              </span>
            </motion.button>
          );
        })}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {signs.map((_, index) => {
            const angle1 = (index * 30 - 90) * (Math.PI / 180);
            const angle2 = ((index + 1) * 30 - 90) * (Math.PI / 180);
            const radius = 42;
            const x1 = 50 + radius * Math.cos(angle1);
            const y1 = 50 + radius * Math.sin(angle1);
            const x2 = 50 + radius * Math.cos(angle2);
            const y2 = 50 + radius * Math.sin(angle2);

            return (
              <motion.line
                key={index}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ delay: 1.5 + index * 0.05, duration: 0.5 }}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#c9a86c"
                strokeWidth="0.1"
              />
            );
          })}
        </svg>
      </div>

      {/* Mobile Grid View */}
      <div className="md:hidden">
        <div className="text-center mb-6">
          <span className="text-[#c9a86c]/60 text-xs tracking-[0.3em] uppercase">Select Your Sign</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {signs.map((sign, index) => (
            <motion.button
              key={sign.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => onSelectSign(index)}
              className={`relative p-4 rounded-lg border transition-all duration-300 ${
                selectedSign === index
                  ? 'bg-[#c9a86c]/10 border-[#c9a86c]/50'
                  : 'bg-[#1a1528]/50 border-[#c9a86c]/10 active:bg-[#c9a86c]/5'
              }`}
            >
              <span
                className={`block text-2xl mb-1 transition-all duration-300 ${
                  selectedSign === index
                    ? 'text-[#c9a86c] drop-shadow-[0_0_8px_rgba(201,168,108,0.5)]'
                    : 'text-[#8a8598]'
                }`}
              >
                {sign.symbol}
              </span>
              <span
                className={`block text-[10px] uppercase tracking-wider ${
                  selectedSign === index ? 'text-[#c9a86c]' : 'text-[#5a5468]'
                }`}
              >
                {sign.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Instruction text */}
      {selectedSign === null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-8 text-[#5a5468] text-sm font-light"
        >
          Touch a sign to reveal its secrets
        </motion.p>
      )}
    </div>
  );
}
