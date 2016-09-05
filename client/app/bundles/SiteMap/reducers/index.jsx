import { combineReducers } from 'redux'
import name from './name'
import id from './id'
import sections from './sections'
import pageTypes from './page_types'
import comments from './comments'

const sitemapAppReducer = combineReducers({
  name,
  id,
  sections,
  pageTypes,
  comments
})

export default sitemapAppReducer
