var assert = require('assert');
var GraphWorld = require('../cube/graph');
var Layout = require('../cube/layout');

describe('Layout', function () {
    it('should calculate positions for vertex', function () {
        var sg = GraphWorld.Graph.simplestGraph();
        var cl = new Layout.CircleLayout(sg);

        assert.deepStrictEqual(new Layout.Position(50, 0), cl.pos(sg.vertices()[0]));
        //assert.deepStrictEqual(new Layout.Position(-130, 0), cl.pos(sg.vertices()[1]));
    });
});