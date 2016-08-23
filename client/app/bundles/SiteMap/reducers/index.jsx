import { combineReducers } from 'redux'
import name from './name'
import page_tree from './page_tree'

const sitemapAppReducer = combineReducers({
  name,
  page_tree
})

export default sitemapAppReducer
