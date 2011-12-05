(function(tree) {

tree.Filter = function Filter(val, index, filename) {
    this.val = val;

    this.index = index;
    this.filename = filename;

    this.id = this.val;
};

tree.Filter.prototype.toXML = function(env) {
    // Handle variables correctly
    return this.val;
};

tree.Filter.prototype.toString = function() {
    return '[' + this.id + ']';
};

})(require('../tree'));
