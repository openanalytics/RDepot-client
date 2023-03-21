import { defineStore } from 'pinia'

interface State {
  userToken: string
  userLogin: string
  userRole: string
}

export const useLoggedUserStore = defineStore(
  'logged_user',
  {
    state: (): State => {
      return {
        userToken: import.meta.env.VITE_ADMIN_TOKEN,
        userLogin: 'einstein',
        userRole: 'admin'
      }
    },
    actions: {
      change_user(
        token: string,
        login: string,
        role: string
      ) {
        this.userToken = token
        this.userLogin = login
        this.userRole = role
      }
    }
  }
)
