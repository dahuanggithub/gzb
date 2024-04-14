const dbName = 'myDatabase'
const dbVersion = 1

const indexName = 'id'

export function openDB(objectStoreName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion)

    request.onerror = (event) => {
      console.log(request.error)
      reject(request.error)
    }

    request.onsuccess = (event) => {
      resolve(request.result)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      if (!db.objectStoreNames.contains(objectStoreName)) {
        const store = db.createObjectStore(objectStoreName, { keyPath: 'id' })
        store.createIndex(indexName, 'id', { unique: true })
      }
    }
  })
}
