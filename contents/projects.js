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

  async asyncGetLastFeaturedProject() {
    const projects = await this.asyncGetAllProjects();

    return projects.find(project => project.featured === true);
  },

  async asyncGetProjectsByDistinctPartner() {
    const projects = await this.asyncGetAllProjects();

    return projects.filter((e, i, arr) => {
      return arr.map(p => p.partner).indexOf(e.partner) === i;
    });
  },

  async asyncGetRecentProjects() {
    const projects = await this.asyncGetAllProjects();

    return projects.slice(0, 4);
  },

  async asyncGetPagedProjects(featured, category, tag, year, page) {
    let projects = await this.asyncGetAllProjects();

    if (featured) {
    }
    else if (category) {
    }
    else if (tag) {
    }
    else if (year) {
    }

    const pageCount = Math.ceil(projects.length / 10);
    projects = projects.slice((page - 1) * 10, page * 10);

    if (projects.length === 0) {
      return false;
    } else {
      return { projects: projects, currentPage: page, pageCount: pageCount }
    }
  }
}
