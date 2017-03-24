  COUNT = 0

SVG_CANVAS_ID = null
TILE_WIDTH = 182
TILE_HEIGHT = 85
var MinPos = 2

NODES = []
EDGES = []

function init() {
  var svg = SVG('flow-chart')

  SVG_CANVAS_ID = svg.id()

  rect1 = addTile(300, 50, null, 0, 'S')


  svg.group().attr({ id: "tempGroup" })
}

function bindEvents() {
  bindAddScreenEvent();
  bindAddDecisionEvent();
  bindDeleteTileEvent();
}

function bindAddScreenEvent() {
  $(document).on('click', '.addScreen', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4)
    var tile = SVG.get(tileID);
    var node = getNode(tileID),
    nodeData = {bottomLeftNode: node.bottomLeftNode, bottomRightNode: node.bottomRightNode, bottomNode: node.bottomNode, bottomEdge: node.bottomEdge, bottomLeftEdge: node.bottomLeftEdge, bottomRightEdge: node.bottomRightEdge},

    newX = tile.x(),
    newY = tile.y() + TILE_HEIGHT + 50,
    newPath = node.path + 'D';

    tempGroup = SVG.get("tempGroup")

    oldGroup = SVG.get(tile.id() + "Group")
    oldGroup.each(function(i, e){
      tempGroup.add(this)
    })

    if(node.bottomNode){
      updateNode(node.bottomNode, {parentNode: null})
    }else if(node.bottomLeftNode){
      updateNode(node.bottomLeftNode, {parentNode: null})
      updateNode(node.bottomRightNode, {parentNode: null})
    }

    var newTile = addTile(newX, newY, tile, getNode(tile.id()).level + 1, newPath);

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

    newGroup.each(function(i, e){
      if(this.type != "g") {
        x2 = this.x()
        y2 = this.y() + 50 + TILE_HEIGHT

        this.x(x2).y(y2)

        if(this.type == "rect") {
          $("#" + this.id() + "Tile").css({ top: y2, left: x2 });
          updateNode(this.id(), {level: getNode(this.id()).level + 1, path: calculatePath(node.path, getNode(this.id()).path, 'D')})
        }
      }
    }, true)

    var maxPos = calculateMAxPosAndLevel()[0],
        maxLevel = calculateMAxPosAndLevel()[1];
    var width = (maxPos * 150 + TILE_WIDTH + 100) + 'px';
    var height = (maxLevel * (TILE_HEIGHT + 50) + 100) + 'px'
    SVG.get(SVG_CANVAS_ID).width(width).height(height);
  })
}


