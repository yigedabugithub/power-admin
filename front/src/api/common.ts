import createAxios from '@/utils/axios'

/**
 * 生成一个控制器的：增、删、改、查、排序的操作url
 */
export class baTableApi {
  private controllerUrl
  public actionUrl

  constructor(controllerUrl: string) {
    this.controllerUrl = controllerUrl
    this.actionUrl = new Map([
      ['index', controllerUrl + 'index'],
      ['add', controllerUrl + 'add'],
      ['edit', controllerUrl + 'edit'],
      ['del', controllerUrl + 'del'],
      ['sortable', controllerUrl + 'sortable']
    ])
  }

  index(filter: anyObj = {}): ApiPromise<TableDefaultData> {
    return createAxios({
      url: this.actionUrl.get('index'),
      method: 'get',
      params: filter
    }) as ApiPromise
  }

  edit(params: anyObj) {
    return createAxios({
      url: this.actionUrl.get('edit'),
      method: 'get',
      params
    })
  }

  del(data: string[]) {
    return createAxios(
      {
        url: this.actionUrl.get('del'),
        method: 'DELETE',
        data
      },
      {
        showSuccessMessage: true
      }
    )
  }

  postData(action: string, data: anyObj) {
    if (!this.actionUrl.has(action)) {
      throw new Error('action does not exist')
    }
    return createAxios(
      {
        url: this.actionUrl.get(action),
        method: 'post',
        data: data
      },
      {
        showSuccessMessage: true
      }
    )
  }

  sortableApi(id: number, targetId: number) {
    return createAxios({
      url: this.actionUrl.get('sortable'),
      method: 'post',
      data: {
        id: id,
        targetId: targetId
      }
    })
  }
}
