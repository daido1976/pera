// deno-lint-ignore-file no-window-prefix require-await
const mount = () => {
  document.getElementById("hello").onclick = async () => {
    console.log("Hello static");
  };
};

window.addEventListener("load", () => {
  mount();
});
