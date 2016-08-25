function addPage(tree, pageTypeId, parentId) {
  var parentPage = getNodeById(tree, parentId),
      parentLevel = parentPage.level;
  var newPage = { name: 'New Page', pageTypeId: pageTypeId, parentId: parentId, level: (parentLevel + 1), children: []};
  parentPage.children.push(newPage);
  return tree
}

function updatePageName(tree, id, name) {
  var treeCopy = Object.assign({}, tree)
  var page = getNodeById(treeCopy, id);
  page.name = name;
  return treeCopy
}

function updatePagePosition(tree, id, newParentId) {
  var treeCopy = Object.assign({}, tree)
  var page = getNodeById(treeCopy, id),
      newParentPage = getNodeById(treeCopy, newParentId),
      oldParentPage = getNodeById(treeCopy, page.parentId);
  oldParentPage.children.removeIf(function(elem, idx) { return elem.id == id });
  page.parentId = newParentPage.id;
  page.level = newParentPage.level + 1
  newParentPage.children.push(page);
  return treeCopy
}

function removePage(tree, id) {
  var treeCopy = Object.assign({}, tree)
  var page = getNodeById(treeCopy, id),
      parentPage = getNodeById(treeCopy, page.parentId);
  parentPage.children.removeIf(function(elem, idx) { return elem.id == id });
  return treeCopy
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

export { addPage, removePage, updatePagePosition, updatePageName }
