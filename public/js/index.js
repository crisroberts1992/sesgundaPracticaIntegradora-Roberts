const serverSocket = io("http://localhost:8080");
//boton logout

const logoutForm = document.querySelector('#formLogout')

if (logoutForm instanceof HTMLFormElement) {
  logoutForm.addEventListener('submit', e => {
      e.preventDefault()
      fetch('/api/sessions', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
          .then(result => {
              if (result.status === 204) {
                //console.log('logout realizado')
                  window.location.replace('/login')
              }
          })
  })
}

const div = document.getElementById("container") ?? null;

const template = `
{{#if listOk}}
  <h4>Productos:</h4>
  <div class='container text-center mb-5'>
    <div class='row row-gap-5'>
      {{#each list}}
        <div class='col-3'>
          <div class='card'>
            <div class='card-body'>
              <h5 class='card-title'>{{this.title}}</h5>
              <p class='card-text'>{{this.description}}</p>
            </div>
            <ul class='list-group list-group-flush'>
              <li class='list-group-item'>Item {{this.code}}</li>
              <li class='list-group-item'>Price: {{this.price}}</li>
               <li class="list-group-item">Category: {{this.category}}</li>
              <li class='list-group-item'>Stock: {{this.stock}}</li>
            </ul>
          </div>
        </div>
      {{/each}}
    </div>
  </div>
{{else}}
  <p>Galeria de productos vacia</p>
{{/if}}
`;

const compileProducts = Handlebars.compile(template);

serverSocket.on("reloadProducts", (data) => {
  console.log(data);
  if (div !== null) {
    div.innerHTML = compileProducts({
      faviconTitle: "Home | Productos",
      mainTitle: "Lista de productos",
      list: data.list,
      listOk: data.listOk,
    });
  }
});