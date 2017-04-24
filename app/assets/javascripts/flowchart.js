COUNT = 0;
SVG_CANVAS_ID = null;
TILE_WIDTH = 182;
TILE_HEIGHT = 85;
ID = 0;
NODES = [];
EDGES = [];
DELETED_NODE_IDS = [];
STARTING_TILE = null;
LinkingTileId = null;
LinkTileToId = null;
LINKS = [];
var Flowchart = function () {
}

Flowchart.prototype.init = function() {
  var _this = this;
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

    var tile = _this.initAddTile(screeenData[i].node_id, screeenData[i].position, screeenData[i].level, parentNodeId, screeenData[i].path, screeenData[i].node_type, bottomNode, bottomLeftNode, bottomRightNode, screeenData[i].message, screeenData[i].page)
    if (screeenData[i].level == 1) {STARTING_TILE = tile};

  };
  svg.group().attr({ id: "tempGroup" });
  if (STARTING_TILE) {
    _this.resetCanvasSize();
    ID = _this.calculateMaxId();
  }else{
    $('.default-screen-hover-options').removeClass('hide');
    $('.starter-text').removeClass('hide');
  }
  for (var i = 0; i < screeenData.length; i++) {
    if (screeenData[i].linking_screen_id) {
      var sourceNodeId = screeenData[i].node_id
      var targetNodeId = screeenData.filter(function(node) {return node.id == screeenData[i].linking_screen_id })[0].node_id;
      _this.link(sourceNodeId, targetNodeId)
    };
  }
}

Flowchart.prototype.bindEvents = function() {
  var _this = this;
  this.bindAddScreenEvent();
  this.bindAddDecisionScreensEvent();
  this.bindAddActionScreenEvent();
  this.bindAddInitialScreenEvent();
  this.bindAddInitialDecisionScreensEvent();
  this.bindSelectInitialScreen();
  this.bindSelectScreen();
  this.bindAddInitialActionScreenEvent();
  this.bindDeleteScreenEvent();
  this.bindShowMoreOptions();
  this.bindHideMoreOptions();
  this.bindOnClickMessage();
  this.bindEditMessage();
  this.bindAddLink();
  this.bindAddLinkTo();
  this.bindAddCommentToScreen();
  this.bindFocusOutTileOptions();
}

Flowchart.prototype.bindFocusOutTileOptions = function() {
  $(document).on('focusout', '.screen-hover-options', function (e) {
    if($(this).css('visibility') == 'hidden' ){
      $('.add-screen-dropdown').addClass('hide').removeClass('show-dropdown');
    }
  })
  $(document).on('focusout', '.default-screen-hover-options', function () {
    if($(this).css('visibility') == 'hidden' ){
      $('.add-initial-screen-dropdown').addClass('hide');
      $(this).closest('.default-screen-hover-options').removeClass('show-dropdown');
    }
  })
};

Flowchart.prototype.bindAddCommentToScreen = function() {
  var _this = this;
  $(document).on('click', '.screen .screen-comment-node', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = _this.getNode(tileID);
    $('#page-comments-modal .page').html('')
    if ($('.comments-page-' + node.pageId).html()) {
      $('#page-comments-modal .page').html($('.comments-page-' + node.pageId).clone());
    } else{
      var $div = $('.blueprint-page-comments div.comments-').clone();
      $div.addClass('comments-page-' + node.pageId);
      $div.find('.page-id').html('ID:' + node.uid);
      $div.find('.page-name').html(node.name);
      $div.find('.resolve-unresolve-pages').attr('data-page-id', node.pageId);
      $div.find('textarea').attr('data-commentable-id', node.pageId);
      $('#page-comments-modal .page').append($div);
    };
    $('#page-comments-modal').modal('show');

  })
}

Flowchart.prototype.bindAddLink = function() {
  var _this = this;
  $(document).on('click', '.addLink', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = _this.getNode(tileID);
    if (!(node.bottomLeftNode || node.bottomNode || node.linkNode)) {
      LinkingTileId = node.id;
      $('body').addClass('link-stage-2');
    }else{
      document.setFlash('Not Allowed.')
    }
  })
}

Flowchart.prototype.bindAddLinkTo = function() {
  var _this = this;
  $(document).on('click', '.link-stage-2 .linking-tile', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = _this.getNode(tileID);
    LinkTileToId = node.id;
    $('body').removeClass('link-stage-2');
    _this.link(LinkingTileId, LinkTileToId)
    _this.saveDbChanges();
  })
}

Flowchart.prototype.link = function(node1_id, node2_id) {
  var _this = this;
  var source = SVG.get(node1_id);
  var target = SVG.get(node2_id);
  var sourceNode = _this.getNode(node1_id);
  if (!(sourceNode.bottomLeftNode || sourceNode.bottomNode)) {
    if ((source.x() == target.x()) && (source.y() == target.y())) {
      return
    }
    points = _this.getPoints(source, target)
    var edge = _this.buildConnector(points, "Polyline" + source.id())
    _this.updateNode(source.id(), {linkEdge: edge.id(), linkNode: target.id()})

    LINKS.push({
      id: edge.id(),
      source: source.id(),
      target: target.id()
    })
  };
};