function bindAddDecisionEvent() {
  $(document).on('click', '.addDecision', function() {
    var tileID = $(this).closest('.tile')[0].id.slice(0, -4)
    var tile = SVG.get(tileID);
    var node = getNode(tileID),
    nodeData = {bottomLeftNode: node.bottomLeftNode, bottomRightNode: node.bottomRightNode, bottomNode: node.bottomNode, bottomEdge: node.bottomEdge, bottomLeftEdge: node.bottomLeftEdge, bottomRightEdge: node.bottomRightEdge},
    newX1 = tile.x() - 150,
    newX2 = tile.x() + 150,
    newY = tile.y() + TILE_HEIGHT + 50,
    newPath1 = node.path + 'L',
    newPath2 = node.path + 'R';

    tempGroup = SVG.get("tempGroup")

    oldGroup = SVG.get(tile.id() + "Group")
    oldGroup.addClass('decisionGroup').each(function(i, e){
      tempGroup.add(this)
    })

    if(node.bottomNode){
      updateNode(node.bottomNode, {parentNode: null})
    }else if(node.bottomLeftNode){
      updateNode(node.bottomLeftNode, {parentNode: null})
      updateNode(node.bottomRightNode, {parentNode: null})
    }

    var newTile1 = addTile(newX1, newY, tile, getNode(tile.id()).level + 1, newPath1).addClass('leftTile'),
    shift = newTile1.x() - newX1,
    newTile2 = addTile(newX2 + shift, newY, tile, getNode(tile.id()).level + 1, newPath2).addClass('rightTile'),
    leftNode = getNode(newTile1.id()),
    rightNode = getNode(newTile2.id());
    if(node.bottomNode || node.bottomLeftNode){
      updateNode(leftNode.id, nodeData);

      if(node.bottomNode){
        updateNode(node.bottomNode, {parentNode: newTile1.id()})
      }else{
        updateNode(node.bottomLeftNode, {parentNode: newTile1.id()})
        updateNode(node.bottomRightNode, {parentNode: newTile1.id()})
      }
    }
    updateNode(node.id, {bottomLeftNode: newTile1.id(), bottomRightNode: newTile2.id(), bottomEdge: null, bottomNode: null})

    newGroup = SVG.get(newTile1.id() + "Group")
    tempGroup.each(function(i, e){
      newGroup.add(this)
    })
    newGroup.each(function(i, e){

      if(this.type != "g") {
        x2 = this.x() - 150 + shift
        y2 = this.y() + 50 + TILE_HEIGHT

        this.x(x2).y(y2);

        if(this.type == "rect") {
          $("#" + this.id() + "Tile").css({ top: y2, left: x2 })
          currentNode = getNode(this.id());
          updateNode(this.id(), {level: currentNode.level + 1, position: getPosition(this), path: calculatePath(node.path, currentNode.path, 'L')})
          MinPos = Math.min(MinPos, getPosition(this))
        }
      }
    }, true)

    var maxPos = calculateMAxPosAndLevel()[0],
        maxLevel = calculateMAxPosAndLevel()[1];
    var width = (maxPos * 150 + TILE_WIDTH + 100) + 'px';
    var height = (maxLevel * (TILE_HEIGHT + 50) + 200) + 'px'
    SVG.get(SVG_CANVAS_ID).width(width).height(height);

    MinPos = Math.min(MinPos, getPosition(newTile1));
    if(MinPos < 1){
      moveTileWithGroup(rect1, 1 - MinPos, true)
      MinPos = 1;
    }
  })
}

function moveTile(tile, shift) {
  var moveBy = 150 * shift;
  $("#" + tile.id() + "Tile").css({ left: tile.x() + moveBy })
  tile.x(tile.x() + moveBy);
  updateNode(tile.id(), { position: getPosition(tile)});
}


function moveTileWithGroup (tile, shift, istopMostTile=false) {
  var moveBy = 150 * shift,
      node = getNode(tile.id()),
      children = [];
  moveTile(tile, shift);

  var tileGroup = SVG.get(node.id + 'Group');
  tileGroup.each(function(i, e){
    if(this.type != "g") {
      var x = this.x() + moveBy;
      this.x(x);
      if(this.type == "rect") {
        $("#" + this.id() + "Tile").css({ left: x })
        updateNode(this.id(), { position: getPosition(this)})
        children.push(this);
      }
    }
  }, true);

  if(!istopMostTile){
    reconstructParent(tile);
    for (var i = 0; i < children.length; i++) {
      reconstruct(children[i])
    };
  }
}

