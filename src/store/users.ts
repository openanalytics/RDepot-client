import { login } from "@/services";
import { ActionContext } from "vuex";
import { State } from ".";
import { LoginApiData } from "@/models";
import { LoginType } from "@/enum/LoginType";

export interface UserState{
    userToken: String,
    userName: String,
    loginType: LoginType
}

type Context = ActionContext<UserState, State>;

const users_state = {
    state: () => ({
        userToken: "",
        userName: "",
        loginType: LoginType.DEFAULT
    }) as UserState,

    mutations:{
        setUserToken(state: UserState, payload: UserState) {
            state.userToken = payload.userToken
          },
        setLoginType(state: UserState, payload: LoginType){
            state.loginType = payload
        }
    },

    actions:{
        async login(context: Context, data: LoginApiData) {
            var response = await login(data)
            context.commit('setUserToken', {username: data.userName, token: response})
        },  
        chooseLoginType(context: Context, data: LoginType){
            context.commit('setLoginType', data);
        }
    }
}

export default users_state