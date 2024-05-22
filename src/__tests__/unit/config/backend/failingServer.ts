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

import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import me from '@/__tests__/unit/config/mockData/me.json'

export const failingServer = setupServer(
  http.get(
    'http://localhost:8017/api/v2/manager/repository-maintainers',
    () => {
      return new HttpResponse(null, {
        status: 403
      })
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/repositories',
    () => {
      return new HttpResponse(null, {
        status: 403
      })
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/packages',
    () => {
      return new HttpResponse(null, {
        status: 403
      })
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/users/me',
    () => {
      return HttpResponse.json(me)
    }
  )
)
