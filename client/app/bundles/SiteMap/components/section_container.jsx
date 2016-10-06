import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'
import DraggablePageContainer from './draggable_page_container'

class SectionContainer extends React.Component {
  static propTypes = {
    sections: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.changeCurrentSectionId = this.changeCurrentSectionId.bind(this);
    this.state = { currentSectionId: this.getDefaultSectionId(props.sections) }
  }

  getDefaultSectionId(sections) {
    return(sections.filter(function(section) { return section.default })[0].id)
  }

  changeCurrentSectionId(id) {
    this.setState({currentSectionId: id})
  }

  setSelectedSection(section) {
    this.props.setSelectedSection(section);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.activeSectionLength != nextProps.activeSectionLength) {
      this.setState({currentSectionId: this.getDefaultSectionId(this.props.sections.filter(function(section) {return(section.state == 'active')}))})
    }
  }

  render() {
    var _this = this;
    var activeSections = this.props.sections.filter(function(section) {return(section.state == 'active')})
    var tabWidth = (100 / activeSections.length).toString() + '%'
    var renderedSectionTabs = activeSections.map(function(section, index) {
      return (
        <li key={section.id} className={'sitemap-section-tab' + (_this.state.currentSectionId == section.id ? ' active' : '')} onClick={function(e) { _this.changeCurrentSectionId(section.id) } } style={ {width: tabWidth} }>
          { !section.default &&
            <span className='remove-section' onClick={function() {_this.setSelectedSection(section)} } data-target='#delete-section-modal' data-toggle='modal'>&times;</span>
          }
          <span className="truncate">{section.name}</span>
        </li>
      )
    })
    var renderedSections = activeSections.map(function(section, index) {
      return (
        <div key={section.id} className={'sitemap-section' + (_this.state.currentSectionId == section.id ? ' active' : ' hide')}>
          <div>
            <DraggablePageContainer pageTree={section.pageTree} sitemapNumber='' sitemapId={_this.props.sitemapId} leftSidebarExpanded={_this.props.leftSidebarExpanded} publicShare={_this.props.publicShare} introSlideNumber={_this.props.introSlideNumber} showNextSlide={_this.props.showNextSlide} />
          </div>
        </div>
      )
    })

    return (
      <div className={'sitemap-sections' + (this.props.trial ? ' trial' : '')}>
        <ul className={"section-list clearfix" + ((!this.props.publicShare && this.props.leftSidebarExpanded) ? ' left-bar-expanded' : ' left-bar-contracted') + (this.props.publicShare ? ' public-share' : '')}>
          {renderedSectionTabs}
        </ul>
        {renderedSections}
      </div>
    );
  }
}

export default SectionContainer;
