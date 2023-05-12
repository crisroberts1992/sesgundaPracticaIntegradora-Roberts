export class User {
    #first_name
    #last_name
    #email
    #password
    #rol
    #age
  
    constructor({ email,last_name,first_name, password, age, rol }) {
      this.#email = email
      this.#last_name = last_name
      this.#first_name = first_name
      this.#password = password
      this.#age = age
      this.#rol = rol
    }
  
    get email() { return this.#email }
    get last_name() { return this.#last_name }
    get first_name() { return this.#first_name }
    get password() { return this.#password }
    get age() { return this.#age }
    get rol() { return this.#rol }
  
    datos() {
      return {
        nombre: this.#first_name,
        apellido: this.#last_name,
        email: this.#email,
        password: this.#password,
        edad: this.#age,
        rol: this.#rol,
      }
    }
  }