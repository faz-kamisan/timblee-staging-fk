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

  componentWillReceiveProps(nextProps) {
    if(this.props.activeSectionLength > nextProps.activeSectionLength) {
      this.props.changeActiveSectionId(this.getDefaultSection(this.props.sections.filter(function(section) {return(section.state == 'active')})).id)
      // this.setState({activeSectionId: this.getDefaultSection(this.props.sections.filter(function(section) {return(section.state == 'active')})).id})
    }
  }

  render() {
    var _this = this;
    var activeSections = this.props.sections.filter(function(section) {return(section.state == 'active')})
    var tabWidth = (100 / activeSections.length).toString() + '%'
    var defaultSection = this.getDefaultSection(this.props.sections)
    var renderedSectionTabs = activeSections.map(function(section, index) {
      return (
        <li key={section.id} className={'sitemap-section-tab' + (_this.props.activeSectionId == section.id ? ' active' : '')} onClick={function(e) { _this.changeActiveSectionId(section.id) } } style={ {width: tabWidth} }>
          { !section.default &&
            <span className='remove-section' onClick={function() {_this.setSelectedSection(section)} } data-target='#delete-section-modal' data-toggle='modal'>&times;</span>
          }
          <span className="truncate">{section.name}</span>
        </li>
      )
    })
    var renderedSections = activeSections.map(function(section, index) {
      var pageTree = section.default ? section.pageTree : getNodeByAltSectionId(defaultSection.pageTree, section.id)
      if(!section.default) {
        pageTree.alt_level = 0
        traverse(pageTree, function(page) {
          var parentPage = getNodeById(defaultSection.pageTree, page.parentId)
          if(parentPage.alt_section_id) {
            page.level = parentPage.alt_level + 1
          } else {
            page.level = parentPage.level + 1
          }
        })
      }
      return (
        <div key={section.id} className={'sitemap-section' + (_this.props.activeSectionId == section.id ? ' active' : ' hide')}>
          <div>
            <DraggablePageContainer pageTree={pageTree} sitemapNumber='' sitemapId={_this.props.sitemapId} leftSidebarExpanded={_this.props.leftSidebarExpanded} publicShare={_this.props.publicShare} introSlideNumber={_this.props.introSlideNumber} showNextSlide={_this.props.showNextSlide} isDefaultSection={_this.props.activeSectionId == defaultSection.id} />
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
