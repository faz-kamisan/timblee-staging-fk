function fitText(el) {
  var zoom = el.dataset['zoom'];
  var width = el.dataset['width'];
  var height = parseInt(getComputedStyle(el).height) * zoom;

  return style = '#'+ el.id +' .level-0{  width: '+ width + 'px;  transform: scale('+ zoom +');  -webkit-transform: scale('+ zoom +');  -moz-transform: scale('+ zoom +');  -webkit-transform-origin: 0 0;}'
}

function fittextFooter() {
  var el = document.getElementsByClassName('scrollable-div-footer')[0];
  if (el) {
    var zoom = el.dataset['zoom'];
    var width = el.dataset['width'];
    return style ='.scrollable-div-footer .sitemap-footer{  width: '+ width + 'px;  transform: scale('+ zoom +');  -webkit-transform: scale('+ zoom +');  -moz-transform: scale('+ zoom +');  -webkit-transform-origin: 0 0;}'
  };
}

function adjustPageHeight(){
  var elements = document.getElementsByClassName('level-0');

  for (var i=0; i < elements.length; i++) {
    var el = elements[i]

    var height = el.offsetHeight
    var zoom = el.dataset['zoom']

    el.style.height = (height * zoom) + 'px';
  }

}

function centerPageTiles(){
  var parents = document.getElementsByClassName('level-0')

  for (i=0; i < parents.length; i++) {
    var odd_root = parents[i].querySelector(".level-0 > .odd-tree")
    var even_root = parents[i].querySelector(".level-0 > .even-tree")
    var parent = parents[i].getElementsByClassName('parent-0')[0];
    var offset = 0;

    if(odd_root) {
      var middle = parseInt(parent.children.length / 2)
      var child = parent.children[middle]

      offset = odd_root.offsetLeft - child.offsetLeft
    } else {
      var middle = (parent.children.length / 2) - 1
      var child = parent.children[middle]

      offset = even_root.offsetLeft - (child.offsetLeft + (child.offsetWidth / 2))
    }

    parent.style.paddingLeft = offset + "px"
  }
}

function appendStyle() {
  var body = document.getElementById('body');
  var parents = document.getElementsByClassName('parent');
  var css = document.createElement('style');
  css.type = 'text/css';
  var styles = 'body{ background-color: #ffffff }';

  for (var i = 0; i < parents.length; i++) {
    var left = -9;
    var parent_class = parents[i].getAttribute('class').match('parent-id-.*')[0];
    styles += "."+ parent_class +" .tile-top:before{ height: "+(parseInt(getComputedStyle(parents[i].parentElement).height)-220)+"px; left: "+ left +"px; }";
  };
  styles += '.hide-before, .child-page:last-child > .page-container-wrapper > .page-container > .parent-2 > .child-page:before, .child-page:last-child > .page-container > .parent-2 > .child-page:before, .child-page:last-child > .page-container-wrapper > .page-container > .parent-3 > .child-page:before, .child-page:last-child > .page-container > .parent-3 > .child-page:before, .child-page:last-child > .page-container-wrapper > .page-container > .parent-4 > .child-page:before, .child-page:last-child > .page-container > .parent-4 > .child-page:before, .child-page:last-child > .page-container-wrapper > .page-container > .parent-5 > .child-page:before, .child-page:last-child > .page-container > .parent-5 > .child-page:before { background:  #ffffff; content: " "; height: 100%; position: absolute; top: -94px; width: 5px; }'

  styles += '.child-page:last-child { position: relative; z-index: 10; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-2 > .child-page:before, .child-page:last-child > .page-container > .parent-2 > .child-page:before { left: 9px; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-3 > .child-page:before, .child-page:last-child > .page-container > .parent-3 > .child-page:before { left: 27px; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-4 > .child-page:before, .child-page:last-child > .page-container > .parent-4 > .child-page:before { left: 45px; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-5 > .child-page:before, .child-page:last-child > .page-container > .parent-5 > .child-page:before { left: 63px; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-6 > .child-page:before, .child-page:last-child > .page-container > .parent-6 > .child-page:before { display: none; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-7 > .child-page:before, .child-page:last-child > .page-container > .parent-7 > .child-page:before { display: none; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-8 > .child-page:before, .child-page:last-child > .page-container > .parent-8 > .child-page:before { display: none; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-9 > .child-page:before, .child-page:last-child > .page-container > .parent-9 > .child-page:before { display: none; }'

    var section =document.getElementsByClassName('section-container-wrapper');
    for (var i = 0; i < section.length; i++) {
      styles += fitText(section[i]);
    };
    styles += fittextFooter();
    styles += '.fittext{font-size: 12px;}';
    styles += '.tile-number, .tile-name{ font-size: 10px; }';
    styles += '.section-tag, .tile-id{ font-size: 8px; }';

  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
}

window.onload = function() {
  appendStyle();
  adjustPageHeight();
  centerPageTiles();
};
