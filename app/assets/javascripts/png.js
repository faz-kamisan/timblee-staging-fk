
function appendStyle() {
  var body = document.getElementById('body');
  var parents = document.getElementsByClassName('parent');
  var css = document.createElement('style');
  css.type = 'text/css';
  var styles = 'body{ background-color: #ffffff }';

  for (var i = 0; i < parents.length; i++) {
    var left = -9;
    var parent_class = parents[i].getAttribute('class').match('parent-id-.*')[0];
    styles += "."+ parent_class +" .tile-top:before{ height: "+(parseInt(getComputedStyle(parents[i].parentElement).height)-219)+"px; left: "+ left +"px; }";
  };
  styles += '.hide-before, .child-page:last-child > .page-container-wrapper > .page-container > .parent-2 > .child-page:before, .child-page:last-child > .page-container > .parent-2 > .child-page:before, .child-page:last-child > .page-container-wrapper > .page-container > .parent-3 > .child-page:before, .child-page:last-child > .page-container > .parent-3 > .child-page:before, .child-page:last-child > .page-container-wrapper > .page-container > .parent-4 > .child-page:before, .child-page:last-child > .page-container > .parent-4 > .child-page:before, .child-page:last-child > .page-container-wrapper > .page-container > .parent-5 > .child-page:before, .child-page:last-child > .page-container > .parent-5 > .child-page:before { background:  #ffffff; content: " "; height: 100%; position: absolute; top: -94px; width: 7px; }'

  styles += '.child-page:last-child { position: relative; z-index: 10; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-2 > .child-page:before, .child-page:last-child > .page-container > .parent-2 > .child-page:before { left: 9px; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-3 > .child-page:before, .child-page:last-child > .page-container > .parent-3 > .child-page:before { left: 27px; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-4 > .child-page:before, .child-page:last-child > .page-container > .parent-4 > .child-page:before { left: 45px; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-5 > .child-page:before, .child-page:last-child > .page-container > .parent-5 > .child-page:before { left: 63px; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-6 > .child-page:before, .child-page:last-child > .page-container > .parent-6 > .child-page:before { display: none; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-7 > .child-page:before, .child-page:last-child > .page-container > .parent-7 > .child-page:before { display: none; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-8 > .child-page:before, .child-page:last-child > .page-container > .parent-8 > .child-page:before { display: none; }'

  styles += '.child-page:last-child > .page-container-wrapper > .page-container > .parent-9 > .child-page:before, .child-page:last-child > .page-container > .parent-9 > .child-page:before { display: none; }'

  styles += '.fittext{font-size: 12px;}';
  styles += '.tile-number, .tile-name{ font-size: 10px; }';
  styles += '.section-tag, .tile-id{ font-size: 8px; }';

  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
}

window.onload = function() {
  appendStyle();
};
