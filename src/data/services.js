// Icons live in /img/serviceicons, named by concept (fullstack / frontend / backend / design).
const icon = (name) => `/img/serviceicons/${name}.svg`;

// Services section cards. The first card is "featured" with an accent top border.
export const services = [
  {
    title: "Fullstack Development",
    icon: icon("fullstack"),
    featured: true,
    description:
      "Complete web applications end to end: responsive interfaces on the front, REST APIs and databases on the back. One project, one developer, everything connected.",
    tags: ["React", "Node.js", "Express", "MySQL","PostgreSQL"],
  },
  {
    title: "Frontend Development",
    icon: icon("frontend"),
    description:
      "Intuitive projects with clear UI and smooth UX, built with organized, clean, easy-to-understand code and careful attention to detail.",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Bootstrap", "jQuery"],
  },
  {
    title: "Backend Development",
    icon: icon("backend"),
    description:
      "Reliable server-side logic: REST APIs, databases and authentication built to be secure, scalable and easy to maintain behind the scenes.",
    tags: ["Node.js", "Express", "MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    title: "WordPress Development",
    icon: icon("wordpress"),
    description:
      "Custom WordPress sites tailored to your needs: themes, page builders and plugins configured for a fast, maintainable site you can update yourself.",
    tags: ["WordPress", "PHP", "Custom Themes", "CSS"],
  },
  {
    title: "UI / UX Design",
    icon: icon("design"),
    description:
      "Interfaces that prioritize user experience: usability, accessibility and visual clarity, following real design principles rather than just decorating.",
    tags: ["Figma", "Tailwind", "Bootstrap"],
  },
];
