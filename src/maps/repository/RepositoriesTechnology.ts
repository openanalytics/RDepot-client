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

import { Technologies } from '@/enum/Technologies'
import {
  fetchPythonRepositoriesService,
  fetchRRepositoriesService,
  updatePythonRepositoryService,
  updateRRepositoryService
} from '@/services/repositoryServices'

export const updateTechnologyRepository: Map<
  Technologies,
  (...args: any[]) => any
> = new Map<Technologies, (...args: any[]) => any>([
  [Technologies.Enum.Python, updatePythonRepositoryService],
  [Technologies.Enum.R, updateRRepositoryService]
])

export const fetchTechnologyRepository: Map<
  Technologies,
  (...args: any[]) => any
> = new Map<Technologies, (...args: any[]) => any>([
  [
    Technologies.Enum.Python,
    fetchPythonRepositoriesService
  ],
  [Technologies.Enum.R, fetchRRepositoriesService]
])
