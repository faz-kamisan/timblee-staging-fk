import { combineReducers } from 'redux'
import name from './name'
import id from './id'
import sections from './sections'
import pageTypes from './page_types'
import orphanPages from './orphan_pages'
import comments from './comments'
import state from './state'
import saving from './saving'
import updated_at from './updated_at'
import currentUser from './current_user'
import currentGuest from './current_guest'
import guestUsers from './guest_users'
import leftSidebarExpanded from './left_sidebar_expanded'
import showGuestInfoForm from './show_guest_info_form'
import showSitemapShareModal from './show_sitemap_share_modal'
import publicShareUrl from './public_share_url'
import business from './business'
import selectedPage from './selected_page'
import selectedComment from './selected_comment'
import selectedSection from './selected_section'
import publicShare from './public_share'
import footerPages from './footer_pages'
import maxPageUid from './max_page_uid'
import sharedUsers from './shared_users'
import newSitemap from './new_sitemap'
import trial from './trial'
import createdAt from './created_at'
import introSlideNumber from './intro_slide_number'
import activeSectionId from './active_section_id'

const sitemapAppReducer = combineReducers({
  name,
  id,
  updated_at,
  sections,
  pageTypes,
  orphanPages,
  state,
  saving,
  comments,
  leftSidebarExpanded,
  currentUser,
  currentGuest,
  guestUsers,
  showGuestInfoForm,
  publicShareUrl,
  showSitemapShareModal,
  business,
  selectedPage,
  selectedComment,
  selectedSection,
  publicShare,
  footerPages,
  maxPageUid,
  sharedUsers,
  newSitemap,
  trial,
  createdAt,
  introSlideNumber,
  activeSectionId
})

export default sitemapAppReducer
