class Storage {
  constructor() {
    this.indexedDB = window.indexedDB;
    if (!this.indexedDB) {
      console.warn("Storage: IndexedDB not available.");
    }

    this.name = "threejs-editor";
    this.version = 1;
    this.database = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      const request = this.indexedDB.open(this.name, this.version);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("states")) {
          db.createObjectStore("states");
        }
      };

      request.onsuccess = (event) => {
        this.database = event.target.result;
        resolve();
      };

      request.onerror = (event) => {
        console.log("IndexedDB", event);
        reject(event);
      };
    });
  }
  get() {
    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction(["states"], "readwrite");
      const objectStore = transaction.objectStore("states");
      const request = objectStore.get(0);
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
  set(data) {
    const start = performance.now();
    const transaction = this.database.transaction(["states"], "readwrite");
    const objectStore = transaction.objectStore("states");
    const request = objectStore.put(data, 0);
    request.onsuccess = () => {
      const diff = (performance.now() - start).toFixed(2);
      console.log(
        "[" + /\d\d:\d\d:\d\d/.exec(new Date())[0] + "]",
        "Saved state to IndexedDB. " + diff + "ms"
      );
    };
  }
  clear() {
    if (!this.database) return;
    const transaction = this.database.transaction(["states"], "readwrite");
    const objectStore = transaction.objectStore("states");
    const request = objectStore.clear();
    request.onsuccess = () => {
      console.log(
        `[${/\d\d:\d\d:\d\d/.exec(new Date())[0]}]`,
        "Cleared IndexedDB."
      );
    };
  }
}

export { Storage };
