import  secureLocalStorage  from  "react-secure-storage";

export const LocalStorage = {
    get(key: string) {
        return secureLocalStorage.getItem(key);
    },
    set(key: string, value: any) {
        secureLocalStorage.setItem(key, value);
    },
    remove(key: string) {
        secureLocalStorage.removeItem(key);
    },
    clear() {
        secureLocalStorage.clear();
    },
}