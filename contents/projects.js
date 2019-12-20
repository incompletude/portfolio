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

  async asyncGetAll() {
    const projects = await Promise.all(
      this.getAllSlugs().map(slug => this.asyncImportProject(slug))
    ).then(response => {
      return response;
    });

    return projects;
  },

  async asyncFindLastFeatured() {
    const projects = await this.asyncGetAll();

    return projects.find(p => p.featured === true);
  },

  async asyncGetByDistinctPartner() {
    const projects = await this.asyncGetAll();

    return projects.filter((e, i, arr) => {
      return arr.map(p => p.partner).indexOf(e.partner) === i;
    });
  },

  async asyncGetRecent() {
    const projects = await this.asyncGetAll();

    return projects.slice(0, 4);
  },

  async asyncGetPage(featured, category, tag, year, page) {
    let projects = await this.asyncGetAll();

    console.log(projects)

    if (featured) {
      projects = projects.filter(p => p.featured === true)
    }
    else if (category) {
      projects = projects.filter(p => {
        return p.categories && p.categories.includes(category);
      })
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
