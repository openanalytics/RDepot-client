interface LoginApiData {
  userName: string
  password: string
}

interface Login extends LoginApiData {
  error: boolean
  errorMessage: string
}

export type { Login, LoginApiData }
