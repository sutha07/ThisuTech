/**
 * ThiSu Tech SVG Logo Component
 * Matches the brand: Navy Blue T + Blue S + Orange orbit + code tag
 */
export default function ThiSuLogo({ size = 'md', dark = false }) {
  const sizes = {
    sm: { w: 28, h: 28, text1: 14, text2: 11, gap: 'gap-1.5' },
    md: { w: 36, h: 36, text1: 17, text2: 13, gap: 'gap-2' },
    lg: { w: 52, h: 52, text1: 24, text2: 16, gap: 'gap-3' },
  }
  const s = sizes[size] || sizes.md

  return (
    <div className={`flex items-center ${s.gap}`}>
      {/* Icon Mark */}
      <svg width={s.w} height={s.h} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="52" height="52" rx="10" fill="#0B2C5F"/>

        {/* Pixel dots top-left (brand detail) */}
        <rect x="6" y="5" width="3" height="3" rx="0.5" fill="#FF7A00" opacity="0.8"/>
        <rect x="10" y="5" width="3" height="3" rx="0.5" fill="#3B82F6" opacity="0.6"/>
        <rect x="6" y="9" width="3" height="3" rx="0.5" fill="#3B82F6" opacity="0.4"/>

        {/* T - horizontal bar */}
        <rect x="8" y="14" width="22" height="5" rx="1.5" fill="white"/>
        {/* T - vertical bar */}
        <rect x="16" y="14" width="6" height="24" rx="1.5" fill="white"/>

        {/* S - using path, blue gradient effect */}
        <path
          d="M30 19 Q24 19 24 24.5 Q24 29 30 29 Q36 29 36 34.5 Q36 40 30 40"
          stroke="#3B82F6"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Orange orbit swoosh */}
        <path
          d="M16 44 Q28 48 40 41"
          stroke="#FF7A00"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Orbit dot */}
        <circle cx="40" cy="41" r="2.5" fill="#FF7A00"/>

        {/* Code tag </> inside S */}
        <text x="28" y="31" fontSize="6" fill="#FF7A00" fontFamily="monospace" textAnchor="middle" opacity="0.9">&lt;/&gt;</text>
      </svg>

      {/* Text */}
      <div className="leading-none">
        <div
          className="font-heading font-black leading-tight"
          style={{ fontSize: s.text1 }}
        >
          <span className={dark ? 'text-white' : 'text-navy-900'}>Thi</span>
          <span className="text-blue-500">Su</span>
          <span className={dark ? 'text-white' : 'text-navy-900'}> </span>
          <span className="text-orange-500">Tech</span>
        </div>
        <div
          className="text-gray-400 tracking-widest font-medium"
          style={{ fontSize: s.text2 - 4 }}
        >
          LEARN · CODE · INNOVATE
        </div>
      </div>
    </div>
  )
}
