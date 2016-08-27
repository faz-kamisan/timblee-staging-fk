import { connect } from 'react-redux'
import { setName } from '../actions'
import Header from '../components/header'

const mapStateToProps = (state) => {
  return { name: state.name, id: state.id }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => {
      dispatch(setName(name));
    }
  }
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default ConnectedHeader
