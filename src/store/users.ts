import { defineStore } from 'pinia'
import { LoginApiData } from '@/models'
import { LoginType } from '@/enum/LoginType'

interface State {
  userToken: string
  userName: string
  loginType: LoginType
}

export const useUserStore = defineStore('user_store', {
  state: (): State => {
    return {
      userToken: '',
      userName: '',
      loginType: LoginType.DEFAULT
    }
  },
  actions:{
    async login(payload: LoginApiData) {
      // let response = await login(data)
      // this.userToken = response.userToken
      console.log(payload)
    },
    chooseLoginType(payload: LoginType) {
      this.loginType = payload
    }
  }
})
