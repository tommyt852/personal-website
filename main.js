import { content } from "./content.js";

function text(el, value) {
  if (el && value != null) el.textContent = value;
}

function bindText() {
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (key === "year") {
      text(el, String(new Date().getFullYear()));
      return;
    }
    if (key in content) text(el, content[key]);
  });

  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const key = el.getAttribute("data-bind-href");
    if (key in content) el.setAttribute("href", content[key]);
  });
}

function renderHighlights() {
  const root = document.getElementById("highlights");
  if (!root) return;
  root.replaceChildren(
    ...content.highlights.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );
}

function renderProjects() {
  const root = document.getElementById("projects");
  if (!root) return;
  root.replaceChildren(
    ...content.projects.map((project) => {
      const article = document.createElement("article");
      article.className = "project-card";

      const media = document.createElement("div");
      media.className = "project-media";
      media.setAttribute("aria-hidden", "true");

      const body = document.createElement("div");
      body.className = "project-body";

      const title = document.createElement("h3");
      const link = document.createElement("a");
      link.href = project.href || "#";
      link.textContent = project.title;
      link.rel = "noopener noreferrer";
      if ((project.href || "").startsWith("http")) link.target = "_blank";
      title.appendChild(link);

      const blurb = document.createElement("p");
      blurb.textContent = project.blurb;

      const links = document.createElement("p");
      links.className = "project-links";
      const repo = document.createElement("a");
      repo.href = project.href || "#";
      repo.textContent = "Repo";
      repo.rel = "noopener noreferrer";
      if ((project.href || "").startsWith("http")) repo.target = "_blank";
      links.appendChild(repo);

      if (project.live) {
        const sep = document.createElement("span");
        sep.className = "project-links-sep";
        sep.textContent = "·";
        sep.setAttribute("aria-hidden", "true");
        const live = document.createElement("a");
        live.href = project.live;
        live.textContent = "Live";
        live.rel = "noopener noreferrer";
        live.target = "_blank";
        links.append(sep, live);
      }

      const tags = document.createElement("ul");
      tags.className = "tag-list";
      for (const tag of project.tags || []) {
        const li = document.createElement("li");
        li.textContent = tag;
        tags.appendChild(li);
      }

      body.append(title, blurb, links, tags);
      article.append(media, body);
      return article;
    }),
  );
}

function renderSocials() {
  const root = document.getElementById("socials");
  if (!root) return;
  root.replaceChildren(
    ...content.socials.map((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      a.rel = "noopener noreferrer";
      if (item.href.startsWith("http")) a.target = "_blank";
      li.appendChild(a);
      return li;
    }),
  );
}

function setTitle() {
  document.title = `${content.name} — Portfolio`;
}

bindText();
renderHighlights();
renderProjects();
renderSocials();
setTitle();
