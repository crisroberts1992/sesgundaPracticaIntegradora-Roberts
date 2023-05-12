//el id del carrito por ahora lo cargo yo con el que creo pero a futuro guardaremos el carrito de cada usuario en sesion.

async function addProductToCart(pid) {
    const cid = "643e16f19e3001319402863e";
    const FETCH_URL = `http://localhost:8080/api/carts/${cid}/product/${pid}`;
    const data = await fetch(FETCH_URL, { method: "POST" });
    console.log(data);
  }