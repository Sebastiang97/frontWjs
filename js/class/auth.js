class Auth {
  login() {}

  viewLogin() {
    return `
        <form id="formlogin">
            <div class="neonTitle">Login</div>
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

            <button id="btnQuery">login</button>
        </form>
      `
  }

  signUp() {}

  viewSignUp() {
    return `
        <form id="formSignUp">
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

            <button id="btnQuery">Sign Up</button>
        </form>
      `
  }
}

export default Auth
