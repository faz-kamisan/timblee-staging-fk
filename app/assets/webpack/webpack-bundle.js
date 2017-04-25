webpackJsonp([0],{

/***/ 0:
/*!*****************************************************!*\
  !*** ./app/bundles/SiteMap/startup/sitemap_app.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactOnRails = __webpack_require__(/*! react-on-rails */ 34);
	
	var _reactOnRails2 = _interopRequireDefault(_reactOnRails);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _redux = __webpack_require__(/*! redux */ 291);
	
	var _index = __webpack_require__(/*! ../reducers/index */ 314);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _connected_sitemap = __webpack_require__(/*! ../containers/connected_sitemap */ 354);
	
	var _connected_sitemap2 = _interopRequireDefault(_connected_sitemap);
	
	var _reduxLogger = __webpack_require__(/*! redux-logger */ 581);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// See documentation for https://github.com/reactjs/react-redux.
	// This is how you get props from the Rails view into the redux store.
	// This code here binds your smart component to the redux store.
	// railsContext provides contextual information especially useful for server rendering, such as
	// knowing the locale. See the React on Rails documentation for more info on the railsContext
	var SitemapApp = function SitemapApp(props, _railsContext) {
	  var logger = (0, _reduxLogger2.default)();
	  var store = (0, _redux.createStore)(_index2.default, props, (0, _redux.applyMiddleware)(logger));
	  var reactComponent = _react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_connected_sitemap2.default, null)
	  );
	  return reactComponent;
	};
	// This is how react_on_rails can see the Sitemap in the browser.
	_reactOnRails2.default.register({ SitemapApp: SitemapApp });

/***/ },

/***/ 314:
/*!************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/index.jsx ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 291);
	
	var _name = __webpack_require__(/*! ./name */ 315);
	
	var _name2 = _interopRequireDefault(_name);
	
	var _id = __webpack_require__(/*! ./id */ 317);
	
	var _id2 = _interopRequireDefault(_id);
	
	var _sections = __webpack_require__(/*! ./sections */ 318);
	
	var _sections2 = _interopRequireDefault(_sections);
	
	var _page_types = __webpack_require__(/*! ./page_types */ 328);
	
	var _page_types2 = _interopRequireDefault(_page_types);
	
	var _orphan_pages = __webpack_require__(/*! ./orphan_pages */ 329);
	
	var _orphan_pages2 = _interopRequireDefault(_orphan_pages);
	
	var _comments = __webpack_require__(/*! ./comments */ 330);
	
	var _comments2 = _interopRequireDefault(_comments);
	
	var _state = __webpack_require__(/*! ./state */ 331);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _saving = __webpack_require__(/*! ./saving */ 332);
	
	var _saving2 = _interopRequireDefault(_saving);
	
	var _updated_at = __webpack_require__(/*! ./updated_at */ 333);
	
	var _updated_at2 = _interopRequireDefault(_updated_at);
	
	var _current_user = __webpack_require__(/*! ./current_user */ 334);
	
	var _current_user2 = _interopRequireDefault(_current_user);
	
	var _current_guest = __webpack_require__(/*! ./current_guest */ 335);
	
	var _current_guest2 = _interopRequireDefault(_current_guest);
	
	var _guest_users = __webpack_require__(/*! ./guest_users */ 336);
	
	var _guest_users2 = _interopRequireDefault(_guest_users);
	
	var _left_sidebar_expanded = __webpack_require__(/*! ./left_sidebar_expanded */ 337);
	
	var _left_sidebar_expanded2 = _interopRequireDefault(_left_sidebar_expanded);
	
	var _show_guest_info_form = __webpack_require__(/*! ./show_guest_info_form */ 338);
	
	var _show_guest_info_form2 = _interopRequireDefault(_show_guest_info_form);
	
	var _show_sitemap_share_modal = __webpack_require__(/*! ./show_sitemap_share_modal */ 339);
	
	var _show_sitemap_share_modal2 = _interopRequireDefault(_show_sitemap_share_modal);
	
	var _public_share_url = __webpack_require__(/*! ./public_share_url */ 340);
	
	var _public_share_url2 = _interopRequireDefault(_public_share_url);
	
	var _business = __webpack_require__(/*! ./business */ 341);
	
	var _business2 = _interopRequireDefault(_business);
	
	var _selected_page = __webpack_require__(/*! ./selected_page */ 342);
	
	var _selected_page2 = _interopRequireDefault(_selected_page);
	
	var _selected_comment = __webpack_require__(/*! ./selected_comment */ 343);
	
	var _selected_comment2 = _interopRequireDefault(_selected_comment);
	
	var _selected_section = __webpack_require__(/*! ./selected_section */ 344);
	
	var _selected_section2 = _interopRequireDefault(_selected_section);
	
	var _public_share = __webpack_require__(/*! ./public_share */ 345);
	
	var _public_share2 = _interopRequireDefault(_public_share);
	
	var _footer_pages = __webpack_require__(/*! ./footer_pages */ 346);
	
	var _footer_pages2 = _interopRequireDefault(_footer_pages);
	
	var _max_page_uid = __webpack_require__(/*! ./max_page_uid */ 347);
	
	var _max_page_uid2 = _interopRequireDefault(_max_page_uid);
	
	var _shared_users = __webpack_require__(/*! ./shared_users */ 348);
	
	var _shared_users2 = _interopRequireDefault(_shared_users);
	
	var _new_sitemap = __webpack_require__(/*! ./new_sitemap */ 349);
	
	var _new_sitemap2 = _interopRequireDefault(_new_sitemap);
	
	var _trial = __webpack_require__(/*! ./trial */ 350);
	
	var _trial2 = _interopRequireDefault(_trial);
	
	var _created_at = __webpack_require__(/*! ./created_at */ 351);
	
	var _created_at2 = _interopRequireDefault(_created_at);
	
	var _intro_slide_number = __webpack_require__(/*! ./intro_slide_number */ 352);
	
	var _intro_slide_number2 = _interopRequireDefault(_intro_slide_number);
	
	var _active_section_id = __webpack_require__(/*! ./active_section_id */ 353);
	
	var _active_section_id2 = _interopRequireDefault(_active_section_id);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sitemapAppReducer = (0, _redux.combineReducers)({
	  name: _name2.default,
	  id: _id2.default,
	  updated_at: _updated_at2.default,
	  sections: _sections2.default,
	  pageTypes: _page_types2.default,
	  orphanPages: _orphan_pages2.default,
	  state: _state2.default,
	  saving: _saving2.default,
	  comments: _comments2.default,
	  leftSidebarExpanded: _left_sidebar_expanded2.default,
	  currentUser: _current_user2.default,
	  currentGuest: _current_guest2.default,
	  guestUsers: _guest_users2.default,
	  showGuestInfoForm: _show_guest_info_form2.default,
	  publicShareUrl: _public_share_url2.default,
	  showSitemapShareModal: _show_sitemap_share_modal2.default,
	  business: _business2.default,
	  selectedPage: _selected_page2.default,
	  selectedComment: _selected_comment2.default,
	  selectedSection: _selected_section2.default,
	  publicShare: _public_share2.default,
	  footerPages: _footer_pages2.default,
	  maxPageUid: _max_page_uid2.default,
	  sharedUsers: _shared_users2.default,
	  newSitemap: _new_sitemap2.default,
	  trial: _trial2.default,
	  createdAt: _created_at2.default,
	  introSlideNumber: _intro_slide_number2.default,
	  activeSectionId: _active_section_id2.default
	});
	
	exports.default = sitemapAppReducer;

/***/ },

/***/ 315:
/*!***********************************************!*\
  !*** ./app/bundles/SiteMap/reducers/name.jsx ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var name = function name() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_NAME:
	      return action.name;
	    default:
	      return state;
	  }
	};
	
	exports.default = name;

/***/ },

/***/ 316:
/*!***********************************************!*\
  !*** ./app/bundles/SiteMap/actions/index.jsx ***!
  \***********************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setName = setName;
	exports.addNewPage = addNewPage;
	exports.removePage = removePage;
	exports.removeFooterPage = removeFooterPage;
	exports.updatePageName = updatePageName;
	exports.updateFooterPageName = updateFooterPageName;
	exports.updatePagePersitence = updatePagePersitence;
	exports.updateFooterPagePersitence = updateFooterPagePersitence;
	exports.updatePagePosition = updatePagePosition;
	exports.changeCollapse = changeCollapse;
	exports.updateId = updateId;
	exports.updateState = updateState;
	exports.setSaving = setSaving;
	exports.changeUpdatedAt = changeUpdatedAt;
	exports.addPageComment = addPageComment;
	exports.addFooterPageComment = addFooterPageComment;
	exports.addGeneralComment = addGeneralComment;
	exports.updatePageCommentId = updatePageCommentId;
	exports.updateFooterPageCommentId = updateFooterPageCommentId;
	exports.updateGeneralCommentId = updateGeneralCommentId;
	exports.changeLeftSideBarExpanded = changeLeftSideBarExpanded;
	exports.setShowGuestInfoForm = setShowGuestInfoForm;
	exports.setCurrentGuest = setCurrentGuest;
	exports.showSitemapShareModal = showSitemapShareModal;
	exports.updateGeneralComment = updateGeneralComment;
	exports.updatePageComment = updatePageComment;
	exports.updateFooterPageComment = updateFooterPageComment;
	exports.deleteGeneralComment = deleteGeneralComment;
	exports.deletePageComment = deletePageComment;
	exports.deleteFooterPageComment = deleteFooterPageComment;
	exports.setSelectedPage = setSelectedPage;
	exports.setSelectedSection = setSelectedSection;
	exports.setSelectedComment = setSelectedComment;
	exports.changePageType = changePageType;
	exports.changeFooterPageType = changeFooterPageType;
	exports.createNewSection = createNewSection;
	exports.updatePageState = updatePageState;
	exports.updateFooterPageState = updateFooterPageState;
	exports.addNewFooterPage = addNewFooterPage;
	exports.addOrphanPageToFooter = addOrphanPageToFooter;
	exports.addOrphanPage = addOrphanPage;
	exports.removeOrphanPage = removeOrphanPage;
	exports.updateFooterPageId = updateFooterPageId;
	exports.setMaxPageUid = setMaxPageUid;
	exports.addSharedUsers = addSharedUsers;
	exports.removeSection = removeSection;
	exports.setIntroSlideNumber = setIntroSlideNumber;
	exports.updateSectionId = updateSectionId;
	exports.changeActiveSectionId = changeActiveSectionId;
	exports.updateSectionName = updateSectionName;
	var SET_NAME = exports.SET_NAME = 'SET_NAME';
	var ADD_NEW_PAGE = exports.ADD_NEW_PAGE = 'ADD_NEW_PAGE';
	var REMOVE_PAGE = exports.REMOVE_PAGE = 'REMOVE_PAGE';
	var REMOVE_FOOTER_PAGE = exports.REMOVE_FOOTER_PAGE = 'REMOVE_FOOTER_PAGE';
	var UPDATE_PAGE_POSITION = exports.UPDATE_PAGE_POSITION = 'UPDATE_PAGE_POSITION';
	var UPDATE_PAGE_NAME = exports.UPDATE_PAGE_NAME = 'UPDATE_PAGE_NAME';
	var UPDATE_FOOTER_PAGE_NAME = exports.UPDATE_FOOTER_PAGE_NAME = 'UPDATE_FOOTER_PAGE_NAME';
	var UPDATE_PAGE_PERSISTENCE = exports.UPDATE_PAGE_PERSISTENCE = 'UPDATE_PAGE_PERSISTENCE';
	var UPDATE_FOOTER_PAGE_PERSISTENCE = exports.UPDATE_FOOTER_PAGE_PERSISTENCE = 'UPDATE_FOOTER_PAGE_PERSISTENCE';
	var CHANGE_COLLAPSE = exports.CHANGE_COLLAPSE = 'CHANGE_COLLAPSE';
	var UPDATE_ID = exports.UPDATE_ID = 'UPDATE_ID';
	var CHANGE_STATE = exports.CHANGE_STATE = 'CHANGE_STATE';
	var SET_SAVING = exports.SET_SAVING = 'SET_SAVING';
	var CHANGE_UPDATED_AT = exports.CHANGE_UPDATED_AT = 'CHANGE_UPDATED_AT';
	var ADD_PAGE_COMMENT = exports.ADD_PAGE_COMMENT = 'ADD_PAGE_COMMENT';
	var ADD_FOOTER_PAGE_COMMENT = exports.ADD_FOOTER_PAGE_COMMENT = 'ADD_FOOTER_PAGE_COMMENT';
	var ADD_GENERAL_COMMENT = exports.ADD_GENERAL_COMMENT = 'ADD_GENERAL_COMMENT';
	var UPDATE_PAGE_COMMENT_ID = exports.UPDATE_PAGE_COMMENT_ID = 'UPDATE_PAGE_COMMENT_ID';
	var UPDATE_FOOTER_PAGE_COMMENT_ID = exports.UPDATE_FOOTER_PAGE_COMMENT_ID = 'UPDATE_FOOTER_PAGE_COMMENT_ID';
	var UPDATE_GENERAL_COMMENT_ID = exports.UPDATE_GENERAL_COMMENT_ID = 'UPDATE_GENERAL_COMMENT_ID';
	var CHANGE_LEFT_SIDEBAR_EXPANDED = exports.CHANGE_LEFT_SIDEBAR_EXPANDED = 'CHANGE_LEFT_SIDEBAR_EXPANDED';
	var SET_SHOW_GUEST_INFO_FORM = exports.SET_SHOW_GUEST_INFO_FORM = 'SET_SHOW_GUEST_INFO_FORM';
	var SET_CURRENT_GUEST = exports.SET_CURRENT_GUEST = 'SET_CURRENT_GUEST';
	var SHOW_SITEMAP_SHARE_MODAL = exports.SHOW_SITEMAP_SHARE_MODAL = 'SHOW_SITEMAP_SHARE_MODAL';
	var UPDATE_GENERAL_COMMENT = exports.UPDATE_GENERAL_COMMENT = 'UPDATE_GENERAL_COMMENT';
	var UPDATE_PAGE_COMMENT = exports.UPDATE_PAGE_COMMENT = 'UPDATE_PAGE_COMMENT';
	var UPDATE_FOOTER_PAGE_COMMENT = exports.UPDATE_FOOTER_PAGE_COMMENT = 'UPDATE_FOOTER_PAGE_COMMENT';
	var DELETE_GENERAL_COMMENT = exports.DELETE_GENERAL_COMMENT = 'DELETE_GENERAL_COMMENT';
	var DELETE_PAGE_COMMENT = exports.DELETE_PAGE_COMMENT = 'DELETE_PAGE_COMMENT';
	var DELETE_FOOTER_PAGE_COMMENT = exports.DELETE_FOOTER_PAGE_COMMENT = 'DELETE_FOOTER_PAGE_COMMENT';
	var SET_SELECTED_PAGE = exports.SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
	var SET_SELECTED_SECTION = exports.SET_SELECTED_SECTION = 'SET_SELECTED_SECTION';
	var SET_SELECTED_COMMENT = exports.SET_SELECTED_COMMENT = 'SET_SELECTED_COMMENT';
	var CHANGE_PAGE_TYPE = exports.CHANGE_PAGE_TYPE = 'CHANGE_PAGE_TYPE';
	var CHANGE_FOOTER_PAGE_TYPE = exports.CHANGE_FOOTER_PAGE_TYPE = 'CHANGE_FOOTER_PAGE_TYPE';
	var CREATE_NEW_SECTION = exports.CREATE_NEW_SECTION = 'CREATE_NEW_SECTION';
	var UPDATE_PAGE_STATE = exports.UPDATE_PAGE_STATE = 'UPDATE_PAGE_STATE';
	var UPDATE_FOOTER_PAGE_STATE = exports.UPDATE_FOOTER_PAGE_STATE = 'UPDATE_FOOTER_PAGE_STATE';
	var REMOVE_ORPHAN_PAGE = exports.REMOVE_ORPHAN_PAGE = 'REMOVE_ORPHAN_PAGE';
	var ADD_ORPHAN_PAGE_TO_FOOTER = exports.ADD_ORPHAN_PAGE_TO_FOOTER = 'ADD_ORPHAN_PAGE_TO_FOOTER';
	var ADD_ORPHAN_PAGE = exports.ADD_ORPHAN_PAGE = 'ADD_ORPHAN_PAGE';
	var ADD_NEW_FOOTER_PAGE = exports.ADD_NEW_FOOTER_PAGE = 'ADD_NEW_FOOTER_PAGE';
	var UPDATE_FOOTER_PAGE_ID = exports.UPDATE_FOOTER_PAGE_ID = 'UPDATE_FOOTER_PAGE_ID';
	var SET_MAX_PAGE_UID = exports.SET_MAX_PAGE_UID = 'SET_MAX_PAGE_UID';
	var ADD_SHARED_USERS = exports.ADD_SHARED_USERS = 'ADD_SHARED_USERS';
	var REMOVE_SECTION = exports.REMOVE_SECTION = 'REMOVE_SECTION';
	var SET_INTRO_SLIDE_NUMBER = exports.SET_INTRO_SLIDE_NUMBER = 'SET_INTRO_SLIDE_NUMBER';
	var UPDATE_SECTION_ID = exports.UPDATE_SECTION_ID = 'UPDATE_SECTION_ID';
	var CHANGE_ACTIVE_SECTION_ID = exports.CHANGE_ACTIVE_SECTION_ID = 'CHANGE_ACTIVE_SECTION_ID';
	var UPDATE_SECTION_NAME = exports.UPDATE_SECTION_NAME = 'UPDATE_SECTION_NAME';
	
	function setName(name) {
	  return { type: SET_NAME, name: name };
	}
	
	function addNewPage(sectionId, pageType, parentId, position, timeStamp, uid) {
	  return { type: ADD_NEW_PAGE, sectionId: sectionId, pageType: pageType, parentId: parentId, position: position, timeStamp: timeStamp, uid: uid };
	}
	
	function removePage(id, sectionId) {
	  return { type: REMOVE_PAGE, id: id, sectionId: sectionId };
	}
	
	function removeFooterPage(id) {
	  return { type: REMOVE_FOOTER_PAGE, id: id };
	}
	
	function updatePageName(id, sectionId, name) {
	  return { type: UPDATE_PAGE_NAME, id: id, sectionId: sectionId, name: name };
	}
	
	function updateFooterPageName(id, name) {
	  return { type: UPDATE_FOOTER_PAGE_NAME, id: id, name: name };
	}
	
	function updatePagePersitence(id, sectionId) {
	  return { type: UPDATE_PAGE_PERSISTENCE, id: id, sectionId: sectionId };
	}
	
	function updateFooterPagePersitence(id, sectionId) {
	  return { type: UPDATE_FOOTER_PAGE_PERSISTENCE, id: id };
	}
	
	function updatePagePosition(id, sectionId, newParentId, position) {
	  return { type: UPDATE_PAGE_POSITION, id: id, sectionId: sectionId, newParentId: newParentId, position: position };
	}
	
	function changeCollapse(id, sectionId, section_id) {
	  return { type: CHANGE_COLLAPSE, id: id, sectionId: sectionId };
	}
	
	function updateId(id, sectionId, newId) {
	  return { type: UPDATE_ID, id: id, sectionId: sectionId, newId: newId };
	}
	
	function updateState(state) {
	  return { type: CHANGE_STATE, state: state };
	}
	
	function setSaving(saving) {
	  return { type: SET_SAVING, saving: saving };
	}
	
	function changeUpdatedAt() {
	  return { type: CHANGE_UPDATED_AT };
	}
	
	function addPageComment(id, message, commenter, sectionId, tempId) {
	  return { type: ADD_PAGE_COMMENT, id: id, message: message, commenter: commenter, sectionId: sectionId, tempId: tempId };
	}
	
	function addFooterPageComment(id, message, commenter, tempId) {
	  return { type: ADD_FOOTER_PAGE_COMMENT, id: id, message: message, commenter: commenter, tempId: tempId };
	}
	
	function addGeneralComment(message, commenter, tempId) {
	  return { type: ADD_GENERAL_COMMENT, message: message, commenter: commenter, tempId: tempId };
	}
	
	function updatePageCommentId(oldId, newId, sectionId, pageId) {
	  return { type: UPDATE_PAGE_COMMENT_ID, oldId: oldId, newId: newId, sectionId: sectionId, pageId: pageId };
	}
	
	function updateFooterPageCommentId(oldId, newId, pageId) {
	  return { type: UPDATE_FOOTER_PAGE_COMMENT_ID, oldId: oldId, newId: newId, pageId: pageId };
	}
	
	function updateGeneralCommentId(oldId, newId) {
	  return { type: UPDATE_GENERAL_COMMENT_ID, oldId: oldId, newId: newId };
	}
	
	function changeLeftSideBarExpanded(expanded) {
	  return { type: CHANGE_LEFT_SIDEBAR_EXPANDED, expanded: expanded };
	}
	
	function setShowGuestInfoForm(showGuestInfoForm) {
	  return { type: SET_SHOW_GUEST_INFO_FORM, showGuestInfoForm: showGuestInfoForm };
	}
	
	function setCurrentGuest(name, email) {
	  return { type: SET_CURRENT_GUEST, name: name, email: email };
	}
	
	function showSitemapShareModal(value) {
	  return { type: SHOW_SITEMAP_SHARE_MODAL, value: value };
	}
	
	function updateGeneralComment(id, message) {
	  return { type: UPDATE_GENERAL_COMMENT, id: id, message: message };
	}
	
	function updatePageComment(id, pageId, message, sectionId) {
	  return { type: UPDATE_PAGE_COMMENT, id: id, pageId: pageId, message: message, sectionId: sectionId };
	}
	
	function updateFooterPageComment(id, pageId, message) {
	  return { type: UPDATE_FOOTER_PAGE_COMMENT, id: id, pageId: pageId, message: message };
	}
	
	function deleteGeneralComment(id) {
	  return { type: DELETE_GENERAL_COMMENT, id: id };
	}
	
	function deletePageComment(commentId, pageId, sectionId) {
	  return { type: DELETE_PAGE_COMMENT, commentId: commentId, pageId: pageId, sectionId: sectionId };
	}
	
	function deleteFooterPageComment(commentId, pageId) {
	  return { type: DELETE_FOOTER_PAGE_COMMENT, commentId: commentId, pageId: pageId };
	}
	
	function setSelectedPage(page) {
	  return { type: SET_SELECTED_PAGE, page: page };
	}
	
	function setSelectedSection(section) {
	  return { type: SET_SELECTED_SECTION, section: section };
	}
	
	function setSelectedComment(comment) {
	  return { type: SET_SELECTED_COMMENT, comment: comment };
	}
	
	function changePageType(pageId, sectionId, pageType) {
	  return { type: CHANGE_PAGE_TYPE, pageId: pageId, sectionId: sectionId, pageType: pageType };
	}
	
	function changeFooterPageType(pageId, pageType) {
	  return { type: CHANGE_FOOTER_PAGE_TYPE, pageId: pageId, pageType: pageType };
	}
	
	function createNewSection(pageId, sectionId, newSectionName, timeStamp) {
	  return { type: CREATE_NEW_SECTION, pageId: pageId, sectionId: sectionId, newSectionName: newSectionName, timeStamp: timeStamp };
	}
	
	function updatePageState(pageId, sectionId, state) {
	  return { type: UPDATE_PAGE_STATE, pageId: pageId, sectionId: sectionId, state: state };
	}
	
	function updateFooterPageState(pageId, state) {
	  return { type: UPDATE_FOOTER_PAGE_STATE, pageId: pageId, state: state };
	}
	
	function addNewFooterPage(pageType, timeStamp, uid) {
	  return { type: ADD_NEW_FOOTER_PAGE, pageType: pageType, timeStamp: timeStamp, uid: uid };
	}
	
	function addOrphanPageToFooter(page) {
	  return { type: ADD_ORPHAN_PAGE_TO_FOOTER, page: page };
	}
	
	function addOrphanPage(page) {
	  return { type: ADD_ORPHAN_PAGE, page: page };
	}
	
	function removeOrphanPage(id) {
	  return { type: REMOVE_ORPHAN_PAGE, id: id };
	}
	
	function updateFooterPageId(oldId, newId) {
	  return { type: UPDATE_FOOTER_PAGE_ID, oldId: oldId, newId: newId };
	}
	
	function setMaxPageUid(uid) {
	  return { type: SET_MAX_PAGE_UID, uid: uid };
	}
	
	function addSharedUsers(emails) {
	  return { type: ADD_SHARED_USERS, emails: emails };
	}
	
	function removeSection(id) {
	  return { type: REMOVE_SECTION, id: id };
	}
	
	function setIntroSlideNumber(introSlideNumber) {
	  return { type: SET_INTRO_SLIDE_NUMBER, introSlideNumber: introSlideNumber };
	}
	
	function updateSectionId(oldId, newId) {
	  return { type: UPDATE_SECTION_ID, oldId: oldId, newId: newId };
	}
	
	function changeActiveSectionId(sectionId) {
	  return { type: CHANGE_ACTIVE_SECTION_ID, sectionId: sectionId };
	}
	
	function updateSectionName(section_id, newName) {
	  return { type: UPDATE_SECTION_NAME, section_id: section_id, newName: newName };
	}

/***/ },

/***/ 317:
/*!*********************************************!*\
  !*** ./app/bundles/SiteMap/reducers/id.jsx ***!
  \*********************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var id = function id() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = id;

/***/ },

/***/ 318:
/*!***************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/sections.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	var sections = function sections() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.ADD_NEW_PAGE:
	      return (0, _tree_helper.addPage)(state, action.sectionId, action.pageType, action.parentId, action.position, action.timeStamp, action.uid);
	    case _index.REMOVE_PAGE:
	      return (0, _tree_helper.removePage)(state, action.id, action.sectionId);
	    case _index.UPDATE_PAGE_POSITION:
	      return (0, _tree_helper.updatePagePosition)(state, action.id, action.sectionId, action.newParentId, action.position);
	    case _index.UPDATE_PAGE_NAME:
	      return (0, _tree_helper.updatePageName)(state, action.id, action.sectionId, action.name);
	    case _index.UPDATE_PAGE_PERSISTENCE:
	      return (0, _tree_helper.updatePagePersitence)(state, action.id, action.sectionId);
	    case _index.CHANGE_COLLAPSE:
	      return (0, _tree_helper.updateCollapse)(state, action.id, action.sectionId);
	    case _index.UPDATE_ID:
	      return (0, _tree_helper.updatePageId)(state, action.id, action.sectionId, action.newId);
	    case _index.ADD_PAGE_COMMENT:
	      return (0, _tree_helper.addPageComment)(state, action.id, action.sectionId, action.commenter, action.message, action.tempId);
	    case _index.UPDATE_PAGE_COMMENT_ID:
	      return (0, _tree_helper.updateCommentId)(state, action.oldId, action.newId, action.sectionId, action.pageId);
	    case _index.UPDATE_PAGE_COMMENT:
	      return (0, _tree_helper.updatePageComment)(state, action.id, action.message, action.sectionId, action.pageId);
	    case _index.CHANGE_PAGE_TYPE:
	      return (0, _tree_helper.updatePageType)(state, action.pageId, action.sectionId, action.pageType);
	    case _index.CREATE_NEW_SECTION:
	      return (0, _tree_helper.createNewSection)(state, action.pageId, action.sectionId, action.newSectionName, action.timeStamp);
	    case _index.UPDATE_SECTION_ID:
	      return (0, _tree_helper.updateSectionId)(state, action.oldId, action.newId);
	    case _index.UPDATE_SECTION_NAME:
	      return (0, _tree_helper.updateSectionName)(state, action.section_id, action.newName);
	    case _index.REMOVE_SECTION:
	      return (0, _tree_helper.removeSection)(state, action.id);
	    case _index.UPDATE_PAGE_STATE:
	      return (0, _tree_helper.updatePageState)(state, action.pageId, action.sectionId, action.state);
	    case _index.DELETE_PAGE_COMMENT:
	      return (0, _tree_helper.deletePageComment)(state, action.commentId, action.pageId, action.sectionId);
	    default:
	      return state;
	  }
	};
	
	exports.default = sections;

/***/ },

/***/ 319:
/*!****************************************************!*\
  !*** ./app/bundles/SiteMap/helpers/tree_helper.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getNodeById = exports.getNodeByAltSectionId = exports.updateSectionName = exports.updateSectionId = exports.removeSection = exports.updatePagePersitence = exports.updatePageComment = exports.deletePageComment = exports.updatePageState = exports.createNewSection = exports.updatePageType = exports.updateCommentId = exports.addPageComment = exports.updatePageId = exports.updateCollapse = exports.traverse = exports.updatePageName = exports.updatePagePosition = exports.removePage = exports.addPage = undefined;
	
	var _deepcopy = __webpack_require__(/*! deepcopy */ 320);
	
	var _deepcopy2 = _interopRequireDefault(_deepcopy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function addPage(sections, sectionId, pageType, parentId, position, tempId, uid) {
	  var sectionsCopy = (0, _deepcopy2.default)(sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var pageTypeCopy = Object.assign({}, pageType);
	  pageTypeCopy.icon_name = pageTypeCopy.iconName || pageTypeCopy.icon_name;
	  delete pageTypeCopy.iconName;
	  var parentPage = getNodeById(treeCopy, parentId),
	      parentLevel = parentPage.level;
	  var newPage = { name: pageTypeCopy.name, pageType: pageTypeCopy, parentId: parentId, level: parentLevel + 1, children: [], comments: [], collapsed: false, state: 'active', id: tempId, uid: uid, section_id: sectionId, footer: false, newRecord: true };
	  if (position == 'begining') {
	    parentPage.children.unshift(newPage);
	  } else {
	    var indexToAddPage = parentPage.children.findIndex(function (page) {
	      return page.position == position;
	    });
	    parentPage.children.splice(indexToAddPage + 1, 0, newPage);
	  }
	  for (var index = 0; index < parentPage.children.length; index++) {
	    parentPage.children[index].position = index + 1;
	  }
	  return sectionsCopy;
	}
	
	function updatePageName(sections, id, sectionId, name) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id);
	  page.name = name;
	  return sectionsCopy;
	}
	
	function updatePagePersitence(sections, id, sectionId) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id);
	  page.newRecord = false;
	  return sectionsCopy;
	}
	
	function updatePageId(sections, id, sectionId, newId) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id);
	  page.id = newId;
	  return sectionsCopy;
	}
	
	function updateCollapse(sections, id, sectionId) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id);
	  page.collapsed = !page.collapsed;
	  return sectionsCopy;
	}
	
	function updatePagePosition(sections, id, sectionId, newParentId, position) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id),
	      newParentPage = getNodeById(treeCopy, newParentId),
	      oldParentPage = getNodeById(treeCopy, page.parentId);
	  oldParentPage.children.removeIf(function (elem, idx) {
	    return elem.id == id;
	  });
	  page.parentId = newParentPage.id;
	  page.state = 'active';
	  //  Insert at begining.
	  if (position == 'begining') {
	    newParentPage.children.unshift(page);
	  } else {
	    // when only sorting in same scope
	    var indexToAddPage = newParentPage.children.findIndex(function (page) {
	      return page.position == position;
	    });
	    newParentPage.children.splice(indexToAddPage + 1, 0, page);
	  }
	  for (var index = 0; index < newParentPage.children.length; index++) {
	    newParentPage.children[index].position = index + 1;
	  }
	  traverse(page, function (node) {
	    var parentNode = getNodeById(treeCopy, node.parentId);
	    node.level = parentNode.level + 1;
	  });
	  return sectionsCopy;
	}
	
	function removePage(sections, id, sectionId) {
	  var sectionsCopy = (0, _deepcopy2.default)(sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id);
	  page.state = 'archived';
	  if (page.alt_section_id) {
	    sectionsCopy.removeIf(function (section) {
	      return section.id == page.alt_section_id;
	    });
	  }
	  traverse(page, function (node) {
	    node.state = 'archived';
	  });
	  return sectionsCopy;
	}
	
	function addPageComment(sections, id, sectionId, commenter, message, tempId) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id);
	  var newComment = { message: message, commenter: commenter, id: tempId, created_at: 'Just now', state: 'active' };
	  page.comments.push(newComment);
	  return (0, _deepcopy2.default)(sectionsCopy);
	}
	
	function updateCommentId(sections, oldId, newId, sectionId, pageId) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, pageId);
	  var comment = page.comments.filter(function (comment) {
	    return comment.id == oldId;
	  })[0];
	  comment.id = newId;
	  return (0, _deepcopy2.default)(sectionsCopy);
	}
	
	function updatePageComment(sections, id, message, sectionId, pageId) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, pageId);
	  var comment = page.comments.filter(function (comment) {
	    return comment.id == id;
	  })[0];
	  comment.message = message;
	  return sectionsCopy;
	}
	
	function updatePageType(sections, id, sectionId, pageType) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id);
	  page.pageType = pageType;
	  return sectionsCopy;
	}
	
	function deletePageComment(sections, commentId, pageId, sectionId) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, pageId);
	  page.comments.removeIf(function (comment) {
	    return comment.id == commentId;
	  });
	  return (0, _deepcopy2.default)(sectionsCopy);
	}
	
	function createNewSection(sections, id, sectionId, newSectionName, timeStamp) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, id);
	  var parentPage = getNodeById(treeCopy, page.parentId);
	  page.alt_section_id = timeStamp;
	  page.collapsed = false;
	  traverse(page, function (node) {
	    if (page.id != node.id && node.section_id == sectionId) {
	      node.section_id = timeStamp;
	    }
	  });
	  var newSection = { default: false, name: newSectionName, pageTree: page, id: timeStamp, state: 'active' };
	  sectionsCopy.push(newSection);
	  return sectionsCopy;
	}
	
	function updateSectionId(sections, oldId, newId) {
	  var sectionsCopy = Object.assign([], sections);
	  var section = sectionsCopy.filter(function (section) {
	    return section.id == oldId;
	  })[0];
	  section.id = newId;
	  section.pageTree.alt_section_id = newId;
	  traverse(section.pageTree, function (node) {
	    if (section.pageTree.id != node.id && node.section_id == oldId) {
	      node.section_id = newId;
	    }
	  });
	  return sectionsCopy;
	}
	
	function updateSectionName(sections, section_id, newName) {
	  var sectionsCopy = Object.assign([], sections);
	  var section = sectionsCopy.filter(function (section) {
	    return section.id == section_id;
	  })[0];
	  section.name = newName;
	  return sectionsCopy;
	}
	
	function removeSection(sections, id) {
	  var sectionsCopy = Object.assign([], sections);
	  var section = sectionsCopy.filter(function (section) {
	    return section.id == id;
	  })[0];
	  var defaultSection = sections.filter(function (section) {
	    return section.default;
	  })[0];
	  var sectionPage = getNodeByAltSectionId(defaultSection.pageTree, id);
	  sectionPage.alt_section_id = null;
	  traverse(sectionPage, function (node) {
	    if (sectionPage.id != node.id && node.section_id == id) {
	      node.section_id = sectionPage.section_id;
	    }
	  });
	  sectionsCopy.removeIf(function (section) {
	    return section.id == id;
	  });
	  section.state = 'archived';
	  return sectionsCopy;
	}
	
	function updatePageState(sections, pageId, sectionId, state) {
	  var sectionsCopy = Object.assign([], sections);
	  var treeCopy = sectionsCopy.filter(function (section) {
	    return section.default;
	  })[0].pageTree;
	  var page = getNodeById(treeCopy, pageId);
	  page.state = state;
	  return sectionsCopy;
	}
	
	function traverse(tree, callback) {
	  var queue = new Queue();
	  queue.enqueue(tree);
	  var currentTree = queue.dequeue();
	  while (currentTree) {
	    for (var i = 0, length = currentTree.children.length; i < length; i++) {
	      queue.enqueue(currentTree.children[i]);
	    }
	    callback(currentTree);
	    currentTree = queue.dequeue();
	  }
	}
	
	function getNodeById(tree, id) {
	  if (tree.id == id) {
	    return tree;
	  } else if (tree.children != null) {
	    var i;
	    var result = null;
	    for (i = 0; result == null && i < tree.children.length; i++) {
	      result = getNodeById(tree.children[i], id);
	    }
	    return result;
	  }
	  return null;
	}
	
	function getNodeByAltSectionId(tree, alt_section_id) {
	  if (tree.alt_section_id == alt_section_id) {
	    return tree;
	  } else if (tree.children != null) {
	    var i;
	    var result = null;
	    for (i = 0; result == null && i < tree.children.length; i++) {
	      result = getNodeByAltSectionId(tree.children[i], alt_section_id);
	    }
	    return result;
	  }
	  return null;
	}
	
	function getNodeByPosition(tree, position) {
	  if (tree.position == position) {
	    return tree;
	  } else if (tree.children != null) {
	    var i;
	    var result = null;
	    for (i = 0; result == null && i < tree.children.length; i++) {
	      result = getNodeByPosition(tree.children[i], position);
	    }
	    return result;
	  }
	  return null;
	}
	
	exports.addPage = addPage;
	exports.removePage = removePage;
	exports.updatePagePosition = updatePagePosition;
	exports.updatePageName = updatePageName;
	exports.traverse = traverse;
	exports.updateCollapse = updateCollapse;
	exports.updatePageId = updatePageId;
	exports.addPageComment = addPageComment;
	exports.updateCommentId = updateCommentId;
	exports.updatePageType = updatePageType;
	exports.createNewSection = createNewSection;
	exports.updatePageState = updatePageState;
	exports.deletePageComment = deletePageComment;
	exports.updatePageComment = updatePageComment;
	exports.updatePagePersitence = updatePagePersitence;
	exports.removeSection = removeSection;
	exports.updateSectionId = updateSectionId;
	exports.updateSectionName = updateSectionName;
	exports.getNodeByAltSectionId = getNodeByAltSectionId;
	exports.getNodeById = getNodeById;

