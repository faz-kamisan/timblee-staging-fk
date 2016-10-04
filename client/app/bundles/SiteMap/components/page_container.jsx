import React, { PropTypes } from 'react';
import ConnectedPageTile from '../containers/connected_page_tile'
import ConnectedLevelSupport from '../containers/connected_level_support'
import ConnectedGutter from '../containers/connected_gutter'

class PageContainer extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
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
    if(this.props.pageTree.level == 0) {
      if(this.props.leftSidebarExpanded) {
        var width = ((children.length * 240) + 432).toString() + 'px'
      } else {
        var width = ((children.length * 240) + 60).toString() + 'px'
      }

      return (
        <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() } style={ { width: width } }>
          <ConnectedPageTile pageTree={this.props.pageTree} collapsed={this.props.pageTree.collapsed} childrenLength={children.length} sitemapNumber={this.props.sitemapNumber} name={this.props.pageTree.name} />
          <ConnectedGutter pageTree={this.props.pageTree} />
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
          <div className={ 'parent parent-' + this.props.pageTree.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '')}>
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return (
        <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() }>
          <ConnectedPageTile pageTree={this.props.pageTree} collapsed={this.props.pageTree.collapsed} childrenLength={children.length} sitemapNumber={this.props.sitemapNumber} name={this.props.pageTree.name} />
          <ConnectedGutter pageTree={this.props.pageTree} />
          <ConnectedLevelSupport pageTree={this.props.pageTree} />
          <div className={ 'parent parent-' + this.props.pageTree.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '')}>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

export default PageContainer;
