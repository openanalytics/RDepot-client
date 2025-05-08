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

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')

const oldLinkDefinition =
  '"Link":{"type":"object","properties":{"href":{"type":"string"},"hreflang":{"type":"string"},"title":{"type":"string"},"type":{"type":"string"},"deprecation":{"type":"string"},"profile":{"type":"string"},"name":{"type":"string"},"templated":{"type":"boolean"}}}'
const newLinkDefinition =
  '"Link":{"type":"object","properties":{"type":{"type":"string"},"rel":{"type":"string"},"modifiableProperties":{"type":"array","items":{"type":"string"}},"href":{"type":"string"}}}'

const oldLinksDefinition =
  '"Links":{"type":"object","additionalProperties":{"$ref":"#/components/schemas/Link"}}'
const newLinksDefinition =
  '"Links":{"type":"array","items":{"$ref":"#/components/schemas/Link"}}'

const oldIDtoDefinition = '"IDto":{"type":"object"}'
const iDtoDefinition =
  '"IDto":{"type":"object","properties":{"name":{"type":"string"},"email":{"type":"string"},"login":{"type":"string"},"role":{"type":"string"},"expirationDate":{"type":"string"},"creationDate":{"type":"string"},"version":{"type":"string"},"technology":{"type":"string"},"repository":{"type":"object","properties":{"name":{"type":"string"},"technology":{"type":"string"}}},"user":{"type":"object","properties":{"email":{"type":"string"},"login":{"type":"string"},"name":{"type":"string"}}},"packageName":{"type":"string"},"state":{"type":"string"},"packageBag":{"type":"object","properties":{"name":{"type":"string"},"version":{"type":"string"},"repository":{"type":"object","properties":{"name":{"type":"string"}}}}}}}'

const openApiFile = 'scripts/api.json'

let openApiSpec = fs.readFileSync(openApiFile).toString()
if (openApiSpec.indexOf(oldLinkDefinition) >= 0) {
  openApiSpec = openApiSpec.replace(
    oldLinkDefinition,
    newLinkDefinition
  )
  console.log('replaced old Link definition')
}

if (openApiSpec.indexOf(oldLinksDefinition) >= 0) {
  openApiSpec = openApiSpec.replace(
    oldLinksDefinition,
    newLinksDefinition
  )
  console.log('replaced old Links definition')
}

if (openApiSpec.indexOf(oldIDtoDefinition) >= 0) {
  openApiSpec = openApiSpec.replace(
    oldIDtoDefinition,
    iDtoDefinition
  )
  console.log('replaced old IDto definition')
}

fs.writeFile(
  openApiFile,
  openApiSpec,
  'utf8',
  function (err) {
    if (err) return console.log(err)
    else console.log('saved to api.json')
  }
)