Flowchart.prototype.reLinkAllLinks = function() {
  var _this = this;
  var OldLinks = LINKS;
  LINKS = [];
  for (var i = 0; i < OldLinks.length; i++) {
    SVG.get(OldLinks[i].id).remove();
    _this.link(OldLinks[i].source, OldLinks[i].target)
  };
};

Flowchart.prototype.getPoints = function(source, target) {
  var _this = this;
  var sourceNode = _this.getNode(source.id());
  var targetNode = _this.getNode(target.id());
  var s = this.tileBottomPin(source)
  if (source.x() > target.x()) {
    var t = this.tileRightPin(target)
    if (s.x - t.x < 150) {
      if ((sourceNode.path.slice(0, -sourceNode.path.match(/D*$/)[0].length) || sourceNode.path).substr(-1, 1) == 'R') {
        return [[s.x, s.y - 30], [s.x, s.y + 25], [s.x + 120, s.y + 25], [s.x + 120, t.y], [t.x - 30, t.y]]
      } else{
        t = this.tileLeftPin(target)
        return [[s.x, s.y - 30], [s.x, s.y + 25], [t.x - 25, s.y + 25], [t.x - 25, t.y], [t.x + 30, t.y]]
      };
    } else{
      return [[s.x, s.y - 30], [s.x, s.y + 25], [t.x + 25, s.y + 25], [t.x + 25, t.y], [t.x - 30, t.y]]
    };
  } else{
    var t = this.tileLeftPin(target)
    if (t.x - s.x < 150) {
      if ((sourceNode.path.slice(0, -sourceNode.path.match(/D*$/)[0].length) || sourceNode.path).substr(-1, 1) == 'R') {
        t = this.tileRightPin(target);
        return [[s.x, s.y - 30], [s.x, s.y + 25], [t.x + 25, s.y + 25], [t.x + 25, t.y], [t.x - 30, t.y]]
      }else{
        return [[s.x, s.y - 30], [s.x, s.y + 25], [s.x - 120, s.y + 25], [s.x - 120, t.y], [t.x + 30, t.y]]
      }
    } else{
      return [[s.x, s.y - 30], [s.x, s.y + 25], [t.x - 25, s.y + 25], [t.x - 25, t.y], [t.x + 30, t.y]]
    };
  };
};

Flowchart.prototype.bindOnClickMessage = function() {
  var _this = this;
  $(document).on('click', '.message', function() {
    if (!$('body').hasClass('link-stage-2')) {
      var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
      var tile = SVG.get(tileID);
      var node = _this.getNode(tileID);
      $(this).addClass('hide');
      $(this).closest('.tile').find('.edit-name-field').removeClass('hide').val(node.name).focus();
    };
  })
}

Flowchart.prototype.bindEditMessage = function() {
  var _this = this;
  $(document).on('blur', '.edit-name-field', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = _this.getNode(tileID);
    $(this).addClass('hide');
    if ($(this).val()) {
      _this.updateNode(node.id, {name: $(this).val()});
      _this.saveDbChanges();
    };
    $(this).closest('.tile').find('.message').removeClass('hide').html(_this.formatNodeMessage(node));
  })
}

Flowchart.prototype.bindSelectInitialScreen = function () {
  $(document).on('click', '.initialScreenDropdown', function () {
    $(this).closest('.default-screen-hover-options').addClass('show-dropdown');
    $('.starter-text').addClass('hide');
    $('.add-initial-screen-dropdown').removeClass('hide');
  })
}

Flowchart.prototype.bindSelectScreen = function() {
  $(document).on('click', '.selectScreen', function () {
    $(this).closest('.screen-hover-options').addClass('show-dropdown');
    $(this).closest('div.tile').find('.add-screen-dropdown').removeClass('hide');
  })
}

Flowchart.prototype.bindShowMoreOptions = function() {
  $(document).on('click', '.more', function() {
    var svg = $(this).closest('.screen-tile-container');
    svg.addClass('options-open');
  });
};

Flowchart.prototype.bindHideMoreOptions = function() {
  $(document).on('click', '.close-options', function() {
    var svg = $(this).closest('.screen-tile-container');
    svg.removeClass('options-open');
  });
};

Flowchart.prototype.bindAddInitialScreenEvent = function () {
  var _this = this;
  $(document).on('click', '.addInitialScreen', function() {
    $('.default-screen-hover-options').addClass('hide');
    var midPos = $(window).width()/2 - TILE_WIDTH/2;
    STARTING_TILE = _this.addTile(midPos, 135, null, 1, 'S', "#tile-blueprint-page", $(this).data('page'), $(this).html());
    _this.saveDbChanges();
  });
}

