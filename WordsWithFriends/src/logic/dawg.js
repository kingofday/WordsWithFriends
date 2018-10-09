var nodeNextId = 0;
var DawgNode = (function () {
    var node = function () {
        this.id = nodeNextId;
        this.final = false;
        this.edges = [];
        nodeNextId++;
    };
    return node;
}());

var dawg = (function () {
    var dawg = function () {
        this.previousWord = "";
        this.root = new DawgNode();
        this.uncheckedNodes = [];
        //Here is a list of unique nodes that have been checked for duplication.
        this.minimizedNodes = [];
        //Here is the data associated with all the nodes
        this.data = [];
    };
    dawg.prototype.insert = function (word, data) {
        if (word <= this.previousWord) {
            alert("Error: Words must be inserted in alphabetical order.");
            return;
        }
        //find common prefix between word and previous word
        var commonPrefix = 0;
        for (var i = 0; i < Math.min(word.length, this.previousWord); i++) {
            if (word[i] != this.previousWord[i]) break;
            commonPrefix++;
        }

        //Check the uncheckedNodes for redundant nodes, proceeding from last
        //one down to the common prefix size.Then truncate the list at that point.
        this._minimize(commonPrefix)

        this.data.append(data);
        var node = null;
        //add the suffix, starting from the correct node mid - way through the graph
        if (this.uncheckedNodes.length == 0)
            node = self.root
        else
            node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
        for (var i = commonPrefix; i < word.length; i++) {
            let nextNode = new DawgNode();
            node.edges[word[i]] = nextNode;
            this.uncheckedNodes.push({ parent: node, letter: letter, child: nextNode });
            node = nextNode;
        }
       

        node.final = true;
        this.previousWord = word
    };
    dawg.prototype.minimize = function (downTo) {
        //proceed from the leaf up to a certain point
        for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
            let v = this.uncheckedNodes[i];
            if (this.minimizedNodes.final(x => x.id == c.child.id))
                //replace the child with the previously encountered one
                v.parent.edges[v.letter] = this.minimizedNodes[v.child]
            else this.minimizedNodes[v.child] = v.child;//add the state to the minimized nodes.
            this.uncheckedNodes.pop();
        }
    };
    return dawg;
}());