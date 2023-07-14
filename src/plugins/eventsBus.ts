/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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

import mitt, { Handler } from 'mitt'

const eventBus = mitt()

const USER_LOGGED_IN_EVENT = 'USER_LOGGED_IN_EVENT'
const USER_LOGGED_OUT_EVENT = 'USER_LOGGED_OUT_EVENT'

export function fireUserLoggedInEvent() {
  eventBus.emit(USER_LOGGED_IN_EVENT)
}

export function fireUserLoggedOutEvent() {
  eventBus.emit(USER_LOGGED_OUT_EVENT)
}

export let registerUserLoggedInEventListener = (
  callback: Handler
) => {
  eventBus.on(USER_LOGGED_IN_EVENT, callback)
}

export let registerUserLoggedOutEventListener = (
  callback: Handler
) => {
  eventBus.on(USER_LOGGED_OUT_EVENT, callback)
}
