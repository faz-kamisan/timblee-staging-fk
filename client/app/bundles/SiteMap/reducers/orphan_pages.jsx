import { REMOVE_ORPHAN_PAGE, ADD_ORPHAN_PAGE } from '../actions/index'

function addOrphanPage(orphanPages, page, pageTypes) {
  var orphanPagesCopy = Object.assign([], orphanPages)
  var pageTypesCopy = Object.assign([], pageTypes);
  var pageType = pageTypesCopy.filter(function (pageType) { return pageType.id == page.page_type_id })[0]
  var newOrphanPage = Object.assign({}, page);
  newOrphanPage.page_type = pageType;
  orphanPagesCopy.push(newOrphanPage);
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
      return addOrphanPage(state, action.page, action.pageTypes)
    default:
      return state
  }
}

export default orphanPages
