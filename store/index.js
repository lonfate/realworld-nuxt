const cookieparser = process.server ? require('cookieparser') : undefined
//为了防止服务端运行时，运行的都是同一实例，防止数据冲突
export const state = () => {
    return {
        user: null
    }
}
export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}
export const actions ={
    //服务端特有的action方法，会在服务端渲染时，自动调用。
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setUser', user)
      }
}