function reconstructParent (tile) {
  var node = getNode(tile.id());
  if (node.parentNode) {
    var parentTile = SVG.get(node.parentNode),
        parentNode = getNode(node.parentNode);
    if (parentNode.bottomEdge) {
      if( parentNode.position != node.position){
        moveTile(parentTile, node.position - parentNode.position)
        var bottomEdge = getEdge(parentNode.bottomEdge);
        SVG.get(bottomEdge.id).remove();
        var connector = connect(parentTile, tile);
        SVG.get(parentTile.id() + "Group").add(connector);
        updateNode(parentNode.id, {position: getPosition(parentTile)})
        reconstruct(parentTile)
        reconstructParent(parentTile);
      }
    }else{
      var bottomLeftEdge = getEdge(parentNode.bottomLeftEdge);
      var bottomRightEdge = getEdge(parentNode.bottomRightEdge);
      var rightTile = SVG.get(parentNode.bottomRightNode);
      var leftTile = SVG.get(parentNode.bottomLeftNode);
      var rightNode = getNode(rightTile.id());
      var leftNode = getNode(leftTile.id());
      var shift = ((rightNode.position - leftNode.position)/2) + leftNode.position  - parentNode.position
      if(shift != 0){
        moveTile(parentTile, shift);
        SVG.get(bottomLeftEdge.id).remove();
        SVG.get(bottomRightEdge.id).remove();
        var connector1 = connect(parentTile, leftTile);
        var connector2 = connect(parentTile, rightTile);
        SVG.get(parentTile.id() + "Group").add(connector1).add(connector2);
        updateNode(parentNode.id, {position: getPosition(parentTile)})
        reconstruct(parentTile)
        reconstructParent(parentTile);
      }
    }
  };
}

function reconstruct (tile) {
  var node = getNode(tile.id()),
      position = node.position,
      level = node.level,
      shift = null;
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
          shift =  2 + position - pos;
          var rightTile = SVG.get(parentDecisionNode.bottomRightNode);
        }

      }else{
        leftNodePath = parentDecisionNodePath + 'L';
        pos = calculateRightmostPos(leftNodePath, level);
        if(pos && position - pos < 2){
          shift = 2 + pos - position;
          var rightTile = SVG.get(parentDecisionNode.bottomRightNode);
        }
      }
    }
    if(shift){
      moveTileWithGroup(rightTile, shift);
      reconstruct(rightTile)
    }else{
      var oldNode = getNodeFromPosition(level, position, tile.id());
      if(oldNode && oldNode.parentNode != null){
        shift = (2 - Math.abs(oldNode.position - node.position));
        var commonParentDecisionNode = getNodeByPath(calculateCommonPath(node.path, oldNode.path));
        var rightTile = SVG.get(commonParentDecisionNode.bottomRightNode);
        moveTileWithGroup(rightTile, shift);
        reconstruct(rightTile)
      }
    }
  }
}

function bindDeleteTileEvent () {
  // $(document).on('click', '.more', function() {
  //   var tileID = $(this).closest('.tile')[0].id.slice(0, -4);
  //   var tile = SVG.get(tileID);
  //   var node = getNode(tileID);
  //   if (node.parentNode && !(tile.classes()[0] && (tile.classes().includes('rightTile') || tile.classes().includes('leftTile')) && (node.bottomLeftNode || node.bottomNode))){
  //     var parentNode = getNode(node.parentNode),
  //         parentTile = SVG.get(parentNode.id)
  //     if(tile.classes()[0] && tile.classes().includes('rightTile')){
  //       leftNode = getNode(parentNode.bottomLeftNode)
  //       leftTile = SVG.get(leftNode.id)
  //       tile.remove();
  //       $("#" + tile.id() + "Tile").remove();
  //       SVG.get(node.topEdge).remove();
  //       SVG.get(leftNode.topEdge).remove();
  //       updateNode(parentNode.id, {bottomLeftNode: null, bottomRightNode: null, bottomNode: leftNode.id, bottomLeftEdge: null, bottomRightEdge: null, bottomEdge: node.topEdge})
  //       moveTileWithGroup(leftTile, (parentNode.position - leftNode.position))
  //       connector = connect(parentTile, leftTile);
  //       SVG.get(parentTile.id() + "Group").add(connector);
  //     }
  //   }
  // })

}