/***/ },

/***/ 328:
/*!*****************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/page_types.jsx ***!
  \*****************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pageTypes = function pageTypes() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = pageTypes;

/***/ },

/***/ 329:
/*!*******************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/orphan_pages.jsx ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	function addOrphanPage(orphanPages, pageTree) {
	  var orphanPagesCopy = Object.assign([], orphanPages);
	  (0, _tree_helper.traverse)(pageTree, function (page) {
	    if (page.state == 'orphan') {
	      var newOrphanPage = Object.assign({}, page);
	      orphanPagesCopy.push(newOrphanPage);
	    };
	  });
	
	  return orphanPagesCopy;
	}
	
	function removePage(orphanPages, id) {
	  var orphanPagesCopy = Object.assign([], orphanPages);
	  orphanPagesCopy = orphanPagesCopy.filter(function (orphanPage) {
	    return orphanPage.id != id;
	  });
	  return orphanPagesCopy;
	}
	
	var orphanPages = function orphanPages() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.REMOVE_ORPHAN_PAGE:
	      return removePage(state, action.id);
	    case _index.ADD_ORPHAN_PAGE:
	      return addOrphanPage(state, action.page);
	    default:
	      return state;
	  }
	};
	
	exports.default = orphanPages;

/***/ },

/***/ 330:
/*!***************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/comments.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	function addGeneralComment(comments, message, commenter, tempId) {
	  var commentsCopy = Object.assign([], comments);
	  var newComment = { message: message, commenter: commenter, id: tempId, created_at: 'Just now', state: 'active' };
	  commentsCopy.push(newComment);
	  return commentsCopy;
	}
	
	function updateId(comments, oldId, newId) {
	  var commentsCopy = Object.assign([], comments);
	  var comment = commentsCopy.filter(function (comment) {
	    return comment.id == oldId;
	  })[0];
	  comment.id = newId;
	  return commentsCopy;
	}
	
	function updateCommentMessage(comments, id, message) {
	  var commentsCopy = Object.assign([], comments);
	  var comment = commentsCopy.filter(function (comment) {
	    return comment.id == id;
	  })[0];
	  comment.message = message;
	  return commentsCopy;
	}
	
	function deleteComment(comments, id) {
	  var commentsCopy = Object.assign([], comments);
	  commentsCopy.removeIf(function (comment) {
	    return comment.id == id;
	  });
	  return commentsCopy;
	}
	
	var comments = function comments() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.ADD_GENERAL_COMMENT:
	      return addGeneralComment(state, action.message, action.commenter, action.tempId);
	    case _index.UPDATE_GENERAL_COMMENT_ID:
	      return updateId(state, action.oldId, action.newId);
	    case _index.UPDATE_GENERAL_COMMENT:
	      return updateCommentMessage(state, action.id, action.message);
	    case _index.DELETE_GENERAL_COMMENT:
	      return deleteComment(state, action.id);
	    default:
	      return state;
	  }
	};
	
	exports.default = comments;

/***/ },

/***/ 331:
/*!************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/state.jsx ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var state = function state() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.CHANGE_STATE:
	      return action.state;
	    default:
	      return state;
	  }
	};
	
	exports.default = state;

/***/ },

/***/ 332:
/*!*************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/saving.jsx ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var saving = function saving() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_SAVING:
	      return action.saving;
	    default:
	      return state;
	  }
	};
	
	exports.default = saving;

/***/ },

/***/ 333:
/*!*****************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/updated_at.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	function getUpdatedAt() {
	  var updatedAt = new Date(),
	      day = ("0" + updatedAt.getDate()).slice(-2),
	      month = updatedAt.getMonthName(),
	      year = updatedAt.getFullYear(),
	      updatedAtFormatted = day + ' ' + month + ' ' + year;
	  return updatedAtFormatted;
	}
	
	var updated_at = function updated_at() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.CHANGE_UPDATED_AT:
	      return getUpdatedAt();
	    default:
	      return state;
	  }
	};
	
	exports.default = updated_at;

/***/ },

/***/ 334:
/*!*******************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/current_user.jsx ***!
  \*******************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var currentUser = function currentUser() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = currentUser;

/***/ },

/***/ 335:
/*!********************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/current_guest.jsx ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var currentGuest = function currentGuest() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_CURRENT_GUEST:
	      return { fullName: action.name, email: action.email };
	    default:
	      return state;
	  }
	};
	
	exports.default = currentGuest;

/***/ },

/***/ 336:
/*!******************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/guest_users.jsx ***!
  \******************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var guestUsers = function guestUsers() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = guestUsers;

/***/ },

/***/ 337:
/*!****************************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/left_sidebar_expanded.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var leftSidebarExpanded = function leftSidebarExpanded() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.CHANGE_LEFT_SIDEBAR_EXPANDED:
	      return action.expanded;
	    default:
	      return state;
	  }
	};
	
	exports.default = leftSidebarExpanded;

/***/ },

/***/ 338:
/*!***************************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/show_guest_info_form.jsx ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var showGuestInfoForm = function showGuestInfoForm() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_SHOW_GUEST_INFO_FORM:
	      return action.showGuestInfoForm;
	    default:
	      return state;
	  }
	};
	
	exports.default = showGuestInfoForm;

/***/ },

/***/ 339:
/*!*******************************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/show_sitemap_share_modal.jsx ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var showSitemapShareModal = function showSitemapShareModal() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SHOW_SITEMAP_SHARE_MODAL:
	      return action.value;
	    default:
	      return state;
	  }
	};
	
	exports.default = showSitemapShareModal;

/***/ },

/***/ 340:
/*!***********************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/public_share_url.jsx ***!
  \***********************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var publicShareUrl = function publicShareUrl() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = publicShareUrl;

/***/ },

/***/ 341:
/*!***************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/business.jsx ***!
  \***************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var business = function business() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = business;

/***/ },

/***/ 342:
/*!********************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/selected_page.jsx ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var selectedPage = function selectedPage() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_SELECTED_PAGE:
	      return action.page;
	    default:
	      return state;
	  }
	};
	
	exports.default = selectedPage;

/***/ },

/***/ 343:
/*!***********************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/selected_comment.jsx ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var selectedComment = function selectedComment() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_SELECTED_COMMENT:
	      return action.comment;
	    default:
	      return state;
	  }
	};
	
	exports.default = selectedComment;

/***/ },

/***/ 344:
/*!***********************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/selected_section.jsx ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var selectedSection = function selectedSection() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_SELECTED_SECTION:
	      return action.section;
	    default:
	      return state;
	  }
	};
	
	exports.default = selectedSection;

/***/ },

/***/ 345:
/*!*******************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/public_share.jsx ***!
  \*******************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var publicShare = function publicShare() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = publicShare;

/***/ },

/***/ 346:
/*!*******************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/footer_pages.jsx ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	function addFooterPage(footerPages, pageType, tempId, uid) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var pageTypeCopy = Object.assign({}, pageType);
	  pageTypeCopy.icon_name = pageTypeCopy.iconName;
	  var newFooterPage = { name: pageType.name, footer: true, pageType: pageTypeCopy, children: [], comments: [], collapsed: false, state: 'active', id: tempId, uid: uid, newRecord: true };
	  footerPagesCopy.push(newFooterPage);
	  return footerPagesCopy;
	}
	
	function addOrphanPageInFooter(footerPages, page) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var newFooterPage = { name: page.pageTree.name, footer: true, pageType: page.pageTree.page_type, children: [], comments: [], collapsed: false, state: 'active', id: page.id, uid: page.pageTree.uid, newRecord: false };
	  footerPagesCopy.push(newFooterPage);
	  return footerPagesCopy;
	}
	
	function updateId(footerPages, oldId, newId) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == oldId;
	  })[0];
	  footerPage.id = newId;
	  return footerPagesCopy;
	}
	
	function updatePageName(footerPages, id, name) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == id;
	  })[0];
	  footerPage.name = name;
	  return footerPagesCopy;
	}
	
	function updatePagePersistence(footerPages, id) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == id;
	  })[0];
	  footerPage.newRecord = false;
	  return footerPagesCopy;
	}
	
	function updatePageType(footerPages, id, pageType) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == id;
	  })[0];
	  footerPage.pageType = pageType;
	  return footerPagesCopy;
	}
	
	function updatePageState(footerPages, id, state) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == id;
	  })[0];
	  footerPage.state = state;
	  return footerPagesCopy;
	}
	
	function addPageComment(footerPages, id, commenter, message, tempId) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == id;
	  })[0];
	  var newComment = { message: message, commenter: commenter, id: tempId, created_at: 'Just now' };
	  footerPage.comments.push(newComment);
	  return footerPagesCopy;
	}
	
	function updatePageCommentId(footerPages, oldId, newId, pageId) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == pageId;
	  })[0];
	  var comment = footerPage.comments.filter(function (comment) {
	    return comment.id == oldId;
	  })[0];
	  comment.id = newId;
	  return footerPagesCopy;
	}
	
	function deleteFootePageComment(footerPages, commentId, pageId) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == pageId;
	  })[0];
	  footerPage.comments.removeIf(function (comment) {
	    return comment.id == commentId;
	  });
	  return footerPagesCopy;
	}
	
	function updateFooterPageComment(footerPages, commentId, pageId, message) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == pageId;
	  })[0];
	  var comment = footerPage.comments.filter(function (comment) {
	    return comment.id == commentId;
	  })[0];
	  comment.message = message;
	  return footerPagesCopy;
	}
	
	function removePage(footerPages, id) {
	  var footerPagesCopy = Object.assign([], footerPages);
	  var footerPage = footerPagesCopy.filter(function (footerPage) {
	    return footerPage.id == id;
	  })[0];
	  footerPage.state = 'archived';
	  return footerPagesCopy;
	}
	
	var footerPages = function footerPages() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.ADD_NEW_FOOTER_PAGE:
	      return addFooterPage(state, action.pageType, action.timeStamp, action.uid);
	    case _index.ADD_ORPHAN_PAGE_TO_FOOTER:
	      return addOrphanPageInFooter(state, action.page);
	    case _index.UPDATE_FOOTER_PAGE_ID:
	      return updateId(state, action.oldId, action.newId);
	    case _index.UPDATE_FOOTER_PAGE_NAME:
	      return updatePageName(state, action.id, action.name);
	    case _index.UPDATE_FOOTER_PAGE_PERSISTENCE:
	      return updatePagePersistence(state, action.id);
	    case _index.CHANGE_FOOTER_PAGE_TYPE:
	      return updatePageType(state, action.pageId, action.pageType);
	    case _index.UPDATE_FOOTER_PAGE_STATE:
	      return updatePageState(state, action.pageId, action.state);
	    case _index.ADD_FOOTER_PAGE_COMMENT:
	      return addPageComment(state, action.id, action.commenter, action.message, action.tempId);
	    case _index.UPDATE_FOOTER_PAGE_COMMENT_ID:
	      return updatePageCommentId(state, action.oldId, action.newId, action.pageId);
	    case _index.DELETE_FOOTER_PAGE_COMMENT:
	      return deleteFootePageComment(state, action.commentId, action.pageId);
	    case _index.UPDATE_FOOTER_PAGE_COMMENT:
	      return updateFooterPageComment(state, action.id, action.pageId, action.message);
	    case _index.REMOVE_FOOTER_PAGE:
	      return removePage(state, action.id);
	    default:
	      return state;
	  }
	};
	
	exports.default = footerPages;

/***/ },

/***/ 347:
/*!*******************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/max_page_uid.jsx ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var maxPageUid = function maxPageUid() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_MAX_PAGE_UID:
	      return action.uid;
	    default:
	      return state;
	  }
	};
	
	exports.default = maxPageUid;

/***/ },

/***/ 348:
/*!*******************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/shared_users.jsx ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	function addSharedUsers(sharedUsers, emails) {
	  var sharedUsersCopy = Object.assign([], sharedUsers);
	  emails.forEach(function (email) {
	    sharedUsersCopy.push({ user_email: email, id: new Date() });
	  });
	  return sharedUsersCopy;
	}
	
	var sharedUsers = function sharedUsers() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.ADD_SHARED_USERS:
	      return addSharedUsers(state, action.emails);
	    default:
	      return state;
	  }
	};
	
	exports.default = sharedUsers;

/***/ },

/***/ 349:
/*!******************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/new_sitemap.jsx ***!
  \******************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var newSitemap = function newSitemap() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = newSitemap;

/***/ },

/***/ 350:
/*!************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/trial.jsx ***!
  \************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var trial = function trial() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = trial;

/***/ },

/***/ 351:
/*!*****************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/created_at.jsx ***!
  \*****************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createdAt = function createdAt() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
	  var action = arguments[1];
	
	  return state;
	};
	
	exports.default = createdAt;

/***/ },

/***/ 352:
/*!*************************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/intro_slide_number.jsx ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var introSlideNumber = function introSlideNumber() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.SET_INTRO_SLIDE_NUMBER:
	      return action.introSlideNumber;
	    default:
	      return state;
	  }
	};
	
	exports.default = introSlideNumber;

/***/ },

/***/ 353:
/*!************************************************************!*\
  !*** ./app/bundles/SiteMap/reducers/active_section_id.jsx ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ../actions/index */ 316);
	
	var activeSectionId = function activeSectionId() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _index.CHANGE_ACTIVE_SECTION_ID:
	      return action.sectionId;
	    default:
	      return state;
	  }
	};
	
	exports.default = activeSectionId;

/***/ },

/***/ 354:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_sitemap.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _sitemap = __webpack_require__(/*! ../components/sitemap */ 355);
	
	var _sitemap2 = _interopRequireDefault(_sitemap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { publicShare: state.publicShare, trial: state.trial, sitemapId: state.id, currentUser: state.currentUser, leftSidebarExpanded: state.leftSidebarExpanded };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {};
	};
	
	var ConnectedSitemap = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_sitemap2.default);
	
	exports.default = ConnectedSitemap;

/***/ },

/***/ 355:
/*!****************************************************!*\
  !*** ./app/bundles/SiteMap/components/sitemap.jsx ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDndHtml5Backend = __webpack_require__(/*! react-dnd-html5-backend */ 356);
	
	var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _connected_section_container = __webpack_require__(/*! ../containers/connected_section_container */ 508);
	
	var _connected_section_container2 = _interopRequireDefault(_connected_section_container);
	
	var _connected_header = __webpack_require__(/*! ../containers/connected_header */ 530);
	
	var _connected_header2 = _interopRequireDefault(_connected_header);
	
	var _connected_public_header = __webpack_require__(/*! ../containers/connected_public_header */ 533);
	
	var _connected_public_header2 = _interopRequireDefault(_connected_public_header);
	
	var _connected_trial_header = __webpack_require__(/*! ../containers/connected_trial_header */ 535);
	
	var _connected_trial_header2 = _interopRequireDefault(_connected_trial_header);
	
	var _induction_sidebar = __webpack_require__(/*! ./induction_sidebar */ 538);
	
	var _induction_sidebar2 = _interopRequireDefault(_induction_sidebar);
	
	var _connected_introduction_screen_two = __webpack_require__(/*! ../containers/connected_introduction_screen_two */ 539);
	
	var _connected_introduction_screen_two2 = _interopRequireDefault(_connected_introduction_screen_two);
	
	var _connected_guest_info_form_modal = __webpack_require__(/*! ../containers/connected_guest_info_form_modal */ 541);
	
	var _connected_guest_info_form_modal2 = _interopRequireDefault(_connected_guest_info_form_modal);
	
	var _connected_left_sidebar = __webpack_require__(/*! ../containers/connected_left_sidebar */ 543);
	
	var _connected_left_sidebar2 = _interopRequireDefault(_connected_left_sidebar);
	
	var _connected_right_sidebar = __webpack_require__(/*! ../containers/connected_right_sidebar */ 549);
	
	var _connected_right_sidebar2 = _interopRequireDefault(_connected_right_sidebar);
	
	var _connected_footer = __webpack_require__(/*! ../containers/connected_footer */ 559);
	
	var _connected_footer2 = _interopRequireDefault(_connected_footer);
	
	var _connected_delete_page_modal = __webpack_require__(/*! ../containers/connected_delete_page_modal */ 561);
	
	var _connected_delete_page_modal2 = _interopRequireDefault(_connected_delete_page_modal);
	
	var _connected_comment_delete_modal = __webpack_require__(/*! ../containers/connected_comment_delete_modal */ 563);
	
	var _connected_comment_delete_modal2 = _interopRequireDefault(_connected_comment_delete_modal);
	
	var _connected_page_change_modal = __webpack_require__(/*! ../containers/connected_page_change_modal */ 565);
	
	var _connected_page_change_modal2 = _interopRequireDefault(_connected_page_change_modal);
	
	var _connected_new_section_modal = __webpack_require__(/*! ../containers/connected_new_section_modal */ 567);
	
	var _connected_new_section_modal2 = _interopRequireDefault(_connected_new_section_modal);
	
	var _connected_page_comments_modal = __webpack_require__(/*! ../containers/connected_page_comments_modal */ 569);
	
	var _connected_page_comments_modal2 = _interopRequireDefault(_connected_page_comments_modal);
	
	var _connected_update_section_name_modal = __webpack_require__(/*! ../containers/connected_update_section_name_modal */ 571);
	
	var _connected_update_section_name_modal2 = _interopRequireDefault(_connected_update_section_name_modal);
	
	var _connected_delete_section_modal = __webpack_require__(/*! ../containers/connected_delete_section_modal */ 573);
	
	var _connected_delete_section_modal2 = _interopRequireDefault(_connected_delete_section_modal);
	
	var _user_signup_modal = __webpack_require__(/*! ./user_signup_modal */ 575);
	
	var _user_signup_modal2 = _interopRequireDefault(_user_signup_modal);
	
	var _custom_drag_layer = __webpack_require__(/*! ../components/custom_drag_layer */ 577);
	
	var _custom_drag_layer2 = _interopRequireDefault(_custom_drag_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SiteMap = function (_React$Component) {
	  _inherits(SiteMap, _React$Component);
	
	  function SiteMap() {
	    _classCallCheck(this, SiteMap);
	
	    return _possibleConstructorReturn(this, (SiteMap.__proto__ || Object.getPrototypeOf(SiteMap)).apply(this, arguments));
	  }
	
	  _createClass(SiteMap, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: this.props.publicShare ? 'shared-view' : '' },
	        !this.props.publicShare && !this.props.trial && _react2.default.createElement(_connected_header2.default, null),
	        this.props.publicShare && _react2.default.createElement(_connected_public_header2.default, null),
	        this.props.trial && _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_connected_trial_header2.default, null),
	          _react2.default.createElement(_user_signup_modal2.default, { sitemapId: this.props.sitemapId })
	        ),
	        !this.props.publicShare && _react2.default.createElement(_connected_left_sidebar2.default, null),
	        this.props.publicShare && _react2.default.createElement(_induction_sidebar2.default, null),
	        !this.props.trial && _react2.default.createElement(_connected_right_sidebar2.default, null),
	        this.props.publicShare && _react2.default.createElement(_connected_introduction_screen_two2.default, null),
	        _react2.default.createElement(
	          'div',
	          { className: "scrollable-div-sitemaps " + (this.props.leftSidebarExpanded ? '' : 'left-bar-contracted') },
	          _react2.default.createElement(_connected_section_container2.default, { sitemapNumber: '' })
	        ),
	        _react2.default.createElement(_connected_footer2.default, null),
	        this.props.publicShare && _react2.default.createElement(
	          'div',
	          { className: 'share-footer' },
	          _react2.default.createElement(
	            'a',
	            { href: 'https://timblee.io?utm_source=timblee&utm_medium=web-app&utm_campaign=general&utm_content=public-view-footer', target: '_blank' },
	            _react2.default.createElement('img', { src: '/assets/Timblee-icon-footer.svg', alt: ' ' }),
	            'Designed with Timblee'
	          )
	        ),
	        _react2.default.createElement(_custom_drag_layer2.default, null),
	        _react2.default.createElement(_connected_guest_info_form_modal2.default, null),
	        !this.props.publicShare && _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_connected_delete_page_modal2.default, null),
	          _react2.default.createElement(_connected_page_change_modal2.default, null),
	          _react2.default.createElement(_connected_new_section_modal2.default, null),
	          _react2.default.createElement(_connected_delete_section_modal2.default, null),
	          _react2.default.createElement(_connected_update_section_name_modal2.default, null)
	        ),
	        !this.props.trial && _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_connected_page_comments_modal2.default, null),
	          _react2.default.createElement(_connected_comment_delete_modal2.default, null)
	        )
	      );
	    }
	  }]);
	
	  return SiteMap;
	}(_react2.default.Component);
	
	exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(SiteMap);

/***/ },

/***/ 508:
/*!************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_section_container.jsx ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _section_container = __webpack_require__(/*! ../components/section_container */ 509);
	
	var _section_container2 = _interopRequireDefault(_section_container);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sections: state.sections, sitemapId: state.id, leftSidebarExpanded: state.leftSidebarExpanded, publicShare: state.publicShare, trial: state.trial, introSlideNumber: state.introSlideNumber, activeSectionId: state.activeSectionId, activeSectionLength: state.sections.filter(function (section) {
	      return section.state == 'active';
	    }).length };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    setSelectedSection: function setSelectedSection(section) {
	      dispatch((0, _actions.setSelectedSection)(section));
	    },
	    setIntroSlideNumber: function setIntroSlideNumber(introSlideNumber) {
	      dispatch((0, _actions.setIntroSlideNumber)(introSlideNumber));
	    },
	    changeActiveSectionId: function changeActiveSectionId(sectionId) {
	      dispatch((0, _actions.changeActiveSectionId)(sectionId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedSecionContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_section_container2.default);
	
	exports.default = ConnectedSecionContainer;

/***/ },

/***/ 509:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/components/section_container.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	var _draggable_page_container = __webpack_require__(/*! ./draggable_page_container */ 510);
	
	var _draggable_page_container2 = _interopRequireDefault(_draggable_page_container);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SectionContainer = function (_React$Component) {
	  _inherits(SectionContainer, _React$Component);
	
	  function SectionContainer(props) {
	    _classCallCheck(this, SectionContainer);
	
	    var _this2 = _possibleConstructorReturn(this, (SectionContainer.__proto__ || Object.getPrototypeOf(SectionContainer)).call(this, props));
	
	    _this2.changeActiveSectionId = _this2.changeActiveSectionId.bind(_this2);
	    _this2.activeSection = _this2.activeSection.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(SectionContainer, [{
	    key: 'getDefaultSection',
	    value: function getDefaultSection(sections) {
	      return sections.filter(function (section) {
	        return section.default;
	      })[0];
	    }
	  }, {
	    key: 'changeActiveSectionId',
	    value: function changeActiveSectionId(id) {
	      this.props.changeActiveSectionId(id);
	    }
	  }, {
	    key: 'setSelectedSection',
	    value: function setSelectedSection(section) {
	      this.props.setSelectedSection(section);
	    }
	  }, {
	    key: 'activeSection',
	    value: function activeSection() {
	      var _this = this;
	      return this.props.sections.filter(function (section) {
	        return section.id == _this.props.activeSectionId;
	      })[0];
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.activeSectionLength < nextProps.activeSectionLength || nextProps.sections[nextProps.sections.length - 1].id != this.props.sections[this.props.sections.length - 1].id) {
	        this.props.changeActiveSectionId(nextProps.sections[nextProps.sections.length - 1].id);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      var activeSections = this.props.sections.filter(function (section) {
	        return section.state == 'active';
	      });
	      var tabWidth = (100 / activeSections.length).toString() + '%';
	      var defaultSection = this.getDefaultSection(this.props.sections);
	      var renderedSectionTabs = activeSections.map(function (section, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: section.id, className: 'sitemap-section-tab' + (_this.props.activeSectionId == section.id ? ' active' : ''), onClick: function onClick(e) {
	              $(e.target).closest('.remove-section').length == 0 ? _this.changeActiveSectionId(section.id) : '';
	            }, style: { width: tabWidth } },
	          !section.default && !_this.props.publicShare && _react2.default.createElement(
	            'span',
	            null,
	            _react2.default.createElement(
	              'span',
	              { className: 'remove-section', onClick: function onClick() {
	                  _this.setSelectedSection(section);
	                }, 'data-target': '#delete-section-modal', 'data-toggle': 'modal' },
	              '\xD7'
	            ),
	            _react2.default.createElement('span', { className: 'edit-section', onClick: function onClick() {
	                _this.setSelectedSection(section);
	              }, 'data-target': '#update-section-name-modal', 'data-toggle': 'modal' })
	          ),
	          _react2.default.createElement(
	            'span',
	            { className: 'truncate' },
	            section.name
	          )
	        );
	      });
	      if (this.activeSection()) {
	        var pageTree = this.activeSection().default ? this.activeSection().pageTree : (0, _tree_helper.getNodeByAltSectionId)(defaultSection.pageTree, this.activeSection().id);
	      } else {
	        var pageTree = (0, _tree_helper.getNodeByAltSectionId)(defaultSection.pageTree, this.props.sections[this.props.sections.length - 1].id);
	      }
	
	      if (this.props.leftSidebarExpanded) {
	        var width = pageTree.children.filter(function (page) {
	          return page.state != 'archived' && page.state != 'orphan';
	        }).length * 240 + 240;
	      } else {
	        var width = pageTree.children.filter(function (page) {
	          return page.state != 'archived' && page.state != 'orphan';
	        }).length * 240 + 100 + 240;
	      }
	      if (this.props.publicShare) {
	        width -= 170;
	      }
	      width = width.toString() + 'px';
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'sitemap-sections' + (this.props.trial ? ' trial' : ''), style: { width: width } },
	        renderedSectionTabs.length > 1 && _react2.default.createElement(
	          'ul',
	          { className: "section-list clearfix" + (!this.props.publicShare && this.props.leftSidebarExpanded ? ' left-bar-expanded' : ' left-bar-contracted') + (this.props.publicShare ? ' public-share' : '') },
	          renderedSectionTabs
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'sitemap-section' },
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_draggable_page_container2.default, { pageTree: pageTree, sitemapNumber: '', sitemapId: _this.props.sitemapId, leftSidebarExpanded: _this.props.leftSidebarExpanded, publicShare: _this.props.publicShare, introSlideNumber: _this.props.introSlideNumber, setIntroSlideNumber: _this.props.setIntroSlideNumber, level: 0, activeSectionId: _this.props.activeSectionId })
	          )
	        )
	      );
	    }
	  }]);
	
	  return SectionContainer;
	}(_react2.default.Component);
	
	SectionContainer.propTypes = {
	  sections: _react.PropTypes.array.isRequired,
	  activeSectionId: _react.PropTypes.number.isRequired
	};
	exports.default = SectionContainer;

/***/ },

/***/ 510:
/*!*********************************************************************!*\
  !*** ./app/bundles/SiteMap/components/draggable_page_container.jsx ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 79);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDndHtml5Backend = __webpack_require__(/*! react-dnd-html5-backend */ 356);
	
	var _page_container = __webpack_require__(/*! ./page_container */ 512);
	
	var _page_container2 = _interopRequireDefault(_page_container);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sitemapSource = {
	  beginDrag: function beginDrag(props, monitor, component) {
	    return { id: props.pageTree.id, parentId: props.pageTree.parentId, type: 'page', pageTree: props.pageTree, sitemapNumber: props.sitemapNumber, level: props.level };
	  },
	  canDrag: function canDrag(props, monitor) {
	    return !props.publicShare && props.level != 0;
	  }
	};
	
	var DragSourceDecorator = (0, _reactDnd.DragSource)(_constants.ItemTypes.PAGE_CONTAINER, sitemapSource, function (connect, monitor) {
	  return {
	    connectDragSource: connect.dragSource(),
	    connectDragPreview: connect.dragPreview(),
	    isDragging: monitor.isDragging()
	  };
	});
	
	var DraggedPageContainer = function (_React$Component) {
	  _inherits(DraggedPageContainer, _React$Component);
	
	  function DraggedPageContainer() {
	    _classCallCheck(this, DraggedPageContainer);
	
	    return _possibleConstructorReturn(this, (DraggedPageContainer.__proto__ || Object.getPrototypeOf(DraggedPageContainer)).apply(this, arguments));
	  }
	
	  _createClass(DraggedPageContainer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {});
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isDragging && nextProps.isDragging) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).parent('.child-page').addClass('dragging');
	      }
	      if (this.props.isDragging && !nextProps.isDragging) {
	        // You can use this as leave handler
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).parent('.child-page').removeClass('dragging');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _React$createElement;
	
	      var connectDragSource = this.props.connectDragSource;
	      var isDragging = this.props.isDragging;
	      var _this = this;
	      var children;
	      children = this.props.pageTree.children.filter(function (page) {
	        return page.state != 'archived' && page.state != 'orphan' && (page.section_id == _this.props.activeSectionId || page.alt_section_id == _this.props.activeSectionId);
	      }).map(function (pageTree, index) {
	        if (_this.props.level == 0) {
	          var sitemapNumber = (index + 1).toString() + '.0';
	        } else if (_this.props.level == 1) {
	          var sitemapNumber = parseInt(_this.props.sitemapNumber).toString() + '.' + (index + 1);
	        } else {
	          var sitemapNumber = _this.props.sitemapNumber + '.' + (index + 1);
	        }
	        return _react2.default.createElement(
	          'div',
	          { className: 'child-page', key: pageTree.id },
	          _react2.default.createElement(DraggablePageContainer, { pageTree: pageTree, onPageDrop: _this.props.onPageDrop, leftSidebarExpanded: _this.props.leftSidebarExpanded, onPageTypeDrop: _this.props.onPageTypeDrop, sitemapId: _this.props.sitemapId, sitemapNumber: sitemapNumber, publicShare: _this.props.publicShare, introSlideNumber: _this.props.introSlideNumber, setIntroSlideNumber: _this.props.setIntroSlideNumber, level: _this.props.level + 1, isDragging: _this.props.isDragging, activeSectionId: _this.props.activeSectionId })
	        );
	      });
	      return connectDragSource(_react2.default.createElement(
	        'div',
	        { className: 'page-container-wrapper' + (isDragging ? ' dragging' : '') },
	        _react2.default.createElement(_page_container2.default, (_React$createElement = { pageTree: this.props.pageTree, children: children, sitemapNumber: this.props.sitemapNumber, leftSidebarExpanded: this.props.leftSidebarExpanded, introSlideNumber: _this.props.introSlideNumber, setIntroSlideNumber: _this.props.setIntroSlideNumber }, _defineProperty(_React$createElement, 'leftSidebarExpanded', _this.props.leftSidebarExpanded), _defineProperty(_React$createElement, 'publicShare', _this.props.publicShare), _defineProperty(_React$createElement, 'level', _this.props.level), _defineProperty(_React$createElement, 'isDragging', _this.props.isDragging), _React$createElement))
	      ));
	    }
	  }]);
	
	  return DraggedPageContainer;
	}(_react2.default.Component);
	
	DraggedPageContainer.propTypes = {
	  connectDragSource: _react.PropTypes.func.isRequired,
	  connectDragPreview: _react.PropTypes.func.isRequired,
	  isDragging: _react.PropTypes.bool.isRequired,
	  pageTree: _react.PropTypes.object.isRequired,
	  sitemapNumber: _react.PropTypes.string.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired
	};
	
	
	var DraggablePageContainer = DragSourceDecorator(DraggedPageContainer);
	exports.default = DraggablePageContainer;

/***/ },

/***/ 511:
/*!***********************************************!*\
  !*** ./app/bundles/SiteMap/dnd/constants.jsx ***!
  \***********************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ItemTypes = exports.ItemTypes = {
	  PAGE_CONTAINER: 'Page',
	  ORPHAN_PAGE: 'Orphan',
	  PAGE_TYPE: 'PageType'
	};

/***/ },