Flowchart.prototype.bindAddInitialActionScreenEvent = function () {
  var _this = this;
  $(document).on('click', '.addInitialAction', function() {
    $('.default-screen-hover-options').addClass('hide');
    var midPos = $(window).width()/2 - TILE_WIDTH/2;
    STARTING_TILE = _this.addTile(midPos, 135, null, 1, 'S', "#tile-blueprint-action", null);
    _this.saveDbChanges();
  });
}

Flowchart.prototype.bindAddInitialDecisionScreensEvent = function () {
  var _this = this;
  $(document).on('click', '.addInitialDecision', function() {
    $('.default-screen-hover-options').addClass('hide');
    var midPos = $(window).width()/2 - TILE_WIDTH/2;
    STARTING_TILE = _this.addTile(midPos, 135, null, 1, 'S', "#tile-blueprint-decision", null);
    var leftTile = _this.addTile(midPos - 150, 270, STARTING_TILE, 2, 'SL', "#tile-blueprint-conclusion", null, 'yes');
    var rightTile = _this.addTile(midPos + 150, 270, STARTING_TILE, 2, 'SR', "#tile-blueprint-conclusion", null, 'no');
    _this.updateNode(STARTING_TILE.id(), {bottomLeftNode: leftTile.id(), bottomRightNode: rightTile.id()})
    _this.resetCanvasSize();
    _this.saveDbChanges();
  });
}

Flowchart.prototype.bindAddDecisionScreensEvent = function() {
  var _this = this;
  $(document).on('click', '.addDecision', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4)
    var tile = SVG.get(tileID);
    var node = _this.getNode(tileID),
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
      _this.updateNode(node.bottomNode, {parentNode: null});
    }else if(node.bottomLeftNode){
      _this.updateNode(node.bottomLeftNode, {parentNode: null});
      _this.updateNode(node.bottomRightNode, {parentNode: null});
    }

    var topTile = _this.addTile(newX, newY, tile, _this.getNode(tile.id()).level + 1, newPath, "#tile-blueprint-decision", null),
        newX1 = topTile.x() - 150,
        newX2 = topTile.x() + 150,
        topNode = _this.getNode(topTile.id());

    var leftTile = _this.addTile(newX1, newY12, topTile, _this.getNode(tile.id()).level + 2, newPath1, "#tile-blueprint-conclusion", null, 'yes'),
        xShift = leftTile.x() - newX1;
    var rightTile = _this.addTile(newX2 + xShift, newY12, topTile, _this.getNode(tile.id()).level + 2, newPath2, "#tile-blueprint-conclusion", null, 'no'),
    leftNode = _this.getNode(leftTile.id()),
    rightNode = _this.getNode(rightTile.id());
    if(node.bottomNode || node.bottomLeftNode){
      _this.updateNode(leftNode.id, nodeData);

      if(node.bottomNode){
        _this.updateNode(node.bottomNode, {parentNode: leftTile.id()});
      }else{
        _this.updateNode(node.bottomLeftNode, {parentNode: leftTile.id()});
        _this.updateNode(node.bottomRightNode, {parentNode: leftTile.id()});
      }
    }
    _this.updateNode(node.id, {bottomNode: topTile.id(), bottomLeftNode: null, bottomRightNode: null, bottomLeftEdge: null, bottomRightEdge: null});
    _this.updateNode(topNode.id, {bottomLeftNode: leftTile.id(), bottomRightNode: rightTile.id()});

    var newGroup = SVG.get(leftTile.id() + "Group");
    tempGroup.each(function(i, e){
      newGroup.add(this);
    })
    _this.moveGroup(leftTile, (xShift/150 - 1), 2, 'DL', 'add', false, leftNode.path);

    _this.resetCanvasSize();
    _this.saveDbChanges();
  })
}

