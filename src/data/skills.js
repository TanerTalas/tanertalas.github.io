// Stack section data. Icons are local SVGs under /img/toolicons, except a few
// pulled from the devicon CDN where a local asset doesn't exist.
const devicon = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export const frontendSkills = [
  { name: "HTML", icon: "/img/toolicons/htmlicon.svg" },
  { name: "CSS", icon: "/img/toolicons/cssicon.svg" },
  { name: "JavaScript", icon: "/img/toolicons/javascripticon.svg" },
  { name: "React", icon: devicon("react") },
  { name: "Tailwind", icon: "/img/toolicons/tailwindicon.svg" },
  { name: "Bootstrap", icon: "/img/toolicons/bootstrapicon.svg" },
];

export const backendSkills = [
  { name: "Node.js", icon: devicon("nodejs")},
  { name: "Express", icon: devicon("express"), learning: true },
  { name: "MongoDB", icon: "/img/toolicons/mongodbicon.svg", learning: true },
];

export const toolSkills = [
  { name: "Git", icon: "/img/toolicons/giticon.svg" },
  { name: "GitHub", icon: devicon("github") },
  { name: "Figma", icon: "/img/toolicons/figmaicon.svg" },
];
