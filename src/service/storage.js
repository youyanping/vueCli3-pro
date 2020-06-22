export const Storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    remove(key) {
        localStorage.removeItem(key)
    },
    setVal(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    getVal(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    removeVal(key) {
        sessionStorage.removeItem(key)
    }
}
