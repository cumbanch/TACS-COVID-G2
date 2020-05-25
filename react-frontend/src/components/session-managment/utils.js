export const isUserLogin = () => {
    if (localStorage.getItem("userInfo") == null)
        return false;
    return true;
}

export const logOut = () => {
    localStorage.removeItem("userInfo");
}