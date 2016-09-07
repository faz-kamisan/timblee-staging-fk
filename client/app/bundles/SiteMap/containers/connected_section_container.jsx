import { connect } from 'react-redux'
import { updatePagePosition, addNewPage } from '../actions'
import SectionContainer from '../components/section_container'

const mapStateToProps = (state) => {
  return { sections: state.sections, sitemapId: state.id }
}

const ConnectedSecionContainer = connect(
  mapStateToProps
)(SectionContainer)

export default ConnectedSecionContainer
