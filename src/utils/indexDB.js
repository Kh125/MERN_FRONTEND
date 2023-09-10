export const storeDataInIndexedDB = (data) => {
    const request = indexedDB.open('uniNotify', 2);
    
    request.onupgradeneeded = function(event) {
        const db = event.target.result;

        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains('triggeredPeriods')) {
            db.createObjectStore('triggeredPeriods', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('schedule')) {
            const objectStore = db.createObjectStore('schedule', { keyPath: 'id', autoIncrement: true });

            // Store the provided data
            objectStore.add({ schedule: data });
            
            console.log('Schedule Collection setup and data stored');
        }
    };
    
    request.onsuccess = function(event) {
        console.log('Database opened successfully');
    };
    
    request.onerror = function(event) {
        console.error('Error opening database:', event.target.error);
    };
}