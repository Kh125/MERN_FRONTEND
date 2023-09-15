export const storeDataInIndexedDB = (data, major) => {
  const request = indexedDB.open("uniNotify", 2);
  let db;

  request.onupgradeneeded = function (event) {
    db = event.target.result;

    // Create object stores if they don't exist
    if (!db.objectStoreNames.contains("triggeredPeriods")) {
      const tpObjectStore = db.createObjectStore("triggeredPeriods", { keyPath: "id" });
      tpObjectStore.createIndex('timestamp', 'timestamp', { unique: false });
    }

    if (!db.objectStoreNames.contains("schedule")) {
      const objectStore = db.createObjectStore("schedule", {
        keyPath: "id",
        autoIncrement: true,
      });

      // Store the provided data
      objectStore.add({
        major, 
        schedule: data 
      });

      console.log("Schedule Collection setup and data stored");
    }
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    const transaction = db.transaction(['schedule'], 'readwrite');
    const objectStore = transaction.objectStore('schedule');

    const addRequest = objectStore.add({
      major, 
      schedule: data 
    });

    addRequest.onsuccess = (event) => {
      console.log('New data added successfully:', event.target.result);
    };
  
    addRequest.onerror = (event) => {
      console.error('Error adding data:', event.target.error);
    };
    
    console.log("Database opened successfully");
  };

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };

  request.oncomplete = () => {
    db.close();
    console.log("DB closed.");
  }
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

export const deleteIndexDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('uniNotify', 2);

    request.onsuccess = (event) => {
      const db = event.target.result;

      db.close();

      const deleteRequest = indexedDB.deleteDatabase('uniNotify');

      deleteRequest.onsuccess = () => {
        console.log('Database deleted successfully');
        resolve();
      };

      deleteRequest.onerror = (event) => {
        console.error('Error deleting database', event.target.error);
        reject(event.target.error);
      };
    };

    request.onerror = (event) => {
      console.error('Error opening database', event.target.error);
      reject(event.target.error);
    };
  });
};
