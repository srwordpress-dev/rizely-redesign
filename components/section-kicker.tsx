/*
  The editorial section label: "01 — How it works". The number is set in serif
  italic, the label in small uppercase (.kicker in globals.css).
*/
export default function SectionKicker({
  no,
  children,
  className = "",
}: {
  no: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`kicker ${className}`}>
      <span className="kicker-no">{no}</span>
      <span aria-hidden="true" className="kicker-rule" />
      {children}
    </span>
  );
}
