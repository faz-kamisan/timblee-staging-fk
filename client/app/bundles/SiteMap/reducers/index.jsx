import { combineReducers } from 'redux'
import name from './name'
import pageTree from './page_tree'

const sitemapAppReducer = combineReducers({
  name,
  pageTree
})

export default sitemapAppReducer
