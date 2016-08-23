import { connect } from 'react-redux'
import { setName } from '../actions'
import Header from '../components/header'

const mapStateToProps = (state) => {
  return { name: state.name }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default ConnectedHeader
