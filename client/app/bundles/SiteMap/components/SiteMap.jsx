import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ConnectedSecionContainer from '../containers/connected_section_container';
import ConnectedHeader from '../containers/connected_header';
import ConnectedPublicHeader from '../containers/connected_public_header';
import ConnectedTrialHeader from '../containers/connected_trial_header'
import InductionSidebar from './induction_sidebar';
import ConnectedIntroductionScreenTwo from '../containers/connected_introduction_screen_two';
import ConnectedGuestInfoFormModal from '../containers/connected_guest_info_form_modal';
import ConnectedLeftSidebar from '../containers/connected_left_sidebar';
import ConnectedRightSidebar from '../containers/connected_right_sidebar';
import ConnectedFooter from '../containers/connected_footer';
import ConnectedDeletePageModal from '../containers/connected_delete_page_modal';
import ConnectedCommentDeleteModal from '../containers/connected_comment_delete_modal';
import ConnectedPageChangeModal from '../containers/connected_page_change_modal';
import ConnectedNewSectionModal from '../containers/connected_new_section_modal';
import ConnectedPageCommentsModal from '../containers/connected_page_comments_modal';
import ConnectedUpdateSectionNameModal from '../containers/connected_update_section_name_modal'
import ConnectedDeleteSectionModal from '../containers/connected_delete_section_modal'
import UserSignupModal from './user_signup_modal'
import CustomDragLayer from '../components/custom_drag_layer';

class SiteMap extends React.Component {
  render() {
    return (
      <div className={this.props.publicShare ? 'shared-view' : ''}>
        { !this.props.publicShare && !this.props.trial &&
          <ConnectedHeader />
        }
        { this.props.publicShare &&
          <ConnectedPublicHeader />
        }
        { this.props.trial &&
          <div>
            <ConnectedTrialHeader />
            <UserSignupModal sitemapId={this.props.sitemapId} />
          </div>
        }
        { !this.props.publicShare &&
          <ConnectedLeftSidebar />
        }
        { this.props.publicShare &&
          <InductionSidebar />
        }
        { !this.props.trial &&
          <ConnectedRightSidebar />
        }
        {
          this.props.publicShare &&
          <ConnectedIntroductionScreenTwo />
        }
        <div className={"scrollable-div-sitemaps " + (this.props.leftSidebarExpanded ? '' : 'left-bar-contracted')}>
          <ConnectedSecionContainer sitemapNumber='' />
        </div>
        <ConnectedFooter />
        { this.props.publicShare &&
          <div className="share-footer">
            <a href="https://timblee.io?utm_source=timblee&utm_medium=web-app&utm_campaign=general&utm_content=public-view-footer" target="_blank">
              <img src="/assets/Timblee-icon-footer.svg" alt=" "/>
              Designed with Timblee
            </a>
          </div>
        }
        <CustomDragLayer />
        <ConnectedGuestInfoFormModal />
        { !this.props.publicShare &&
          <div>
            <ConnectedDeletePageModal />
            <ConnectedPageChangeModal />
            <ConnectedNewSectionModal />
            <ConnectedDeleteSectionModal />
            <ConnectedUpdateSectionNameModal />
          </div>
        }
        { !this.props.trial &&
          <div>
            <ConnectedPageCommentsModal />
            <ConnectedCommentDeleteModal />
          </div>
        }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(SiteMap);
