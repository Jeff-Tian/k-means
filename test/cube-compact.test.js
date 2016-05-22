var CubeCompact = require('../cube/cube-compact');
var CubeLite = require('../cube/cube-lite');
var assert = require('assert');

describe('Cube Compact', function () {
    it('can get pristine cube', function () {
        var c = CubeCompact.getPristineCube();
        assert.equal(c.toString(), '0, 1, 2, 3, 4, 5, 6; 0, 0, 0, 0, 0, 0, 0');
    });

    it('can convert cube lite to a cube compact', function () {
        var cubeLite = CubeLite.getPristineCube();
        assert.equal(cubeLite.toCubeCompact().toString(), CubeCompact.getPristineCube().toString());
    });

    it('can change to cube lite', function () {
        var compact = new CubeCompact([0, 1, 2, 3, 4, 5, 6], [0, 0, 0, 0, 0, 0, 0]);
        var lite = compact.toCubeLite();

        console.log('get cube lite pristine cube:', CubeLite.getPristineCube().toString());

        assert.equal(lite.toString(), CubeLite.getPristineCube().toString());
    });

    it('can turn left', function () {
        var compact = CubeCompact.getPristineCube();
        compact.L();

        var lite = CubeLite.getPristineCube();
        lite.L();

        assert.equal(compact.toLiteString(), lite.toString());
    });

    it('can turn left twice', function () {
        var compact = CubeCompact.getPristineCube();
        compact.L().L();

        var lite = CubeLite.getPristineCube();
        lite.L().L();

        assert.equal(compact.toLiteString(), lite.toString());
    });

    it('can turn left triple', function () {
        var compact = CubeCompact.getPristineCube();
        compact.L().L().L();

        assert.equal(compact.toString(), '0, 1, 5, 2, 4, 6, 3; 0, 0, 2, 1, 0, 1, 2');

        var lite = CubeLite.getPristineCube();
        lite.L().L().L();

        assert.equal(compact.toLiteString(), lite.toString());
    });

    it('can turn left four times and reset to the original state', function () {
        var compact = CubeCompact.getPristineCube();
        compact.L().L().L().L();

        assert.equal(compact.toString(), '0, 1, 2, 3, 4, 5, 6; 0, 0, 0, 0, 0, 0, 0');

        var lite = CubeLite.getPristineCube();
        lite.L().L().L().L();

        assert.equal(compact.toLiteString(), lite.toString());
    });

    it('can turn left counter clockwise', function () {
        var compact = CubeCompact.getPristineCube();
        compact['L`']();

        var lite = CubeLite.getPristineCube();
        lite['L`']();

        assert.equal(compact.toLiteString(), lite.toString());
    });

    it('can turn left counter clockwise twice', function () {
        var compact = CubeCompact.getPristineCube();
        compact['L`']()['L`']();

        var lite = CubeLite.getPristineCube();
        lite['L`']()['L`']();

        assert.equal(compact.toLiteString(), lite.toString());
    });

    it('can turn left counter clockwise triple', function () {
        var compact = CubeCompact.getPristineCube();
        compact['L`']()['L`']()['L`']();

        var lite = CubeLite.getPristineCube();
        lite['L`']()['L`']()['L`']();

        assert.equal(compact.toLiteString(), lite.toString());
    });

    it('can turn left counter clockwise four times and reset to the original state', function () {
        var compact = CubeCompact.getPristineCube();
        compact['L`']()['L`']()['L`']()['L`']();

        var lite = CubeLite.getPristineCube();
        lite['L`']()['L`']()['L`']()['L`']();

        assert.equal(compact.toString(), '0, 1, 2, 3, 4, 5, 6; 0, 0, 0, 0, 0, 0, 0');
        assert.equal(compact.toLiteString(), lite.toString());
    });

    testTurn('can turn upper side clockwise', 'U');

    testTurn('can turn upper side counter clockwise', 'U`');

    testTurn('can turn back side clockwise', 'B');

    testTurn('can turn back side counter clockwise', 'B`');

    function testTurn(descr, turn) {
        it(descr, function () {
            var compact = CubeCompact.getPristineCube();
            compact[turn]();

            var lite = CubeLite.getPristineCube();
            lite[turn]();

            assert.equal(compact.toLiteString(), lite.toString());

            compact[turn]();
            lite[turn]();
            assert.equal(compact.toLiteString(), lite.toString());

            compact[turn]();
            lite[turn]();
            assert.equal(compact.toLiteString(), lite.toString());

            compact[turn]();
            lite[turn]();
            assert.equal(compact.toLiteString(), lite.toString());
            assert.equal(compact.toString(), CubeCompact.getPristineCube().toString());
        });
    }
});