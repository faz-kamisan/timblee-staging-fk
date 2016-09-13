function addPage(sections, sectionId, pageType, parentId, position, tempId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
  var pageTypeCopy = Object.assign({}, pageType);
  pageTypeCopy.icon_name = pageTypeCopy.iconName
  delete(pageTypeCopy.iconName)
  var parentPage = getNodeById(treeCopy, parentId),
      parentLevel = parentPage.level;
  var uids = []
  traverse(treeCopy, function(node) {
    uids.push(node.uid)
  })
  var newUid = Math.max.apply(null, uids) + 1
  var newPage = { name: pageTypeCopy.name, pageType: pageTypeCopy, parentId: parentId, level: (parentLevel + 1), children: [], comments: [], collapsed: false, id: tempId, uid: newUid, section_id: sectionId};
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
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
  var page = getNodeById(treeCopy, id);
  page.name = name;
  return sectionsCopy
}

function updatePageId(sections, id, sectionId, newId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
  var page = getNodeById(treeCopy, id);
  page.id = newId;
  return sectionsCopy
}

function updateCollapse(sections, id, sectionId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
  var page = getNodeById(treeCopy, id);
  page.collapsed = !page.collapsed;
  return sectionsCopy
}

function updatePagePosition(sections, id, sectionId, newParentId, position) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
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
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
  var page = getNodeById(treeCopy, id),
      parentPage = getNodeById(treeCopy, page.parentId);
  parentPage.children.removeIf(function(elem, idx) { return elem.id == id });
  return sectionsCopy
}

function addPageComment(sections, id, sectionId, commenter, message, tempId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
  var page = getNodeById(treeCopy, id)
  var newComment = { message: message, commenter: commenter, id: tempId, created_at: 'Just now', state: 'active' }
  page.comments.push(newComment)
  return sectionsCopy
}

function updateCommentId(sections, oldId, newId, sectionId, pageId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
  var page = getNodeById(treeCopy, pageId)
  var comment = page.comments.filter(function(comment) { return comment.id == oldId })[0]
  comment.id = newId
  return sectionsCopy
}

function deletePageComment(sections, id, pageId, sectionId) {
  var sectionsCopy = Object.assign([], sections);
  var treeCopy = sectionsCopy.filter(function(section) { return(section.id == sectionId) })[0].pageTree
  var page = getNodeById(treeCopy, pageId)
  page.comments.removeIf(function(comment) { return(comment.id == id) })
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


export { addPage, removePage, updatePagePosition, updatePageName, traverse, updateCollapse, updatePageId, addPageComment, updateCommentId, deletePageComment }
