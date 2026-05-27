// Mermaid theme auto-switch for Material for MkDocs
// Detects dark/light mode and re-renders diagrams on toggle

function getMermaidTheme() {
  const scheme = document.body.getAttribute("data-md-color-scheme");
  return scheme === "slate" ? "dark" : "default";
}

// Re-initialize Mermaid when theme changes
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.attributeName === "data-md-color-scheme") {
      document.querySelectorAll(".mermaid").forEach((el) => {
        // Force re-render by removing the data-processed attribute
        const code = el.querySelector("code");
        if (code) {
          el.removeAttribute("data-processed");
          el.innerHTML = code.textContent;
        }
      });
      if (window.mermaid) {
        window.mermaid.initialize({ theme: getMermaidTheme() });
        window.mermaid.run();
      }
    }
  }
});

observer.observe(document.body, { attributes: true });
