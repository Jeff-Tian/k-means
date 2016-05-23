angular.module('kMeansModule', [])
    .controller('kMeansCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.testData =
            [
                [2, 1],
                [1, 2],
                [2, 2],
                [3, 2],
                [2, 3],
                [3, 3],
                [2, 4],
                [3, 5],
                [4, 4],
                [5, 3]
            ];

        var options = {
            series: {
                lines: {show: false},
                points: {show: true}
            },
            zoom: {
                interactive: false
            },
            pan: {
                interactive: true
            },
            legend: {
                show: true
            },
            grid: {
                hoverable: true,
                clickable: true
            },
            xaxis: {
                autoscaleMargin: 0.5
            },
            yaxis: {
                autoscaleMargin: 0.5
            },
            colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple']
        };

        var $plot;
        var plot;

        function initPlot(data) {
            $plot = $('#mycanvas').plot([{data: data, label: '原始数据'}], options);
            plot = $plot.data('plot');
            window.plot = plot;
        }

        function getRandomPoint() {
            var randomPoint = Math.floor(Math.random() * $scope.testData.length);

            return $scope.testData[randomPoint];
        }

        $scope.kMeansData = {
            k: 2,
            maxLoops: 10
        };

        function redraw(series) {
            series.forEach(function (s) {
                delete s.color;
            });
            plot.setData(series);
            plot.setupGrid();
            plot.draw();
        }

        function addSeries(newSeries) {
            var oldSeries = plot.getData();
            redraw(oldSeries.concat(newSeries));
        }

        function replaceSeries(newSeries) {
            var series = plot.getData();
            series.splice(-newSeries.length);
            redraw(series.concat(newSeries));
        }

        function chooseRandomCenters(k) {
            var a = [];

            for (var i = 0; i < k; i++) {
                a.push(getRandomPoint());
            }

            return a;
        }

        function setRandomCenters(k) {
            var centers = chooseRandomCenters(k);
            addSeries(seriesfyCenterSeries(centers));

            return centers;
        }

        function distance(p1, p2) {
            return Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
        }

        function initClusters(centers) {
            return centers.map(function () {
                return [];
            });
        }

        function cluster(data, centers) {
            var clusters = initClusters(centers);

            for (var i = 0; i < data.length; i++) {
                var p = data[i];
                var minDistance = Infinity;
                var minDistanceIndex = -1;

                for (var j = 0; j < centers.length; j++) {
                    var d = distance(p, centers[j]);

                    if (d < minDistance) {
                        minDistance = d;
                        minDistanceIndex = j;
                    }
                }

                if (!(clusters[minDistanceIndex] instanceof Array)) {
                    clusters[minDistanceIndex] = [];
                }

                clusters[minDistanceIndex].push(p);
            }

            return clusters;
        }

        initPlot($scope.testData);

        function seriesfyCenterSeries(s) {
            return {
                data: s,
                label: '质心',
                points: {
                    symbol: 'cross'
                }
            };
        }

        function seriesfy(clusters) {
            var a = [];
            clusters.forEach(function (s, index) {
                a.push({data: s, label: '类 ' + index});
            });
            return a;
        }

        function iterate(centers) {
            var data = $scope.testData;
            return cluster(data, centers);
        }

        function mean(a) {
            return a.reduce(function (x, y) {
                    return x + y;
                }, 0) / a.length;
        }

        function col(a, i) {
            return a.map(function (p) {
                return p[i];
            });
        }

        function centerOfCluster(c) {
            return [
                mean(col(c, 0)),
                mean(col(c, 1))
            ];
        }

        function reCalculateCenters(clusters) {
            return clusters.map(function (c) {
                return centerOfCluster(c);
            });
        }

        function initKMeans() {
            initPlot($scope.testData);
            var centers = setRandomCenters($scope.kMeansData.k);
            var clusters = iterate(centers);
            addSeries(seriesfy(clusters));

            return {centers: centers, clusters: clusters};
        }

        function recenterAndCluster(clusters) {
            var centers = reCalculateCenters(clusters);
            clusters = iterate(centers);
            replaceSeries([seriesfyCenterSeries(centers)].concat(seriesfy(clusters)));
            return {centers: centers, clusters: clusters};
        }

        function allLeftInRight(centers1, centers2) {
            for (var i = 0; i < centers1.length; i++) {
                var index = col(centers2, 0).indexOf(centers1[i][0]);

                if (index < 0) {
                    return false;
                }

                if (centers1[i][1] !== centers2[index][1]) {
                    return false;
                }
            }

            return true;
        }

        function centersEqual(centers1, centers2) {
            return !!centers1 && !!centers2 && !(centers1 < centers2 || centers2 < centers1);
        }

        $scope.interval = 100;

        function recordCurrentData(ret, loops) {
            $scope.current = ret;
            $scope.current.iteration = loops;

            if (col(ret.centers, 0).indexOf(null) >= 0) {
                debugger;
            }
        }

        $scope.computing = false;
        function loop(loops, clusters, centers, callback) {
            var condition = function () {
                return loops <= $scope.kMeansData.maxLoops;
            };

            while (condition()) {
                loops++;
                var ret = recenterAndCluster(clusters);
                recordCurrentData(ret, loops);

                if ((!condition() || centersEqual(centers, ret.centers)) && (typeof callback === 'function')) {
                    return callback(ret);
                }

                $timeout(function () {
                    loop(loops, ret.clusters, ret.centers, callback);
                }, $scope.interval);

                break;
            }
        }

        function done(result) {
            console.log('done');
            console.log(result);
            $scope.computing = false;

            $scope.clusteringResult = result;
        }

        $scope.kMeans = function () {
            $scope.computing = true;
            var ret = initKMeans();

            $timeout(function () {
                var loops = 0;
                loop(loops, ret.clusters, ret.centers, done);
            }, $scope.interval);
        };
    }])
;