const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const input_first_name = document.querySelector('#input_first_name')
    const input_last_name = document.querySelector('#input_last_name')
    const input_email = document.querySelector('#input_email')
    const input_age = document.querySelector('#input_age')
    const input_password = document.querySelector('#input_password')

    if (
      input_first_name instanceof HTMLInputElement &&
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {

      const datosUsuario = {
        first_name: input_first_name.value,
        last_name: input_last_name.value,
        email: input_email.value,
        age: input_age.value,
        password: input_password.value,
      }

      const usuarioCreado = await fetch('/api/users', {
        method: 'POST',
            body: JSON.stringify(datosUsuario),
            headers: {
                'Content-Type': 'application/json'
        },
      })
      if (usuarioCreado.status === 201) {
        window.location.replace('/')
    }
      console.log(usuarioCreado)
    }
  })
}
//
/*const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', event => {
      event.preventDefault()
      const formData = new FormData(formRegister)
      const data = {}
      formData.forEach((value, key) => (data[key] = value))

      fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json"
          }
      })
          .then(result => {
              if (result.status === 201) {
                  window.location.replace('/')
              }
          })
  })
}*/