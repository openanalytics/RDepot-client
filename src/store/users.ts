import { defineStore } from 'pinia'
import { LoginApiData } from '@/models/users/Login'
import { LoginType } from '@/enum/LoginType'
import {
  fetchRoles,
  fetchUsers,
  loginApi,
  updateUser
} from '@/services/users_services'
import { EntityModelUserDto, RoleDto } from '@/openapi'
import { usePaginationStore } from './pagination'
import { Role } from '@/enum/UserRoles'

interface State {
  userToken: string
  userName: string
  loginType: LoginType
  userList: EntityModelUserDto[]
  chosenUser: EntityModelUserDto
  roles: RoleDto[]
}

export const useUserStore = defineStore('user_store', {
  state: (): State => {
    return {
      userToken: '',
      userName: '',
      loginType: 'DEFAULT',
      userList: [],
      chosenUser: {},
      roles: []
    }
  },
  actions: {
    async login(payload: LoginApiData) {
      // let response = await login(data)
      // this.userToken = response.userToken
      loginApi(payload)
    },
    chooseLoginType(payload: LoginType) {
      this.loginType = payload
    },
    async fetchUsers() {
      const pagination = usePaginationStore()
      const [users, pageInfo] = await fetchUsers()
      this.userList = users
      pagination.setPage(pageInfo.page)
      pagination.setTotalNumber(pageInfo.totalNumber)
    },
    async fetchRoles() {
      if (this.roles.length === 0) {
        const [roles] = await fetchRoles()
        this.roles = roles
      }
    },
    async saveUser(newUser: EntityModelUserDto) {
      await updateUser(this.chosenUser, newUser).then(
        (success: boolean) => {
          if (success) {
          }
        }
      )
    },
    roleIdToRole(roleId: number) {
      return this.roles.length !== 0
        ? this.roles[Role.parse(roleId - 1)]
        : {}
    }
  }
})
