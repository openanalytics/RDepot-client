import { defineStore } from 'pinia'

interface State {
  userToken: string
  userLogin: string
  userRole: string
  userId: number
}

export const useLoggedUserStore = defineStore(
  'logged_user',
  {
    state: (): State => {
      return {
        userToken: import.meta.env.VITE_ADMIN_TOKEN,
        userLogin: 'einstein',
        userRole: 'admin',
        userId: 8
      }
    },
    actions: {
      change_user(
        token: string,
        login: string,
        role: string,
        id: number
      ) {
        this.userToken = token
        this.userLogin = login
        this.userRole = role
        this.userId = id
      }
    }
  }
)
