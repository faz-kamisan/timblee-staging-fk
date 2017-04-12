COUNT = 0;
SVG_CANVAS_ID = null;
TILE_WIDTH = 182;
TILE_HEIGHT = 85;
ID = 0;
NODES = [];
EDGES = [];
DELETED_NODE_IDS = [];
STARTING_TILE = null;

function init() {

  var svg = SVG('flow-chart');
  SVG_CANVAS_ID = svg.id();
  var screeenData = $('#nodes').data('screens') || [];
  for (var i = 0; i < screeenData.length; i++) {
    var parentNode = screeenData.filter(function(node) {return node.id == screeenData[i].parent_id })[0];
    var bottomNodesData = screeenData.filter(function(node) {return node.parent_id == screeenData[i].id });
    var bottomNode = bottomLeftNode = bottomRightNode = null;
    if (bottomNodesData.length == 1) {
      var bottomNode = bottomNodesData[0].node_id;
    }else if(bottomNodesData.length == 2){
      var bottomLeftNode = bottomNodesData[0].node_id;
      var bottomRightNode = bottomNodesData[1].node_id;
    }
    if (parentNode) {
      var parentNodeId = parentNode.node_id;
    };
    if (screeenData[i].page) {screeenData[i].page.page_type = screeenData[i].page_type};

    var tile = initAddTiles(screeenData[i].node_id, screeenData[i].position, screeenData[i].level, parentNodeId, screeenData[i].path, screeenData[i].node_type, bottomNode, bottomLeftNode, bottomRightNode, screeenData[i].message, screeenData[i].page)

    if (screeenData[i].level == 1) {STARTING_TILE = tile};
  };
  svg.group().attr({ id: "tempGroup" });
  if (STARTING_TILE) {
    resetCanvasSize();
    ID = calculateMaxId();
  }else{
    $('.default-screen-hover-options').removeClass('hide');
    $('.starter-text').removeClass('hide');
  }
}

function bindEvents() {
  bindAddScreenEvent();
  bindAddDecisionScreensEvent();
  bindAddActionScreenEvent();
  bindAddInitialScreenEvent();
  bindAddInitialDecisionScreensEvent();
  bindSelectInitialScreen();
  bindSelectScreen();
  bindAddInitialActionScreenEvent();
  bindDeleteScreenEvent();
  bindShowMoreOptions();
  bindHideMoreOptions();
  bindOnClickMessage();
  bindEditMessage();
  // bindChangePageType();
}

function bindChangePageType() {
  $(document).on('click', '.screen-change-node', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = getNode(tileID);
  })
}

function bindOnClickMessage() {
  $(document).on('click', '.message', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = getNode(tileID);
    $(this).addClass('hide');
    $(this).closest('.tile').find('.edit-name-field').removeClass('hide').val(node.name).focus();
  })
}

function bindEditMessage() {
  $(document).on('blur', '.edit-name-field', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = getNode(tileID);
    $(this).addClass('hide');
    if ($(this).val()) {
      updateNode(node.id, {name: $(this).val()});
      saveDbChanges();
    };
    $(this).closest('.tile').find('.message').removeClass('hide').html(formatNodeMessage(node));
  })
}

function bindSelectInitialScreen () {
  $(document).on('click', '.initialScreenDropdown', function () {
    $(this).closest('.default-screen-hover-options').addClass('show-dropdown');
    $('.starter-text').addClass('hide');
    $('.add-initial-screen-dropdown').removeClass('hide');
  })
}

function bindSelectScreen() {
  $(document).on('click', '.selectScreen', function () {
    $(this).closest('div.tile').find('.add-screen-dropdown').removeClass('hide');
  })
}
function bindShowMoreOptions() {
  $(document).on('click', '.more', function() {
    var svg = $(this).closest('.screen-tile-container');
    svg.addClass('options-open');
  });
};

function bindHideMoreOptions() {
  $(document).on('click', '.close-options', function() {
    var svg = $(this).closest('.screen-tile-container');
    svg.removeClass('options-open');
  });
};

function bindAddInitialScreenEvent () {
  $(document).on('click', '.addInitialScreen', function() {
    $('.default-screen-hover-options').addClass('hide');
    STARTING_TILE = addTile(450, 135, null, 1, 'S', "#tile-blueprint-page", $(this).data('page'), $(this).html());
    saveDbChanges();
  });
}

