/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
  fetchPythonPackageService,
  fetchRPackageService,
  downloadRPackageSourceFile,
  downloadPythonPackageSourceFile,
  deleteRPackage,
  deletePythonPackage,
  updatePythonPackage,
  updateRPackage
} from '@/services/packageServices'

export const fetchTechnologyPackage: Map<
  Technologies,
  (...args: any[]) => any
> = new Map<Technologies, (...args: any[]) => any>([
  [Technologies.Enum.Python, fetchPythonPackageService],
  [Technologies.Enum.R, fetchRPackageService]
])

export const downloadTechnologyPackage: Map<
  Technologies,
  (...args: any[]) => any
> = new Map<Technologies, (...args: any[]) => any>([
  [
    Technologies.Enum.Python,
    downloadPythonPackageSourceFile
  ],
  [Technologies.Enum.R, downloadRPackageSourceFile]
])

export const deleteTechnologyPackage: Map<
  Technologies,
  (...args: any[]) => any
> = new Map<Technologies, (...args: any[]) => any>([
  [Technologies.Enum.Python, deletePythonPackage],
  [Technologies.Enum.R, deleteRPackage]
])

export const updateTechnologyPackage: Map<
  Technologies,
  (...args: any[]) => any
> = new Map<Technologies, (...args: any[]) => any>([
  [Technologies.Enum.Python, updatePythonPackage],
  [Technologies.Enum.R, updateRPackage]
])
