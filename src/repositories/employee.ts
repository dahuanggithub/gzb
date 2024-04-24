const objectStoreName = 'employee'
import { Employee, EmployeeState } from '../models/employee'
// 创建用户
async function creatEmployee(db: IDBDatabase, user: Employee): Promise<void> {
  const tx = db.transaction([objectStoreName], 'readwrite')
  const store = tx.objectStore(objectStoreName)
  await new Promise((resolve, reject) => {
    const request = store.add(user)
    request.onerror = (event) => {
      reject(request.error)
    }
    request.onsuccess = () => {
      resolve()
    }
  })
}

// 读取用户
async function getEmployee(
  db: IDBDatabase,
  id: number
): Promise<Employee | null> {
  const tx = db.transaction([objectStoreName], 'readonly')
  const store = tx.objectStore(objectStoreName)
  const request = store.get(id)
  return new Promise((resolve) => {
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

// 更新用户
async function updateEmployee(db: IDBDatabase, user: Employee): Promise<void> {
  const tx = db.transaction([objectStoreName], 'readwrite')
  const store = tx.objectStore(objectStoreName)
  await new Promise((resolve, reject) => {
    const request = store.put(user)
    request.onerror = (event) => {
      reject(request.error)
    }
    request.onsuccess = () => {
      resolve()
    }
  })
}

// 删除用户
async function deleteEmployee(db: IDBDatabase, id: number): Promise<void> {
  const tx = db.transaction([objectStoreName], 'readwrite')
  const store = tx.objectStore(objectStoreName)
  await new Promise((resolve, reject) => {
    const request = store.delete(id)
    request.onerror = (event) => {
      reject(request.error)
    }
    request.onsuccess = () => {
      resolve()
    }
  })
}

// 读取用户列表
async function _getEmployees(db: IDBDatabase): Promise<Employee[] | null> {
  // 开启一个只读事务

  return await new Promise((resolve, reject) => {
    const tx = db.transaction(objectStoreName, 'readonly')
    const store = tx.objectStore(objectStoreName)
    const getAllRequest = store.getAll()
    ;[]
    getAllRequest.onsuccess = (event) => {
      const results = event.target.result
      const employees: Employee[] = results.map((result: any) =>
        _toEmployee(result)
      )
      console.log(employees)
      resolve(employees)
    }
    getAllRequest.onerror = (event) => {
      reject(getAllRequest.error)
    }
  })
}

function _toEmployee(result: any): Employee {
  return new Employee(
    result.id,
    result.name,
    result.department,
    result.position,
    result.salary,
    result.cpf,
    result.nature,
    result.title,
    result.salaryModel,
    result.hasAnnualLeave,
    result.state
  )
}

export {
  creatEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  _getEmployees,
}