Flowchart.prototype.bindDeleteScreenEvent = function() {
  var _this = this;
  $(document).on('click', '.screen-delete-node', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
    var tile = SVG.get(tileID);
    var node = _this.getNode(tileID);
    var bottomNode = null;
    if(node.parentNode && tile.classes().includes('decisionTile')){
      var leftNode = _this.getNode(node.bottomLeftNode);
      var rightNode = _this.getNode(node.bottomRightNode);
      if (rightNode.bottomNode && leftNode.bottomNode) {
        document.setFlash('To delete this decision point, delete all tiles under one path.' )
      } else {
        if (leftNode.bottomNode){
          var bottomNode = _this.getNode(leftNode.bottomNode);
          var bottomTile = SVG.get(bottomNode.id);
          var position = node.position - leftNode.position;
          var RemovePathValue = 'DL';
        } else if(rightNode.bottomNode) {
          var bottomNode = _this.getNode(rightNode.bottomNode);
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
        _this.removeNode(node.id);
        _this.removeNode(leftNode.id);
        _this.removeNode(rightNode.id);
        if(node.parentNode){
          parentNode = _this.getNode(node.parentNode);
          if(bottomNode){
            SVG.get(bottomNode.topEdge).remove();
            _this.updateNode(bottomTile.id(), {topEdge: parentNode.bottomEdge});
            _this.updateNode(parentNode.id, {bottomNode: bottomTile.id(), bottomEdge: bottomNode.topEdge});
          }else{
            SVG.get(parentNode.bottomEdge).remove();
            _this.updateNode(parentNode.id, {bottomNode: null, bottomEdge: null});
          }
        }
        var group = SVG.get(tile.id() + "Group").removeClass('decisionGroup');
        var leftGroup = SVG.get(node.bottomRightNode + "Group");
        var rightGroup = SVG.get(node.bottomLeftNode + "Group");
        if(bottomNode){
          _this.updateNode(bottomTile.id(), {parentNode: node.parentNode});
          _this.moveTileWithGroup(bottomTile, position, -2, RemovePathValue, 'remove', false);
          _this.validatePositionOf(bottomTile);
        }
      }
    }else if(node.parentNode){

      tile.remove();
      _this.removeNode(node.id);
      $("#" + tile.id() + "Tile").remove();
      if(node.bottomNode){
        var bottomNode = _this.getNode(node.bottomNode);
        var bottomTile = SVG.get(bottomNode.id);
      }
      if(node.parentNode){
        parentNode = _this.getNode(node.parentNode);
        if(bottomNode){
          SVG.get(bottomNode.topEdge).remove();
          _this.updateNode(bottomTile.id(), {topEdge: parentNode.bottomEdge});
          _this.updateNode(parentNode.id, {bottomNode: bottomTile.id()});
        }else{
          SVG.get(parentNode.bottomEdge).remove();
          _this.updateNode(parentNode.id, {bottomNode: null, bottomEdge: null});
        }
      }
      if(bottomNode){
        _this.updateNode(bottomTile.id(), {parentNode: node.parentNode});
        _this.moveTileWithGroup(bottomTile, 0, -1, 'D', 'remove', false);

        _this.validatePositionOf(bottomTile);
      }
    }
    _this.resetCanvasSize();
    _this.saveDbChanges();
  });
}

Flowchart.prototype.bindAddScreenEvent = function() {
  var _this = this;
  $(document).on('click', '.addScreen', function() {
    $('.add-screen-dropdown').addClass('hide');
    _this.addScreenEvent(this, "#tile-blueprint-page");
  })
}

Flowchart.prototype.bindAddActionScreenEvent = function() {
  var _this = this;
  $(document).on('click', '.addAction', function() {
    _this.addScreenEvent(this, "#tile-blueprint-action");
  })
}

Flowchart.prototype.addScreenEvent = function(target, tileSelector) {
  var _this = this;
  var tileID = $(target).closest('.tile')[0].id.slice(0, -4)
  var tile = SVG.get(tileID);
  var node = _this.getNode(tileID),
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
    _this.updateNode(node.bottomNode, {parentNode: null});
  }else if(node.bottomLeftNode){
    _this.updateNode(node.bottomLeftNode, {parentNode: null});
    _this.updateNode(node.bottomRightNode, {parentNode: null});
  }
  if (tileSelector == '#tile-blueprint-page') { name = $(target).html(); };
  var newTile = _this.addTile(newX, newY, tile, _this.getNode(tile.id()).level + 1, newPath, tileSelector, $(target).data('page'), name);

  bottomNode = _this.getNode(newTile.id());
  if(node.bottomNode || node.bottomLeftNode){
    _this.updateNode(bottomNode.id, nodeData)

    if(node.bottomNode){
      _this.updateNode(node.bottomNode, {parentNode: newTile.id()})
    }else{
      _this.updateNode(node.bottomLeftNode, {parentNode: newTile.id()})
      _this.updateNode(node.bottomRightNode, {parentNode: newTile.id()})
    }
  }
  _this.updateNode(node.id, {bottomNode: newTile.id(), bottomLeftEdge: null, bottomRightEdge: null, bottomRightNode: null, bottomLeftNode: null})


  newGroup = SVG.get(newTile.id() + "Group")
  tempGroup.each(function(i, e){
    newGroup.add(this)
  })

  _this.moveGroup(newTile, 0, 1, 'D', 'add', false, bottomNode.path)

  _this.resetCanvasSize();
  _this.saveDbChanges();
}

Flowchart.prototype.moveTile = function(tile, xShift, yShift, AddValueForPath, action) {
  var _this = this;
  var x = tile.x() + (150 * xShift),
      y = tile.y() + (50 + TILE_HEIGHT) * yShift,
      node = _this.getNode(tile.id());
  $("#" + tile.id() + "Tile").css({ left:  x, top: y })
  tile.x(x).y(y);
  currentNode = _this.getNode(tile.id());
  _this.updateNode(tile.id(), { level: currentNode.level + yShift, position: _this.getPosition(tile)});
  if (AddValueForPath) {_this.updateNode(tile.id(), {path: _this.calculatePath(node.path, currentNode.path, AddValueForPath, action)})};
}

