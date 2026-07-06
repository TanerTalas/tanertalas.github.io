// Stack section data. All icons are local SVGs, each category in its own
// subfolder under /img/toolicons (frontend / backend / everyday / other).
const fe = (name) => `/img/toolicons/frontend/${name}.svg`;
const be = (name) => `/img/toolicons/backend/${name}.svg`;
const everyday = (name) => `/img/toolicons/everyday/${name}.svg`;
const other = (name) => `/img/toolicons/other/${name}.svg`;

export const frontendSkills = [
  { name: "HTML", icon: fe("html") },
  { name: "CSS", icon: fe("css") },
  { name: "JavaScript", icon: fe("javascript") },
  { name: "React", icon: fe("react") },
  { name: "Tailwind", icon: fe("tailwindcss") },
  { name: "Bootstrap", icon: fe("bootstrap") },
  { name: "jQuery", icon: fe("jquery") },
];

export const backendSkills = [
  { name: "Node.js", icon: be("node") },
  { name: "Express", icon: be("expressjs") },
  { name: "MongoDB", icon: be("mongodb") },
  { name: "MySQL", icon: be("mysql") },
  { name: "PostgreSQL", icon: be("postgresql") },
];

// Everyday tools: the pill row.
export const toolSkills = [
  { name: "Git", icon: everyday("git") },
  { name: "GitHub", icon: everyday("github") },
  { name: "VS Code", icon: everyday("vscode") },
  { name: "Figma", icon: everyday("figma") },
  { name: "Postman", icon: everyday("postman") },
  { name: "Vite", icon: everyday("vite") },
  { name: "Claude Code", icon: everyday("claudecode") },
];

// Other: languages / platforms outside the core web stack.
export const otherSkills = [
  { name: "Java", icon: other("java") },
  { name: "Python", icon: other("python") },
  { name: "WordPress", icon: other("wordpress") },
  { name: "JSON", icon: other("json") },
];
