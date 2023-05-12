const formCargaProducts = document.querySelector("#cargaProducts");

if (formCargaProducts instanceof HTMLFormElement) {
  formCargaProducts.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formCargaProducts);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    fetch("api/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  });
}