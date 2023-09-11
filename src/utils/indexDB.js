export const storeDataInIndexedDB = (data) => {
  const request = indexedDB.open("uniNotify", 2);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Create object stores if they don't exist
    if (!db.objectStoreNames.contains("triggeredPeriods")) {
      db.createObjectStore("triggeredPeriods", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("schedule")) {
      const objectStore = db.createObjectStore("schedule", {
        keyPath: "id",
        autoIncrement: true,
      });

      // Store the provided data
      objectStore.add({ schedule: data });

      console.log("Schedule Collection setup and data stored");
    }
  };

  request.onsuccess = function (event) {
    console.log("Database opened successfully");
  };

  request.onerror = function (event) {
    console.error("Error opening database:", event.target.error);
  };
};

export const clearObjectStore = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName);

    request.onerror = (event) => {
      reject(`Error opening database: ${event.target.error}`);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(storeName, "readwrite");
      const objectStore = transaction.objectStore(storeName);

      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve("Object store cleared");
        }
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};

export const getPeriodData = () => {
  return new Promise((resolve) => {
    let request = indexedDB.open("uniNotify");

    request.onsuccess = () => {
      let db = request.result;
      const tx = db.transaction("triggeredPeriods", "readonly");
      const store = tx.objectStore("triggeredPeriods");
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};
