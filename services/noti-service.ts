import appStore from '@/store/app'
import { NotificationModel } from '~/models/NotificationModel'

const NotificationService = {
  setNotification(data: NotificationModel) {
    appStore().setNotification(data)
  },
  setSuccessNotification(msg: string) {
    appStore().setNotification({
      show: true,
      type: 'success',
      title: '',
      message: msg,
    })
  },
  setWarningNotification(msg: string) {
    appStore().setNotification({
      show: true,
      type: 'warning',
      title: '',
      message: msg,
    })
  },
  setErrorNotification(msg: string) {
    appStore().setNotification({
      show: true,
      type: 'error',
      title: '',
      message: msg,
    })
  },
  setInfoNotification(msg: string) {
    appStore().setNotification({
      show: true,
      type: 'info',
      title: '',
      message: msg,
    })
  },
  hideNoti() {
    appStore().notification.show = false
  },
}

export default NotificationService