function bindAddInitialActionScreenEvent () {
  $(document).on('click', '.addInitialAction', function() {
    $('.default-screen-hover-options').addClass('hide');
    STARTING_TILE = addTile(450, 135, null, 1, 'S', "#tile-blueprint-action", null);
    saveDbChanges();
  });
}

function bindAddInitialDecisionScreensEvent () {
  $(document).on('click', '.addInitialDecision', function() {
    $('.default-screen-hover-options').addClass('hide');
    STARTING_TILE = addTile(450, 135, null, 1, 'S', "#tile-blueprint-decision", null);
    var leftTile = addTile(300, 270, STARTING_TILE, 2, 'SL', "#tile-blueprint-conclusion", null, 'yes');
    var rightTile = addTile(600, 270, STARTING_TILE, 2, 'SR', "#tile-blueprint-conclusion", null, 'no');
    updateNode(STARTING_TILE.id(), {bottomLeftNode: leftTile.id(), bottomRightNode: rightTile.id()})
    resetCanvasSize();
    saveDbChanges();
  });
}


function bindAddDecisionScreensEvent() {
  $(document).on('click', '.addDecision', function() {

    var tileID = $(this).closest('.tile')[0].id.slice(0, -4)
    var tile = SVG.get(tileID);
    var node = getNode(tileID),
    nodeData = {bottomLeftNode: node.bottomLeftNode, bottomRightNode: node.bottomRightNode, bottomNode: node.bottomNode, bottomEdge: node.bottomEdge, bottomLeftEdge: node.bottomLeftEdge, bottomRightEdge: node.bottomRightEdge},
    newX = tile.x(),
    newY = tile.y() + TILE_HEIGHT + 50,
    newY12 = newY + TILE_HEIGHT + 50,
    newPath = node.path + 'D',
    newPath1 = node.path + 'DL',
    newPath2 = node.path + 'DR';

    var children = [];

    var tempGroup = SVG.get("tempGroup"),
    oldGroup = SVG.get(tile.id() + "Group");
    oldGroup.each(function(i, e){
      tempGroup.add(this);
    })

    if(node.bottomNode){
      updateNode(node.bottomNode, {parentNode: null});
    }else if(node.bottomLeftNode){
      updateNode(node.bottomLeftNode, {parentNode: null});
      updateNode(node.bottomRightNode, {parentNode: null});
    }

    var topTile = addTile(newX, newY, tile, getNode(tile.id()).level + 1, newPath, "#tile-blueprint-decision", null),
        newX1 = topTile.x() - 150,
        newX2 = topTile.x() + 150,
        topNode = getNode(topTile.id());

    var leftTile = addTile(newX1, newY12, topTile, getNode(tile.id()).level + 2, newPath1, "#tile-blueprint-conclusion", null, 'yes'),
    xShift = leftTile.x() - newX1,
    rightTile = addTile(newX2 + xShift, newY12, topTile, getNode(tile.id()).level + 2, newPath2, "#tile-blueprint-conclusion", null, 'no'),
    leftNode = getNode(leftTile.id()),
    rightNode = getNode(rightTile.id());
    if(node.bottomNode || node.bottomLeftNode){
      updateNode(leftNode.id, nodeData);

      if(node.bottomNode){
        updateNode(node.bottomNode, {parentNode: leftTile.id()});
      }else{
        updateNode(node.bottomLeftNode, {parentNode: leftTile.id()});
        updateNode(node.bottomRightNode, {parentNode: leftTile.id()});
      }
    }
    updateNode(node.id, {bottomNode: topTile.id(), bottomLeftNode: null, bottomRightNode: null, bottomLeftEdge: null, bottomRightEdge: null});
    updateNode(topNode.id, {bottomLeftNode: leftTile.id(), bottomRightNode: rightTile.id()});

    var newGroup = SVG.get(leftTile.id() + "Group");
    tempGroup.each(function(i, e){
      newGroup.add(this);
    })
    moveGroup(leftTile, (xShift - 1), 2, 'DL', 'add', false, leftNode.path);

    resetCanvasSize();
    saveDbChanges();
  })
}

