const formLogin = document.getElementById('formLogin')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async e => {
    e.preventDefault()

    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')

    if (
      !(input_email instanceof HTMLInputElement)
      || !(input_password instanceof HTMLInputElement)
    ) return

    const data = {
      email: input_email.value,
      password: input_password.value,
    }

    const response = await fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 201) {
      window.location.replace('/home')
    } else if (response.status === 401) {
      alert('credenciales invalidas!')
    }
  })
}
/*
const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')

    if (
      !(input_email instanceof HTMLInputElement)
      || !(input_password instanceof HTMLInputElement)
  ) return

  const datosUsuario = {
      email: input_email.value,
      password: input_password.value,
  }

  const response = await fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify(datosUsuario),
      headers: {
          'Content-Type': 'application/json'
      }
  })

  if (response.status === 201) {
      window.location.replace('/home')
  }
})
}    */