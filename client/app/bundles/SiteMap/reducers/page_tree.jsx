import { UPDATE_PAGE_TREE } from '../actions/index'

const page_tree = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PAGE_TREE:
      return state
    default:
      return state
  }
}

export default page_tree
