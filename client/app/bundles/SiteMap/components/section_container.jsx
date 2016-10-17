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
    if(this.props.activeSectionLength > nextProps.activeSectionLength) {
      this.props.changeActiveSectionId(this.getDefaultSection(this.props.sections).id)
    } else if(this.props.activeSectionLength < nextProps.activeSectionLength) {
      this.props.changeActiveSectionId(nextProps.sections[nextProps.sections.length - 1].id)
    }
  }

  render() {
    var _this = this;
    var activeSections = this.props.sections.filter(function(section) {return(section.state == 'active')})
    var tabWidth = (100 / activeSections.length).toString() + '%'
    var defaultSection = this.getDefaultSection(this.props.sections)
    // var level = (!this.props.isDefaultSection) ? this.props.pageTree.level : this.props.pageTree.level
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
    var pageTree = this.activeSection().default ? this.activeSection().pageTree : getNodeByAltSectionId(defaultSection.pageTree, this.activeSection().id)
    return (
      <div className={'sitemap-sections' + (this.props.trial ? ' trial' : '')}>
        { (renderedSectionTabs.length > 1) &&
          <ul className={"section-list clearfix" + ((!this.props.publicShare && this.props.leftSidebarExpanded) ? ' left-bar-expanded' : ' left-bar-contracted') + (this.props.publicShare ? ' public-share' : '')}>
            {renderedSectionTabs}
          </ul>
        }
        <div className='sitemap-section'>
          <div>
            <DraggablePageContainer pageTree={pageTree} sitemapNumber='' sitemapId={_this.props.sitemapId} leftSidebarExpanded={_this.props.leftSidebarExpanded} publicShare={_this.props.publicShare} introSlideNumber={_this.props.introSlideNumber} setIntroSlideNumber={_this.props.setIntroSlideNumber} level={0} />
          </div>
        </div>
      </div>
    );
  }
}

export default SectionContainer;
