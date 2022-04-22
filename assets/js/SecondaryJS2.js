!function() {
    "use strict";
    function t(e) {
        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        )(e)
    }
    function e(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function i(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function n(t, e, n) {
        return e && i(t.prototype, e),
        n && i(t, n),
        t
    }
    function s(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    function o(t, e) {
        return function(t) {
            if (Array.isArray(t))
                return t
        }(t) || function(t, e) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
                return;
            var i = []
              , n = !0
              , s = !1
              , o = void 0;
            try {
                for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value),
                !e || i.length !== e); n = !0)
                    ;
            } catch (t) {
                s = !0,
                o = t
            } finally {
                try {
                    n || null == a.return || a.return()
                } finally {
                    if (s)
                        throw o
                }
            }
            return i
        }(t, e) || a(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function r(t) {
        return function(t) {
            if (Array.isArray(t))
                return l(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
                return Array.from(t)
        }(t) || a(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function a(t, e) {
        if (t) {
            if ("string" == typeof t)
                return l(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === i && t.constructor && (i = t.constructor.name),
            "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? l(t, e) : void 0
        }
    }
    function l(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++)
            n[i] = t[i];
        return n
    }
    var c = function() {
        function i(t) {
            e(this, i),
            this.mAttr = "data-" + t.dataName,
            this.mCaptureEvents = ["mouseenter", "mouseleave"],
            this.el = t.el
        }
        return n(i, [{
            key: "mInit",
            value: function(t) {
                var e = this;
                this.modules = t,
                this.mCheckEventTarget = this.mCheckEventTarget.bind(this),
                this.events && Object.keys(this.events).forEach((function(t) {
                    return e.mAddEvent(t)
                }
                ))
            }
        }, {
            key: "mUpdate",
            value: function(t) {
                this.modules = t
            }
        }, {
            key: "mDestroy",
            value: function() {
                var t = this;
                this.events && Object.keys(this.events).forEach((function(e) {
                    return t.mRemoveEvent(e)
                }
                ))
            }
        }, {
            key: "mAddEvent",
            value: function(t) {
                var e = !!this.mCaptureEvents.includes(t);
                this.el.addEventListener(t, this.mCheckEventTarget, e)
            }
        }, {
            key: "mRemoveEvent",
            value: function(t) {
                var e = !!this.mCaptureEvents.includes(t);
                this.el.removeEventListener(t, this.mCheckEventTarget, e)
            }
        }, {
            key: "mCheckEventTarget",
            value: function(t) {
                var e = this.events[t.type];
                if ("string" == typeof e)
                    this[e](t);
                else {
                    var i = "[" + this.mAttr + "]"
                      , n = t.target;
                    if (this.mCaptureEvents.includes(t.type))
                        n.matches(i) && this.mCallEventMethod(t, e, n);
                    else
                        for (; n && n !== document && (!n.matches(i) || "undefined" == this.mCallEventMethod(t, e, n)); )
                            n = n.parentNode
                }
            }
        }, {
            key: "mCallEventMethod",
            value: function(t, e, i) {
                var n = i.getAttribute(this.mAttr);
                if (e.hasOwnProperty(n)) {
                    var s = e[n];
                    t.hasOwnProperty("currentTarget") || Object.defineProperty(t, "currentTarget", {
                        value: i
                    }),
                    t.hasOwnProperty("curTarget") || Object.defineProperty(t, "curTarget", {
                        value: i
                    }),
                    this[s](t)
                }
            }
        }, {
            key: "$",
            value: function(e, i) {
                var n = [e.indexOf("."), e.indexOf("#"), e.indexOf("[")].filter((function(t) {
                    return -1 != t
                }
                ))
                  , s = !1
                  , o = e
                  , a = ""
                  , l = this.el;
                return n.length && (s = Math.min.apply(Math, r(n)),
                o = e.slice(0, s),
                a = e.slice(s)),
                "object" == t(i) && (l = i),
                l.querySelectorAll("[" + this.mAttr + "=" + o + "]" + a)
            }
        }, {
            key: "parent",
            value: function(t, e) {
                for (var i = "[" + this.mAttr + "=" + t + "]", n = e.parentNode; n && n !== document; ) {
                    if (n.matches(i))
                        return n;
                    n = n.parentNode
                }
            }
        }, {
            key: "getData",
            value: function(t, e) {
                return (e || this.el).getAttribute(this.mAttr + "-" + t)
            }
        }, {
            key: "setData",
            value: function(t, e, i) {
                return (i || this.el).setAttribute(this.mAttr + "-" + t, e)
            }
        }, {
            key: "call",
            value: function(t, e, i, n) {
                var s = this;
                e && !i && (i = e,
                e = !1),
                this.modules[i] && (n ? this.modules[i][n] && this.modules[i][n][t](e) : Object.keys(this.modules[i]).forEach((function(n) {
                    s.modules[i][n][t](e)
                }
                )))
            }
        }, {
            key: "on",
            value: function(t, e, i, n) {
                var s = this;
                this.modules[e] && (n ? this.modules[e][n].el.addEventListener(t, (function(t) {
                    return i(t)
                }
                )) : Object.keys(this.modules[e]).forEach((function(n) {
                    s.modules[e][n].el.addEventListener(t, (function(t) {
                        return i(t)
                    }
                    ))
                }
                )))
            }
        }, {
            key: "init",
            value: function() {}
        }, {
            key: "destroy",
            value: function() {}
        }]),
        i
    }()
      , h = function() {
        function t(i) {
            e(this, t),
            this.app,
            this.modules = i.modules,
            this.currentModules = {},
            this.activeModules = {},
            this.newModules = {},
            this.moduleId = 0
        }
        return n(t, [{
            key: "init",
            value: function(t, e) {
                var i = this
                  , n = (e || document).querySelectorAll("*");
                t && !this.app && (this.app = t),
                this.activeModules.app = {
                    app: this.app
                },
                n.forEach((function(t) {
                    Array.from(t.attributes).forEach((function(n) {
                        if (n.name.startsWith("data-module")) {
                            var s = !1
                              , o = n.name.split("-").splice(2)
                              , r = i.toCamel(o);
                            if (i.modules[r] ? s = !0 : i.modules[i.toUpper(r)] && (r = i.toUpper(r),
                            s = !0),
                            s) {
                                var a = {
                                    el: t,
                                    name: r,
                                    dataName: o.join("-")
                                }
                                  , l = new i.modules[r](a)
                                  , c = n.value;
                                c || (i.moduleId++,
                                c = "m" + i.moduleId,
                                t.setAttribute(n.name, c)),
                                i.addActiveModule(r, c, l);
                                var h = r + "-" + c;
                                e ? i.newModules[h] = l : i.currentModules[h] = l
                            }
                        }
                    }
                    ))
                }
                )),
                Object.entries(this.currentModules).forEach((function(t) {
                    var n = o(t, 2)
                      , s = n[0]
                      , r = n[1];
                    if (e) {
                        var a = s.split("-")
                          , l = a.shift()
                          , c = a.pop();
                        i.addActiveModule(l, c, r)
                    } else
                        i.initModule(r)
                }
                ))
            }
        }, {
            key: "initModule",
            value: function(t) {
                t.mInit(this.activeModules),
                t.init()
            }
        }, {
            key: "addActiveModule",
            value: function(t, e, i) {
                this.activeModules[t] ? Object.assign(this.activeModules[t], s({}, e, i)) : this.activeModules[t] = s({}, e, i)
            }
        }, {
            key: "update",
            value: function(t) {
                var e = this;
                this.init(this.app, t),
                Object.entries(this.currentModules).forEach((function(t) {
                    var i = o(t, 2);
                    i[0];
                    i[1].mUpdate(e.activeModules)
                }
                )),
                Object.entries(this.newModules).forEach((function(t) {
                    var i = o(t, 2)
                      , n = (i[0],
                    i[1]);
                    e.initModule(n)
                }
                )),
                Object.assign(this.currentModules, this.newModules)
            }
        }, {
            key: "destroy",
            value: function(t) {
                t ? this.destroyScope(t) : this.destroyModules()
            }
        }, {
            key: "destroyScope",
            value: function(t) {
                var e = this;
                t.querySelectorAll("*").forEach((function(t) {
                    Array.from(t.attributes).forEach((function(t) {
                        if (t.name.startsWith("data-module")) {
                            var i = t.value
                              , n = t.name.split("-").splice(2)
                              , s = e.toCamel(n) + "-" + i
                              , o = !1;
                            e.currentModules[s] ? o = !0 : e.currentModules[e.toUpper(s)] && (s = e.toUpper(s),
                            o = !0),
                            o && (e.destroyModule(e.currentModules[s]),
                            delete e.currentModules[s])
                        }
                    }
                    ))
                }
                )),
                this.activeModules = {},
                this.newModules = {}
            }
        }, {
            key: "destroyModules",
            value: function() {
                var t = this;
                Object.entries(this.currentModules).forEach((function(e) {
                    var i = o(e, 2)
                      , n = (i[0],
                    i[1]);
                    t.destroyModule(n)
                }
                )),
                this.currentModules = []
            }
        }, {
            key: "destroyModule",
            value: function(t) {
                t.mDestroy(),
                t.destroy()
            }
        }, {
            key: "toCamel",
            value: function(t) {
                var e = this;
                return t.reduce((function(t, i) {
                    return t + e.toUpper(i)
                }
                ))
            }
        }, {
            key: "toUpper",
            value: function(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }
        }]),
        t
    }();
    function u(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function d(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function f(t, e, i) {
        return e && d(t.prototype, e),
        i && d(t, i),
        t
    }
    function p(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }),
        e && m(t, e)
    }
    function v(t) {
        return (v = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }
        )(t)
    }
    function m(t, e) {
        return (m = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function y(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? function(t) {
            if (void 0 === t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }
    function g(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
                ))),
                !0
            } catch (t) {
                return !1
            }
        }();
        return function() {
            var i, n = v(t);
            if (e) {
                var s = v(this).constructor;
                i = Reflect.construct(n, arguments, s)
            } else
                i = n.apply(this, arguments);
            return y(this, i)
        }
    }
    function b(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function w(t, e) {
        return function(t) {
            if (Array.isArray(t))
                return t
        }(t) || function(t, e) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
                return;
            var i = []
              , n = !0
              , s = !1
              , o = void 0;
            try {
                for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value),
                !e || i.length !== e); n = !0)
                    ;
            } catch (t) {
                s = !0,
                o = t
            } finally {
                try {
                    n || null == a.return || a.return()
                } finally {
                    if (s)
                        throw o
                }
            }
            return i
        }(t, e) || function(t, e) {
            if (!t)
                return;
            if ("string" == typeof t)
                return k(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === i && t.constructor && (i = t.constructor.name);
            if ("Map" === i || "Set" === i)
                return Array.from(t);
            if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
                return k(t, e)
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function k(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++)
            n[i] = t[i];
        return n
    }
    var E = function() {
        function t(e) {
            !function(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }(this, t),
            this.defaults = {
                name: "load",
                loadingClass: "is-loading",
                loadedClass: "is-loaded",
                readyClass: "is-ready",
                transitionsPrefix: "is-",
                transitionsHistory: !0,
                enterDelay: 0,
                exitDelay: 0,
                loadedDelay: 0,
                isLoaded: !1,
                isEntered: !1,
                isUrl: !1,
                transitionContainer: null
            },
            Object.assign(this, this.defaults, e),
            this.options = e,
            this.namespace = "modular",
            this.html = document.documentElement,
            this.href = window.location.href,
            this.container = "data-" + this.name + "-container",
            this.subContainer = !1,
            this.prevTransition = null,
            this.loadAttributes = ["src", "srcset", "style", "href"],
            this.isInserted = !1,
            this.isLoading = !1,
            this.enterTimeout = !1,
            this.controller = new AbortController,
            this.classContainer = this.html,
            this.isChrome = -1 != navigator.userAgent.indexOf("Chrome"),
            this.init()
        }
        var e, i, n;
        return e = t,
        (i = [{
            key: "init",
            value: function() {
                var t = this;
                window.addEventListener("popstate", (function(e) {
                    return t.checkState(e)
                }
                ), !1),
                this.html.addEventListener("click", (function(e) {
                    return t.checkClick(e)
                }
                ), !1),
                this.loadEls(document)
            }
        }, {
            key: "checkClick",
            value: function(t) {
                if (!t.ctrlKey && !t.metaKey)
                    for (var e = t.target; e && e !== document; ) {
                        if (e.matches("a") && null == e.getAttribute("download")) {
                            var i = e.getAttribute("href");
                            i.startsWith("#") || i.startsWith("mailto:") || i.startsWith("tel:") || (t.preventDefault(),
                            this.reset(),
                            this.getClickOptions(e));
                            break
                        }
                        e = e.parentNode
                    }
            }
        }, {
            key: "checkState",
            value: function() {
                this.reset(),
                this.getStateOptions()
            }
        }, {
            key: "reset",
            value: function() {
                this.isLoading && (this.controller.abort(),
                this.isLoading = !1,
                this.controller = new AbortController),
                window.clearTimeout(this.enterTimeout),
                this.isInserted && this.removeContainer(),
                this.classContainer = this.html,
                Object.assign(this, this.defaults, this.options)
            }
        }, {
            key: "getClickOptions",
            value: function(t) {
                this.transition = t.getAttribute("data-" + this.name),
                this.isUrl = t.getAttribute("data-" + this.name + "-url");
                var e = t.getAttribute("href");
                "_blank" != t.getAttribute("target") ? "false" != this.transition ? this.setOptions(e, !0) : window.location = e : window.open(e, "_blank")
            }
        }, {
            key: "getStateOptions",
            value: function() {
                this.transitionsHistory ? this.transition = history.state : this.transition = !1;
                var t = window.location.href;
                this.setOptions(t)
            }
        }, {
            key: "goTo",
            value: function(t, e, i) {
                this.reset(),
                this.transition = e,
                this.isUrl = i,
                this.setOptions(t, !0)
            }
        }, {
            key: "setOptions",
            value: function(t, e) {
                var i, n = "[" + this.container + "]";
                this.transition && "true" != this.transition && (this.transitionContainer = "[" + this.container + '="' + this.transition + '"]',
                this.loadingClass = this.transitions[this.transition].loadingClass || this.loadingClass,
                this.loadedClass = this.transitions[this.transition].loadedClass || this.loadedClass,
                this.readyClass = this.transitions[this.transition].readyClass || this.readyClass,
                this.transitionsPrefix = this.transitions[this.transition].transitionsPrefix || this.transitionsPrefix,
                this.enterDelay = this.transitions[this.transition].enterDelay || this.enterDelay,
                this.exitDelay = this.transitions[this.transition].exitDelay || this.exitDelay,
                this.loadedDelay = this.transitions[this.transition].loadedDelay || this.loadedDelay,
                i = document.querySelector(this.transitionContainer)),
                i ? (n = this.transitionContainer,
                this.oldContainer = i,
                this.classContainer = this.oldContainer.parentNode,
                this.subContainer || history.replaceState(this.transition, null, this.href),
                this.subContainer = !0) : (this.oldContainer = document.querySelector(n),
                this.subContainer && history.replaceState(this.prevTransition, null, this.href),
                this.subContainer = !1),
                this.href = t,
                this.parentContainer = this.oldContainer.parentNode,
                "" === this.isUrl || null != this.isUrl && "false" != this.isUrl && 0 != this.isUrl ? history.pushState(this.transition, null, t) : (this.oldContainer.classList.add("is-old"),
                this.setLoading(),
                this.startEnterDelay(),
                this.loadHref(t, n, e))
            }
        }, {
            key: "setLoading",
            value: function() {
                this.classContainer.classList.remove(this.loadedClass, this.readyClass),
                this.classContainer.classList.add(this.loadingClass),
                this.classContainer.classList.remove(this.transitionsPrefix + this.prevTransition),
                this.transition && this.classContainer.classList.add(this.transitionsPrefix + this.transition),
                this.subContainer || (this.prevTransition = this.transition);
                var t = new Event(this.namespace + "loading");
                window.dispatchEvent(t)
            }
        }, {
            key: "startEnterDelay",
            value: function() {
                var t = this;
                this.enterTimeout = window.setTimeout((function() {
                    t.isEntered = !0,
                    t.isLoaded && t.transitionContainers()
                }
                ), this.enterDelay)
            }
        }, {
            key: "loadHref",
            value: function(t, e, i) {
                var n = this;
                this.isLoading = !0;
                var s = this.controller.signal;
                fetch(t, {
                    signal: s
                }).then((function(t) {
                    return t.text()
                }
                )).then((function(s) {
                    i && history.pushState(n.transition, null, t);
                    var o = new DOMParser;
                    n.data = o.parseFromString(s, "text/html"),
                    n.newContainer = n.data.querySelector(e),
                    n.newContainer.classList.add("is-new"),
                    n.parentNewContainer = n.newContainer.parentNode,
                    n.hideContainer(),
                    n.parentContainer.insertBefore(n.newContainer, n.oldContainer),
                    n.isInserted = !0,
                    n.setSvgs(),
                    n.isLoaded = !0,
                    n.isEntered && n.transitionContainers(),
                    n.loadEls(n.newContainer),
                    n.isLoading = !1
                }
                )).catch((function(e) {
                    window.location = t
                }
                ))
            }
        }, {
            key: "transitionContainers",
            value: function() {
                var t = this;
                this.setAttributes(),
                this.showContainer(),
                this.setLoaded(),
                setTimeout((function() {
                    t.removeContainer(),
                    t.setReady()
                }
                ), this.exitDelay)
            }
        }, {
            key: "setSvgs",
            value: function() {
                if (this.isChrome) {
                    var t = this.newContainer.querySelectorAll("use");
                    t.length && t.forEach((function(t) {
                        var e = t.getAttribute("xlink:href");
                        if (e)
                            t.parentNode.innerHTML = '<use xlink:href="' + e + '"></use>';
                        else {
                            var i = t.getAttribute("href");
                            i && (t.parentNode.innerHTML = '<use href="' + i + '"></use>')
                        }
                    }
                    ))
                }
            }
        }, {
            key: "setAttributes",
            value: function() {
                var t, e, i = this, n = this.data.getElementsByTagName("title")[0], s = this.data.head.querySelector('meta[name="description"]'), o = document.head.querySelector('meta[name="description"]');
                this.subContainer ? (e = this.parentNewContainer,
                t = document.querySelector(this.transitionContainer).parentNode) : (e = this.data.querySelector("html"),
                t = document.querySelector("html"));
                var r = Object.assign({}, e.dataset);
                n && (document.title = n.innerText),
                o && s && o.setAttribute("content", s.getAttribute("content")),
                r && Object.entries(r).forEach((function(e) {
                    var n = w(e, 2)
                      , s = n[0]
                      , o = n[1];
                    t.setAttribute("data-" + i.toDash(s), o)
                }
                ))
            }
        }, {
            key: "toDash",
            value: function(t) {
                return t.split(/(?=[A-Z])/).join("-").toLowerCase()
            }
        }, {
            key: "hideContainer",
            value: function() {
                this.newContainer.style.visibility = "hidden",
                this.newContainer.style.height = 0,
                this.newContainer.style.overflow = "hidden"
            }
        }, {
            key: "showContainer",
            value: function() {
                this.newContainer.style.visibility = "",
                this.newContainer.style.height = "",
                this.newContainer.style.overflow = ""
            }
        }, {
            key: "loadEls",
            value: function(t) {
                var e = this
                  , i = [];
                this.loadAttributes.forEach((function(n) {
                    var s = "data-" + e.name + "-" + n
                      , o = t.querySelectorAll("[" + s + "]");
                    o.length && o.forEach((function(t) {
                        var e = t.getAttribute(s);
                        if (t.setAttribute(n, e),
                        "src" == n || "srcset" == n) {
                            var o = new Promise((function(e) {
                                t.onload = function() {
                                    return e(t)
                                }
                            }
                            ));
                            i.push(o)
                        }
                    }
                    ))
                }
                )),
                Promise.all(i).then((function(t) {
                    var i = new Event(e.namespace + "images");
                    window.dispatchEvent(i)
                }
                ))
            }
        }, {
            key: "setLoaded",
            value: function() {
                var t = this;
                this.classContainer.classList.remove(this.loadingClass),
                setTimeout((function() {
                    t.classContainer.classList.add(t.loadedClass)
                }
                ), this.loadedDelay);
                var e = new Event(this.namespace + "loaded");
                window.dispatchEvent(e)
            }
        }, {
            key: "removeContainer",
            value: function() {
                this.parentContainer.removeChild(this.oldContainer),
                this.newContainer.classList.remove("is-new"),
                this.isInserted = !1
            }
        }, {
            key: "setReady",
            value: function() {
                this.classContainer.classList.add(this.readyClass);
                var t = new Event(this.namespace + "ready");
                window.dispatchEvent(t)
            }
        }, {
            key: "on",
            value: function(t, e) {
                var i = this;
                window.addEventListener(this.namespace + t, (function() {
                    switch (t) {
                    case "loading":
                        return e(i.transition, i.oldContainer);
                    case "loaded":
                        return e(i.transition, i.oldContainer, i.newContainer);
                    case "ready":
                        return e(i.transition, i.newContainer);
                    default:
                        return e()
                    }
                }
                ), !1)
            }
        }]) && b(e.prototype, i),
        n && b(e, n),
        t
    }()
      , x = document.documentElement
      , S = (x.getAttribute("data-debug"),
    function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            return u(this, i),
            e.call(this, t)
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this
                  , e = new E({
                    enterDelay: 1200,
                    transitions: {
                        question: {}
                    }
                });
                e.on("loading", (function(e, i) {
                    x.classList.add("is-transition"),
                    x.classList.add("has-first-transition"),
                    "question" === e ? (x.classList.add("is-question-transition"),
                    x.classList.remove("has-filters-open")) : x.classList.remove("has-dom-ready"),
                    t.call("close", null, "Popup")
                }
                )),
                e.on("loaded", (function(e, i, n) {
                    t.call("destroy", i, "app"),
                    t.call("update", n, "app"),
                    setTimeout((function() {
                        x.classList.add("has-dom-ready"),
                        setTimeout((function() {
                            x.classList.remove("is-transition")
                        }
                        ), 800)
                    }
                    ), 600),
                    "question" === e && (x.classList.remove("is-question-transition"),
                    setTimeout((function() {
                        t.call("update", null, "Scroll", "main"),
                        t.call("reinitEvents", null, "Scroll", "main"),
                        window.scroll.scroll.instance.scroll.y < 120 && t.call("scrollTo", {
                            target: document.querySelector(".js-question")
                        }, "Scroll", "main")
                    }
                    ), 100))
                }
                ))
            }
        }]),
        i
    }(c));
    function T(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function A(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function C(t, e, i) {
        return e && A(t.prototype, e),
        i && A(t, i),
        t
    }
    function M(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    function L(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e && (n = n.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            i.push.apply(i, n)
        }
        return i
    }
    function O(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2 ? L(Object(i), !0).forEach((function(e) {
                M(t, e, i[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : L(Object(i)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
            }
            ))
        }
        return t
    }
    function D(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }),
        e && I(t, e)
    }
    function j(t) {
        return (j = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }
        )(t)
    }
    function I(t, e) {
        return (I = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function B(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function _(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? B(t) : e
    }
    function R(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
                ))),
                !0
            } catch (t) {
                return !1
            }
        }();
        return function() {
            var i, n = j(t);
            if (e) {
                var s = j(this).constructor;
                i = Reflect.construct(n, arguments, s)
            } else
                i = n.apply(this, arguments);
            return _(this, i)
        }
    }
    function P(t, e, i) {
        return (P = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, i) {
            var n = function(t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = j(t)); )
                    ;
                return t
            }(t, e);
            if (n) {
                var s = Object.getOwnPropertyDescriptor(n, e);
                return s.get ? s.get.call(i) : s.value
            }
        }
        )(t, e, i || t)
    }
    function W(t, e) {
        return function(t) {
            if (Array.isArray(t))
                return t
        }(t) || function(t, e) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
                return;
            var i = []
              , n = !0
              , s = !1
              , o = void 0;
            try {
                for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value),
                !e || i.length !== e); n = !0)
                    ;
            } catch (t) {
                s = !0,
                o = t
            } finally {
                try {
                    n || null == a.return || a.return()
                } finally {
                    if (s)
                        throw o
                }
            }
            return i
        }(t, e) || z(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function H(t) {
        return function(t) {
            if (Array.isArray(t))
                return $(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
                return Array.from(t)
        }(t) || z(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function z(t, e) {
        if (t) {
            if ("string" == typeof t)
                return $(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === i && t.constructor && (i = t.constructor.name),
            "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? $(t, e) : void 0
        }
    }
    function $(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++)
            n[i] = t[i];
        return n
    }
    var N = {
        el: document,
        name: "scroll",
        offset: [0, 0],
        repeat: !1,
        smooth: !1,
        direction: "vertical",
        gestureDirection: "vertical",
        reloadOnContextChange: !1,
        lerp: .1,
        class: "is-inview",
        scrollbarContainer: !1,
        scrollbarClass: "c-scrollbar",
        scrollingClass: "has-scroll-scrolling",
        draggingClass: "has-scroll-dragging",
        smoothClass: "has-scroll-smooth",
        initClass: "has-scroll-init",
        getSpeed: !1,
        getDirection: !1,
        scrollFromAnywhere: !1,
        multiplier: 1,
        firefoxMultiplier: 50,
        touchMultiplier: 2,
        resetNativeScroll: !0,
        tablet: {
            smooth: !1,
            direction: "vertical",
            gestureDirection: "vertical",
            breakpoint: 1024
        },
        smartphone: {
            smooth: !1,
            direction: "vertical",
            gestureDirection: "vertical"
        }
    }
      , Y = function() {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            T(this, t),
            Object.assign(this, N, e),
            this.smartphone = N.smartphone,
            e.smartphone && Object.assign(this.smartphone, e.smartphone),
            this.tablet = N.tablet,
            e.tablet && Object.assign(this.tablet, e.tablet),
            this.namespace = "locomotive",
            this.html = document.documentElement,
            this.windowHeight = window.innerHeight,
            this.windowWidth = window.innerWidth,
            this.windowMiddle = {
                x: this.windowWidth / 2,
                y: this.windowHeight / 2
            },
            this.els = {},
            this.currentElements = {},
            this.listeners = {},
            this.hasScrollTicking = !1,
            this.hasCallEventSet = !1,
            this.checkScroll = this.checkScroll.bind(this),
            this.checkResize = this.checkResize.bind(this),
            this.checkEvent = this.checkEvent.bind(this),
            this.instance = {
                scroll: {
                    x: 0,
                    y: 0
                },
                limit: {
                    x: this.html.offsetHeight,
                    y: this.html.offsetHeight
                },
                currentElements: this.currentElements
            },
            this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop",
            this.isMobile && (this.direction = this[this.context].direction),
            "horizontal" === this.direction ? this.directionAxis = "x" : this.directionAxis = "y",
            this.getDirection && (this.instance.direction = null),
            this.getDirection && (this.instance.speed = 0),
            this.html.classList.add(this.initClass),
            window.addEventListener("resize", this.checkResize, !1)
        }
        return C(t, [{
            key: "init",
            value: function() {
                this.initEvents()
            }
        }, {
            key: "checkScroll",
            value: function() {
                this.dispatchScroll()
            }
        }, {
            key: "checkResize",
            value: function() {
                var t = this;
                this.resizeTick || (this.resizeTick = !0,
                requestAnimationFrame((function() {
                    t.resize(),
                    t.resizeTick = !1
                }
                )))
            }
        }, {
            key: "resize",
            value: function() {}
        }, {
            key: "checkContext",
            value: function() {
                if (this.reloadOnContextChange) {
                    this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint,
                    this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
                    var t = this.context;
                    if (this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop",
                    t != this.context)
                        ("desktop" == t ? this.smooth : this[t].smooth) != ("desktop" == this.context ? this.smooth : this[this.context].smooth) && window.location.reload()
                }
            }
        }, {
            key: "initEvents",
            value: function() {
                var t = this;
                this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]")),
                this.setScrollTo = this.setScrollTo.bind(this),
                this.scrollToEls.forEach((function(e) {
                    e.addEventListener("click", t.setScrollTo, !1)
                }
                ))
            }
        }, {
            key: "setScrollTo",
            value: function(t) {
                t.preventDefault(),
                this.scrollTo(t.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t.currentTarget.getAttribute("href"), {
                    offset: t.currentTarget.getAttribute("data-".concat(this.name, "-offset"))
                })
            }
        }, {
            key: "addElements",
            value: function() {}
        }, {
            key: "detectElements",
            value: function(t) {
                var e = this
                  , i = this.instance.scroll.y
                  , n = i + this.windowHeight
                  , s = this.instance.scroll.x
                  , o = s + this.windowWidth;
                Object.entries(this.els).forEach((function(r) {
                    var a = W(r, 2)
                      , l = a[0]
                      , c = a[1];
                    if (!c || c.inView && !t || ("horizontal" === e.direction ? o >= c.left && s < c.right && e.setInView(c, l) : n >= c.top && i < c.bottom && e.setInView(c, l)),
                    c && c.inView)
                        if ("horizontal" === e.direction) {
                            var h = c.right - c.left;
                            c.progress = (e.instance.scroll.x - (c.left - e.windowWidth)) / (h + e.windowWidth),
                            (o < c.left || s > c.right) && e.setOutOfView(c, l)
                        } else {
                            var u = c.bottom - c.top;
                            c.progress = (e.instance.scroll.y - (c.top - e.windowHeight)) / (u + e.windowHeight),
                            (n < c.top || i > c.bottom) && e.setOutOfView(c, l)
                        }
                }
                )),
                this.hasScrollTicking = !1
            }
        }, {
            key: "setInView",
            value: function(t, e) {
                this.els[e].inView = !0,
                t.el.classList.add(t.class),
                this.currentElements[e] = t,
                t.call && this.hasCallEventSet && (this.dispatchCall(t, "enter"),
                t.repeat || (this.els[e].call = !1))
            }
        }, {
            key: "setOutOfView",
            value: function(t, e) {
                var i = this;
                this.els[e].inView = !1,
                Object.keys(this.currentElements).forEach((function(t) {
                    t === e && delete i.currentElements[t]
                }
                )),
                t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"),
                t.repeat && t.el.classList.remove(t.class)
            }
        }, {
            key: "dispatchCall",
            value: function(t, e) {
                this.callWay = e,
                this.callValue = t.call.split(",").map((function(t) {
                    return t.trim()
                }
                )),
                this.callObj = t,
                1 == this.callValue.length && (this.callValue = this.callValue[0]);
                var i = new Event(this.namespace + "call");
                this.el.dispatchEvent(i)
            }
        }, {
            key: "dispatchScroll",
            value: function() {
                var t = new Event(this.namespace + "scroll");
                this.el.dispatchEvent(t)
            }
        }, {
            key: "setEvents",
            value: function(t, e) {
                this.listeners[t] || (this.listeners[t] = []);
                var i = this.listeners[t];
                i.push(e),
                1 === i.length && this.el.addEventListener(this.namespace + t, this.checkEvent, !1),
                "call" === t && (this.hasCallEventSet = !0,
                this.detectElements(!0))
            }
        }, {
            key: "unsetEvents",
            value: function(t, e) {
                if (this.listeners[t]) {
                    var i = this.listeners[t]
                      , n = i.indexOf(e);
                    n < 0 || (i.splice(n, 1),
                    0 === i.index && this.el.removeEventListener(this.namespace + t, this.checkEvent, !1))
                }
            }
        }, {
            key: "checkEvent",
            value: function(t) {
                var e = this
                  , i = t.type.replace(this.namespace, "")
                  , n = this.listeners[i];
                n && 0 !== n.length && n.forEach((function(t) {
                    switch (i) {
                    case "scroll":
                        return t(e.instance);
                    case "call":
                        return t(e.callValue, e.callWay, e.callObj);
                    default:
                        return t()
                    }
                }
                ))
            }
        }, {
            key: "startScroll",
            value: function() {}
        }, {
            key: "stopScroll",
            value: function() {}
        }, {
            key: "setScroll",
            value: function(t, e) {
                this.instance.scroll = {
                    x: 0,
                    y: 0
                }
            }
        }, {
            key: "destroy",
            value: function() {
                var t = this;
                window.removeEventListener("resize", this.checkResize, !1),
                Object.keys(this.listeners).forEach((function(e) {
                    t.el.removeEventListener(t.namespace + e, t.checkEvent, !1)
                }
                )),
                this.listeners = {},
                this.scrollToEls.forEach((function(e) {
                    e.removeEventListener("click", t.setScrollTo, !1)
                }
                )),
                this.html.classList.remove(this.initClass)
            }
        }]),
        t
    }()
      , V = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function q(t, e) {
        return t(e = {
            exports: {}
        }, e.exports),
        e.exports
    }
    var X = q((function(t, e) {
        t.exports = {
            polyfill: function() {
                var t = window
                  , e = document;
                if (!("scrollBehavior"in e.documentElement.style) || !0 === t.__forceSmoothScrollPolyfill__) {
                    var i, n = t.HTMLElement || t.Element, s = {
                        scroll: t.scroll || t.scrollTo,
                        scrollBy: t.scrollBy,
                        elementScroll: n.prototype.scroll || a,
                        scrollIntoView: n.prototype.scrollIntoView
                    }, o = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now, r = (i = t.navigator.userAgent,
                    new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(i) ? 1 : 0);
                    t.scroll = t.scrollTo = function() {
                        void 0 !== arguments[0] && (!0 !== l(arguments[0]) ? p.call(t, e.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset) : s.scroll.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset))
                    }
                    ,
                    t.scrollBy = function() {
                        void 0 !== arguments[0] && (l(arguments[0]) ? s.scrollBy.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : p.call(t, e.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset)))
                    }
                    ,
                    n.prototype.scroll = n.prototype.scrollTo = function() {
                        if (void 0 !== arguments[0])
                            if (!0 !== l(arguments[0])) {
                                var t = arguments[0].left
                                  , e = arguments[0].top;
                                p.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e)
                            } else {
                                if ("number" == typeof arguments[0] && void 0 === arguments[1])
                                    throw new SyntaxError("Value could not be converted");
                                s.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                            }
                    }
                    ,
                    n.prototype.scrollBy = function() {
                        void 0 !== arguments[0] && (!0 !== l(arguments[0]) ? this.scroll({
                            left: ~~arguments[0].left + this.scrollLeft,
                            top: ~~arguments[0].top + this.scrollTop,
                            behavior: arguments[0].behavior
                        }) : s.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
                    }
                    ,
                    n.prototype.scrollIntoView = function() {
                        if (!0 !== l(arguments[0])) {
                            var i = d(this)
                              , n = i.getBoundingClientRect()
                              , o = this.getBoundingClientRect();
                            i !== e.body ? (p.call(this, i, i.scrollLeft + o.left - n.left, i.scrollTop + o.top - n.top),
                            "fixed" !== t.getComputedStyle(i).position && t.scrollBy({
                                left: n.left,
                                top: n.top,
                                behavior: "smooth"
                            })) : t.scrollBy({
                                left: o.left,
                                top: o.top,
                                behavior: "smooth"
                            })
                        } else
                            s.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                    }
                }
                function a(t, e) {
                    this.scrollLeft = t,
                    this.scrollTop = e
                }
                function l(t) {
                    if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior)
                        return !0;
                    if ("object" == typeof t && "smooth" === t.behavior)
                        return !1;
                    throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.")
                }
                function c(t, e) {
                    return "Y" === e ? t.clientHeight + r < t.scrollHeight : "X" === e ? t.clientWidth + r < t.scrollWidth : void 0
                }
                function h(e, i) {
                    var n = t.getComputedStyle(e, null)["overflow" + i];
                    return "auto" === n || "scroll" === n
                }
                function u(t) {
                    var e = c(t, "Y") && h(t, "Y")
                      , i = c(t, "X") && h(t, "X");
                    return e || i
                }
                function d(t) {
                    for (; t !== e.body && !1 === u(t); )
                        t = t.parentNode || t.host;
                    return t
                }
                function f(e) {
                    var i, n, s, r, a = (o() - e.startTime) / 468;
                    r = a = a > 1 ? 1 : a,
                    i = .5 * (1 - Math.cos(Math.PI * r)),
                    n = e.startX + (e.x - e.startX) * i,
                    s = e.startY + (e.y - e.startY) * i,
                    e.method.call(e.scrollable, n, s),
                    n === e.x && s === e.y || t.requestAnimationFrame(f.bind(t, e))
                }
                function p(i, n, r) {
                    var l, c, h, u, d = o();
                    i === e.body ? (l = t,
                    c = t.scrollX || t.pageXOffset,
                    h = t.scrollY || t.pageYOffset,
                    u = s.scroll) : (l = i,
                    c = i.scrollLeft,
                    h = i.scrollTop,
                    u = a),
                    f({
                        scrollable: l,
                        method: u,
                        startTime: d,
                        startX: c,
                        startY: h,
                        x: n,
                        y: r
                    })
                }
            }
        }
    }
    ))
      , F = (X.polyfill,
    function(t) {
        D(i, t);
        var e = R(i);
        function i() {
            var t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return T(this, i),
            (t = e.call(this, n)).resetNativeScroll && (history.scrollRestoration && (history.scrollRestoration = "manual"),
            window.scrollTo(0, 0)),
            window.addEventListener("scroll", t.checkScroll, !1),
            void 0 === window.smoothscrollPolyfill && (window.smoothscrollPolyfill = X,
            window.smoothscrollPolyfill.polyfill()),
            t
        }
        return C(i, [{
            key: "init",
            value: function() {
                this.instance.scroll.y = window.pageYOffset,
                this.addElements(),
                this.detectElements(),
                P(j(i.prototype), "init", this).call(this)
            }
        }, {
            key: "checkScroll",
            value: function() {
                var t = this;
                P(j(i.prototype), "checkScroll", this).call(this),
                this.getDirection && this.addDirection(),
                this.getSpeed && (this.addSpeed(),
                this.speedTs = Date.now()),
                this.instance.scroll.y = window.pageYOffset,
                Object.entries(this.els).length && (this.hasScrollTicking || (requestAnimationFrame((function() {
                    t.detectElements()
                }
                )),
                this.hasScrollTicking = !0))
            }
        }, {
            key: "addDirection",
            value: function() {
                window.pageYOffset > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : window.pageYOffset < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up")
            }
        }, {
            key: "addSpeed",
            value: function() {
                window.pageYOffset != this.instance.scroll.y ? this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0
            }
        }, {
            key: "resize",
            value: function() {
                Object.entries(this.els).length && (this.windowHeight = window.innerHeight,
                this.updateElements())
            }
        }, {
            key: "addElements",
            value: function() {
                var t = this;
                this.els = {},
                this.el.querySelectorAll("[data-" + this.name + "]").forEach((function(e, i) {
                    e.getBoundingClientRect();
                    var n, s, o, r = e.dataset[t.name + "Class"] || t.class, a = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : i, l = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset, c = e.dataset[t.name + "Repeat"], h = e.dataset[t.name + "Call"], u = e.dataset[t.name + "Target"], d = (o = void 0 !== u ? document.querySelector("".concat(u)) : e).getBoundingClientRect();
                    n = d.top + t.instance.scroll.y,
                    s = d.left + t.instance.scroll.x;
                    var f = n + o.offsetHeight
                      , p = s + o.offsetWidth;
                    "#header" === u && console.log(n, f),
                    c = "false" != c && (null != c || t.repeat);
                    var v = t.getRelativeOffset(l)
                      , m = {
                        el: e,
                        targetEl: o,
                        id: a,
                        class: r,
                        top: n += v[0],
                        bottom: f -= v[1],
                        left: s,
                        right: p,
                        offset: l,
                        progress: 0,
                        repeat: c,
                        inView: !1,
                        call: h
                    };
                    t.els[a] = m,
                    e.classList.contains(r) && t.setInView(t.els[a], a)
                }
                ))
            }
        }, {
            key: "updateElements",
            value: function() {
                var t = this;
                Object.entries(this.els).forEach((function(e) {
                    var i = W(e, 2)
                      , n = i[0]
                      , s = i[1]
                      , o = s.targetEl.getBoundingClientRect().top + t.instance.scroll.y
                      , r = o + s.targetEl.offsetHeight
                      , a = t.getRelativeOffset(s.offset);
                    t.els[n].top = o + a[0],
                    t.els[n].bottom = r - a[1]
                }
                )),
                this.hasScrollTicking = !1
            }
        }, {
            key: "getRelativeOffset",
            value: function(t) {
                var e = [0, 0];
                if (t)
                    for (var i = 0; i < t.length; i++)
                        "string" == typeof t[i] ? t[i].includes("%") ? e[i] = parseInt(t[i].replace("%", "") * this.windowHeight / 100) : e[i] = parseInt(t[i]) : e[i] = t[i];
                return e
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , i = parseInt(e.offset) || 0
                  , n = !!e.callback && e.callback;
                if ("string" == typeof t) {
                    if ("top" === t)
                        t = this.html;
                    else if ("bottom" === t)
                        t = this.html.offsetHeight - window.innerHeight;
                    else if (!(t = document.querySelector(t)))
                        return
                } else if ("number" == typeof t)
                    t = parseInt(t);
                else if (!t || !t.tagName)
                    return void console.warn("`target` parameter is not valid");
                if (i = "number" != typeof t ? t.getBoundingClientRect().top + i + this.instance.scroll.y : t + i,
                n) {
                    i = i.toFixed();
                    var s = function t() {
                        window.pageYOffset.toFixed() === i && (window.removeEventListener("scroll", t),
                        n())
                    };
                    window.addEventListener("scroll", s)
                }
                window.scrollTo({
                    top: i,
                    behavior: "smooth"
                })
            }
        }, {
            key: "update",
            value: function() {
                this.addElements(),
                this.detectElements()
            }
        }, {
            key: "destroy",
            value: function() {
                P(j(i.prototype), "destroy", this).call(this),
                window.removeEventListener("scroll", this.checkScroll, !1)
            }
        }]),
        i
    }(Y))
      , U = Object.getOwnPropertySymbols
      , K = Object.prototype.hasOwnProperty
      , G = Object.prototype.propertyIsEnumerable;
    function Z(t) {
        if (null == t)
            throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(t)
    }
    var Q = function() {
        try {
            if (!Object.assign)
                return !1;
            var t = new String("abc");
            if (t[5] = "de",
            "5" === Object.getOwnPropertyNames(t)[0])
                return !1;
            for (var e = {}, i = 0; i < 10; i++)
                e["_" + String.fromCharCode(i)] = i;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map((function(t) {
                return e[t]
            }
            )).join(""))
                return !1;
            var n = {};
            return "abcdefghijklmnopqrst".split("").forEach((function(t) {
                n[t] = t
            }
            )),
            "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
        } catch (t) {
            return !1
        }
    }() ? Object.assign : function(t, e) {
        for (var i, n, s = Z(t), o = 1; o < arguments.length; o++) {
            for (var r in i = Object(arguments[o]))
                K.call(i, r) && (s[r] = i[r]);
            if (U) {
                n = U(i);
                for (var a = 0; a < n.length; a++)
                    G.call(i, n[a]) && (s[n[a]] = i[n[a]])
            }
        }
        return s
    }
    ;
    function J() {}
    J.prototype = {
        on: function(t, e, i) {
            var n = this.e || (this.e = {});
            return (n[t] || (n[t] = [])).push({
                fn: e,
                ctx: i
            }),
            this
        },
        once: function(t, e, i) {
            var n = this;
            function s() {
                n.off(t, s),
                e.apply(i, arguments)
            }
            return s._ = e,
            this.on(t, s, i)
        },
        emit: function(t) {
            for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), n = 0, s = i.length; n < s; n++)
                i[n].fn.apply(i[n].ctx, e);
            return this
        },
        off: function(t, e) {
            var i = this.e || (this.e = {})
              , n = i[t]
              , s = [];
            if (n && e)
                for (var o = 0, r = n.length; o < r; o++)
                    n[o].fn !== e && n[o].fn._ !== e && s.push(n[o]);
            return s.length ? i[t] = s : delete i[t],
            this
        }
    };
    var tt = J
      , et = q((function(t, e) {
        (function() {
            (null !== e ? e : this).Lethargy = function() {
                function t(t, e, i, n) {
                    this.stability = null != t ? Math.abs(t) : 8,
                    this.sensitivity = null != e ? 1 + Math.abs(e) : 100,
                    this.tolerance = null != i ? 1 + Math.abs(i) : 1.1,
                    this.delay = null != n ? n : 150,
                    this.lastUpDeltas = function() {
                        var t, e, i;
                        for (i = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }
                    .call(this),
                    this.lastDownDeltas = function() {
                        var t, e, i;
                        for (i = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }
                    .call(this),
                    this.deltasTimestamp = function() {
                        var t, e, i;
                        for (i = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }
                    .call(this)
                }
                return t.prototype.check = function(t) {
                    var e;
                    return null != (t = t.originalEvent || t).wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail),
                    this.deltasTimestamp.push(Date.now()),
                    this.deltasTimestamp.shift(),
                    e > 0 ? (this.lastUpDeltas.push(e),
                    this.lastUpDeltas.shift(),
                    this.isInertia(1)) : (this.lastDownDeltas.push(e),
                    this.lastDownDeltas.shift(),
                    this.isInertia(-1))
                }
                ,
                t.prototype.isInertia = function(t) {
                    var e, i, n, s, o, r, a;
                    return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (n = e.slice(0, this.stability),
                    i = e.slice(this.stability, 2 * this.stability),
                    a = n.reduce((function(t, e) {
                        return t + e
                    }
                    )),
                    o = i.reduce((function(t, e) {
                        return t + e
                    }
                    )),
                    r = a / n.length,
                    s = o / i.length,
                    Math.abs(r) < Math.abs(s * this.tolerance) && this.sensitivity < Math.abs(s) && t)
                }
                ,
                t.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas
                }
                ,
                t.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas
                }
                ,
                t
            }()
        }
        ).call(V)
    }
    ))
      , it = {
        hasWheelEvent: "onwheel"in document,
        hasMouseWheelEvent: "onmousewheel"in document,
        hasTouch: "ontouchstart"in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
        hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
        hasPointer: !!window.navigator.msPointerEnabled,
        hasKeyDown: "onkeydown"in document,
        isFirefox: navigator.userAgent.indexOf("Firefox") > -1
    }
      , nt = Object.prototype.toString
      , st = Object.prototype.hasOwnProperty;
    function ot(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    var rt = et.Lethargy
      , at = "virtualscroll"
      , lt = pt
      , ct = 37
      , ht = 38
      , ut = 39
      , dt = 40
      , ft = 32;
    function pt(t) {
        !function(t) {
            if (!t)
                return console.warn("bindAll requires at least one argument.");
            var e = Array.prototype.slice.call(arguments, 1);
            if (0 === e.length)
                for (var i in t)
                    st.call(t, i) && "function" == typeof t[i] && "[object Function]" == nt.call(t[i]) && e.push(i);
            for (var n = 0; n < e.length; n++) {
                var s = e[n];
                t[s] = ot(t[s], t)
            }
        }(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"),
        this.el = window,
        t && t.el && (this.el = t.el,
        delete t.el),
        this.options = Q({
            mouseMultiplier: 1,
            touchMultiplier: 2,
            firefoxMultiplier: 15,
            keyStep: 120,
            preventTouch: !1,
            unpreventTouchClass: "vs-touchmove-allowed",
            limitInertia: !1,
            useKeyboard: !0,
            useTouch: !0
        }, t),
        this.options.limitInertia && (this._lethargy = new rt),
        this._emitter = new tt,
        this._event = {
            y: 0,
            x: 0,
            deltaX: 0,
            deltaY: 0
        },
        this.touchStartX = null,
        this.touchStartY = null,
        this.bodyTouchAction = null,
        void 0 !== this.options.passive && (this.listenerOptions = {
            passive: this.options.passive
        })
    }
    function vt(t, e, i) {
        return (1 - i) * t + i * e
    }
    function mt(t) {
        var e = {};
        if (window.getComputedStyle) {
            var i = getComputedStyle(t)
              , n = i.transform || i.webkitTransform || i.mozTransform
              , s = n.match(/^matrix3d\((.+)\)$/);
            return s ? (e.x = s ? parseFloat(s[1].split(", ")[12]) : 0,
            e.y = s ? parseFloat(s[1].split(", ")[13]) : 0) : (s = n.match(/^matrix\((.+)\)$/),
            e.x = s ? parseFloat(s[1].split(", ")[4]) : 0,
            e.y = s ? parseFloat(s[1].split(", ")[5]) : 0),
            e
        }
    }
    function yt(t) {
        for (var e = []; t && t !== document; t = t.parentNode)
            e.push(t);
        return e
    }
    pt.prototype._notify = function(t) {
        var e = this._event;
        e.x += e.deltaX,
        e.y += e.deltaY,
        this._emitter.emit(at, {
            x: e.x,
            y: e.y,
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            originalEvent: t
        })
    }
    ,
    pt.prototype._onWheel = function(t) {
        var e = this.options;
        if (!this._lethargy || !1 !== this._lethargy.check(t)) {
            var i = this._event;
            i.deltaX = t.wheelDeltaX || -1 * t.deltaX,
            i.deltaY = t.wheelDeltaY || -1 * t.deltaY,
            it.isFirefox && 1 == t.deltaMode && (i.deltaX *= e.firefoxMultiplier,
            i.deltaY *= e.firefoxMultiplier),
            i.deltaX *= e.mouseMultiplier,
            i.deltaY *= e.mouseMultiplier,
            this._notify(t)
        }
    }
    ,
    pt.prototype._onMouseWheel = function(t) {
        if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
            var e = this._event;
            e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0,
            e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta,
            this._notify(t)
        }
    }
    ,
    pt.prototype._onTouchStart = function(t) {
        var e = t.targetTouches ? t.targetTouches[0] : t;
        this.touchStartX = e.pageX,
        this.touchStartY = e.pageY
    }
    ,
    pt.prototype._onTouchMove = function(t) {
        var e = this.options;
        e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
        var i = this._event
          , n = t.targetTouches ? t.targetTouches[0] : t;
        i.deltaX = (n.pageX - this.touchStartX) * e.touchMultiplier,
        i.deltaY = (n.pageY - this.touchStartY) * e.touchMultiplier,
        this.touchStartX = n.pageX,
        this.touchStartY = n.pageY,
        this._notify(t)
    }
    ,
    pt.prototype._onKeyDown = function(t) {
        var e = this._event;
        e.deltaX = e.deltaY = 0;
        var i = window.innerHeight - 40;
        switch (t.keyCode) {
        case ct:
        case ht:
            e.deltaY = this.options.keyStep;
            break;
        case ut:
        case dt:
            e.deltaY = -this.options.keyStep;
            break;
        case t.shiftKey:
            e.deltaY = i;
            break;
        case ft:
            e.deltaY = -i;
            break;
        default:
            return
        }
        this._notify(t)
    }
    ,
    pt.prototype._bind = function() {
        it.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions),
        it.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions),
        it.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions),
        this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)),
        it.hasPointer && it.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction,
        document.body.style.msTouchAction = "none",
        this.el.addEventListener("MSPointerDown", this._onTouchStart, !0),
        this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)),
        it.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown)
    }
    ,
    pt.prototype._unbind = function() {
        it.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel),
        it.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel),
        it.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart),
        this.el.removeEventListener("touchmove", this._onTouchMove)),
        it.hasPointer && it.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction,
        this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0),
        this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)),
        it.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
    }
    ,
    pt.prototype.on = function(t, e) {
        this._emitter.on(at, t, e);
        var i = this._emitter.e;
        i && i[at] && 1 === i[at].length && this._bind()
    }
    ,
    pt.prototype.off = function(t, e) {
        this._emitter.off(at, t, e);
        var i = this._emitter.e;
        (!i[at] || i[at].length <= 0) && this._unbind()
    }
    ,
    pt.prototype.reset = function() {
        var t = this._event;
        t.x = 0,
        t.y = 0
    }
    ,
    pt.prototype.destroy = function() {
        this._emitter.off(),
        this._unbind()
    }
    ;
    var gt = "function" == typeof Float32Array;
    function bt(t, e) {
        return 1 - 3 * e + 3 * t
    }
    function wt(t, e) {
        return 3 * e - 6 * t
    }
    function kt(t) {
        return 3 * t
    }
    function Et(t, e, i) {
        return ((bt(e, i) * t + wt(e, i)) * t + kt(e)) * t
    }
    function xt(t, e, i) {
        return 3 * bt(e, i) * t * t + 2 * wt(e, i) * t + kt(e)
    }
    function St(t) {
        return t
    }
    var Tt = function(t, e, i, n) {
        if (!(0 <= t && t <= 1 && 0 <= i && i <= 1))
            throw new Error("bezier x values must be in [0, 1] range");
        if (t === e && i === n)
            return St;
        for (var s = gt ? new Float32Array(11) : new Array(11), o = 0; o < 11; ++o)
            s[o] = Et(.1 * o, t, i);
        function r(e) {
            for (var n = 0, o = 1; 10 !== o && s[o] <= e; ++o)
                n += .1;
            --o;
            var r = n + .1 * ((e - s[o]) / (s[o + 1] - s[o]))
              , a = xt(r, t, i);
            return a >= .001 ? function(t, e, i, n) {
                for (var s = 0; s < 4; ++s) {
                    var o = xt(e, i, n);
                    if (0 === o)
                        return e;
                    e -= (Et(e, i, n) - t) / o
                }
                return e
            }(e, r, t, i) : 0 === a ? r : function(t, e, i, n, s) {
                var o, r, a = 0;
                do {
                    (o = Et(r = e + (i - e) / 2, n, s) - t) > 0 ? i = r : e = r
                } while (Math.abs(o) > 1e-7 && ++a < 10);
                return r
            }(e, n, n + .1, t, i)
        }
        return function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : Et(r(t), e, n)
        }
    }
      , At = 38
      , Ct = 40
      , Mt = 32
      , Lt = 9
      , Ot = 33
      , Dt = 34
      , jt = 36
      , It = 35
      , Bt = function(t) {
        D(i, t);
        var e = R(i);
        function i() {
            var t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return T(this, i),
            history.scrollRestoration && (history.scrollRestoration = "manual"),
            window.scrollTo(0, 0),
            (t = e.call(this, n)).inertia && (t.lerp = .1 * t.inertia),
            t.isScrolling = !1,
            t.isDraggingScrollbar = !1,
            t.isTicking = !1,
            t.hasScrollTicking = !1,
            t.parallaxElements = {},
            t.stop = !1,
            t.scrollbarContainer = n.scrollbarContainer,
            t.checkKey = t.checkKey.bind(B(t)),
            window.addEventListener("keydown", t.checkKey, !1),
            t
        }
        return C(i, [{
            key: "init",
            value: function() {
                var t = this;
                this.html.classList.add(this.smoothClass),
                this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction),
                this.instance = O({
                    delta: {
                        x: 0,
                        y: 0
                    }
                }, this.instance),
                this.vs = new lt({
                    el: this.scrollFromAnywhere ? document : this.el,
                    mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : .4,
                    firefoxMultiplier: this.firefoxMultiplier,
                    touchMultiplier: this.touchMultiplier,
                    useKeyboard: !1,
                    passive: !0
                }),
                this.vs.on((function(e) {
                    t.stop || t.isDraggingScrollbar || requestAnimationFrame((function() {
                        t.updateDelta(e),
                        t.isScrolling || t.startScrolling()
                    }
                    ))
                }
                )),
                this.setScrollLimit(),
                this.initScrollBar(),
                this.addSections(),
                this.addElements(),
                this.checkScroll(!0),
                this.transformElements(!0, !0),
                P(j(i.prototype), "init", this).call(this)
            }
        }, {
            key: "setScrollLimit",
            value: function() {
                if (this.instance.limit.y = this.el.offsetHeight - this.windowHeight,
                "horizontal" === this.direction) {
                    for (var t = 0, e = this.el.children, i = 0; i < e.length; i++)
                        t += e[i].offsetWidth;
                    this.instance.limit.x = t - this.windowWidth
                }
            }
        }, {
            key: "startScrolling",
            value: function() {
                this.startScrollTs = Date.now(),
                this.isScrolling = !0,
                this.checkScroll(),
                this.html.classList.add(this.scrollingClass)
            }
        }, {
            key: "stopScrolling",
            value: function() {
                cancelAnimationFrame(this.checkScrollRaf),
                this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf),
                this.scrollToRaf = null),
                this.isScrolling = !1,
                this.instance.scroll.y = Math.round(this.instance.scroll.y),
                this.html.classList.remove(this.scrollingClass)
            }
        }, {
            key: "checkKey",
            value: function(t) {
                var e = this;
                if (this.stop)
                    t.keyCode == Lt && requestAnimationFrame((function() {
                        e.html.scrollTop = 0,
                        document.body.scrollTop = 0,
                        e.html.scrollLeft = 0,
                        document.body.scrollLeft = 0
                    }
                    ));
                else {
                    switch (t.keyCode) {
                    case Lt:
                        requestAnimationFrame((function() {
                            e.html.scrollTop = 0,
                            document.body.scrollTop = 0,
                            e.html.scrollLeft = 0,
                            document.body.scrollLeft = 0,
                            e.scrollTo(document.activeElement, {
                                offset: -window.innerHeight / 2
                            })
                        }
                        ));
                        break;
                    case At:
                        this.instance.delta[this.directionAxis] -= 240;
                        break;
                    case Ct:
                        this.instance.delta[this.directionAxis] += 240;
                        break;
                    case Ot:
                        this.instance.delta[this.directionAxis] -= window.innerHeight;
                        break;
                    case Dt:
                        this.instance.delta[this.directionAxis] += window.innerHeight;
                        break;
                    case jt:
                        this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
                        break;
                    case It:
                        this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
                        break;
                    case Mt:
                        document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || (t.shiftKey ? this.instance.delta[this.directionAxis] -= window.innerHeight : this.instance.delta[this.directionAxis] += window.innerHeight);
                        break;
                    default:
                        return
                    }
                    this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0),
                    this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]),
                    this.stopScrolling(),
                    this.isScrolling = !0,
                    this.checkScroll(),
                    this.html.classList.add(this.scrollingClass)
                }
            }
        }, {
            key: "checkScroll",
            value: function() {
                var t = this
                  , e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (e || this.isScrolling || this.isDraggingScrollbar) {
                    this.hasScrollTicking || (this.checkScrollRaf = requestAnimationFrame((function() {
                        return t.checkScroll()
                    }
                    )),
                    this.hasScrollTicking = !0),
                    this.updateScroll();
                    var n = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis])
                      , s = Date.now() - this.startScrollTs;
                    if (!this.animatingScroll && s > 100 && (n < .5 && 0 != this.instance.delta[this.directionAxis] || n < .5 && 0 == this.instance.delta[this.directionAxis]) && this.stopScrolling(),
                    Object.entries(this.sections).forEach((function(e) {
                        var i = W(e, 2)
                          , n = (i[0],
                        i[1]);
                        n.persistent || t.instance.scroll[t.directionAxis] > n.offset[t.directionAxis] && t.instance.scroll[t.directionAxis] < n.limit[t.directionAxis] ? ("horizontal" === t.direction ? t.transform(n.el, -t.instance.scroll[t.directionAxis], 0) : t.transform(n.el, 0, -t.instance.scroll[t.directionAxis]),
                        n.inView || (n.inView = !0,
                        n.el.style.opacity = 1,
                        n.el.style.pointerEvents = "all",
                        n.el.setAttribute("data-".concat(t.name, "-section-inview"), ""))) : (n.inView && (n.inView = !1,
                        n.el.style.opacity = 0,
                        n.el.style.pointerEvents = "none",
                        n.el.removeAttribute("data-".concat(t.name, "-section-inview"))),
                        t.transform(n.el, 0, 0))
                    }
                    )),
                    this.getDirection && this.addDirection(),
                    this.getSpeed && (this.addSpeed(),
                    this.speedTs = Date.now()),
                    this.detectElements(),
                    this.transformElements(),
                    this.hasScrollbar) {
                        var o = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];
                        "horizontal" === this.direction ? this.transform(this.scrollbarThumb, o, 0) : this.transform(this.scrollbarThumb, 0, o)
                    }
                    P(j(i.prototype), "checkScroll", this).call(this),
                    this.hasScrollTicking = !1
                }
            }
        }, {
            key: "resize",
            value: function() {
                this.windowHeight = window.innerHeight,
                this.windowWidth = window.innerWidth,
                this.checkContext(),
                this.windowMiddle = {
                    x: this.windowWidth / 2,
                    y: this.windowHeight / 2
                },
                this.update()
            }
        }, {
            key: "updateDelta",
            value: function(t) {
                var e, i = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
                e = "both" === i ? t.deltaX + t.deltaY : "vertical" === i ? t.deltaY : "horizontal" === i ? t.deltaX : t.deltaY,
                this.instance.delta[this.directionAxis] -= e * this.multiplier,
                this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0),
                this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis])
            }
        }, {
            key: "updateScroll",
            value: function(t) {
                this.isScrolling || this.isDraggingScrollbar ? this.instance.scroll[this.directionAxis] = vt(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp) : this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis] ? this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]) : this.instance.scroll.y < 0 ? this.setScroll(this.instance.scroll[this.directionAxis], 0) : this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis])
            }
        }, {
            key: "addDirection",
            value: function() {
                this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up"),
                this.instance.delta.x > this.instance.scroll.x ? "right" !== this.instance.direction && (this.instance.direction = "right") : this.instance.delta.x < this.instance.scroll.x && "left" !== this.instance.direction && (this.instance.direction = "left")
            }
        }, {
            key: "addSpeed",
            value: function() {
                this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis] ? this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0
            }
        }, {
            key: "initScrollBar",
            value: function() {
                if (this.scrollbar = document.createElement("span"),
                this.scrollbarThumb = document.createElement("span"),
                this.scrollbar.classList.add("".concat(this.scrollbarClass)),
                this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")),
                this.scrollbar.append(this.scrollbarThumb),
                this.scrollbarContainer ? this.scrollbarContainer.append(this.scrollbar) : document.body.append(this.scrollbar),
                this.getScrollBar = this.getScrollBar.bind(this),
                this.releaseScrollBar = this.releaseScrollBar.bind(this),
                this.moveScrollBar = this.moveScrollBar.bind(this),
                this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar),
                window.addEventListener("mouseup", this.releaseScrollBar),
                window.addEventListener("mousemove", this.moveScrollBar),
                this.hasScrollbar = !1,
                "horizontal" == this.direction) {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth)
                        return
                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight)
                    return;
                this.hasScrollbar = !0,
                this.scrollbarBCR = this.scrollbar.getBoundingClientRect(),
                this.scrollbarHeight = this.scrollbarBCR.height,
                this.scrollbarWidth = this.scrollbarBCR.width,
                "horizontal" === this.direction ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"),
                this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(),
                this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                }
            }
        }, {
            key: "reinitScrollBar",
            value: function() {
                if (this.hasScrollbar = !1,
                "horizontal" == this.direction) {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth)
                        return
                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight)
                    return;
                this.hasScrollbar = !0,
                this.scrollbarBCR = this.scrollbar.getBoundingClientRect(),
                this.scrollbarHeight = this.scrollbarBCR.height,
                this.scrollbarWidth = this.scrollbarBCR.width,
                "horizontal" === this.direction ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"),
                this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(),
                this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                }
            }
        }, {
            key: "destroyScrollBar",
            value: function() {
                this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar),
                window.removeEventListener("mouseup", this.releaseScrollBar),
                window.removeEventListener("mousemove", this.moveScrollBar),
                this.scrollbar.remove()
            }
        }, {
            key: "getScrollBar",
            value: function(t) {
                this.isDraggingScrollbar = !0,
                this.checkScroll(),
                this.html.classList.remove(this.scrollingClass),
                this.html.classList.add(this.draggingClass)
            }
        }, {
            key: "releaseScrollBar",
            value: function(t) {
                this.isDraggingScrollbar = !1,
                this.html.classList.add(this.scrollingClass),
                this.html.classList.remove(this.draggingClass)
            }
        }, {
            key: "moveScrollBar",
            value: function(t) {
                var e = this;
                this.isDraggingScrollbar && requestAnimationFrame((function() {
                    var i = 100 * (t.clientX - e.scrollbarBCR.left) / e.scrollbarWidth * e.instance.limit.x / 100
                      , n = 100 * (t.clientY - e.scrollbarBCR.top) / e.scrollbarHeight * e.instance.limit.y / 100;
                    n > 0 && n < e.instance.limit.y && (e.instance.delta.y = n),
                    i > 0 && i < e.instance.limit.x && (e.instance.delta.x = i)
                }
                ))
            }
        }, {
            key: "addElements",
            value: function() {
                var t = this;
                this.els = {},
                this.parallaxElements = {},
                this.el.querySelectorAll("[data-".concat(this.name, "]")).forEach((function(e, i) {
                    var n, s, o, r = yt(e), a = Object.entries(t.sections).map((function(t) {
                        var e = W(t, 2);
                        e[0];
                        return e[1]
                    }
                    )).find((function(t) {
                        return r.includes(t.el)
                    }
                    )), l = e.dataset[t.name + "Class"] || t.class, c = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "el" + i, h = e.dataset[t.name + "Repeat"], u = e.dataset[t.name + "Call"], d = e.dataset[t.name + "Position"], f = e.dataset[t.name + "Delay"], p = e.dataset[t.name + "Direction"], v = "string" == typeof e.dataset[t.name + "Sticky"], m = !!e.dataset[t.name + "Speed"] && parseFloat(e.dataset[t.name + "Speed"]) / 10, y = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset, g = e.dataset[t.name + "Target"], b = (o = void 0 !== g ? document.querySelector("".concat(g)) : e).getBoundingClientRect();
                    null === a || a.inView ? (n = b.top + t.instance.scroll.y - mt(o).y,
                    s = b.left + t.instance.scroll.x - mt(o).x) : (n = b.top - mt(a.el).y - mt(o).y,
                    s = b.left - mt(a.el).x - mt(o).x);
                    var w = n + o.offsetHeight
                      , k = s + o.offsetWidth
                      , E = {
                        x: (k - s) / 2 + s,
                        y: (w - n) / 2 + n
                    };
                    if (v) {
                        var x = e.getBoundingClientRect()
                          , S = x.top
                          , T = x.left
                          , A = {
                            x: T - s,
                            y: S - n
                        };
                        n += window.innerHeight,
                        s += window.innerWidth,
                        w = S + o.offsetHeight - e.offsetHeight - A[t.directionAxis],
                        E = {
                            x: ((k = T + o.offsetWidth - e.offsetWidth - A[t.directionAxis]) - s) / 2 + s,
                            y: (w - n) / 2 + n
                        }
                    }
                    h = "false" != h && (null != h || t.repeat);
                    var C = [0, 0];
                    if (y)
                        if ("horizontal" === t.direction) {
                            for (var M = 0; M < y.length; M++)
                                "string" == typeof y[M] ? y[M].includes("%") ? C[M] = parseInt(y[M].replace("%", "") * t.windowWidth / 100) : C[M] = parseInt(y[M]) : C[M] = y[M];
                            s += C[0],
                            k -= C[1]
                        } else {
                            for (M = 0; M < y.length; M++)
                                "string" == typeof y[M] ? y[M].includes("%") ? C[M] = parseInt(y[M].replace("%", "") * t.windowHeight / 100) : C[M] = parseInt(y[M]) : C[M] = y[M];
                            n += C[0],
                            w -= C[1]
                        }
                    var L = {
                        el: e,
                        id: c,
                        class: l,
                        section: a,
                        top: n,
                        middle: E,
                        bottom: w,
                        left: s,
                        right: k,
                        offset: y,
                        progress: 0,
                        repeat: h,
                        inView: !1,
                        call: u,
                        speed: m,
                        delay: f,
                        position: d,
                        target: o,
                        direction: p,
                        sticky: v
                    };
                    t.els[c] = L,
                    e.classList.contains(l) && t.setInView(t.els[c], c),
                    (!1 !== m || v) && (t.parallaxElements[c] = L)
                }
                ))
            }
        }, {
            key: "addSections",
            value: function() {
                var t = this;
                this.sections = {};
                var e = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                0 === e.length && (e = [this.el]),
                e.forEach((function(e, i) {
                    var n = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "section" + i
                      , s = e.getBoundingClientRect()
                      , o = {
                        x: s.left - 1.5 * window.innerWidth - mt(e).x,
                        y: s.top - 1.5 * window.innerHeight - mt(e).y
                    }
                      , r = {
                        x: o.x + s.width + 2 * window.innerWidth,
                        y: o.y + s.height + 2 * window.innerHeight
                    }
                      , a = "string" == typeof e.dataset[t.name + "Persistent"];
                    e.setAttribute("data-scroll-section-id", n);
                    var l = {
                        el: e,
                        offset: o,
                        limit: r,
                        inView: !1,
                        persistent: a,
                        id: n
                    };
                    t.sections[n] = l
                }
                ))
            }
        }, {
            key: "transform",
            value: function(t, e, i, n) {
                var s;
                if (n) {
                    var o = mt(t)
                      , r = vt(o.x, e, n)
                      , a = vt(o.y, i, n);
                    s = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(r, ",").concat(a, ",0,1)")
                } else
                    s = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(e, ",").concat(i, ",0,1)");
                t.style.webkitTransform = s,
                t.style.msTransform = s,
                t.style.transform = s
            }
        }, {
            key: "transformElements",
            value: function(t) {
                var e = this
                  , i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , n = this.instance.scroll.x + this.windowWidth
                  , s = this.instance.scroll.y + this.windowHeight
                  , o = {
                    x: this.instance.scroll.x + this.windowMiddle.x,
                    y: this.instance.scroll.y + this.windowMiddle.y
                };
                Object.entries(this.parallaxElements).forEach((function(r) {
                    var a = W(r, 2)
                      , l = (a[0],
                    a[1])
                      , c = !1;
                    if (t && (c = 0),
                    l.inView || i)
                        switch (l.position) {
                        case "top":
                            c = e.instance.scroll[e.directionAxis] * -l.speed;
                            break;
                        case "elementTop":
                            c = (s - l.top) * -l.speed;
                            break;
                        case "bottom":
                            c = (e.instance.limit[e.directionAxis] - s + e.windowHeight) * l.speed;
                            break;
                        case "left":
                            c = e.instance.scroll[e.directionAxis] * -l.speed;
                            break;
                        case "elementLeft":
                            c = (n - l.left) * -l.speed;
                            break;
                        case "right":
                            c = (e.instance.limit[e.directionAxis] - n + e.windowHeight) * l.speed;
                            break;
                        default:
                            c = (o[e.directionAxis] - l.middle[e.directionAxis]) * -l.speed
                        }
                    l.sticky && (c = l.inView ? "horizontal" === e.direction ? e.instance.scroll.x - l.left + window.innerWidth : e.instance.scroll.y - l.top + window.innerHeight : "horizontal" === e.direction ? e.instance.scroll.x < l.left - window.innerWidth && e.instance.scroll.x < l.left - window.innerWidth / 2 ? 0 : e.instance.scroll.x > l.right && e.instance.scroll.x > l.right + 100 && l.right - l.left + window.innerWidth : e.instance.scroll.y < l.top - window.innerHeight && e.instance.scroll.y < l.top - window.innerHeight / 2 ? 0 : e.instance.scroll.y > l.bottom && e.instance.scroll.y > l.bottom + 100 && l.bottom - l.top + window.innerHeight),
                    !1 !== c && ("horizontal" === l.direction || "horizontal" === e.direction && "vertical" !== l.direction ? e.transform(l.el, c, 0, !t && l.delay) : e.transform(l.el, 0, c, !t && l.delay))
                }
                ))
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                var e = this
                  , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , n = parseInt(i.offset) || 0
                  , s = i.duration || 1e3
                  , o = i.easing || [.25, 0, .35, 1]
                  , r = !!i.disableLerp
                  , a = !!i.callback && i.callback;
                if (o = Tt.apply(void 0, H(o)),
                "string" == typeof t) {
                    if ("top" === t)
                        t = 0;
                    else if ("bottom" === t)
                        t = this.instance.limit.y;
                    else if ("left" === t)
                        t = 0;
                    else if ("right" === t)
                        t = this.instance.limit.x;
                    else if (!(t = document.querySelector(t)))
                        return
                } else if ("number" == typeof t)
                    t = parseInt(t);
                else if (!t || !t.tagName)
                    return void console.warn("`target` parameter is not valid");
                if ("number" != typeof t) {
                    var l = yt(t).includes(this.el);
                    if (!l)
                        return;
                    var c = t.getBoundingClientRect()
                      , h = c.top
                      , u = c.left
                      , d = yt(t)
                      , f = d.find((function(t) {
                        return Object.entries(e.sections).map((function(t) {
                            var e = W(t, 2);
                            e[0];
                            return e[1]
                        }
                        )).find((function(e) {
                            return e.el == t
                        }
                        ))
                    }
                    ))
                      , p = 0;
                    p = f ? mt(f)[this.directionAxis] : -this.instance.scroll[this.directionAxis],
                    n = "horizontal" === this.direction ? u + n - p : h + n - p
                } else
                    n = t + n;
                var v = parseFloat(this.instance.delta[this.directionAxis])
                  , m = Math.max(0, Math.min(n, this.instance.limit[this.directionAxis]))
                  , y = m - v
                  , g = function(t) {
                    r ? "horizontal" === e.direction ? e.setScroll(v + y * t, e.instance.delta.y) : e.setScroll(e.instance.delta.x, v + y * t) : e.instance.delta[e.directionAxis] = v + y * t
                };
                this.animatingScroll = !0,
                this.stopScrolling(),
                this.startScrolling();
                var b = Date.now()
                  , w = function t() {
                    var i = (Date.now() - b) / s;
                    i > 1 ? (g(1),
                    e.animatingScroll = !1,
                    0 == s && e.update(),
                    a && a()) : (e.scrollToRaf = requestAnimationFrame(t),
                    g(o(i)))
                };
                w()
            }
        }, {
            key: "update",
            value: function() {
                this.setScrollLimit(),
                this.addSections(),
                this.addElements(),
                this.detectElements(),
                this.updateScroll(),
                this.transformElements(!0),
                this.reinitScrollBar(),
                this.checkScroll(!0)
            }
        }, {
            key: "startScroll",
            value: function() {
                this.stop = !1
            }
        }, {
            key: "stopScroll",
            value: function() {
                this.stop = !0
            }
        }, {
            key: "setScroll",
            value: function(t, e) {
                this.instance = O(O({}, this.instance), {}, {
                    scroll: {
                        x: t,
                        y: e
                    },
                    delta: {
                        x: t,
                        y: e
                    },
                    speed: 0
                })
            }
        }, {
            key: "destroy",
            value: function() {
                P(j(i.prototype), "destroy", this).call(this),
                this.stopScrolling(),
                this.html.classList.remove(this.smoothClass),
                this.vs.destroy(),
                this.destroyScrollBar(),
                window.removeEventListener("keydown", this.checkKey, !1)
            }
        }]),
        i
    }(Y)
      , _t = function() {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            T(this, t),
            this.options = e,
            Object.assign(this, N, e),
            this.smartphone = N.smartphone,
            e.smartphone && Object.assign(this.smartphone, e.smartphone),
            this.tablet = N.tablet,
            e.tablet && Object.assign(this.tablet, e.tablet),
            this.smooth || "horizontal" != this.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible"),
            this.tablet.smooth || "horizontal" != this.tablet.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)"),
            this.smartphone.smooth || "horizontal" != this.smartphone.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"),
            this.init()
        }
        return C(t, [{
            key: "init",
            value: function() {
                if (this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint,
                this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint,
                this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet ? this.scroll = new Bt(this.options) : this.scroll = new F(this.options),
                this.scroll.init(),
                window.location.hash) {
                    var t = window.location.hash.slice(1, window.location.hash.length)
                      , e = document.getElementById(t);
                    e && this.scroll.scrollTo(e)
                }
            }
        }, {
            key: "update",
            value: function() {
                this.scroll.update()
            }
        }, {
            key: "start",
            value: function() {
                this.scroll.startScroll()
            }
        }, {
            key: "stop",
            value: function() {
                this.scroll.stopScroll()
            }
        }, {
            key: "scrollTo",
            value: function(t, e) {
                this.scroll.scrollTo(t, e)
            }
        }, {
            key: "setScroll",
            value: function(t, e) {
                this.scroll.setScroll(t, e)
            }
        }, {
            key: "on",
            value: function(t, e) {
                this.scroll.setEvents(t, e)
            }
        }, {
            key: "off",
            value: function(t, e) {
                this.scroll.unsetEvents(t, e)
            }
        }, {
            key: "destroy",
            value: function() {
                this.scroll.destroy()
            }
        }]),
        t
    }()
      , Rt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            return u(this, i),
            e.call(this, t)
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                this.scroll = new _t({
                    el: this.el,
                    smooth: !0,
                    offset: window.isMobile ? ["0%"] : ["15%"],
                    getDirection: !0
                }),
                x.setAttribute("data-page", this.el.getAttribute("data-page")),
                this.scroll.on("call", (function(e, i, n, s) {
                    t.call(e[0], {
                        way: i,
                        obj: n
                    }, e[1], e[2])
                }
                )),
                this.scroll.on("scroll", (function(t) {}
                )),
                window.scroll = this.scroll,
                setTimeout((function() {
                    t.scroll.update()
                }
                ), 1e3)
            }
        }, {
            key: "toggleLazy",
            value: function(t) {
                var e = this.getData("lazy", t.obj.el);
                e.length && ("IMG" == t.obj.el.tagName ? t.obj.el.src = e : t.obj.el.style.backgroundImage = "url(".concat(e, ")"),
                this.setData("lazy", "", t.obj.el))
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(t.target, {
                    offset: t.offset
                })
            }
        }, {
            key: "update",
            value: function() {
                this.scroll && this.scroll.update && this.scroll.update()
            }
        }, {
            key: "reinitEvents",
            value: function() {
                this.scroll && this.scroll.initEvents && this.scroll.scroll.initEvents()
            }
        }, {
            key: "destroy",
            value: function() {
                this.scroll.destroy()
            }
        }]),
        i
    }(c);
    function Pt(t, e, i) {
        return (1 - i) * t + i * e
    }
    var Wt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            return u(this, i),
            e.call(this, t)
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                this.src = "".concat(this.getData("path"), "/home-").concat(Math.ceil(4 * Math.random()), ".jpg"),
                window.isMobile ? document.querySelector(".js-background-quote").style.backgroundImage = "url(".concat(this.src, ")") : (this.$canvas = this.el,
                this.context = this.$canvas.getContext("2d"),
                this.radiusAvailable = !1,
                this.mouse = {
                    x: window.innerWidth / 3,
                    y: window.innerHeight / 3
                },
                this.lerpedMouse = {
                    x: window.innerWidth / 3,
                    y: window.innerHeight / 3
                },
                this.isBig = !1,
                this.resize(),
                this.radius = {
                    value: 0,
                    lerpedValue: 0,
                    factor: 1
                },
                this.lerp = {
                    value: .01
                },
                this.image = new Image,
                this.hasMouseMoved = !1,
                this.image.onload = function() {
                    window.isMobile ? (t.mouse.x = window.innerWidth - 30,
                    t.mouse.y = t.el.getBoundingClientRect().height / 4,
                    t.lerpedMouse.x = t.mouse.x,
                    t.lerpedMouse.y = t.mouse.y) : (t.lerpedMouse.x = t.mouse.x,
                    t.lerpedMouse.y = t.mouse.y),
                    setTimeout((function() {
                        t.render(),
                        gsap.to(t.radius, {
                            value: window.isMobile ? window.innerHeight / 7 : window.innerWidth / 15,
                            duration: .6,
                            delay: 1,
                            onComplete: function() {
                                t.radius.lerpedValue = t.radius.value
                            }
                        })
                    }
                    ), 2400)
                }
                ,
                this.image.src = this.src,
                window.isMobile || (this.bindMousemove = this.mousemove.bind(this),
                window.addEventListener("mousemove", this.bindMousemove)),
                this.bindResize = this.resize.bind(this),
                window.addEventListener("resize", this.bindResize))
            }
        }, {
            key: "render",
            value: function(t) {
                var e, i = this, n = (Math.abs(this.mouse.x - this.lerpedMouse.x) + Math.abs(this.mouse.y - this.lerpedMouse.y)) / 2;
                this.radiusAvailable ? (this.radius.lerpedValue = Pt(this.radius.lerpedValue, this.radius.value + 1 * n, .05),
                e = this.radius.lerpedValue * this.radius.factor) : e = this.radius.value,
                this.isBig || (this.lerpedMouse.x = Pt(this.lerpedMouse.x, this.mouse.x, this.lerp.value),
                this.lerpedMouse.y = Pt(this.lerpedMouse.y, this.mouse.y, this.lerp.value)),
                this.context.save(),
                this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height),
                this.context.beginPath(),
                this.context.arc(this.lerpedMouse.x, this.lerpedMouse.y, e, 0, 2 * Math.PI, !0),
                this.context.clip(),
                this.context.drawImage(this.image, 0, 0, this.$canvas.width, this.$canvas.height),
                this.context.restore(),
                this.raf = requestAnimationFrame((function() {
                    return i.render()
                }
                ))
            }
        }, {
            key: "mousemove",
            value: function(t) {
                var e = this;
                this.hasMouseMoved || (this.hasMouseMoved = !0,
                gsap.to(this.lerp, {
                    value: .2,
                    duration: 1.6,
                    onComplete: function() {
                        e.radiusAvailable = !0
                    }
                })),
                this.mouse.x = t.clientX,
                this.mouse.y = t.clientY
            }
        }, {
            key: "resize",
            value: function() {
                this.windowWidth = window.innerWidth,
                this.windowHeight = window.innerHeight,
                this.$canvas.width = this.windowWidth,
                this.$canvas.height = this.windowHeight
            }
        }, {
            key: "trigger",
            value: function(t) {
                var e = this;
                "enter" === t.way && "down" === window.scroll.scroll.instance.direction ? (x.classList.add("has-mask-big"),
                gsap.to(this.radius, {
                    factor: 18,
                    duration: 1.4,
                    ease: "power4.inOut",
                    onComplete: function() {
                        x.classList.contains("has-mask-big") && (e.isBig = !0)
                    }
                })) : "exit" === t.way && "up" === window.scroll.scroll.instance.direction && (this.isBig = !1,
                x.classList.remove("has-mask-big"),
                gsap.to(this.radius, {
                    factor: 1,
                    duration: 1.6,
                    ease: "power4.out"
                }))
            }
        }, {
            key: "destroy",
            value: function() {
                window.isMobile || (cancelAnimationFrame(this.raf),
                window.removeEventListener("mousemove", this.bindMousemove),
                window.removeEventListener("resize", this.bindResize))
            }
        }]),
        i
    }(c)
      , Ht = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            return u(this, i),
            e.call(this, t)
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this
                  , e = null !== this.getData("type") ? this.getData("type") : "lines";
                setTimeout((function() {
                    new SplitText(t.el,{
                        type: e
                    });
                    if (t.el.classList.add("is-split"),
                    "lines" === e)
                        for (var i = t.el.querySelectorAll("div"), n = 0; n < i.length; n++) {
                            var s = i[n]
                              , o = s.innerHTML;
                            s.innerHTML = "<div></div>",
                            s.querySelector("div").innerHTML = o
                        }
                }
                ), 600)
            }
        }]),
        i
    }(c)
      , zt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            return u(this, i),
            e.call(this, t)
        }
        return f(i, [{
            key: "init",
            value: function() {}
        }, {
            key: "trigger",
            value: function() {
                var t = this
                  , e = this.getData("value")
                  , i = 0
                  , n = setInterval((function() {
                    i++,
                    t.el.innerText = "".concat(i.toString().padStart(t.getData("length"), "0")).concat(null !== t.getData("end") ? t.getData("end") : ""),
                    i == e && clearInterval(n)
                }
                ), 1e3 / e)
            }
        }]),
        i
    }(c);
    function $t(t, e) {
        t.style.webkitTransform = e,
        t.style.msTransform = e,
        t.style.transform = e
    }
    var Nt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                mouseenter: {
                    member: "mouseenter"
                },
                mouseleave: {
                    member: "mouseleave"
                },
                mousemove: "mousemove"
            },
            n
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                setTimeout((function() {
                    t.bcr = t.getBCR(),
                    t.$picture = t.$("picture")[0],
                    t.$pictureValue = t.$("pictureValue")[0],
                    t.mouse = {
                        x: t.bcr.width / 2,
                        y: t.bcr.height / 2
                    },
                    t.lerpedMouse = {
                        x: t.bcr.width / 2,
                        y: t.bcr.height / 2
                    },
                    t.bindResize = t.resize.bind(t),
                    window.addEventListener("resize", t.bindResize)
                }
                ), 250),
                setTimeout((function() {
                    t.resize()
                }
                ), 1200)
            }
        }, {
            key: "render",
            value: function() {
                var t = this;
                this.raf = requestAnimationFrame((function() {
                    return t.render()
                }
                )),
                this.lerpedMouse.x = Pt(this.lerpedMouse.x, this.mouse.x, .1),
                this.lerpedMouse.y = Pt(this.lerpedMouse.y, this.mouse.y, .1);
                var e = "translate3d(".concat(this.lerpedMouse.x, "px,").concat(this.lerpedMouse.y, "px,0)");
                $t(this.$picture, e)
            }
        }, {
            key: "resize",
            value: function() {
                this.bcr = this.getBCR()
            }
        }, {
            key: "stop",
            value: function() {
                cancelAnimationFrame(this.raf)
            }
        }, {
            key: "mousemove",
            value: function(t) {
                this.mouse.x = t.clientX - this.bcr.left,
                this.mouse.y = t.clientY - this.bcr.top + window.scroll.scroll.instance.scroll.y
            }
        }, {
            key: "mouseenter",
            value: function(t) {
                this.call("update", null, "Scroll"),
                this.el.classList.add("has-hover"),
                this.render(),
                this.$pictureValue.style.backgroundImage = "url('".concat(t.currentTarget.getAttribute("data-image"), "')")
            }
        }, {
            key: "mouseleave",
            value: function() {
                this.el.classList.remove("has-hover"),
                cancelAnimationFrame(this.raf)
            }
        }, {
            key: "getBCR",
            value: function() {
                return {
                    top: this.el.getBoundingClientRect().top + window.scroll.scroll.instance.scroll.y,
                    left: this.el.getBoundingClientRect().left,
                    width: this.el.getBoundingClientRect().width,
                    height: this.el.getBoundingClientRect().height
                }
            }
        }, {
            key: "destroy",
            value: function() {
                void 0 !== this.raf && cancelAnimationFrame(this.raf)
            }
        }]),
        i
    }(c)
      , Yt = function(t) {
        p(i, t);
        var e = g(i);
        function i() {
            return u(this, i),
            e.apply(this, arguments)
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                this.$slides = this.$("slide"),
                this.$label = this.$("label")[0],
                this.el.classList.add("is-beginning");
                var e = parseInt(this.getData("index"));
                this.slider = new Swiper(this.$("slider")[0],{
                    speed: 700,
                    shortSwipes: !1,
                    longSwipesRatio: .1,
                    longSwipesMs: 50,
                    initialSlide: e,
                    navigation: {
                        nextEl: this.$("next")[0],
                        prevEl: this.$("prev")[0]
                    },
                    on: {
                        slideChange: function() {
                            t.$label.innerText = t.$slides[t.slider.activeIndex].getAttribute("data-label"),
                            t.check()
                        }
                    }
                }),
                this.check()
            }
        }, {
            key: "check",
            value: function() {
                this.slider.isBeginning ? this.el.classList.add("is-beginning") : this.el.classList.remove("is-beginning"),
                this.slider.isEnd ? this.el.classList.add("is-end") : this.el.classList.remove("is-end")
            }
        }]),
        i
    }(c)
      , Vt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            n = e.call(this, t),
            window.isMobile ? y(n) : (n.events = {
                mouseenter: {
                    wrap: "mouseenter"
                },
                mouseleave: {
                    wrap: "mouseleave"
                },
                mousemove: "mousemove"
            },
            n)
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                this.$picture = this.$("picture")[0],
                window.isMobile ? "" === this.$picture.style.backgroundImage && (this.$picture.style.backgroundImage = "url(".concat(this.$picture.getAttribute("data-src"), ")")) : (this.bcr = this.getBCR(),
                this.$inner = this.$("inner")[0],
                this.mouse = {
                    x: this.bcr.width / 2,
                    y: this.bcr.height / 2
                },
                this.lerpedMouse = {
                    x: this.bcr.width / 2,
                    y: this.bcr.height / 2
                },
                this.bindResize = this.resize.bind(this),
                window.addEventListener("resize", this.bindResize),
                setTimeout((function() {
                    t.isAvailable = !0,
                    t.bcr = t.getBCR()
                }
                ), 1200))
            }
        }, {
            key: "render",
            value: function() {
                var t = this;
                if (this.raf = requestAnimationFrame((function() {
                    return t.render()
                }
                )),
                this.isAvailable) {
                    this.lerpedMouse.x = Pt(this.lerpedMouse.x, this.mouse.x, .1),
                    this.lerpedMouse.y = Pt(this.lerpedMouse.y, this.mouse.y, .1);
                    var e = "translate3d(".concat(this.lerpedMouse.x, "px,").concat(this.lerpedMouse.y, "px,0)");
                    $t(this.$inner, e)
                }
            }
        }, {
            key: "resize",
            value: function() {
                this.bcr = this.getBCR()
            }
        }, {
            key: "stop",
            value: function() {
                cancelAnimationFrame(this.raf)
            }
        }, {
            key: "mousemove",
            value: function(t) {
                this.mouse.x = t.clientX - this.bcr.left,
                this.mouse.y = t.clientY - this.bcr.top + window.scroll.scroll.instance.scroll.y
            }
        }, {
            key: "mouseenter",
            value: function(t) {
                "" === this.$picture.style.backgroundImage && (this.$picture.style.backgroundImage = "url(".concat(this.$picture.getAttribute("data-src"), ")")),
                this.isAvailable && this.el.classList.add("has-hover"),
                this.render()
            }
        }, {
            key: "mouseleave",
            value: function() {
                this.el.classList.remove("has-hover"),
                cancelAnimationFrame(this.raf)
            }
        }, {
            key: "getBCR",
            value: function() {
                return {
                    top: this.el.getBoundingClientRect().top + window.scroll.scroll.instance.scroll.y,
                    left: this.el.getBoundingClientRect().left,
                    width: this.el.getBoundingClientRect().width,
                    height: this.el.getBoundingClientRect().height
                }
            }
        }, {
            key: "destroy",
            value: function() {
                window.isMobile || void 0 !== this.raf && cancelAnimationFrame(this.raf)
            }
        }]),
        i
    }(c)
      , qt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                click: {
                    toggler: "toggle"
                }
            },
            n
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                this.$items = this.$("item"),
                this.hasScrollTo = null !== this.getData("scroll-to"),
                this.$items.forEach((function(e) {
                    e.classList.contains("is-open") && t.open(e)
                }
                ))
            }
        }, {
            key: "toggle",
            value: function(t) {
                var e = t.curTarget
                  , i = this.parent("item", e);
                i.classList.contains("is-open") ? this.close() : (this.close(),
                this.open(i))
            }
        }, {
            key: "open",
            value: function(t) {
                var e = this
                  , i = this.$("content", t)[0];
                t.classList.add("is-open"),
                gsap.to(i, .3, {
                    height: this.compute(this.$("inner", t)[0]).height,
                    onComplete: function() {
                        e.call("update", "Scroll"),
                        e.hasScrollTo && e.call("scrollTo", {
                            target: t,
                            offset: -100
                        }, "Scroll")
                    }
                })
            }
        }, {
            key: "close",
            value: function() {
                var t = this;
                this.$("item").forEach((function(e) {
                    e.classList.remove("is-open");
                    var i = t.$("content", e)[0];
                    i && gsap.to(i, .3, {
                        height: 0,
                        onComplete: function() {
                            t.call("update", "Scroll")
                        }
                    })
                }
                ))
            }
        }, {
            key: "compute",
            value: function(t) {
                return t.getBoundingClientRect()
            }
        }]),
        i
    }(c)
      , Xt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                click: {
                    share: "share"
                }
            },
            n
        }
        return f(i, [{
            key: "init",
            value: function() {}
        }, {
            key: "share",
            value: function(t) {
                t.curTarget;
                var e, i = this.getData("platform", t.curTarget), n = window.location.href;
                switch (i) {
                case "facebook":
                    e = "https://facebook.com/sharer/sharer.php?u=" + n,
                    this.openWindow(e);
                    break;
                case "twitter":
                    e = "https://twitter.com/share?url=" + n + "&amp;text=" + encodeURIComponent(this.getData("text", t.curTarget)),
                    this.openWindow(e);
                    break;
                case "mail":
                    var s = encodeURIComponent(this.getData("subject", t.curTarget))
                      , o = encodeURIComponent(this.getData("body", t.curTarget));
                    this.openMail(s, o);
                    break;
                case "linkedin":
                    e = "http://www.linkedin.com/shareArticle?mini=true&url=".concat(encodeURIComponent(n)),
                    this.openWindow(e)
                }
            }
        }, {
            key: "openWindow",
            value: function(t) {
                window.open(t, "Share", "menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=500, width=600")
            }
        }, {
            key: "openMail",
            value: function(t, e) {
                window.location = "mailto:?subject=" + t + "&body=" + e
            }
        }, {
            key: "destroy",
            value: function() {}
        }]),
        i
    }(c)
      , Ft = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                click: "trigger"
            },
            n
        }
        return f(i, [{
            key: "init",
            value: function() {}
        }, {
            key: "trigger",
            value: function(t) {
                this.call("open", {
                    provider: this.el.getAttribute("data-provider"),
                    id: this.el.getAttribute("data-id"),
                    iframe: this.el.getAttribute("data-iframe"),
                    timecode: this.el.getAttribute("data-timecode")
                }, "Popup")
            }
        }]),
        i
    }(c)
      , Ut = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                click: {
                    closeButton: "close"
                }
            },
            n
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                this.$inner = this.$("inner")[0],
                this.closeBind = function(e) {
                    "Escape" === e.key && t.close()
                }
                ,
                document.addEventListener("keyup", this.closeBind)
            }
        }, {
            key: "open",
            value: function(t) {
                void 0 !== this.timeout && clearTimeout(this.timeout),
                null !== t.iframe ? this.$inner.innerHTML = t.iframe : "vimeo" === t.provider ? this.$inner.innerHTML = '<iframe src="https://player.vimeo.com/video/'.concat(t.id, '?controls=true&amp;autoplay=1&amp;transparent=false&amp;autopause=false&amp;muted=0"frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; encrypted-media"></iframe>') : (t.provider = "youtube") && (this.$inner.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'.concat(t.id, "?autoplay=1&start=").concat(t.timecode, '&frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')),
                x.classList.add("has-popup-open")
            }
        }, {
            key: "close",
            value: function() {
                var t = this;
                x.classList.add("has-popup-closing"),
                x.classList.remove("has-popup-open"),
                this.timeout = setTimeout((function() {
                    t.$inner.innerHTML = ""
                }
                ), 600),
                setTimeout((function() {
                    x.classList.remove("has-popup-closing")
                }
                ), 600)
            }
        }, {
            key: "destroy",
            value: function() {
                this.close(),
                document.removeEventListener("keyup", this.closeBind)
            }
        }]),
        i
    }(c)
      , Kt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            return u(this, i),
            e.call(this, t)
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                this.$slides = this.$("slide"),
                this.$label = this.$("label")[0],
                this.el.classList.add("is-beginning"),
                this.slider = new Swiper(this.$("slider")[0],{
                    speed: 500,
                    slidesPerView: 1,
                    navigation: {
                        nextEl: this.$("next")[0],
                        prevEl: this.$("prev")[0]
                    },
                    breakpoints: {
                        700: {
                            slidesPerView: 2.2
                        }
                    },
                    on: {
                        transitionEnd: function() {
                            t.check()
                        }
                    }
                }),
                this.check()
            }
        }, {
            key: "check",
            value: function() {
                this.slider.isBeginning ? this.el.classList.add("is-beginning") : this.el.classList.remove("is-beginning"),
                this.slider.isEnd ? this.el.classList.add("is-end") : this.el.classList.remove("is-end")
            }
        }]),
        i
    }(c);
    function Gt(t) {
        for (var e = t.length - 1; e > 0; e--) {
            var i = Math.floor(Math.random() * (e + 1))
              , n = [t[i], t[e]];
            t[e] = n[0],
            t[i] = n[1]
        }
        return t
    }
    var Zt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                click: {
                    loadMoreButton: "loadMore"
                }
            },
            n.currentPage = 0,
            n
        }
        return f(i, [{
            key: "init",
            value: function() {
                this.url = this.getData("url"),
                this.$model = this.$("model")[0],
                this.$container = this.$("container")[0],
                this.$button = this.$("loadMoreButton")[0],
                this.loadMore(null, !0)
            }
        }, {
            key: "loadMore",
            value: function(t) {
                var e = this
                  , i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                try {
                    this.el.classList.add("is-loading");
                    var n = !1;
                    fetch("".concat(this.url, "&page=").concat(this.currentPage + 1)).then((function(t) {
                        return 200 !== t.status && (n = !0),
                        t.json()
                    }
                    )).then((function(t) {
                        if (n)
                            console.error(t);
                        else {
                            e.currentPage++;
                            var s = null;
                            t.results.is_end && e.$button.classList.add("u-none"),
                            t.results.themes = Gt(t.results.themes),
                            t.results.themes.forEach((function(t) {
                                var i = e.$model.cloneNode(!0);
                                null == s && (s = i),
                                i.classList.remove("u-none"),
                                window.isMobile ? i.classList.add("is-inview") : i.classList.remove("is-inview"),
                                i.querySelector("[data-title]").innerText = t.title,
                                i.querySelector("[data-description]").innerText = t.description,
                                i.querySelector("[data-count]").innerText = t.count,
                                i.querySelector("[data-link]").href = t.link,
                                i.querySelector("[data-wrap]").setAttribute("data-module-theme-card", i.id),
                                e.$container.append(i)
                            }
                            )),
                            e.call("update", null, "Scroll"),
                            setTimeout((function() {
                                window.isMobile && !i && e.call("scrollTo", {
                                    target: s,
                                    offset: -100,
                                    duration: 0
                                }, "Scroll"),
                                e.call("destroy", e.$container, "app"),
                                e.call("update", e.$container, "app")
                            }
                            ), 200)
                        }
                    }
                    )).finally((function() {
                        e.el.classList.remove("is-loading"),
                        e.call("resize", null, "Members")
                    }
                    ))
                } catch (t) {
                    console.error(t)
                }
            }
        }]),
        i
    }(c)
      , Qt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                click: {
                    closeButton: "close",
                    link: "close"
                }
            },
            n
        }
        return f(i, [{
            key: "init",
            value: function() {}
        }, {
            key: "open",
            value: function() {
                x.classList.add("has-filters-open")
            }
        }, {
            key: "close",
            value: function() {
                x.classList.remove("has-filters-open")
            }
        }]),
        i
    }(c)
      , Jt = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                click: "toggle"
            },
            n
        }
        return f(i, [{
            key: "init",
            value: function() {}
        }, {
            key: "toggle",
            value: function() {
                this.call("open", "Filters")
            }
        }]),
        i
    }(c)
      , te = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            (n = e.call(this, t)).events = {
                click: {
                    infosButton: "toggle"
                }
            },
            n
        }
        return f(i, [{
            key: "init",
            value: function() {}
        }, {
            key: "toggle",
            value: function() {
                this.el.classList.toggle("is-open")
            }
        }]),
        i
    }(c)
      , ee = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function ie(t, e) {
        return t(e = {
            exports: {}
        }, e.exports),
        e.exports
    }
    var ne = ie((function(t, e) {
        t.exports = function() {
            function t(t, e) {
                for (var i = t.length, n = i, s = []; i--; )
                    s.push(e(t[n - i - 1]));
                return s
            }
            function e(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (window.Promise)
                    return g(t, e, i);
                t.recalculate(!0, !0)
            }
            function i(t) {
                var e = t.useContainerForBreakpoints ? t.container.clientWidth : window.innerWidth
                  , i = {
                    columns: t.columns
                };
                k(t.margin) ? i.margin = {
                    x: t.margin.x,
                    y: t.margin.y
                } : i.margin = {
                    x: t.margin,
                    y: t.margin
                };
                var n = Object.keys(t.breakAt);
                return t.mobileFirst ? function(t) {
                    for (var e = t.options, i = t.responsiveOptions, n = t.keys, s = t.docWidth, o = void 0, r = 0; r < n.length; r++) {
                        var a = parseInt(n[r], 10);
                        s >= a && (o = e.breakAt[a],
                        E(o, i))
                    }
                    return i
                }({
                    options: t,
                    responsiveOptions: i,
                    keys: n,
                    docWidth: e
                }) : function(t) {
                    for (var e = t.options, i = t.responsiveOptions, n = t.keys, s = t.docWidth, o = void 0, r = n.length - 1; r >= 0; r--) {
                        var a = parseInt(n[r], 10);
                        s <= a && (o = e.breakAt[a],
                        E(o, i))
                    }
                    return i
                }({
                    options: t,
                    responsiveOptions: i,
                    keys: n,
                    docWidth: e
                })
            }
            function n(t) {
                return i(t).columns
            }
            function s(t) {
                return i(t).margin
            }
            function o(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  , i = n(t)
                  , o = s(t).x
                  , r = 100 / i;
                if (!e)
                    return r;
                if (1 === i)
                    return "100%";
                var a = "px";
                if ("string" == typeof o) {
                    var l = parseFloat(o);
                    a = o.replace(l, ""),
                    o = l
                }
                return o = (i - 1) * o / i,
                "%" === a ? r - o + "%" : "calc(" + r + "% - " + o + a + ")"
            }
            function r(t, e) {
                var i, r = n(t.options), a = 0, l = void 0;
                if (1 == ++e)
                    return 0;
                var c = "px";
                if ("string" == typeof (l = s(t.options).x)) {
                    var h = parseFloat(l, 10);
                    c = l.replace(h, ""),
                    l = h
                }
                return i = (l - (r - 1) * l / r) * (e - 1),
                a += o(t.options, !1) * (e - 1),
                "%" === c ? a + i + "%" : "calc(" + a + "% + " + i + c + ")"
            }
            function a(t) {
                var e = 0
                  , i = t.container
                  , n = t.rows;
                u(n, (function(t) {
                    e = t > e ? t : e
                }
                )),
                i.style.height = e + "px"
            }
            function l(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]
                  , r = n(t.options)
                  , l = s(t.options).y;
                S(t, r, i),
                u(e, (function(e) {
                    var i = 0
                      , n = parseInt(e.offsetHeight, 10);
                    isNaN(n) || (t.rows.forEach((function(e, n) {
                        e < t.rows[i] && (i = n)
                    }
                    )),
                    e.style.position = "absolute",
                    e.style.top = t.rows[i] + "px",
                    e.style.left = "" + t.cols[i],
                    t.rows[i] += isNaN(n) ? 0 : n + l,
                    o && (e.dataset.macyComplete = 1))
                }
                )),
                o && (t.tmpRows = null),
                a(t)
            }
            function c(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]
                  , r = n(t.options)
                  , l = s(t.options).y;
                S(t, r, i),
                u(e, (function(e) {
                    t.lastcol === r && (t.lastcol = 0);
                    var i = x(e, "height");
                    i = parseInt(e.offsetHeight, 10),
                    isNaN(i) || (e.style.position = "absolute",
                    e.style.top = t.rows[t.lastcol] + "px",
                    e.style.left = "" + t.cols[t.lastcol],
                    t.rows[t.lastcol] += isNaN(i) ? 0 : i + l,
                    t.lastcol += 1,
                    o && (e.dataset.macyComplete = 1))
                }
                )),
                o && (t.tmpRows = null),
                a(t)
            }
            var h = function t(e, i) {
                if (!(this instanceof t))
                    return new t(e,i);
                if (e && e.nodeName)
                    return e;
                if (e = e.replace(/^\s*/, "").replace(/\s*$/, ""),
                i)
                    return this.byCss(e, i);
                for (var n in this.selectors)
                    if (i = n.split("/"),
                    new RegExp(i[1],i[2]).test(e))
                        return this.selectors[n](e);
                return this.byCss(e)
            };
            h.prototype.byCss = function(t, e) {
                return (e || document).querySelectorAll(t)
            }
            ,
            h.prototype.selectors = {},
            h.prototype.selectors[/^\.[\w\-]+$/] = function(t) {
                return document.getElementsByClassName(t.substring(1))
            }
            ,
            h.prototype.selectors[/^\w+$/] = function(t) {
                return document.getElementsByTagName(t)
            }
            ,
            h.prototype.selectors[/^\#[\w\-]+$/] = function(t) {
                return document.getElementById(t.substring(1))
            }
            ;
            var u = function(t, e) {
                for (var i = t.length, n = i; i--; )
                    e(t[n - i - 1])
            }
              , d = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.running = !1,
                this.events = [],
                this.add(t)
            };
            d.prototype.run = function() {
                if (!this.running && this.events.length > 0) {
                    var t = this.events.shift();
                    this.running = !0,
                    t(),
                    this.running = !1,
                    this.run()
                }
            }
            ,
            d.prototype.add = function() {
                var t = this
                  , e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return !!e && (Array.isArray(e) ? u(e, (function(e) {
                    return t.add(e)
                }
                )) : (this.events.push(e),
                void this.run()))
            }
            ,
            d.prototype.clear = function() {
                this.events = []
            }
            ;
            var f = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return this.instance = t,
                this.data = e,
                this
            }
              , p = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.events = {},
                this.instance = t
            };
            p.prototype.on = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return !(!t || !e) && (Array.isArray(this.events[t]) || (this.events[t] = []),
                this.events[t].push(e))
            }
            ,
            p.prototype.emit = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (!t || !Array.isArray(this.events[t]))
                    return !1;
                var i = new f(this.instance,e);
                u(this.events[t], (function(t) {
                    return t(i)
                }
                ))
            }
            ;
            var v = function(t) {
                return !("naturalHeight"in t && t.naturalHeight + t.naturalWidth === 0) || t.width + t.height !== 0
            }
              , m = function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return new Promise((function(t, i) {
                    if (e.complete)
                        return v(e) ? t(e) : i(e);
                    e.addEventListener("load", (function() {
                        return v(e) ? t(e) : i(e)
                    }
                    )),
                    e.addEventListener("error", (function() {
                        return i(e)
                    }
                    ))
                }
                )).then((function(e) {
                    i && t.emit(t.constants.EVENT_IMAGE_LOAD, {
                        img: e
                    })
                }
                )).catch((function(e) {
                    return t.emit(t.constants.EVENT_IMAGE_ERROR, {
                        img: e
                    })
                }
                ))
            }
              , y = function(e, i) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return t(i, (function(t) {
                    return m(e, t, n)
                }
                ))
            }
              , g = function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return Promise.all(y(t, e, i)).then((function() {
                    t.emit(t.constants.EVENT_IMAGE_COMPLETE)
                }
                ))
            }
              , b = function(t) {
                return function(t, e) {
                    var i = void 0;
                    return function() {
                        i && clearTimeout(i),
                        i = setTimeout(t, e)
                    }
                }((function() {
                    t.emit(t.constants.EVENT_RESIZE),
                    t.queue.add((function() {
                        return t.recalculate(!0, !0)
                    }
                    ))
                }
                ), 100)
            }
              , w = function(t) {
                (function(t) {
                    if (t.container = h(t.options.container),
                    t.container instanceof h || !t.container)
                        return !!t.options.debug && console.error("Error: Container not found");
                    t.container.length && (t.container = t.container[0]),
                    t.options.container = t.container,
                    t.container.style.position = "relative"
                }
                )(t),
                function(t) {
                    t.queue = new d,
                    t.events = new p(t),
                    t.rows = [],
                    t.resizer = b(t)
                }(t),
                function(t) {
                    var i = h("img", t.container);
                    window.addEventListener("resize", t.resizer),
                    t.on(t.constants.EVENT_IMAGE_LOAD, (function() {
                        return t.recalculate(!1, !1)
                    }
                    )),
                    t.on(t.constants.EVENT_IMAGE_COMPLETE, (function() {
                        return t.recalculate(!0, !0)
                    }
                    )),
                    t.options.useOwnImageLoader || e(t, i, !t.options.waitForImages),
                    t.emit(t.constants.EVENT_INITIALIZED)
                }(t)
            }
              , k = function(t) {
                return t === Object(t) && "[object Array]" !== Object.prototype.toString.call(t)
            }
              , E = function(t, e) {
                k(t) || (e.columns = t),
                k(t) && t.columns && (e.columns = t.columns),
                k(t) && t.margin && !k(t.margin) && (e.margin = {
                    x: t.margin,
                    y: t.margin
                }),
                k(t) && t.margin && k(t.margin) && t.margin.x && (e.margin.x = t.margin.x),
                k(t) && t.margin && k(t.margin) && t.margin.y && (e.margin.y = t.margin.y)
            }
              , x = function(t, e) {
                return window.getComputedStyle(t, null).getPropertyValue(e)
            }
              , S = function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (t.lastcol || (t.lastcol = 0),
                t.rows.length < 1 && (i = !0),
                i) {
                    t.rows = [],
                    t.cols = [],
                    t.lastcol = 0;
                    for (var n = e - 1; n >= 0; n--)
                        t.rows[n] = 0,
                        t.cols[n] = r(t, n)
                } else if (t.tmpRows)
                    for (t.rows = [],
                    n = e - 1; n >= 0; n--)
                        t.rows[n] = t.tmpRows[n];
                else
                    for (t.tmpRows = [],
                    n = e - 1; n >= 0; n--)
                        t.tmpRows[n] = t.rows[n]
            }
              , T = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
                  , n = e ? t.container.children : h(':scope > *:not([data-macy-complete="1"])', t.container);
                n = Array.from(n).filter((function(t) {
                    return null !== t.offsetParent
                }
                ));
                var s = o(t.options);
                return u(n, (function(t) {
                    e && (t.dataset.macyComplete = 0),
                    t.style.width = s
                }
                )),
                t.options.trueOrder ? (c(t, n, e, i),
                t.emit(t.constants.EVENT_RECALCULATED)) : (l(t, n, e, i),
                t.emit(t.constants.EVENT_RECALCULATED))
            }
              , A = function() {
                return !!window.Promise
            }
              , C = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var n in i)
                        Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
                }
                return t
            }
            ;
            Array.from || (Array.from = function(t) {
                for (var e = 0, i = []; e < t.length; )
                    i.push(t[e++]);
                return i
            }
            );
            var M = {
                columns: 4,
                margin: 2,
                trueOrder: !1,
                waitForImages: !1,
                useImageLoader: !0,
                breakAt: {},
                useOwnImageLoader: !1,
                onInit: !1,
                cancelLegacy: !1,
                useContainerForBreakpoints: !1
            };
            !function() {
                try {
                    document.createElement("a").querySelector(":scope *")
                } catch (t) {
                    !function() {
                        function t(t) {
                            return function(i) {
                                if (i && e.test(i)) {
                                    var n = this.getAttribute("id");
                                    n || (this.id = "q" + Math.floor(9e6 * Math.random()) + 1e6),
                                    arguments[0] = i.replace(e, "#" + this.id);
                                    var s = t.apply(this, arguments);
                                    return null === n ? this.removeAttribute("id") : n || (this.id = n),
                                    s
                                }
                                return t.apply(this, arguments)
                            }
                        }
                        var e = /:scope\b/gi
                          , i = t(Element.prototype.querySelector);
                        Element.prototype.querySelector = function(t) {
                            return i.apply(this, arguments)
                        }
                        ;
                        var n = t(Element.prototype.querySelectorAll);
                        Element.prototype.querySelectorAll = function(t) {
                            return n.apply(this, arguments)
                        }
                    }()
                }
            }();
            var L = function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M;
                if (!(this instanceof t))
                    return new t(e);
                this.options = {},
                C(this.options, M, e),
                this.options.cancelLegacy && !A() || w(this)
            };
            return L.init = function(t) {
                return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "),
                new L(t)
            }
            ,
            L.prototype.recalculateOnImageLoad = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return e(this, h("img", this.container), !t)
            }
            ,
            L.prototype.runOnImageLoad = function(t) {
                var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , n = h("img", this.container);
                return this.on(this.constants.EVENT_IMAGE_COMPLETE, t),
                i && this.on(this.constants.EVENT_IMAGE_LOAD, t),
                e(this, n, i)
            }
            ,
            L.prototype.recalculate = function() {
                var t = this
                  , e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return i && this.queue.clear(),
                this.queue.add((function() {
                    return T(t, e, i)
                }
                ))
            }
            ,
            L.prototype.remove = function() {
                window.removeEventListener("resize", this.resizer),
                u(this.container.children, (function(t) {
                    t.removeAttribute("data-macy-complete"),
                    t.removeAttribute("style")
                }
                )),
                this.container.removeAttribute("style")
            }
            ,
            L.prototype.reInit = function() {
                this.recalculate(!0, !0),
                this.emit(this.constants.EVENT_INITIALIZED),
                window.addEventListener("resize", this.resizer),
                this.container.style.position = "relative"
            }
            ,
            L.prototype.on = function(t, e) {
                this.events.on(t, e)
            }
            ,
            L.prototype.emit = function(t, e) {
                this.events.emit(t, e)
            }
            ,
            L.constants = {
                EVENT_INITIALIZED: "macy.initialized",
                EVENT_RECALCULATED: "macy.recalculated",
                EVENT_IMAGE_LOAD: "macy.image.load",
                EVENT_IMAGE_ERROR: "macy.image.error",
                EVENT_IMAGE_COMPLETE: "macy.images.complete",
                EVENT_RESIZE: "macy.resize"
            },
            L.prototype.constants = L.constants,
            L
        }()
    }
    ))
      , se = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            return u(this, i),
            e.call(this, t)
        }
        return f(i, [{
            key: "init",
            value: function() {
                var t = this;
                setTimeout((function() {
                    t.instance = ne({
                        container: t.el,
                        columns: 3,
                        trueOrder: !0,
                        breakAt: {
                            700: 1,
                            1200: 3,
                            1400: 2
                        },
                        margin: {
                            x: 30,
                            y: 30
                        }
                    }),
                    t.refreshScroll = function(e) {
                        requestAnimationFrame((function() {
                            t.call("update", "Scroll")
                        }
                        ))
                    }
                    ,
                    t.refreshScroll(),
                    t.instance.on(t.instance.constants.EVENT_INITIALIZED, t.refreshScroll),
                    t.instance.on(t.instance.constants.EVENT_RESIZE, t.refreshScroll)
                }
                ), 1e3)
            }
        }, {
            key: "destroy",
            value: function() {
                this.instance.remove(),
                this.instance = null
            }
        }]),
        i
    }(c)
      , oe = function(t) {
        p(i, t);
        var e = g(i);
        function i(t) {
            var n;
            return u(this, i),
            n = e.call(this, t),
            window.isMobile || (n.events = {
                mouseenter: {
                    link: "hover"
                },
                mouseleave: {
                    link: "leave"
                }
            }),
            n
        }
        return f(i, [{
            key: "init",
            value: function() {}
        }, {
            key: "hover",
            value: function() {
                this.el.classList.add("has-hover")
            }
        }, {
            key: "leave",
            value: function() {
                this.el.classList.remove("has-hover")
            }
        }]),
        i
    }(c)
      , re = Object.freeze({
        __proto__: null,
        Load: S,
        Scroll: Rt,
        Mask: Wt,
        Split: Ht,
        Count: zt,
        Members: Nt,
        QuestionCarousel: Yt,
        ScientistPicture: Vt,
        Accordion: qt,
        Share: Xt,
        TriggerPopup: Ft,
        Popup: Ut,
        ThemesCarousel: Kt,
        Themes: Zt,
        Filters: Qt,
        FiltersButton: Jt,
        ThemeCard: te,
        MasonryGrid: se,
        Nav: oe
    })
      , ae = ie((function(t) {
        var e, i;
        e = ee,
        i = function() {
            function t(t, e, i) {
                if (i) {
                    var n = document.createDocumentFragment()
                      , s = !e.hasAttribute("viewBox") && i.getAttribute("viewBox");
                    s && e.setAttribute("viewBox", s);
                    for (var o = i.cloneNode(!0); o.childNodes.length; )
                        n.appendChild(o.firstChild);
                    t.appendChild(n)
                }
            }
            function e(e) {
                e.onreadystatechange = function() {
                    if (4 === e.readyState) {
                        var i = e._cachedDocument;
                        i || ((i = e._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = e.responseText,
                        e._cachedTarget = {}),
                        e._embeds.splice(0).map((function(n) {
                            var s = e._cachedTarget[n.id];
                            s || (s = e._cachedTarget[n.id] = i.getElementById(n.id)),
                            t(n.parent, n.svg, s)
                        }
                        ))
                    }
                }
                ,
                e.onreadystatechange()
            }
            function i(t) {
                for (var e = t; "svg" !== e.nodeName.toLowerCase() && (e = e.parentNode); )
                    ;
                return e
            }
            return function(n) {
                var s, o = Object(n), r = window.top !== window.self;
                s = "polyfill"in o ? o.polyfill : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 || (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537 || /\bEdge\/.(\d+)\b/.test(navigator.userAgent) && r;
                var a = {}
                  , l = window.requestAnimationFrame || setTimeout
                  , c = document.getElementsByTagName("use")
                  , h = 0;
                s && function n() {
                    for (var r = 0; r < c.length; ) {
                        var u = c[r]
                          , d = u.parentNode
                          , f = i(d)
                          , p = u.getAttribute("xlink:href") || u.getAttribute("href");
                        if (!p && o.attributeName && (p = u.getAttribute(o.attributeName)),
                        f && p) {
                            if (s)
                                if (!o.validate || o.validate(p, f, u)) {
                                    d.removeChild(u);
                                    var v = p.split("#")
                                      , m = v.shift()
                                      , y = v.join("#");
                                    if (m.length) {
                                        var g = a[m];
                                        g || ((g = a[m] = new XMLHttpRequest).open("GET", m),
                                        g.send(),
                                        g._embeds = []),
                                        g._embeds.push({
                                            parent: d,
                                            svg: f,
                                            id: y
                                        }),
                                        e(g)
                                    } else
                                        t(d, f, document.getElementById(y))
                                } else
                                    ++r,
                                    ++h
                        } else
                            ++r
                    }
                    (!c.length || c.length - h > 0) && l(n, 67)
                }()
            }
        }
        ,
        t.exports ? t.exports = i() : e.svg4everybody = i()
    }
    ));
    var le = ie((function(t, e) {
        t.exports = {
            polyfill: function() {
                var t = window
                  , e = document;
                if (!("scrollBehavior"in e.documentElement.style) || !0 === t.__forceSmoothScrollPolyfill__) {
                    var i, n = t.HTMLElement || t.Element, s = {
                        scroll: t.scroll || t.scrollTo,
                        scrollBy: t.scrollBy,
                        elementScroll: n.prototype.scroll || a,
                        scrollIntoView: n.prototype.scrollIntoView
                    }, o = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now, r = (i = t.navigator.userAgent,
                    new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(i) ? 1 : 0);
                    t.scroll = t.scrollTo = function() {
                        void 0 !== arguments[0] && (!0 !== l(arguments[0]) ? p.call(t, e.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset) : s.scroll.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset))
                    }
                    ,
                    t.scrollBy = function() {
                        void 0 !== arguments[0] && (l(arguments[0]) ? s.scrollBy.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : p.call(t, e.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset)))
                    }
                    ,
                    n.prototype.scroll = n.prototype.scrollTo = function() {
                        if (void 0 !== arguments[0])
                            if (!0 !== l(arguments[0])) {
                                var t = arguments[0].left
                                  , e = arguments[0].top;
                                p.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e)
                            } else {
                                if ("number" == typeof arguments[0] && void 0 === arguments[1])
                                    throw new SyntaxError("Value could not be converted");
                                s.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                            }
                    }
                    ,
                    n.prototype.scrollBy = function() {
                        void 0 !== arguments[0] && (!0 !== l(arguments[0]) ? this.scroll({
                            left: ~~arguments[0].left + this.scrollLeft,
                            top: ~~arguments[0].top + this.scrollTop,
                            behavior: arguments[0].behavior
                        }) : s.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
                    }
                    ,
                    n.prototype.scrollIntoView = function() {
                        if (!0 !== l(arguments[0])) {
                            var i = d(this)
                              , n = i.getBoundingClientRect()
                              , o = this.getBoundingClientRect();
                            i !== e.body ? (p.call(this, i, i.scrollLeft + o.left - n.left, i.scrollTop + o.top - n.top),
                            "fixed" !== t.getComputedStyle(i).position && t.scrollBy({
                                left: n.left,
                                top: n.top,
                                behavior: "smooth"
                            })) : t.scrollBy({
                                left: o.left,
                                top: o.top,
                                behavior: "smooth"
                            })
                        } else
                            s.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                    }
                }
                function a(t, e) {
                    this.scrollLeft = t,
                    this.scrollTop = e
                }
                function l(t) {
                    if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior)
                        return !0;
                    if ("object" == typeof t && "smooth" === t.behavior)
                        return !1;
                    throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.")
                }
                function c(t, e) {
                    return "Y" === e ? t.clientHeight + r < t.scrollHeight : "X" === e ? t.clientWidth + r < t.scrollWidth : void 0
                }
                function h(e, i) {
                    var n = t.getComputedStyle(e, null)["overflow" + i];
                    return "auto" === n || "scroll" === n
                }
                function u(t) {
                    var e = c(t, "Y") && h(t, "Y")
                      , i = c(t, "X") && h(t, "X");
                    return e || i
                }
                function d(t) {
                    for (; t !== e.body && !1 === u(t); )
                        t = t.parentNode || t.host;
                    return t
                }
                function f(e) {
                    var i, n, s, r, a = (o() - e.startTime) / 468;
                    r = a = a > 1 ? 1 : a,
                    i = .5 * (1 - Math.cos(Math.PI * r)),
                    n = e.startX + (e.x - e.startX) * i,
                    s = e.startY + (e.y - e.startY) * i,
                    e.method.call(e.scrollable, n, s),
                    n === e.x && s === e.y || t.requestAnimationFrame(f.bind(t, e))
                }
                function p(i, n, r) {
                    var l, c, h, u, d = o();
                    i === e.body ? (l = t,
                    c = t.scrollX || t.pageXOffset,
                    h = t.scrollY || t.pageYOffset,
                    u = s.scroll) : (l = i,
                    c = i.scrollLeft,
                    h = i.scrollTop,
                    u = a),
                    f({
                        scrollable: l,
                        method: u,
                        startTime: d,
                        startX: c,
                        startY: h,
                        x: n,
                        y: r
                    })
                }
            }
        }
    }
    ));
    le.polyfill;
    le.polyfill();
    var ce = new h({
        modules: re
    });
    function he() {
        ce.init(ce),
        ae(),
        setTimeout((function() {
            x.classList.add("is-first-load"),
            setTimeout((function() {
                x.classList.add("is-loaded"),
                x.classList.add("has-dom-ready"),
                x.classList.add("is-ready"),
                x.classList.remove("is-loading")
            }
            ), 2e3)
        }
        ), 600)
    }
    window.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1,
    window.isMobile && x.classList.add("is-mobile"),
    window.onload = function(t) {
        var e = document.getElementById("wac-theme-app-css");
        e.isLoaded ? he() : e.addEventListener("load", (function(t) {
            he()
        }
        ))
    }
}();
