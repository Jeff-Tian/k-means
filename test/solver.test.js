var Solver = require('../cube/solver');
var GraphWorld = require('../cube/graph');
var assert = require('assert');
var CubeMini = require('../cube/cube-mini');

describe('Solver', function () {
    it('can find shortest path', function () {
        var v = new GraphWorld.Vertex('v');
        var w = new GraphWorld.Vertex('w');
        var e = new GraphWorld.Edge(v, w);
        var g = new GraphWorld.Graph([v, w], [e]);

        var expected = {l: 1, path: [v, w]};
        assert.deepStrictEqual(Solver.shortestPath(g, v, w), expected);

        var x = new GraphWorld.Vertex('x');
        g.addVertex(x);
        g.addEdge(new GraphWorld.Edge(w, x));
        expected = {l: 2, path: [v, w, x]};

        assert.deepStrictEqual(Solver.shortestPath(g, v, x), expected);

        var y = new GraphWorld.Vertex('y');
        var z = new GraphWorld.Vertex('z');
        g.addVertex(y);
        g.addVertex(z);
        g.addEdge(new GraphWorld.Edge(w, y));
        g.addEdge(new GraphWorld.Edge(x, z));

        console.log(g);

        expected = {l: 3, path: [v, w, x, z]};

        assert.deepStrictEqual(Solver.shortestPath(g, v, z), expected);
    });

    it('can find the 1st shortest path', function () {
        var v = new GraphWorld.Vertex('v');
        var w = new GraphWorld.Vertex('w');
        var x = new GraphWorld.Vertex('x');
        var y = new GraphWorld.Vertex('y');
        var z = new GraphWorld.Vertex('z');

        var g = new GraphWorld.Graph([v, w, x, y, z], [
            new GraphWorld.Edge(v, w),
            new GraphWorld.Edge(w, x),
            new GraphWorld.Edge(w, y),
            new GraphWorld.Edge(x, z),
            new GraphWorld.Edge(y, z)
        ]);

        var expected = {l: 3, path: [v, w, x, z]};

        assert.deepStrictEqual(Solver.shortestPath(g, v, z), expected);
    });

    it('can find the shortest path for simplest graph', function () {
        var a = new GraphWorld.Vertex('a');
        var b = new GraphWorld.Vertex('b');
        var c = new GraphWorld.Vertex('c');
        var d = new GraphWorld.Vertex('d');

        var g = new GraphWorld.Graph([a, b, c, d], [
            new GraphWorld.Edge(a, b),
            new GraphWorld.Edge(a, c),
            new GraphWorld.Edge(a, d)
        ]);

        var expected = {l: 1, path: [a, c]};

        assert.deepStrictEqual(Solver.shortestPath(g, a, c), expected);
    });
});

describe('Cube Mini Solver', function () {
    it('can get adjacents states', function () {
        var c = CubeMini.getPristineCube();

        assert.deepStrictEqual(Solver.CubeMiniSolver.getAdjacents(c.data), [{
            turn: 'L',
            data: 49561745
        }, {turn: 'L`', data: 55885969},
            {turn: 'U', data: 810852352},
            {turn: 'U`', data: 348430336},
            {turn: 'B', data: 1116120104},
            {turn: 'B`', data: 850437160}
        ]);

        c = CubeMini.fromState(49561745);
        assert.equal(Solver.CubeMiniSolver.getAdjacents(c.data).indexOf(55885969), -1);

        c = CubeMini.fromState(55885969);
        assert.equal(Solver.CubeMiniSolver.getAdjacents(c.data).indexOf(49561745), -1);

        c = CubeMini.fromState(1355563008);
        assert.equal(Solver.CubeMiniSolver.getAdjacents(c.data).indexOf(281363496), -1);
    });

    it('can get steps by path', function () {
        assert.deepStrictEqual(Solver.CubeMiniSolver.getSteps([43819008, 49561745]), ['L']);
    });

    it('can solve a path to reset cube', function () {
        var c = CubeMini.getPristineCube();
        var from = c.data;
        var to = c.data;

        assert.deepStrictEqual(Solver.CubeMiniSolver.solve(from, to), {
            path: [from],
            turns: [],
            // steps: []
        });

        c.L();
        to = c.data;
        assert.deepStrictEqual(Solver.CubeMiniSolver.solve(from, to), {
            path: [from, to],
            turns: ['L'],
            // steps: ['L']
        });

        console.log('中间状态是 ' + to);

        c.U();
        to = c.data;
        var solved = Solver.CubeMiniSolver.solve(from, to);
        // assert.deepStrictEqual(solved.steps, ['L', 'U']);
        assert.deepStrictEqual(solved.turns, ['L', 'U']);

        c.B();
        to = c.data;
        solved = Solver.CubeMiniSolver.solve(from, to);
        // assert.deepStrictEqual(solved.steps, ['L', 'U', 'B']);
        assert.deepStrictEqual(solved.turns, ['L', 'U', 'B']);

        c['L`']();
        to = c.data;
        solved = Solver.CubeMiniSolver.solve(from, to);
        // assert.deepStrictEqual(solved.steps, ['L', 'U', 'B', 'L`']);
        assert.deepStrictEqual(solved.turns, ['L', 'U', 'B', 'L`']);

        c['B`']();
        to = c.data;
        solved = Solver.CubeMiniSolver.solve(from, to);
        // assert.deepStrictEqual(solved.steps, ['L', 'U', 'B', 'L`', 'B`']);
        assert.deepStrictEqual(solved.turns, ['L', 'U', 'B', 'L`', 'B`']);

        c['U`']();
        to = c.data;
        solved = Solver.CubeMiniSolver.solve(from, to);
        // assert.deepStrictEqual(solved.steps, ['L', 'U', 'B', 'L`', 'B`', 'U`']);
        assert.deepStrictEqual(solved.turns, ['L', 'U', 'B', 'L`', 'B`', 'U`']);
    });

    it('can solve greek state changes', function () {
        var steps = Solver.CubeMiniSolver.solveGreek('αβγδφχψωικλμνξοπεζηθρστυ', 'ρξτδηχθιβμαλωψοπνεγζφσκυ').turns;
        assert.notEqual(steps.length, 0);
        assert.deepStrictEqual(steps, ['U', 'L`']);

        // steps = Solver.CubeMiniSolver.solveGreek('αβγδφχψωικλμνξοπεζηθρστυ', 'ψμφδξυηβκεζτρθοχανιγλσωπ');
        // assert.notEqual(steps.length, 0);
        //
        // var cube = CubeMini.getPristineCube();
        // cube.randomize();
        // assert.notEqual(Solver.CubeMiniSolver)
    });
});