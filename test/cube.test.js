var assert = require('assert');
var CubeWorld = require('../cube/cube');

describe('Cube ', function () {
    it('can generate cube by state labels', function () {
        var cube = CubeWorld.Cube.getPristineCube();
        var cube2 = CubeWorld.Cube.fromState('αβγδφχψωικλμνξοπεζηθρστυ');

        assert.equal(cube.toString(), cube2.toString());
        assert.deepStrictEqual(cube, cube2);
    });
});