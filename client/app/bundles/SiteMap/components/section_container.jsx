import React, { PropTypes } from 'react';
import { traverse, getNodeById, getNodeByAltSectionId } from '../helpers/tree_helper'
import DraggablePageContainer from './draggable_page_container'

class SectionContainer extends React.Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    activeSectionId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.changeActiveSectionId = this.changeActiveSectionId.bind(this);
    this.activeSection = this.activeSection.bind(this)
  }

  getDefaultSection(sections) {
    return(sections.filter(function(section) { return section.default })[0])
  }

  changeActiveSectionId(id) {
    this.props.changeActiveSectionId(id)
  }

  setSelectedSection(section) {
    this.props.setSelectedSection(section);
  }

  activeSection() {
    var _this = this
    return(this.props.sections.filter(function(section) { return(section.id == _this.props.activeSectionId) })[0])
  }

  componentWillReceiveProps(nextProps) {
    if((this.props.activeSectionLength < nextProps.activeSectionLength) || (nextProps.sections[nextProps.sections.length - 1].id != this.props.sections[this.props.sections.length - 1].id)) {
      this.props.changeActiveSectionId(nextProps.sections[nextProps.sections.length - 1].id)
    }
  }

  render() {
    var _this = this;
    var activeSections = this.props.sections.filter(function(section) {return(section.state == 'active')})
    var tabWidth = (100 / activeSections.length).toString() + '%'
    var defaultSection = this.getDefaultSection(this.props.sections)
    var renderedSectionTabs = activeSections.map(function(section, index) {
      return (
        <li key={section.id} className={'sitemap-section-tab' + (_this.props.activeSectionId == section.id ? ' active' : '')} onClick={function(e) { ($(e.target).closest('.remove-section').length == 0) ? _this.changeActiveSectionId(section.id) : '' } } style={ {width: tabWidth} }>
          { !section.default && !_this.props.publicShare &&
            <span>
              <span className='remove-section' onClick={function() {_this.setSelectedSection(section)} } data-target='#delete-section-modal' data-toggle='modal'>&times;</span>
              <span className='edit-section' onClick={function() {_this.setSelectedSection(section)} } data-target='#update-section-name-modal' data-toggle='modal'></span>
            </span>
          }
          <span className="truncate">{section.name}</span>
        </li>
      )
    })
    if(this.activeSection()) {
      var pageTree = this.activeSection().default ? this.activeSection().pageTree : getNodeByAltSectionId(defaultSection.pageTree, this.activeSection().id)
    } else {
      var pageTree = getNodeByAltSectionId(defaultSection.pageTree, this.props.sections[this.props.sections.length - 1].id)
    }

    if(this.props.leftSidebarExpanded) {
        var width = ((pageTree.children.filter(function(page) { return(page.state != 'archived' && page.state != 'orphan') }).length * 240) + 240)
      } else {
        var width = ((pageTree.children.filter(function(page) { return(page.state != 'archived' && page.state != 'orphan') }).length * 240) + 100 + 240)
      }
      if(this.props.publicShare) {
        width -= 170
      }
      width = width.toString() + 'px';

    return (
      <div className={'sitemap-sections' + (this.props.trial ? ' trial' : '')} style={{width: width}}>
        { (renderedSectionTabs.length > 1) &&
          <ul className={"section-list clearfix" + ((!this.props.publicShare && this.props.leftSidebarExpanded) ? ' left-bar-expanded' : ' left-bar-contracted') + (this.props.publicShare ? ' public-share' : '')}>
            {renderedSectionTabs}
          </ul>
        }
        <div className='sitemap-section'>
          <div>
            <DraggablePageContainer pageTree={pageTree} sitemapNumber='' sitemapId={_this.props.sitemapId} leftSidebarExpanded={_this.props.leftSidebarExpanded} publicShare={_this.props.publicShare} introSlideNumber={_this.props.introSlideNumber} setIntroSlideNumber={_this.props.setIntroSlideNumber} level={0} activeSectionId={_this.props.activeSectionId} />
          </div>
        </div>
      </div>
    );
  }
}

export default SectionContainer;
