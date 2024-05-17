export const SetUser = 'SetUser'
export const RemoveUser = 'RemoveUser'
export const FetchUsers = 'FetchUsers'

export function getSetUserAction(value) {
  return {
    type: SetUser,
    payload: value
  }
}

export function getRemoveUserAction(id) {
  return {
    type: RemoveUser,
    payload: {
      id
    }
  }
}

export function getFetchUsersAction(conditions) {
  return {
    type: FetchUsers,
    payload: conditions
  }
}
