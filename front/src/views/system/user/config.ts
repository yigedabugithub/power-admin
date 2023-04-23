import { defaultOptButtons } from '@/components/PaTable'

export const tableUserColumnTT: TableColumn[] = [
  { prop: 'userName', label: '姓名' },
  { prop: 'mobile', label: '手机号' },
  { prop: 'userEmail', label: '邮箱' },
  { prop: 'deptId', label: '部门' },
  { prop: 'job', label: '岗位' },
  { prop: 'state', label: '状态' },
  { prop: 'roleList', label: '用户角色' },
  { prop: 'createTime', label: '创建时间' },
  {
    label: '操作',
    width: '100',
    render: 'buttons',
    buttons: defaultOptButtons(['edit', 'delete']),
    operator: false
  }
]