function bindDeleteScreenEvent() {
  $(document).on('click', '.screen-delete-node', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = getNode(tileID);
    var bottomNode = null;
    if(node.parentNode && tile.classes().includes('decisionTile')){
      var leftNode = getNode(node.bottomLeftNode);
      var rightNode = getNode(node.bottomRightNode);
      if (rightNode.bottomNode && leftNode.bottomNode) {
        alert('error');
      } else {
        if (leftNode.bottomNode){
          var bottomNode = getNode(leftNode.bottomNode);
          var bottomTile = SVG.get(bottomNode.id);
          var position = node.position - leftNode.position;
          var RemovePathValue = 'DL';
        } else if(rightNode.bottomNode) {
          var bottomNode = getNode(rightNode.bottomNode);
          var bottomTile = SVG.get(bottomNode.id);
          var position = rightNode.position - node.position;
          var RemovePathValue = 'DR';
        }
        tile.remove();
        SVG.get(node.bottomLeftNode).remove();
        SVG.get(node.bottomRightNode).remove();
        SVG.get(node.bottomLeftEdge).remove();
        SVG.get(node.bottomRightEdge).remove();
        $("#" + tile.id() + "Tile").remove();
        $("#" + node.bottomRightNode + "Tile").remove();
        $("#" + node.bottomLeftNode + "Tile").remove();
        removeNode(node.id);
        removeNode(leftNode.id);
        removeNode(rightNode.id);
        if(node.parentNode){
          parentNode = getNode(node.parentNode);
          if(bottomNode){
            SVG.get(bottomNode.topEdge).remove();
            updateNode(bottomTile.id(), {topEdge: parentNode.bottomEdge});
            updateNode(parentNode.id, {bottomNode: bottomTile.id(), bottomEdge: bottomNode.topEdge});
          }else{
            SVG.get(parentNode.bottomEdge).remove();
            updateNode(parentNode.id, {bottomNode: null, bottomEdge: null});
          }
        }
        var group = SVG.get(tile.id() + "Group").removeClass('decisionGroup');
        var leftGroup = SVG.get(node.bottomRightNode + "Group");
        var rightGroup = SVG.get(node.bottomLeftNode + "Group");
        if(bottomNode){
          updateNode(bottomTile.id(), {parentNode: node.parentNode});
          moveTileWithGroup(bottomTile, position, -2, RemovePathValue, 'remove', false);
          validatePositionOf(bottomTile);
        }
      }
    }else if(node.parentNode){

      tile.remove();
      removeNode(node.id);
      $("#" + tile.id() + "Tile").remove();
      if(node.bottomNode){
        var bottomNode = getNode(node.bottomNode);
        var bottomTile = SVG.get(bottomNode.id);
      }
      if(node.parentNode){
        parentNode = getNode(node.parentNode);
        if(bottomNode){
          SVG.get(bottomNode.topEdge).remove();
          updateNode(bottomTile.id(), {topEdge: parentNode.bottomEdge});
          updateNode(parentNode.id, {bottomNode: bottomTile.id()});
        }else{
          SVG.get(parentNode.bottomEdge).remove();
          updateNode(parentNode.id, {bottomNode: null, bottomEdge: null});
        }
      }
      if(bottomNode){
        updateNode(bottomTile.id(), {parentNode: node.parentNode});
        moveTileWithGroup(bottomTile, 0, -1, 'D', 'remove', false);

        validatePositionOf(bottomTile);
      }
    }
    resetCanvasSize();
    saveDbChanges();
  });
}

function bindAddScreenEvent() {
  $(document).on('click', '.addScreen', function() {

    $(this).closest('div.tile').find('.add-screen-dropdown').addClass('hide');
    addScreenEvent(this, "#tile-blueprint-page");
  })
}

function bindAddActionScreenEvent() {
  $(document).on('click', '.addAction', function() {
    addScreenEvent(this, "#tile-blueprint-action");
  })
}

