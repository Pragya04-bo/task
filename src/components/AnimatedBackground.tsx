import { motion } from "framer-motion";

export function AnimatedBackground() {
  // Generate rows of SVG hexagon grid elements (matching Qoruz's DOM structure)
  const renderHexagonRow = (rowIdx: number, yOffset: number) => {
    const isEven = rowIdx % 2 === 0;
    const xShift = isEven ? -50 : 20;

    return (
      <motion.g
        key={`row-${rowIdx}`}
        id={`Row-${rowIdx}`}
        animate={{
          x: isEven ? [0, 70, -20, 0] : [0, -70, 20, 0],
        }}
        transition={{
          duration: 4 + (rowIdx % 3) * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {Array.from({ length: 20 }).map((_, colIdx) => {
          const cx = colIdx * 120 + xShift;
          const cy = yOffset;
          return (
            <polygon
              key={`hex-${rowIdx}-${colIdx}`}
              points={`${cx},${cy - 35} ${cx + 30},${cy - 18} ${cx + 30},${cy + 18} ${cx},${cy + 35} ${cx - 30},${cy + 18} ${cx - 30},${cy - 18}`}
              className="fill-none stroke-gray-300 dark:stroke-indigo-500/40 stroke-[1.8] transition-colors"
            />
          );
        })}
      </motion.g>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Qoruz-Style Animated SVG Hexagon Grid (Drifting Rows) */}
      <svg
        className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_85%_75%_at_50%_20%,#000_80%,transparent_100%)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Pattern">
          {Array.from({ length: 14 }).map((_, idx) =>
            renderHexagonRow(idx + 1, idx * 54)
          )}
        </g>
      </svg>

      {/* Floating Animated Ambient Glow Orbs */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[10%] w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/30 via-purple-500/25 to-pink-500/20 rounded-full blur-3xl dark:from-indigo-600/30 dark:via-purple-600/25"
      />

      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/25 via-blue-500/20 to-indigo-500/20 rounded-full blur-3xl dark:from-cyan-600/25 dark:via-blue-600/20"
      />
    </div>
  );
}
