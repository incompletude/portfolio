class ProjectFactory {
  constructor() {
    return new Promise(async (resolve, reject) => {
      this.projects = await this.asyncGetAll()
      resolve(this)
    })
  }

  getAllSlugs() {
    return [
      "remessa-online",
      "jeunesse",
      "nestle-nesfit",
      "microsoft",
      "chevrolet",
      "mastercard",
      "wmccann",
      "tim",
      "deca",
      "nestle-institutional",
      "barretos-cancer-hospital",
      "the-salvation-army"
    ]
  }

  async asyncImport(slug) {
    const md = await import(`~/contents/projects/${slug}.md`)
    return md
  }

  async asyncGetAll() {
    const projects = await Promise.all(
      this.getAllSlugs().map(slug => this.asyncImport(slug))
    ).then(response => {
      return response
    })

    return projects
  }

  findByFeatured() {
    return this.projects.find(p => p.attributes.featured === true)
  }

  getByPartners() {
    return this.projects.slice(0, 12)
  }

  getByRecent() {
    return this.projects.slice(0, 4)
  }

  getDistinctCategories() {
    return Object.entries(Object.assign({}, ...this.projects.map(p => p.attributes.categories)))
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => (a.slug > b.slug) ? 1 : -1)
  }

  getDistinctTags() {
    return Object.entries(Object.assign({}, ...this.projects.map(p => p.attributes.tags)))
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => (a.slug > b.slug) ? 1 : -1)
  }

  getDistinctYears() {
    return this.projects.map(p => p.attributes.year).filter((e, i, arr) => arr.indexOf(e) === i)
  }

  getPage(featured, category, tag, year, page) {
    if (isNaN(page) || isNaN(year)) return false

    let projects = null

    if (featured) projects = this.projects.filter(p => p.attributes.featured === true)
    else if (category) projects = this.projects.filter(p => p.attributes.categories.hasOwnProperty(category))
    else if (tag) projects = this.projects.filter(p => p.attributes.tags.hasOwnProperty(tag))
    else if (year) projects = this.projects.filter(p => p.attributes.year === year)
    else projects = this.projects

    if (projects.length === 0) return false

    const projectsCount = this.projects.length
    const pageCount = Math.ceil(projects.length / 8)

    projects = projects.slice((page - 1) * 8, page * 8)

    return { projects: projects, currentPage: page, pageCount: pageCount, projectsCount: projectsCount }
  }

  find(slug) {
    return this.projects.find(p => p.attributes.slug === slug)
  }

  findPrevious(slug) {
    return this.projects[this.projects.findIndex(p => p.attributes.slug === slug) - 1]
  }

  findNext(slug) {
    return this.projects[this.projects.findIndex(p => p.attributes.slug === slug) + 1]
  }
}

export default ProjectFactory
