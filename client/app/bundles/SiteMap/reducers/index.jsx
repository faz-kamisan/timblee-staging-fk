import { combineReducers } from 'redux'
import name from './name'
import id from './id'
import pageTree from './page_tree'
import pageTypes from './page_types'
import comments from './comments'

const sitemapAppReducer = combineReducers({
  name,
  id,
  pageTree,
  pageTypes,
  comments
})

export default sitemapAppReducer