Flowchart.prototype.moveGroup = function(tile, xShift, yShift, AddValueForPath, action, istopMostTile, nodePath) {
  var _this = this;
  var moveX = 150 * xShift,
      moveY = (50 + TILE_HEIGHT) * yShift,
      node = _this.getNode(tile.id()),
      children = [];

  var tileGroup = SVG.get(node.id + 'Group');
  tileGroup.each(function(i, e){
    if(this.type != "g") {
      var x = this.x() + moveX;
      var y = this.y() + moveY;
      this.x(x).y(y);
      if(this.type == "rect") {
        $("#" + this.id() + "Tile").css({ top: y, left: x })
        currentNode = _this.getNode(this.id());
        _this.updateNode(this.id(), { level: currentNode.level + yShift, position: _this.getPosition(this)})
        if (AddValueForPath) {_this.updateNode(this.id(), {path: _this.calculatePath(nodePath, currentNode.path, AddValueForPath, action)})};
        children.push(this);
      }
    }
  }, true);

  if(!istopMostTile){
    _this.repositionParentTileOf(tile);
    for (var i = 0; i < children.length; i++) {
      _this.validatePositionOf(children[i])
    };
  }
}

Flowchart.prototype.moveTileWithGroup = function(tile, xShift, yShift, AddValueForPath, action, istopMostTile) {
  var _this = this;
  var nodePath = _this.getNode(tile.id()).path;
  _this.moveTile(tile, xShift, yShift, AddValueForPath, action);
  _this.moveGroup(tile, xShift, yShift, AddValueForPath, action, istopMostTile, nodePath)
}

Flowchart.prototype.repositionParentTileOf = function(tile){
  var _this = this;
  var node = _this.getNode(tile.id());
  if (node.parentNode) {
    var parentTile = SVG.get(node.parentNode),
        parentNode = _this.getNode(node.parentNode);
    if (parentNode.bottomEdge) {
      if( parentNode.position != node.position){
        _this.moveTile(parentTile, node.position - parentNode.position, 0, null)
        _this.reconnectBottomEdges(parentTile)
        _this.updateNode(parentNode.id, {position: _this.getPosition(parentTile)})
        _this.validatePositionOf(parentTile);
        _this.repositionParentTileOf(parentTile);
      }
    }else if(parentNode.bottomRightNode && parentNode.bottomLeftNode){
      var rightTile = SVG.get(parentNode.bottomRightNode);
      var leftTile = SVG.get(parentNode.bottomLeftNode);
      var rightNode = _this.getNode(rightTile.id());
      var leftNode = _this.getNode(leftTile.id());
      var shift = ((rightNode.position - leftNode.position)/2) + leftNode.position  - parentNode.position
      if(shift != 0){
        _this.moveTile(parentTile, shift, 0, null);
        _this.reconnectBottomEdges(parentTile);
        _this.updateNode(parentNode.id, {position: _this.getPosition(parentTile)})
        _this.validatePositionOf(parentTile);
        _this.repositionParentTileOf(parentTile);
      }
    }
  };
}

Flowchart.prototype.validatePositionOf = function(tile){
  var _this = this;
  var node = _this.getNode(tile.id()),
      position = node.position,
      level = node.level,
      xShift = null;
  if(node.parentNode){
    var parentDecisionGroup = SVG.get(node.parentNode).parent('.decisionGroup');
  if(parentDecisionGroup){
      var parentDecisionTile = SVG.get(parentDecisionGroup.id().slice(0,-5))
          parentDecisionNode = _this.getNode(parentDecisionTile.id()),
          parentDecisionNodePath = _this.getNode(parentDecisionTile.id()).path,
          pos = null;
      if(node.path.slice(parentDecisionNodePath.length)[0] == 'L'){
        rightNodePath = parentDecisionNodePath + 'R';
        pos = _this.calculateLeftmostPos(rightNodePath, level);
        if(pos && pos - position < 2){
          xShift =  2 + position - pos;
          var rightTile = SVG.get(parentDecisionNode.bottomRightNode);
        }

      }else{
        leftNodePath = parentDecisionNodePath + 'L';
        pos = _this.calculateRightmostPos(leftNodePath, level);
        if(pos && position - pos < 2){
          xShift = 2 + pos - position;
          var rightTile = SVG.get(parentDecisionNode.bottomRightNode);
        }
      }
    }
    if(xShift){
      _this.moveTileWithGroup(rightTile, xShift, 0, null, null, false);
      _this.validatePositionOf(rightTile);
    }else{
      var oldNode = _this.getNodeFromPosition(level, position, tile.id());

      if(oldNode && oldNode.parentNode != null && _this.getNode(oldNode.parentNode).parentNode != null){
        xShift = (2 - Math.abs(oldNode.position - node.position));
        var commonParentDecisionNode = _this.getNodeByPath(_this.calculateCommonPath(node.path, oldNode.path));
        var rightTile = SVG.get(commonParentDecisionNode.bottomRightNode);
        _this.moveTileWithGroup(rightTile, xShift, 0, null, null, false);
        _this.validatePositionOf(rightTile);
      }
    }
  }
}

