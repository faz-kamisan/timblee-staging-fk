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

  removeSection(id) {
    this.setState({currentSectionId: this.props})
    var index = this.props.sections.findIndex(function(section) {return(section.id == id)})
    this.props.removeSection(id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.sections.length != nextProps.sections.length) {
      this.setState({currentSectionId: this.getDefaultSectionId(this.props.sections)})
    }
  }

  render() {
    var _this = this;
    var tabWidth = (100 / this.props.sections.length).toString() + '%'
    var renderedSectionTabs = this.props.sections.map(function(section, index) {
      return (
        <li key={section.id} className={'sitemap-section-tab' + (_this.state.currentSectionId == section.id ? ' active' : '')} onClick={function(e) { _this.changeCurrentSectionId(section.id) } } style={ {width: tabWidth} }>
          { !section.default &&
            <span className='remove-section' onClick={function() {_this.removeSection(section.id)} }>&times;</span>
          }
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
            <div>
              <ConnectedFirstPageDroppable pageTree={section.pageTree} leftSidebarExpanded={_this.props.leftSidebarExpanded} />
            </div>
          }
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
