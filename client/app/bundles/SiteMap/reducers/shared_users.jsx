import { ADD_SHARED_USERS } from '../actions/index'

function addSharedUsers(sharedUsers, emails) {
  var sharedUsersCopy = Object.assign([], sharedUsers)
  emails.forEach(function(email) {
    sharedUsersCopy.push({user_email: email, id: (new Date())})
  })
  return sharedUsersCopy
}

const sharedUsers = (state = [], action) => {
  switch (action.type) {
    case ADD_SHARED_USERS:
      return addSharedUsers(state, action.emails)
    default:
      return state
  }
}

export default sharedUsers
