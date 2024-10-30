export function toggleThemeListner() {
  const theme = document.querySelector(".theme-card") as HTMLDivElement;
  theme.addEventListener("click", () => {
    const container = document.querySelector("#container");
    const light = document.querySelector(".light") as HTMLImageElement;
    const dark = document.querySelector(".dark") as HTMLImageElement;
    container?.classList.toggle("light-mode");

    if (container?.classList.contains("light-mode")) {
      // Om ljusläge är aktivt, byt till mörkt läge
      light.src = "src/img/sun-dark.png";
      dark.src = "src/img/moon-dark.png";
      dark.classList.add("opacity");
      light.classList.remove("opacity");
    } else {
      // Om mörkt läge är aktivt, byt till ljust läge
      light.src = "src/img/sun.png";
      dark.src = "src/img/moon2.png";
      light.classList.add("opacity");
      dark.classList.remove("opacity");
    }
  });
}
