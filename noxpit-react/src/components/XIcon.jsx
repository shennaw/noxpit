export function XIcon({ className = 'x-icon', stroke = 'var(--accent)', strokeWidth = 20 }) {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
      <line x1="5" y1="5" x2="95" y2="95" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="95" y1="5" x2="5" y2="95" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function CatXIcon() {
  return (
    <svg className="cat-x-icon" viewBox="0 0 100 100">
      <line x1="20" y1="20" x2="80" y2="80" stroke="white" strokeWidth="12" strokeLinecap="round" />
      <line x1="80" y1="20" x2="20" y2="80" stroke="white" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}
