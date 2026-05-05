import type { IUser } from "../types/IUser";
import type { CartItem, Product } from "../types/product";

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

export const saveUsers = (user: IUser) => {
  try {
    const usuariosGuardados = getUsers();
    const usuarios: IUser[] = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    usuarios.push(user);
    localStorage.setItem("users", JSON.stringify(usuarios));
  } catch {
    localStorage.setItem("users", JSON.stringify([user]));
  }
};

export const getUsers = () => {
  return localStorage.getItem("users");
};

export const removeUsers = () => {
  localStorage.removeItem("users");
};

export const findUser = (email: string): IUser | null => {
  const usersData = getUsers();
  if (usersData) {
    const usersArray: IUser[] = JSON.parse(usersData);
    return usersArray.find(user => user.email === email) || null;
  }
  return null;
};

export const getProductCart = (): string | null => {
  return localStorage.getItem("cart");
};

export const deleteProductCart = (): void => {
  localStorage.removeItem("cart");
};

export const addProductCart = (product: Product): void => {
  try {
    const carritoGuardado: string | null = getProductCart();
    let cartItems : CartItem[] = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    let item: CartItem | undefined = cartItems.find((c: CartItem) => c.id === product.id);
    console.log(product);
    if (item) {
      item.cantidad += 1;
    } else {
      let cartItem: CartItem = {
        id: product.id,
        cantidad: 1,
        producto: product
      };
      cartItems.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch {
    localStorage.setItem("cart", JSON.stringify([{
        id: product.id,
        cantidad: 1,
        producto: product
      }]));
  }
};


export const removeProductCart = (product : Product): void => {
  try {
    const carritoGuardado: string | null = getProductCart();
    let cartItems : CartItem[] = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const item: CartItem | undefined = cartItems.find((c: CartItem) => c.id === product.id);
    if (!item) return;

    if (item.cantidad > 1) {
      item.cantidad -= 1;
    } else {
      cartItems = cartItems.filter((c: CartItem) => c.id !== product.id);
    }

    if(cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }

  } catch {
    console.error("error al remover producto");
    localStorage.removeItem("cart");
  }
};


export const removeAllProductsCart = (product : Product): void => {
  try {
    const carritoGuardado: string | null = getProductCart();
    let cartItems : CartItem[] = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const item: CartItem | undefined = cartItems.find((c: CartItem) => c.id === product.id);
    if (!item) return;

    cartItems = cartItems.filter((c: CartItem) => c.id !== product.id);

    if(cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }

  } catch {
    console.error("error al remover producto");
    localStorage.removeItem("cart");
  }
};