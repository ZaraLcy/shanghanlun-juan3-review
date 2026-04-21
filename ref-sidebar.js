document.addEventListener("DOMContentLoaded", () => {
  enhanceSourceTextPage();

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
    .map(([ref, href]) => `<li><a href="${href}">010_taiyang_3.md#${ref}</a></li>`)
    .join("");
  box.innerHTML = `<h2>原文參照</h2><ul>${items}</ul>`;
  margin.appendChild(box);
});

function enhanceSourceTextPage() {
  const paragraphs = Array.from(document.querySelectorAll(".source-paragraph[id]"));
  if (!paragraphs.length) return;

  let previousKind = "";

  for (const paragraph of paragraphs) {
    const heading = paragraph.querySelector("h3");
    const bodyText = Array.from(paragraph.querySelectorAll("p"))
      .map((node) => node.textContent.trim())
      .join("")
      .trim();
    const kind = classifySourceParagraph(bodyText, previousKind);
    previousKind = kind.key;

    paragraph.classList.add(`source-${kind.key}`);

    const meta = document.createElement("div");
    meta.className = "source-meta";
    meta.innerHTML = [
      `<span class="source-badge">${kind.label}</span>`,
      `<a class="source-anchor" href="#${paragraph.id}">010_taiyang_3.md#${paragraph.id}</a>`,
    ].join("");

    if (heading) {
      heading.insertAdjacentElement("afterend", meta);
    } else {
      paragraph.prepend(meta);
    }
  }
}

function classifySourceParagraph(text, previousKind) {
  if (/^［補正曰］/.test(text)) return { key: "correction", label: "補正曰" };
  if (/^［正曰］/.test(text)) return { key: "correction", label: "正曰" };
  if (/^［補曰］/.test(text)) return { key: "supplement", label: "補曰" };
  if (/^［述］/.test(text)) return { key: "note", label: "述評" };
  if (/^［.+曰］/.test(text)) return { key: "note", label: "諸家按語" };
  if (/(湯方|丸方|散方)$/.test(text)) return { key: "formula-title", label: "方名" };
  if (/^上[一二三四五六七八九十百上]+味/.test(text) || previousKind === "formula-title") {
    return { key: "formula", label: "方藥/煎服" };
  }
  if (/^(此一節|此章|上二節|此與|此節|然此|甚矣|所以然者)/.test(text)) {
    return { key: "note", label: "按語/述評" };
  }
  if (/^(太陽病|病人|傷寒|婦人|結胸|小結胸|心下痞|本以|下利|發汗|服桂枝湯|太陽與少陽|病發於陽|藏結|問曰|答曰)/.test(text)) {
    return { key: "original", label: "仲景原文" };
  }
  return { key: "commentary", label: "淺註" };
}
