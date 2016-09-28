import { CHANGE_UPDATED_AT } from '../actions/index'

function getUpdatedAt() {
  var updatedAt = new Date,
    day = ("0" + updatedAt.getDate()).slice(-2),
    month = updatedAt.getMonthName(),
    year = updatedAt.getFullYear(),
    updatedAtFormatted = day + ' ' + month + ' ' + year
  return updatedAtFormatted;
}

const updated_at = (state = null, action) => {
  switch (action.type) {
    case CHANGE_UPDATED_AT:
      return getUpdatedAt()
    default:
      return state
  }
}

export default updated_at
