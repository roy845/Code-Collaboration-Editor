function useLocalStorage<T>() {
  const getValue = (key: string): any | null => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const setValue = (key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { getValue, setValue, removeValue };
}

export default useLocalStorage;
