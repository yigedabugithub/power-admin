import { defaultOptButtons } from '@/components/PaTable'

export const tableRoleColumn: TableColumn[] = [
  { type: 'selection', align: 'center' },
  { prop: 'roleName', label: '角色名称' },
  { prop: 'remark', label: '角色描述' },
  { prop: 'roleStatus', label: '角色状态' },
  {
    label: '操作',
    width: '100',
    render: 'buttons',
    buttons: defaultOptButtons(['edit', 'delete']),
    operator: false
  }
]
