var assert = require('assert');
var CubeLite = require('../cube/cube-lite.js');
var CubeWorld = require('../cube/cube');
var Iterator = require('../cube/iterator');
var CubeMini = require('../cube/cube-mini');

var turnMethods = ['F', 'F`', 'B', 'B`', 'L', 'L`', 'R', 'R`', 'U', 'U`', 'D', 'D`'];

function assertArrayEqualIgnoreOrder(actual, expect) {
    // assert.equal(actual.length, expect.length);
    for (var i = 0; i < expect.length; i++) {
        assert.ok(actual.indexOf(expect[i]) >= 0, 'actual does not contain ' + expect[i] + ' at expect[' + i + ']');
    }
    for (var j = 0; j < actual.length; j++) {
        assert.ok(expect.indexOf(actual[j]) >= 0, 'extra ' + actual[j] + ' at actual[' + j + ']');
    }
}

describe('Cube Iterator Lite', function () {
    it('has 12 turn methods', function () {
        assertArrayEqualIgnoreOrder(Iterator.CubeIterator.turns, turnMethods);
    });

    it('can get adjacent states', function () {
        var cube = CubeLite.getPristineCube();
        var adj = new Iterator.CubeIterator().getAdjacents(cube);

        // assertArrayEqualIgnoreOrder(adj, []);
        var expected = [
            'γαδβφχψωιρλσηξθπεζμκοντυ',
            'βδαγφχψωιθλησξρπεζνοκμτυ',
            'αβγδψφωχζκεμνυοτξπηθρσιλ',
            'αβγδχωφψτκυμνεοζλιηθρσπξ',
            'νξγδφχκιαβλμωψοπηεθζρστυ',
            'ικγδφχξνωψλμαβοπζθεηρστυ',
            'αβλμποψωικχφνξγδεζηθτρυσ',
            'αβοπμλψωικγδνξχφεζηθσυρτ',
            'εβηδρχτωλιμκνξοπφζψθασγυ',
            'ρβτδεχηωκμιλνξοπαζγθφσψυ',
            'ασγυφζψθικλμονπξεβηδρχτω',
            'αζγθφσψυικλμξπνοεχηωρβτδ'
        ];

        assert.deepStrictEqual(adj, expected);

        var theCube = CubeWorld.Cube.getPristineCube();
        var theAdj = new Iterator.CubeIterator().getAdjacentVertices(theCube).map(function (v) {
            return v.label;
        });

        console.log('expected: ');
        console.log(theAdj);

        assert.deepStrictEqual(adj, theAdj);

        cube = new CubeLite('γαδβφχψωιρλσηξθπεζμκοντυ');
        adj = new Iterator.CubeIterator().getAdjacents(cube);

        theCube = CubeWorld.Cube.fromState('γαδβφχψωιρλσηξθπεζμκοντυ');
        theAdj = new Iterator.CubeIterator().getAdjacentVertices(theCube).map(function (v) {
            return v.label;
        });

        assert.deepStrictEqual(adj, theAdj);
    });
});