export default {
  getAllSlugs() {
    return [
      'remessa-online',
      'jeunesse',
      'nestle-nesfit',
      'microsoft',
      'chevrolet',
      'mastercard',
      'wmccann',
      'tim',
      'deca',
      'nestle-institutional',
      'barretos-cancer-hospital',
      'the-salvation-army'
    ]
  },

  async asyncImportProject(slug) {
    const md = await import(`~/contents/projects/${slug}.md`);
    return md.attributes;
  },

  async asyncGetAllProjects() {
    const projects = await Promise.all(
      this.getAllSlugs().map(slug => this.asyncImportProject(slug))
    ).then(response => {
      return response;
    });

    return projects;
  },

  async getLastFeaturedProject() {
    const projects = await this.asyncGetAllProjects();

    return projects.find(project => project.featured === true);
  },

  async getProjectsByDistinctPartner() {
    const projects = await this.asyncGetAllProjects();

    return projects.filter((e, i, arr) => {
      return arr.map(p => p.partner).indexOf(e.partner) === i;
    });
  },

  async getRecentProjects() {
    const projects = await this.asyncGetAllProjects();

    return projects.slice(0, 4);
  }
}