/***/ 512:
/*!***********************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_container.jsx ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _connected_page_tile = __webpack_require__(/*! ../containers/connected_page_tile */ 513);
	
	var _connected_page_tile2 = _interopRequireDefault(_connected_page_tile);
	
	var _connected_level_support = __webpack_require__(/*! ../containers/connected_level_support */ 522);
	
	var _connected_level_support2 = _interopRequireDefault(_connected_level_support);
	
	var _connected_level_support_before = __webpack_require__(/*! ../containers/connected_level_support_before */ 524);
	
	var _connected_level_support_before2 = _interopRequireDefault(_connected_level_support_before);
	
	var _connected_gutter = __webpack_require__(/*! ../containers/connected_gutter */ 526);
	
	var _connected_gutter2 = _interopRequireDefault(_connected_gutter);
	
	var _connected_first_page_droppable = __webpack_require__(/*! ../containers/connected_first_page_droppable */ 528);
	
	var _connected_first_page_droppable2 = _interopRequireDefault(_connected_first_page_droppable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PageContainer = function (_React$Component) {
	  _inherits(PageContainer, _React$Component);
	
	  function PageContainer() {
	    _classCallCheck(this, PageContainer);
	
	    return _possibleConstructorReturn(this, (PageContainer.__proto__ || Object.getPrototypeOf(PageContainer)).apply(this, arguments));
	  }
	
	  _createClass(PageContainer, [{
	    key: 'render',
	    value: function render() {
	      var children = this.props.pageTree.children.filter(function (page) {
	        return page.state != 'archived' && page.state != 'orphan';
	      });
	      var _this = this;
	      if (this.props.level == 0) {
	        if (this.props.leftSidebarExpanded) {
	          var width = children.length * 240 + 240;
	        } else {
	          var width = children.length * 240 + 240;
	        }
	        if (this.props.publicShare) {
	          width -= 372;
	        }
	
	        width = width.toString() + 'px';
	        var className = 'page-container level-' + this.props.level.toString() + (this.props.level > 0 ? ' border-level-' + (this.props.level % 10 == 0 ? 10 : this.props.level % 10).toString() : '') + (this.props.leftSidebarExpanded ? '' : ' left-bar-contracted') + (children.length == 0 ? ' no-children' : '') + (this.props.level < 6 ? '' : ' to-be-faded');
	        return _react2.default.createElement(
	          'div',
	          { 'data-level': this.props.level, className: className },
	          this.props.sitemapNumber == '1.0' && _react2.default.createElement(_connected_level_support_before2.default, { pageTree: this.props.pageTree }),
	          _react2.default.createElement(_connected_page_tile2.default, { pageTree: this.props.pageTree, collapsed: this.props.pageTree.collapsed, childrenLength: children.length, sitemapNumber: this.props.sitemapNumber, name: this.props.pageTree.name, level: this.props.level, isDragging: this.props.isDragging }),
	          _react2.default.createElement(_connected_gutter2.default, { pageTree: this.props.pageTree }),
	          children.length == 0 && _react2.default.createElement(_connected_first_page_droppable2.default, { pageTree: this.props.pageTree, leftSidebarExpanded: this.props.leftSidebarExpanded }),
	          _react2.default.createElement(_connected_level_support2.default, { pageTree: this.props.pageTree }),
	          _react2.default.createElement(
	            'div',
	            { className: 'parent parent-' + this.props.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '') + (this.props.level > 4 ? '' : ' to-be-not-faded') + (this.props.level < 6 ? '' : ' to-be-faded'), 'data-level': this.props.level },
	            this.props.children
	          )
	        );
	      } else {
	        var className = 'page-container level-' + this.props.level.toString() + (this.props.level > 0 ? ' border-level-' + (this.props.level % 10 == 0 ? 10 : this.props.level % 10).toString() : '') + (this.props.leftSidebarExpanded ? '' : ' left-bar-contracted') + (this.props.level < 6 ? '' : ' to-be-faded');
	        return _react2.default.createElement(
	          'div',
	          { 'data-level': this.props.level, className: className },
	          this.props.sitemapNumber == '1.0' && _react2.default.createElement(_connected_level_support_before2.default, { pageTree: this.props.pageTree }),
	          _react2.default.createElement(_connected_page_tile2.default, { pageTree: this.props.pageTree, collapsed: this.props.pageTree.collapsed, childrenLength: children.length, sitemapNumber: this.props.sitemapNumber, name: this.props.pageTree.name, level: this.props.level, isDragging: this.props.isDragging }),
	          _react2.default.createElement(_connected_gutter2.default, { pageTree: this.props.pageTree }),
	          _react2.default.createElement(_connected_level_support2.default, { pageTree: this.props.pageTree }),
	          _react2.default.createElement(
	            'div',
	            { className: 'parent parent-' + this.props.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '') + (this.props.level > 4 ? '' : ' to-be-not-faded') + (this.props.level < 6 ? '' : ' to-be-faded'), 'data-level': this.props.level },
	            this.props.children
	          )
	        );
	      }
	    }
	  }]);
	
	  return PageContainer;
	}(_react2.default.Component);
	
	PageContainer.propTypes = {
	  pageTree: _react.PropTypes.object.isRequired,
	  sitemapNumber: _react.PropTypes.string.isRequired,
	  children: _react.PropTypes.array.isRequired
	};
	exports.default = PageContainer;

/***/ },

/***/ 513:
/*!****************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_page_tile.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _page_tile = __webpack_require__(/*! ../components/page_tile */ 514);
	
	var _page_tile2 = _interopRequireDefault(_page_tile);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { trial: state.trial, publicShare: state.publicShare, pageType: state.pageTypes.filter(function (pageType) {
	      return pageType.name == 'General 1';
	    })[0], maxPageUid: state.maxPageUid, sitemapId: state.id, currentUser: state.currentUser, currentGuest: state.currentGuest, activeSectionId: state.activeSectionId };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onCollapsedChanged: function onCollapsedChanged(id, sectionId) {
	      dispatch((0, _actions.changeCollapse)(id, sectionId));
	    },
	    onNameChange: function onNameChange(id, footer, sectionId, name) {
	      if (footer) {
	        dispatch((0, _actions.updateFooterPageName)(id, name));
	      } else {
	        dispatch((0, _actions.updatePageName)(id, sectionId, name));
	      }
	    },
	    updatePagePersitence: function updatePagePersitence(id, footer, sectionId) {
	      if (footer) {
	        dispatch((0, _actions.updateFooterPagePersitence)(id));
	      } else {
	        dispatch((0, _actions.updatePagePersitence)(id, sectionId));
	      }
	    },
	    changeActiveSectionId: function changeActiveSectionId(sectionId) {
	      dispatch((0, _actions.changeActiveSectionId)(sectionId));
	    },
	    onPageTypeDrop: function onPageTypeDrop(sectionId, pageType, parentId, position, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewPage)(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onPageIdUpdate: function onPageIdUpdate(id, sectionId, newId) {
	      dispatch((0, _actions.updateId)(id, sectionId, newId));
	    },
	    setSelectedPage: function setSelectedPage(page) {
	      dispatch((0, _actions.setSelectedPage)(page));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    },
	    setShowGuestInfoForm: function setShowGuestInfoForm(showGuestInfoForm) {
	      dispatch((0, _actions.setShowGuestInfoForm)(showGuestInfoForm));
	    }
	  };
	};
	
	var ConnectedPageTile = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_page_tile2.default);
	
	exports.default = ConnectedPageTile;

/***/ },

/***/ 514:
/*!******************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_tile.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactClickOutside = __webpack_require__(/*! react-click-outside */ 515);
	
	var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);
	
	var _connected_page_tile_top = __webpack_require__(/*! ../containers/connected_page_tile_top */ 516);
	
	var _connected_page_tile_top2 = _interopRequireDefault(_connected_page_tile_top);
	
	var _connected_page_tile_bottom = __webpack_require__(/*! ../containers/connected_page_tile_bottom */ 518);
	
	var _connected_page_tile_bottom2 = _interopRequireDefault(_connected_page_tile_bottom);
	
	var _connected_introduction_screen_one = __webpack_require__(/*! ../containers/connected_introduction_screen_one */ 520);
	
	var _connected_introduction_screen_one2 = _interopRequireDefault(_connected_introduction_screen_one);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PageTile = function (_React$Component) {
	  _inherits(PageTile, _React$Component);
	
	  function PageTile(props) {
	    _classCallCheck(this, PageTile);
	
	    var _this2 = _possibleConstructorReturn(this, (PageTile.__proto__ || Object.getPrototypeOf(PageTile)).call(this, props));
	
	    _this2.handleClickOutside = _this2.handleClickOutside.bind(_this2);
	    _this2.handleOnCollapsedChanged = _this2.handleOnCollapsedChanged.bind(_this2);
	    _this2.mouseOver = _this2.mouseOver.bind(_this2);
	    _this2.mouseOut = _this2.mouseOut.bind(_this2);
	    _this2.enableNameChangeInput = _this2.enableNameChangeInput.bind(_this2);
	    _this2.disableNameChangeInput = _this2.disableNameChangeInput.bind(_this2);
	    _this2.closeOverLay = _this2.closeOverLay.bind(_this2);
	    _this2.openOverLay = _this2.openOverLay.bind(_this2);
	    _this2.setSelectedPage = _this2.setSelectedPage.bind(_this2);
	    _this2.checkUserOrGuest = _this2.checkUserOrGuest.bind(_this2);
	    _this2.showLinkedSection = _this2.showLinkedSection.bind(_this2);
	    _this2.addSameLevelNextPage = _this2.addSameLevelNextPage.bind(_this2);
	    _this2.addSubPage = _this2.addSubPage.bind(_this2);
	    _this2.addFaded = _this2.addFaded.bind(_this2);
	    _this2.removeFaded = _this2.removeFaded.bind(_this2);
	    _this2.handeNameChange = _this2.handeNameChange.bind(_this2);
	    _this2.state = { nameChangeDisabled: !props.pageTree.newRecord, showOverLay: false, name: _this2.props.name, originalName: _this2.props.name, counter: 0 };
	    return _this2;
	  }
	
	  _createClass(PageTile, [{
	    key: 'handleClickOutside',
	    value: function handleClickOutside() {
	      if (this.state.showOverLay) {
	        this.setState({ showOverLay: false });
	      }
	    }
	  }, {
	    key: 'enableNameChangeInput',
	    value: function enableNameChangeInput(e) {
	      if (!(this.props.pageTree.alt_section_id && this.props.level == 0) && !this.props.publicShare) {
	        this.setState({ nameChangeDisabled: false });
	        this.refs.nameInput.focus();
	      }
	    }
	  }, {
	    key: 'handeNameChange',
	    value: function handeNameChange(e) {
	      if (e.charCode == 13) {
	        e.preventDefault();
	        e.stopPropagation();
	        this.disableNameChangeInput();
	      }
	    }
	  }, {
	    key: 'disableNameChangeInput',
	    value: function disableNameChangeInput(e) {
	      var _this3 = this;
	
	      var _this = this;
	      var name = this.refs.nameInput.value;
	      if (name != this.props.name && name.length > 0) {
	        $.ajax({
	          url: '/pages/' + this.props.pageTree.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { name: name } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          success: function success(result) {
	            _this3.props.setSaving(true);
	            setTimeout(function () {
	              _this.props.setSaving(false);
	            }, 2000);
	          }
	        });
	        this.props.onNameChange(this.props.pageTree.id, this.props.pageTree.footer, this.props.pageTree.section_id, name);
	
	        if (this.props.pageTree.newRecord) {
	          this.props.updatePagePersitence(this.props.pageTree.id, this.props.pageTree.footer, this.props.pageTree.section_id);
	        } else {
	          this.setState({ nameChangeDisabled: true });
	        }
	      } else {
	        if (this.props.pageTree.newRecord) {
	          this.props.updatePagePersitence(this.props.pageTree.id, this.props.pageTree.footer, this.props.pageTree.section_id);
	        } else {
	          this.setState({ name: this.state.originalName, nameChangeDisabled: true });
	        }
	      }
	    }
	  }, {
	    key: 'addSameLevelNextPage',
	    value: function addSameLevelNextPage(e) {
	      var timeStamp = new Date();
	      var _this = this;
	      $.ajax({
	        url: '/pages/',
	        method: 'post',
	        dataType: 'JSON',
	        data: { page: { page_type_id: this.props.pageType.id, parent_id: this.props.pageTree.parentId, sitemap_id: this.props.sitemapId, name: this.props.pageType.name, position: this.props.pageTree.position + 1, section_id: this.props.activeSectionId } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          var onPageIdUpdate = _this.props.onPageIdUpdate;
	          var pageTree = _this.props.pageTree;
	          onPageIdUpdate(timeStamp, _this.props.activeSectionId, result.id);
	        },
	        complete: function complete(result) {
	          _this.props.setSaving(true);
	          setTimeout(function () {
	            _this.props.setSaving(false);
	          }, 2000);
	        }
	      });
	      this.props.onPageTypeDrop(this.props.activeSectionId, this.props.pageType, this.props.pageTree.parentId, this.props.pageTree.position, timeStamp, this.props.maxPageUid);
	      this.removeFaded();
	    }
	  }, {
	    key: 'addSubPage',
	    value: function addSubPage(e) {
	      if (this.props.level < 12) {
	        var timeStamp = new Date();
	        var _this = this;
	        $.ajax({
	          url: '/pages/',
	          method: 'post',
	          dataType: 'JSON',
	          data: { page: { page_type_id: this.props.pageType.id, parent_id: this.props.pageTree.id, sitemap_id: this.props.sitemapId, name: this.props.pageType.name, position: 1, section_id: this.props.activeSectionId } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          success: function success(result) {
	            var onPageIdUpdate = _this.props.onPageIdUpdate;
	            onPageIdUpdate(timeStamp, _this.props.activeSectionId, result.id);
	          },
	          complete: function complete(result) {
	            _this.props.setSaving(true);
	            setTimeout(function () {
	              _this.props.setSaving(false);
	            }, 2000);
	          }
	        });
	        this.props.onPageTypeDrop(this.props.activeSectionId, this.props.pageType, this.props.pageTree.id, 'begining', timeStamp, this.props.maxPageUid);
	      }
	      this.removeFaded();
	    }
	  }, {
	    key: 'checkUserOrGuest',
	    value: function checkUserOrGuest(e) {
	      if (this.props.currentUser || this.props.currentGuest) {
	        this.props.setSelectedPage(this.props.pageTree);
	        $('#page-comments-modal').modal('show');
	      } else if (this.props.trial) {
	        $('.modal').modal('hide');
	        $('#user-signup-modal').modal('show');
	      } else {
	        this.props.setShowGuestInfoForm(true);
	        $('.modal').modal('hide');
	        $('#guest-info-modal').modal('show');
	      }
	    }
	  }, {
	    key: 'setSelectedPage',
	    value: function setSelectedPage(e) {
	      this.props.pageTree.tempLevel = this.props.level;
	      this.props.setSelectedPage(this.props.pageTree);
	    }
	  }, {
	    key: 'closeOverLay',
	    value: function closeOverLay(e) {
	      this.setState({ showOverLay: false });
	    }
	  }, {
	    key: 'openOverLay',
	    value: function openOverLay(e) {
	      this.setState({ showOverLay: true, counter: this.state.counter + 1 });
	    }
	  }, {
	    key: 'mouseOver',
	    value: function mouseOver(e) {
	      $(this.refs.pageTile).addClass('hovered');
	      $('.page-tile').not($(this.refs.pageTile)).removeClass('hovered');
	      if (!this.props.pageTree.footer) {
	        this.addFaded();
	      }
	    }
	  }, {
	    key: 'mouseOut',
	    value: function mouseOut(e) {
	      $(this.refs.pageTile).removeClass('hovered');
	      if (!this.props.pageTree.footer) {
	        this.removeFaded();
	      }
	    }
	  }, {
	    key: 'addFaded',
	    value: function addFaded() {
	      $(this.refs.pageTile).addClass('not-faded');
	      $(this.refs.pageTile).parents('.parent.to-be-not-faded').addClass('not-faded');
	      $(this.refs.pageTile).parents('.child-page').siblings().find('.page-container').addClass('faded');
	      $('.parent.to-be-faded').addClass('faded');
	      $(this.refs.pageTile).parents('.parent.to-be-faded').addClass('faded');
	      $(this.refs.pageTile).closest('.child-page').siblings().find('.parent.to-be-faded').addClass('faded');
	      $(this.refs.pageTile).siblings('.parent.to-be-faded').addClass('faded');
	      $(this.refs.pageTile).siblings('.parent').find('.parent.to-be-faded').addClass('faded');
	    }
	  }, {
	    key: 'removeFaded',
	    value: function removeFaded() {
	      $(this.refs.pageTile).removeClass('not-faded');
	      $('.page-tile').not($(this.refs.pageTile)).removeClass('faded');
	      $(this.refs.pageTile).parents('.parent.to-be-not-faded').removeClass('not-faded');
	      $('.child-page').removeClass('faded');
	      $('.parent.to-be-faded').removeClass('faded');
	      $(this.refs.pageTile).parents('.parent.to-be-faded').removeClass('faded');
	      $(this.refs.pageTile).siblings('.parent.to-be-faded').removeClass('faded');
	      $(this.refs.pageTile).siblings('.parent').find('.parent.to-be-faded').addClass('faded');
	      $('.page-container').removeClass('faded');
	    }
	  }, {
	    key: 'handleOnCollapsedChanged',
	    value: function handleOnCollapsedChanged(e) {
	      this.props.onCollapsedChanged(this.props.pageTree.id, this.props.pageTree.section_id);
	    }
	  }, {
	    key: 'showLinkedSection',
	    value: function showLinkedSection(e) {
	      this.props.changeActiveSectionId(this.props.pageTree.alt_section_id);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (prevState.nameChangeDisabled && !this.state.nameChangeDisabled) {
	        this.refs.nameInput.focus();
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	      document.moveCaretToEnd(this.refs.nameInput);
	      $('.modal').on('hidden.bs.modal', function () {
	        _this.setState({ showOverLay: false });
	      });
	      if (!this.state.nameChangeDisabled) {
	        this.enableNameChangeInput();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.props.childrenLength > 0) {
	        return _react2.default.createElement(
	          'div',
	          { className: "page-tile " + (this.props.level == 0 && this.props.childrenLength % 2 == 0 ? 'even-tree' : 'odd-tree') + (this.props.level > 4 && this.props.pageTree.alt_section_id ? " level-with-section" : ""), onMouseOver: this.mouseOver, onMouseOut: this.mouseOut, ref: 'pageTile' },
	          this.props.publicShare && this.props.level == 0 && !this.props.pageTree.footer && _react2.default.createElement(_connected_introduction_screen_one2.default, null),
	          !this.props.isDragging && !this.props.publicShare && _react2.default.createElement(
	            'div',
	            { style: { zIndex: 100 } },
	            _react2.default.createElement(
	              'div',
	              { className: 'right-button-div' },
	              _react2.default.createElement(
	                'div',
	                { className: 'right-button', onClick: this.addSameLevelNextPage },
	                _react2.default.createElement('div', { className: 'collapse-open collapse-close' }),
	                'Add same level page'
	              )
	            ),
	            !(this.props.pageTree.alt_section_id && this.props.pageTree.alt_section_id != this.props.activeSectionId) && this.props.level < 12 && _react2.default.createElement(
	              'div',
	              { className: 'bottom-button-div' },
	              _react2.default.createElement(
	                'div',
	                { className: 'bottom-button', onClick: this.addSubPage },
	                _react2.default.createElement('div', { className: 'collapse-open collapse-close' }),
	                'Add sub page'
	              )
	            )
	          ),
	          _react2.default.createElement(_connected_page_tile_top2.default, { pageTree: this.props.pageTree, sitemapNumber: this.props.sitemapNumber, name: this.props.name, level: this.props.level }),
	          _react2.default.createElement(
	            'div',
	            { className: 'tile-top-data' },
	            _react2.default.createElement(
	              'h1',
	              { className: 'tile-name' },
	              _react2.default.createElement(
	                'span',
	                { className: 'tile-number' },
	                this.props.sitemapNumber
	              )
	            ),
	            this.props.pageTree.alt_section_id && !(this.props.level == 0) && _react2.default.createElement(
	              'span',
	              { className: 'section-tag', onClick: this.showLinkedSection },
	              'section',
	              _react2.default.createElement('img', { src: '/assets/link.png', alt: ' ' })
	            )
	          ),
	          _react2.default.createElement(
	            'h1',
	            { className: 'tile-name-edit' },
	            _react2.default.createElement(
	              'div',
	              { onClick: this.enableNameChangeInput, className: this.state.nameChangeDisabled ? '' : 'hide' },
	              ' ',
	              this.props.name
	            ),
	            _react2.default.createElement('textarea', { className: "form-control" + (this.state.nameChangeDisabled ? ' hide' : ''), ref: 'nameInput', defaultValue: this.props.name, onBlur: this.disableNameChangeInput, onKeyPress: this.handeNameChange })
	          ),
	          _react2.default.createElement(_connected_page_tile_bottom2.default, { pageTree: this.props.pageTree, commentsLength: this.props.pageTree.comments.length, level: this.props.level }),
	          _react2.default.createElement('div', { className: "tile-right " + this.props.pageTree.pageType.icon_name }),
	          !(this.props.level == 0 && this.props.pageTree.alt_section_id) && _react2.default.createElement(
	            'div',
	            { className: 'tile-right-hover' },
	            _react2.default.createElement(
	              'ul',
	              { className: 'tile-more' },
	              !this.props.publicShare && _react2.default.createElement(
	                'li',
	                { className: 'first-item' },
	                _react2.default.createElement(
	                  'span',
	                  { className: 'more-option tile-icons', onClick: this.openOverLay },
	                  _react2.default.createElement('span', null),
	                  _react2.default.createElement('span', null),
	                  _react2.default.createElement('span', null)
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                { className: 'second-item' },
	                _react2.default.createElement(
	                  'span',
	                  { className: 'icon-page-comments tile-icons', onClick: this.checkUserOrGuest },
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'card-tooltip' },
	                    'Comments & Notes'
	                  )
	                )
	              )
	            )
	          ),
	          !(this.props.level == 0 && this.props.pageTree.alt_section_id) && _react2.default.createElement(
	            'div',
	            { className: "card-overlay" + (this.state.showOverLay ? ' overlay-in' : '') },
	            _react2.default.createElement(
	              'div',
	              { className: 'close-card-overlay' },
	              _react2.default.createElement('a', { href: 'javascript:void(0)', className: 'icon-close', onClick: this.closeOverLay })
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0)', className: 'icon-page-comments', onClick: this.checkUserOrGuest, 'data-toggle': 'modal' },
	              _react2.default.createElement(
	                'span',
	                { className: 'card-tooltip' },
	                'Comments & Notes'
	              )
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: '#page-change-modal', className: 'icon-page-change', onClick: this.setSelectedPage, 'data-toggle': 'modal' },
	              _react2.default.createElement(
	                'span',
	                { className: 'card-tooltip' },
	                'Change Page Type'
	              )
	            ),
	            !(this.props.level == 0) && !this.props.pageTree.alt_section_id && _react2.default.createElement(
	              'a',
	              { href: '#new-section-modal', className: 'icon-page-new', onClick: this.setSelectedPage, 'data-toggle': 'modal' },
	              _react2.default.createElement(
	                'span',
	                { className: 'card-tooltip' },
	                'New Section'
	              )
	            ),
	            (!(this.props.level == 0) || this.props.pageTree.footer) && _react2.default.createElement(
	              'a',
	              { href: '#delete-page-modal', className: 'icon-page-delete', onClick: this.setSelectedPage, 'data-toggle': 'modal' },
	              _react2.default.createElement(
	                'span',
	                { className: 'card-tooltip' },
	                'Delete Page'
	              )
	            )
	          ),
	          this.props.level > 0 && !this.props.pageTree.alt_section_id && _react2.default.createElement('div', { className: "collapse-open" + (this.props.collapsed ? ' collapse-close' : ''), onClick: this.handleOnCollapsedChanged })
	        );
	      } else {
	        return _react2.default.createElement(
	          'div',
	          { className: "page-tile " + (this.props.level > 4 && this.props.pageTree.alt_section_id ? " level-with-section" : ""), onMouseOver: this.mouseOver, onMouseOut: this.mouseOut, ref: 'pageTile' },
	          this.props.publicShare && this.props.level == 0 && !this.props.pageTree.footer && _react2.default.createElement(_connected_introduction_screen_one2.default, null),
	          !this.props.isDragging && !this.props.publicShare && _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'div',
	              { className: 'right-button-div' },
	              _react2.default.createElement(
	                'div',
	                { className: 'right-button', onClick: this.addSameLevelNextPage },
	                _react2.default.createElement('div', { className: 'collapse-open collapse-close' }),
	                'Add same level page'
	              )
	            ),
	            !(this.props.pageTree.alt_section_id && this.props.pageTree.alt_section_id != this.props.activeSectionId) && this.props.level < 12 && _react2.default.createElement(
	              'div',
	              { className: 'bottom-button-div' },
	              _react2.default.createElement(
	                'div',
	                { className: 'bottom-button', onClick: this.addSubPage },
	                _react2.default.createElement('div', { className: 'collapse-open collapse-close' }),
	                'Add sub page'
	              )
	            )
	          ),
	          _react2.default.createElement(_connected_page_tile_top2.default, { pageTree: this.props.pageTree, sitemapNumber: this.props.sitemapNumber, name: this.props.name, level: this.props.level }),
	          _react2.default.createElement(
	            'div',
	            { className: 'tile-top-data' },
	            _react2.default.createElement(
	              'h1',
	              { className: 'tile-name' },
	              _react2.default.createElement(
	                'span',
	                { className: 'tile-number' },
	                this.props.sitemapNumber
	              )
	            ),
	            this.props.pageTree.alt_section_id && !(this.props.level == 0) && _react2.default.createElement(
	              'span',
	              { className: 'section-tag', onClick: this.showLinkedSection },
	              'section',
	              _react2.default.createElement('img', { src: '/assets/link.png', alt: ' ' })
	            )
	          ),
	          _react2.default.createElement(
	            'h1',
	            { className: 'tile-name-edit' },
	            _react2.default.createElement(
	              'div',
	              { onClick: this.enableNameChangeInput, className: this.state.nameChangeDisabled ? '' : 'hide' },
	              ' ',
	              this.props.name
	            ),
	            _react2.default.createElement('textarea', { className: "form-control" + (this.state.nameChangeDisabled ? ' hide' : ''), ref: 'nameInput', defaultValue: this.props.name, onBlur: this.disableNameChangeInput, onKeyPress: this.handeNameChange })
	          ),
	          _react2.default.createElement(_connected_page_tile_bottom2.default, { pageTree: this.props.pageTree, commentsLength: this.props.pageTree.comments.length, level: this.props.level }),
	          _react2.default.createElement('div', { className: "tile-right " + this.props.pageTree.pageType.icon_name }),
	          !(this.props.level == 0 && this.props.pageTree.alt_section_id) && _react2.default.createElement(
	            'div',
	            { className: 'tile-right-hover' },
	            _react2.default.createElement(
	              'ul',
	              { className: 'tile-more' },
	              !this.props.publicShare && _react2.default.createElement(
	                'li',
	                { className: 'first-item' },
	                _react2.default.createElement(
	                  'span',
	                  { className: 'more-option tile-icons', onClick: this.openOverLay },
	                  _react2.default.createElement('span', null),
	                  _react2.default.createElement('span', null),
	                  _react2.default.createElement('span', null)
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                { className: 'second-item' },
	                _react2.default.createElement(
	                  'span',
	                  { className: 'icon-page-comments tile-icons', onClick: this.checkUserOrGuest },
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'card-tooltip' },
	                    'Comments & Notes'
	                  )
	                )
	              )
	            )
	          ),
	          !(this.props.level == 0 && this.props.pageTree.alt_section_id) && _react2.default.createElement(
	            'div',
	            { className: "card-overlay" + (this.state.showOverLay ? ' overlay-in' : '') },
	            _react2.default.createElement(
	              'div',
	              { className: 'close-card-overlay' },
	              _react2.default.createElement('a', { href: 'javascript:void(0)', className: 'icon-close', onClick: this.closeOverLay })
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0)', className: 'icon-page-comments', onClick: this.checkUserOrGuest, 'data-toggle': 'modal' },
	              _react2.default.createElement(
	                'span',
	                { className: 'card-tooltip' },
	                'Comments & Notes'
	              )
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: '#page-change-modal', className: 'icon-page-change', onClick: this.setSelectedPage, 'data-toggle': 'modal' },
	              _react2.default.createElement(
	                'span',
	                { className: 'card-tooltip' },
	                'Change Page Type'
	              )
	            ),
	            !(this.props.level == 0) && !this.props.pageTree.alt_section_id && _react2.default.createElement(
	              'a',
	              { href: '#new-section-modal', className: 'icon-page-new', onClick: this.setSelectedPage, 'data-toggle': 'modal' },
	              _react2.default.createElement(
	                'span',
	                { className: 'card-tooltip' },
	                'New Section'
	              )
	            ),
	            (!(this.props.level == 0) || this.props.pageTree.footer) && _react2.default.createElement(
	              'a',
	              { href: '#delete-page-modal', className: 'icon-page-delete', onClick: this.setSelectedPage, 'data-toggle': 'modal' },
	              _react2.default.createElement(
	                'span',
	                { className: 'card-tooltip' },
	                'Delete Page'
	              )
	            )
	          )
	        );
	      }
	    }
	  }]);
	
	  return PageTile;
	}(_react2.default.Component);
	
	PageTile.propTypes = {
	  pageTree: _react.PropTypes.object.isRequired,
	  sitemapNumber: _react.PropTypes.string,
	  name: _react.PropTypes.string.isRequired,
	  collapsed: _react.PropTypes.bool.isRequired,
	  childrenLength: _react.PropTypes.number.isRequired,
	  level: _react.PropTypes.number.isRequired,
	  onCollapsedChanged: _react.PropTypes.func.isRequired
	};
	exports.default = (0, _reactClickOutside2.default)(PageTile);

/***/ },

