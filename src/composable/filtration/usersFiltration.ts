/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import { EntityModelUserDto } from '@/openapi'
import { useUserStore } from '@/store/users'
import {
  useSelectStore,
  SelectState
} from '@/store/select_pagination'

export function useUsersFiltration() {
  const storeIdUser: SelectState = 'user'

  const selectStore = useSelectStore(storeIdUser)
  const userStore = useUserStore()

  async function loadUsers() {
    await userStore.fetchAllUsers()
    selectStore.addItems(
      userStore.userList.map((user: EntityModelUserDto) => {
        return { value: user.login, title: user.name }
      })
    )
  }

  return {
    storeIdUser,
    loadUsers
  }
}
