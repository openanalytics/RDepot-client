import { Login, LoginApiData } from '@/models/users/Login'
import api from '@/plugins/axios'
import { notify } from '@kyvg/vue3-notification'
import { createExpect } from 'vitest'

export async function loginApi(data: LoginApiData) {
  try {
    var credentials = {
      password: data.password,
      username: data.username
    }
    console.log('user data ', credentials)

    let response = await api.post(
      `/api/auth/login`,
      credentials
    )
    console.log('response: ', response)

    if (response.status == 200) {
      notify({
        text: 'successfully logged in',
        type: 'success'
      })
    }
    return response
  } catch (error) {
    console.log('response: ', error)
    notify({
      text: 'Wrong credential data, please try again',
      type: 'warn'
    })
    return error
  }
}
