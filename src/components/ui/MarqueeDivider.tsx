export function MarqueeDivider() {
  const words = [
    "INNOVATE", "✦", "DESIGN", "✦", "BUILD", "✦", "SCALE", "✦", 
    "AUTOMATE", "✦", "OPTIMIZE", "✦", "TRANSFORM", "✦"
  ];

  return (
    <div className="w-full overflow-hidden bg-[var(--color-primary)] py-4 select-none flex border-y border-[var(--color-border)]">
      <div className="flex w-max animate-scroll-left whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {words.map((word, index) => (
              <span 
                key={index} 
                className={`mx-4 font-black tracking-widest text-sm md:text-base ${
                  word === "✦" ? "text-[var(--color-accent)] opacity-80" : "text-[var(--color-background)]"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