function addScreenEvent(target, tileSelector) {
  var tileID = $(target).closest('.tile')[0].id.slice(0, -4)
  var tile = SVG.get(tileID);
  var node = getNode(tileID),
  name = null,
  nodeData = {bottomLeftNode: node.bottomLeftNode, bottomRightNode: node.bottomRightNode, bottomNode: node.bottomNode, bottomEdge: node.bottomEdge, bottomLeftEdge: node.bottomLeftEdge, bottomRightEdge: node.bottomRightEdge},

  newX = tile.x(),
  newY = tile.y() + TILE_HEIGHT + 50,
  newPath = node.path + 'D';
  var children = [];
  var tempGroup = SVG.get("tempGroup"),

  oldGroup = SVG.get(tile.id() + "Group")
  oldGroup.each(function(i, e){
    tempGroup.add(this);
  })

  if(node.bottomNode){
    updateNode(node.bottomNode, {parentNode: null});
  }else if(node.bottomLeftNode){
    updateNode(node.bottomLeftNode, {parentNode: null});
    updateNode(node.bottomRightNode, {parentNode: null});
  }
  if (tileSelector == '#tile-blueprint-page') { name = $(target).html(); };
  var newTile = addTile(newX, newY, tile, getNode(tile.id()).level + 1, newPath, tileSelector, $(target).data('page'), name);

  bottomNode = getNode(newTile.id());
  if(node.bottomNode || node.bottomLeftNode){
    updateNode(bottomNode.id, nodeData)

    if(node.bottomNode){
      updateNode(node.bottomNode, {parentNode: newTile.id()})
    }else{
      updateNode(node.bottomLeftNode, {parentNode: newTile.id()})
      updateNode(node.bottomRightNode, {parentNode: newTile.id()})
    }
  }
  updateNode(node.id, {bottomNode: newTile.id(), bottomLeftEdge: null, bottomRightEdge: null, bottomRightNode: null, bottomLeftNode: null})


  newGroup = SVG.get(newTile.id() + "Group")
  tempGroup.each(function(i, e){
    newGroup.add(this)
  })

  moveGroup(newTile, 0, 1, 'D', 'add', false, bottomNode.path)

  resetCanvasSize();
  saveDbChanges();
}

function moveTile(tile, xShift, yShift, AddValueForPath, action) {
  var x = tile.x() + (150 * xShift),
      y = tile.y() + (50 + TILE_HEIGHT) * yShift,
      node = getNode(tile.id());
  $("#" + tile.id() + "Tile").css({ left:  x, top: y })
  tile.x(x).y(y);
  currentNode = getNode(tile.id());
  updateNode(tile.id(), { level: currentNode.level + yShift, position: getPosition(tile)});
  if (AddValueForPath) {updateNode(tile.id(), {path: calculatePath(node.path, currentNode.path, AddValueForPath, action)})};
}

function moveGroup(tile, xShift, yShift, AddValueForPath, action, istopMostTile, nodePath) {
  var moveX = 150 * xShift,
      moveY = (50 + TILE_HEIGHT) * yShift,
      node = getNode(tile.id()),
      children = [];

  var tileGroup = SVG.get(node.id + 'Group');
  tileGroup.each(function(i, e){
    if(this.type != "g") {
      var x = this.x() + moveX;
      var y = this.y() + moveY;
      this.x(x).y(y);
      if(this.type == "rect") {
        $("#" + this.id() + "Tile").css({ top: y, left: x })
        currentNode = getNode(this.id());
        updateNode(this.id(), { level: currentNode.level + yShift, position: getPosition(this)})
        if (AddValueForPath) {updateNode(this.id(), {path: calculatePath(nodePath, currentNode.path, AddValueForPath, action)})};
        children.push(this);
      }
    }
  }, true);

  if(!istopMostTile){
    repositionParentTileOf(tile);
    for (var i = 0; i < children.length; i++) {
      validatePositionOf(children[i])
    };
  }
}

function moveTileWithGroup(tile, xShift, yShift, AddValueForPath, action, istopMostTile) {
  var nodePath = getNode(tile.id()).path;
  moveTile(tile, xShift, yShift, AddValueForPath, action);
  moveGroup(tile, xShift, yShift, AddValueForPath, action, istopMostTile, nodePath)
}

