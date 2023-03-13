import { LoginApiData } from '@/models/users/Login'
import api from '@/plugins/axios'
import { notify } from '@kyvg/vue3-notification'

export async function login(data: LoginApiData) {
  try {
    let response = await api.post(`auth/login/`, data)
    if (response.status == 200) {
      notify({
        text: 'successfully logged in',
        type: 'success'
      })
    }
    return response
  } catch (error) {
    notify({
      text: 'Wrong credential data, please try again',
      type: 'warn'
    })
    return error
  }
}
