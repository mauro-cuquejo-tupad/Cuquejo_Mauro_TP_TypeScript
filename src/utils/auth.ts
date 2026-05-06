
import { removeStoreFilters, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const logout = () => {
  removeStoreFilters();
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};