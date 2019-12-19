<template>
  <div>
    <footer class="footer">
      <div class="container-extra-large">
        <div class="row">
          <div class="col-12 tp:col-6 margin-top-3 margin-bottom-2">
            <div class="brand">
              <h1 class="brand-name">André Freitas</h1>
              <a class="brand-mail" href="mailto:contato@andrefreitas.dev">contato@andrefreitas.dev</a>
              <p class="brand-description">
                I’m a brazilian product owner, full stack developer & UI/UX
                designer. I can help you build and grow your next product.
              </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 tp:col-6 tl:col-2 margin-bottom-2">
            <div class="nav-wrapper">
              <h2 class="nav-name">Menu</h2>
              <ul class="nav">
                <li>
                  <nuxt-link class="nav-anchor" to="/">About</nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-anchor" to="/projects/">Projects</nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-anchor" to="/knowledge/">Knowledge</nuxt-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-12 tp:col-6 tl:col-4 margin-bottom-2">
            <div class="nav-wrapper">
              <h2 class="nav-name">Contact</h2>
              <ul class="nav">
                <li>
                  <a
                    class="nav-anchor"
                    href="mailto:contato@andrefreitas.dev"
                  >contato@andrefreitas.dev</a>
                </li>
                <li>
                  <a class="nav-anchor" href="skype:live:andrevieiradefreitas">Skype</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-12 tp:col-6 tl:col-3 margin-bottom-2">
            <div class="nav-wrapper">
              <h2 class="nav-name">Social</h2>
              <ul class="nav">
                <li>
                  <a
                    class="nav-anchor"
                    href="https://github.com/incompletude"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >Github</a>
                </li>
                <li>
                  <a
                    class="nav-anchor"
                    href="https://www.linkedin.com/in/incompletude/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 margin-bottom-1">
            <p class="copyright">Copyright André Freitas 2018–2019 ©</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
// footer

.footer {
  .background-gray-85;
}

// brand

.brand-name {
  .maison-neue-300-24\/32;
  .color-gray-21;
}

.brand-mail {
  .inline-block;
  .padding-bottom-1;
  .maison-neue-300-20\/32;
  .color-green-42;
  .no-underline;

  &:hover {
    .underline;
  }
}

.brand-description {
  .maison-neue-300-20\/32;
  .color-gray-64;
}

// nav

.nav-name {
  .padding-bottom-1\/2;
  .maison-neue-300-22\/32;
  .color-gray-21;
}

.nav-anchor {
  .maison-neue-300-20\/32;
  .color-gray-64;
  .no-underline;

  &:hover {
    .underline;
  }
}

// copyright

.copyright {
  .maison-neue-300-20\/32;
  .color-gray-64;
}
</style>
