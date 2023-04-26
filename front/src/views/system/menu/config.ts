import { defaultOptButtons } from '@/components/PaTable'

export const tableRoleColumn: TableColumn[] = [
  { prop: 'title', label: '菜单名称' },
  // { prop: 'menuCode', label: '权限标识' },
  { prop: 'menu_type', label: '菜单类型' },
  { prop: 'path', label: '路由地址' },
  { prop: 'component', label: '组件地址' },
  { prop: 'keepAlive', label: '缓存' },
  // { prop: 'createTime', label: '修改时间' },
  {
    label: '操作',
    width: '100',
    render: 'buttons',
    buttons: defaultOptButtons(['edit', 'delete']),
    operator: false
  }
]