Flowchart.prototype.initAddTile = function(id, position, level, parentNodeId, path, node_type, bottomNode, bottomLeftNode, bottomRightNode, name, page) {
  var _this = this;
  var canvas = SVG.get(SVG_CANVAS_ID)
  var x = position * 150;
  var y = level * 175
  var blueprintID = "#tile-blueprint-" + node_type
  var tile = canvas.rect(TILE_WIDTH,TILE_HEIGHT).move(x, y).style('fill', 'transparent').id(id);

  NODES.push({ id: id, uid: page && page.uid, pageId: page && page.id, type: node_type, updated: false, saved: true, topEdge: null, leftEdge: null, rightEdge: null, bottomEdge: null, bottomLeftEdge: null, bottomRightEdge: null, bottomNode: bottomNode, bottomLeftNode: bottomLeftNode, bottomRightNode: bottomRightNode, parentNode: parentNodeId , level: level, position: position, path: path, name: name })

  var group = canvas.group().attr({ id: tile.id() + "Group" })
  if(parentNodeId) {
    var connector = _this.connect(SVG.get(parentNodeId), tile)
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
  if (name) { div.find('.message').html(_this.formatNodeMessage(_this.getNode(id))) };
  if (page) {


    div.find('.uid').html("ID:" + (_this.formatUID(page.uid) || 'xxx'))
    div.find('.screen-tile-right-icon').addClass(page.page_type.icon_name)

  };

  div[0].id = tile.id() + "Tile";

  $('#tile-container').append(div)
  return tile
}

Flowchart.prototype.addTile = function(x, y, parentTile, level, path, blueprintID, page, name) {
  var _this = this;
  var canvas = SVG.get(SVG_CANVAS_ID)
  var position = _this.formatPosition(x/150);
  ID = ID + 1;
  var tile = canvas.rect(TILE_WIDTH,TILE_HEIGHT).move(x, y).style('fill', 'transparent').id('Tile' + (ID));

  NODES.push({ id: tile.id(), uid: page && page.uid, pageId: page && page.id, pageTypeId: page && page.page_type_id, name: name || blueprintID.match(/.*-(.*)/)[1], type: blueprintID.match(/.*-(.*)/)[1], updated: false, saved: false, topEdge: null, leftEdge: null, rightEdge: null, bottomEdge: null, bottomLeftEdge: null, bottomRightEdge: null, bottomNode: null, bottomLeftNode: null, bottomRightNode: null, parentNode: parentTile && parentTile.id(), level: level, position: _this.getPosition(tile), path: path })
  var group = canvas.group().attr({ id: tile.id() + "Group" })

  if (blueprintID == '#tile-blueprint-decision') {
    tile.addClass('decisionTile');
    group.addClass('decisionGroup');
  };
  if(parentTile) {
    var connector = _this.connect(parentTile, tile)

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
  if (name) { div.find('.message').html(_this.formatNodeMessage(_this.getNode(tile.id()))) };
  if (page) {
    div.find('.screen-tile-right-icon').addClass(page.page_type.icon_name)

    div.find('.uid').html("ID:" + (_this.formatUID(page.uid) || 'xxx'))
  };
  $('#tile-container').append(div)
  if (page && page.id) { $('li.page-id-' + page.id).remove()};

  _this.validatePositionOf(tile);
  return tile
}

Flowchart.prototype.resetCanvasSize = function() {

  var _this = this;
  var startNodePos = this.getNode(STARTING_TILE.id()).position;
  var maxPos = _this.calculateMAxPosAndLevel()[0],
      maxLevel = _this.calculateMAxPosAndLevel()[1];
  var width = ((maxPos + 2) * 150 + TILE_WIDTH) + 'px';
  var height = (maxLevel + 2) * (TILE_HEIGHT + 50) + 'px';
  SVG.get(SVG_CANVAS_ID).width(width).height(height);
  var minPos = _this.calculateMinPos();
  var midPos = _this.formatPosition(($(window).width()/2 - TILE_WIDTH/2)/150);
  if(minPos < 1){
    _this.moveTileWithGroup(STARTING_TILE, 1 - minPos, 0, null, null, true)
  }else if(startNodePos > midPos && startNodePos - midPos > 0.1){
    _this.moveTileWithGroup(STARTING_TILE, -(Math.min.apply(this, [minPos - 1, startNodePos - midPos])), 0, null, null, true)
  }
}

Flowchart.prototype.saveDbChanges = function() {
  var _this = this;
  $.ajax({
    type: 'post',
    url: location.href + '/crud_screens',
    data: {updated_nodes: _this.getUpdatedNodes(), new_nodes: _this.getNewNodes(), deleted_nodes: DELETED_NODE_IDS },
    dataType: 'json',
    error: function(result) {
      document.setFlash(result.responseText)
    },
    success: function(result) {
      if (result['updated_screens']) {
        for (var i = 0; i < result['updated_screens'].length; i++) {
          _this.updateNode(result['updated_screens'][i].node_id, {updated: false})
        };
      };
      if (result['saved_screens']) {
        for (var i = 0; i < result['saved_screens'].length; i++) {
          _this.updateNode(result['saved_screens'][i].node_id, {saved: true})
          if (result['saved_screens'][i].node_type == 'page') {
            $('#' + result['saved_screens'][i].node_id + 'Tile').find('.uid').html("ID:" + _this.formatUID(result['saved_screens'][i].page.uid))
            _this.updateNode(result['saved_screens'][i].node_id, {uid: result['saved_screens'][i].page.uid, pageId: result['saved_screens'][i].page.id})
          };
        };
      }
    }
  });
  _this.reLinkAllLinks();
}

Flowchart.prototype.reconnectBottomEdges = function(tile) {
  var _this = this;
  var node = _this.getNode(tile.id());
  if (node.bottomEdge) {
    var bottomTile = SVG.get(node.bottomNode);
    var bottomEdge = _this.getEdge(node.bottomEdge);
    SVG.get(bottomEdge.id).remove();
    var connector = _this.connect(tile, bottomTile);
    SVG.get(tile.id() + "Group").add(connector);
  } else {
    var bottomLeftEdge = _this.getEdge(node.bottomLeftEdge);
    var bottomRightEdge = _this.getEdge(node.bottomRightEdge);
    var rightTile = SVG.get(node.bottomRightNode);
    var leftTile = SVG.get(node.bottomLeftNode);
    SVG.get(bottomLeftEdge.id).remove();
    SVG.get(bottomRightEdge.id).remove();
    var connector1 = _this.connect(tile, leftTile);
    var connector2 = _this.connect(tile, rightTile);
    SVG.get(tile.id() + "Group").add(connector1).add(connector2);
  };
}

Flowchart.prototype.connect = function(source, target) {
  var _this = this;
  if ((source.x() == target.x()) && (source.y() == target.y())) {
    return
  }

  if (source.x() == target.x()) {
    if(source.y() < target.y()) {
      var s = _this.tileBottomPin(source)
      var t = _this.tileTopPin(target)

      var edge = _this.buildConnector([[s.x, s.y - 30], [t.x, t.y]], "Polyline" + source.id())
      _this.updateNode(target.id(), {topEdge: edge.id()})
      _this.updateNode(source.id(), {bottomEdge: edge.id()})
    } else {
      var s = _this.tileBottomPin(target)
      var t = _this.tileTopPin(source)

      var edge = _this.buildConnector([[s.x, s.y - 30], [t.x, t.y]], "Polyline" + source.id())

      _this.updateNode(source.id(), {topEdge: edge.id()})
      _this.updateNode(target.id(), {bottomEdge: edge.id()})
    }
  } else if (source.y() == target.y()) {
    if(source.x() < target.x()) {
      var s = _this.tileRightPin(source)
      var t = _this.tileLeftPin(target)

      var edge = _this.buildConnector([[s.x, s.y], [t.x, t.y]], "Polyline" + source.id())

      _this.updateNode(target.id(), {leftEdge: edge.id()})
      _this.updateNode(source.id(), {rightEdge: edge.id()})
    } else {
      var s = _this.tileRightPin(target)
      var t = _this.tileLeftPin(source)

      var edge = _this.buildConnector([[s.x, s.y], [t.x, t.y]], "Polyline" + source.id())

      _this.updateNode(source.id(), {leftEdge: edge.id()})
      _this.updateNode(target.id(), {rightEdge: edge.id()})
    }
  } else {
    if(source.y() < target.y()) {
      var polyline_pos = source.x() > target.x() ? 'PolylineLeft' : 'PolylineRight'
      var s = _this.tileBottomPin(source)
      var t = _this.tileTopPin(target)

      var edge = _this.buildConnector([[s.x, s.y], [s.x, s.y + 35], [t.x, s.y + 35], [t.x, t.y + 20]], polyline_pos + source.id())

      _this.updateNode(target.id(), {topEdge: edge.id()})
      source.x() > target.x() ? _this.updateNode(source.id(), {bottomLeftEdge: edge.id()}) : _this.updateNode(source.id(), {bottomRightEdge: edge.id()})
    } else {
    var polyline_pos = target.x() > source.x() ? 'PolylineLeft' : 'PolylineRight'
     var s = _this.tileBottomPin(target)
     var t = _this.tileTopPin(source)

     var edge = _this.buildConnector([[s.x, s.y], [s.x, s.y + 35], [t.x, s.y + 35], [t.x, t.y + 20]], polyline_pos + source.id())

     _this.updateNode(source.id(), {topEdge: edge.id()})
      target.x() > source.x() ? _this.updateNode(target.id(), {bottomLeftEdge: edge.id()}) : _this.updateNode(source.id(), {bottomRightEdge: edge.id()})
    }
  }

  EDGES.push({
    id: edge.id(),
    source: source.id(),
    target: target.id()
  })

  return edge
}

Flowchart.prototype.buildConnector = function(points, id) {
  var _this = this;
  return SVG.get(SVG_CANVAS_ID)
            .polyline(points)
            .fill('none')
            .stroke({ width: 1, color: '#cccccc' })
}

Flowchart.prototype.formatUID = function(uid) {
  if (uid && (uid + '').length < 3) {
    return uid = ('000' + uid).slice(-3)
  };
};

Flowchart.prototype.calculatePath = function(nodePath, path, addValue, action) {
  if(action == 'add'){
    return nodePath.slice(0,-addValue.length) + addValue + path.slice(nodePath.slice(0,-addValue.length).length)
  }else if(action == 'remove'){
    return nodePath.slice(0, -addValue.length) + path.slice(nodePath.length)
  }else{
    return path
  }
}

Flowchart.prototype.calculateMAxPosAndLevel = function() {
  var maxPos = Math.max.apply(this, NODES.map(function(o){return o.position;}))
  var maxLevel = Math.max.apply(this, NODES.map(function(o){return o.level;}))
  return [maxPos, maxLevel]
}

Flowchart.prototype.calculateMinPos = function() {
  return Math.min.apply(this, NODES.map(function(o){return o.position;}))
}

Flowchart.prototype.calculateCommonPath = function (path1, path2) {
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

Flowchart.prototype.tileLeftPin = function(tile) {
  x = tile.x()
  y = (tile.y() + (TILE_HEIGHT / 2))

  return { x: x, y: y }
}

Flowchart.prototype.tileRightPin = function(tile) {
  x = (tile.x() + TILE_WIDTH)
  y = (tile.y() + (TILE_HEIGHT / 2))

  return { x: x, y: y }
}

Flowchart.prototype.tileTopPin = function(tile) {
  x = (tile.x() + (TILE_WIDTH / 2))
  y = tile.y()

  return { x: x, y: y }
}

Flowchart.prototype.tileBottomPin = function(tile) {
  x = (tile.x() + (TILE_WIDTH / 2))
  y = (tile.y() + TILE_HEIGHT)

  return { x: x, y: y }
}

Flowchart.prototype.getPosition = function (tile) {
  return parseFloat((tile.x()/150).toFixed(2));
}

Flowchart.prototype.formatPosition = function (pos) {
  return parseFloat(pos.toFixed(2));
}

Flowchart.prototype.calculateMaxId = function() {
  var regex = /\d+$/g;
  var ids = NODES.map(function(node) { return node.id.match(regex)[0] })
  return Math.max.apply(this, ids)
}

Flowchart.prototype.calculateRightmostPos = function(leftNodePath, level) {
  var nodes = NODES.filter(function(node, idx){
    return node.level == level && node.path.startsWith(leftNodePath)
  })
  if(nodes.length > 0){
    return Math.max.apply(this, nodes.map(function(o){return o.position;}))
  }
}

Flowchart.prototype.calculateLeftmostPos = function(rightNodePath, level) {
  var nodes = NODES.filter(function(node, idx){
    return node.level == level && node.path.startsWith(rightNodePath)
  })
  if(nodes.length > 0){
    return Math.min.apply(this, nodes.map(function(o){return o.position;}))
  }
}

Flowchart.prototype.removeNode = function(nodeID) {
  DELETED_NODE_IDS.push(nodeID)
  NODES = NODES.filter(function(node, idx){
    return node.id != nodeID
  })
}

Flowchart.prototype.getNode = function(nodeID) {
  return NODES.filter(function(node, idx){
    return node.id == nodeID
  })[0]
}

Flowchart.prototype.getNodeByPath = function(path) {
  return NODES.filter(function(node, idx){
    return node.path == path
  })[0]
}

Flowchart.prototype.getEdge = function(edgeID) {
  return EDGES.filter(function(edge, idx){
    return edge.id == edgeID
  })[0]
}

Flowchart.prototype.getNodeFromPosition = function(level, position, id) {
  return NODES.filter(function(node, idx){
    return node.level == level && node.id != id && (Math.abs(node.position - position) < 1.9)
  })[0]
}

Flowchart.prototype.updateNode = function(nodeID, props) {
  var _this = this;
  if (_this.containsAny(Object.keys(props), ['level', 'position', 'path', 'parentNode', 'name', 'linkNode'])){
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

Flowchart.prototype.containsAny = function(source, target){
    var result = source.filter(function(item){ return target.indexOf(item) > -1});
    return (result.length > 0);
}

Flowchart.prototype.getUpdatedNodes = function() {
  return NODES.filter(function(node, idx){
    return node.updated && node.saved
  })
}

Flowchart.prototype.getNewNodes = function() {
  return NODES.filter(function(node, idx){
    return !node.saved
  })
}

Flowchart.prototype.getConnectingNodesEdge = function(edgeID) {
  return EDGES.filter(function(edge, idx){
    return edge.id == edgeID
  })[0]
}

Flowchart.prototype.formatNodeMessage = function (node) {
  if (node.type == 'conclusion') {
    return node.name.length > 37 ? node.name.slice(0, 37) + '..' : node.name
  } else{
    return node.name.length > 50 ? node.name.slice(0, 50) + '..' : node.name
  };
}

$(function(){
  var flowChart = new Flowchart();
  flowChart.init();
  flowChart.bindEvents();
})
