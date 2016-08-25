import { combineReducers } from 'redux'
import name from './name'
import id from './id'
import pageTree from './page_tree'
import pageTypes from './page_types'

const sitemapAppReducer = combineReducers({
  name,
  id,
  pageTree,
  pageTypes
})

export default sitemapAppReducer
