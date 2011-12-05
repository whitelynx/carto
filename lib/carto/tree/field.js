(function(tree) {

tree.Field = function Keyword(value) {
    this.value = value;
    this.is = 'field';
};

tree.Field.prototype = {
    eval: function() { return this },
    toString: function() { return '[' + this.value + ']' }
};

})(require('../tree'));
