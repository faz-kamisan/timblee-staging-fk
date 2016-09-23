import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'
import DraggablePageContainer from './draggable_page_container'
import ConnectedFirstPageDroppable from '../containers/connected_first_page_droppable'

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
    var tabWidth = (100 / this.props.sections.length).toString() + '%'
    var renderedSectionTabs = this.props.sections.map(function(section, index) {
      return (
        <li key={section.id} className={'sitemap-section-tab' + (_this.state.currentSectionId == section.id ? ' active' : '')} onClick={function(e) { _this.changeCurrentSectionId(section.id) } } style={ {width: tabWidth} }>
          <span className="truncate">{section.name}</span>
        </li>
      )
    })
    var renderedSections = this.props.sections.map(function(section, index) {
      return (
        <div key={section.id} className={'sitemap-section' + (_this.state.currentSectionId == section.id ? ' active' : ' hide')}>
          <div>
            <DraggablePageContainer pageTree={section.pageTree} sitemapNumber='' sitemapId={_this.props.sitemapId} leftSidebarExpanded={_this.props.leftSidebarExpanded} publicShare={_this.props.publicShare} />
          </div>
          { (section.pageTree.children.filter(function(page) { return(page.state != 'archived') }).length == 0) &&
            <ConnectedFirstPageDroppable pageTree={section.pageTree} leftSidebarExpanded={_this.props.leftSidebarExpanded} />
          }
        </div>
      )
    })

    return (
      <div className='sitemap-sections'>
        <ul className={"section-list clearfix" + (this.props.leftSidebarExpanded? ' left-bar-expanded' : ' left-bar-contracted')}>
          {renderedSectionTabs}
        </ul>
        {renderedSections}
      </div>
    );
  }
}

export default SectionContainer;