/***/ 516:
/*!********************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_page_tile_top.jsx ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _page_tile_top = __webpack_require__(/*! ../components/page_tile_top */ 517);
	
	var _page_tile_top2 = _interopRequireDefault(_page_tile_top);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sitemapId: state.id, maxPageUid: state.maxPageUid, activeSectionId: state.activeSectionId };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageDrop: function onPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	    },
	    onOrphanPageDrop: function onOrphanPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	      dispatch((0, _actions.removeOrphanPage)(id));
	    },
	    onPageTypeDrop: function onPageTypeDrop(sectionId, pageType, parentId, position, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewPage)(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onPageIdUpdate: function onPageIdUpdate(id, sectionId, newId) {
	      dispatch((0, _actions.updateId)(id, sectionId, newId));
	    },
	    changeActiveSectionId: function changeActiveSectionId(sectionId) {
	      dispatch((0, _actions.changeActiveSectionId)(sectionId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedPageTileTop = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_page_tile_top2.default);
	
	exports.default = ConnectedPageTileTop;

/***/ },

/***/ 517:
/*!**********************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_tile_top.jsx ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 79);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sitemapTarget = {
	  drop: function drop(props, monitor, component) {
	    var item = monitor.getItem();
	    if (monitor.didDrop() || !props.pageTree.id || props.pageTree.footer || props.level == 0) {
	      return;
	    }
	    if (item.type == 'page') {
	      if (item.pageTree.state == 'active') {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.parentId, position: props.pageTree.position + 1 } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
	      } else {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.parentId, position: props.pageTree.position + 1, section_id: props.activeSectionId, state: 'active' } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onOrphanPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
	      }
	    } else if (item.type == 'PageType') {
	      var timeStamp = new Date();
	      $.ajax({
	        url: '/pages/',
	        method: 'post',
	        dataType: 'JSON',
	        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: item.name, position: props.pageTree.position + 1, section_id: props.activeSectionId } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          props.onPageIdUpdate(timeStamp, props.activeSectionId, result.id);
	        },
	        complete: function complete(result) {
	          props.setSaving(true);
	          setTimeout(function () {
	            props.setSaving(false);
	          }, 2000);
	        }
	      });
	      props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.parentId, props.pageTree.position, timeStamp, props.maxPageUid);
	    }
	  }
	};
	
	var DropTargetDecorator = (0, _reactDnd.DropTarget)([_constants.ItemTypes.PAGE_CONTAINER, _constants.ItemTypes.PAGE_TYPE, _constants.ItemTypes.ORPHAN_PAGE], sitemapTarget, function (connect, monitor) {
	  return {
	    connectDropTarget: connect.dropTarget(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    isOver: monitor.isOver()
	  };
	});
	
	var PageTileTop = function (_React$Component) {
	  _inherits(PageTileTop, _React$Component);
	
	  function PageTileTop(props) {
	    _classCallCheck(this, PageTileTop);
	
	    return _possibleConstructorReturn(this, (PageTileTop.__proto__ || Object.getPrototypeOf(PageTileTop)).call(this, props));
	  }
	
	  _createClass(PageTileTop, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
	        if (this.props.level > 0 && !this.props.pageTree.footer) {
	          var domNode = (0, _reactDom.findDOMNode)(this);
	          $(domNode).addClass('drag-over');
	          $('.custom-drag-layer').addClass('over-page-top');
	          if (this.props.level == 1) {
	            $(domNode).parent('.page-tile').siblings('.level-support').addClass('again-drag-over');
	          } else {
	            $(domNode).parent('.page-tile').siblings('.gutter').addClass('again-drag-over');
	          }
	        }
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
	        // You can use this as leave handler
	        if (this.props.level > 0 && !this.props.pageTree.footer) {
	          var domNode = (0, _reactDom.findDOMNode)(this);
	          $(domNode).removeClass('drag-over');
	          $('.custom-drag-layer').removeClass('over-page-top');
	          if (this.props.level == 1) {
	            $(domNode).parent('.page-tile').siblings('.level-support').removeClass('again-drag-over');
	          } else {
	            $(domNode).parent('.page-tile').siblings('.gutter').removeClass('again-drag-over');
	          }
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var connectDropTarget = this.props.connectDropTarget;
	      return connectDropTarget(_react2.default.createElement('div', { className: 'tile-top' }));
	    }
	  }]);
	
	  return PageTileTop;
	}(_react2.default.Component);
	
	PageTileTop.propTypes = {
	  onPageDrop: _react.PropTypes.func.isRequired,
	  onPageTypeDrop: _react.PropTypes.func.isRequired,
	  onPageIdUpdate: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  pageTree: _react.PropTypes.object.isRequired,
	  sitemapNumber: _react.PropTypes.string,
	  name: _react.PropTypes.string.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired,
	  maxPageUid: _react.PropTypes.number.isRequired
	};
	
	
	var DroppablePageTileTop = DropTargetDecorator(PageTileTop);
	exports.default = DroppablePageTileTop;

/***/ },

/***/ 518:
/*!***********************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_page_tile_bottom.jsx ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _page_tile_bottom = __webpack_require__(/*! ../components/page_tile_bottom */ 519);
	
	var _page_tile_bottom2 = _interopRequireDefault(_page_tile_bottom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sitemapId: state.id, maxPageUid: state.maxPageUid, trial: state.trial, activeSectionId: state.activeSectionId };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageDrop: function onPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	    },
	    onOrphanPageDrop: function onOrphanPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	      dispatch((0, _actions.removeOrphanPage)(id));
	    },
	    onPageTypeDrop: function onPageTypeDrop(sectionId, pageType, parentId, position, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewPage)(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onPageIdUpdate: function onPageIdUpdate(id, sectionId, newId) {
	      dispatch((0, _actions.updateId)(id, sectionId, newId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedPageTileBottom = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_page_tile_bottom2.default);
	
	exports.default = ConnectedPageTileBottom;

/***/ },

/***/ 519:
/*!*************************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_tile_bottom.jsx ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 79);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sitemapTarget = {
	  drop: function drop(props, monitor, component) {
	    var item = monitor.getItem();
	    if (monitor.didDrop() || item.type == 'Page' && item.parentId == props.pageTree.id || props.pageTree.footer || props.pageTree.alt_section_id && props.pageTree.alt_section_id != props.activeSectionId) {
	      return;
	    }
	    if (item.type == 'page') {
	
	      if (item.pageTree.state == 'active') {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.id, position: 1 } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onPageDrop(item.id, props.pageTree.section_id, props.pageTree.id, 'begining');
	      } else {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.id, position: 1, section_id: props.activeSectionId, state: 'active' } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onOrphanPageDrop(item.id, props.pageTree.section_id, props.pageTree.id, 'begining');
	      }
	    } else if (item.type == 'PageType') {
	      if (props.level < 12) {
	        var timeStamp = new Date();
	        $.ajax({
	          url: '/pages/',
	          method: 'post',
	          dataType: 'JSON',
	          data: { page: { page_type_id: item.id, parent_id: props.pageTree.id, sitemap_id: props.sitemapId, name: item.name, position: 1, section_id: props.activeSectionId } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          success: function success(result) {
	            props.onPageIdUpdate(timeStamp, props.activeSectionId, result.id);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.id, 'begining', timeStamp, props.maxPageUid);
	      }
	    }
	  }
	};
	
	var DropTargetDecorator = (0, _reactDnd.DropTarget)([_constants.ItemTypes.PAGE_CONTAINER, _constants.ItemTypes.PAGE_TYPE, _constants.ItemTypes.ORPHAN_PAGE], sitemapTarget, function (connect, monitor) {
	  return {
	    connectDropTarget: connect.dropTarget(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    isOver: monitor.isOver()
	  };
	});
	
	var PageTileBottom = function (_React$Component) {
	  _inherits(PageTileBottom, _React$Component);
	
	  function PageTileBottom() {
	    _classCallCheck(this, PageTileBottom);
	
	    return _possibleConstructorReturn(this, (PageTileBottom.__proto__ || Object.getPrototypeOf(PageTileBottom)).apply(this, arguments));
	  }
	
	  _createClass(PageTileBottom, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isOverCurrent && nextProps.isOverCurrent && !this.props.pageTree.footer && !(this.props.pageTree.alt_section_id && this.props.pageTree.alt_section_id != this.props.activeSectionId) && this.props.level < 12) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).addClass('drag-over');
	        $('.custom-drag-layer').addClass('over-page-bottom');
	        $(domNode).parent('.page-tile').siblings('.gutter').addClass('again-2-drag-over');
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer && !(this.props.pageTree.alt_section_id && this.props.pageTree.alt_section_id != this.props.activeSectionId) && this.props.level < 12) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).removeClass('drag-over');
	        $('.custom-drag-layer').removeClass('over-page-bottom');
	        $(domNode).parent('.page-tile').siblings('.gutter').removeClass('again-2-drag-over');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var connectDropTarget = this.props.connectDropTarget;
	      var formattedUid = this.props.pageTree.uid.toString().length < 3 ? ('000' + this.props.pageTree.uid).substr(-3) : this.props.pageTree.uid;
	      return connectDropTarget(_react2.default.createElement(
	        'div',
	        { className: 'tile-bottom' },
	        _react2.default.createElement(
	          'span',
	          { className: 'tile-id' },
	          this.props.commentsLength > 0 && _react2.default.createElement('span', { className: 'dummy-state' }),
	          'ID: ',
	          formattedUid
	        )
	      ));
	    }
	  }]);
	
	  return PageTileBottom;
	}(_react2.default.Component);
	
	PageTileBottom.propTypes = {
	  onPageDrop: _react.PropTypes.func.isRequired,
	  onPageTypeDrop: _react.PropTypes.func.isRequired,
	  onPageIdUpdate: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  pageTree: _react.PropTypes.object.isRequired,
	  commentsLength: _react.PropTypes.number.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired,
	  maxPageUid: _react.PropTypes.number.isRequired
	};
	
	
	var DroppablePageTileBottom = DropTargetDecorator(PageTileBottom);
	exports.default = DroppablePageTileBottom;

/***/ },

/***/ 520:
/*!******************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_introduction_screen_one.jsx ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _introduction_screen_one = __webpack_require__(/*! ../components/introduction_screen_one */ 521);
	
	var _introduction_screen_one2 = _interopRequireDefault(_introduction_screen_one);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { introSlideNumber: state.introSlideNumber };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    setIntroSlideNumber: function setIntroSlideNumber(introSlideNumber) {
	      dispatch((0, _actions.setIntroSlideNumber)(introSlideNumber));
	    }
	  };
	};
	
	var ConnectedIntroductionScreenOne = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_introduction_screen_one2.default);
	
	exports.default = ConnectedIntroductionScreenOne;

/***/ },

/***/ 521:
/*!********************************************************************!*\
  !*** ./app/bundles/SiteMap/components/introduction_screen_one.jsx ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactClickOutside = __webpack_require__(/*! react-click-outside */ 515);
	
	var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var IntroductionScreensOne = function (_React$Component) {
	  _inherits(IntroductionScreensOne, _React$Component);
	
	  function IntroductionScreensOne(props) {
	    _classCallCheck(this, IntroductionScreensOne);
	
	    var _this2 = _possibleConstructorReturn(this, (IntroductionScreensOne.__proto__ || Object.getPrototypeOf(IntroductionScreensOne)).call(this, props));
	
	    _this2.setIntroSlideNumber = _this2.setIntroSlideNumber.bind(_this2);
	    _this2.hideFirstScreenHandle = _this2.hideFirstScreenHandle.bind(_this2);
	    _this2.handleClickOutside = _this2.handleClickOutside.bind(_this2);
	    _this2.state = { showFirstScreenHandle: true };
	    return _this2;
	  }
	
	  _createClass(IntroductionScreensOne, [{
	    key: 'hideFirstScreenHandle',
	    value: function hideFirstScreenHandle(e) {
	      this.setState({ showFirstScreenHandle: false });
	      this.props.setIntroSlideNumber(0);
	    }
	  }, {
	    key: 'setIntroSlideNumber',
	    value: function setIntroSlideNumber(number) {
	      this.props.setIntroSlideNumber(number);
	    }
	  }, {
	    key: 'handleClickOutside',
	    value: function handleClickOutside() {
	      if (this.state.showFirstScreenHandle && this.props.introSlideNumber == 1) {
	        this.hideFirstScreenHandle();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'intro-box-1' },
	        _react2.default.createElement(
	          'span',
	          { className: "hotspot " + (this.state.showFirstScreenHandle ? '' : 'hide'), onClick: function onClick(e) {
	              _this.setIntroSlideNumber(1);
	            } },
	          _react2.default.createElement('span', { className: 'pulse pulse-1' }),
	          _react2.default.createElement('span', { className: 'pulse pulse-2' }),
	          _react2.default.createElement('span', { className: 'pulse pulse-3' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: "intro-box share-1" + (this.props.introSlideNumber == 1 ? '' : ' hide') },
	          _react2.default.createElement(
	            'figure',
	            null,
	            _react2.default.createElement('img', { alt: ' ', src: '/assets/share-intro-1.jpg' })
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'Click on an individual screen to add comments to that screen'
	          ),
	          _react2.default.createElement(
	            'a',
	            { href: 'javascript:void(0);', onClick: this.hideFirstScreenHandle },
	            'Got it'
	          )
	        )
	      );
	    }
	  }]);
	
	  return IntroductionScreensOne;
	}(_react2.default.Component);
	
	IntroductionScreensOne.propTypes = {
	  introSlideNumber: _react.PropTypes.number.isRequired
	};
	exports.default = (0, _reactClickOutside2.default)(IntroductionScreensOne);

/***/ },

/***/ 522:
/*!********************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_level_support.jsx ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _level_support = __webpack_require__(/*! ../components/level_support */ 523);
	
	var _level_support2 = _interopRequireDefault(_level_support);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sitemapId: state.id, maxPageUid: state.maxPageUid, activeSectionId: state.activeSectionId };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageDrop: function onPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	    },
	    onOrphanPageDrop: function onOrphanPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	      dispatch((0, _actions.removeOrphanPage)(id));
	    },
	    onPageTypeDrop: function onPageTypeDrop(sectionId, pageType, parentId, position, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewPage)(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onPageIdUpdate: function onPageIdUpdate(id, sectionId, newId) {
	      dispatch((0, _actions.updateId)(id, sectionId, newId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedLevelSupport = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_level_support2.default);
	
	exports.default = ConnectedLevelSupport;

/***/ },

/***/ 523:
/*!**********************************************************!*\
  !*** ./app/bundles/SiteMap/components/level_support.jsx ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 79);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sitemapTarget = {
	  drop: function drop(props, monitor, component) {
	    var item = monitor.getItem();
	    if (monitor.didDrop() || !props.pageTree.id || props.pageTree.footer) {
	      return;
	    }
	    if (item.type == 'page') {
	      if (item.pageTree.state == 'active') {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.parentId, position: props.pageTree.position + 1 } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
	      } else {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.parentId, position: props.pageTree.position + 1, section_id: props.activeSectionId, state: 'active' } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onOrphanPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
	      }
	    } else if (item.type == 'PageType') {
	      var timeStamp = new Date();
	      $.ajax({
	        url: '/pages/',
	        method: 'post',
	        dataType: 'JSON',
	        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: item.name, position: props.pageTree.position + 1, section_id: props.activeSectionId } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          props.onPageIdUpdate(timeStamp, props.activeSectionId, result.id);
	        },
	        complete: function complete(result) {
	          props.setSaving(true);
	          setTimeout(function () {
	            props.setSaving(false);
	          }, 2000);
	        }
	      });
	      props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.parentId, props.pageTree.position, timeStamp, props.maxPageUid);
	    }
	  }
	};
	
	var DropTargetDecorator = (0, _reactDnd.DropTarget)([_constants.ItemTypes.PAGE_CONTAINER, _constants.ItemTypes.PAGE_TYPE, _constants.ItemTypes.ORPHAN_PAGE], sitemapTarget, function (connect, monitor) {
	  return {
	    connectDropTarget: connect.dropTarget(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    isOver: monitor.isOver()
	  };
	});
	
	var LevelSupport = function (_React$Component) {
	  _inherits(LevelSupport, _React$Component);
	
	  function LevelSupport() {
	    _classCallCheck(this, LevelSupport);
	
	    return _possibleConstructorReturn(this, (LevelSupport.__proto__ || Object.getPrototypeOf(LevelSupport)).apply(this, arguments));
	  }
	
	  _createClass(LevelSupport, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isOverCurrent && nextProps.isOverCurrent && !this.props.pageTree.footer) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).addClass('drag-over');
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer) {
	        // You can use this as leave handler
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).removeClass('drag-over');
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer) {
	        // You can be more specific and track enter/leave
	        // shallowly, not including nested targets
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var connectDropTarget = this.props.connectDropTarget;
	      return connectDropTarget(_react2.default.createElement('div', { className: 'level-support' }));
	    }
	  }]);
	
	  return LevelSupport;
	}(_react2.default.Component);
	
	LevelSupport.propTypes = {
	  onPageDrop: _react.PropTypes.func.isRequired,
	  onPageTypeDrop: _react.PropTypes.func.isRequired,
	  onPageIdUpdate: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  pageTree: _react.PropTypes.object.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired,
	  maxPageUid: _react.PropTypes.number.isRequired
	};
	
	
	var DroppableLevelSupport = DropTargetDecorator(LevelSupport);
	exports.default = DroppableLevelSupport;

/***/ },

/***/ 524:
/*!***************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_level_support_before.jsx ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _level_support_before = __webpack_require__(/*! ../components/level_support_before */ 525);
	
	var _level_support_before2 = _interopRequireDefault(_level_support_before);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sitemapId: state.id, maxPageUid: state.maxPageUid, activeSectionId: state.activeSectionId };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageDrop: function onPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	    },
	    onOrphanPageDrop: function onOrphanPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	      dispatch((0, _actions.removeOrphanPage)(id));
	    },
	    onPageTypeDrop: function onPageTypeDrop(sectionId, pageType, parentId, position, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewPage)(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onPageIdUpdate: function onPageIdUpdate(id, sectionId, newId) {
	      dispatch((0, _actions.updateId)(id, sectionId, newId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedLevelSupportBefore = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_level_support_before2.default);
	
	exports.default = ConnectedLevelSupportBefore;

/***/ },

/***/ 525:
/*!*****************************************************************!*\
  !*** ./app/bundles/SiteMap/components/level_support_before.jsx ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 79);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sitemapTarget = {
	  drop: function drop(props, monitor, component) {
	    var item = monitor.getItem();
	    if (monitor.didDrop() || !props.pageTree.id || props.pageTree.footer) {
	      return;
	    }
	    if (item.type == 'page') {
	      if (item.pageTree.state == 'active') {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.parentId, position: props.pageTree.position } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position - 1);
	      } else {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.parentId, position: props.pageTree.position, section_id: props.activeSectionId, state: 'active' } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onOrphanPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position - 1);
	      }
	    } else if (item.type == 'PageType') {
	      var timeStamp = new Date();
	      $.ajax({
	        url: '/pages/',
	        method: 'post',
	        dataType: 'JSON',
	        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: item.name, position: props.pageTree.position, section_id: props.activeSectionId } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          props.onPageIdUpdate(timeStamp, props.activeSectionId, result.id);
	        },
	        complete: function complete(result) {
	          props.setSaving(true);
	          setTimeout(function () {
	            props.setSaving(false);
	          }, 2000);
	        }
	      });
	      props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.parentId, props.pageTree.position - 1, timeStamp, props.maxPageUid);
	    }
	  }
	};
	
	var DropTargetDecorator = (0, _reactDnd.DropTarget)([_constants.ItemTypes.PAGE_CONTAINER, _constants.ItemTypes.PAGE_TYPE, _constants.ItemTypes.ORPHAN_PAGE], sitemapTarget, function (connect, monitor) {
	  return {
	    connectDropTarget: connect.dropTarget(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    isOver: monitor.isOver()
	  };
	});
	
	var LevelSupportBefore = function (_React$Component) {
	  _inherits(LevelSupportBefore, _React$Component);
	
	  function LevelSupportBefore() {
	    _classCallCheck(this, LevelSupportBefore);
	
	    return _possibleConstructorReturn(this, (LevelSupportBefore.__proto__ || Object.getPrototypeOf(LevelSupportBefore)).apply(this, arguments));
	  }
	
	  _createClass(LevelSupportBefore, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isOverCurrent && nextProps.isOverCurrent && !this.props.pageTree.footer) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).addClass('drag-over');
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer) {
	        // You can use this as leave handler
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).removeClass('drag-over');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var connectDropTarget = this.props.connectDropTarget;
	      return connectDropTarget(_react2.default.createElement('div', { className: 'level-support-before' }));
	    }
	  }]);
	
	  return LevelSupportBefore;
	}(_react2.default.Component);
	
	LevelSupportBefore.propTypes = {
	  onPageDrop: _react.PropTypes.func.isRequired,
	  onPageTypeDrop: _react.PropTypes.func.isRequired,
	  onPageIdUpdate: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  pageTree: _react.PropTypes.object.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired,
	  maxPageUid: _react.PropTypes.number.isRequired
	};
	
	
	var DroppableLevelSupportBefore = DropTargetDecorator(LevelSupportBefore);
	exports.default = DroppableLevelSupportBefore;

/***/ },

/***/ 526:
/*!*************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_gutter.jsx ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _gutter = __webpack_require__(/*! ../components/gutter */ 527);
	
	var _gutter2 = _interopRequireDefault(_gutter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sitemapId: state.id, maxPageUid: state.maxPageUid, activeSectionId: state.activeSectionId };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageDrop: function onPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	    },
	    onOrphanPageDrop: function onOrphanPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	      dispatch((0, _actions.removeOrphanPage)(id));
	    },
	    onPageTypeDrop: function onPageTypeDrop(sectionId, pageType, parentId, position, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewPage)(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onPageIdUpdate: function onPageIdUpdate(id, sectionId, newId) {
	      dispatch((0, _actions.updateId)(id, sectionId, newId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedGutter = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_gutter2.default);
	
	exports.default = ConnectedGutter;

/***/ },

/***/ 527:
/*!***************************************************!*\
  !*** ./app/bundles/SiteMap/components/gutter.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 79);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sitemapTarget = {
	  drop: function drop(props, monitor, component) {
	    var item = monitor.getItem();
	    if (monitor.didDrop() || !props.pageTree.id || props.pageTree.level == 1 || props.pageTree.footer) {
	      return;
	    }
	    if (item.type == 'page') {
	      if (item.pageTree.state == 'active') {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.parentId, position: props.pageTree.position + 1 } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
	      } else {
	        $.ajax({
	          url: '/pages/' + item.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { page: { parent_id: props.pageTree.parentId, position: props.pageTree.position + 1, section_id: props.activeSectionId, state: 'active' } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            props.setSaving(true);
	            setTimeout(function () {
	              props.setSaving(false);
	            }, 2000);
	          }
	        });
	        props.onOrphanPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
	      }
	    } else if (item.type == 'PageType') {
	      var timeStamp = new Date();
	      $.ajax({
	        url: '/pages/',
	        method: 'post',
	        dataType: 'JSON',
	        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: item.name, position: props.pageTree.position + 1, section_id: props.activeSectionId } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          props.onPageIdUpdate(timeStamp, props.activeSectionId, result.id);
	        },
	        complete: function complete(result) {
	          props.setSaving(true);
	          setTimeout(function () {
	            props.setSaving(false);
	          }, 2000);
	        }
	      });
	      props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.parentId, props.pageTree.position, timeStamp, props.maxPageUid);
	    }
	  }
	};
	
	var DropTargetDecorator = (0, _reactDnd.DropTarget)([_constants.ItemTypes.PAGE_CONTAINER, _constants.ItemTypes.PAGE_TYPE, _constants.ItemTypes.ORPHAN_PAGE], sitemapTarget, function (connect, monitor) {
	  return {
	    connectDropTarget: connect.dropTarget(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    isOver: monitor.isOver()
	  };
	});
	
	var Gutter = function (_React$Component) {
	  _inherits(Gutter, _React$Component);
	
	  function Gutter() {
	    _classCallCheck(this, Gutter);
	
	    return _possibleConstructorReturn(this, (Gutter.__proto__ || Object.getPrototypeOf(Gutter)).apply(this, arguments));
	  }
	
	  _createClass(Gutter, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isOverCurrent && nextProps.isOverCurrent && !this.props.pageTree.footer) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).addClass('drag-over');
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer) {
	        // You can use this as leave handler
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).removeClass('drag-over');
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer) {
	        // You can be more specific and track enter/leave
	        // shallowly, not including nested targets
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var connectDropTarget = this.props.connectDropTarget;
	      return connectDropTarget(_react2.default.createElement('div', { className: "gutter " + (this.props.pageTree.children.length > 0 ? 'with-children' : '') }));
	    }
	  }]);
	
	  return Gutter;
	}(_react2.default.Component);
	
	Gutter.propTypes = {
	  onPageDrop: _react.PropTypes.func.isRequired,
	  onPageTypeDrop: _react.PropTypes.func.isRequired,
	  onPageIdUpdate: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  pageTree: _react.PropTypes.object.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired,
	  maxPageUid: _react.PropTypes.number.isRequired
	};
	
	
	var DroppableGutter = DropTargetDecorator(Gutter);
	exports.default = DroppableGutter;

/***/ },

/***/ 528:
/*!***************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_first_page_droppable.jsx ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _first_page_droppable = __webpack_require__(/*! ../components/first_page_droppable */ 529);
	
	var _first_page_droppable2 = _interopRequireDefault(_first_page_droppable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sitemapId: state.id, maxPageUid: state.maxPageUid, pageType: state.pageTypes.filter(function (pageType) {
	      return pageType.name == 'General 1';
	    })[0], activeSectionId: state.activeSectionId };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageDrop: function onPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	    },
	    onOrphanPageDrop: function onOrphanPageDrop(id, sectionId, newParentId, position) {
	      dispatch((0, _actions.updatePagePosition)(id, sectionId, newParentId, position));
	      dispatch((0, _actions.removeOrphanPage)(id));
	    },
	    onFooterOrphanPageDrop: function onFooterOrphanPageDrop(page) {
	      dispatch((0, _actions.addOrphanPageToFooter)(page));
	      dispatch((0, _actions.removeOrphanPage)(page.id));
	    },
	    onPageTypeDrop: function onPageTypeDrop(sectionId, pageType, parentId, position, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewPage)(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onPageIdUpdate: function onPageIdUpdate(id, sectionId, newId) {
	      dispatch((0, _actions.updateId)(id, sectionId, newId));
	    },
	    onFooterPageTypeDrop: function onFooterPageTypeDrop(pageType, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewFooterPage)(pageType, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onFooterPageIdUpdate: function onFooterPageIdUpdate(id, newId) {
	      dispatch((0, _actions.updateFooterPageId)(id, newId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedFirstPageDroppable = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_first_page_droppable2.default);
	
	exports.default = ConnectedFirstPageDroppable;

/***/ },

/***/ 529:
/*!*****************************************************************!*\
  !*** ./app/bundles/SiteMap/components/first_page_droppable.jsx ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 79);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sitemapTarget = {
	  drop: function drop(props, monitor, component) {
	    var item = monitor.getItem();
	    if (monitor.didDrop() || item.pageType == 'page') {
	      return;
	    }
	    if (item.type == 'PageType') {
	      var timeStamp = new Date();
	      if (props.pageTree.footer) {
	        var data = { page: { page_type_id: item.id, parent_id: null, sitemap_id: props.sitemapId, name: item.name, position: null, section_id: null, footer: true } };
	      } else {
	        var data = { page: { page_type_id: item.id, parent_id: props.pageTree.id, sitemap_id: props.sitemapId, name: item.name, position: 1, section_id: props.activeSectionId } };
	      }
	      $.ajax({
	        url: '/pages/',
	        method: 'post',
	        dataType: 'JSON',
	        data: data,
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          if (props.pageTree.footer) {
	            props.onFooterPageIdUpdate(timeStamp, result.id);
	          } else {
	            props.onPageIdUpdate(timeStamp, props.pageTree.section_id, result.id);
	          }
	        },
	        complete: function complete(result) {
	          props.setSaving(true);
	          setTimeout(function () {
	            props.setSaving(false);
	          }, 2000);
	        }
	      });
	      if (props.pageTree.footer) {
	        props.onFooterPageTypeDrop(item, timeStamp, props.maxPageUid);
	      } else {
	        props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.id, 'begining', timeStamp, props.maxPageUid);
	      }
	    } else if (item.type == 'page' && item.pageTree.state == 'orphan') {
	      if (props.pageTree.footer) {
	        var data = { page: { parent_id: null, position: null, section_id: null, footer: true, state: 'active' } };
	      } else {
	        var data = { page: { parent_id: props.pageTree.id, position: 1, section_id: props.activeSectionId, state: 'active' } };
	      }
	      $.ajax({
	        url: '/pages/' + item.id,
	        method: 'put',
	        dataType: 'JSON',
	        data: data,
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        complete: function complete(result) {
	          props.setSaving(true);
	          setTimeout(function () {
	            props.setSaving(false);
	          }, 2000);
	        }
	      });
	      if (props.pageTree.footer) {
	        props.onFooterOrphanPageDrop(item);
	      } else {
	        props.onOrphanPageDrop(item.id, props.pageTree.section_id, props.pageTree.id, 'begining');
	      }
	    }
	  }
	};
	
	var DropTargetDecorator = (0, _reactDnd.DropTarget)([_constants.ItemTypes.PAGE_CONTAINER, _constants.ItemTypes.PAGE_TYPE, _constants.ItemTypes.ORPHAN_PAGE], sitemapTarget, function (connect, monitor) {
	  return {
	    connectDropTarget: connect.dropTarget(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    isOver: monitor.isOver()
	  };
	});
	
	var FirstPageDroppable = function (_React$Component) {
	  _inherits(FirstPageDroppable, _React$Component);
	
	  function FirstPageDroppable(props) {
	    _classCallCheck(this, FirstPageDroppable);
	
	    var _this2 = _possibleConstructorReturn(this, (FirstPageDroppable.__proto__ || Object.getPrototypeOf(FirstPageDroppable)).call(this, props));
	
	    _this2.addFirstSubPage = _this2.addFirstSubPage.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(FirstPageDroppable, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).addClass('drag-over');
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).removeClass('drag-over');
	      }
	    }
	  }, {
	    key: 'addFirstSubPage',
	    value: function addFirstSubPage(e) {
	      var timeStamp = new Date();
	      var _this = this;
	      $.ajax({
	        url: '/pages/',
	        method: 'post',
	        dataType: 'JSON',
	        data: { page: { page_type_id: this.props.pageType.id, parent_id: this.props.pageTree.id, sitemap_id: this.props.sitemapId, name: this.props.pageType.name, position: 1, section_id: this.props.activeSectionId } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          var onPageIdUpdate = _this.props.onPageIdUpdate;
	          var pageTree = _this.props.pageTree;
	          onPageIdUpdate(timeStamp, pageTree.section_id, result.id);
	        },
	        complete: function complete(result) {
	          _this.props.setSaving(true);
	          setTimeout(function () {
	            _this.props.setSaving(false);
	          }, 2000);
	        }
	      });
	      this.props.onPageTypeDrop(this.props.activeSectionId, this.props.pageType, this.props.pageTree.id, 'begining', timeStamp, this.props.maxPageUid);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var connectDropTarget = this.props.connectDropTarget;
	      return connectDropTarget(_react2.default.createElement(
	        'div',
	        { className: 'first-page' },
	        !this.props.pageTree.footer && _react2.default.createElement('div', { className: 'collapse-open collapse-close', onClick: this.addFirstSubPage }),
	        !this.props.pageTree.footer && _react2.default.createElement(
	          'div',
	          { className: 'first-page-droppable' + (this.props.leftSidebarExpanded ? '' : ' left-sidebar-contracted') },
	          _react2.default.createElement(
	            'span',
	            null,
	            'Drag and drop screen tiles here ',
	            _react2.default.createElement('br', null),
	            ' to start building your sitemap'
	          )
	        ),
	        this.props.pageTree.footer && _react2.default.createElement(
	          'div',
	          { className: 'first-page-droppable' + (this.props.leftSidebarExpanded ? '' : ' left-sidebar-contracted') },
	          _react2.default.createElement(
	            'span',
	            null,
	            'Drag and drop screen tiles here ',
	            _react2.default.createElement('br', null),
	            ' to add them into the footer'
	          )
	        )
	      ));
	    }
	  }]);
	
	  return FirstPageDroppable;
	}(_react2.default.Component);
	
	FirstPageDroppable.propTypes = {
	  onPageDrop: _react.PropTypes.func.isRequired,
	  onPageTypeDrop: _react.PropTypes.func.isRequired,
	  onPageIdUpdate: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  pageTree: _react.PropTypes.object.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired,
	  leftSidebarExpanded: _react.PropTypes.bool.isRequired,
	  maxPageUid: _react.PropTypes.number.isRequired
	};
	
	
	var DroppableFirstPageDroppable = DropTargetDecorator(FirstPageDroppable);
	exports.default = DroppableFirstPageDroppable;

/***/ },

/***/ 530:
/*!*************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_header.jsx ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _header = __webpack_require__(/*! ../components/header */ 531);
	
	var _header2 = _interopRequireDefault(_header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { name: state.name, id: state.id, state: state.state, business: state.business, saving: state.saving, newSitemap: state.newSitemap, currentUser: state.currentUser, publicShareUrl: state.publicShareUrl, sharedUsers: state.sharedUsers, sections: state.sections };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onNameChange: function onNameChange(name) {
	      dispatch((0, _actions.setName)(name));
	    },
	    onStateChange: function onStateChange(state) {
	      dispatch((0, _actions.updateState)(state));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    },
	    showSitemapShareModal: function showSitemapShareModal() {
	      dispatch((0, _actions.showSitemapShareModal)(true));
	    }
	  };
	};
	
	var ConnectedHeader = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_header2.default);
	
	exports.default = ConnectedHeader;

/***/ },

