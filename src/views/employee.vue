<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import EmployeeService from '../services/employee'
import {
  Employee,
  EmployeeNature,
  EmployeeTitle,
  EmployeeState,
  SalaryModel,
} from '../models/employee'
import { ref, onMounted, reactive } from 'vue'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
const isAppend = ref(false) //是否为新增

const employeeService = new EmployeeService()
const saveEmployee = () => {
  console.log(employee.value)
  let emp = new Employee(1, '', '', '', 0, 0)
  emp.id = employee.value.id
  emp.name = employee.value.name
  emp.department = employee.value.department
  emp.position = employee.value.position
  emp.nature = Number(employee.value.nature)
  emp.state = Number(employee.value.state)
  emp.title = Number(employee.value.title)
  emp.salaryModel = Number(employee.value.salaryModel)
  emp.salary = Number(employee.value.salary)
  emp.cpf = Number(employee.value.cpf)
  emp.hasAnnualLeave = employee.value.hasAnnualLeave
  if (isAppend.value) {
    // 创建用户
    employeeService
      .createEmployee(emp)
      .then(() => {
        toast({
          title: '创建成功！',
        })
        getEmployees()
      })
      .catch((error) => console.error('Failed to create user:', error))
  } else {
    employeeService
      .updateEmployee(emp)
      .then(() => {
        toast({
          title: '修改成功！',
        })
        getEmployees()
      })
      .catch((error) => console.error('Failed to create user:', error))
  }
}
const employees = ref([])
const employee = ref(new Employee(1, '', '', '', 0, 0))
const departments = JSON.parse(localStorage.getItem('departments') ?? '[]')
const employeeNatures = Object.keys(EmployeeNature).filter((nature) =>
  isNaN(Number(nature))
)
const employeeTitele = Object.keys(EmployeeTitle).filter((title) =>
  isNaN(Number(title))
)
const employeeState = Object.keys(EmployeeState).filter((state) =>
  isNaN(Number(state))
)
const salaryModel = Object.keys(SalaryModel).filter((mode) =>
  isNaN(Number(mode))
)

console.log(EmployeeNature) // 输出: "Value1", "Value2", "Value3"
onMounted(async () => {
  getEmployees()
})
const getEmployees = async () => {
  employees.value = await employeeService.getEmployees()
}
const employeeDetail = (emp: Employee) => {
  isAppend.value = false
  employee.value = emp
}
const employeeAppend = () => {
  isAppend.value = true
}
//console.log()
</script>
<template>
  <div>
    <div class="font-bold text-gray-600 text-2xl">员工管理</div>
    <div>
      <Sheet>
        <div class="p-2 text-right">
          <SheetTrigger as-child>
            <Button @click="employeeAppend">新增员工</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>编辑员工信息</SheetTitle>
            </SheetHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="id" class="text-right">编号</Label>
                <Input id="id" v-model="employee.id" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">姓名</Label>
                <Input id="name" v-model="employee.name" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="department" class="text-right">部门</Label>
                <Select class="col-span-3" v-model="employee.department">
                  <SelectTrigger class="w-[248px]">
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem :value="dep" v-for="dep in departments" :key="dep">
                        {{ dep }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="position" class="text-right">职务</Label>
                <Input id="position" v-model="employee.position" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">性质</Label>
                <Select class="col-span-3" v-model="employee.nature">
                  <SelectTrigger class="w-[248px]">
                    <SelectValue placeholder="选择性质" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem :value="index" v-for="(nature, index) in employeeNatures" :key="index">
                        {{ nature }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">职称</Label>
                <Select class="col-span-3" v-model="employee.title">
                  <SelectTrigger class="w-[248px]">
                    <SelectValue placeholder="选择职称" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem :value="index" v-for="(title, index) in employeeTitele" :key="index">
                        {{ title }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">状态</Label>
                <Select class="col-span-3" v-model="employee.state">
                  <SelectTrigger class="w-[248px]">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem :value="index" v-for="(status, index) in employeeState" :key="index">
                        {{ status }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">薪资模式</Label>
                <Select class="col-span-3" v-model="employee.salaryModel">
                  <SelectTrigger class="w-[248px]">
                    <SelectValue placeholder="选择职称" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem :value="index" v-for="(mode, index) in salaryModel" :key="index">
                        {{ mode }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="salary" class="text-right">薪资</Label>
                <Input id="salary" v-model="employee.salary" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="salary" class="text-right">公积金</Label>
                <Input id="salary" v-model="employee.cpf" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="salary" class="text-right">是否有年休</Label>
                <Switch :checked="employee.hasAnnualLeave" @update:checked="(e) => employee.hasAnnualLeave = e"
                        class="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose as-child>
                <Button type="submit" class="w-[100px]" @click="saveEmployee">
                  保 存
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px]">编号</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>部门</TableHead>
              <TableHead>职务</TableHead>
              <TableHead>性质</TableHead>
              <TableHead>职称</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>薪资</TableHead>
              <TableHead>公积金</TableHead>
              <TableHead>是否有年休</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="employee in employees" :key="employee.id">
              <TableCell class="font-medium">{{ employee.id }}</TableCell>
              <TableCell>
                <SheetTrigger as-child>
                  <Button variant="link" @click="employeeDetail(employee)">
                    {{ employee.name }}
                  </Button>
                </SheetTrigger>
              </TableCell>
              <TableCell>{{ employee.department }}</TableCell>
              <TableCell>{{ employee.position }}</TableCell>
              <TableCell>{{ EmployeeNature[employee.nature] }}</TableCell>
              <TableCell>{{ EmployeeTitle[employee.title] }}</TableCell>
              <TableCell>{{ EmployeeState[employee.state] }}</TableCell>
              <TableCell>{{ employee.salary }}</TableCell>
              <TableCell>{{ employee.cpf }}</TableCell>
              <TableCell>
                {{ employee.hasAnnualLeave ? '有' : '无' }}
              </TableCell>

            </TableRow>
          </TableBody>
        </Table>
      </Sheet>
    </div>
  </div>
</template>
