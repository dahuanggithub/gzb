export class Employee {
  id: number
  name: string
  department: string
  position: string
  nature: EmployeeNature
  title: EmployeeTitle
  salaryModel: SalaryModel
  salary: number
  cpf: number
  hasAnnualLeave: boolean
  state: EmployeeState

  // 构造函数
  constructor(
    id: number,
    name: string,
    department: string,
    position: string = '单位职员',
    salary: number,
    cpf: number,
    nature: EmployeeNature = EmployeeNature.全职,
    title: EmployeeTitle = EmployeeTitle.无,
    salaryModel: SalaryModel = SalaryModel.年薪,
    hasAnnualLeave: boolean = false,
    state: EmployeeState = EmployeeState.在职
  ) {
    this.id = id
    this.name = name
    this.department = department
    this.position = position
    this.nature = nature
    this.title = title
    this.salaryModel = salaryModel
    this.salary = salary
    this.cpf = cpf
    this.hasAnnualLeave = hasAnnualLeave
    this.state = state
  }

  public updateState(state: EmployeeState) {
    this.state = state
  }
}

export enum EmployeeNature {
  全职 = 0,
  兼职 = 1,
}
export enum EmployeeState {
  在职,
  离职,
}
export enum EmployeeTitle {
  无,
  初级,
  中级,
  高级,
}
export enum SalaryModel {
  年薪,
  月薪,
}
