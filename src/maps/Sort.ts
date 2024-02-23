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

export const SORT_PARAMS: Map<string, string> = new Map<
  string,
  string
>([
  ['columns.package.name', 'name'],
  ['columns.package.version', 'version'],
  ['columns.package.title', 'title'],
  ['columns.package.maintainer', 'user.name'],
  ['columns.package.state', 'state'],
  ['columns.package.technology', 'resourceTechnology'],
  ['columns.package.repository', 'repositoryGeneric'],
  ['columns.package.active', 'active'],
  ['columns.repository.name', 'name'],
  ['columns.repository.version', 'version'],
  ['columns.repository.publicationUri', 'publicationUri'],
  ['columns.repository.serverAddress', 'serverAddress'],
  ['columns.repository.packagesNo', 'packagesNo'],
  ['columns.repository.version', 'version'],
  ['columns.repository.technology', 'resourceTechnology'],
  ['columns.repository.published', 'published'],
  ['columns.users.name', 'name'],
  ['columns.users.email', 'email'],
  ['columns.users.username', 'login'],
  ['columns.users.role', 'role'],
  ['columns.users.active', 'active'],
  ['columns.repositoryMaintainer.name', 'user.name'],
  [
    'columns.repositoryMaintainer.repository',
    'repository.name'
  ],
  [
    'columns.repositoryMaintainer.technology',
    'repository.technology'
  ],

  ['columns.packageMaintainer.name', 'user.name'],
  ['columns.packageMaintainer.packageName', 'packageName'],
  [
    'columns.packageMaintainer.technology',
    'repository.technology'
  ],
  [
    'columns.packageMaintainer.repository',
    'repository.name'
  ],

  ['columns.submissions.date', 'date'],
  ['columns.submissions.package', 'packageBag.name'],
  [
    'columns.submissions.repository',
    'packageBag.repositoryGeneric.name'
  ],
  ['columns.submissions.submitter', 'submitter.name'],
  ['columns.submissions.approver', 'approver.name'],
  ['columns.submissions.technology', 'technology'],
  ['columns.submissions.accepted', 'state'],

  ['columns.tokens.name', 'name'],
  ['columns.tokens.creationDate', 'creationDate'],
  ['columns.tokens.expirationDate', 'expirationDate'],
  ['columns.tokens.active', 'active'],
  ['columns.tokens.deleted', 'deleted'],
  ['columns.tokens.user', 'user.name']
])

//TODO check sort by number of packages
//TODO for now sort is with ASCII characters