function repositionParentTileOf(tile){
  var node = getNode(tile.id());
  if (node.parentNode) {
    var parentTile = SVG.get(node.parentNode),
        parentNode = getNode(node.parentNode);
    if (parentNode.bottomEdge) {
      if( parentNode.position != node.position){
        moveTile(parentTile, node.position - parentNode.position, 0, null)
        reconnectBottomEdges(parentTile)
        updateNode(parentNode.id, {position: getPosition(parentTile)})
        validatePositionOf(parentTile);
        repositionParentTileOf(parentTile);
      }
    }else if(parentNode.bottomRightNode && parentNode.bottomLeftNode){
      var rightTile = SVG.get(parentNode.bottomRightNode);
      var leftTile = SVG.get(parentNode.bottomLeftNode);
      var rightNode = getNode(rightTile.id());
      var leftNode = getNode(leftTile.id());
      var shift = ((rightNode.position - leftNode.position)/2) + leftNode.position  - parentNode.position
      if(shift != 0){
        moveTile(parentTile, shift, 0, null);
        reconnectBottomEdges(parentTile);
        updateNode(parentNode.id, {position: getPosition(parentTile)})
        validatePositionOf(parentTile);
        repositionParentTileOf(parentTile);
      }
    }
  };
}

function validatePositionOf(tile){
  var node = getNode(tile.id()),
      position = node.position,
      level = node.level,
      xShift = null;
  if(node.parentNode){
    var parentDecisionGroup = SVG.get(node.parentNode).parent('.decisionGroup');
  if(parentDecisionGroup){
      var parentDecisionTile = SVG.get(parentDecisionGroup.id().slice(0,-5))
          parentDecisionNode = getNode(parentDecisionTile.id()),
          parentDecisionNodePath = getNode(parentDecisionTile.id()).path,
          pos = null;
      if(node.path.slice(parentDecisionNodePath.length)[0] == 'L'){
        rightNodePath = parentDecisionNodePath + 'R';
        pos = calculateLeftmostPos(rightNodePath, level);
        if(pos && pos - position < 2){
          xShift =  2 + position - pos;
          var rightTile = SVG.get(parentDecisionNode.bottomRightNode);
        }

      }else{
        leftNodePath = parentDecisionNodePath + 'L';
        pos = calculateRightmostPos(leftNodePath, level);
        if(pos && position - pos < 2){
          xShift = 2 + pos - position;
          var rightTile = SVG.get(parentDecisionNode.bottomRightNode);
        }
      }
    }
    if(xShift){
      moveTileWithGroup(rightTile, xShift, 0, null, null, false);
      validatePositionOf(rightTile);
    }else{
      var oldNode = getNodeFromPosition(level, position, tile.id());

      if(oldNode && oldNode.parentNode != null && getNode(oldNode.parentNode).parentNode != null){
        xShift = (2 - Math.abs(oldNode.position - node.position));
        var commonParentDecisionNode = getNodeByPath(calculateCommonPath(node.path, oldNode.path));
        var rightTile = SVG.get(commonParentDecisionNode.bottomRightNode);
        moveTileWithGroup(rightTile, xShift, 0, null, null, false);
        validatePositionOf(rightTile);
      }
    }
  }
}

function initAddTiles(id, position, level, parentNodeId, path, node_type, bottomNode, bottomLeftNode, bottomRightNode, name, page) {
  var canvas = SVG.get(SVG_CANVAS_ID)
  var x = position * 150;
  var y = level * 135
  var blueprintID = "#tile-blueprint-" + node_type
  var tile = canvas.rect(TILE_WIDTH,TILE_HEIGHT).move(x, y).style('fill', 'transparent').id(id);

  NODES.push({ id: id, uid: page && page.uid, pageId: page && page.id, type: node_type, updated: false, saved: true, topEdge: null, leftEdge: null, rightEdge: null, bottomEdge: null, bottomLeftEdge: null, bottomRightEdge: null, bottomNode: bottomNode, bottomLeftNode: bottomLeftNode, bottomRightNode: bottomRightNode, parentNode: parentNodeId , level: level, position: position, path: path, name: name })

  var group = canvas.group().attr({ id: tile.id() + "Group" })
  if(parentNodeId) {
    var connector = connect(SVG.get(parentNodeId), tile)
    SVG.get(parentNodeId + "Group")
       .add(tile)
       .add(group)
       .add(connector)
  }
  if (node_type == 'decision') {
    tile.addClass('decisionTile');
    group.addClass('decisionGroup');
  };
  cssProps = { top: tile.y(),
               left: tile.x(),
               position: "absolute" }

  div = $(blueprintID).clone()
                            .css(cssProps);
  if (name) { div.find('.message').html(formatNodeMessage(getNode(id))) };
  if (page) {

    if (page.uid && (page.uid + '').length < 3) {
      page.uid = ('000' + page.uid).slice(-3)
    };
    div.find('.uid').html("ID:" + (page.uid || 'xxx'))
    div.find('.screen-tile-right-icon').addClass(page.page_type.icon_name)

  };

  div[0].id = tile.id() + "Tile";

  $('#tile-container').append(div)
  return tile
}

