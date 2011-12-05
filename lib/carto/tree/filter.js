(function(tree) {

tree.Filter = function Filter(key, op, val, index, filename) {
    this.key = key.value;
    this._key = key;

    this.val = val.value;
    this._val = val;

    this.op = op;
    this.index = index;
    this.filename = filename;

    this.id = this.key + this.op + this.val;
};

// XML-safe versions of comparators
var opXML = {
    '<': '&lt;',
    '>': '&gt;',
    '=': '=',
    '!=': '!=',
    '<=': '&lt;=',
    '>=': '&gt;='
};

tree.Filter.prototype.toXML = function(env) {
    // Handle variables correctly
    if (this.val.eval) this._val = this.val.eval(env);
    if (this.key.eval) this._key = this.key.eval(env);

    return this._key.toString(this._key.is === 'string') + ' ' +
        opXML[this.op] + ' ' + this._val.toString(this._val.is === 'string');
};

tree.Filter.prototype.toString = function() {
    return '[' + this.id + ']';
};

})(require('../tree'));
