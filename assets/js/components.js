class ProjectCard extends HTMLElement {
  connectedCallback() {
    const image = this.getAttribute('image');
    const titleKey = this.getAttribute('title-key');
    const descKey = this.getAttribute('desc-key');
    const github = this.getAttribute('github');
    const live = this.getAttribute('live');

    this.classList.add('fade-up');

    this.innerHTML = `
      <div class="project">
        <img src="${image}" alt="" />
        <h4 data-i18n="${titleKey}"></h4>
        <p data-i18n="${descKey}"></p>
        <a href="${github}" class="projectGithubLink" target="_blank" rel="noopener noreferrer">
          <img src="./assets/img/icons/githubcontact.svg" alt="Github Icon" />
          <span class="codeFont" data-i18n="projects.projects.codeAndInfo">Code &amp; More Info &gt;</span>
        </a>
        <div class="projectWebsiteLink-wrapper">
          <a href="${live}" class="projectWebsiteLink codeFont" target="_blank" rel="noopener noreferrer" data-i18n="projects.projects.liveWebsite">Live Website</a>
        </div>
      </div>
    `;
  }
}

class ServiceCard extends HTMLElement {
  connectedCallback() {
    const icon = this.getAttribute('icon');
    const titleKey = this.getAttribute('title-key');
    const descKey = this.getAttribute('desc-key');
    const tools = this.getAttribute('tools').split(',');

    const toolsHTML = tools.map(tool => `
      <div>
        <img src="./assets/img/toolicons/${tool}icon.svg" alt="${tool}" />
        <span>${tool.charAt(0).toUpperCase() + tool.slice(1)}</span>
      </div>
    `).join('');

    this.classList.add('fade-up');

    this.innerHTML = `
      <div class="service">
        <h4>
          <img src="${icon}" alt="" />
          <span data-i18n="${titleKey}"></span>
        </h4>
        <p data-i18n="${descKey}"></p>
        <h5 data-i18n="service.h5"></h5>
        <div class="serviceTools">
          ${toolsHTML}
        </div>
      </div>
    `;
  }
}

class TechList extends HTMLElement {
  connectedCallback() {
    const tools = this.getAttribute('tools').split(',');

    const toolsHTML = tools.map(tool => `
      <div class="fade-up">
        <div class="tool">
          <img src="./assets/img/toolicons/${tool}icon.svg" alt="${tool}" />
          <span>${tool.charAt(0).toUpperCase() + tool.slice(1)}</span>
        </div>
      </div>
    `).join('');

    this.innerHTML = toolsHTML;
    this.id = 'technologies';
    this.style.marginTop = '16px';
  }
}

customElements.define('tech-list', TechList);
customElements.define('service-card', ServiceCard);
customElements.define('project-card', ProjectCard);