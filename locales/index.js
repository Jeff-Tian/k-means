(function () {
    var i18n = {};
    var qs = {};

    if (typeof require === 'function') {
        i18n = require('i18n');
        qs = require('querystring');
    }

    var supportedLocales = ['zh', 'en'];

    var helper = {
        supportedLocales: supportedLocales,

        defaultLocale: supportedLocales[0],

        generateLocaleLink: function (url, locale) {
            var localePattern = new RegExp('^(?:/(?:' + helper.supportedLocales.join('|') + '))?(.*$)', 'i');

            return url.replace(localePattern, '/' + locale + '$1');
        },

        localePath: function (p, strict) {
            if (typeof strict === 'undefined') {
                strict = true;
            }

            var pattern = '^(?:/(' + helper.supportedLocales.join('|') + '))?' + p;

            if (strict) {
                pattern = pattern + '$';
            }

            return new RegExp(pattern, 'i');
        },

        getLocale: function (url, req) {
            var locale = 'zh';
            var l = new RegExp('^/(' + helper.supportedLocales.join('|') + ')', 'i');

            if (l.test(url)) {
                var a = l.exec(url);
                locale = a[1];
            } else {
                // try get locale from cookie
                if ((typeof document !== 'undefined') && document.cookie) {
                    // client side
                    function getCookie(name) {
                        if (document.cookie.length > 0) {
                            var start = document.cookie.indexOf(name + '=');
                            if (start >= 0) {
                                start += name.length + 1;
                                var end = document.cookie.indexOf(';', start);
                                if (end === -1) {
                                    end = document.cookie.length;
                                }
                                return unescape(document.cookie.substring(start, end));
                            }
                        }

                        return null;
                    }

                    var cookie = getCookie('locale');
                    if (cookie) {
                        locale = cookie;
                    }
                } else {
                    // server side
                    if (req && req.headers && req.headers.cookie) {
                        cookie = req.headers.cookie.match(/(?:^|;) *locale=([^;]*)/i);

                        if (cookie) {
                            cookie = cookie[1];

                            if (cookie) {
                                locale = cookie;
                            }
                        }
                    }
                }
            }

            return locale;
        },

        setLocale: function (req, res, next) {
            var locale = helper.getLocale(req.url, req);

            res.cookie('locale', locale, {
                expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
                path: '/',
                httpOnly: false
            });

            i18n.setLocale(locale);
            res.setLocale(locale);

            next();
        },

        setLocalVars: function (req, res, next) {
            res.locals.otherLocale = res.getLocale() === 'zh' ? 'en' : 'zh';
            res.locals.otherLocaleLink = helper.generateLocaleLink(req.url, res.locals.otherLocale);
            res.locals.localeLink = function (path) {
                if (path[0] !== '/') {
                    path = '/' + path;
                }

                return '/' + i18n.getLocale(req) + path;
            };
            res.locals.localeLinkSwitch = function (signedInPath, notSignedInPath) {
                if (res.locals.hcd_user && res.locals.hcd_user.member_id) {
                    return res.locals.localeLink(signedInPath);
                } else {
                    return res.locals.localeLink(notSignedInPath);
                }
            };
            res.locals.linkSwitch = function (signedInPath, notSignedInPath, returnUrlAfterSignedIn) {
                if (res.locals.hcd_user && res.locals.hcd_user.member_id) {
                    return signedInPath;
                } else {
                    if (returnUrlAfterSignedIn) {
                        return notSignedInPath + '?return_url=' + encodeURIComponent(returnUrlAfterSignedIn);
                    } else {
                        return notSignedInPath;
                    }
                }
            };

            next();
        },

        serveTranslations: function (req, res, next) {
            function errorHandler(err) {
                req.dualLogError(err);
                res.status(404).send();
            }

            if (!req.query.lang) {
                res.status(500).send();
                return;
            }

            try {
                var options = {
                    root: __dirname,
                    maxAge: 1000 * 3600 * 24 * 30,
                    lastModified: true
                };

                res.sendFile(req.query.lang + '.json', options, errorHandler);
            } catch (err) {
                errorHandler(err);
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = helper;
    } else if (typeof angular !== 'undefined') {
        angular.module('localeHelperModule', [])
            .provider('localeHelper', function () {
                this.getLocale = helper.getLocale;
                this.$get = [function () {
                    return helper;
                }];
            })
        ;
    }
})();