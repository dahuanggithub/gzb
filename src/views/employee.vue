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
import EmployeeService from '../services/employee'
import { Employee, EmployeeNature } from '../models/employee'
import { ref, onMounted, reactive } from 'vue'
import { Label } from '@/components/ui/label'

const employeeService = new EmployeeService()
const saveEmployee = () => {
  const emp = new Employee(1, 'zhangsan', 'caiwu', 'dd', 100000, 200)
  // 使用示例
  // 创建用户
  employeeService
    .createEmployee(emp)
    .then(() => console.log('User created'))
    .catch((error) => console.error('Failed to create user:', error))
}
const employees = ref([])
const employee = reactive(new Employee(1, '', '', '', 0, 0))
const departments = JSON.parse(localStorage.getItem('departments') ?? '[]')
const employeeNatures = Object.keys(EmployeeNature)
console.log(EmployeeNature) // 输出: "Value1", "Value2", "Value3"
onMounted(async () => {
  getEmployees()
})
const getEmployees = async () => {
  employees.value = await employeeService.getEmployees()
}
//console.log()
</script>
<template>
  <div>
    <div class="font-bold text-gray-600 text-2xl">员工管理</div>
    <div>
      <div class="p-2 text-right">
        <Sheet>
          <SheetTrigger as-child>
            <Button> 新增员工 </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>编辑员工信息</SheetTitle>
            </SheetHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="id" class="text-right"> 编号 </Label>
                <Input id="id" v-model="employee.id" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right"> 姓名 </Label>
                <Input id="name" v-model="employee.name" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="department" class="text-right"> 部门 </Label>
                <Select class="col-span-3" v-model="employee.department">
                  <SelectTrigger class="w-[248px]">
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        :value="dep"
                        v-for="dep in departments"
                        :key="dep"
                      >
                        {{ dep }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right"> 职务 </Label>
                <Input id="name" v-model="employee.name" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right"> 性质 </Label>
                <Select class="col-span-3" v-model="employee.nature">
                  <SelectTrigger class="w-[248px]">
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        :value="index.toString()"
                        v-for="(nature, index) in employeeNatures"
                        :key="index"
                      >
                        {{ nature }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
        </Sheet>
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
            <TableHead>薪资 </TableHead>
            <TableHead>公积金</TableHead>
            <TableHead>是否有年休</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="employee in employees" :key="employee.id">
            <TableCell class="font-medium">
              {{ employee.id }}
            </TableCell>
            <TableCell>{{ employee.name }}</TableCell>
            <TableCell>{{ employee.department }}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
