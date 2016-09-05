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

  render() {
    var _this = this;
    var renderedSectionTabs = this.props.sections.map(function(section, index) {
      return (
        <li key={section.id} className={'sitemap-section-tab' + (_this.state.currentSectionId == section.id ? ' active' : '')} onClick={function(e) { _this.changeCurrentSectionId(section.id) } }>
          {section.name}
        </li>
      )
    })
    var renderedSections = this.props.sections.map(function(section, index) {
      return (
        <div key={section.id} className={'sitemap-section' + (_this.state.currentSectionId == section.id ? ' active' : ' hide')}>
          <DraggablePageContainer pageTree={section.pageTree} sitemapNumber='' sitemapId={_this.props.sitemapId} />
        </div>
      )
    })

    return (
      <div className='sitemap-sections'>
        <ul>
          {renderedSectionTabs}
        </ul>
        {renderedSections}
      </div>
    );
  }
}

export default SectionContainer;
