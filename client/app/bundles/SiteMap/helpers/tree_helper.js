import deepcopy from 'deepcopy';

function addPage(sections, sectionId, pageType, parentId, position, tempId, uid) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var pageTypeCopy = Object.assign({}, pageType);
  pageTypeCopy.icon_name = pageTypeCopy.iconName || pageTypeCopy.icon_name
  delete(pageTypeCopy.iconName)
  var parentPage = getNodeById(treeCopy, parentId),
      parentLevel = parentPage.level;
  var newPage = { name: pageTypeCopy.name, pageType: pageTypeCopy, parentId: parentId, level: (parentLevel + 1), children: [], comments: [], collapsed: false, state: 'active', id: tempId, uid: uid, section_id: sectionId, footer: false, newRecord: true};
  if(position == 'begining') {
    parentPage.children.unshift(newPage)
  } else {
    var indexToAddPage = parentPage.children.findIndex(function(page) { return(page.position == position) })
    parentPage.children.splice(indexToAddPage + 1, 0, newPage);
  }
  for(var index = 0; index < parentPage.children.length; index++){
    parentPage.children[index].position = index + 1
  }
  return sectionsCopy
}

function updatePageName(sections, id, sectionId, name) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id);
  page.name = name;
  return sectionsCopy
}

function updatePagePersitence(sections, id, sectionId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id);
  page.newRecord = false;
  return sectionsCopy
}

function updatePageId(sections, id, sectionId, newId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id);
  page.id = newId;
  return sectionsCopy
}

function updateCollapse(sections, id, sectionId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id);
  page.collapsed = !page.collapsed;
  return sectionsCopy
}

function updatePagePosition(sections, id, sectionId, newParentId, position) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id),
      newParentPage = getNodeById(treeCopy, newParentId),
      oldParentPage = getNodeById(treeCopy, page.parentId);
  oldParentPage.children.removeIf(function(elem, idx) { return elem.id == id });
  page.parentId = newParentPage.id;
  //  Insert at begining.
  if(position == 'begining') {
    newParentPage.children.unshift(page)
  } else {
    // when only sorting in same scope
    var indexToAddPage = newParentPage.children.findIndex(function(page) { return(page.position == position) })
    newParentPage.children.splice(indexToAddPage + 1, 0, page);
  }
  for(var index = 0; index < newParentPage.children.length; index++){
    newParentPage.children[index].position = index + 1
  }
  traverse(page, function(node) {
    var parentNode = getNodeById(treeCopy, node.parentId);
    node.level = parentNode.level + 1
  })
  return sectionsCopy
}

function removePage(sections, id, sectionId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id)
  page.state = 'archived'
  if(page.alt_section_id) {
    sectionsCopy.removeIf(function(section)  {
      return(section.id == page.alt_section_id)
    })
  }
  traverse(page, function(node) {
    node.state = 'archived'
  })
  return sectionsCopy
}

function addPageComment(sections, id, sectionId, commenter, message, tempId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id)
  var newComment = { message: message, commenter: commenter, id: tempId, created_at: 'Just now', state: 'active' }
  page.comments.push(newComment)
  return deepcopy(sectionsCopy)
}

function updateCommentId(sections, oldId, newId, sectionId, pageId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, pageId)
  var comment = page.comments.filter(function(comment) { return comment.id == oldId })[0]
  comment.id = newId
  return deepcopy(sectionsCopy)
}

function updatePageComment(sections, id, message, sectionId, pageId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, pageId)
  var comment = page.comments.filter(function(comment) { return comment.id == id })[0]
  comment.message = message
  return sectionsCopy
}

function updatePageType(sections, id, sectionId, pageType) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id)
  page.pageType = pageType
  return sectionsCopy
}

function deletePageComment(sections, commentId, pageId, sectionId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, pageId)
  page.comments.removeIf(function(comment) { return comment.id == commentId })
  return sectionsCopy
}

function createNewSection(sections, id, sectionId, newSectionName, timeStamp) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, id)
  var parentPage = getNodeById(treeCopy, page.parentId)
  page.alt_section_id = timeStamp
  traverse(page, function(node) {
    if(page.id != node.id) {
      node.section_id = timeStamp
    }
  })
  var newSection = { default: false, name: newSectionName, pageTree: page, id: timeStamp, state: 'active' }
  sectionsCopy.push(newSection);
  return sectionsCopy
}

function updateSectionId(sections, oldId, newId) {
  var sectionsCopy = Object.assign([], sections);
  var section = sectionsCopy.filter(function(section) { return(section.id == oldId) })[0];
  section.id = newId;
  section.pageTree.alt_section_id = newId;
  traverse(section.pageTree, function(node) {
    if(section.pageTree.id != node.id) {
      node.section_id = newId
    }
  })
  return sectionsCopy;
}

function removeSection(sections, id) {
  var sectionsCopy = Object.assign([], sections);
  var section = sectionsCopy.filter(function(section) { return(section.id == id) })[0]
  var defaultSection = sections.filter(function(section) {return section.default})[0]
  var sectionPage = getNodeByAltSectionId(defaultSection.pageTree, id)
  sectionPage.alt_section_id = null
  traverse(sectionPage, function(node) {
    if(sectionPage.id != node.id) {
      node.section_id = sectionPage.section_id
    }
  })
  sectionsCopy.removeIf(function(section)  {
    return(section.id == id)
  })
  section.state = 'archived'
  return sectionsCopy
}

function updatePageState(sections, pageId, sectionId, state) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.default) })[0].pageTree
  var page = getNodeById(treeCopy, pageId)
  page.state = state
  return sectionsCopy
}

function traverse(tree, callback) {
  var queue = new Queue();
  queue.enqueue(tree);
  var currentTree = queue.dequeue();
  while(currentTree){
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }
    callback(currentTree);
    currentTree = queue.dequeue();
  }
}

function getNodeById(tree, id){
  if(tree.id == id){
    return tree;
  }else if (tree.children != null){
    var i;
    var result = null;
    for(i=0; result == null && i < tree.children.length; i++){
      result = getNodeById(tree.children[i], id);
    }
    return result;
  }
  return null;
}

function getNodeByAltSectionId(tree, alt_section_id){
  if(tree.alt_section_id == alt_section_id){
    return tree;
  }else if (tree.children != null){
    var i;
    var result = null;
    for(i=0; result == null && i < tree.children.length; i++){
      result = getNodeByAltSectionId(tree.children[i], alt_section_id);
    }
    return result;
  }
  return null;
}


function getNodeByPosition(tree, position){
  if(tree.position == position){
    return tree;
  }else if (tree.children != null){
    var i;
    var result = null;
    for(i=0; result == null && i < tree.children.length; i++){
      result = getNodeByPosition(tree.children[i], position);
    }
    return result;
  }
  return null;
}


export { addPage, removePage, updatePagePosition, updatePageName, traverse, updateCollapse, updatePageId, addPageComment, updateCommentId, updatePageType, createNewSection, updatePageState, deletePageComment, updatePageComment, updatePagePersitence, removeSection, updateSectionId, getNodeByAltSectionId, getNodeById }
