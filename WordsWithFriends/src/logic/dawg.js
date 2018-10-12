var nodeNextId = 0;
var DawgNode = (function () {
    var node = function () {
        this.id = nodeNextId;
        this.final = false;
        this.edges = [];
        nodeNextId++;
    };
    node.prototype.str = function () {
        var arr = [];
        if (this.final) arr.push('1');
        else arr.push('0');
        for (var letter in this.edges) {
            arr.push(letter);
            arr.push(this.edges[letter].id);
        }
        return arr.join("_");
    };
    return node;
}());
var dawg = new (function () {
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
        for (var i = 0; i < Math.min(word.length, this.previousWord.length); i++) {
            if (word[i] != this.previousWord[i]) break;
            commonPrefix++;
        }
        console.log('commonPrefix' + commonPrefix);
        //Check the uncheckedNodes for redundant nodes, proceeding from last
        //one down to the common prefix size.Then truncate the list at that point.
        this.minimize(commonPrefix)

        this.data.push(data);
        var node = null;
        //add the suffix, starting from the correct node mid - way through the graph
        if (this.uncheckedNodes.length == 0)
            node = this.root
        else
            node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;

        for (var i = commonPrefix; i < word.length; i++) {
            let nextNode = new DawgNode();
            node.edges[word[i]] = nextNode;
            this.uncheckedNodes.push({ parent: node, letter: word[i], child: nextNode });
            node = nextNode;
        }


        node.final = true;
        this.previousWord = word;
    };
    dawg.prototype.minimize = function (downTo) {
        //proceed from the leaf up to a certain point
        for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
            console.log('fired');
            var v = this.uncheckedNodes[i];
            //replace the child with the previously encountered one
            var mNode = this.minimizedNodes.find(x => x.str() == v.child.str());
            if (mNode != null) v.parent.edges[v.letter] = mNode;
            else this.minimizedNodes.push(v.child);//add the state to the minimized nodes.
            this.uncheckedNodes.pop();
        }
    };
    dawg.prototype.display = function () {
        console.log('root:');
        console.log(this.root);
        var arr = [this.root];
        var done = [];
        while (arr.length > 0) {
            let n = arr.pop();
            if (done.find(id => id == n.id)) continue;
            done.push(n.id);
            console.log(n.id + ':');
            for (letter in n.edges) {
                console.log('       ' + letter + '->' + n.edges[letter].id);
                arr.push(n.edges[letter]);
            }
        }
    };
    dawg.prototype.finish = function () {
        this.minimize(0);
    };
    return dawg;
}());