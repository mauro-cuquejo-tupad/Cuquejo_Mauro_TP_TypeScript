import type { IUser } from "../../../types/IUser";
import { findUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  if (!valueEmail || !valuePassword) {
        alert("Por favor, complete todos los campos.");
        return;
    }

  const usuarioBuscado: IUser | null = findUser(valueEmail);
  if (!usuarioBuscado) {
    alert("Usuario no encontrado");
    return;
  } else if (usuarioBuscado.password !== valuePassword) {
    alert("Contraseña incorrecta");
    return;
  } else {
    alert("Login exitoso");
    usuarioBuscado.loggedIn = true;
    const parseUser = JSON.stringify(usuarioBuscado);
    localStorage.setItem("userData", parseUser);

    if (usuarioBuscado.role === "admin") {
      navigate("/src/pages/admin/home/home.html");
    } else {
      navigate("/src/pages/store/home/home.html");
    }
  }

});


