import {
  creatEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  _getEmployees,
} from '../repositories/employee'
import { Employee } from '../models/employee'
import { openDB } from '../db/index'
const objectStoreName = 'employee'
export default class EmployeeService {
  private db: IDBDatabase | null = null

  constructor() {
    //this.openDB()
  }

  private async openDB(): Promise<void> {
    this.db = await openDB(objectStoreName)
  }

  public async createEmployee(employee: Employee): Promise<void> {
    await this.openDB()
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    await creatEmployee(this.db, employee)
  }

  public async getEmployee(id: number): Promise<Employee | null> {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    return await getEmployee(this.db, id)
  }

  public async updateEmployee(employee: Employee): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    await updateEmployee(this.db, employee)
  }

  public async deleteEmployee(id: number): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    await deleteEmployee(this.db, id)
  }

  public async getEmployees(): Promise<Employee[] | null> {
    await this.openDB()
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    const ess: Employee[] | null = await _getEmployees(this.db)
    console.log(ess)
    return ess
  }
}
