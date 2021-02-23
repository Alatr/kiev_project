function pathDrawingInPercents(path, percent = 0) {
  const pathToEffect = path;
  const length = path.getTotalLength();
  pathToEffect.style.strokeDasharray = `${length / 100 * percent} ${length}`;
  pathToEffect.closest('svg').style.transform = `rotate(${(360 / 100 * percent) * -1}deg)`;
}

const $percentBlocks = document.querySelectorAll('[data-percent-block]');

$percentBlocks.forEach((block) => {
  const svg = block.querySelector('circle');
  pathDrawingInPercents(svg, +block.dataset.value);
});
