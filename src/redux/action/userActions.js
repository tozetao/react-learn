export const AddUser = 'add_user'
export const RemoveUser = 'remove_user'
export const SetUsers = 'set_users'

export const getAddUserAction = (user) => {
  return {
    type: AddUser,
    payload: user
  }
}

export const getRemoveUserAction = (id) => ({
  type: RemoveUser,
  payload: id
})

export const getSetUsersAction = (list) => ({
  type: SetUsers,
  payload: list
})

// thunk action
// export const fetchUsers = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve, _reject) => {
//       setTimeout(() => {
//         console.log('request users')
//         console.log('before set: %o', getState())
  
//         const users = [
//           { id: 11, name: 'X' },
//           { id: 12, name: 'Y' },
//           { id: 13, name: 'Z' }
//         ]
//         dispatch(getSetUsersAction(users))
//         console.log('after set: %o', getState())

//         resolve()
//       }, 2000)
//     })
//   }
// }

// redux-promise action
// redux-promise允许action是一个Promise，它将根据Promise resolve返回的action去做一个分发。
export function fetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => {
      const users = [
        { id: 11, name: 'X' },
        { id: 12, name: 'Y' },
        { id: 13, name: 'Z' }
      ]
      resolve(getSetUsersAction(users))
    }, 2000)
  })
}

// 写法1
// export async function getUsers() {
//   // 发送获取用户的请求
//   const users = await fetchUsers()
//   return getSetUsersAction(users)
// }
// 写法2
// export async function getUsers(conditions) {
//   return {
//     type: SetUsers,
//     payload: fetchUsers(conditions).then(response => {
//       return response.list
//     })
//   }
// }
