class ProjectFactory {
  constructor() {
    return new Promise(async (resolve, reject) => {
      this.projects = await this.asyncGetAll();
      resolve(this);
    });
  }

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
  }

  async asyncImport(slug) {
    const md = await import(`~/contents/projects/${slug}.md`);
    return md;
  }

  async asyncGetAll() {
    const projects = await Promise.all(
      this.getAllSlugs().map(slug => this.asyncImport(slug))
    ).then(response => {
      return response;
    });

    return projects;
  }

  findFeatured() {
    return this.projects.find(p => p.attributes.featured === true);
  }

  getByDistinctPartners() {
    return this.projects.filter((e, i, arr) => {
      return arr.map(p => p.attributes.partner).indexOf(e.attributes.partner) === i;
    });
  }

  getRecent() {
    return this.projects.slice(0, 4);
  }

  getDistinctCategories() {
    return Object.entries(Object.assign({}, ...this.projects.map(p => p.attributes.categories)))
      .map(([key, value]) => ({ key, value })).sort((a, b) => (a.key > b.key) ? 1 : -1);
  }

  getDistinctTags() {
    return Object.entries(Object.assign({}, ...this.projects.map(p => p.attributes.tags)))
      .map(([key, value]) => ({ key, value })).sort((a, b) => (a.key > b.key) ? 1 : -1);
  }

  getDistinctYears() {
    return this.projects.map(p => p.attributes.year).filter((e, i, arr) => {
      return arr.indexOf(e) === i;
    });
  }

  getPage(featured, category, tag, year, page) {
    if (isNaN(page) || isNaN(year)) return false;

    let projects = null;

    if (featured) projects = this.projects.filter(p => p.attributes.featured === true);
    else if (category) projects = this.projects.filter(p => p.attributes.categories.hasOwnProperty(category));
    else if (tag) projects = this.projects.filter(p => p.attributes.tags.hasOwnProperty(tag));
    else if (year) projects = this.projects.filter(p => p.attributes.year === year);
    else projects = this.projects;

    if (projects.length === 0) return false;

    const projectsCount = this.projects.length;
    const pageCount = Math.ceil(projects.length / 10);

    projects = projects.slice((page - 1) * 10, page * 10);

    return { projects: projects, currentPage: page, pageCount: pageCount, projectsCount: projectsCount }
  }

  find(slug) {
    return this.projects.find(p => p.attributes.slug === slug);
  }
}

export default ProjectFactory;
