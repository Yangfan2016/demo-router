class HashRouter {
  constructor() {
    this.router = {};
    this.historys = [];
    this.index = this.historys.length - 1;
    this.isBackOrGo = false;

    this.init();
  }
  init() {
    window.addEventListener("hashchange", () => {
      this.refresh();
    });
  }
  route(path, cb = () => {}) {
    this.router[path] = cb;
  }
  refresh() {
    let hash = window.location.hash.slice(1) || "/";
    this.change(hash);
    if (this.isBackOrGo) return;

    this.historys.push(hash);
    this.index++;
    this.isBackOrGo = false;
  }
  change(url) {
    this.router[url]();
  }
  back() {
    this.isBackOrGo = true;

    this.index--;

    if (this.index < 0) {
      this.index = 0;
      return;
    }

    let curUrl = this.historys[this.index];
    window.location.hash = curUrl;
  }
  forward() {
    this.isBackOrGo = true;
    const len = this.historys.length - 1;
    this.index++;

    if (this.index > len) {
      this.index = len;
      return;
    }

    let curUrl = this.historys[this.index];
    window.location.hash = curUrl;
  }
}

class HistoryRouter {
  constructor() {
    this.router = {};

    this.init();
  }
  init() {
    window.addEventListener("popstate", ({ state }) => {
      let { path } = state || {};
      path = path || "/";
      this.router[path] && this.router[path]();
    });
  }
  route(path, cb = () => {}) {
    this.router[path] = cb;
  }
  push(path) {
    window.history.pushState({ path }, null, path);
    this.router[path] && this.router[path]();
  }
  go(n) {
    window.history.go(n);
  }
  back() {
    window.history.back();
  }
  forward() {
    window.history.forward();
  }
}

export { HashRouter, HistoryRouter };
