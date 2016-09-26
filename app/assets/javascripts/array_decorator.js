Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

Array.prototype.shuffle = function() {
  this.sort(function() {
    return .5 - Math.random();
  });
  return this
};
