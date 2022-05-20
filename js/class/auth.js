import Storage from './storage.js'
const storage = new Storage()
class Auth {
  login() {
    storage.setData()
  }

  viewLogin() {
    return `
        <form id="formAuth">
            <div class="neon">Login</div>
            <input
                type="text"
                name="Correo"
                placeholder="Ingresa tu nombre"
                class="input animate__animated animate__shakeY"
            />

            <input
                type="text"
                name="contraseña"
                placeholder="Ingresa tu contraseña"
                class="input animate__animated animate__shakeY"
            />

            <button id="btnQuery" class="login">login</button>
        </form>
      `
  }

  signUp() {}

  viewSignUp() {
    return `
        <form id="formAuth">
            <div class="neon">Sign Up</div>
            <input
                type="text"
                name="Correo"
                placeholder="Ingresa tu nombre"
                class="input animate__animated animate__shakeY"
            />

            <input
                type="text"
                name="contraseña"
                placeholder="Ingresa tu contraseña"
                class="input animate__animated animate__shakeY"
            />

            <button id="btnQuery" class="signUp">Sign Up</button>
        </form>
      `
  }
}

export default Auth
