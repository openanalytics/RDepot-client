interface LoginApiData{
    userName: String,
    password: String
}

interface Login extends LoginApiData{
    error: Boolean,
    errorMessage: String
}

export { Login, LoginApiData }