function addTile(x, y, parentTile, level, path, blueprintID, page, name) {

  var canvas = SVG.get(SVG_CANVAS_ID)
  var position = x/150;
  ID = ID + 1;
  var tile = canvas.rect(TILE_WIDTH,TILE_HEIGHT).move(x, y).style('fill', 'transparent').id('Tile' + (ID));

  NODES.push({ id: tile.id(), uid: page && page.uid, pageId: page && page.id, pageTypeId: page && page.page_type_id, name: name || blueprintID.match(/.*-(.*)/)[1], type: blueprintID.match(/.*-(.*)/)[1], updated: false, saved: false, topEdge: null, leftEdge: null, rightEdge: null, bottomEdge: null, bottomLeftEdge: null, bottomRightEdge: null, bottomNode: null, bottomLeftNode: null, bottomRightNode: null, parentNode: parentTile && parentTile.id(), level: level, position: getPosition(tile), path: path })
  var group = canvas.group().attr({ id: tile.id() + "Group" })

  if (blueprintID == '#tile-blueprint-decision') {
    tile.addClass('decisionTile');
    group.addClass('decisionGroup');
  };
  if(parentTile) {
    var connector = connect(parentTile, tile)

    SVG.get(parentTile.id() + "Group")
       .add(tile)
       .add(group)
       .add(connector)
  }

  cssProps = { top: tile.y(),
               left: tile.x(),
               position: "absolute" }

  div = $(blueprintID).clone()
                            .css(cssProps);

  div[0].id = tile.id() + "Tile";
  if (name) { div.find('.message').html(formatNodeMessage(getNode(tile.id()))) };
  if (page) {
    div.find('.screen-tile-right-icon').addClass(page.page_type.icon_name)
    if (page.uid && (page.uid + '').length < 3) {
      page.uid = ('000' + page.uid).slice(-3)
    };
    div.find('.uid').html("ID:" + (page.uid || 'xxx'))
  };
  $('#tile-container').append(div)
  if (page && page.id) { $('li.page-id-' + page.id).remove()};

  validatePositionOf(tile);
  return tile
}

function resetCanvasSize() {
  var maxPos = calculateMAxPosAndLevel()[0],
      maxLevel = calculateMAxPosAndLevel()[1];
  var width = ((maxPos + 2) * 150 + TILE_WIDTH) + 'px';
  var height = (maxLevel + 2) * (TILE_HEIGHT + 50) + 'px';
  SVG.get(SVG_CANVAS_ID).width(width).height(height);
  var minPos = calculateMinPos();
  if(minPos < 1){
    moveTileWithGroup(STARTING_TILE, 1 - minPos, 0, null, null, true)
  }else if(minPos > 3){
    moveTileWithGroup(STARTING_TILE, 3 - minPos, 0, null, null, true)
  }
}

