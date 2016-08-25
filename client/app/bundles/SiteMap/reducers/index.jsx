import { combineReducers } from 'redux'
import name from './name'
import id from './id'
import pageTree from './page_tree'

const sitemapAppReducer = combineReducers({
  name,
  id,
  pageTree
})

export default sitemapAppReducer
