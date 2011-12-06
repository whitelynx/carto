var tree = require('../tree');

tree.Filterset = function Filterset() {
    this.filters = [];
};

tree.Filterset.prototype.toXML = function(env) {
    var filterXML = [];

    for (var id in this.filters) {
        filterXML.push('(' + this.filters[id].toXML(env).trim() + ')');
    }

    if (filterXML.length) {
        return '    <Filter>' + filterXML.join(' and ') + '</Filter>\n';
    } else {
        return '';
    }
};

tree.Filterset.prototype.toString = function() {
    var arr = [];
    for (var id in this.filters) {
        arr.push(this.filters[id].id);
    }
    arr.sort();
    return arr.join('\t');
};

tree.Filterset.prototype.clone = function() {
    var clone = new tree.Filterset();
    for (var id in this.filters) {
        clone[id] = this.filters[id];
    }
    return clone;
};

// Note: other has to be a tree.Filterset.
tree.Filterset.prototype.cloneWith = function(other) {
    var additions = [];
    for (var id in other.filters) {
        // Adding the filter will override another value.
        additions.push(other.filters[id]);
    }

    // Adding the other filters doesn't make this filterset invalid, but it
    // doesn't add anything to it either.
    if (!additions.length) return null;

    // We can successfully add all filters. Now clone the filterset and add the
    // new rules.
    var clone = new tree.Filterset();

    // We can add the rules that are already present without going through the
    // add function as a Filterset is always in it's simplest canonical form.
    for (var id in this.filters) {
        clone.filters[id] = this.filters[id];
    }

    // Only add new filters that actually change the filter.
    while (id = additions.shift()) {
        clone.add(id);
    }

    return clone;
};

/**
 * Only call this function for filters that have been cleared by .addable().
 */
tree.Filterset.prototype.add = function(filter) {
    //var key = filter.key;
    this.filters.push(filter);
};