function saveDbChanges() {
  $.ajax({
    type: 'post',
    url: location.href + '/crud_screens',
    data: {updated_nodes: getUpdatedNodes(), new_nodes: getNewNodes(), deleted_nodes: DELETED_NODE_IDS },
    dataType: 'json',
    success: function(result) {
      if (result['updated_ids']) {
        for (var i = 0; i < result['updated_ids'].length; i++) {
          updateNode(result['updated_ids'][i], {updated: false})
        };
      };
      if (result['saved_ids']) {
        for (var i = 0; i < result['saved_ids'].length; i++) {
          updateNode(result['saved_ids'][i], {saved: true})
        };
      }
    }
  });
}
function reconnectBottomEdges(tile) {
  var node = getNode(tile.id());
  if (node.bottomEdge) {
    var bottomTile = SVG.get(node.bottomNode);
    var bottomEdge = getEdge(node.bottomEdge);
    SVG.get(bottomEdge.id).remove();
    var connector = connect(tile, bottomTile);
    SVG.get(tile.id() + "Group").add(connector);
  } else {
    var bottomLeftEdge = getEdge(node.bottomLeftEdge);
    var bottomRightEdge = getEdge(node.bottomRightEdge);
    var rightTile = SVG.get(node.bottomRightNode);
    var leftTile = SVG.get(node.bottomLeftNode);
    SVG.get(bottomLeftEdge.id).remove();
    SVG.get(bottomRightEdge.id).remove();
    var connector1 = connect(tile, leftTile);
    var connector2 = connect(tile, rightTile);
    SVG.get(tile.id() + "Group").add(connector1).add(connector2);
  };
}

function connect(source, target) {
  if ((source.x() == target.x()) && (source.y() == target.y())) {
    return
  }

  if (source.x() == target.x()) {
    if(source.y() < target.y()) {
      var s = tileBottomPin(source)
      var t = tileTopPin(target)

      var edge = buildConnector([[s.x, s.y - 30], [t.x, t.y]], "Polyline" + source.id())
      updateNode(target.id(), {topEdge: edge.id()})
      updateNode(source.id(), {bottomEdge: edge.id()})
    } else {
      var s = tileBottomPin(target)
      var t = tileTopPin(source)

      var edge = buildConnector([[s.x, s.y - 30], [t.x, t.y]], "Polyline" + source.id())

      updateNode(source.id(), {topEdge: edge.id()})
      updateNode(target.id(), {bottomEdge: edge.id()})
    }
  } else if (source.y() == target.y()) {
    if(source.x() < target.x()) {
      var s = tileRightPin(source)
      var t = tileLeftPin(target)

      var edge = buildConnector([[s.x, s.y], [t.x, t.y]], "Polyline" + source.id())

      updateNode(target.id(), {leftEdge: edge.id()})
      updateNode(source.id(), {rightEdge: edge.id()})
    } else {
      var s = tileRightPin(target)
      var t = tileLeftPin(source)

      var edge = buildConnector([[s.x, s.y], [t.x, t.y]], "Polyline" + source.id())

      updateNode(source.id(), {leftEdge: edge.id()})
      updateNode(target.id(), {rightEdge: edge.id()})
    }
  } else {
    if(source.y() < target.y()) {
      var polyline_pos = source.x() > target.x() ? 'PolylineLeft' : 'PolylineRight'
      var s = tileBottomPin(source)
      var t = tileTopPin(target)

      var edge = buildConnector([[s.x, s.y], [s.x, s.y + 35], [t.x, s.y + 35], [t.x, t.y + 20]], polyline_pos + source.id())

      updateNode(target.id(), {topEdge: edge.id()})
      source.x() > target.x() ? updateNode(source.id(), {bottomLeftEdge: edge.id()}) : updateNode(source.id(), {bottomRightEdge: edge.id()})
    } else {
    var polyline_pos = target.x() > source.x() ? 'PolylineLeft' : 'PolylineRight'
     var s = tileBottomPin(target)
     var t = tileTopPin(source)

     var edge = buildConnector([[s.x, s.y], [s.x, s.y + 35], [t.x, s.y + 35], [t.x, t.y + 20]], polyline_pos + source.id())

     updateNode(source.id(), {topEdge: edge.id()})
      target.x() > source.x() ? updateNode(target.id(), {bottomLeftEdge: edge.id()}) : updateNode(source.id(), {bottomRightEdge: edge.id()})
    }
  }

  EDGES.push({
    id: edge.id(),
    source: source.id(),
    target: target.id()
  })

  return edge
}

function buildConnector(points, id) {
  return SVG.get(SVG_CANVAS_ID)
            .polyline(points)
            .fill('none')
            .stroke({ width: 1, color: '#cccccc' })
}

function calculatePath(nodePath, path, addValue, action) {
  if(action == 'add'){
    return nodePath.slice(0,-addValue.length) + addValue + path.slice(nodePath.slice(0,-addValue.length).length)
  }else if(action == 'remove'){
    return nodePath.slice(0, -addValue.length) + path.slice(nodePath.length)
  }else{
    return path
  }
}

