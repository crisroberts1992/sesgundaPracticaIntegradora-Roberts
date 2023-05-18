const navbar =  document.getElementById("navbar") 

const navbarTemplate = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/home">HOME</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/products">Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/users">Usuarios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/profile">Perfil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/carts">Carrito</a>
        </li>
      </ul>
    </div>
  </div>
</nav> 
`

navbar.innerHTML = navbarTemplate
