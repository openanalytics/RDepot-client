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
import me from '@/__tests__/config/mockData/me.json'
import packages from '@/__tests__/config/mockData/packages.json'
import repositories from '@/__tests__/config/mockData/repositories.json'
import repositoryMaintainers from '@/__tests__/config/mockData/repositoryMaintainers.json'
import packageMaintainers from '@/__tests__/config/mockData/packageMaintainers.json'
import submissions from '@/__tests__/config/mockData/submissions.json'
import roles from '@/__tests__/config/mockData/roles.json'
import events from '@/__tests__/config/mockData/events.json'
import users from '@/__tests__/config/mockData/users.json'

export const server = setupServer(
  http.get(
    'http://localhost:8017/api/v2/manager/users/me',
    () => {
      return HttpResponse.json(me)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/events',
    () => {
      return HttpResponse.json(events)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/packages',
    () => {
      return HttpResponse.json(packages)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/repositories',
    () => {
      return HttpResponse.json(repositories)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/repository-maintainers',
    () => {
      return HttpResponse.json(repositoryMaintainers)
    }
  ),
  http.delete(
    'http://localhost:8017/api/v2/manager/repository-maintainers/:maintainer_id',
    () => {
      return new HttpResponse(null, {
        status: 202
      })
    }
  ),
  http.patch(
    'http://localhost:8017/api/v2/manager/repository-maintainers/:maintainer_id',
    () => {
      return new HttpResponse(null, {
        status: 202
      })
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/users/roles',
    () => {
      return HttpResponse.json(roles)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/package-maintainers',
    () => {
      return HttpResponse.json(packageMaintainers)
    }
  ),
  http.delete(
    'http://localhost:8017/api/v2/manager/package-maintainers/3',
    () => {
      return new HttpResponse(null, {
        status: 202
      })
    }
  ),
  http.patch(
    'http://localhost:8017/api/v2/manager/package-maintainers/3',
    () => {
      return new HttpResponse(null, {
        status: 202
      })
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/submissions',
    () => {
      return HttpResponse.json(submissions)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/users',
    () => {
      return HttpResponse.json(users)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/r/packages/:package_id',
    ({ params }) => {
      const { package_id } = params
      return HttpResponse.json({
        data: packages.data.content.find(
          (elem) =>
            elem.id.toString() === package_id.toString()
        )
      })
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/submissions/:submission_id',
    ({ params }) => {
      const { submission_id } = params
      return HttpResponse.json({
        data: submissions.data.content.find(
          (elem) =>
            elem.id.toString() === submission_id.toString()
        )
      })
    }
  ),
  http.patch(
    'http://localhost:8017/api/v2/manager/r/submissions/:submission_id',
    ({ params }) => {
      const { submission_id } = params
      return HttpResponse.json({
        data: submissions.data.content.find(
          (elem) => elem.id.toString() === submission_id
        )
      })
    }
  ),
  http.patch(
    'http://localhost:8017/api/v2/manager/r/packages/:package_id',
    () => {
      return new HttpResponse(null, {
        status: 202
      })
    }
  )
)