/***/ 531:
/*!***************************************************!*\
  !*** ./app/bundles/SiteMap/components/header.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _state = __webpack_require__(/*! ./state */ 532);
	
	var _state2 = _interopRequireDefault(_state);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Header = function (_React$Component) {
	  _inherits(Header, _React$Component);
	
	  function Header(props) {
	    _classCallCheck(this, Header);
	
	    var _this2 = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
	
	    _this2.handleNameChange = _this2.handleNameChange.bind(_this2);
	    _this2.handleShareModalClick = _this2.handleShareModalClick.bind(_this2);
	    _this2.handleNameInputBlur = _this2.handleNameInputBlur.bind(_this2);
	    _this2.handleNameInputFocus = _this2.handleNameInputFocus.bind(_this2);
	    _this2.handleMainHeaderToggle = _this2.handleMainHeaderToggle.bind(_this2);
	    _this2.handleSitemapShareClick = _this2.handleSitemapShareClick.bind(_this2);
	    _this2.toggleCommentState = _this2.toggleCommentState.bind(_this2);
	    _this2.handleNameKeyPressed = _this2.handleNameKeyPressed.bind(_this2);
	    _this2.state = { nameFocused: false, name: props.name, showMainHeader: true, commentSidebarOpen: false, maxLevelOnePages: 0 };
	    return _this2;
	  }
	
	  _createClass(Header, [{
	    key: 'handleNameKeyPressed',
	    value: function handleNameKeyPressed(e) {
	      if (e.charCode == 13) {
	        e.preventDefault();
	        e.stopPropagation();
	        this.handleNameInputBlur();
	      }
	    }
	  }, {
	    key: 'handleMainHeaderToggle',
	    value: function handleMainHeaderToggle(e) {
	      $('body').toggleClass('hide-header');
	      this.setState({ showMainHeader: !this.state.showMainHeader });
	    }
	  }, {
	    key: 'handleNameChange',
	    value: function handleNameChange(event) {
	      var name = event.target.value;
	      this.setState({ name: name });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	      if (this.props.newSitemap) {
	        this.handleNameInputFocus();
	        setTimeout(function () {
	          $(_this.refs.sitemapNameInput).focus();
	        }, 1000);
	      }
	      var reactOuterWrapper = $('#react-app-outer-wrapper');
	      $('.react-header .icon-invite-female').data('url', reactOuterWrapper.data('url'));
	      $('.react-header .icon-invite-female').addClass(reactOuterWrapper.data('invite-permission-modal'));
	    }
	  }, {
	    key: 'handleNameInputBlur',
	    value: function handleNameInputBlur(e) {
	      var _this3 = this;
	
	      var _this = this;
	      this.setState({ nameFocused: false });
	      if (this.state.name != this.props.name) {
	        $.ajax({
	          url: '/sitemaps/' + this.props.id + '/rename',
	          method: 'patch',
	          dataType: 'json',
	          data: { dont_show_flash: true, sitemap: { name: this.state.name } },
	          error: function error(result) {
	            var name = _this.props.name;
	            document.setFlash(result.responseText);
	            _this3.setState({ name: name });
	          },
	          success: function success(result) {
	            _this3.props.setSaving(true);
	            setTimeout(function () {
	              _this.props.setSaving(false);
	            }, 2000);
	            _this3.props.onNameChange(_this.state.name);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'handleNameInputFocus',
	    value: function handleNameInputFocus(e) {
	      this.setState({ nameFocused: true });
	    }
	  }, {
	    key: 'handleSitemapShareClick',
	    value: function handleSitemapShareClick(e) {
	      this.props.showSitemapShareModal();
	    }
	  }, {
	    key: 'handleShareModalClick',
	    value: function handleShareModalClick(e) {
	      this.setState({ maxLevelOnePages: Math.max.apply(Math, _toConsumableArray(this.props.sections.map(function (section) {
	          return section.pageTree && section.pageTree.children.filter(function (child) {
	            return child.state == 'active';
	          }).length;
	        }))) });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var _this = this;
	      if (this.state.nameFocused) {
	        $(this.refs.sitemapNameInput).focus();
	      }
	    }
	  }, {
	    key: 'toggleCommentState',
	    value: function toggleCommentState(e) {
	      this.setState({ commentSidebarOpen: !this.state.commentSidebarOpen });
	      $('.sitemap-right-sidebar').toggleClass('open');
	      $('.comment-list').toggleClass('open');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      var renderStates = ['In Progress', 'Review', 'Approved', 'On Hold'].map(function (state, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: index, className: _this.props.state == state ? 'active' : '' },
	          _react2.default.createElement('i', { className: 'icon-save-circle' }),
	          _react2.default.createElement(_state2.default, { state: state, id: _this.props.id, onStateChange: _this.props.onStateChange, setSaving: _this.props.setSaving })
	        );
	      });
	      var renderUsers = this.props.business.users.slice(0, 3).map(function (user, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: user.id },
	          _react2.default.createElement('img', { src: user.avatarUrl })
	        );
	      });
	      var otherUsersLength = this.props.business.users.length - 3;
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-header' },
	        _react2.default.createElement(
	          'div',
	          { className: 'logo-dark relative pull-left sitemap-back-link' },
	          _react2.default.createElement(
	            'a',
	            { href: '/home' },
	            _react2.default.createElement('img', { src: '/assets/go-back.svg', className: 'go-back-link' })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'pull-left sitemap-name-div' },
	          _react2.default.createElement(
	            'div',
	            { className: 'sitemap-name-div' },
	            _react2.default.createElement('input', { value: this.state.name, onChange: this.handleNameChange, onBlur: this.handleNameInputBlur, className: "site-map-name site-map-name-input" + (this.state.nameFocused ? '' : ' hide'), ref: 'sitemapNameInput', onKeyPress: this.handleNameKeyPressed }),
	            _react2.default.createElement(
	              'h3',
	              { className: "site-map-name truncate " + (this.state.nameFocused ? ' hide' : ''), onClick: this.handleNameInputFocus, ref: 'nameEditor' },
	              this.state.name
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'state-status text-center pull-left' },
	          _react2.default.createElement(
	            'h5',
	            null,
	            _react2.default.createElement(
	              'span',
	              { className: this.props.state },
	              this.props.state,
	              _react2.default.createElement('i', { className: 'icon-caret' })
	            ),
	            _react2.default.createElement(
	              'ul',
	              { className: 'state-drop-down' },
	              renderStates
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'saved-status pull-left' },
	          _react2.default.createElement(
	            'span',
	            null,
	            this.props.saving && _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement('i', { className: 'icon-save-circle' }),
	              ' Saved'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'canvas-switch' },
	          _react2.default.createElement(
	            'ul',
	            null,
	            _react2.default.createElement(
	              'li',
	              { className: 'active' },
	              'Sitemap'
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                'a',
	                { href: location.href.match(/(.*\/\d+)/)[0] + '/userflows' },
	                'User Flow ',
	                _react2.default.createElement(
	                  'span',
	                  { className: 'beta-tag' },
	                  'Beta'
	                )
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'toggle-header pull-right', onClick: this.handleMainHeaderToggle },
	          _react2.default.createElement(
	            'div',
	            { className: "inner-toggle " + (this.state.showMainHeader ? 'caret-up' : '') },
	            _react2.default.createElement('i', { className: 'icon-caret' }),
	            this.state.showMainHeader && _react2.default.createElement(
	              'div',
	              null,
	              'hide'
	            ),
	            !this.state.showMainHeader && _react2.default.createElement(
	              'div',
	              null,
	              'show'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'toggle-comments-outer pull-right' },
	          _react2.default.createElement(
	            'div',
	            { className: 'toggle-comments' },
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0)', className: "btn-toggle-comments" + (this.state.commentSidebarOpen ? ' active' : ''), onClick: this.toggleCommentState },
	              _react2.default.createElement('span', { className: 'icon-comment' }),
	              'Comments',
	              _react2.default.createElement(
	                'span',
	                null,
	                'click to toggle'
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'pull-right users-block' },
	          _react2.default.createElement(
	            'div',
	            { className: 'inner-user-block' },
	            this.props.currentUser.isAdmin && _react2.default.createElement(
	              'span',
	              { className: 'icon-invite-female user-invite cursor', 'data-remote': true },
	              _react2.default.createElement('span', { className: 'path1' }),
	              _react2.default.createElement('span', { className: 'path2' }),
	              _react2.default.createElement('span', { className: 'path3' }),
	              _react2.default.createElement('span', { className: 'path4' }),
	              _react2.default.createElement('span', { className: 'path5' })
	            ),
	            _react2.default.createElement(
	              'ul',
	              { className: 'users-list' },
	              renderUsers
	            ),
	            otherUsersLength > 1 && _react2.default.createElement(
	              'a',
	              { className: 'other-users cursor' },
	              '+ ',
	              otherUsersLength,
	              ' others'
	            ),
	            otherUsersLength == 1 && _react2.default.createElement(
	              'a',
	              { className: 'other-users' },
	              '+ ',
	              otherUsersLength,
	              ' other'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'pull-right share-sitemap-btn-div' },
	          _react2.default.createElement(
	            'div',
	            { className: 'share-sitemap-btn-div' },
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0)', onMouseEnter: this.handleShareModalClick, className: 'btn btn-share action sitemap-share-modal-link', 'data-url': this.props.publicShareUrl, 'data-name': this.props.name, 'data-id': this.props.id, 'data-level-one-pages': this.state.maxLevelOnePages, 'data-shared-users': this.props.sharedUsers.map(function (user) {
	                  return user.user_email;
	                }).join(',') },
	              _react2.default.createElement('span', { className: 'share-icon' }),
	              ' Share'
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return Header;
	}(_react2.default.Component);
	
	Header.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  id: _react.PropTypes.number.isRequired,
	  state: _react.PropTypes.string.isRequired,
	  newSitemap: _react.PropTypes.bool.isRequired,
	  saving: _react.PropTypes.bool.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  onNameChange: _react.PropTypes.func.isRequired,
	  onStateChange: _react.PropTypes.func.isRequired,
	  showSitemapShareModal: _react.PropTypes.func.isRequired
	};
	exports.default = Header;

/***/ },

/***/ 532:
/*!**************************************************!*\
  !*** ./app/bundles/SiteMap/components/state.jsx ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var stateMapping = { 'In Progress': 'in_progress', 'Review': 'review', 'Approved': 'approved', 'On Hold': 'on_hold' };
	
	var State = function (_React$Component) {
	  _inherits(State, _React$Component);
	
	  function State(props) {
	    _classCallCheck(this, State);
	
	    var _this2 = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this, props));
	
	    _this2.handleStateChange = _this2.handleStateChange.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(State, [{
	    key: 'handleStateChange',
	    value: function handleStateChange(event) {
	      var _this = this;
	      $.ajax({
	        url: '/sitemaps/' + this.props.id,
	        method: 'put',
	        dataType: 'JSON',
	        data: { sitemap: { state: stateMapping[this.props.state] } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        complete: function complete(result) {
	          _this.props.setSaving(true);
	          setTimeout(function () {
	            _this.props.setSaving(false);
	          }, 2000);
	        }
	      });
	      this.props.onStateChange(this.props.state);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'sitemap-state', onClick: this.handleStateChange },
	        _react2.default.createElement('span', { className: "state-indicator " + this.props.state }),
	        this.props.state
	      );
	    }
	  }]);
	
	  return State;
	}(_react2.default.Component);
	
	State.propTypes = {
	  state: _react.PropTypes.string.isRequired,
	  onStateChange: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  id: _react.PropTypes.number.isRequired
	};
	exports.default = State;

/***/ },

/***/ 533:
/*!********************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_public_header.jsx ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _public_header = __webpack_require__(/*! ../components/public_header */ 534);
	
	var _public_header2 = _interopRequireDefault(_public_header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { name: state.name, id: state.id, state: state.state, business: state.business, saving: state.saving, updatedAt: state.updated_at, sections: state.sections, footerPages: state.footerPages, introSlideNumber: state.introSlideNumber, currentUser: state.currentUser, currentGuest: state.currentGuest };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    setShowGuestInfoForm: function setShowGuestInfoForm(showGuestInfoForm) {
	      dispatch((0, _actions.setShowGuestInfoForm)(showGuestInfoForm));
	    }
	  };
	};
	
	var ConnectedPublicHeader = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_public_header2.default);
	
	exports.default = ConnectedPublicHeader;

/***/ },

/***/ 534:
/*!**********************************************************!*\
  !*** ./app/bundles/SiteMap/components/public_header.jsx ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PublicHeader = function (_React$Component) {
	  _inherits(PublicHeader, _React$Component);
	
	  function PublicHeader(props) {
	    _classCallCheck(this, PublicHeader);
	
	    var _this2 = _possibleConstructorReturn(this, (PublicHeader.__proto__ || Object.getPrototypeOf(PublicHeader)).call(this, props));
	
	    _this2.toggleCommentState = _this2.toggleCommentState.bind(_this2);
	    _this2.toggleInductionState = _this2.toggleInductionState.bind(_this2);
	    _this2.state = { name: props.name, showMainHeader: true, commentSidebarOpen: false, inductionSidebarOpen: false };
	    return _this2;
	  }
	
	  _createClass(PublicHeader, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	      $('body').on('click', function (e) {
	        if (!(e.target.closest('.sitemap-induction-sidebar') || e.target.closest('.sitemap-right-sidebar') || e.target.closest('.show-comments-sidebar-link') || e.target.closest('.show-induction-sidebar-link'))) {
	          _this.setState({ commentSidebarOpen: false, inductionSidebarOpen: false });
	          $('.sitemap-induction-sidebar').removeClass('open');
	          $('.sitemap-right-sidebar').removeClass('open');
	          $('.comment-list').removeClass('open');
	        }
	      });
	    }
	  }, {
	    key: 'toggleCommentState',
	    value: function toggleCommentState(e) {
	      if (this.props.currentUser || this.props.currentGuest) {
	        this.setState({ commentSidebarOpen: !this.state.commentSidebarOpen, inductionSidebarOpen: false });
	        $('.sitemap-right-sidebar').toggleClass('open');
	        $('.comment-list').toggleClass('open');
	        $('.sitemap-induction-sidebar').removeClass('open');
	      } else {
	        this.props.setShowGuestInfoForm(true);
	        $('.modal').modal('hide');
	        $('#guest-info-modal').modal('show');
	      }
	    }
	  }, {
	    key: 'toggleInductionState',
	    value: function toggleInductionState(e) {
	      this.setState({ inductionSidebarOpen: !this.state.inductionSidebarOpen, commentSidebarOpen: false });
	      $('.sitemap-induction-sidebar').toggleClass('open');
	      $('.sitemap-right-sidebar').removeClass('open');
	      $('.comment-list').removeClass('open');
	    }
	  }, {
	    key: 'getPageCount',
	    value: function getPageCount() {
	      var pageCount = 0;
	      this.props.sections.forEach(function (section, index) {
	        (0, _tree_helper.traverse)(section.pageTree, function (page) {
	          if (page.state != 'archived' && page.state != 'orphan') {
	            pageCount++;
	          }
	        });
	      });
	
	      this.props.footerPages.forEach(function (page, index) {
	        if (page.state != 'archived' && page.state != 'orphan') {
	          pageCount++;
	        }
	      });
	      return pageCount;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-public-header' },
	        this.props.business.logo.logo.url ? _react2.default.createElement(
	          'div',
	          { className: 'business-logo' },
	          _react2.default.createElement('img', { className: 'profile-image profile-image-lg', src: this.props.business.logo.logo.url, alt: 'Logo' })
	        ) : _react2.default.createElement(
	          'div',
	          { className: 'business-name' },
	          _react2.default.createElement(
	            'h3',
	            { className: 'site-map-name' },
	            this.props.business.name
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-xs-8 col-xs-offset-2 text-center shared-details' },
	            _react2.default.createElement(
	              'h1',
	              { className: 'truncate' },
	              this.props.name
	            ),
	            _react2.default.createElement(
	              'span',
	              { className: 'last-updated' },
	              'Last updated ',
	              this.props.updatedAt
	            ),
	            _react2.default.createElement(
	              'span',
	              { className: 'page-count' },
	              this.getPageCount(),
	              ' ',
	              this.getPageCount() == 1 ? 'Page' : 'Pages'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'header-options' },
	          _react2.default.createElement(
	            'a',
	            { href: 'javascript:void(0)', className: 'show-comments-sidebar-link ' + (this.state.commentSidebarOpen || this.props.introSlideNumber == 2 ? ' active' : ''), onClick: this.toggleCommentState },
	            _react2.default.createElement('span', { className: 'icon-comment-circle' })
	          ),
	          _react2.default.createElement(
	            'a',
	            { href: 'javascript:void(0)', className: 'show-induction-sidebar-link ' + (this.state.inductionSidebarOpen ? 'active' : ''), onClick: this.toggleInductionState },
	            _react2.default.createElement('span', { className: 'icon-question-circle' })
	          )
	        )
	      );
	    }
	  }]);
	
	  return PublicHeader;
	}(_react2.default.Component);
	
	PublicHeader.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  id: _react.PropTypes.number.isRequired,
	  sections: _react.PropTypes.array.isRequired,
	  footerPages: _react.PropTypes.array.isRequired,
	  state: _react.PropTypes.string.isRequired,
	  updatedAt: _react.PropTypes.string.isRequired
	};
	exports.default = PublicHeader;

/***/ },

/***/ 535:
/*!*******************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_trial_header.jsx ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _trial_header = __webpack_require__(/*! ../components/trial_header */ 536);
	
	var _trial_header2 = _interopRequireDefault(_trial_header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sitemapId: state.id, createdAt: state.createdAt };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {};
	};
	
	var ConnectedTrialHeader = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_trial_header2.default);
	
	exports.default = ConnectedTrialHeader;

/***/ },

/***/ 536:
/*!*********************************************************!*\
  !*** ./app/bundles/SiteMap/components/trial_header.jsx ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _trial_intro_screen = __webpack_require__(/*! ./trial_intro_screen */ 537);
	
	var _trial_intro_screen2 = _interopRequireDefault(_trial_intro_screen);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TrialHeader = function (_React$Component) {
	  _inherits(TrialHeader, _React$Component);
	
	  function TrialHeader() {
	    _classCallCheck(this, TrialHeader);
	
	    return _possibleConstructorReturn(this, (TrialHeader.__proto__ || Object.getPrototypeOf(TrialHeader)).apply(this, arguments));
	  }
	
	  _createClass(TrialHeader, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var remainingTime = 60 * 1000 - (new Date() - new Date(this.props.createdAt));
	      setTimeout(function () {
	        $('#user-signup-modal').modal('show');
	      }, remainingTime);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-trial-header' },
	        _react2.default.createElement(
	          'a',
	          { href: '/log-in', className: 'logo-dark-trial' },
	          _react2.default.createElement('img', { src: '/assets/logo-dark.svg', alt: ' ' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'shared-details' },
	          _react2.default.createElement(
	            'p',
	            null,
	            'Create a free account to save, share, comment, and to create more sitemaps.'
	          ),
	          _react2.default.createElement(
	            'a',
	            { className: 'btn', 'data-toggle': 'modal', href: '#user-signup-modal' },
	            'Create my free account'
	          )
	        ),
	        _react2.default.createElement(_trial_intro_screen2.default, null)
	      );
	    }
	  }]);
	
	  return TrialHeader;
	}(_react2.default.Component);
	
	exports.default = TrialHeader;

/***/ },

/***/ 537:
/*!***************************************************************!*\
  !*** ./app/bundles/SiteMap/components/trial_intro_screen.jsx ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactClickOutside = __webpack_require__(/*! react-click-outside */ 515);
	
	var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TrialIntroScreen = function (_React$Component) {
	  _inherits(TrialIntroScreen, _React$Component);
	
	  function TrialIntroScreen(props) {
	    _classCallCheck(this, TrialIntroScreen);
	
	    var _this2 = _possibleConstructorReturn(this, (TrialIntroScreen.__proto__ || Object.getPrototypeOf(TrialIntroScreen)).call(this, props));
	
	    _this2.state = { showDemo: false, showDemoHandle: true };
	    _this2.hideDemo = _this2.hideDemo.bind(_this2);
	    _this2.showDemo = _this2.showDemo.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(TrialIntroScreen, [{
	    key: 'hideDemo',
	    value: function hideDemo() {
	      this.setState({ showDemo: false, showDemoHandle: false });
	    }
	  }, {
	    key: 'showDemo',
	    value: function showDemo() {
	      this.setState({ showDemo: true });
	    }
	  }, {
	    key: 'handleClickOutside',
	    value: function handleClickOutside() {
	      if (this.state.showDemo) {
	        this.hideDemo();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: "intro-box-trial " + (this.state.showDemo ? '' : 'hide-demo') },
	        this.state.showDemoHandle && _react2.default.createElement(
	          'span',
	          { className: 'hotspot', onClick: this.showDemo },
	          _react2.default.createElement('span', { className: 'pulse pulse-1' }),
	          _react2.default.createElement('span', { className: 'pulse pulse-2' }),
	          _react2.default.createElement('span', { className: 'pulse pulse-3' })
	        ),
	        this.state.showDemo && _react2.default.createElement(
	          'div',
	          { className: 'intro-box' },
	          _react2.default.createElement(
	            'figure',
	            null,
	            _react2.default.createElement('img', { alt: ' ', src: '/assets/Intro1.png' })
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'Drag and drop screen tiles to build your sitemap fast.'
	          ),
	          _react2.default.createElement(
	            'a',
	            { href: 'javascript:void(0);', onClick: this.hideDemo },
	            'Got it'
	          )
	        )
	      );
	    }
	  }]);
	
	  return TrialIntroScreen;
	}(_react2.default.Component);
	
	TrialIntroScreen.propTypes = {
	  introSlideNumber: _react.PropTypes.number.isRequired
	};
	exports.default = (0, _reactClickOutside2.default)(TrialIntroScreen);

/***/ },

/***/ 538:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/components/induction_sidebar.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InductionSidebar = function (_React$Component) {
	  _inherits(InductionSidebar, _React$Component);
	
	  function InductionSidebar() {
	    _classCallCheck(this, InductionSidebar);
	
	    return _possibleConstructorReturn(this, (InductionSidebar.__proto__ || Object.getPrototypeOf(InductionSidebar)).apply(this, arguments));
	  }
	
	  _createClass(InductionSidebar, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'sitemap-induction-sidebar' },
	        _react2.default.createElement(
	          'div',
	          { className: 'general-comments' },
	          _react2.default.createElement(
	            'h2',
	            { className: 'comment-type-heading' },
	            'Induction'
	          ),
	          _react2.default.createElement(
	            'ul',
	            null,
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                'p',
	                null,
	                'Click on an individual screen to add comments to that ',
	                _react2.default.createElement('br', null),
	                ' screen'
	              ),
	              _react2.default.createElement(
	                'figure',
	                null,
	                _react2.default.createElement('img', { alt: ' ', src: '/assets/share-intro-1.jpg' })
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                'p',
	                null,
	                'Click on the comments icon above to view grouped comments and to add general comments'
	              ),
	              _react2.default.createElement(
	                'figure',
	                null,
	                _react2.default.createElement('img', { alt: ' ', src: '/assets/share-intro-3.jpg' })
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                'p',
	                null,
	                'To share this sitemap with others, copy and paste the URL from the browser bar and share it with them'
	              ),
	              _react2.default.createElement(
	                'figure',
	                null,
	                _react2.default.createElement('img', { alt: ' ', src: '/assets/share-intro-2.jpg' })
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return InductionSidebar;
	}(_react2.default.Component);
	
	InductionSidebar.propTypes = {};
	exports.default = InductionSidebar;

/***/ },

/***/ 539:
/*!******************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_introduction_screen_two.jsx ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _introduction_screen_two = __webpack_require__(/*! ../components/introduction_screen_two */ 540);
	
	var _introduction_screen_two2 = _interopRequireDefault(_introduction_screen_two);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { introSlideNumber: state.introSlideNumber };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    setIntroSlideNumber: function setIntroSlideNumber(introSlideNumber) {
	      dispatch((0, _actions.setIntroSlideNumber)(introSlideNumber));
	    }
	  };
	};
	
	var ConnectedIntroductionScreenTwo = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_introduction_screen_two2.default);
	
	exports.default = ConnectedIntroductionScreenTwo;

/***/ },

/***/ 540:
/*!********************************************************************!*\
  !*** ./app/bundles/SiteMap/components/introduction_screen_two.jsx ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactClickOutside = __webpack_require__(/*! react-click-outside */ 515);
	
	var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var IntroductionScreensTwo = function (_React$Component) {
	  _inherits(IntroductionScreensTwo, _React$Component);
	
	  function IntroductionScreensTwo(props) {
	    _classCallCheck(this, IntroductionScreensTwo);
	
	    var _this2 = _possibleConstructorReturn(this, (IntroductionScreensTwo.__proto__ || Object.getPrototypeOf(IntroductionScreensTwo)).call(this, props));
	
	    _this2.setIntroSlideNumber = _this2.setIntroSlideNumber.bind(_this2);
	    _this2.hideSecondScreenHandle = _this2.hideSecondScreenHandle.bind(_this2);
	    _this2.handleClickOutside = _this2.handleClickOutside.bind(_this2);
	    _this2.state = { showSecondScreenHandle: true, showThirdScreenHandle: true };
	    return _this2;
	  }
	
	  _createClass(IntroductionScreensTwo, [{
	    key: 'hideSecondScreenHandle',
	    value: function hideSecondScreenHandle(e) {
	      this.setState({ showSecondScreenHandle: false });
	      this.props.setIntroSlideNumber(0);
	    }
	  }, {
	    key: 'setIntroSlideNumber',
	    value: function setIntroSlideNumber(number) {
	      this.props.setIntroSlideNumber(number);
	    }
	  }, {
	    key: 'handleClickOutside',
	    value: function handleClickOutside() {
	      if (this.state.showSecondScreenHandle && this.props.introSlideNumber == 2) {
	        this.hideSecondScreenHandle();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'public-intro' },
	        _react2.default.createElement(
	          'div',
	          { className: 'intro-box-2' },
	          _react2.default.createElement(
	            'span',
	            { className: "hotspot " + (this.state.showSecondScreenHandle ? '' : 'hide'), onClick: function onClick(e) {
	                _this.setIntroSlideNumber(2);
	              } },
	            _react2.default.createElement('span', { className: 'pulse pulse-1' }),
	            _react2.default.createElement('span', { className: 'pulse pulse-2' }),
	            _react2.default.createElement('span', { className: 'pulse pulse-3' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: "intro-box share-2" + (this.props.introSlideNumber == 2 ? '' : ' hide') },
	            _react2.default.createElement(
	              'figure',
	              null,
	              _react2.default.createElement('img', { alt: ' ', src: '/assets/share-intro-3.jpg' })
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              'Click on the comments icon above to view grouped comments and to add general comments'
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: 'javascript:void(0);', onClick: this.hideSecondScreenHandle },
	              'Got it'
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return IntroductionScreensTwo;
	}(_react2.default.Component);
	
	IntroductionScreensTwo.propTypes = {
	  introSlideNumber: _react.PropTypes.number.isRequired
	};
	exports.default = (0, _reactClickOutside2.default)(IntroductionScreensTwo);

/***/ },

/***/ 541:
/*!****************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_guest_info_form_modal.jsx ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _guest_info_form_modal = __webpack_require__(/*! ../components/guest_info_form_modal */ 542);
	
	var _guest_info_form_modal2 = _interopRequireDefault(_guest_info_form_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { showForm: state.showGuestInfoForm };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onFormSubmit: function onFormSubmit(name, email) {
	      dispatch((0, _actions.setShowGuestInfoForm)(false));
	      dispatch((0, _actions.setCurrentGuest)(name, email));
	    }
	  };
	};
	
	var ConnectedGuestInfoFormModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_guest_info_form_modal2.default);
	
	exports.default = ConnectedGuestInfoFormModal;

/***/ },

/***/ 542:
/*!******************************************************************!*\
  !*** ./app/bundles/SiteMap/components/guest_info_form_modal.jsx ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GuestInfoFormModal = function (_React$Component) {
	  _inherits(GuestInfoFormModal, _React$Component);
	
	  function GuestInfoFormModal(props) {
	    _classCallCheck(this, GuestInfoFormModal);
	
	    var _this = _possibleConstructorReturn(this, (GuestInfoFormModal.__proto__ || Object.getPrototypeOf(GuestInfoFormModal)).call(this, props));
	
	    _this.state = { name: '', email: '', errors: false };
	    _this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
	    _this.handleNameChange = _this.handleNameChange.bind(_this);
	    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
	    return _this;
	  }
	
	  _createClass(GuestInfoFormModal, [{
	    key: 'handleFormSubmit',
	    value: function handleFormSubmit(e) {
	      e.preventDefault();
	      if (this.valid(this.state.name, this.state.email)) {
	        this.props.onFormSubmit(this.state.name, this.state.email);
	        $.ajax({
	          url: '/guests/',
	          method: 'post',
	          dataType: 'JSON',
	          data: { name: this.state.name, email: this.state.email },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          success: function success(result) {
	            $('#guest-info-modal').modal('hide');
	          }
	        });
	      } else {
	        this.setState({ errors: true });
	      }
	    }
	  }, {
	    key: 'valid',
	    value: function valid(name, email) {
	      var nameIsValid = name.trim().length > 0;
	      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	      var emailIsValid = emailRegex.test(email.trim());
	      return nameIsValid && emailIsValid;
	    }
	  }, {
	    key: 'handleNameChange',
	    value: function handleNameChange(e) {
	      this.setState({ name: e.target.value });
	    }
	  }, {
	    key: 'handleEmailChange',
	    value: function handleEmailChange(e) {
	      this.setState({ email: e.target.value });
	    }
	
	    // componentDidUpdate(e) {
	    //   if(this.props.showForm) {
	    //     $('.modal').modal('hide');
	    //     $('#guest-info-modal').modal('show');
	    //   }
	    // }
	
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade guest-modal', id: 'guest-info-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'comment-delete-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body user-entry text-center' },
	              _react2.default.createElement(
	                'div',
	                { className: 'logo' },
	                _react2.default.createElement('img', { className: 'logo-inner', src: '/assets/Timblee-icon.svg' })
	              ),
	              _react2.default.createElement(
	                'h1',
	                { className: 'modal-heading' },
	                'To view or add sitemap comments, you need to ',
	                _react2.default.createElement('br', null),
	                ' add your name and email. This will let us notify ',
	                _react2.default.createElement('br', null),
	                ' you when someone responds to your ',
	                _react2.default.createElement('br', null),
	                ' comments.'
	              ),
	              _react2.default.createElement(
	                'p',
	                { className: 'small' },
	                'You will be able to add and view comments instantly.'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'gurst-info-form user-form' },
	                this.state.errors && _react2.default.createElement(
	                  'div',
	                  { className: 'form-error' },
	                  'Please enter a valid name and email.'
	                ),
	                this.props.showForm && _react2.default.createElement(
	                  'form',
	                  { onSubmit: this.handleFormSubmit },
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'form-group' },
	                    _react2.default.createElement('input', { className: 'form-control', type: 'text', placeholder: 'Your name', value: this.state.name, onChange: this.handleNameChange })
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'form-group' },
	                    _react2.default.createElement('input', { className: 'form-control', type: 'email', placeholder: 'Your email', value: this.state.email, onChange: this.handleEmailChange })
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'form-group' },
	                    _react2.default.createElement(
	                      'button',
	                      { type: 'submit', className: 'btn btn-pink btn-block' },
	                      'Start adding and viewing comments'
	                    )
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'go-to-login text-center' },
	                'Already signed up? ',
	                _react2.default.createElement(
	                  'a',
	                  { href: '/log-in', className: 'link' },
	                  'Log in here'
	                ),
	                '.'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return GuestInfoFormModal;
	}(_react2.default.Component);
	
	GuestInfoFormModal.propTypes = {
	  showForm: _react.PropTypes.bool.isRequired,
	  onFormSubmit: _react.PropTypes.func.isRequired
	};
	exports.default = GuestInfoFormModal;

/***/ },

/***/ 543:
/*!*******************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_left_sidebar.jsx ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _left_sidebar = __webpack_require__(/*! ../components/left_sidebar */ 544);
	
	var _left_sidebar2 = _interopRequireDefault(_left_sidebar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { orphanPages: state.orphanPages, pageTypes: state.pageTypes, sections: state.sections, updatedAt: state.updated_at, leftSidebarExpanded: state.leftSidebarExpanded, footerPages: state.footerPages, trial: state.trial };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    toggleLeftSideBarExpanded: function toggleLeftSideBarExpanded(expanded) {
	      dispatch((0, _actions.changeLeftSideBarExpanded)(expanded));
	    }
	  };
	};
	
	var ConnectedLeftSideBar = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_left_sidebar2.default);
	
	exports.default = ConnectedLeftSideBar;

/***/ },

/***/ 544:
/*!*********************************************************!*\
  !*** ./app/bundles/SiteMap/components/left_sidebar.jsx ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _draggable_page_type = __webpack_require__(/*! ./draggable_page_type */ 545);
	
	var _draggable_page_type2 = _interopRequireDefault(_draggable_page_type);
	
	var _draggable_orphan_page = __webpack_require__(/*! ./draggable_orphan_page */ 547);
	
	var _draggable_orphan_page2 = _interopRequireDefault(_draggable_orphan_page);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LeftSidebar = function (_React$Component) {
	  _inherits(LeftSidebar, _React$Component);
	
	  function LeftSidebar(props) {
	    _classCallCheck(this, LeftSidebar);
	
	    var _this2 = _possibleConstructorReturn(this, (LeftSidebar.__proto__ || Object.getPrototypeOf(LeftSidebar)).call(this, props));
	
	    _this2.state = {
	      searchQuery: ''
	    };
	    _this2.toogleExpand = _this2.toogleExpand.bind(_this2);
	    _this2.handleSearch = _this2.handleSearch.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(LeftSidebar, [{
	    key: 'toogleExpand',
	    value: function toogleExpand() {
	      this.props.toggleLeftSideBarExpanded(!this.props.leftSidebarExpanded);
	    }
	  }, {
	    key: 'handleSearch',
	    value: function handleSearch(e) {
	      this.setState({ searchQuery: e.target.value });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      /*$('body').on('focus', '#page-type', function() {
	        $(this).prop('placeholder', 'Search screen types')
	      });
	      $('body').on('blur', '#page-type', function() {
	        $(this).prop('placeholder', 'Screen types')
	      });*/
	      if (this.props.trial) {
	        $('body').addClass('trial');
	      }
	    }
	  }, {
	    key: 'getPageCount',
	    value: function getPageCount(sections, footerPages) {
	      var pageCount = 0;
	      sections.forEach(function (section, index) {
	        (0, _tree_helper.traverse)(section.pageTree, function (page) {
	          if (page.state != 'archived' && page.state != 'orphan') {
	            pageCount++;
	          }
	        });
	      });
	
	      footerPages.forEach(function (page, index) {
	        if (page.state != 'archived' && page.state != 'orphan') {
	          pageCount++;
	        }
	      });
	      return pageCount;
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return this.props.leftSidebarExpanded != nextProps.leftSidebarExpanded || this.props.updatedAt != nextProps.updatedAt || this.getPageCount(this.props.sections, this.props.footerPages) != this.getPageCount(nextProps.sections, nextProps.footerPages) || this.props.footerPages.length != nextProps.footerPages.length || this.state.searchQuery != nextState.searchQuery || this.props.orphanPages.length != nextProps.orphanPages.length;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      if (this.state.searchQuery.length > 0) {
	        var searchQueryRegExp = new RegExp('\\b' + this.state.searchQuery, 'gi');
	        var filteredPageTypes = this.props.pageTypes.filter(function (pageType) {
	          return pageType.name.match(searchQueryRegExp);
	        });
	        var filteredOrphanPages = this.props.orphanPages.filter(function (page) {
	          return page.name.match(searchQueryRegExp);
	        });
	      } else {
	        var filteredPageTypes = this.props.pageTypes;
	        var filteredOrphanPages = this.props.orphanPages;
	      }
	      var pageTypeComponents = filteredPageTypes.map(function (pageType, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: pageType.id },
	          _react2.default.createElement(_draggable_page_type2.default, { name: pageType.name, iconName: pageType.icon_name, id: pageType.id })
	        );
	      });
	      var orphanPageComponents = filteredOrphanPages.map(function (page, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: page.id },
	          _react2.default.createElement(_draggable_orphan_page2.default, { page: page })
	        );
	      });
	      return _react2.default.createElement(
	        'div',
	        { className: 'sitemap-left-sidebar' + (this.props.leftSidebarExpanded ? '' : ' expand-false') + (this.props.trial ? ' trial' : '') },
	        this.props.leftSidebarExpanded ? _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'div',
	            { className: "close-left-bar" + (this.props.trial ? ' hide' : '') },
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement(
	                'span',
	                { className: 'cursor col-xs-5 p-r-0', onClick: this.toogleExpand },
	                _react2.default.createElement(
	                  'span',
	                  { className: 'caret-left' },
	                  _react2.default.createElement('i', { className: 'icon-caret' })
	                ),
	                'Hide Sidebar'
	              ),
	              _react2.default.createElement(
	                'span',
	                { className: 'last-updated col-xs-7 p-r-0 text-right' },
	                this.getPageCount(this.props.sections, this.props.footerPages),
	                ' ',
	                this.getPageCount(this.props.sections, this.props.footerPages) == 1 ? 'Page' : 'Pages',
	                ' | Last updated ',
	                this.props.updatedAt
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'form',
	            { className: 'search-page-type' },
	            _react2.default.createElement('input', { type: 'search', id: 'page-type', value: this.state.searchQuery, name: 'page-type', placeholder: 'Search screens...', className: this.state.searchQuery.length > 0 ? ' search-active' : '', onChange: this.handleSearch }),
	            _react2.default.createElement(
	              'label',
	              { htmlFor: 'page-type' },
	              _react2.default.createElement('i', { className: 'icon-search' })
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'left-bar-wrapper' },
	            filteredOrphanPages.length > 0 && _react2.default.createElement(
	              'span',
	              null,
	              _react2.default.createElement(
	                'div',
	                { className: 'orphan-screens-details' },
	                'Orphan screens  ',
	                _react2.default.createElement(
	                  'span',
	                  { className: 'pull-right screens-count' },
	                  filteredOrphanPages.length + (filteredOrphanPages.length == 1 ? ' Screen' : ' Screens')
	                )
	              ),
	              _react2.default.createElement(
	                'ul',
	                { className: "page-type-list orphan-page-type-list clearfix" + (filteredOrphanPages.length == 0 ? ' hide' : '') },
	                orphanPageComponents
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'default-screens-details' },
	              'Default screens  ',
	              _react2.default.createElement(
	                'span',
	                { className: 'pull-right screens-count' },
	                filteredPageTypes.length + (filteredPageTypes.length == 1 ? ' Screen' : ' Screens')
	              )
	            ),
	            _react2.default.createElement(
	              'ul',
	              { className: "page-type-list clearfix" + (filteredPageTypes.length == 0 ? ' hide' : '') },
	              pageTypeComponents
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'text-center no-match-text' + (filteredPageTypes.length == 0 ? '' : ' hide') },
	              'There are no default screens that match \'',
	              this.state.searchQuery,
	              '\''
	            )
	          )
	        ) : _react2.default.createElement(
	          'div',
	          { className: 'expand-btn', onClick: this.toogleExpand },
	          _react2.default.createElement(
	            'span',
	            null,
	            'Expand'
	          )
	        )
	      );
	    }
	  }]);
	
	  return LeftSidebar;
	}(_react2.default.Component);
	
	LeftSidebar.propTypes = {
	  pageTypes: _react.PropTypes.array.isRequired,
	  orphanPages: _react.PropTypes.array.isRequired,
	  sections: _react.PropTypes.array.isRequired,
	  footerPages: _react.PropTypes.array.isRequired,
	  updatedAt: _react.PropTypes.string.isRequired,
	  leftSidebarExpanded: _react.PropTypes.bool.isRequired,
	  trial: _react.PropTypes.bool.isRequired,
	  toggleLeftSideBarExpanded: _react.PropTypes.func.isRequired
	};
	exports.default = LeftSidebar;

