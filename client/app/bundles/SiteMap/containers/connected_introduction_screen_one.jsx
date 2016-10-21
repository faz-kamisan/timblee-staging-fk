import { connect } from 'react-redux'
import { setSaving, setSelectedSection, setIntroSlideNumber, changeUpdatedAt } from '../actions'
import IntroductionScreenOne from '../components/introduction_screen_one'

const mapStateToProps = (state) => {
  return { introSlideNumber: state.introSlideNumber }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIntroSlideNumber: (introSlideNumber) => {
      dispatch(setIntroSlideNumber(introSlideNumber))
    }
  }
}

const ConnectedIntroductionScreenOne = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroductionScreenOne)

export default ConnectedIntroductionScreenOne
