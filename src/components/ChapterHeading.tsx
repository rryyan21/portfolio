export default function ChapterHeading({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="chapter-heading">
      <p className="eyebrow">CHAPTER {number}</p>
      <div className="chapter-title-row">
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
    </div>
  );
}