/***/ },

/***/ 545:
/*!****************************************************************!*\
  !*** ./app/bundles/SiteMap/components/draggable_page_type.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDndHtml5Backend = __webpack_require__(/*! react-dnd-html5-backend */ 356);
	
	var _page_type = __webpack_require__(/*! ./page_type */ 546);
	
	var _page_type2 = _interopRequireDefault(_page_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var pageTypeSource = {
	  beginDrag: function beginDrag(props, monitor, component) {
	    return { id: props.id, name: props.name, iconName: props.iconName, type: 'PageType' };
	  }
	};
	
	var DragSourceDecorator = (0, _reactDnd.DragSource)(_constants.ItemTypes.PAGE_TYPE, pageTypeSource, function (connect, monitor) {
	  return {
	    connectDragSource: connect.dragSource(),
	    connectDragPreview: connect.dragPreview(),
	    isDragging: monitor.isDragging()
	  };
	});
	
	var DraggedPageType = function (_React$Component) {
	  _inherits(DraggedPageType, _React$Component);
	
	  function DraggedPageType() {
	    _classCallCheck(this, DraggedPageType);
	
	    return _possibleConstructorReturn(this, (DraggedPageType.__proto__ || Object.getPrototypeOf(DraggedPageType)).apply(this, arguments));
	  }
	
	  _createClass(DraggedPageType, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {});
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          connectDragSource = _props.connectDragSource,
	          isDragging = _props.isDragging;
	
	      return connectDragSource(_react2.default.createElement(
	        'div',
	        { className: 'page-type-wrapper' + (isDragging ? ' dragging' : '') },
	        _react2.default.createElement(_page_type2.default, { name: this.props.name, iconName: this.props.iconName, isDragPrview: false })
	      ));
	    }
	  }]);
	
	  return DraggedPageType;
	}(_react2.default.Component);
	
	DraggedPageType.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  iconName: _react.PropTypes.string.isRequired,
	  id: _react.PropTypes.number.isRequired
	};
	
	
	var DraggablePageType = DragSourceDecorator(DraggedPageType);
	exports.default = DraggablePageType;

/***/ },

/***/ 546:
/*!******************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_type.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PageType = function (_React$Component) {
	  _inherits(PageType, _React$Component);
	
	  function PageType() {
	    _classCallCheck(this, PageType);
	
	    return _possibleConstructorReturn(this, (PageType.__proto__ || Object.getPrototypeOf(PageType)).apply(this, arguments));
	  }
	
	  _createClass(PageType, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "page-type-outer " + this.props.iconName },
	        _react2.default.createElement(
	          "div",
	          { className: "page-type-box" },
	          _react2.default.createElement(
	            "aside",
	            { className: "page-type-details" },
	            _react2.default.createElement(
	              "span",
	              { className: "dummy-number" },
	              "xx"
	            ),
	            _react2.default.createElement(
	              "h5",
	              null,
	              this.props.name
	            ),
	            _react2.default.createElement(
	              "span",
	              { className: "dummy-id" },
	              _react2.default.createElement("span", { className: "dummy-state" }),
	              " ID: xxx"
	            )
	          ),
	          _react2.default.createElement("aside", { className: "page-type-icon" })
	        ),
	        !this.props.isDragPrview && _react2.default.createElement(
	          "h4",
	          null,
	          this.props.name
	        )
	      );
	    }
	  }]);
	
	  return PageType;
	}(_react2.default.Component);
	
	PageType.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  iconName: _react.PropTypes.string.isRequired
	};
	exports.default = PageType;

/***/ },

/***/ 547:
/*!******************************************************************!*\
  !*** ./app/bundles/SiteMap/components/draggable_orphan_page.jsx ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDndHtml5Backend = __webpack_require__(/*! react-dnd-html5-backend */ 356);
	
	var _orphan_page = __webpack_require__(/*! ./orphan_page */ 548);
	
	var _orphan_page2 = _interopRequireDefault(_orphan_page);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var pageTypeSource = {
	  beginDrag: function beginDrag(props, monitor, component) {
	    return { id: props.page.id, pageTree: props.page, type: 'page' };
	  }
	};
	
	var DragSourceDecorator = (0, _reactDnd.DragSource)(_constants.ItemTypes.ORPHAN_PAGE, pageTypeSource, function (connect, monitor) {
	  return {
	    connectDragSource: connect.dragSource(),
	    connectDragPreview: connect.dragPreview(),
	    isDragging: monitor.isDragging()
	  };
	});
	
	var DraggedOrphanPage = function (_React$Component) {
	  _inherits(DraggedOrphanPage, _React$Component);
	
	  function DraggedOrphanPage() {
	    _classCallCheck(this, DraggedOrphanPage);
	
	    return _possibleConstructorReturn(this, (DraggedOrphanPage.__proto__ || Object.getPrototypeOf(DraggedOrphanPage)).apply(this, arguments));
	  }
	
	  _createClass(DraggedOrphanPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {});
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      var _props = this.props,
	          connectDragSource = _props.connectDragSource,
	          isDragging = _props.isDragging;
	
	      return connectDragSource(_react2.default.createElement(
	        'div',
	        { className: 'page-type-wrapper' + (isDragging ? ' dragging' : '') },
	        _react2.default.createElement(_orphan_page2.default, { page: this.props.page, isDragging: _this.props.isDragging, isDragPrview: false })
	      ));
	    }
	  }]);
	
	  return DraggedOrphanPage;
	}(_react2.default.Component);
	
	var DraggableOrphanPage = DragSourceDecorator(DraggedOrphanPage);
	exports.default = DraggableOrphanPage;

/***/ },

/***/ 548:
/*!********************************************************!*\
  !*** ./app/bundles/SiteMap/components/orphan_page.jsx ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var OrphanPage = function (_React$Component) {
	  _inherits(OrphanPage, _React$Component);
	
	  function OrphanPage() {
	    _classCallCheck(this, OrphanPage);
	
	    return _possibleConstructorReturn(this, (OrphanPage.__proto__ || Object.getPrototypeOf(OrphanPage)).apply(this, arguments));
	  }
	
	  _createClass(OrphanPage, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "page-type-outer " + this.props.page.pageType.icon_name },
	        _react2.default.createElement(
	          "div",
	          { className: "page-type-box" },
	          _react2.default.createElement(
	            "aside",
	            { className: "page-type-details" },
	            _react2.default.createElement(
	              "span",
	              { className: "dummy-number" },
	              "xx"
	            ),
	            _react2.default.createElement(
	              "h5",
	              null,
	              this.props.page.name
	            ),
	            _react2.default.createElement(
	              "span",
	              { className: "dummy-id" },
	              _react2.default.createElement("span", { className: "dummy-state" }),
	              " ID: xxx"
	            )
	          ),
	          _react2.default.createElement("aside", { className: "page-type-icon" })
	        ),
	        !this.props.isDragPrview && _react2.default.createElement(
	          "h4",
	          null,
	          this.props.page.name
	        )
	      );
	    }
	  }]);
	
	  return OrphanPage;
	}(_react2.default.Component);
	
	exports.default = OrphanPage;

/***/ },

/***/ 549:
/*!********************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_right_sidebar.jsx ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _right_sidebar = __webpack_require__(/*! ../components/right_sidebar */ 550);
	
	var _right_sidebar2 = _interopRequireDefault(_right_sidebar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    comments: state.comments,
	    sitemapId: state.id,
	    sections: state.sections,
	    business: state.business,
	    name: state.name,
	    publicShare: state.publicShare,
	    footerPages: state.footerPages
	  };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {};
	};
	
	var ConnectedRightSideBar = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_right_sidebar2.default);
	
	exports.default = ConnectedRightSideBar;

/***/ },

/***/ 550:
/*!**********************************************************!*\
  !*** ./app/bundles/SiteMap/components/right_sidebar.jsx ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	var _connected_comment = __webpack_require__(/*! ../containers/connected_comment */ 551);
	
	var _connected_comment2 = _interopRequireDefault(_connected_comment);
	
	var _connected_mark_as_resolved_check = __webpack_require__(/*! ../containers/connected_mark_as_resolved_check */ 555);
	
	var _connected_mark_as_resolved_check2 = _interopRequireDefault(_connected_mark_as_resolved_check);
	
	var _connected_new_comment = __webpack_require__(/*! ../containers/connected_new_comment */ 557);
	
	var _connected_new_comment2 = _interopRequireDefault(_connected_new_comment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RightSidebar = function (_React$Component) {
	  _inherits(RightSidebar, _React$Component);
	
	  function RightSidebar(props) {
	    _classCallCheck(this, RightSidebar);
	
	    var _this2 = _possibleConstructorReturn(this, (RightSidebar.__proto__ || Object.getPrototypeOf(RightSidebar)).call(this, props));
	
	    _this2.state = { currentTab: 'active' };
	    _this2.handleTabClick = _this2.handleTabClick.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(RightSidebar, [{
	    key: 'handleTabClick',
	    value: function handleTabClick(e, tabName) {
	      this.setState({ currentTab: tabName });
	    }
	  }, {
	    key: 'businessName',
	    value: function businessName() {
	      if (this.props.business.name) {
	        return " " + this.props.business.name + " ";
	      } else {
	        return " ";
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var CommentTabs = ['active', 'resolved', 'archived'];
	      var _this = this;
	      var renderedComments = this.props.comments.map(function (comment, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: comment.id },
	          _react2.default.createElement(_connected_comment2.default, { id: comment.id, message: comment.message, commenter: comment.commenter, createdAt: comment.created_at, editable: true, commentableId: _this.props.sitemapId, commentableType: 'Sitemap', commentableName: _this.props.name, modalView: false, footer: false })
	        );
	      });
	      var pageWithComments = [];
	      this.props.sections.forEach(function (section, index) {
	        (0, _tree_helper.traverse)(section.pageTree, function (page) {
	          if (page.comments.length > 0) {
	            pageWithComments.push({ name: page.name, comments: page.comments, id: page.id, sectionId: section.id, uid: page.uid, state: page.state, footer: page.footer });
	          }
	        });
	      });
	      this.props.footerPages.forEach(function (page, index) {
	        if (page.comments.length > 0) {
	          pageWithComments.push({ name: page.name, comments: page.comments, id: page.id, sectionId: page.section_id, uid: page.uid, state: page.state, footer: page.footer });
	        }
	      });
	      var renderedPageWithComments = pageWithComments.filter(function (page) {
	        return page.state == _this.state.currentTab;
	      }).sort(function (page, nextPage) {
	        return page.uid - nextPage.uid;
	      }).map(function (page, index) {
	        var renderedPageComments = page.comments.map(function (comment, index) {
	          return _react2.default.createElement(
	            'li',
	            { key: comment.id },
	            _react2.default.createElement(_connected_comment2.default, { id: comment.id, message: comment.message, commenter: comment.commenter, createdAt: comment.created_at, editable: page.state == 'active', commentableId: page.id, commentableType: 'Page', sectionId: page.sectionId, commentableName: page.name, modalView: false, footer: page.footer })
	          );
	        });
	        return _react2.default.createElement(
	          'li',
	          { key: page.id },
	          _react2.default.createElement(
	            'div',
	            { className: 'page-comment-details' },
	            _react2.default.createElement(
	              'span',
	              { className: 'page-id' },
	              'ID: ',
	              page.uid
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'clearfix' },
	              _react2.default.createElement(
	                'span',
	                { className: 'page-name truncate pull-left' },
	                page.name
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: page.state != 'archived' && page.state != 'orphan' ? '' : ' hide' },
	                _react2.default.createElement(_connected_mark_as_resolved_check2.default, { page: page })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'ul',
	            { className: 'comment-group' },
	            renderedPageComments
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _this.state.currentTab == 'active' ? '' : ' hide' },
	            _react2.default.createElement(_connected_new_comment2.default, { commentableId: page.id, commentableType: 'Page', sectionId: page.sectionId, footer: page.footer })
	          )
	        );
	      });
	
	      var renderedCommentTabs = CommentTabs.map(function (commentTab, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: index, className: 'comment-tab animated-tab' + (_this.state.currentTab == commentTab ? ' active' : ''), onClick: function onClick(e) {
	              _this.handleTabClick(e, commentTab);
	            } },
	          commentTab
	        );
	      });
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'sitemap-right-sidebar' },
	        !this.props.publicShare && _react2.default.createElement(
	          'div',
	          { className: 'sitemap-comment-tabs comment-header' },
	          _react2.default.createElement(
	            'ul',
	            { className: 'comment-list clearfix' },
	            renderedCommentTabs,
	            _react2.default.createElement('li', { className: 'animated-bar-react' })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'comment-inner-body' },
	          !this.props.publicShare && _react2.default.createElement(
	            'p',
	            { className: 'comment-text' },
	            function () {
	              switch (_this3.state.currentTab) {
	                case "active":
	                  return "Anyone who has the share link can see active comments. Only" + _this3.businessName() + "team members can see resolved and deleted comments.";
	                case "resolved":
	                  return "Resolved conversations are only visible to logged in" + _this3.businessName() + "team members.";
	                case "archived":
	                  return "If a screen with comments is deleted, the conversation is moved here. This is to ensure there is a record of all conversations. Archived conversations are only visible to logged in" + _this3.businessName() + "team members.";
	                default:
	                  return "";
	              }
	            }()
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'general-comments' + (this.state.currentTab == 'active' ? '' : ' hide') },
	            _react2.default.createElement(
	              'h2',
	              { className: 'comment-type-heading' },
	              'General comments'
	            ),
	            _react2.default.createElement(
	              'ul',
	              { className: 'comment-group' },
	              renderedComments
	            ),
	            _react2.default.createElement(_connected_new_comment2.default, { commentableId: this.props.sitemapId, commentableType: 'Sitemap', footer: false })
	          ),
	          _react2.default.createElement(
	            'ul',
	            null,
	            renderedPageWithComments
	          )
	        )
	      );
	    }
	  }]);
	
	  return RightSidebar;
	}(_react2.default.Component);
	
	RightSidebar.propTypes = {
	  comments: _react.PropTypes.array.isRequired,
	  sections: _react.PropTypes.array.isRequired,
	  footerPages: _react.PropTypes.array.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired,
	  name: _react.PropTypes.string.isRequired,
	  business: _react.PropTypes.object.isRequired,
	  publicShare: _react.PropTypes.bool.isRequired
	};
	exports.default = RightSidebar;

/***/ },

/***/ 551:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_comment.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _comment = __webpack_require__(/*! ../components/comment */ 552);
	
	var _comment2 = _interopRequireDefault(_comment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { currentUser: state.currentUser, currentGuest: state.currentGuest };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    setSelectedComment: function setSelectedComment(comment) {
	      dispatch((0, _actions.setSelectedComment)(comment));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedComment = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_comment2.default);
	
	exports.default = ConnectedComment;

/***/ },

/***/ 552:
/*!****************************************************!*\
  !*** ./app/bundles/SiteMap/components/comment.jsx ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _connected_comment_editor = __webpack_require__(/*! ../containers/connected_comment_editor */ 553);
	
	var _connected_comment_editor2 = _interopRequireDefault(_connected_comment_editor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Comment = function (_React$Component) {
	  _inherits(Comment, _React$Component);
	
	  function Comment(props) {
	    _classCallCheck(this, Comment);
	
	    var _this2 = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));
	
	    _this2.state = { editMode: _this2.props.id == _this2.props.commentInEditionId, editable: _this2.props.editable, message: _this2.props.message };
	    _this2.setSelectedComment = _this2.setSelectedComment.bind(_this2);
	    _this2.showEditor = _this2.showEditor.bind(_this2);
	    _this2.closeEditor = _this2.closeEditor.bind(_this2);
	    _this2.editMessage = _this2.editMessage.bind(_this2);
	    _this2.messageFormatter = _this2.messageFormatter.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(Comment, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.setState({ message: nextProps.message });
	      this.setState({ editable: nextProps.editable });
	      this.setState({ editMode: nextProps.id == nextProps.commentInEditionId });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	      $('#page-comments-modal').on('shown.bs.modal', function () {
	        if (_this.state.editMode) {
	          _this.setState({ editMode: false });
	        }
	      });
	    }
	  }, {
	    key: 'showEditor',
	    value: function showEditor(e) {
	      this.setState({ editMode: true, editable: false });
	      if (this.props.commentableType == 'Page' && this.props.setCommentInEditionId) {
	        this.props.setCommentInEditionId(this.props.id);
	      }
	    }
	  }, {
	    key: 'closeEditor',
	    value: function closeEditor(e) {
	      this.setState({ editMode: false, editable: this.props.editable });
	      if (this.props.commentableType == 'Page' && this.props.setCommentInEditionId) {
	        this.props.setCommentInEditionId(null);
	      }
	    }
	  }, {
	    key: 'messageFormatter',
	    value: function messageFormatter() {
	      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	      var text1 = this.state.message.replace(exp, "<a target='_blank' href='$1'>$1</a>");
	      var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	
	      return text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>').replace(/<strong(.*?)>(.*?)<\/strong>/g, function (match, p1, p2) {
	        return '<span class="comment-mention">@' + p2 + '</span>';
	      });
	    }
	  }, {
	    key: 'editMessage',
	    value: function editMessage(message) {
	      this.setState({ message: message });
	    }
	  }, {
	    key: 'setSelectedComment',
	    value: function setSelectedComment(e) {
	      var comment = {
	        id: this.props.id,
	        commentableId: this.props.commentableId,
	        commentableType: this.props.commentableType,
	        commentableName: this.props.commentableName,
	        sectionId: this.props.sectionId,
	        commenter: this.props.commenter,
	        message: this.props.message,
	        createdAt: this.props.createdAt,
	        modalView: this.props.modalView,
	        footer: this.props.footer
	      };
	      this.props.setSelectedComment(comment);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var commenterImageUrl = this.props.commenter.avatar ? this.props.commenter.avatar.avatar.url : '/assets/guest-icon.png';
	      if (this.props.currentUser && this.props.commenter.email == this.props.currentUser.email || this.props.currentGuest && this.props.commenter.email == this.props.currentGuest.email) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'comment-block' },
	          _react2.default.createElement('img', { className: 'user-comment-image', src: commenterImageUrl }),
	          _react2.default.createElement(
	            'h4',
	            null,
	            'You',
	            this.state.editable && _react2.default.createElement(
	              'span',
	              { className: 'comment-action-links' + (this.props.modalView ? ' modal-view' : '') },
	              _react2.default.createElement(
	                'a',
	                { className: 'comment-edit-link cursor', onClick: this.showEditor },
	                ' Edit'
	              ),
	              ' ',
	              _react2.default.createElement(
	                'span',
	                { className: 'divider' },
	                '|'
	              ),
	              _react2.default.createElement(
	                'a',
	                { href: '#comment-delete-modal', className: 'comment-delete-link cursor btn-modal-open', 'data-dismiss': 'modal', onClick: this.setSelectedComment, 'data-toggle': 'modal' },
	                ' Delete'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'h6',
	            null,
	            this.props.createdAt
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'comment-editor-container' + (this.state.editMode ? '' : ' hide') },
	            _react2.default.createElement(_connected_comment_editor2.default, { message: this.state.message, commentableId: this.props.commentableId, commentableType: this.props.commentableType, sectionId: this.props.sectionId, id: this.props.id, closeEditor: this.closeEditor, modalView: this.props.modalView, editMessage: this.editMessage, footer: this.props.footer })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: this.state.editMode ? 'hide' : '' },
	            _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: this.messageFormatter() } })
	          )
	        );
	      } else {
	        return _react2.default.createElement(
	          'div',
	          { className: 'comment-block' },
	          _react2.default.createElement('img', { className: 'user-comment-image', src: commenterImageUrl }),
	          _react2.default.createElement(
	            'h4',
	            null,
	            this.props.commenter.fullName
	          ),
	          _react2.default.createElement(
	            'h6',
	            null,
	            this.props.createdAt
	          ),
	          _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: this.messageFormatter() } })
	        );
	      }
	    }
	  }]);
	
	  return Comment;
	}(_react2.default.Component);
	
	Comment.propTypes = {
	  commentableId: _react.PropTypes.number.isRequired,
	  commentableType: _react.PropTypes.string.isRequired,
	  commentableName: _react.PropTypes.string.isRequired,
	  sectionId: _react.PropTypes.number,
	  commenter: _react.PropTypes.object.isRequired,
	  message: _react.PropTypes.string.isRequired,
	  id: _react.PropTypes.number.isRequired,
	  editable: _react.PropTypes.bool.isRequired,
	  modalView: _react.PropTypes.bool.isRequired,
	  footer: _react.PropTypes.bool,
	  createdAt: _react.PropTypes.string.isRequired
	};
	exports.default = Comment;

/***/ },

/***/ 553:
/*!*********************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_comment_editor.jsx ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _comment_editor = __webpack_require__(/*! ../components/comment_editor */ 554);
	
	var _comment_editor2 = _interopRequireDefault(_comment_editor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { business: state.business, guestUsers: state.guestUsers };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    updateComment: function updateComment(id, commentableId, commentableType, footer, message, sectionId) {
	      if (commentableType == 'Page') {
	        if (footer) {
	          dispatch((0, _actions.updateFooterPageComment)(id, commentableId, message));
	        } else {
	          dispatch((0, _actions.updatePageComment)(id, commentableId, message, sectionId));
	        }
	      } else if (commentableType == 'Sitemap') {
	        dispatch((0, _actions.updateGeneralComment)(id, message));
	      }
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedCommentEditor = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_comment_editor2.default);
	
	exports.default = ConnectedCommentEditor;

/***/ },

/***/ 554:
/*!***********************************************************!*\
  !*** ./app/bundles/SiteMap/components/comment_editor.jsx ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CommentEditor = function (_React$Component) {
	  _inherits(CommentEditor, _React$Component);
	
	  function CommentEditor(props) {
	    _classCallCheck(this, CommentEditor);
	
	    var _this2 = _possibleConstructorReturn(this, (CommentEditor.__proto__ || Object.getPrototypeOf(CommentEditor)).call(this, props));
	
	    _this2.handleUpdateComment = _this2.handleUpdateComment.bind(_this2);
	    _this2.handleCancelComment = _this2.handleCancelComment.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(CommentEditor, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var users_data = this.props.business.users.map(function (object, index) {
	        var d = {};
	        d["value"] = object["full_name"];
	        d["uid"] = "user:" + object["id"];
	        d['image'] = object['avatarUrl'];
	        return d;
	      });
	
	      var guests_data = this.props.guestUsers.map(function (object, index) {
	        var d = {};
	        d["value"] = object["full_name"];
	        d["uid"] = "guest:" + object["id"];
	        d['image'] = object['avatarUrl'];
	        return d;
	      });
	
	      var formatted_data = [];
	
	      formatted_data = formatted_data.concat(users_data);
	      formatted_data = formatted_data.concat(guests_data);
	
	      setupEmojiPicker();
	
	      var placeholderText = $('<div class="new-comment-place-holder">Add a comment... <br> You can mention people by typing @.</div>');
	      $(this.refs.commentEditor).parent().append(placeholderText);
	
	      $(this.refs.commentEditor).next().mentionsInput({ source: formatted_data, showAtCaret: true });
	
	      $(this.refs.commentEditor).html(this.props.message);
	      $(this.refs.commentEditor).next().html(this.props.message);
	
	      displayPlaceholderText($(this.refs.commentEditor));
	    }
	  }, {
	    key: "handleUpdateComment",
	    value: function handleUpdateComment(e) {
	      var textarea = $(this.refs.commentEditor).next();
	
	      var commentMessage = textarea.html();
	
	      if (commentMessage.trim() != this.props.message.trim()) {
	        var _this = this;
	        this.props.updateComment(this.props.id, this.props.commentableId, this.props.commentableType, this.props.footer, commentMessage, this.props.sectionId);
	        $.ajax({
	          url: '/comments/' + this.props.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { comment: { message: commentMessage } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          success: function success(result) {
	            _this.props.setSaving(true);
	            setTimeout(function () {
	              _this.props.setSaving(false);
	            }, 2000);
	          }
	        });
	        this.props.editMessage(commentMessage);
	      }
	      this.props.closeEditor();
	    }
	  }, {
	    key: "handleCancelComment",
	    value: function handleCancelComment(e) {
	      this.props.closeEditor();
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(e) {
	      if (this.refs.commentEditor.innerHTML == '') {
	        $(this.refs.commentEditor).focus();
	        $(this.refs.commentEditor).blur();
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "comment-editor-div" },
	        _react2.default.createElement("textarea", { ref: "commentEditor", defaultValue: this.props.message, id: "temp", className: "emoji-decorated comment-editor comment-input__input", "data-emojiable": "true", "data-emoji-input": "unicode" }),
	        _react2.default.createElement(
	          "div",
	          { className: "add-remove-comment" },
	          _react2.default.createElement(
	            "span",
	            { onClick: this.handleUpdateComment, className: "cursor add" },
	            "Update my comment "
	          ),
	          _react2.default.createElement(
	            "span",
	            { className: "or" },
	            "or"
	          ),
	          _react2.default.createElement(
	            "span",
	            { onClick: this.handleCancelComment, className: "cursor cancel" },
	            " cancel"
	          )
	        )
	      );
	    }
	  }]);
	
	  return CommentEditor;
	}(_react2.default.Component);
	
	CommentEditor.propTypes = {
	  id: _react.PropTypes.number.isRequired,
	  commentableId: _react.PropTypes.number.isRequired,
	  commentableType: _react.PropTypes.string.isRequired,
	  message: _react.PropTypes.string.isRequired,
	  sectionId: _react.PropTypes.number,
	  updateComment: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  editMessage: _react.PropTypes.func.isRequired,
	  footer: _react.PropTypes.bool.isRequired,
	  business: _react.PropTypes.object.isRequired,
	  guestUsers: _react.PropTypes.array
	};
	exports.default = CommentEditor;

/***/ },

/***/ 555:
/*!*****************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_mark_as_resolved_check.jsx ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	var _mark_as_resolved_check = __webpack_require__(/*! ../components/mark_as_resolved_check */ 556);
	
	var _mark_as_resolved_check2 = _interopRequireDefault(_mark_as_resolved_check);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { publicShare: state.publicShare, sections: state.sections, selectedPage: state.selectedPage };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    updatePageState: function updatePageState(pageId, footer, sectionId, state, sections, selectedPage) {
	      if (footer) {
	        dispatch((0, _actions.updateFooterPageState)(pageId, state));
	      } else {
	        dispatch((0, _actions.updatePageState)(pageId, sectionId, state));
	        dispatch((0, _actions.setSelectedPage)((0, _tree_helper.getNodeById)(sections.filter(function (section) {
	          return section.default;
	        })[0].pageTree, selectedPage.id)));
	      }
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedMarkAsResolvedCheck = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_mark_as_resolved_check2.default);
	
	exports.default = ConnectedMarkAsResolvedCheck;

/***/ },

/***/ 556:
/*!*******************************************************************!*\
  !*** ./app/bundles/SiteMap/components/mark_as_resolved_check.jsx ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MarkAsResolvedCheck = function (_React$Component) {
	  _inherits(MarkAsResolvedCheck, _React$Component);
	
	  function MarkAsResolvedCheck(props) {
	    _classCallCheck(this, MarkAsResolvedCheck);
	
	    var _this2 = _possibleConstructorReturn(this, (MarkAsResolvedCheck.__proto__ || Object.getPrototypeOf(MarkAsResolvedCheck)).call(this, props));
	
	    _this2.updatePageState = _this2.updatePageState.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(MarkAsResolvedCheck, [{
	    key: 'updatePageState',
	    value: function updatePageState(state) {
	      var _this3 = this;
	
	      var _this = this;
	      this.props.updatePageState(this.props.page.id, this.props.page.footer, this.props.page.sectionId || this.props.page.section_id, state, this.props.sections, this.props.selectedPage);
	      $.ajax({
	        url: '/pages/' + this.props.page.id,
	        method: 'put',
	        dataType: 'JSON',
	        data: { page: { state: state } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        complete: function complete(result) {
	          _this3.props.setSaving(true);
	          setTimeout(function () {
	            _this.props.setSaving(false);
	          }, 2000);
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      if (this.props.publicShare) {
	        return _react2.default.createElement('div', null);
	      } else {
	        if (this.props.page.state == 'active') {
	          return _react2.default.createElement(
	            'label',
	            { className: 'pull-right', htmlFor: 'mark-resolve' },
	            'Mark as resolved',
	            _react2.default.createElement('input', { type: 'checkbox', checked: false, id: 'mark-resolve', onChange: function onChange(e) {
	                _this.updatePageState('resolved');
	              } })
	          );
	        } else {
	          return _react2.default.createElement(
	            'label',
	            { className: 'pull-right', htmlFor: 'mark-unresolve' },
	            'Unresolve',
	            _react2.default.createElement('input', { type: 'checkbox', checked: 'checked', id: 'mark-unresolve', onChange: function onChange(e) {
	                _this.updatePageState('active');
	              } })
	          );
	        }
	      }
	    }
	  }]);
	
	  return MarkAsResolvedCheck;
	}(_react2.default.Component);
	
	MarkAsResolvedCheck.propTypes = {
	  page: _react.PropTypes.object.isRequired,
	  updatePageState: _react.PropTypes.func.isRequired
	};
	exports.default = MarkAsResolvedCheck;

/***/ },

/***/ 557:
/*!******************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_new_comment.jsx ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	var _new_comment = __webpack_require__(/*! ../components/new_comment */ 558);
	
	var _new_comment2 = _interopRequireDefault(_new_comment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { currentUser: state.currentUser, currentGuest: state.currentGuest, business: state.business, sections: state.sections, selectedPage: state.selectedPage, guestUsers: state.guestUsers };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    addComment: function addComment(commentableId, commentableType, footer, message, commenter, sectionId, tempId, sections, selectedPage) {
	      if (commentableType == 'Page') {
	        if (footer) {
	          dispatch((0, _actions.addFooterPageComment)(commentableId, message, commenter, tempId));
	        } else {
	          dispatch((0, _actions.addPageComment)(commentableId, message, commenter, sectionId, tempId));
	          if (selectedPage) {
	            dispatch((0, _actions.setSelectedPage)((0, _tree_helper.getNodeById)(sections.filter(function (section) {
	              return section.default;
	            })[0].pageTree, selectedPage.id)));
	          }
	        }
	      } else if (commentableType == 'Sitemap') {
	        dispatch((0, _actions.addGeneralComment)(message, commenter, tempId));
	      }
	    },
	    onCommentIdUpdate: function onCommentIdUpdate(commentableType, commentableId, footer, oldId, newId, sectionId, sections, selectedPage) {
	      if (commentableType == 'Page') {
	        if (footer) {
	          dispatch((0, _actions.updateFooterPageCommentId)(oldId, newId, commentableId));
	        } else {
	          dispatch((0, _actions.updatePageCommentId)(oldId, newId, sectionId, commentableId));
	          if (selectedPage) {
	            dispatch((0, _actions.setSelectedPage)((0, _tree_helper.getNodeById)(sections.filter(function (section) {
	              return section.default;
	            })[0].pageTree, selectedPage.id)));
	          }
	        }
	      } else if (commentableType == 'Sitemap') {
	        dispatch((0, _actions.updateGeneralCommentId)(oldId, newId));
	      }
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedNewComment = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_new_comment2.default);
	
	exports.default = ConnectedNewComment;

/***/ },

/***/ 558:
/*!********************************************************!*\
  !*** ./app/bundles/SiteMap/components/new_comment.jsx ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NewComment = function (_React$Component) {
	  _inherits(NewComment, _React$Component);
	
	  function NewComment(props) {
	    _classCallCheck(this, NewComment);
	
	    var _this2 = _possibleConstructorReturn(this, (NewComment.__proto__ || Object.getPrototypeOf(NewComment)).call(this, props));
	
	    _this2.handleAddComment = _this2.handleAddComment.bind(_this2);
	    _this2.handleClearComment = _this2.handleClearComment.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(NewComment, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var users_data = this.props.business.users.map(function (object, index) {
	        var d = {};
	        d["value"] = object["full_name"];
	        d["uid"] = "user:" + object["id"];
	        d['image'] = object['avatarUrl'];
	        return d;
	      });
	
	      var guests_data = this.props.guestUsers.map(function (object, index) {
	        var d = {};
	        d["value"] = object["full_name"];
	        d["uid"] = "guest:" + object["id"];
	        d['image'] = object['avatarUrl'];
	        return d;
	      });
	
	      var formatted_data = [];
	
	      formatted_data = formatted_data.concat(users_data);
	      formatted_data = formatted_data.concat(guests_data);
	
	      setupEmojiPicker();
	
	      var placeholderText = $('<div class="new-comment-place-holder">Add a comment... <br> You can mention people by typing @.</div>');
	      $(this.refs.newComment).parent().append(placeholderText);
	
	      $(this.refs.newComment).next().mentionsInput({ source: formatted_data, showAtCaret: true });
	    }
	  }, {
	    key: "handleAddComment",
	    value: function handleAddComment(e) {
	      var _this3 = this;
	
	      var textarea = $(this.refs.newComment).next();
	
	      var commentMessage = textarea.html();
	
	      if (commentMessage.trim().length > 0) {
	        var _this = this;
	        var timeStamp = new Date().getTime();
	        this.props.addComment(this.props.commentableId, this.props.commentableType, _this.props.footer, commentMessage, this.props.currentUser || this.props.currentGuest, this.props.sectionId, timeStamp, this.props.sections, this.props.selectedPage);
	
	        $.ajax({
	          url: '/comments/',
	          method: 'post',
	          dataType: 'JSON',
	          data: { comment: { commentable_id: this.props.commentableId, commentable_type: this.props.commentableType, message: commentMessage } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          success: function success(result) {
	            _this.props.setSaving(true);
	            setTimeout(function () {
	              _this.props.setSaving(false);
	            }, 2000);
	            _this.props.onCommentIdUpdate(_this.props.commentableType, _this.props.commentableId, _this.props.footer, timeStamp, result.id, _this.props.sectionId, _this3.props.sections, _this3.props.selectedPage);
	          }
	        });
	        this.refs.newComment.innerHTML = '';
	
	        textarea.html('');
	      }
	    }
	  }, {
	    key: "handleClearComment",
	    value: function handleClearComment(e) {
	      $(this.refs.newComment).text('');
	      $(this.refs.newComment).next().html('');
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(e) {
	      if (this.refs.newComment.innerHTML == '') {
	        $(this.refs.newComment).focus();
	        $(this.refs.newComment).blur();
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "comment-holder" },
	        _react2.default.createElement("textarea", { ref: "newComment", id: "temp", className: "emoji-decorated comment-editor comment-input__input", "data-emojiable": "true", "data-emoji-input": "unicode" }),
	        _react2.default.createElement(
	          "div",
	          { className: "add-remove-comment" },
	          _react2.default.createElement(
	            "span",
	            { onClick: this.handleAddComment, className: "cursor add" },
	            "Add my comment "
	          ),
	          _react2.default.createElement(
	            "span",
	            { className: "or" },
	            "or"
	          ),
	          _react2.default.createElement(
	            "span",
	            { onClick: this.handleClearComment, className: "cursor cancel" },
	            " cancel"
	          )
	        )
	      );
	    }
	  }]);
	
	  return NewComment;
	}(_react2.default.Component);
	
	NewComment.propTypes = {
	  commentableId: _react.PropTypes.number.isRequired,
	  commentableType: _react.PropTypes.string.isRequired,
	  footer: _react.PropTypes.bool.isRequired,
	  sectionId: _react.PropTypes.number,
	  addComment: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  onCommentIdUpdate: _react.PropTypes.func.isRequired,
	  business: _react.PropTypes.object.isRequired,
	  guestUsers: _react.PropTypes.array,
	  currentUser: _react.PropTypes.object,
	  selectedPage: _react.PropTypes.object
	};
	exports.default = NewComment;

/***/ },

