import { SHOW_SITEMAP_SHARE_MODAL } from '../actions/index'

const showSitemapShareModal = (state = false, action) => {
  switch (action.type) {
    case SHOW_SITEMAP_SHARE_MODAL:
      return action.value
    default:
      return state
  }
}

export default showSitemapShareModal
