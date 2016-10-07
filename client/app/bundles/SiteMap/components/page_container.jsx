import React, { PropTypes } from 'react';
import ConnectedPageTile from '../containers/connected_page_tile'
import ConnectedLevelSupport from '../containers/connected_level_support'
import ConnectedGutter from '../containers/connected_gutter'
import ConnectedFirstPageDroppable from '../containers/connected_first_page_droppable'

class PageContainer extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    isDefaultSection: PropTypes.bool.isRequired,
    introSlideNumber: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.showNextSlide = this.showNextSlide.bind(this)
  }

  showNextSlide(e) {
    this.props.showNextSlide()
  }

  render() {
    var children = this.props.pageTree.children.filter(function(page) { return(page.state != 'archived') })
    var level = (!this.props.isDefaultSection && this.props.pageTree.alt_section_id) ? this.props.pageTree.alt_level : this.props.pageTree.level
    if(level == 0) {
      if(this.props.leftSidebarExpanded) {
        var width = ((children.length * 240) + 412 + 240).toString() + 'px'
      } else {
        var width = ((children.length * 240) + 100 + 240).toString() + 'px'
      }

      return (
        <div data-level={level} className={ 'page-container level-' + level.toString() + (this.props.leftSidebarExpanded ? '' : ' left-bar-contracted') + ((children.length == 0) ? ' no-children' : '') } style={ { width: width } }>
          <ConnectedPageTile pageTree={this.props.pageTree} collapsed={this.props.pageTree.collapsed} childrenLength={children.length} sitemapNumber={this.props.sitemapNumber} name={this.props.pageTree.name} />
          <ConnectedGutter pageTree={this.props.pageTree} />
          { (children.length == 0) &&
            <ConnectedFirstPageDroppable pageTree={this.props.pageTree} leftSidebarExpanded={this.props.leftSidebarExpanded} />
          }
          { this.props.publicShare &&
            <div className="intro-box-1">
              <div className={"intro-box share-1" + (this.props.introSlideNumber == 1 ? '' : ' hide')}>
                <span className="hotspot"></span>
                <figure>
                  <img alt=" " src="/assets/share-intro-1.png"></img>
                </figure>
                <p>Click on an individual page to add comments to that page</p>
                <a href="javascript:void(0);" onClick={this.showNextSlide}>Got it</a>
              </div>
            </div>
          }
          <ConnectedLevelSupport pageTree={this.props.pageTree} />
          <div className={ 'parent parent-' + level.toString() + (this.props.pageTree.collapsed ? ' hide' : '')}>
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return (
        <div data-level={level} className={ 'page-container level-' + level.toString() }>
          <ConnectedPageTile pageTree={this.props.pageTree} collapsed={this.props.pageTree.collapsed} childrenLength={children.length} sitemapNumber={this.props.sitemapNumber} name={this.props.pageTree.name} />
          <ConnectedGutter pageTree={this.props.pageTree} />
          <ConnectedLevelSupport pageTree={this.props.pageTree} />
          <div className={ 'parent parent-' + level.toString() + (this.props.pageTree.collapsed ? ' hide' : '')}>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

export default PageContainer;
