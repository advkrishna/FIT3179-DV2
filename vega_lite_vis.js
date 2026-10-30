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
      // Only for single/layered charts that fill their container
      if (spec.width === "container" && !spec.autosize) {
        spec.autosize = { type: "fit", contains: "padding" };
      }
      return vegaEmbed(selector, spec, opts);
    })
    .catch(err => console.error("Chart failed:", specPath, err));
}

drawChart("#gender", "charts/gender_dumbbell.json");
drawChart("#socioeconomic", "charts/socioeco_heatmap.json");
drawChart("#map1", "charts/propsymbol.json");
drawChart("#map2", "charts/remoteness_zones_map.json");
drawChart("#remotebar", "charts/remoteness_bargrid.json");

const DESIGN_WIDTH = autosize;   
function fitPage() {
  const page = document.querySelector(".page");
  const scale = Math.min(1, document.documentElement.clientWidth / DESIGN_WIDTH);
  page.style.transform = `scale(${scale})`;
  // a transformed element still takes up its original height, so shrink/grow the body to match
  document.body.style.height = (page.offsetHeight * scale) + "px";
}

window.addEventListener("load", fitPage);
window.addEventListener("resize", fitPage);
new ResizeObserver(fitPage).observe(document.querySelector(".page"));