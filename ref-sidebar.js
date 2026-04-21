document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(document.querySelectorAll("main .source-link[data-ref]"));
  if (!links.length) return;

  const seen = new Map();
  for (const link of links) {
    const ref = link.dataset.ref;
    if (!seen.has(ref)) {
      seen.set(ref, link.getAttribute("href"));
    }
  }

  const margin = document.querySelector("#quarto-margin-sidebar");
  if (!margin) return;

  const box = document.createElement("aside");
  box.className = "source-sidebar";
  const items = Array.from(seen.entries())
    .map(([ref, href]) => `<li><a href="${href}">010_taiyang_3.md ${ref}</a></li>`)
    .join("");
  box.innerHTML = `<h2>原文參照</h2><ul>${items}</ul>`;
  margin.appendChild(box);
});
