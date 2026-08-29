/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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

export interface NavbarReadyDetails {
  navbarId: string
  navbarStartId: string
  navbarCenterId: string
  navbarEndId: string
}

export class NavbarReadyEvent extends Event {
  static readonly EVENT_NAME = 'navbar-ready'

  readonly navbarId: string
  readonly navbarStartId: string
  readonly navbarCenterId: string
  readonly navbarEndId: string

  constructor(details: NavbarReadyDetails) {
    super(NavbarReadyEvent.EVENT_NAME)
    this.navbarId = details.navbarId
    this.navbarStartId = details.navbarStartId
    this.navbarCenterId = details.navbarCenterId
    this.navbarEndId = details.navbarEndId
  }
}