function addTile(x, y, parentTile, level, path) {
  var canvas = SVG.get(SVG_CANVAS_ID)

  var tile = canvas.rect(TILE_WIDTH,TILE_HEIGHT).move(x, y).style('fill', 'transparent');
  var position = x/150;

  NODES.push({ id: tile.id(), topEdge: null, leftEdge: null, rightEdge: null, bottomEdge: null, bottomLeftEdge: null, bottomRightEdge: null, bottomNode: null, bottomLeftNode: null, bottomRightNode: null, parentNode: parentTile && parentTile.id(), level: level, position: getPosition(tile), path: path })
  var group = canvas.group().attr({ id: tile.id() + "Group" })

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

  div = $("#tile-blueprint").clone()
                            .css(cssProps);

  div[0].id = tile.id() + "Tile"

  $('#tile-container').append(div)

  reconstruct(tile);
  return tile
}

function connect(source, target) {
  if ((source.x() == target.x()) && (source.y() == target.y())) {
    return
  }

  if (source.x() == target.x()) {
    if(source.y() < target.y()) {
      var s = tileBottomPin(source)
      var t = tileTopPin(target)

      var edge = buildConnector([[s.x, s.y], [t.x, t.y]], "Polyline" + source.id())

      updateNode(target, {topEdge: edge.id()})
      updateNode(source, {bottomEdge: edge.id()})
    } else {
      var s = tileBottomPin(target)
      var t = tileTopPin(source)

      var edge = buildConnector([[s.x, s.y], [t.x, t.y]], "Polyline" + source.id())

      updateNode(source, {topEdge: edge.id()})
      updateNode(target, {bottomEdge: edge.id()})
    }
  } else if (source.y() == target.y()) {
    if(source.x() < target.x()) {
      var s = tileRightPin(source)
      var t = tileLeftPin(target)

      var edge = buildConnector([[s.x, s.y], [t.x, t.y]], "Polyline" + source.id())

      updateNode(target, {leftEdge: edge.id()})
      updateNode(source, {rightEdge: edge.id()})
    } else {
      var s = tileRightPin(target)
      var t = tileLeftPin(source)

      var edge = buildConnector([[s.x, s.y], [t.x, t.y]], "Polyline" + source.id())

      updateNode(source, {leftEdge: edge.id()})
      updateNode(target, {rightEdge: edge.id()})
    }
  } else {
    if(source.y() < target.y()) {
      var polyline_pos = source.x() > target.x() ? 'PolylineLeft' : 'PolylineRight'
      var s = tileBottomPin(source)
      var t = tileTopPin(target)

      var edge = buildConnector([[s.x, s.y], [s.x, s.y + 25], [t.x, s.y + 25], [t.x, t.y]], polyline_pos + source.id())

      updateNode(target, {topEdge: edge.id()})
      source.x() > target.x() ? updateNode(source, {bottomLeftEdge: edge.id()}) : updateNode(source, {bottomRightEdge: edge.id()})
    } else {
    var polyline_pos = target.x() > source.x() ? 'PolylineLeft' : 'PolylineRight'
     var s = tileBottomPin(target)
     var t = tileTopPin(source)

     var edge = buildConnector([[s.x, s.y], [s.x, s.y + 25], [t.x, s.y + 25], [t.x, t.y]], polyline_pos + source.id())

     updateNode(source, {topEdge: edge.id()})
      target.x() > source.x() ? updateNode(target, {bottomLeftEdge: edge.id()}) : updateNode(source, {bottomRightEdge: edge.id()})
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

function calculatePath (nodePath, path, addValue) {
  commonPath = nodePath == path ? path : calculateCommonPath(nodePath, path)
  return commonPath + addValue + path.slice(commonPath.length)
}

function calculateMAxPosAndLevel() {
  var maxPos = Math.max.apply(this, NODES.map(function(o){return o.position;}))
  var maxLevel = Math.max.apply(this, NODES.map(function(o){return o.level;}))
  return [maxPos, maxLevel]
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
  NODES = NODES.map(function(node, idx){
    if (node.id == nodeID) {
      return Object.assign(node, props)
    } else {
      return node
    }
  })
}

function getConnectingNodesEdge(edgeID) {
  return EDGES.filter(function(edge, idx){
    return edge.id == edgeID
  })[0]
}

$(function(){
  init()
  bindEvents()
})
