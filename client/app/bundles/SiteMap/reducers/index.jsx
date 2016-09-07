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

const sitemapAppReducer = combineReducers({
  name,
  id,
  updated_at,
  sections,
  pageTypes,
  state,
  saving,
  comments,
  currentUser
})

export default sitemapAppReducer
