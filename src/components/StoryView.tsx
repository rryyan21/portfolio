import { experienceTiles } from "@/data/story";
import ChapterHeading from "@/components/ChapterHeading";
import Reveal from "@/components/Reveal";
export default function StoryView() {
  return (
    <>
      <section id="experience" className="chapter section-anchor">
        <Reveal>
          <ChapterHeading
            number="02"
            title="A few stops along the way."
            note="The projects changed. So did the way I build."
          />
          <ol className="timeline">
            {experienceTiles.map((tile) => (
              <li key={tile.id}>
                <div className="timeline-date mono">{tile.era}</div>
                <div className="timeline-content">
                  <p className="eyebrow">{tile.label}</p>
                  <h3>{tile.title}</h3>
                  <p>{tile.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
    </>
  );
}
