const spotlight = document.getElementById("spotlight");
const spotlight_child = document.getElementById("spotlight-child");
const maincursor = document.getElementById("maincursor");
maincursor.addEventListener("mousemove", moveSpotlight);
maincursor.addEventListener("touchmove", moveSpotlight);
function moveSpotlight(e) {
  let pos, x, y;
  e.preventDefault();
  x = e.clientX - 300;
  y = e.clientY - 350;
  spotlight.style.left = x + "px";
  spotlight.style.top = y + "px";
  spotlight_child.style.left = x + "px";
  spotlight_child.style.top = y + "px";
}




