import type { IUser } from "./types/IUser";
import { findUser, getUSer, removeUser, saveUsers } from "./utils/localStorage";
import { navigate } from "./utils/navigate";

const HOME_STORE: string = "/src/pages/store/home/home.html";
const HOME_ADMIN: string = "/src/pages/admin/home/home.html";
const LOGIN_PAGE: string = "/src/pages/auth/login/login.html";
const REGISTRO_PAGE: string = "/src/pages/auth/registro/registro.html";
const CART_PAGE: string = "/src/pages/store/cart/cart.html";
const ROOT_PAGE: string = "/";
const INDEX_PAGE: string = "/index.html";

const VALID_PAGES = new Set<string>([
    ROOT_PAGE,
    INDEX_PAGE,
    HOME_STORE,
    HOME_ADMIN,
    LOGIN_PAGE,
    REGISTRO_PAGE,
    CART_PAGE,
]);

const guardRoutes = () => {
    const usuario: string | null = getUSer();
    const pagina: string = window.location.pathname;

    if (!VALID_PAGES.has(pagina)) {
        navigate(HOME_STORE);
        return;
    }

    if (pagina === ROOT_PAGE || pagina === INDEX_PAGE) {
        navigate(LOGIN_PAGE);
        return;
    }

    if(!usuario) {
        if (!(pagina === LOGIN_PAGE || pagina === REGISTRO_PAGE)) {
            alert("No hay un usuario logueado. Será redirigido a la página de login");
            navigate(LOGIN_PAGE);
        }
        return;
    }

    try {
        let usuarioParseado: IUser = JSON.parse(usuario);

    if (!usuarioParseado.loggedIn) {
        alert("No hay un usuario logueado. Será redirigido a la página de login");
        navigate(LOGIN_PAGE);
        return;
    }

    if (usuarioParseado.role === "client" && (pagina === HOME_ADMIN || pagina === LOGIN_PAGE || pagina === REGISTRO_PAGE || pagina === ROOT_PAGE)) {
        alertaRedireccion(pagina);

        navigate(HOME_STORE);
        return;
    }

    if (usuarioParseado.role === "admin" && (pagina === HOME_STORE || pagina === CART_PAGE || pagina === LOGIN_PAGE || pagina === REGISTRO_PAGE)) {
        alertaRedireccion(pagina);
        navigate(HOME_ADMIN);
        return;
    }
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error:", error.message);
            removeUser();
            navigate(LOGIN_PAGE);
        }
        return;
    }
}

const alertaRedireccion = (pagina: string): void => {
    pagina === LOGIN_PAGE || pagina === REGISTRO_PAGE ?
        alert("Usuario ya se encuentra logueado") :
        alert("Ingreso no autorizado. Será redirigido al home");
}

const generarUsuarioAdmin = (): void => {
    const usuarioExistente: IUser | null = findUser("admin@gmail.com");
    if (!usuarioExistente) {
        const usuarioAdmin: IUser = {
            email: "admin@gmail.com",
            password: "Admin123",
            role: "admin",
            loggedIn: false,
        };
        saveUsers(usuarioAdmin);
    }
}

generarUsuarioAdmin();
guardRoutes();