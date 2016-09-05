import { connect } from 'react-redux'
import { changeCollapse } from '../actions'
import PageTile from '../components/page_tile'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCollapsedChanged: (id, sectionId) => {
      dispatch(changeCollapse(id, sectionId));
    }
  }
}

const ConnectedPageTile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTile)

export default ConnectedPageTile
