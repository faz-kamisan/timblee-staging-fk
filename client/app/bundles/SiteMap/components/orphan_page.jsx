import React, { PropTypes } from 'react';

class OrphanPage extends React.Component {
  render() {
    return (
      <div className={"page-type-outer " + this.props.page.page_type.icon_name}>
        <div className="page-type-box">
          <aside className="page-type-details">
            <span className="dummy-number">xx</span>
            <h5>{this.props.page.name}</h5>
            <span className="dummy-id">
              <span className="dummy-state"></span> ID: xxx
            </span>
          </aside>
          <aside className="page-type-icon"></aside>
        </div>
        { !(this.props.isDragPrview) && <h4>{this.props.page.name}</h4> }
      </div>
    );
  }
}

export default OrphanPage;
