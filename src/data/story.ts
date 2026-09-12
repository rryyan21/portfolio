export type Experience = {
  id: string;
  title: string;
  era: string;
  label: string;
  body: string;
};
export const experienceTiles: Experience[] = [
  {
    id: "visa",
    title: "Building for the people on call",
    era: "Summer 2026",
    label: "Visa / Software engineering internship",
    body: "At Visa, I worked on tools that help engineers make sense of failures and get systems running again. That meant cutting out repeat alerts, helping investigate problems, and taking the repetition out of setting up servers.",
  },
  {
    id: "marc",
    title: "Helping start a team",
    era: "2025 to now",
    label: "MARC / Michigan robotics",
    body: "Co-founding a robotics team meant finding people to build with as well as figuring out what to build. At MARC, I’ve helped bring together our first group of engineers, and I’m working on the software that connects our robots’ motors and computers.",
  },
  {
    id: "formula-sae",
    title: "Taking code out onto the track",
    era: "2024 to 2026",
    label: "Formula SAE / University of Michigan",
    body: "With Michigan’s racing team, I worked on helping an autonomous car spot obstacles. We tested changes against data from the vehicle, then brought them back into the car’s software. It was a chance to see code meet a much less predictable world.",
  },
  {
    id: "waterloo",
    title: "Making room to experiment",
    era: "Summer 2025",
    label: "Waterloo Alternative Fuels Team",
    body: "At Waterloo, I built simulations to compare ways of keeping a car centered in its lane. I also worked on making those experiments easier for teammates to repeat and compare, so a promising result could become something we could build on.",
  },
];
