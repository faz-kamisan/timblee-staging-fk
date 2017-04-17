import { REMOVE_ORPHAN_PAGE, ADD_ORPHAN_PAGE } from '../actions/index'
import { traverse } from '../helpers/tree_helper'

function addOrphanPage(orphanPages, pageTree) {
  var orphanPagesCopy = Object.assign([], orphanPages)
  traverse(pageTree, function (page) {
    if (page.state == 'orphan') {
      var newOrphanPage = Object.assign({}, page);
      orphanPagesCopy.push(newOrphanPage);
    };
  })

  return orphanPagesCopy
}


function removePage(orphanPages, id) {
  var orphanPagesCopy = Object.assign([], orphanPages)
  orphanPagesCopy = orphanPagesCopy.filter(function(orphanPage) { return orphanPage.id != id })
  return orphanPagesCopy
}

const orphanPages = (state = [], action) => {
  switch (action.type) {
    case REMOVE_ORPHAN_PAGE:
      return removePage(state, action.id)
    case ADD_ORPHAN_PAGE:
      return addOrphanPage(state, action.page)
    default:
      return state
  }
}

export default orphanPages
