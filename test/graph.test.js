var assert = require('assert');
var GraphWorld = require('../cube/graph');

describe('Graph World', function () {
    it('should display itself', function () {
        var v1 = new GraphWorld.Vertex('test');
        assert.equal('test', v1.toString());
        assert.equal('test', v1.label);

        var v2 = new GraphWorld.Vertex('again');
        assert.equal('again', v2.toString());
        var e = new GraphWorld.Edge(v1, v2);
        assert.equal('Edge (test, again)', e.toString());

        var g = new GraphWorld.Graph([v1, v2], e);
        assert.deepStrictEqual([v1, v2], g.vertices());
    });

    it('can get edge item', function () {
        var v = new GraphWorld.Vertex('test');
        var w = new GraphWorld.Vertex('again');
        var e = new GraphWorld.Edge(v, w);
        assert.deepStrictEqual(v, e.getItem(0));
        assert.deepStrictEqual(w, e.getItem(1));
    });

    it('should get edge by given vertices', function () {
        var v = new GraphWorld.Vertex('test');
        var w = new GraphWorld.Vertex('again');
        var e = new GraphWorld.Edge(v, w);
        var g = new GraphWorld.Graph([v, w], e);
        assert.deepStrictEqual(e, g.getEdge(v, w));
        assert.deepStrictEqual([e], g.edges());
    });

    it('can not add the same vertex twice', function () {
        var v = new GraphWorld.Vertex('test');
        var w = new GraphWorld.Vertex('test');
        var g = new GraphWorld.Graph([v], []);
        assert.throws(function () {
            g.addVertex(w);
        }, Error)
    });

    it('can not add the same edge twice', function () {
        var v = new GraphWorld.Vertex('v');
        var w = new GraphWorld.Vertex('w');
        var e = new GraphWorld.Edge(v, w);
        var g = new GraphWorld.Graph([v, w], e);
        assert.throws(function () {
            g.addEdge(e);
        }, Error);
    });

    it('can create empty graph', function () {
        var g = new GraphWorld.Graph([], []);
        assert.notEqual(null, g);
    });

    it('can serialize graph to csv', function () {
        var g = new GraphWorld.Graph.simplestGraph();

        assert.equal(g.serializeToCSV(), 'source, target\nv, w');
    });
});

describe('Graph Mini', function () {
    it('can get all vertices', function () {
        var v = 'v';
        var w = 'w';
        var es = [[v, w], [w, v]];
        var g = new GraphWorld.GraphMini([v, w], es);
        assert.deepStrictEqual([v, w], g.getVertices());
    });

    // it('can get edge item', function () {
    //     var v = new GraphWorld.Vertex('test');
    //     var w = new GraphWorld.Vertex('again');
    //     var e = new GraphWorld.Edge(v, w);
    //     assert.deepStrictEqual(v, e.getItem(0));
    //     assert.deepStrictEqual(w, e.getItem(1));
    // });
    //
    // it('should get edge by given vertices', function () {
    //     var v = new GraphWorld.Vertex('test');
    //     var w = new GraphWorld.Vertex('again');
    //     var e = new GraphWorld.Edge(v, w);
    //     var g = new GraphWorld.Graph([v, w], e);
    //     assert.deepStrictEqual(e, g.getEdge(v, w));
    //     assert.deepStrictEqual([e], g.edges());
    // });
    //
    // it('can not add the same vertex twice', function () {
    //     var v = new GraphWorld.Vertex('test');
    //     var w = new GraphWorld.Vertex('test');
    //     var g = new GraphWorld.Graph([v], []);
    //     assert.throws(function () {
    //         g.addVertex(w);
    //     }, Error)
    // });
    //
    // it('can not add the same edge twice', function () {
    //     var v = new GraphWorld.Vertex('v');
    //     var w = new GraphWorld.Vertex('w');
    //     var e = new GraphWorld.Edge(v, w);
    //     var g = new GraphWorld.Graph([v, w], e);
    //     assert.throws(function () {
    //         g.addEdge(e);
    //     }, Error);
    // });
    //
    // it('can create empty graph', function () {
    //     var g = new GraphWorld.Graph([], []);
    //     assert.notEqual(null, g);
    // });
});