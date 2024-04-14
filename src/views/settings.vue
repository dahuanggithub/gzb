<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
import { Label } from '@/components/ui/label'
const { toast } = useToast()
const departments = ref(['财务部'])
const healthInsurance = ref(0)
const pensionInsurance = ref(0)
const unemploymentInsurance = ref(0)
const juniorTitle = ref(0)
const intermediateTitle = ref(0)
const seniorTitle = ref(0)
const annualLeave = ref(0)
const saveSettings = () => {
  try {
    localStorage.setItem('departments', JSON.stringify(departments.value))
    localStorage.setItem('healthInsurance', healthInsurance.value.toString())
    localStorage.setItem('pensionInsurance', pensionInsurance.value.toString())
    localStorage.setItem(
      'unemploymentInsurance',
      unemploymentInsurance.value.toString()
    )
    localStorage.setItem('juniorTitle', juniorTitle.value.toString())
    localStorage.setItem(
      'intermediateTitle',
      intermediateTitle.value.toString()
    )
    localStorage.setItem('seniorTitle', seniorTitle.value.toString())
    localStorage.setItem('annualLeave', annualLeave.value.toString())
    toast({
      title: '保存成功！',
    })
  } catch (error) {}
}
onMounted(() => {
  setSettings()
})
const setSettings = () => {
  try {
    departments.value = JSON.parse(localStorage.getItem('departments') ?? '[]')
    healthInsurance.value = Number(localStorage.getItem('healthInsurance'))
    pensionInsurance.value = Number(localStorage.getItem('pensionInsurance'))
    unemploymentInsurance.value = Number(
      localStorage.getItem('unemploymentInsurance')
    )
    juniorTitle.value = Number(localStorage.getItem('juniorTitle'))
    intermediateTitle.value = Number(localStorage.getItem('intermediateTitle'))
    seniorTitle.value = Number(localStorage.getItem('seniorTitle'))
    annualLeave.value = Number(localStorage.getItem('annualLeave'))
  } catch (error) {}
}
</script>
<template>
  <div>
    <div class="font-bold text-gray-600 text-2xl">基础设置</div>
    <div class="mt-10 w-[600px]">
      <div class="grid grid-cols-4 mb-3 items-center gap-4">
        <Label for="departments" class="text-right"> 部门设置 </Label>
        <TagsInput v-model="departments" class="col-span-3">
          <TagsInputItem v-for="item in departments" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput placeholder="填写部门，回车添加一个部门" />
        </TagsInput>
      </div>
      <h4 class="text-sm font-medium leading-none">社保设置</h4>
      <Separator class="my-4" />
      <div class="grid grid-cols-4 mb-3 items-center gap-4">
        <Label for="healthInsurance" class="text-right"> 医疗保险 </Label>
        <Input
          id="healthInsurance"
          v-model="healthInsurance"
          class="col-span-3"
        />
      </div>
      <div class="grid grid-cols-4 mb-3 items-center gap-4">
        <Label for="pensionInsurance" class="text-right"> 养老保险 </Label>
        <Input
          id="pensionInsurance"
          v-model="pensionInsurance"
          class="col-span-3"
        />
      </div>
      <div class="grid grid-cols-4 mb-3 items-center gap-4">
        <Label for="unemploymentInsurance" class="text-right"> 失业保险 </Label>
        <Input
          id="unemploymentInsurance"
          v-model="unemploymentInsurance"
          class="col-span-3"
        />
      </div>
      <h4 class="text-sm font-medium leading-none">职称补贴</h4>
      <Separator class="my-4" />
      <div class="grid grid-cols-4 mb-3 items-center gap-4">
        <Label for="juniorTitle" class="text-right"> 初级 </Label>
        <Input id="juniorTitle" v-model="juniorTitle" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 mb-3 items-center gap-4">
        <Label for="intermediateTitle" class="text-right"> 中级 </Label>
        <Input
          id="intermediateTitle"
          v-model="intermediateTitle"
          class="col-span-3"
        />
      </div>
      <div class="grid grid-cols-4 mb-3 items-center gap-4">
        <Label for="seniorTitle" class="text-right"> 高级 </Label>
        <Input id="seniorTitle" v-model="seniorTitle" class="col-span-3" />
      </div>
      <h4 class="text-sm font-medium leading-none">年休假设置</h4>
      <Separator class="my-4" />
      <div class="grid grid-cols-4 mb-3 items-center gap-4">
        <Label for="annualLeave" class="text-right"> 默认天数 </Label>
        <Input id="annualLeave" v-model="annualLeave" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 mt-6 items-center gap-4">
        <Button
          type="submit"
          class="w-[100px] col-start-2"
          @click="saveSettings"
        >
          保 存
        </Button>
      </div>
    </div>
  </div>
</template>
