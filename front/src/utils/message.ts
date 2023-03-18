import { ElMessage,ElMessageBox } from 'element-plus'

// // 带确定取消按钮或者是否按钮的弹出提示框
export function confirmBox(msg: string, title: string, options?: any) {
    const boxTitle = title ?? '提示'
    return ElMessageBox.confirm(msg,boxTitle, {
        customClass: 'confirmClass',
        type: options?.type,
        confirmButtonClass: options?.confirmBtnType === 'delete' ? 'delete-btn' : 'confirmBoxconfirmButtonClass',
        cancelButtonClass: 'confirmBoxCancelButtonClass',
        showClose: false,
        autofocus: false,
        ...options
    })
}



// ElMessage弹框
export function Tip(type: any, message: string, options?: any){
    return ElMessage({
        type: type,
        message: message,
        ...options
    })
}
