import { combineReducers } from 'redux'
import name from './name'
import id from './id'
import sections from './sections'
import pageTypes from './page_types'
import comments from './comments'
import state from './state'
import saving from './saving'


const sitemapAppReducer = combineReducers({
  name,
  id,
  sections,
  pageTypes,
  state,
  saving,
  comments
})

export default sitemapAppReducer