function calculateMAxPosAndLevel() {
  var maxPos = Math.max.apply(this, NODES.map(function(o){return o.position;}))
  var maxLevel = Math.max.apply(this, NODES.map(function(o){return o.level;}))
  return [maxPos, maxLevel]
}

function calculateMinPos() {
  return Math.min.apply(this, NODES.map(function(o){return o.position;}))
}

function calculateCommonPath (path1, path2) {
  char = 0;
  for (var i = 0; i < path1.length; i++) {
    if(path1[i] == path2[i]){
      char += 1
    }else{
      break
    }
  };
  return path1.slice(0, char);
}

function tileLeftPin(tile) {
  x = tile.x()
  y = (tile.y() + (TILE_HEIGHT / 2))

  return { x: x, y: y }
}

function tileRightPin(tile) {
  x = (tile.x() + TILE_WIDTH)
  y = (tile.y() + (TILE_HEIGHT / 2))

  return { x: x, y: y }
}

function tileTopPin(tile) {
  x = (tile.x() + (TILE_WIDTH / 2))
  y = tile.y()

  return { x: x, y: y }
}

function tileBottomPin(tile) {
  x = (tile.x() + (TILE_WIDTH / 2))
  y = (tile.y() + TILE_HEIGHT)

  return { x: x, y: y }
}

function getPosition (tile) {
  return tile.x()/150;
}

function calculateMaxId() {
  var regex = /\d+$/g;
  var ids = NODES.map(function(node) { return node.id.match(regex)[0] })
  return Math.max.apply(this, ids)
}

function calculateRightmostPos(leftNodePath, level) {
  var nodes = NODES.filter(function(node, idx){
    return node.level == level && node.path.startsWith(leftNodePath)
  })
  if(nodes.length > 0){
    return Math.max.apply(this, nodes.map(function(o){return o.position;}))
  }
}

function calculateLeftmostPos(rightNodePath, level) {
  var nodes = NODES.filter(function(node, idx){
    return node.level == level && node.path.startsWith(rightNodePath)
  })
  if(nodes.length > 0){
    return Math.min.apply(this, nodes.map(function(o){return o.position;}))
  }
}

function removeNode(nodeID) {
  DELETED_NODE_IDS.push(nodeID)
  NODES = NODES.filter(function(node, idx){
    return node.id != nodeID
  })
}

function getNode(nodeID) {
  return NODES.filter(function(node, idx){
    return node.id == nodeID
  })[0]
}

function getNodeByPath(path) {
  return NODES.filter(function(node, idx){
    return node.path == path
  })[0]
}

function getEdge(edgeID) {
  return EDGES.filter(function(edge, idx){
    return edge.id == edgeID
  })[0]
}

function getNodeFromPosition(level, position, id) {
  return NODES.filter(function(node, idx){
    return node.level == level && node.id != id && (Math.abs(node.position - position) < 2)
  })[0]
}

function updateNode(nodeID, props) {
  if (containsAny(Object.keys(props), ['level', 'position', 'path', 'parentNode', 'name'])){
    props.updated = true;
  }
  NODES = NODES.map(function(node, idx){
    if (node.id == nodeID) {
      return Object.assign(node, props)
    } else {
      return node
    }
  })
}

function containsAny(source, target){
    var result = source.filter(function(item){ return target.indexOf(item) > -1});
    return (result.length > 0);
}

function getUpdatedNodes() {
  return NODES.filter(function(node, idx){
    return node.updated && node.saved
  })
}

function getNewNodes() {
  return NODES.filter(function(node, idx){
    return !node.saved
  })
}

function getConnectingNodesEdge(edgeID) {
  return EDGES.filter(function(edge, idx){
    return edge.id == edgeID
  })[0]
}

function formatNodeMessage (node) {
  if (node.type == 'conclusion') {
    return node.name.length > 37 ? node.name.slice(0, 37) + '..' : node.name
  } else{
    return node.name.length > 50 ? node.name.slice(0, 50) + '..' : node.name
  };
}

$(function(){
  init();
  bindEvents();
})
