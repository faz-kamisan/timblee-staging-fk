import { REMOVE_ORPHAN_PAGE, ADD_ORPHAN_PAGE } from '../actions/index'

function addOrphanPage(orphanPages, page, pageType) {
  var orphanPagesCopy = Object.assign([], orphanPages)
  var pageTypeCopy = Object.assign({}, pageType);
  pageTypeCopy.icon_name = pageTypeCopy.iconName
  var newOrphanPage = Object.assign({}, page);
  newOrphanPage.pageType = pageTypeCopy;
  orphanPagesCopy.push(newOrphanPage)
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
      return addOrphanPage(state, action.page, action.pageType)
    default:
      return state
  }
}

export default orphanPages
