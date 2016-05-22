var assert = require('assert');
var CubeLite = require('../cube/cube-lite.js');
var CubeWorld = require('../cube/cube.js');

var turnMethods = ['F', 'F`', 'B', 'B`', 'L', 'L`', 'R', 'R`', 'U', 'U`', 'D', 'D`'];

function testFromPristine() {
    var rs = {
        'can turn front side clockwise': {
            turn: 'F',
            result: 'γαδβφχψωιρλσηξθπεζμκοντυ'
        },
        'can turn front side anti-clockwise': {
            turn: 'F`',
            result: 'βδαγφχψωιθλησξρπεζνοκμτυ'
        },
        'can turn back side clockwise': {
            turn: 'B',
            result: 'αβγδψφωχζκεμνυοτξπηθρσιλ'
        },
        'can turn back side anti-clockwise': {
            turn: 'B`',
            result: 'αβγδχωφψτκυμνεοζλιηθρσπξ'
        },
        'can turn left side clockwise': {
            turn: 'L',
            result: 'εβηδφτψρλιμκνξοπωζχθασγυ'
        },
        'can turn left side anti-clockwise': {
            turn: 'L`',
            result: 'ρβτδφηψεκμιλνξοπαζγθωσχυ'
        },
        'can turn right side clockwise': {
            turn: 'R',
            result: 'ασγυθχζωικλμονπξεβηδρψτφ'
        },
        'can turn right side anti-clockwise': {
            turn: 'R`',
            result: 'αζγθυχσωικλμξπνοεψηφρβτδ'
        },
        'can turn up side clockwise': {
            turn: 'U',
            result: 'νξγδφχκιαβλμωψοπηεθζρστυ'
        },
        'can turn up side anti-clockwise': {
            turn: 'U`',
            result: 'ικγδφχξνωψλμαβοπζθεηρστυ'
        },
        'can turn down side clockwise': {
            turn: 'D',
            result: 'αβλμποψωικχφνξγδεζηθτρυσ'
        },
        'can turn down side anti-clockwise': {
            turn: 'D`',
            result: 'αβοπμλψωικγδνξχφεζηθσυρτ'
        }
    };

    for (var r in rs) {
        it(r, function () {
            var cube = CubeLite.getPristineCube();
            cube[rs[r].turn]();

            assert.equal(cube.toString(), rs[r].result);
        });
    }
}

function testFrom_γαδβφχψωιρλσηξθπεζμκοντυ() {

    var rs = {
        'can turn front side clockwise': {
            turn: 'F',
            result: 'δγβαφχψωιολνμξκπεζσρθητυ'
        },
        'can turn front side anti-clockwise': {
            turn: 'F`',
            result: 'αβγδφχψωικλμνξοπεζηθρστυ'
        },
        'can turn back side clockwise': {
            turn: 'B',
            result: 'γαδβψφωχζρεσηυθτξπμκονιλ'
        },
        'can turn back side anti-clockwise': {
            turn: 'B`',
            result: 'γαδβχωφψτρυσηεθζλιμκονπξ'
        },
        'can turn left side clockwise': {
            turn: 'L',
            result: 'εαμβφτψολισρηξθπωζχκγνδυ'
        },
        'can turn left side anti-clockwise': {
            turn: 'L`',
            result: 'οατβφμψερσιληξθπγζδκωνχυ'
        },
        'can turn right side clockwise': {
            turn: 'R',
            result: 'γνδυκχζωιρλσθηπξεαμβοψτφ'
        },
        'can turn right side anti-clockwise': {
            turn: 'R`',
            result: 'γζδκυχνωιρλσξπηθεψμφοατβ'
        },
        'can turn up side clockwise': {
            turn: 'U',
            result: 'ηξδβφχριγαλσωψθπμεκζοντυ'
        },
        'can turn up side anti-clockwise': {
            turn: 'U`',
            result: 'ιρδβφχξηωψλσγαθπζκεμοντυ'
        },
        'can turn down side clockwise': {
            turn: 'D',
            result: 'γαλσπθψωιρχφηξδβεζμκτουν'
        },
        'can turn down side anti-clockwise': {
            turn: 'D`',
            result: 'γαθπσλψωιρδβηξχφεζμκνυοτ'
        }
    };

    for (var r in rs) {
        it(r + ' from ' + 'γαδβφχψωιρλσηξθπεζμκοντυ', function () {
            var cube = new CubeLite('γαδβφχψωιρλσηξθπεζμκοντυ');
            cube[rs[r].turn]();

            assert.equal(cube.toString(), rs[r].result);
        });
    }
}

