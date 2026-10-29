const sharedConfig = {
  font: "Open Sans",
  view: { stroke: null },
  axis: { labelFontSize: 12, titleFontSize: 12, grid: false },
  title: { font: "Open Sans" }
};

const opts = { actions: false, renderer: "svg" };

function drawChart(selector, specPath) {
  fetch(specPath)
    .then(response => response.json())
    .then(spec => {
      spec.config = { ...sharedConfig, ...(spec.config || {}) };
      return vegaEmbed(selector, spec, opts);
    })
    .catch(err => console.error("Chart failed:", specPath, err));
}

// One line per chart:
// drawChart("#bars", "charts/bars.json");