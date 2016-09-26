import { combineReducers } from 'redux'
import name from './name'
import id from './id'
import sections from './sections'
import pageTypes from './page_types'
import comments from './comments'
import state from './state'
import saving from './saving'
import updated_at from './updated_at'
import currentUser from './current_user'
import currentGuest from './current_guest'
import leftSidebarExpanded from './left_sidebar_expanded'
import showGuestInfoForm from './show_guest_info_form'
import showSitemapShareModal from './show_sitemap_share_modal'
import publicShareUrl from './public_share_url'
import business from './business'
import selectedPage from './selected_page'
import selectedComment from './selected_comment'
import publicShare from './public_share'
import footerPages from './footer_pages'
import maxPageUid from './max_page_uid'

const sitemapAppReducer = combineReducers({
  name,
  id,
  updated_at,
  sections,
  pageTypes,
  state,
  saving,
  comments,
  leftSidebarExpanded,
  currentUser,
  currentGuest,
  showGuestInfoForm,
  publicShareUrl,
  showSitemapShareModal,
  business,
  selectedPage,
  selectedComment,
  publicShare,
  footerPages,
  maxPageUid
})

export default sitemapAppReducer
