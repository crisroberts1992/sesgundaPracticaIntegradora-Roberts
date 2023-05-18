export class User {
    #first_name
    #last_name
    #email
    #age
    #password
    #rol
  
    constructor({ first_name,last_name,email,age,password,rol }) {
      this.#first_name = first_name
      this.#last_name = last_name
      this.#email = email
      this.#age = age
      this.#password = password
      this.#rol = rol
    }
    get first_name() { return this.#first_name }
    get last_name() { return this.#last_name }
    get email() { return this.#email }
    get age() { return this.#age }
    get password() { return this.#password }
    get rol() { return this.#rol }
  
    datos() {
      return {
        first_name: this.#first_name,
        last_name: this.#last_name,
        email: this.#email,
        age: this.#age,
        password: this.#password,
        rol: this.#rol,
      }
    }
  }