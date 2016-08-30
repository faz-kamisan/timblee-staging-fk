function addPage(tree, pageTypeId, parentId, position) {
  var parentPage = getNodeById(tree, parentId),
      parentLevel = parentPage.level;
  var newPage = { name: 'New Page', pageTypeId: pageTypeId, parentId: parentId, level: (parentLevel + 1), children: []};
  if(position == 'begining') {
    newPage.position = parentPage.children[0] ? (parentPage.children[0].position - 1) : 1
    parentPage.children.unshift(newPage)
  } else {
    var previousPage = getNodeByPosition(tree, position)
    var indexToAddPage = parentPage.children.findIndex(function(page) { return(page.position == position) })
    for(var index = 0; index < parentPage.children.length; index++){
      if(index <= indexToAddPage) {
        parentPage.children[index].position--
      } else {
        parentPage.children[index].position++
      }
    }
    newPage.position = position
    parentPage.children.splice(indexToAddPage, 0, newPage);
  }
  return tree
}

function updatePageName(tree, id, name) {
  var treeCopy = Object.assign({}, tree)
  var page = getNodeById(treeCopy, id);
  page.name = name;
  return treeCopy
}

function updateCollapse(tree, id) {
  var treeCopy = Object.assign({}, tree)
  var page = getNodeById(treeCopy, id);
  page.collapsed = !page.collapsed;
  return treeCopy
}

function updatePagePosition(tree, id, newParentId, position) {
  var treeCopy = Object.assign({}, tree)
  var page = getNodeById(treeCopy, id),
      newParentPage = getNodeById(treeCopy, newParentId),
      oldParentPage = getNodeById(treeCopy, page.parentId);
  oldParentPage.children.removeIf(function(elem, idx) { return elem.id == id });
  page.parentId = newParentPage.id;
  if(position == 'begining') {
    page.position = newParentPage.children[0] ? (newParentPage.children[0].position - 1) : 1
    newParentPage.children.unshift(page)
  } else {
    var previousPage = getNodeByPosition(tree, position)
    var indexToAddPage = newParentPage.children.findIndex(function(page) { return(page.position == position) })
    for(var index = 0; index < newParentPage.children.length; index++){
      if(index <= indexToAddPage) {
        newParentPage.children[index].position--
      } else {
        newParentPage.children[index].position++
      }
    }
    page.position = position
    newParentPage.children.splice(indexToAddPage + 1, 0, page);
  }
  traverse(page, function(node) {
    var parentNode = getNodeById(treeCopy, node.parentId);
    node.level = parentNode.level + 1
  })
  return treeCopy
}

function removePage(tree, id) {
  var treeCopy = Object.assign({}, tree)
  var page = getNodeById(treeCopy, id),
      parentPage = getNodeById(treeCopy, page.parentId);
  parentPage.children.removeIf(function(elem, idx) { return elem.id == id });
  return treeCopy
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


export { addPage, removePage, updatePagePosition, updatePageName, traverse, updateCollapse }
