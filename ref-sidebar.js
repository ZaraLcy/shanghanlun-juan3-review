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
    const kind = classifySourceParagraph(paragraph.id, bodyText, previousKind);
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

const ORIGINAL_PARAGRAPH_IDS = new Set([
  "p001",
  "p005",
  "p008",
  "p012",
  "p015",
  "p023",
  "p027",
  "p034",
  "p038",
  "p041",
  "p047",
  "p054",
  "p058",
  "p066",
  "p070",
  "p074",
  "p079",
  "p088",
  "p092",
  "p095",
  "p108",
  "p111",
  "p115",
  "p119",
  "p123",
  "p131",
  "p139",
  "p142",
  "p150",
  "p154",
  "p158",
  "p166",
  "p170",
  "p178",
  "p185",
  "p189",
  "p198",
  "p205",
  "p214",
  "p217",
]);

function classifySourceParagraph(id, text, previousKind) {
  if (ORIGINAL_PARAGRAPH_IDS.has(id)) return { key: "original", label: "仲景原文" };
  if (/^［補正曰］/.test(text)) return { key: "correction", label: "唐宗海補正" };
  if (/^［正曰］/.test(text)) return { key: "correction", label: "唐宗海正曰" };
  if (/^［補曰］/.test(text)) return { key: "supplement", label: "唐宗海補曰" };
  if (/^［述］/.test(text)) return { key: "note", label: "述評" };
  if (/^［.+曰］/.test(text)) return { key: "note", label: "諸家按語" };
  if (/(湯方|丸方|散方|湯)$/.test(text)) return { key: "formula-title", label: "方名" };
  if (/^上[一二三四五六七八九十百上]+味/.test(text) || previousKind === "formula-title") {
    return { key: "formula", label: "方藥/煎服" };
  }
  if (/^(此一節|此章|上二節|此與|此節|然此|甚矣|所以然者)/.test(text)) {
    return { key: "note", label: "按語/述評" };
  }
  return { key: "commentary", label: "淺註（陳修園）" };
}