/***/ 559:
/*!*************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_footer.jsx ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _footer = __webpack_require__(/*! ../components/footer */ 560);
	
	var _footer2 = _interopRequireDefault(_footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { sitemapId: state.id, leftSidebarExpanded: state.leftSidebarExpanded, footerPages: state.footerPages, maxPageUid: state.maxPageUid, publicShare: state.publicShare };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageTypeDrop: function onPageTypeDrop(pageType, timeStamp, maxPageUid) {
	      dispatch((0, _actions.addNewFooterPage)(pageType, timeStamp, maxPageUid + 1));
	      dispatch((0, _actions.setMaxPageUid)(maxPageUid + 1));
	    },
	    onOrphanPageDrop: function onOrphanPageDrop(page) {
	      dispatch((0, _actions.addOrphanPageToFooter)(page));
	      dispatch((0, _actions.removeOrphanPage)(page.id));
	    },
	    onPageIdUpdate: function onPageIdUpdate(id, newId) {
	      dispatch((0, _actions.updateFooterPageId)(id, newId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedFooter = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_footer2.default);
	
	exports.default = ConnectedFooter;

/***/ },

/***/ 560:
/*!***************************************************!*\
  !*** ./app/bundles/SiteMap/components/footer.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 79);
	
	var _connected_page_tile = __webpack_require__(/*! ../containers/connected_page_tile */ 513);
	
	var _connected_page_tile2 = _interopRequireDefault(_connected_page_tile);
	
	var _connected_first_page_droppable = __webpack_require__(/*! ../containers/connected_first_page_droppable */ 528);
	
	var _connected_first_page_droppable2 = _interopRequireDefault(_connected_first_page_droppable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sitemapTarget = {
	  drop: function drop(props, monitor, component) {
	    var item = monitor.getItem();
	    if (monitor.didDrop() || item.pageType == 'page') {
	      return;
	    }
	    if (item.type == 'PageType') {
	      var timeStamp = new Date();
	      $.ajax({
	        url: '/pages/',
	        method: 'post',
	        dataType: 'JSON',
	        data: { page: { page_type_id: item.id, footer: true, sitemap_id: props.sitemapId, name: item.name } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          props.onPageIdUpdate(timeStamp, result.id);
	        },
	        complete: function complete(result) {
	          props.setSaving(true);
	          setTimeout(function () {
	            props.setSaving(false);
	          }, 2000);
	        }
	      });
	      props.onPageTypeDrop(item, timeStamp, props.maxPageUid);
	    } else if (item.type == 'page' && item.pageTree.state == 'orphan') {
	      $.ajax({
	        url: '/pages/' + item.id,
	        method: 'put',
	        dataType: 'JSON',
	        data: { page: { footer: true, state: 'active' } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        complete: function complete(result) {
	          props.setSaving(true);
	          setTimeout(function () {
	            props.setSaving(false);
	          }, 2000);
	        }
	      });
	      props.onOrphanPageDrop(item);
	    }
	  }
	};
	
	var DropTargetDecorator = (0, _reactDnd.DropTarget)([_constants.ItemTypes.PAGE_CONTAINER, _constants.ItemTypes.PAGE_TYPE, _constants.ItemTypes.ORPHAN_PAGE], sitemapTarget, function (connect, monitor) {
	  return {
	    connectDropTarget: connect.dropTarget(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    isOver: monitor.isOver()
	  };
	});
	
	var Footer = function (_React$Component) {
	  _inherits(Footer, _React$Component);
	
	  function Footer() {
	    _classCallCheck(this, Footer);
	
	    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
	  }
	
	  _createClass(Footer, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).addClass('drag-over');
	      }
	
	      if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
	        var domNode = (0, _reactDom.findDOMNode)(this);
	        $(domNode).removeClass('drag-over');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var connectDropTarget = this.props.connectDropTarget;
	      var usablePages = this.props.footerPages.filter(function (page) {
	        return page.state != 'archived' && page.state != 'orphan';
	      });
	      var width = (usablePages.length * 200 + (usablePages.length - 1) * 22 + 40).toString() + 'px';
	      var renderedFooterPages = usablePages.map(function (footerPage, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: footerPage.id, className: 'footer-page' },
	          _react2.default.createElement(_connected_page_tile2.default, { pageTree: footerPage, collapsed: true, childrenLength: 0, name: footerPage.name, level: 0 })
	        );
	      });
	      return connectDropTarget(_react2.default.createElement(
	        'div',
	        { className: "scrollable-div-footer" + (this.props.leftSidebarExpanded ? '' : ' left-bar-contracted') },
	        _react2.default.createElement(
	          'div',
	          { className: 'sitemap-footer', style: { width: width } },
	          usablePages.length > 0 && _react2.default.createElement(
	            'ul',
	            { className: 'footer-page-list' },
	            renderedFooterPages
	          ),
	          usablePages.length == 0 && _react2.default.createElement(_connected_first_page_droppable2.default, { pageTree: { footer: true }, leftSidebarExpanded: this.props.leftSidebarExpanded })
	        )
	      ));
	    }
	  }]);
	
	  return Footer;
	}(_react2.default.Component);
	
	Footer.propTypes = {
	  onPageTypeDrop: _react.PropTypes.func.isRequired,
	  onPageIdUpdate: _react.PropTypes.func.isRequired,
	  setSaving: _react.PropTypes.func.isRequired,
	  sitemapId: _react.PropTypes.number.isRequired,
	  maxPageUid: _react.PropTypes.number.isRequired,
	  leftSidebarExpanded: _react.PropTypes.bool.isRequired
	};
	
	
	var DroppableFooter = DropTargetDecorator(Footer);
	exports.default = DroppableFooter;

/***/ },

/***/ 561:
/*!************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_delete_page_modal.jsx ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _delete_page_modal = __webpack_require__(/*! ../components/delete_page_modal */ 562);
	
	var _delete_page_modal2 = _interopRequireDefault(_delete_page_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { pageTree: state.selectedPage };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageDelete: function onPageDelete(pageTree, maxPageUid) {
	      if (pageTree.footer) {
	        dispatch((0, _actions.removeFooterPage)(pageTree.id));
	      } else {
	        dispatch((0, _actions.removePage)(pageTree.id, pageTree.section_id));
	      }
	    },
	    onPageOrphan: function onPageOrphan(pageTree) {
	      dispatch((0, _actions.addOrphanPage)(pageTree));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedDeletePageModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_delete_page_modal2.default);
	
	exports.default = ConnectedDeletePageModal;

/***/ },