describe('Cube Lite', function () {
    testFromPristine();

    testFrom_γαδβφχψωιρλσηξθπεζμκοντυ();

    it('can reset', function () {
        var cube = new CubeLite('αβοπμλψωικγδνξχφεζηθσυρτ');
        cube.reset();

        assert.equal(cube.toString(), 'αβοπμλψωικγδνξχφεζηθσυρτ');

        cube = new CubeLite('βδαγφχψωιθλησξρπεζνοκμτυ');
        cube.F();
        cube.reset();
        assert.equal(cube.toString(), 'βδαγφχψωιθλησξρπεζνοκμτυ');
    });

    it('should back to original state after 4 continuous turns', function () {
        for (var i = 0; i < turnMethods.length; i++) {
            var m = turnMethods[i];
            var cube = new CubeLite('αβγδφχψωικλμνξοπεζηθρστυ');
            console.log('doing ', m, ' 4 times');
            cube[m]()[m]()[m]()[m]();

            assert.equal(cube.toString(), 'αβγδφχψωικλμνξοπεζηθρστυ');
        }
    });

    it('can go to left turn state by right turn 3 times', function () {
        var cube = new CubeLite('αβγδφχψωικλμνξοπεζηθρστυ');
        cube['F`']();
        var label1 = cube.toString();
        cube.reset();
        cube.F().F().F();
        var label2 = cube.toString();

        assert.equal(label2, 'βδαγφχψωιθλησξρπεζνοκμτυ');
        assert.equal(label2, label1);
    });

    it('can get change method', function () {
        var cube = CubeLite.getPristineCube();
        var label1 = cube.label.slice(0);
        cube['F`']();
        var label2 = cube.label.slice(0);

        assert.deepStrictEqual(cube.getChangeMethod(label1, label2), {
            0: 1,
            1: 3,
            2: 0,
            3: 2,
            9: 19,
            11: 18,
            12: 21,
            14: 20,
            18: 12,
            19: 14,
            20: 9,
            21: 11
        });

        cube = CubeLite.getPristineCube();
        label1 = cube.label.slice(0);
        cube.F();
        label2 = cube.label.slice(0);

        assert.deepStrictEqual(cube.getChangeMethod(label1, label2), {
            "0": 2,
            "1": 0,
            "2": 3,
            "3": 1,
            "9": 20,
            "11": 21,
            "12": 18,
            "14": 19,
            "18": 11,
            "19": 9,
            "20": 14,
            "21": 12
        });
    });

    it('can get change method for old cube', function () {
        var cube = CubeWorld.Cube.getPristineCube();
        var label1 = cube.toString().split('');
        cube.B();
        var label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            4: 6,
            5: 4,
            6: 7,
            7: 5,
            8: 17,
            10: 16,
            13: 23,
            15: 22,
            16: 13,
            17: 15,
            22: 8,
            23: 10
        });

        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['B`']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            4: 5,
            5: 7,
            6: 4,
            7: 6,
            8: 22,
            10: 23,
            13: 16,
            15: 17,
            16: 10,
            17: 8,
            22: 15,
            23: 13
        });

        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['L']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            0: 16,
            2: 18,
            4: 20,
            6: 22,
            8: 10,
            9: 8,
            10: 11,
            11: 9,
            16: 4,
            18: 6,
            20: 0,
            22: 2
        });

        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['L`']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            0: 20,
            2: 22,
            4: 16,
            6: 18,
            8: 9,
            9: 11,
            10: 8,
            11: 10,
            16: 0,
            18: 2,
            20: 4,
            22: 6
        });


        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['R']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            1: 21,
            3: 23,
            5: 17,
            7: 19,
            12: 14,
            13: 12,
            14: 15,
            15: 13,
            17: 1,
            19: 3,
            21: 5,
            23: 7
        });

        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['R`']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            1: 17,
            3: 19,
            5: 21,
            7: 23,
            12: 13,
            13: 15,
            14: 12,
            15: 14,
            17: 5,
            19: 7,
            21: 1,
            23: 3
        });


        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['U']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            0: 12,
            1: 13,
            6: 9,
            7: 8,
            8: 0,
            9: 1,
            12: 7,
            13: 6,
            16: 18,
            17: 16,
            18: 19,
            19: 17
        });

        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['U`']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            0: 8,
            1: 9,
            6: 13,
            7: 12,
            8: 7,
            9: 6,
            12: 0,
            13: 1,
            16: 17,
            17: 19,
            18: 16,
            19: 18
        });

        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['D']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            2: 10,
            3: 11,
            4: 15,
            5: 14,
            10: 5,
            11: 4,
            14: 2,
            15: 3,
            20: 22,
            21: 20,
            22: 23,
            23: 21
        });

        cube = CubeWorld.Cube.getPristineCube();
        label1 = cube.toString().split('');
        cube['D`']();
        label2 = cube.toString().split('');

        assert.deepStrictEqual(CubeLite.getChangeMethod(label1, label2), {
            2: 14,
            3: 15,
            4: 11,
            5: 10,
            10: 2,
            11: 3,
            14: 5,
            15: 4,
            20: 21,
            21: 23,
            22: 20,
            23: 22
        });
    });

    it('can get the 8 corners', function () {
        var cube = CubeLite.getPristineCube();

        assert.deepStrictEqual(cube.getFrontLeftTopCorner(), [cube.label[18], cube.label[9], cube.label[0]]);

        assert.deepStrictEqual(cube.getFrontRightBottomCorner().join(''), 'σοδ');
    });

    it('can be converted into cube compact', function () {
        var cube = CubeLite.getPristineCube();
        assert.equal(cube.toCubeCompact().toString(), '0, 1, 2, 3, 4, 5, 6; 0, 0, 0, 0, 0, 0, 0');

        cube.L();
        assert.equal(cube.toString(), 'εβηδρχτωλιμκνξοπφζψθασγυ');
        assert.equal(cube.toCubeCompact().toString(), '0, 1, 3, 6, 4, 2, 5; 0, 0, 2, 1, 0, 1, 2');
    });
});