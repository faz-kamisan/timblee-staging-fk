import { connect } from 'react-redux'
import { setSaving, setSelectedSection, incrementIntroSlideNumber, changeUpdatedAt } from '../actions'
import IntroductionScreens from '../components/introduction_screens'

const mapStateToProps = (state) => {
  return { introSlideNumber: state.introSlideNumber }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showNextSlide: () => {
      dispatch(incrementIntroSlideNumber())
    }
  }
}

const ConnectedIntroductionScreens = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroductionScreens)

export default ConnectedIntroductionScreens