/***/ 562:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/components/delete_page_modal.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _page_container = __webpack_require__(/*! ./page_container */ 512);
	
	var _page_container2 = _interopRequireDefault(_page_container);
	
	var _connected_page_tile = __webpack_require__(/*! ../containers/connected_page_tile */ 513);
	
	var _connected_page_tile2 = _interopRequireDefault(_connected_page_tile);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeletePageModal = function (_React$Component) {
	  _inherits(DeletePageModal, _React$Component);
	
	  function DeletePageModal(props) {
	    _classCallCheck(this, DeletePageModal);
	
	    var _this2 = _possibleConstructorReturn(this, (DeletePageModal.__proto__ || Object.getPrototypeOf(DeletePageModal)).call(this, props));
	
	    _this2.deletePage = _this2.deletePage.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(DeletePageModal, [{
	    key: 'deletePage',
	    value: function deletePage(e) {
	      var _this = this;
	      $.ajax({
	        url: '/pages/' + this.props.pageTree.id,
	        method: 'delete',
	        dataType: 'JSON',
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        success: function success(result) {
	          _this.props.onPageOrphan(result);
	        },
	        complete: function complete(result) {
	          _this.props.setSaving(true);
	          setTimeout(function () {
	            _this.props.setSaving(false);
	          }, 2000);
	        }
	      });
	      this.props.onPageDelete(this.props.pageTree);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade', id: 'delete-page-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'delete-page-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-header text-center' },
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  _react2.default.createElement('img', { src: '/assets/close-modal.svg', className: 'close-modal hide-delete-modal' })
	                )
	              ),
	              _react2.default.createElement(
	                'h4',
	                { className: 'modal-title' },
	                'Delete page'
	              ),
	              _react2.default.createElement(
	                'p',
	                { className: 'modal-message' },
	                "You're about to delete the " + this.props.pageTree.name + " screen and any sub screens underneath it. Any comments linked to deleted screens will be archived and available via the comments sidebar."
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2.default.createElement(
	                'div',
	                { className: 'page-tile-clone text-center' },
	                this.props.pageTree.pageType && _react2.default.createElement(_page_container2.default, { pageTree: this.props.pageTree, childrenLength: 0, level: this.props.pageTree.tempLevel || 0, sitemapNumber: this.props.pageTree.sitemapNumber })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'modal-button text-center' },
	                _react2.default.createElement(
	                  'a',
	                  { href: 'javascript:void(0);', 'data-dismiss': 'modal', className: 'btn btn-red', onClick: this.deletePage },
	                  'Delete Page'
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { href: 'javascript:void(0);', 'data-dismiss': 'modal', className: 'btn btn-grey btn-last' },
	                  'Cancel'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return DeletePageModal;
	}(_react2.default.Component);
	
	DeletePageModal.propTypes = {
	  pageTree: _react.PropTypes.object.isRequired
	};
	exports.default = DeletePageModal;

/***/ },

/***/ 563:
/*!***************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_comment_delete_modal.jsx ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _tree_helper = __webpack_require__(/*! ../helpers/tree_helper */ 319);
	
	var _comment_delete_modal = __webpack_require__(/*! ../components/comment_delete_modal */ 564);
	
	var _comment_delete_modal2 = _interopRequireDefault(_comment_delete_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { comment: state.selectedComment, sections: state.sections, selectedPage: state.selectedPage };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    deleteComment: function deleteComment(id, commentableId, commentableType, footer, sectionId, sections, selectedPage) {
	      if (commentableType == 'Page') {
	        if (footer) {
	          dispatch((0, _actions.deleteFooterPageComment)(id, commentableId));
	        } else {
	          dispatch((0, _actions.deletePageComment)(id, commentableId, sectionId));
	          dispatch((0, _actions.setSelectedPage)((0, _tree_helper.getNodeById)(sections.filter(function (section) {
	            return section.default;
	          })[0].pageTree, selectedPage.id)));
	        }
	      } else {
	        dispatch((0, _actions.deleteGeneralComment)(id));
	      }
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedCommentDeleteModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_comment_delete_modal2.default);
	
	exports.default = ConnectedCommentDeleteModal;

/***/ },

/***/ 564:
/*!*****************************************************************!*\
  !*** ./app/bundles/SiteMap/components/comment_delete_modal.jsx ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _connected_comment = __webpack_require__(/*! ../containers/connected_comment */ 551);
	
	var _connected_comment2 = _interopRequireDefault(_connected_comment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CommentDeleteModal = function (_React$Component) {
	  _inherits(CommentDeleteModal, _React$Component);
	
	  function CommentDeleteModal(props) {
	    _classCallCheck(this, CommentDeleteModal);
	
	    var _this2 = _possibleConstructorReturn(this, (CommentDeleteModal.__proto__ || Object.getPrototypeOf(CommentDeleteModal)).call(this, props));
	
	    _this2.deleteComment = _this2.deleteComment.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(CommentDeleteModal, [{
	    key: 'deleteComment',
	    value: function deleteComment(e) {
	      var _this3 = this;
	
	      var _this = this;
	      this.props.deleteComment(this.props.comment.id, this.props.comment.commentableId, this.props.comment.commentableType, this.props.comment.footer, this.props.comment.sectionId, this.props.sections, this.props.selectedPage);
	      $.ajax({
	        url: '/comments/' + this.props.comment.id,
	        method: 'delete',
	        dataType: 'JSON',
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        complete: function complete(result) {
	          _this3.props.setSaving(true);
	          setTimeout(function () {
	            _this.props.setSaving(false);
	          }, 2000);
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade', id: 'comment-delete-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'comment-delete-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-header text-center' },
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: "close btn-modal-open" + (this.props.comment.modalView ? ' btn-modal-open' : ''), 'data-dismiss': 'modal', 'data-target': '#page-comments-modal', 'data-toggle': this.props.comment.modalView ? 'modal' : '', 'aria-label': 'Close' },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  _react2.default.createElement('img', { src: '/assets/close-modal.svg', className: 'close-modal hide-delete-modal' })
	                )
	              ),
	              _react2.default.createElement(
	                'h4',
	                { className: 'modal-title' },
	                'Delete comment'
	              ),
	              _react2.default.createElement(
	                'p',
	                { className: 'modal-message' },
	                'You are about to delete this comment on ' + this.props.comment.commentableName
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2.default.createElement(
	                'div',
	                { className: 'comment-clone' },
	                this.props.comment.commenter && _react2.default.createElement(
	                  'ul',
	                  { className: 'comment-group' },
	                  _react2.default.createElement(
	                    'li',
	                    null,
	                    _react2.default.createElement(_connected_comment2.default, { id: this.props.comment.id, message: this.props.comment.message, commenter: this.props.comment.commenter, createdAt: this.props.comment.createdAt, editable: false, commentableId: this.props.comment.commentableId, commentableType: 'Page', sectionId: this.props.comment.sectionId, commentableName: this.props.comment.commentableName, modalView: false })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'modal-button text-center' },
	                _react2.default.createElement(
	                  'a',
	                  { href: '#', 'data-dismiss': 'modal', 'data-target': '#page-comments-modal', 'data-toggle': this.props.comment.modalView ? 'modal' : '', className: "btn btn-red" + (this.props.comment.modalView ? ' btn-modal-open-delay' : ''), onClick: this.deleteComment },
	                  'Delete Comment'
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { href: '#', 'data-dismiss': 'modal', 'data-target': '#page-comments-modal', 'data-toggle': this.props.comment.modalView ? 'modal' : '', className: "btn btn-transparent btn-last" + (this.props.comment.modalView ? ' btn-modal-open' : '') },
	                  'Cancel'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return CommentDeleteModal;
	}(_react2.default.Component);
	
	CommentDeleteModal.propTypes = {
	  comment: _react.PropTypes.object.isRequired
	};
	exports.default = CommentDeleteModal;

/***/ },

/***/ 565:
/*!************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_page_change_modal.jsx ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _page_change_modal = __webpack_require__(/*! ../components/page_change_modal */ 566);
	
	var _page_change_modal2 = _interopRequireDefault(_page_change_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { pageTree: state.selectedPage, currentPageType: state.selectedPage.pageType, pageTypes: state.pageTypes };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onPageTypeChange: function onPageTypeChange(pageTree, pageType) {
	      if (pageTree.footer) {
	        dispatch((0, _actions.changeFooterPageType)(pageTree.id, pageType));
	      } else {
	        dispatch((0, _actions.changePageType)(pageTree.id, pageTree.section_id, pageType));
	      }
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedPageChangeModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_page_change_modal2.default);
	
	exports.default = ConnectedPageChangeModal;

/***/ },

/***/ 566:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_change_modal.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _page_type = __webpack_require__(/*! ./page_type */ 546);
	
	var _page_type2 = _interopRequireDefault(_page_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PageChangeModal = function (_React$Component) {
	  _inherits(PageChangeModal, _React$Component);
	
	  function PageChangeModal(props) {
	    _classCallCheck(this, PageChangeModal);
	
	    var _this2 = _possibleConstructorReturn(this, (PageChangeModal.__proto__ || Object.getPrototypeOf(PageChangeModal)).call(this, props));
	
	    _this2.setPageType = _this2.setPageType.bind(_this2);
	    _this2.handleSearch = _this2.handleSearch.bind(_this2);
	    _this2.state = { searchQuery: '' };
	    return _this2;
	  }
	
	  _createClass(PageChangeModal, [{
	    key: 'handleSearch',
	    value: function handleSearch(e) {
	      this.setState({ searchQuery: e.target.value });
	    }
	  }, {
	    key: 'setPageType',
	    value: function setPageType(pageType) {
	      var _this = this;
	      $.ajax({
	        url: '/pages/' + this.props.pageTree.id,
	        method: 'put',
	        dataType: 'JSON',
	        data: { page: { page_type_id: pageType.id } },
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        complete: function complete(result) {
	          _this.props.setSaving(true);
	          setTimeout(function () {
	            _this.props.setSaving(false);
	          }, 2000);
	        }
	      });
	      this.setState({ currentPageType: pageType });
	      this.props.onPageTypeChange(this.props.pageTree, pageType);
	      $('#page-change-modal').modal('hide');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      if (this.state.searchQuery.length > 0) {
	        var searchQueryRegExp = new RegExp('\\b' + this.state.searchQuery, 'gi');
	        var filteredPageTypes = this.props.pageTypes.filter(function (pageType) {
	          return pageType.name.match(searchQueryRegExp);
	        });
	      } else {
	        var filteredPageTypes = this.props.pageTypes;
	      }
	      var pageTypeComponents = filteredPageTypes.map(function (pageType, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: pageType.id, onClick: function onClick(e) {
	              _this.setPageType(pageType);
	            } },
	          _react2.default.createElement(_page_type2.default, { name: pageType.name, iconName: pageType.icon_name, id: pageType.id })
	        );
	      });
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade page-change-modal', id: 'page-change-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'page-change-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-header text-center' },
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  _react2.default.createElement('img', { src: '/assets/close-modal.svg', className: 'close-modal hide-delete-modal' })
	                )
	              ),
	              _react2.default.createElement(
	                'h4',
	                { className: 'modal-title' },
	                'Change the screen type'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2.default.createElement(
	                'div',
	                { className: 'clearfix' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'current-page-type pull-left' },
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    'Current screen type:'
	                  ),
	                  this.props.pageTree.pageType && _react2.default.createElement(_page_type2.default, { name: this.props.pageTree.pageType.name, iconName: this.props.pageTree.pageType.icon_name, id: this.props.pageTree.pageType.id })
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'page-types pull-left' },
	                  _react2.default.createElement(
	                    'form',
	                    { className: 'search-page-type' },
	                    _react2.default.createElement(
	                      'label',
	                      { htmlFor: 'page-type' },
	                      _react2.default.createElement('i', { className: 'icon-search' })
	                    ),
	                    _react2.default.createElement('input', { type: 'search', id: 'page-type', name: 'page-type', placeholder: 'Find your screen type', onChange: this.handleSearch })
	                  ),
	                  _react2.default.createElement(
	                    'ul',
	                    { className: 'page-type-list clearfix' },
	                    pageTypeComponents
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return PageChangeModal;
	}(_react2.default.Component);
	
	PageChangeModal.propTypes = {
	  pageTree: _react.PropTypes.object.isRequired
	};
	exports.default = PageChangeModal;

/***/ },

/***/ 567:
/*!************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_new_section_modal.jsx ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _new_section_modal = __webpack_require__(/*! ../components/new_section_modal */ 568);
	
	var _new_section_modal2 = _interopRequireDefault(_new_section_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { pageTree: state.selectedPage, sections: state.sections };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onCreateSection: function onCreateSection(pageTree, sectionName, timeStamp, sections) {
	      dispatch((0, _actions.createNewSection)(pageTree.id, pageTree.section_id, sectionName, timeStamp));
	    },
	    onSectionIdUpdate: function onSectionIdUpdate(oldId, newId) {
	      dispatch((0, _actions.updateSectionId)(oldId, newId));
	      dispatch((0, _actions.changeActiveSectionId)(newId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedNewSectionModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_new_section_modal2.default);
	
	exports.default = ConnectedNewSectionModal;

/***/ },

/***/ 568:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/components/new_section_modal.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _page_type = __webpack_require__(/*! ./page_type */ 546);
	
	var _page_type2 = _interopRequireDefault(_page_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NewSectionModal = function (_React$Component) {
	  _inherits(NewSectionModal, _React$Component);
	
	  function NewSectionModal(props) {
	    _classCallCheck(this, NewSectionModal);
	
	    var _this2 = _possibleConstructorReturn(this, (NewSectionModal.__proto__ || Object.getPrototypeOf(NewSectionModal)).call(this, props));
	
	    _this2.createSection = _this2.createSection.bind(_this2);
	    _this2.handleSectionNameChange = _this2.handleSectionNameChange.bind(_this2);
	    _this2.state = { sectionName: '' };
	    return _this2;
	  }
	
	  _createClass(NewSectionModal, [{
	    key: 'handleSectionNameChange',
	    value: function handleSectionNameChange(e) {
	      this.setState({ sectionName: e.target.value });
	    }
	  }, {
	    key: 'createSection',
	    value: function createSection(e) {
	      var _this = this;
	      var timeStamp = new Date();
	      var name = this.state.sectionName.trim();
	      if (name) {
	        this.props.onCreateSection(this.props.pageTree, name, timeStamp, this.props.sections);
	        $.ajax({
	          url: '/sections',
	          method: 'post',
	          dataType: 'JSON',
	          data: { page_id: this.props.pageTree.id, section: { name: name } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          success: function success(result) {
	            _this.props.onSectionIdUpdate(timeStamp, result.id);
	          },
	          complete: function complete(result) {
	            _this.props.setSaving(true);
	            setTimeout(function () {
	              _this.props.setSaving(false);
	            }, 2000);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	      $('.new-section-modal').on('hidden.bs.modal', function () {
	        setTimeout(function () {
	          _this.setState({ sectionName: '' });
	        }, 500);
	      });
	
	      $('.new-section-modal').on('shown.bs.modal', function () {
	        $('#new-section-name').focus();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade new-section-modal', id: 'new-section-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'new-section-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  _react2.default.createElement('img', { src: '/assets/close-modal.svg', className: 'close-modal hide-delete-modal' })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'create-section-heading' },
	                'Give this section a name'
	              ),
	              _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement('input', { className: 'form-control', type: 'text', value: this.state.sectionName, id: 'new-section-name', name: 'new-section-name', onChange: this.handleSectionNameChange })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'modal-button' },
	                _react2.default.createElement(
	                  'a',
	                  { href: 'javascript:void(0);', 'data-dismiss': 'modal', className: 'btn btn-red', onClick: this.createSection },
	                  'Create section'
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { href: 'javascript:void(0);', 'data-dismiss': 'modal', className: 'btn btn-grey btn-last' },
	                  'Cancel'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return NewSectionModal;
	}(_react2.default.Component);
	
	NewSectionModal.propTypes = {
	  pageTree: _react.PropTypes.object.isRequired,
	  sections: _react.PropTypes.array.isRequired
	};
	exports.default = NewSectionModal;

/***/ },

/***/ 569:
/*!**************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_page_comments_modal.jsx ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _page_comments_modal = __webpack_require__(/*! ../components/page_comments_modal */ 570);
	
	var _page_comments_modal2 = _interopRequireDefault(_page_comments_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { pageTree: state.selectedPage, commentsLength: state.selectedPage.comments ? state.selectedPage.comments.length : 0, pageState: state.selectedPage.state };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedPageCommentsModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_page_comments_modal2.default);
	
	exports.default = ConnectedPageCommentsModal;

/***/ },

/***/ 570:
/*!****************************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_comments_modal.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _connected_comment = __webpack_require__(/*! ../containers/connected_comment */ 551);
	
	var _connected_comment2 = _interopRequireDefault(_connected_comment);
	
	var _connected_mark_as_resolved_check = __webpack_require__(/*! ../containers/connected_mark_as_resolved_check */ 555);
	
	var _connected_mark_as_resolved_check2 = _interopRequireDefault(_connected_mark_as_resolved_check);
	
	var _connected_new_comment = __webpack_require__(/*! ../containers/connected_new_comment */ 557);
	
	var _connected_new_comment2 = _interopRequireDefault(_connected_new_comment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PageCommentsModal = function (_React$Component) {
	  _inherits(PageCommentsModal, _React$Component);
	
	  function PageCommentsModal(props) {
	    _classCallCheck(this, PageCommentsModal);
	
	    var _this2 = _possibleConstructorReturn(this, (PageCommentsModal.__proto__ || Object.getPrototypeOf(PageCommentsModal)).call(this, props));
	
	    _this2.state = { commentInEditionId: null };
	    _this2.setCommentInEditionId = _this2.setCommentInEditionId.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(PageCommentsModal, [{
	    key: 'setCommentInEditionId',
	    value: function setCommentInEditionId(id) {
	      this.setState({ commentInEditionId: id });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	      $('#page-comments-modal').on('shown.bs.modal', function () {
	        if (_this.state.commentInEditionId) {
	          _this.setState({ commentInEditionId: null });
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      if (this.props.pageTree.comments) {
	        var renderedPageComments = this.props.pageTree.comments.map(function (comment, index) {
	          return _react2.default.createElement(
	            'li',
	            { key: comment.id },
	            _react2.default.createElement(_connected_comment2.default, { id: comment.id, message: comment.message, commenter: comment.commenter, createdAt: comment.created_at, editable: _this.props.pageTree.state == 'active', commentableId: _this.props.pageTree.id, commentableType: 'Page', sectionId: _this.props.pageTree.section_id, commentableName: _this.props.pageTree.name, modalView: true, footer: _this.props.pageTree.footer, setCommentInEditionId: _this.setCommentInEditionId, commentInEditionId: _this.state.commentInEditionId })
	          );
	        });
	      }
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade', id: 'page-comments-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'page-comments-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  _react2.default.createElement('img', { src: '/assets/close-modal.svg', className: 'close-modal hide-delete-modalx' })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'page-comments' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'page-comment-details' },
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'page-id' },
	                    'ID: ',
	                    this.props.pageTree.uid
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'clearfix' },
	                    _react2.default.createElement(
	                      'span',
	                      { className: 'page-name truncate pull-left' },
	                      this.props.pageTree.name
	                    ),
	                    _react2.default.createElement(_connected_mark_as_resolved_check2.default, { page: this.props.pageTree, id: this.props.pageTree.id, pageState: this.props.pageTree.state })
	                  )
	                ),
	                _react2.default.createElement(
	                  'ul',
	                  { className: 'comment-group' },
	                  this.props.pageTree && renderedPageComments
	                ),
	                this.props.pageTree.state == 'active' && !this.state.commentInEditionId && _react2.default.createElement(_connected_new_comment2.default, { commentableId: this.props.pageTree.id, commentableType: 'Page', footer: this.props.pageTree.footer, sectionId: this.props.pageTree.section_id })
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return PageCommentsModal;
	}(_react2.default.Component);
	
	PageCommentsModal.propTypes = {
	  pageTree: _react.PropTypes.object.isRequired
	};
	exports.default = PageCommentsModal;

/***/ },

/***/ 571:
/*!********************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_update_section_name_modal.jsx ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _update_section_name_modal = __webpack_require__(/*! ../components/update_section_name_modal */ 572);
	
	var _update_section_name_modal2 = _interopRequireDefault(_update_section_name_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { section: state.selectedSection };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onUpdateSection: function onUpdateSection(sectionName, section_id) {
	      dispatch((0, _actions.updateSectionName)(section_id, sectionName));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedUpdateSectionNameModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_update_section_name_modal2.default);
	
	exports.default = ConnectedUpdateSectionNameModal;

/***/ },

/***/ 572:
/*!**********************************************************************!*\
  !*** ./app/bundles/SiteMap/components/update_section_name_modal.jsx ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _page_type = __webpack_require__(/*! ./page_type */ 546);
	
	var _page_type2 = _interopRequireDefault(_page_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UpdateSectionNameModal = function (_React$Component) {
	  _inherits(UpdateSectionNameModal, _React$Component);
	
	  function UpdateSectionNameModal(props) {
	    _classCallCheck(this, UpdateSectionNameModal);
	
	    var _this2 = _possibleConstructorReturn(this, (UpdateSectionNameModal.__proto__ || Object.getPrototypeOf(UpdateSectionNameModal)).call(this, props));
	
	    _this2.updateSection = _this2.updateSection.bind(_this2);
	    _this2.handleSectionNameChange = _this2.handleSectionNameChange.bind(_this2);
	    _this2.state = { sectionName: '' };
	    return _this2;
	  }
	
	  _createClass(UpdateSectionNameModal, [{
	    key: 'handleSectionNameChange',
	    value: function handleSectionNameChange(e) {
	      this.setState({ sectionName: e.target.value });
	    }
	  }, {
	    key: 'updateSection',
	    value: function updateSection(e) {
	      var _this = this;
	      var name = this.state.sectionName.trim();
	      var id = this.props.section.id;
	      if (name) {
	        this.props.onUpdateSection(name, id);
	        $.ajax({
	          url: '/sections/' + this.props.section.id,
	          method: 'put',
	          dataType: 'JSON',
	          data: { id: id, section: { name: name } },
	          error: function error(result) {
	            document.setFlash(result.responseText);
	          },
	          complete: function complete(result) {
	            _this.props.setSaving(true);
	            setTimeout(function () {
	              _this.props.setSaving(false);
	            }, 2000);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	      $('.update-section-name-modal').on('hidden.bs.modal', function () {
	        setTimeout(function () {
	          _this.setState({ sectionName: _this.props.section.name });
	        }, 500);
	      });
	
	      $('.update-section-name-modal').on('shown.bs.modal', function () {
	        _this.setState({ sectionName: _this.props.section.name });
	        $('#section-name-new').focus();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade update-section-name-modal', id: 'update-section-name-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'update-section-name-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  _react2.default.createElement('img', { src: '/assets/close-modal.svg', className: 'close-modal hide-delete-modal' })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'create-section-heading' },
	                'Give this section a new name'
	              ),
	              _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement('input', { className: 'form-control', type: 'text', value: this.state.sectionName, id: 'section-name-new', name: 'section-name-new', onChange: this.handleSectionNameChange })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'modal-button' },
	                _react2.default.createElement(
	                  'a',
	                  { href: 'javascript:void(0);', 'data-dismiss': 'modal', className: 'btn btn-red', onClick: this.updateSection },
	                  'Update name'
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { href: 'javascript:void(0);', 'data-dismiss': 'modal', className: 'btn btn-grey btn-last' },
	                  'Cancel'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return UpdateSectionNameModal;
	}(_react2.default.Component);
	
	UpdateSectionNameModal.propTypes = {
	  section: _react.PropTypes.object.isRequired
	};
	exports.default = UpdateSectionNameModal;

/***/ },

/***/ 573:
/*!***************************************************************************!*\
  !*** ./app/bundles/SiteMap/containers/connected_delete_section_modal.jsx ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 284);
	
	var _actions = __webpack_require__(/*! ../actions */ 316);
	
	var _delete_section_modal = __webpack_require__(/*! ../components/delete_section_modal */ 574);
	
	var _delete_section_modal2 = _interopRequireDefault(_delete_section_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { section: state.selectedSection, sections: state.sections, activeSectionId: state.activeSectionId };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    removeSection: function removeSection(id) {
	      dispatch((0, _actions.removeSection)(id));
	    },
	    changeActiveSectionId: function changeActiveSectionId(sectionId) {
	      dispatch((0, _actions.changeActiveSectionId)(sectionId));
	    },
	    setSaving: function setSaving(saving) {
	      dispatch((0, _actions.setSaving)(saving));
	      dispatch((0, _actions.changeUpdatedAt)());
	    }
	  };
	};
	
	var ConnectedDeleteSectionModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_delete_section_modal2.default);
	
	exports.default = ConnectedDeleteSectionModal;

/***/ },

/***/ 574:
/*!*****************************************************************!*\
  !*** ./app/bundles/SiteMap/components/delete_section_modal.jsx ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeleteSectionModal = function (_React$Component) {
	  _inherits(DeleteSectionModal, _React$Component);
	
	  function DeleteSectionModal(props) {
	    _classCallCheck(this, DeleteSectionModal);
	
	    var _this2 = _possibleConstructorReturn(this, (DeleteSectionModal.__proto__ || Object.getPrototypeOf(DeleteSectionModal)).call(this, props));
	
	    _this2.deleteSection = _this2.deleteSection.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(DeleteSectionModal, [{
	    key: 'getDefaultSection',
	    value: function getDefaultSection(sections) {
	      return sections.filter(function (section) {
	        return section.default;
	      })[0];
	    }
	  }, {
	    key: 'deleteSection',
	    value: function deleteSection(e) {
	      var _this3 = this;
	
	      var _this = this;
	      e.preventDefault();
	      e.stopPropagation();
	      if (this.props.activeSectionId == this.props.section.id) {
	        this.props.changeActiveSectionId(this.getDefaultSection(this.props.sections).id);
	      }
	      this.props.removeSection(this.props.section.id);
	      $.ajax({
	        url: '/sections/' + this.props.section.id,
	        method: 'delete',
	        dataType: 'JSON',
	        error: function error(result) {
	          document.setFlash(result.responseText);
	        },
	        complete: function complete(result) {
	          _this3.props.setSaving(true);
	          setTimeout(function () {
	            _this.props.setSaving(false);
	          }, 2000);
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade', id: 'delete-section-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'delete-section-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-header text-center' },
	              _react2.default.createElement(
	                'button',
	                { type: 'button', className: 'close btn-modal-open', 'data-dismiss': 'modal', 'aria-label': 'Close' },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  _react2.default.createElement('img', { src: '/assets/close-modal.svg', className: 'close-modal hide-delete-modal' })
	                )
	              ),
	              _react2.default.createElement(
	                'h4',
	                { className: 'modal-title' },
	                'Delete section'
	              ),
	              _react2.default.createElement(
	                'p',
	                { className: 'modal-message' },
	                'Are you sure you want to delete this section: ' + this.props.section.name
	              ),
	              _react2.default.createElement(
	                'p',
	                { className: 'modal-message' },
	                'Pages in this section will not be deleted but added back to the main sitemap. ',
	                _react2.default.createElement('br', null),
	                ' To delete any sub-screens, delete the parent screen in the main sitemap.'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2.default.createElement(
	                'div',
	                { className: 'modal-button text-center' },
	                _react2.default.createElement(
	                  'a',
	                  { href: 'javascript:void(0);', 'data-dismiss': 'modal', className: 'btn btn-red', onClick: this.deleteSection },
	                  'Delete Section'
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { href: 'javascript:void(0);', 'data-dismiss': 'modal', className: 'btn btn-grey btn-last' },
	                  'Cancel'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return DeleteSectionModal;
	}(_react2.default.Component);
	
	DeleteSectionModal.propTypes = {
	  section: _react.PropTypes.object.isRequired
	};
	exports.default = DeleteSectionModal;

/***/ },

/***/ 575:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/components/user_signup_modal.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _url_parser = __webpack_require__(/*! ../helpers/url_parser */ 576);
	
	var _url_parser2 = _interopRequireDefault(_url_parser);
	
	var _connected_comment = __webpack_require__(/*! ../containers/connected_comment */ 551);
	
	var _connected_comment2 = _interopRequireDefault(_connected_comment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserSignupModal = function (_React$Component) {
	  _inherits(UserSignupModal, _React$Component);
	
	  function UserSignupModal(props) {
	    _classCallCheck(this, UserSignupModal);
	
	    var _this2 = _possibleConstructorReturn(this, (UserSignupModal.__proto__ || Object.getPrototypeOf(UserSignupModal)).call(this, props));
	
	    _this2.state = { nameError: '', emailError: '', passwordError: '', businessNameError: '' };
	    _this2.signup = _this2.signup.bind(_this2);
	    _this2.createMarkup = _this2.createMarkup.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(UserSignupModal, [{
	    key: 'signup',
	    value: function signup(e) {
	      var _this3 = this;
	
	      var _this = this;
	      $.ajax({
	        url: '/users',
	        method: 'post',
	        dataType: 'JSON',
	        data: { user: { full_name: this.refs.nameInput.value, email: this.refs.emailInput.value, password: this.refs.passwordInput.value, business_name: this.refs.businessNameInput.value } },
	        error: function error(result) {
	          var errors = result.responseJSON;
	          _this3.setState({ nameError: errors.full_name && errors.full_name.join('<br />'), emailError: errors.email && errors.email.join('<br />'), passwordError: errors.password && errors.password.join('<br />'), businessNameError: errors.business_name && errors.business_name.join('<br />') });
	        },
	        success: function success(result) {
	          window.location = "/sitemaps/" + _this3.props.sitemapId;
	        }
	      });
	    }
	  }, {
	    key: 'createMarkup',
	    value: function createMarkup(str) {
	      return { __html: str };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	      var error = this.state.nameError && this.state.nameError.length > 0 || this.state.emailError && this.state.emailError.length > 0 || this.state.passwordError && this.state.passwordError.length > 0 || this.state.businessNameError && this.state.businessNameError.length > 0;
	      return _react2.default.createElement(
	        'div',
	        { className: 'modal fade react-sign-up', id: 'user-signup-modal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'user-signup-modalLabel' },
	        _react2.default.createElement(
	          'div',
	          { className: "modal-body user-entry registration-page text-center" + (error ? " modal-with-error" : "") },
	          _react2.default.createElement(
	            'div',
	            { className: 'logo' },
	            _react2.default.createElement('img', { className: 'logo-inner', src: '/assets/Timblee-icon.svg' })
	          ),
	          _react2.default.createElement(
	            'h1',
	            { className: 'modal-heading' },
	            'Save and share your sitemap, and try timblee free for ',
	            _react2.default.createElement('br', null),
	            ' 30 days with no restrictions.'
	          ),
	          _react2.default.createElement(
	            'p',
	            { className: 'small' },
	            'No credit card required. Invite unlimited team ',
	            _react2.default.createElement('br', null),
	            ' members to try it out with you.'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'user-form' },
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement('input', { type: 'text', placeholder: 'Your name', ref: 'nameInput', className: 'form-control' }),
	              _react2.default.createElement('div', { className: 'error-div name-error', dangerouslySetInnerHTML: this.createMarkup(this.state.nameError) })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement('input', { type: 'text', placeholder: 'Business name', ref: 'businessNameInput', className: 'form-control', defaultValue: _url_parser2.default.getQueryVariable('business_name') || '' }),
	              _react2.default.createElement('div', { className: 'error-div email-error', dangerouslySetInnerHTML: this.createMarkup(this.state.businessNameError) })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement('input', { type: 'email', placeholder: 'Your work email', ref: 'emailInput', className: 'form-control', defaultValue: _url_parser2.default.getQueryVariable('email') || '' }),
	              _react2.default.createElement('div', { className: 'error-div email-error', dangerouslySetInnerHTML: this.createMarkup(this.state.emailError) })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement('input', { type: 'password', placeholder: 'Choose a password', ref: 'passwordInput', className: 'form-control' }),
	              _react2.default.createElement('div', { className: 'error-div password-error', dangerouslySetInnerHTML: this.createMarkup(this.state.passwordError) })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'a',
	                { href: 'javascript:void(0);', className: 'btn btn-pink btn-block', onClick: this.signup },
	                'SIGN UP FOR FREE '
	              )
	            ),
	            _react2.default.createElement(
	              'p',
	              { className: 'go-to-login' },
	              'Already signed up? ',
	              _react2.default.createElement(
	                'a',
	                { href: '/log-in', className: 'link' },
	                ' Log in here.'
	              )
	            ),
	            _react2.default.createElement(
	              'p',
	              { className: 'go-to-terms' },
	              'By signing up, you agree to our plain English ',
	              _react2.default.createElement(
	                'a',
	                { href: 'http://timblee.io/terms', className: 'link' },
	                'terms.'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return UserSignupModal;
	}(_react2.default.Component);
	
	UserSignupModal.propTypes = {};
	exports.default = UserSignupModal;

/***/ },

/***/ 576:
/*!***************************************************!*\
  !*** ./app/bundles/SiteMap/helpers/url_parser.js ***!
  \***************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var UrlParser = {
	
	  getQueryVariable: function getQueryVariable(variable) {
	    var query = window.location.search.substring(1);
	    var vars = query.split('&');
	    for (var i = 0; i < vars.length; i++) {
	      var pair = vars[i].split('=');
	      if (decodeURIComponent(pair[0]) == variable) {
	        return decodeURIComponent(pair[1]);
	      }
	    }
	    console.log('Query variable %s not found', variable);
	  }
	};
	
	exports.default = UrlParser;

/***/ },

/***/ 577:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/components/custom_drag_layer.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../dnd/constants */ 511);
	
	var _reactDnd = __webpack_require__(/*! react-dnd */ 457);
	
	var _page_container_preview = __webpack_require__(/*! ./page_container_preview */ 578);
	
	var _page_container_preview2 = _interopRequireDefault(_page_container_preview);
	
	var _page_type_preview = __webpack_require__(/*! ./page_type_preview */ 579);
	
	var _page_type_preview2 = _interopRequireDefault(_page_type_preview);
	
	var _orphan_page_preview = __webpack_require__(/*! ./orphan_page_preview */ 580);
	
	var _orphan_page_preview2 = _interopRequireDefault(_orphan_page_preview);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var layerStyles = {
	  position: 'fixed',
	  pointerEvents: 'none',
	  zIndex: 100,
	  left: 0,
	  top: 20,
	  width: '200px',
	  height: '100%',
	  transform: 'rotate(-2deg)',
	  WebkitTransform: 'rotate(-2deg)'
	};
	
	function getItemStyles(props) {
	  var initialOffset = props.initialOffset,
	      currentOffset = props.currentOffset;
	
	  if (!initialOffset || !currentOffset) {
	    return {
	      display: 'none'
	    };
	  }
	  var x = currentOffset.x,
	      y = currentOffset.y;
	
	  var transform = 'translate(' + x + 'px,' + y + 'px)';
	  return {
	    transform: transform,
	    WebkitTransform: transform
	  };
	}
	
	var DragLayerDecorator = (0, _reactDnd.DragLayer)(function (monitor) {
	  return {
	    item: monitor.getItem(),
	    itemType: monitor.getItemType(),
	    initialOffset: monitor.getInitialSourceClientOffset(),
	    currentOffset: monitor.getSourceClientOffset(),
	    currentPointerOffset: monitor.getClientOffset(),
	    isDragging: monitor.isDragging()
	  };
	});
	
	var CustomDragLayer = function (_Component) {
	  _inherits(CustomDragLayer, _Component);
	
	  function CustomDragLayer() {
	    _classCallCheck(this, CustomDragLayer);
	
	    return _possibleConstructorReturn(this, (CustomDragLayer.__proto__ || Object.getPrototypeOf(CustomDragLayer)).apply(this, arguments));
	  }
	
	  _createClass(CustomDragLayer, [{
	    key: 'renderItem',
	    value: function renderItem(type, item) {
	      var itemtypes = _constants.ItemTypes;
	      switch (type) {
	        case _constants.ItemTypes.PAGE_CONTAINER:
	          return _react2.default.createElement(_page_container_preview2.default, { pageTree: item.pageTree, sitemapNumber: item.sitemapNumber, level: item.level });
	        case _constants.ItemTypes.PAGE_TYPE:
	          return _react2.default.createElement(_page_type_preview2.default, { name: item.name, iconName: item.iconName });
	        case _constants.ItemTypes.ORPHAN_PAGE:
	          return _react2.default.createElement(_orphan_page_preview2.default, { page: item.pageTree });
	        default:
	          return null;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          item = _props.item,
	          itemType = _props.itemType,
	          isDragging = _props.isDragging;
	
	      if (!isDragging) {
	        return null;
	      }
	      return _react2.default.createElement(
	        'div',
	        { style: layerStyles },
	        _react2.default.createElement(
	          'div',
	          { style: getItemStyles(this.props), className: 'custom-drag-layer' },
	          this.renderItem(itemType, item)
	        )
	      );
	    }
	  }]);
	
	  return CustomDragLayer;
	}(_react.Component);
	
	CustomDragLayer.propTypes = {
	  item: _react.PropTypes.object,
	  itemType: _react.PropTypes.string,
	  initialOffset: _react.PropTypes.shape({
	    x: _react.PropTypes.number.isRequired,
	    y: _react.PropTypes.number.isRequired
	  }),
	  currentOffset: _react.PropTypes.shape({
	    x: _react.PropTypes.number.isRequired,
	    y: _react.PropTypes.number.isRequired
	  }),
	  currentPointerOffset: _react.PropTypes.shape({
	    x: _react.PropTypes.number.isRequired,
	    y: _react.PropTypes.number.isRequired
	  }),
	  isDragging: _react.PropTypes.bool.isRequired
	};
	exports.default = DragLayerDecorator(CustomDragLayer);

/***/ },

/***/ 578:
/*!*******************************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_container_preview.jsx ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _page_container = __webpack_require__(/*! ./page_container */ 512);
	
	var _page_container2 = _interopRequireDefault(_page_container);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var styles = {
	  display: 'inline-block'
	};
	
	var PageContainerPreview = function (_Component) {
	  _inherits(PageContainerPreview, _Component);
	
	  function PageContainerPreview() {
	    _classCallCheck(this, PageContainerPreview);
	
	    return _possibleConstructorReturn(this, (PageContainerPreview.__proto__ || Object.getPrototypeOf(PageContainerPreview)).apply(this, arguments));
	  }
	
	  _createClass(PageContainerPreview, [{
	    key: 'render',
	    value: function render() {
	      var pageTree = this.props.pageTree;
	
	
	      var _this = this;
	      var children;
	      if (this.props.pageTree.children != null) {
	        children = pageTree.children.map(function (pageTree, index) {
	          if (pageTree.level == 2) {
	            var sitemapNumber = parseInt(_this.props.sitemapNumber).toString() + '.' + (index + 1);
	          } else {
	            var sitemapNumber = _this.props.sitemapNumber + '.' + (index + 1);
	          }
	          return _react2.default.createElement(
	            'div',
	            { className: 'test', key: pageTree.id },
	            _react2.default.createElement(PageContainerPreview, { pageTree: pageTree, sitemapNumber: sitemapNumber, level: _this.props.level + 1 })
	          );
	        });
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { style: styles, className: 'custom-drag-preview' },
	        _react2.default.createElement(_page_container2.default, { pageTree: pageTree, children: [], level: this.props.level, sitemapNumber: this.props.sitemapNumber, isDragging: true, introSlideNumber: 0 })
	      );
	    }
	  }]);
	
	  return PageContainerPreview;
	}(_react.Component);
	
	PageContainerPreview.propTypes = {
	  pageTree: _react.PropTypes.object.isRequired
	};
	exports.default = PageContainerPreview;

/***/ },

/***/ 579:
/*!**************************************************************!*\
  !*** ./app/bundles/SiteMap/components/page_type_preview.jsx ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _page_type = __webpack_require__(/*! ./page_type */ 546);
	
	var _page_type2 = _interopRequireDefault(_page_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var styles = {
	  display: 'inline-block'
	};
	
	var PageTypePreview = function (_Component) {
	  _inherits(PageTypePreview, _Component);
	
	  function PageTypePreview() {
	    _classCallCheck(this, PageTypePreview);
	
	    return _possibleConstructorReturn(this, (PageTypePreview.__proto__ || Object.getPrototypeOf(PageTypePreview)).apply(this, arguments));
	  }
	
	  _createClass(PageTypePreview, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { style: styles, className: 'page-type-preview' },
	        _react2.default.createElement(_page_type2.default, { name: this.props.name, iconName: this.props.iconName, isDragPrview: true })
	      );
	    }
	  }]);
	
	  return PageTypePreview;
	}(_react.Component);
	
	PageTypePreview.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  iconName: _react.PropTypes.string.isRequired
	};
	exports.default = PageTypePreview;

/***/ },

/***/ 580:
/*!****************************************************************!*\
  !*** ./app/bundles/SiteMap/components/orphan_page_preview.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _orphan_page = __webpack_require__(/*! ./orphan_page */ 548);
	
	var _orphan_page2 = _interopRequireDefault(_orphan_page);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var styles = {
	  display: 'inline-block'
	};
	
	var OrphanPagePreview = function (_Component) {
	  _inherits(OrphanPagePreview, _Component);
	
	  function OrphanPagePreview() {
	    _classCallCheck(this, OrphanPagePreview);
	
	    return _possibleConstructorReturn(this, (OrphanPagePreview.__proto__ || Object.getPrototypeOf(OrphanPagePreview)).apply(this, arguments));
	  }
	
	  _createClass(OrphanPagePreview, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { style: styles, className: 'page-type-preview' },
	        _react2.default.createElement(_orphan_page2.default, { page: this.props.page, isDragPrview: true })
	      );
	    }
	  }]);
	
	  return OrphanPagePreview;
	}(_react.Component);
	
	exports.default = OrphanPagePreview;

/***/ },

/***/ 581:
/*!*************************************!*\
  !*** ./~/redux-logger/lib/index.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _core = __webpack_require__(/*! ./core */ 582);
	
	var _helpers = __webpack_require__(/*! ./helpers */ 583);
	
	var _defaults = __webpack_require__(/*! ./defaults */ 586);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates logger with following options
	 *
	 * @namespace
	 * @param {object} options - options for logger
	 * @param {string | function | object} options.level - console[level]
	 * @param {boolean} options.duration - print duration of each action?
	 * @param {boolean} options.timestamp - print timestamp with each action?
	 * @param {object} options.colors - custom colors
	 * @param {object} options.logger - implementation of the `console` API
	 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @param {boolean} options.collapsed - is group collapsed?
	 * @param {boolean} options.predicate - condition which resolves logger behavior
	 * @param {function} options.stateTransformer - transform state before print
	 * @param {function} options.actionTransformer - transform action before print
	 * @param {function} options.errorTransformer - transform error before print
	 *
	 * @returns {function} logger middleware
	 */
	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var loggerOptions = _extends({}, _defaults2.default, options);
	
	  var logger = loggerOptions.logger;
	  var transformer = loggerOptions.transformer;
	  var stateTransformer = loggerOptions.stateTransformer;
	  var errorTransformer = loggerOptions.errorTransformer;
	  var predicate = loggerOptions.predicate;
	  var logErrors = loggerOptions.logErrors;
	  var diffPredicate = loggerOptions.diffPredicate;
	
	  // Return if 'console' object is not defined
	
	  if (typeof logger === 'undefined') {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }
	
	  if (transformer) {
	    console.error('Option \'transformer\' is deprecated, use \'stateTransformer\' instead!'); // eslint-disable-line no-console
	  }
	
	  var logBuffer = [];
	
	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // Exit early if predicate function returns 'false'
	        if (typeof predicate === 'function' && !predicate(getState, action)) {
	          return next(action);
	        }
	
	        var logEntry = {};
	        logBuffer.push(logEntry);
	
	        logEntry.started = _helpers.timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;
	
	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }
	
	        logEntry.took = _helpers.timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());
	
	        var diff = loggerOptions.diff && typeof diffPredicate === 'function' ? diffPredicate(getState, action) : loggerOptions.diff;
	
	        (0, _core.printBuffer)(logBuffer, _extends({}, loggerOptions, { diff: diff }));
	        logBuffer.length = 0;
	
	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}
	
	exports.default = createLogger;
	module.exports = exports['default'];

/***/ },

/***/ 582:
/*!************************************!*\
  !*** ./~/redux-logger/lib/core.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.printBuffer = printBuffer;
	
	var _helpers = __webpack_require__(/*! ./helpers */ 583);
	
	var _diff = __webpack_require__(/*! ./diff */ 584);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	/**
	 * Get log level string based on supplied params
	 *
	 * @param {string | function | object} level - console[level]
	 * @param {object} action - selected action
	 * @param {array} payload - selected payload
	 * @param {string} type - log entry type
	 *
	 * @returns {string} level
	 */
	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === 'undefined' ? 'undefined' : _typeof(level)) {
	    case 'object':
	      return typeof level[type] === 'function' ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case 'function':
	      return level(action);
	    default:
	      return level;
	  }
	}
	
	function defaultTitleFormatter(options) {
	  var timestamp = options.timestamp;
	  var duration = options.duration;
	
	  return function (action, time, took) {
	    var parts = ['action'];
	    if (timestamp) {
	      parts.push('@ ' + time);
	    }
	    parts.push(action.type);
	    if (duration) {
	      parts.push('(in ' + took.toFixed(2) + ' ms)');
	    }
	    return parts.join(' ');
	  };
	}
	
	function printBuffer(buffer, options) {
	  var logger = options.logger;
	  var actionTransformer = options.actionTransformer;
	  var _options$titleFormatt = options.titleFormatter;
	  var titleFormatter = _options$titleFormatt === undefined ? defaultTitleFormatter(options) : _options$titleFormatt;
	  var collapsed = options.collapsed;
	  var colors = options.colors;
	  var level = options.level;
	  var diff = options.diff;
	
	  buffer.forEach(function (logEntry, key) {
	    var started = logEntry.started;
	    var startedTime = logEntry.startedTime;
	    var action = logEntry.action;
	    var prevState = logEntry.prevState;
	    var error = logEntry.error;
	    var took = logEntry.took;
	    var nextState = logEntry.nextState;
	
	    var nextEntry = buffer[key + 1];
	
	    if (nextEntry) {
	      nextState = nextEntry.prevState;
	      took = nextEntry.started - started;
	    }
	
	    // Message
	    var formattedAction = actionTransformer(action);
	    var isCollapsed = typeof collapsed === 'function' ? collapsed(function () {
	      return nextState;
	    }, action) : collapsed;
	
	    var formattedTime = (0, _helpers.formatTime)(startedTime);
	    var titleCSS = colors.title ? 'color: ' + colors.title(formattedAction) + ';' : null;
	    var title = titleFormatter(formattedAction, formattedTime, took);
	
	    // Render
	    try {
	      if (isCollapsed) {
	        if (colors.title) logger.groupCollapsed('%c ' + title, titleCSS);else logger.groupCollapsed(title);
	      } else {
	        if (colors.title) logger.group('%c ' + title, titleCSS);else logger.group(title);
	      }
	    } catch (e) {
	      logger.log(title);
	    }
	
	    var prevStateLevel = getLogLevel(level, formattedAction, [prevState], 'prevState');
	    var actionLevel = getLogLevel(level, formattedAction, [formattedAction], 'action');
	    var errorLevel = getLogLevel(level, formattedAction, [error, prevState], 'error');
	    var nextStateLevel = getLogLevel(level, formattedAction, [nextState], 'nextState');
	
	    if (prevStateLevel) {
	      if (colors.prevState) logger[prevStateLevel]('%c prev state', 'color: ' + colors.prevState(prevState) + '; font-weight: bold', prevState);else logger[prevStateLevel]('prev state', prevState);
	    }
	
	    if (actionLevel) {
	      if (colors.action) logger[actionLevel]('%c action', 'color: ' + colors.action(formattedAction) + '; font-weight: bold', formattedAction);else logger[actionLevel]('action', formattedAction);
	    }
	
	    if (error && errorLevel) {
	      if (colors.error) logger[errorLevel]('%c error', 'color: ' + colors.error(error, prevState) + '; font-weight: bold', error);else logger[errorLevel]('error', error);
	    }
	
	    if (nextStateLevel) {
	      if (colors.nextState) logger[nextStateLevel]('%c next state', 'color: ' + colors.nextState(nextState) + '; font-weight: bold', nextState);else logger[nextStateLevel]('next state', nextState);
	    }
	
	    if (diff) {
	      (0, _diff2.default)(prevState, nextState, logger, isCollapsed);
	    }
	
	    try {
	      logger.groupEnd();
	    } catch (e) {
	      logger.log('—— log end ——');
	    }
	  });
	}

/***/ },

/***/ 583:
/*!***************************************!*\
  !*** ./~/redux-logger/lib/helpers.js ***!
  \***************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var repeat = exports.repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	
	var pad = exports.pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	
	var formatTime = exports.formatTime = function formatTime(time) {
	  return pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};
	
	// Use performance API if it's available in order to get better precision
	var timer = exports.timer = typeof performance !== "undefined" && performance !== null && typeof performance.now === "function" ? performance : Date;

/***/ },

/***/ 584:
/*!************************************!*\
  !*** ./~/redux-logger/lib/diff.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = diffLogger;
	
	var _deepDiff = __webpack_require__(/*! deep-diff */ 585);
	
	var _deepDiff2 = _interopRequireDefault(_deepDiff);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// https://github.com/flitbit/diff#differences
	var dictionary = {
	  'E': {
	    color: '#2196F3',
	    text: 'CHANGED:'
	  },
	  'N': {
	    color: '#4CAF50',
	    text: 'ADDED:'
	  },
	  'D': {
	    color: '#F44336',
	    text: 'DELETED:'
	  },
	  'A': {
	    color: '#2196F3',
	    text: 'ARRAY:'
	  }
	};
	
	function style(kind) {
	  return 'color: ' + dictionary[kind].color + '; font-weight: bold';
	}
	
	function render(diff) {
	  var kind = diff.kind;
	  var path = diff.path;
	  var lhs = diff.lhs;
	  var rhs = diff.rhs;
	  var index = diff.index;
	  var item = diff.item;
	
	  switch (kind) {
	    case 'E':
	      return path.join('.') + ' ' + lhs + ' → ' + rhs;
	    case 'N':
	      return path.join('.') + ' ' + rhs;
	    case 'D':
	      return '' + path.join('.');
	    case 'A':
	      return [path.join('.') + '[' + index + ']', item];
	    default:
	      return null;
	  }
	}
	
	function diffLogger(prevState, newState, logger, isCollapsed) {
	  var diff = (0, _deepDiff2.default)(prevState, newState);
	
	  try {
	    if (isCollapsed) {
	      logger.groupCollapsed('diff');
	    } else {
	      logger.group('diff');
	    }
	  } catch (e) {
	    logger.log('diff');
	  }
	
	  if (diff) {
	    diff.forEach(function (elem) {
	      var kind = elem.kind;
	
	      var output = render(elem);
	
	      logger.log('%c ' + dictionary[kind].text, style(kind), output);
	    });
	  } else {
	    logger.log('—— no diff ——');
	  }
	
	  try {
	    logger.groupEnd();
	  } catch (e) {
	    logger.log('—— diff end —— ');
	  }
	}
	module.exports = exports['default'];

/***/ },

/***/ 585:
/*!******************************!*\
  !*** ./~/deep-diff/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * deep-diff.
	 * Licensed under the MIT License.
	 */
	;(function(root, factory) {
	  'use strict';
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.DeepDiff = factory();
	  }
	}(this, function(undefined) {
	  'use strict';
	
	  var $scope, conflict, conflictResolution = [];
	  if (typeof global === 'object' && global) {
	    $scope = global;
	  } else if (typeof window !== 'undefined') {
	    $scope = window;
	  } else {
	    $scope = {};
	  }
	  conflict = $scope.DeepDiff;
	  if (conflict) {
	    conflictResolution.push(
	      function() {
	        if ('undefined' !== typeof conflict && $scope.DeepDiff === accumulateDiff) {
	          $scope.DeepDiff = conflict;
	          conflict = undefined;
	        }
	      });
	  }
	
	  // nodejs compatible on server side and in the browser.
	  function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  }
	
	  function Diff(kind, path) {
	    Object.defineProperty(this, 'kind', {
	      value: kind,
	      enumerable: true
	    });
	    if (path && path.length) {
	      Object.defineProperty(this, 'path', {
	        value: path,
	        enumerable: true
	      });
	    }
	  }
	
	  function DiffEdit(path, origin, value) {
	    DiffEdit.super_.call(this, 'E', path);
	    Object.defineProperty(this, 'lhs', {
	      value: origin,
	      enumerable: true
	    });
	    Object.defineProperty(this, 'rhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffEdit, Diff);
	
	  function DiffNew(path, value) {
	    DiffNew.super_.call(this, 'N', path);
	    Object.defineProperty(this, 'rhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffNew, Diff);
	
	  function DiffDeleted(path, value) {
	    DiffDeleted.super_.call(this, 'D', path);
	    Object.defineProperty(this, 'lhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffDeleted, Diff);
	
	  function DiffArray(path, index, item) {
	    DiffArray.super_.call(this, 'A', path);
	    Object.defineProperty(this, 'index', {
	      value: index,
	      enumerable: true
	    });
	    Object.defineProperty(this, 'item', {
	      value: item,
	      enumerable: true
	    });
	  }
	  inherits(DiffArray, Diff);
	
	  function arrayRemove(arr, from, to) {
	    var rest = arr.slice((to || from) + 1 || arr.length);
	    arr.length = from < 0 ? arr.length + from : from;
	    arr.push.apply(arr, rest);
	    return arr;
	  }
	
	  function realTypeOf(subject) {
	    var type = typeof subject;
	    if (type !== 'object') {
	      return type;
	    }
	
	    if (subject === Math) {
	      return 'math';
	    } else if (subject === null) {
	      return 'null';
	    } else if (Array.isArray(subject)) {
	      return 'array';
	    } else if (Object.prototype.toString.call(subject) === '[object Date]') {
	      return 'date';
	    } else if (typeof subject.toString !== 'undefined' && /^\/.*\//.test(subject.toString())) {
	      return 'regexp';
	    }
	    return 'object';
	  }
	
	  function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
	    path = path || [];
	    var currentPath = path.slice(0);
	    if (typeof key !== 'undefined') {
	      if (prefilter) {
	        if (typeof(prefilter) === 'function' && prefilter(currentPath, key)) { return; }
	        else if (typeof(prefilter) === 'object') {
	          if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) { return; }
	          if (prefilter.normalize) {
	            var alt = prefilter.normalize(currentPath, key, lhs, rhs);
	            if (alt) {
	              lhs = alt[0];
	              rhs = alt[1];
	            }
	          }
	        }
	      }
	      currentPath.push(key);
	    }
	
	    // Use string comparison for regexes
	    if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
	      lhs = lhs.toString();
	      rhs = rhs.toString();
	    }
	
	    var ltype = typeof lhs;
	    var rtype = typeof rhs;
	    if (ltype === 'undefined') {
	      if (rtype !== 'undefined') {
	        changes(new DiffNew(currentPath, rhs));
	      }
	    } else if (rtype === 'undefined') {
	      changes(new DiffDeleted(currentPath, lhs));
	    } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
	      changes(new DiffEdit(currentPath, lhs, rhs));
	    } else if (Object.prototype.toString.call(lhs) === '[object Date]' && Object.prototype.toString.call(rhs) === '[object Date]' && ((lhs - rhs) !== 0)) {
	      changes(new DiffEdit(currentPath, lhs, rhs));
	    } else if (ltype === 'object' && lhs !== null && rhs !== null) {
	      stack = stack || [];
	      if (stack.indexOf(lhs) < 0) {
	        stack.push(lhs);
	        if (Array.isArray(lhs)) {
	          var i, len = lhs.length;
	          for (i = 0; i < lhs.length; i++) {
	            if (i >= rhs.length) {
	              changes(new DiffArray(currentPath, i, new DiffDeleted(undefined, lhs[i])));
	            } else {
	              deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
	            }
	          }
	          while (i < rhs.length) {
	            changes(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i++])));
	          }
	        } else {
	          var akeys = Object.keys(lhs);
	          var pkeys = Object.keys(rhs);
	          akeys.forEach(function(k, i) {
	            var other = pkeys.indexOf(k);
	            if (other >= 0) {
	              deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack);
	              pkeys = arrayRemove(pkeys, other);
	            } else {
	              deepDiff(lhs[k], undefined, changes, prefilter, currentPath, k, stack);
	            }
	          });
	          pkeys.forEach(function(k) {
	            deepDiff(undefined, rhs[k], changes, prefilter, currentPath, k, stack);
	          });
	        }
	        stack.length = stack.length - 1;
	      }
	    } else if (lhs !== rhs) {
	      if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
	        changes(new DiffEdit(currentPath, lhs, rhs));
	      }
	    }
	  }
	
	  function accumulateDiff(lhs, rhs, prefilter, accum) {
	    accum = accum || [];
	    deepDiff(lhs, rhs,
	      function(diff) {
	        if (diff) {
	          accum.push(diff);
	        }
	      },
	      prefilter);
	    return (accum.length) ? accum : undefined;
	  }
	
	  function applyArrayChange(arr, index, change) {
	    if (change.path && change.path.length) {
	      var it = arr[index],
	          i, u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          delete it[change.path[i]];
	          break;
	        case 'E':
	        case 'N':
	          it[change.path[i]] = change.rhs;
	          break;
	      }
	    } else {
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(arr[index], change.index, change.item);
	          break;
	        case 'D':
	          arr = arrayRemove(arr, index);
	          break;
	        case 'E':
	        case 'N':
	          arr[index] = change.rhs;
	          break;
	      }
	    }
	    return arr;
	  }
	
	  function applyChange(target, source, change) {
	    if (target && source && change && change.kind) {
	      var it = target,
	          i = -1,
	          last = change.path ? change.path.length - 1 : 0;
	      while (++i < last) {
	        if (typeof it[change.path[i]] === 'undefined') {
	          it[change.path[i]] = (typeof change.path[i] === 'number') ? [] : {};
	        }
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(change.path ? it[change.path[i]] : it, change.index, change.item);
	          break;
	        case 'D':
	          delete it[change.path[i]];
	          break;
	        case 'E':
	        case 'N':
	          it[change.path[i]] = change.rhs;
	          break;
	      }
	    }
	  }
	
	  function revertArrayChange(arr, index, change) {
	    if (change.path && change.path.length) {
	      // the structure of the object at the index has changed...
	      var it = arr[index],
	          i, u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          revertArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'E':
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'N':
	          delete it[change.path[i]];
	          break;
	      }
	    } else {
	      // the array item is different...
	      switch (change.kind) {
	        case 'A':
	          revertArrayChange(arr[index], change.index, change.item);
	          break;
	        case 'D':
	          arr[index] = change.lhs;
	          break;
	        case 'E':
	          arr[index] = change.lhs;
	          break;
	        case 'N':
	          arr = arrayRemove(arr, index);
	          break;
	      }
	    }
	    return arr;
	  }
	
	  function revertChange(target, source, change) {
	    if (target && source && change && change.kind) {
	      var it = target,
	          i, u;
	      u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        if (typeof it[change.path[i]] === 'undefined') {
	          it[change.path[i]] = {};
	        }
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          // Array was modified...
	          // it will be an array...
	          revertArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          // Item was deleted...
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'E':
	          // Item was edited...
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'N':
	          // Item is new...
	          delete it[change.path[i]];
	          break;
	      }
	    }
	  }
	
	  function applyDiff(target, source, filter) {
	    if (target && source) {
	      var onChange = function(change) {
	        if (!filter || filter(target, source, change)) {
	          applyChange(target, source, change);
	        }
	      };
	      deepDiff(target, source, onChange);
	    }
	  }
	
	  Object.defineProperties(accumulateDiff, {
	
	    diff: {
	      value: accumulateDiff,
	      enumerable: true
	    },
	    observableDiff: {
	      value: deepDiff,
	      enumerable: true
	    },
	    applyDiff: {
	      value: applyDiff,
	      enumerable: true
	    },
	    applyChange: {
	      value: applyChange,
	      enumerable: true
	    },
	    revertChange: {
	      value: revertChange,
	      enumerable: true
	    },
	    isConflict: {
	      value: function() {
	        return 'undefined' !== typeof conflict;
	      },
	      enumerable: true
	    },
	    noConflict: {
	      value: function() {
	        if (conflictResolution) {
	          conflictResolution.forEach(function(it) {
	            it();
	          });
	          conflictResolution = null;
	        }
	        return accumulateDiff;
	      },
	      enumerable: true
	    }
	  });
	
	  return accumulateDiff;
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 586:
/*!****************************************!*\
  !*** ./~/redux-logger/lib/defaults.js ***!
  \****************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  level: "log",
	  logger: console,
	  logErrors: true,
	  collapsed: undefined,
	  predicate: undefined,
	  duration: false,
	  timestamp: true,
	  stateTransformer: function stateTransformer(state) {
	    return state;
	  },
	  actionTransformer: function actionTransformer(action) {
	    return action;
	  },
	  errorTransformer: function errorTransformer(error) {
	    return error;
	  },
	  colors: {
	    title: function title() {
	      return "inherit";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  },
	  diff: false,
	  diffPredicate: undefined,
	
	  // Deprecated options
	  transformer: undefined
	};
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=webpack-bundle.js.map