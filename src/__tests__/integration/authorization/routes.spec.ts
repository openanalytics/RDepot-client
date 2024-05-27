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

import { describe, it, expect, beforeEach } from 'vitest'
// import me from '@/__tests__/config/mockData/me.json'
// import users from '@/__tests__/config/mockData/users.json'
import { createPinia, setActivePinia } from 'pinia'

const {
  Builder,
  Browser,
  By,
  // Key,
  until
} = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
// const repositoryMaintainer = users.data.content[1]

let driver
const PASSWORD = 'testpassword'

beforeEach(async () => {
  setActivePinia(createPinia())
  driver = await new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions(
      new firefox.Options().addArguments('--headless')
    )
    .build()
})

// describe('Unauthenticated access', () => {
//   it('Login page', async () => {
//     try {
//       await driver.get('http://localhost:3001/login')
//       expect(
//         await driver.findElement(By.id('logo-oa'))
//       ).toBeTruthy()
//       expect(
//         await driver.wait(
//           until.titleIs('RDepot - login'),
//           1000
//         )
//       ).toBeTruthy()
//     } finally {
//       await driver.quit()
//     }
//   }),
//     it('Package page', async () => {
//       try {
//         await driver.get('http://localhost:3001/packages')
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Package maintainers page', async () => {
//       try {
//         await driver.get(
//           'http://localhost:3001/package-maintainers'
//         )
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Repositories page', async () => {
//       try {
//         await driver.get(
//           'http://localhost:3001/repositories'
//         )
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Repository maintainers page', async () => {
//       try {
//         await driver.get(
//           'http://localhost:3001/repository-maintainers'
//         )
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Users page', async () => {
//       try {
//         await driver.get('http://localhost:3001/users')
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Home page', async () => {
//       try {
//         await driver.get('http://localhost:3001/')
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Submissions page', async () => {
//       try {
//         await driver.get(
//           'http://localhost:3001/submissions'
//         )
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Upload package page', async () => {
//       try {
//         await driver.get(
//           'http://localhost:3001/upload-packages'
//         )
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Events page', async () => {
//       try {
//         await driver.get('http://localhost:3001/events')
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Access tokens page', async () => {
//       try {
//         await driver.get(
//           'http://localhost:3001/settings-tokens'
//         )
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     }),
//     it('Settings page', async () => {
//       try {
//         await driver.get(
//           'http://localhost:3001/settings-general'
//         )
//         expect(
//           await driver.findElement(By.id('logo-oa'))
//         ).toBeTruthy()
//         expect(
//           await driver.wait(
//             until.titleIs('RDepot - login'),
//             1000
//           )
//         ).toBeTruthy()
//       } finally {
//         await driver.quit()
//       }
//     })
// })

describe('Admin access', () => {
  it('Login page', async () => {
    try {
      await driver.get('http://localhost:3001/login')
      driver
        .findElement(By.id('username-input'))
        .sendKeys('einstein')
      driver
        .findElement(By.id('password-input'))
        .sendKeys(PASSWORD)
      driver
        .findElement(By.id('login-simple-button'))
        .click()
      expect(
        await driver.wait(
          until.titleIs('RDepot - packages'),
          1000
        )
      ).toBeTruthy()
      await driver
        .findElement(By.id('sidebaruploadpackages'))
        .click()
      expect(
        await driver.wait(
          until.titleIs('RDepot - upload packages'),
          5000
        )
      ).toBeTruthy()
    } finally {
      await driver.quit()
    }
  })
  //   it('Package page', async () => {
  //     try {
  //       await driver.get('http://localhost:3001/packages')
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Package maintainers page', async () => {
  //     try {
  //       await driver.get(
  //         'http://localhost:3001/package-maintainers'
  //       )
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Repositories page', async () => {
  //     try {
  //       await driver.get(
  //         'http://localhost:3001/repositories'
  //       )
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Repository maintainers page', async () => {
  //     try {
  //       await driver.get(
  //         'http://localhost:3001/repository-maintainers'
  //       )
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Users page', async () => {
  //     try {
  //       await driver.get('http://localhost:3001/users')
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Home page', async () => {
  //     try {
  //       await driver.get('http://localhost:3001/')
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Submissions page', async () => {
  //     try {
  //       await driver.get(
  //         'http://localhost:3001/submissions'
  //       )
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Upload package page', async () => {
  //     try {
  //       await driver.get(
  //         'http://localhost:3001/upload-packages'
  //       )
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Events page', async () => {
  //     try {
  //       await driver.get('http://localhost:3001/events')
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Access tokens page', async () => {
  //     try {
  //       await driver.get(
  //         'http://localhost:3001/settings-tokens'
  //       )
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   }),
  //   it('Settings page', async () => {
  //     try {
  //       await driver.get(
  //         'http://localhost:3001/settings-general'
  //       )
  //       expect(
  //         await driver.findElement(By.id('logo-oa'))
  //       ).toBeTruthy()
  //       expect(
  //         await driver.wait(
  //           until.titleIs('RDepot - login'),
  //           1000
  //         )
  //       ).toBeTruthy()
  //     } finally {
  //       await driver.quit()
  //     }
  //   })
})

// describe('Logging in', () => {
//   it('Log in', async () => {
//     try {
//       await driver.get('http://localhost:3001/login')
//       driver
//         .findElement(By.id('username-input'))
//         .sendKeys('einstein')
//       driver
//         .findElement(By.id('password-input'))
//         .sendKeys(PASSWORD)
//       driver
//         .findElement(By.id('login-simple-button'))
//         .click()
//       expect(
//         await driver.wait(
//           until.titleIs('RDepot - packages'),
//           1000
//         )
//       ).toBeTruthy()
//     } finally {
//       await driver.quit()
//     }
//   })
// })
