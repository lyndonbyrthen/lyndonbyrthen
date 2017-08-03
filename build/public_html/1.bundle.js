webpackJsonp([1],{

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _matter = __webpack_require__(431);

var _matter2 = _interopRequireDefault(_matter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App2 = function (_React$Component) {
    _inherits(App2, _React$Component);

    function App2(props) {
        _classCallCheck(this, App2);

        var _this = _possibleConstructorReturn(this, (App2.__proto__ || Object.getPrototypeOf(App2)).call(this, props));

        _this.engine = _this.engine.bind(_this);

        return _this;
    }

    _createClass(App2, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // console.log(this.props.menuItem.name,nextProps)
            if (this.props.isCurApp && !nextProps.isCurApp) {
                //console.log('will stop');
                this.en.pause();
            } else if (!this.props.isCurApp && nextProps.isCurApp) {
                //console.log('will start');
                this.en.resume();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.en) return;
            try {
                this.en = this.engine();
            } catch (e) {
                console.log(e, 'ph error');
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.en.kill();
        }
    }, {
        key: 'engine',
        value: function engine() {
            var Engine = _matter2.default.Engine,
                Render = _matter2.default.Render,
                Runner = _matter2.default.Runner,
                Composite = _matter2.default.Composite,
                Composites = _matter2.default.Composites,
                Common = _matter2.default.Common,
                MouseConstraint = _matter2.default.MouseConstraint,
                Mouse = _matter2.default.Mouse,
                World = _matter2.default.World,
                Bodies = _matter2.default.Bodies;

            // create engine
            var engine = Engine.create(),
                world = engine.world;

            // create renderer
            var render = Render.create({
                element: this.refs.canvas,
                engine: engine,
                options: {
                    width: 800,
                    height: 600,
                    showAngleIndicator: true
                }
            });

            Render.run(render);

            // create runner
            var runner = Runner.create();
            Runner.run(runner, engine);

            // add bodies
            var stack = Composites.stack(20, 20, 20, 5, 0, 0, function (x, y) {
                return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
            });

            World.add(world, stack);

            World.add(world, [Bodies.rectangle(200, 150, 700, 20, { isStatic: true, angle: Math.PI * 0.06 }), Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06 }), Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04 })]);

            // add mouse control
            var mouse = Mouse.create(render.canvas),
                mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

            World.add(world, mouseConstraint);

            // keep the mouse in sync with rendering
            render.mouse = mouse;

            // fit the render viewport to the scene
            Render.lookAt(render, Composite.allBodies(world));

            // wrapping using matter-wrap plugin
            for (var i = 0; i < stack.bodies.length; i += 1) {
                stack.bodies[i].plugin.wrap = {
                    min: { x: render.bounds.min.x, y: render.bounds.min.y },
                    max: { x: render.bounds.max.x, y: render.bounds.max.y }
                };
            }

            // context for MatterTools.Demo
            return {
                engine: engine,
                runner: runner,
                render: render,
                canvas: render.canvas,
                pause: function pause() {
                    Runner.stop(runner);
                },
                resume: function resume() {
                    Runner.start(runner, engine);
                },
                kill: function kill() {
                    Render.stop(render);
                    Runner.stop(runner);
                }
            };
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement('div', { ref: 'canvas' });
        }
    }]);

    return App2;
}(_react2.default.Component);

exports.default = App2;

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* matter-js 0.13.0 by @liabru 2017-07-06
* http://brm.io/matter-js/
* License MIT
*/
!function (e) {
  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var t;t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.Matter = e();
  }
}(function () {
  return function e(t, n, o) {
    function i(s, a) {
      if (!n[s]) {
        if (!t[s]) {
          var l = "function" == typeof require && require;if (!a && l) return require(s, !0);if (r) return r(s, !0);var c = new Error("Cannot find module '" + s + "'");throw c.code = "MODULE_NOT_FOUND", c;
        }var d = n[s] = { exports: {} };t[s][0].call(d.exports, function (e) {
          var n = t[s][1][e];return i(n ? n : e);
        }, d, d.exports, e, t, n, o);
      }return n[s].exports;
    }for (var r = "function" == typeof require && require, s = 0; s < o.length; s++) {
      i(o[s]);
    }return i;
  }({ 1: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Vertices"),
          r = e("../geometry/Vector"),
          s = e("../core/Sleeping"),
          a = (e("../render/Render"), e("../core/Common")),
          l = e("../geometry/Bounds"),
          c = e("../geometry/Axes");!function () {
        o._inertiaScale = 4, o._nextCollidingGroupId = 1, o._nextNonCollidingGroupId = -1, o._nextCategory = 1, o.create = function (t) {
          var n = { id: a.nextId(), type: "body", label: "Body", parts: [], plugin: {}, angle: 0, vertices: i.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"), position: { x: 0, y: 0 }, force: { x: 0, y: 0 }, torque: 0, positionImpulse: { x: 0, y: 0 }, constraintImpulse: { x: 0, y: 0, angle: 0 }, totalContacts: 0, speed: 0, angularSpeed: 0, velocity: { x: 0, y: 0 }, angularVelocity: 0, isSensor: !1, isStatic: !1, isSleeping: !1, motion: 0, sleepThreshold: 60, density: .001, restitution: 0, friction: .1, frictionStatic: .5, frictionAir: .01, collisionFilter: { category: 1, mask: 4294967295, group: 0 }, slop: .05, timeScale: 1, render: { visible: !0, opacity: 1, sprite: { xScale: 1, yScale: 1, xOffset: 0, yOffset: 0 }, lineWidth: 0 } },
              o = a.extend(n, t);return e(o, t), o;
        }, o.nextGroup = function (e) {
          return e ? o._nextNonCollidingGroupId-- : o._nextCollidingGroupId++;
        }, o.nextCategory = function () {
          return o._nextCategory = o._nextCategory << 1, o._nextCategory;
        };var e = function e(_e, t) {
          t = t || {}, o.set(_e, { bounds: _e.bounds || l.create(_e.vertices), positionPrev: _e.positionPrev || r.clone(_e.position),
            anglePrev: _e.anglePrev || _e.angle, vertices: _e.vertices, parts: _e.parts || [_e], isStatic: _e.isStatic, isSleeping: _e.isSleeping, parent: _e.parent || _e }), i.rotate(_e.vertices, _e.angle, _e.position), c.rotate(_e.axes, _e.angle), l.update(_e.bounds, _e.vertices, _e.velocity), o.set(_e, { axes: t.axes || _e.axes, area: t.area || _e.area, mass: t.mass || _e.mass, inertia: t.inertia || _e.inertia });var n = _e.isStatic ? "#2e2b44" : a.choose(["#006BA6", "#0496FF", "#FFBC42", "#D81159", "#8F2D56"]),
              s = "#000";_e.render.fillStyle = _e.render.fillStyle || n, _e.render.strokeStyle = _e.render.strokeStyle || s, _e.render.sprite.xOffset += -(_e.bounds.min.x - _e.position.x) / (_e.bounds.max.x - _e.bounds.min.x), _e.render.sprite.yOffset += -(_e.bounds.min.y - _e.position.y) / (_e.bounds.max.y - _e.bounds.min.y);
        };o.set = function (e, t, n) {
          var i;"string" == typeof t && (i = t, t = {}, t[i] = n);for (i in t) {
            if (n = t[i], t.hasOwnProperty(i)) switch (i) {case "isStatic":
                o.setStatic(e, n);break;case "isSleeping":
                s.set(e, n);break;case "mass":
                o.setMass(e, n);break;case "density":
                o.setDensity(e, n);break;case "inertia":
                o.setInertia(e, n);break;case "vertices":
                o.setVertices(e, n);break;case "position":
                o.setPosition(e, n);break;case "angle":
                o.setAngle(e, n);break;case "velocity":
                o.setVelocity(e, n);break;case "angularVelocity":
                o.setAngularVelocity(e, n);break;case "parts":
                o.setParts(e, n);break;default:
                e[i] = n;}
          }
        }, o.setStatic = function (e, t) {
          for (var n = 0; n < e.parts.length; n++) {
            var o = e.parts[n];o.isStatic = t, t ? (o._original = { restitution: o.restitution, friction: o.friction, mass: o.mass, inertia: o.inertia, density: o.density, inverseMass: o.inverseMass, inverseInertia: o.inverseInertia }, o.restitution = 0, o.friction = 1, o.mass = o.inertia = o.density = 1 / 0, o.inverseMass = o.inverseInertia = 0, o.positionPrev.x = o.position.x, o.positionPrev.y = o.position.y, o.anglePrev = o.angle, o.angularVelocity = 0, o.speed = 0, o.angularSpeed = 0, o.motion = 0) : o._original && (o.restitution = o._original.restitution, o.friction = o._original.friction, o.mass = o._original.mass, o.inertia = o._original.inertia, o.density = o._original.density, o.inverseMass = o._original.inverseMass, o.inverseInertia = o._original.inverseInertia, delete o._original);
          }
        }, o.setMass = function (e, t) {
          e.mass = t, e.inverseMass = 1 / e.mass, e.density = e.mass / e.area;
        }, o.setDensity = function (e, t) {
          o.setMass(e, t * e.area), e.density = t;
        }, o.setInertia = function (e, t) {
          e.inertia = t, e.inverseInertia = 1 / e.inertia;
        }, o.setVertices = function (e, t) {
          t[0].body === e ? e.vertices = t : e.vertices = i.create(t, e), e.axes = c.fromVertices(e.vertices), e.area = i.area(e.vertices), o.setMass(e, e.density * e.area);var n = i.centre(e.vertices);i.translate(e.vertices, n, -1), o.setInertia(e, o._inertiaScale * i.inertia(e.vertices, e.mass)), i.translate(e.vertices, e.position), l.update(e.bounds, e.vertices, e.velocity);
        }, o.setParts = function (e, n, r) {
          var s;for (n = n.slice(0), e.parts.length = 0, e.parts.push(e), e.parent = e, s = 0; s < n.length; s++) {
            var a = n[s];a !== e && (a.parent = e, e.parts.push(a));
          }if (1 !== e.parts.length) {
            if (r = "undefined" == typeof r || r) {
              var l = [];for (s = 0; s < n.length; s++) {
                l = l.concat(n[s].vertices);
              }i.clockwiseSort(l);var c = i.hull(l),
                  d = i.centre(c);o.setVertices(e, c), i.translate(e.vertices, d);
            }var u = t(e);e.area = u.area, e.parent = e, e.position.x = u.centre.x, e.position.y = u.centre.y, e.positionPrev.x = u.centre.x, e.positionPrev.y = u.centre.y, o.setMass(e, u.mass), o.setInertia(e, u.inertia), o.setPosition(e, u.centre);
          }
        }, o.setPosition = function (e, t) {
          var n = r.sub(t, e.position);e.positionPrev.x += n.x, e.positionPrev.y += n.y;for (var o = 0; o < e.parts.length; o++) {
            var s = e.parts[o];s.position.x += n.x, s.position.y += n.y, i.translate(s.vertices, n), l.update(s.bounds, s.vertices, e.velocity);
          }
        }, o.setAngle = function (e, t) {
          var n = t - e.angle;e.anglePrev += n;for (var o = 0; o < e.parts.length; o++) {
            var s = e.parts[o];s.angle += n, i.rotate(s.vertices, n, e.position), c.rotate(s.axes, n), l.update(s.bounds, s.vertices, e.velocity), o > 0 && r.rotateAbout(s.position, n, e.position, s.position);
          }
        }, o.setVelocity = function (e, t) {
          e.positionPrev.x = e.position.x - t.x, e.positionPrev.y = e.position.y - t.y, e.velocity.x = t.x, e.velocity.y = t.y, e.speed = r.magnitude(e.velocity);
        }, o.setAngularVelocity = function (e, t) {
          e.anglePrev = e.angle - t, e.angularVelocity = t, e.angularSpeed = Math.abs(e.angularVelocity);
        }, o.translate = function (e, t) {
          o.setPosition(e, r.add(e.position, t));
        }, o.rotate = function (e, t, n) {
          if (n) {
            var i = Math.cos(t),
                r = Math.sin(t),
                s = e.position.x - n.x,
                a = e.position.y - n.y;o.setPosition(e, { x: n.x + (s * i - a * r), y: n.y + (s * r + a * i) }), o.setAngle(e, e.angle + t);
          } else o.setAngle(e, e.angle + t);
        }, o.scale = function (e, n, r, s) {
          for (var a = 0; a < e.parts.length; a++) {
            var d = e.parts[a];i.scale(d.vertices, n, r, e.position), d.axes = c.fromVertices(d.vertices), e.isStatic || (d.area = i.area(d.vertices), o.setMass(d, e.density * d.area), i.translate(d.vertices, { x: -d.position.x, y: -d.position.y }), o.setInertia(d, i.inertia(d.vertices, d.mass)), i.translate(d.vertices, { x: d.position.x, y: d.position.y })), l.update(d.bounds, d.vertices, e.velocity);
          }if (e.circleRadius && (n === r ? e.circleRadius *= n : e.circleRadius = null), !e.isStatic) {
            var u = t(e);e.area = u.area, o.setMass(e, u.mass), o.setInertia(e, u.inertia);
          }
        }, o.update = function (e, t, n, o) {
          var s = Math.pow(t * n * e.timeScale, 2),
              a = 1 - e.frictionAir * n * e.timeScale,
              d = e.position.x - e.positionPrev.x,
              u = e.position.y - e.positionPrev.y;e.velocity.x = d * a * o + e.force.x / e.mass * s, e.velocity.y = u * a * o + e.force.y / e.mass * s, e.positionPrev.x = e.position.x, e.positionPrev.y = e.position.y, e.position.x += e.velocity.x, e.position.y += e.velocity.y, e.angularVelocity = (e.angle - e.anglePrev) * a * o + e.torque / e.inertia * s, e.anglePrev = e.angle, e.angle += e.angularVelocity, e.speed = r.magnitude(e.velocity), e.angularSpeed = Math.abs(e.angularVelocity);for (var p = 0; p < e.parts.length; p++) {
            var f = e.parts[p];i.translate(f.vertices, e.velocity), p > 0 && (f.position.x += e.velocity.x, f.position.y += e.velocity.y), 0 !== e.angularVelocity && (i.rotate(f.vertices, e.angularVelocity, e.position), c.rotate(f.axes, e.angularVelocity), p > 0 && r.rotateAbout(f.position, e.angularVelocity, e.position, f.position)), l.update(f.bounds, f.vertices, e.velocity);
          }
        }, o.applyForce = function (e, t, n) {
          e.force.x += n.x, e.force.y += n.y;var o = { x: t.x - e.position.x, y: t.y - e.position.y };e.torque += o.x * n.y - o.y * n.x;
        };var t = function t(e) {
          for (var t = { mass: 0, area: 0, inertia: 0, centre: { x: 0, y: 0 } }, n = 1 === e.parts.length ? 0 : 1; n < e.parts.length; n++) {
            var o = e.parts[n];t.mass += o.mass, t.area += o.area, t.inertia += o.inertia, t.centre = r.add(t.centre, r.mult(o.position, o.mass !== 1 / 0 ? o.mass : 1));
          }return t.centre = r.div(t.centre, t.mass !== 1 / 0 ? t.mass : e.parts.length), t;
        };
      }();
    }, { "../core/Common": 14, "../core/Sleeping": 22, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29, "../render/Render": 31 }], 2: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../core/Events"),
          r = e("../core/Common"),
          s = e("./Body");!function () {
        o.create = function (e) {
          return r.extend({ id: r.nextId(), type: "composite", parent: null, isModified: !1, bodies: [], constraints: [], composites: [], label: "Composite", plugin: {} }, e);
        }, o.setModified = function (e, t, n, i) {
          if (e.isModified = t, n && e.parent && o.setModified(e.parent, t, n, i), i) for (var r = 0; r < e.composites.length; r++) {
            var s = e.composites[r];o.setModified(s, t, n, i);
          }
        }, o.add = function (e, t) {
          var n = [].concat(t);i.trigger(e, "beforeAdd", { object: t });for (var s = 0; s < n.length; s++) {
            var a = n[s];switch (a.type) {case "body":
                if (a.parent !== a) {
                  r.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break;
                }o.addBody(e, a);break;case "constraint":
                o.addConstraint(e, a);
                break;case "composite":
                o.addComposite(e, a);break;case "mouseConstraint":
                o.addConstraint(e, a.constraint);}
          }return i.trigger(e, "afterAdd", { object: t }), e;
        }, o.remove = function (e, t, n) {
          var r = [].concat(t);i.trigger(e, "beforeRemove", { object: t });for (var s = 0; s < r.length; s++) {
            var a = r[s];switch (a.type) {case "body":
                o.removeBody(e, a, n);break;case "constraint":
                o.removeConstraint(e, a, n);break;case "composite":
                o.removeComposite(e, a, n);break;case "mouseConstraint":
                o.removeConstraint(e, a.constraint);}
          }return i.trigger(e, "afterRemove", { object: t }), e;
        }, o.addComposite = function (e, t) {
          return e.composites.push(t), t.parent = e, o.setModified(e, !0, !0, !1), e;
        }, o.removeComposite = function (e, t, n) {
          var i = r.indexOf(e.composites, t);if (i !== -1 && (o.removeCompositeAt(e, i), o.setModified(e, !0, !0, !1)), n) for (var s = 0; s < e.composites.length; s++) {
            o.removeComposite(e.composites[s], t, !0);
          }return e;
        }, o.removeCompositeAt = function (e, t) {
          return e.composites.splice(t, 1), o.setModified(e, !0, !0, !1), e;
        }, o.addBody = function (e, t) {
          return e.bodies.push(t), o.setModified(e, !0, !0, !1), e;
        }, o.removeBody = function (e, t, n) {
          var i = r.indexOf(e.bodies, t);if (i !== -1 && (o.removeBodyAt(e, i), o.setModified(e, !0, !0, !1)), n) for (var s = 0; s < e.composites.length; s++) {
            o.removeBody(e.composites[s], t, !0);
          }return e;
        }, o.removeBodyAt = function (e, t) {
          return e.bodies.splice(t, 1), o.setModified(e, !0, !0, !1), e;
        }, o.addConstraint = function (e, t) {
          return e.constraints.push(t), o.setModified(e, !0, !0, !1), e;
        }, o.removeConstraint = function (e, t, n) {
          var i = r.indexOf(e.constraints, t);if (i !== -1 && o.removeConstraintAt(e, i), n) for (var s = 0; s < e.composites.length; s++) {
            o.removeConstraint(e.composites[s], t, !0);
          }return e;
        }, o.removeConstraintAt = function (e, t) {
          return e.constraints.splice(t, 1), o.setModified(e, !0, !0, !1), e;
        }, o.clear = function (e, t, n) {
          if (n) for (var i = 0; i < e.composites.length; i++) {
            o.clear(e.composites[i], t, !0);
          }return t ? e.bodies = e.bodies.filter(function (e) {
            return e.isStatic;
          }) : e.bodies.length = 0, e.constraints.length = 0, e.composites.length = 0, o.setModified(e, !0, !0, !1), e;
        }, o.allBodies = function (e) {
          for (var t = [].concat(e.bodies), n = 0; n < e.composites.length; n++) {
            t = t.concat(o.allBodies(e.composites[n]));
          }return t;
        }, o.allConstraints = function (e) {
          for (var t = [].concat(e.constraints), n = 0; n < e.composites.length; n++) {
            t = t.concat(o.allConstraints(e.composites[n]));
          }return t;
        }, o.allComposites = function (e) {
          for (var t = [].concat(e.composites), n = 0; n < e.composites.length; n++) {
            t = t.concat(o.allComposites(e.composites[n]));
          }return t;
        }, o.get = function (e, t, n) {
          var i, r;switch (n) {case "body":
              i = o.allBodies(e);break;case "constraint":
              i = o.allConstraints(e);break;case "composite":
              i = o.allComposites(e).concat(e);}return i ? (r = i.filter(function (e) {
            return e.id.toString() === t.toString();
          }), 0 === r.length ? null : r[0]) : null;
        }, o.move = function (e, t, n) {
          return o.remove(e, t), o.add(n, t), e;
        }, o.rebase = function (e) {
          for (var t = o.allBodies(e).concat(o.allConstraints(e)).concat(o.allComposites(e)), n = 0; n < t.length; n++) {
            t[n].id = r.nextId();
          }return o.setModified(e, !0, !0, !1), e;
        }, o.translate = function (e, t, n) {
          for (var i = n ? o.allBodies(e) : e.bodies, r = 0; r < i.length; r++) {
            s.translate(i[r], t);
          }return o.setModified(e, !0, !0, !1), e;
        }, o.rotate = function (e, t, n, i) {
          for (var r = Math.cos(t), a = Math.sin(t), l = i ? o.allBodies(e) : e.bodies, c = 0; c < l.length; c++) {
            var d = l[c],
                u = d.position.x - n.x,
                p = d.position.y - n.y;s.setPosition(d, { x: n.x + (u * r - p * a), y: n.y + (u * a + p * r) }), s.rotate(d, t);
          }return o.setModified(e, !0, !0, !1), e;
        }, o.scale = function (e, t, n, i, r) {
          for (var a = r ? o.allBodies(e) : e.bodies, l = 0; l < a.length; l++) {
            var c = a[l],
                d = c.position.x - i.x,
                u = c.position.y - i.y;s.setPosition(c, { x: i.x + d * t, y: i.y + u * n }), s.scale(c, t, n);
          }return o.setModified(e, !0, !0, !1), e;
        }, o.bounds = function (e) {
          for (var t = Matter.Composite.allBodies(e), n = [], o = 0; o < t.length; o += 1) {
            var i = t[o];n.push(i.bounds.min, i.bounds.max);
          }return Matter.Bounds.create(n);
        };
      }();
    }, { "../core/Common": 14, "../core/Events": 16, "./Body": 1 }], 3: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./Composite"),
          r = (e("../constraint/Constraint"), e("../core/Common"));!function () {
        o.create = function (e) {
          var t = i.create(),
              n = { label: "World", gravity: { x: 0, y: 1, scale: .001 }, bounds: { min: { x: -(1 / 0), y: -(1 / 0) }, max: { x: 1 / 0, y: 1 / 0 } } };return r.extend(t, n, e);
        };
      }();
    }, { "../constraint/Constraint": 12, "../core/Common": 14, "./Composite": 2 }], 4: [function (e, t, n) {
      var o = {};t.exports = o, function () {
        o.create = function (e) {
          return { id: o.id(e), vertex: e, normalImpulse: 0, tangentImpulse: 0 };
        }, o.id = function (e) {
          return e.body.id + "_" + e.index;
        };
      }();
    }, {}], 5: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./SAT"),
          r = e("./Pair"),
          s = e("../geometry/Bounds");!function () {
        o.collisions = function (e, t) {
          for (var n = [], a = t.pairs.table, l = 0; l < e.length; l++) {
            var c = e[l][0],
                d = e[l][1];if ((!c.isStatic && !c.isSleeping || !d.isStatic && !d.isSleeping) && o.canCollide(c.collisionFilter, d.collisionFilter) && s.overlaps(c.bounds, d.bounds)) for (var u = c.parts.length > 1 ? 1 : 0; u < c.parts.length; u++) {
              for (var p = c.parts[u], f = d.parts.length > 1 ? 1 : 0; f < d.parts.length; f++) {
                var m = d.parts[f];if (p === c && m === d || s.overlaps(p.bounds, m.bounds)) {
                  var v,
                      y = r.id(p, m),
                      g = a[y];v = g && g.isActive ? g.collision : null;var x = i.collides(p, m, v);x.collided && n.push(x);
                }
              }
            }
          }return n;
        }, o.canCollide = function (e, t) {
          return e.group === t.group && 0 !== e.group ? e.group > 0 : 0 !== (e.mask & t.category) && 0 !== (t.mask & e.category);
        };
      }();
    }, { "../geometry/Bounds": 26, "./Pair": 7, "./SAT": 11 }], 6: [function (e, t, n) {
      var o = {};t.exports = o;
      var i = e("./Pair"),
          r = e("./Detector"),
          s = e("../core/Common");!function () {
        o.create = function (e) {
          var t = { controller: o, detector: r.collisions, buckets: {}, pairs: {}, pairsList: [], bucketWidth: 48, bucketHeight: 48 };return s.extend(t, e);
        }, o.update = function (n, o, i, r) {
          var s,
              p,
              f,
              m,
              v,
              y = i.world,
              g = n.buckets,
              x = !1;for (s = 0; s < o.length; s++) {
            var h = o[s];if ((!h.isSleeping || r) && !(h.bounds.max.x < y.bounds.min.x || h.bounds.min.x > y.bounds.max.x || h.bounds.max.y < y.bounds.min.y || h.bounds.min.y > y.bounds.max.y)) {
              var b = t(n, h);if (!h.region || b.id !== h.region.id || r) {
                h.region && !r || (h.region = b);var w = e(b, h.region);for (p = w.startCol; p <= w.endCol; p++) {
                  for (f = w.startRow; f <= w.endRow; f++) {
                    v = a(p, f), m = g[v];var S = p >= b.startCol && p <= b.endCol && f >= b.startRow && f <= b.endRow,
                        C = p >= h.region.startCol && p <= h.region.endCol && f >= h.region.startRow && f <= h.region.endRow;!S && C && C && m && d(n, m, h), (h.region === b || S && !C || r) && (m || (m = l(g, v)), c(n, m, h));
                  }
                }h.region = b, x = !0;
              }
            }
          }x && (n.pairsList = u(n));
        }, o.clear = function (e) {
          e.buckets = {}, e.pairs = {}, e.pairsList = [];
        };var e = function e(_e2, t) {
          var o = Math.min(_e2.startCol, t.startCol),
              i = Math.max(_e2.endCol, t.endCol),
              r = Math.min(_e2.startRow, t.startRow),
              s = Math.max(_e2.endRow, t.endRow);
          return n(o, i, r, s);
        },
            t = function t(e, _t) {
          var o = _t.bounds,
              i = Math.floor(o.min.x / e.bucketWidth),
              r = Math.floor(o.max.x / e.bucketWidth),
              s = Math.floor(o.min.y / e.bucketHeight),
              a = Math.floor(o.max.y / e.bucketHeight);return n(i, r, s, a);
        },
            n = function n(e, t, _n, o) {
          return { id: e + "," + t + "," + _n + "," + o, startCol: e, endCol: t, startRow: _n, endRow: o };
        },
            a = function a(e, t) {
          return "C" + e + "R" + t;
        },
            l = function l(e, t) {
          var n = e[t] = [];return n;
        },
            c = function c(e, t, n) {
          for (var o = 0; o < t.length; o++) {
            var r = t[o];if (!(n.id === r.id || n.isStatic && r.isStatic)) {
              var s = i.id(n, r),
                  a = e.pairs[s];a ? a[2] += 1 : e.pairs[s] = [n, r, 1];
            }
          }t.push(n);
        },
            d = function d(e, t, n) {
          t.splice(s.indexOf(t, n), 1);for (var o = 0; o < t.length; o++) {
            var r = t[o],
                a = i.id(n, r),
                l = e.pairs[a];l && (l[2] -= 1);
          }
        },
            u = function u(e) {
          var t,
              n,
              o = [];t = s.keys(e.pairs);for (var i = 0; i < t.length; i++) {
            n = e.pairs[t[i]], n[2] > 0 ? o.push(n) : delete e.pairs[t[i]];
          }return o;
        };
      }();
    }, { "../core/Common": 14, "./Detector": 5, "./Pair": 7 }], 7: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./Contact");!function () {
        o.create = function (e, t) {
          var n = e.bodyA,
              i = e.bodyB,
              r = e.parentA,
              s = e.parentB,
              a = {
            id: o.id(n, i), bodyA: n, bodyB: i, contacts: {}, activeContacts: [], separation: 0, isActive: !0, isSensor: n.isSensor || i.isSensor, timeCreated: t, timeUpdated: t, inverseMass: r.inverseMass + s.inverseMass, friction: Math.min(r.friction, s.friction), frictionStatic: Math.max(r.frictionStatic, s.frictionStatic), restitution: Math.max(r.restitution, s.restitution), slop: Math.max(r.slop, s.slop) };return o.update(a, e, t), a;
        }, o.update = function (e, t, n) {
          var r = e.contacts,
              s = t.supports,
              a = e.activeContacts,
              l = t.parentA,
              c = t.parentB;if (e.collision = t, e.inverseMass = l.inverseMass + c.inverseMass, e.friction = Math.min(l.friction, c.friction), e.frictionStatic = Math.max(l.frictionStatic, c.frictionStatic), e.restitution = Math.max(l.restitution, c.restitution), e.slop = Math.max(l.slop, c.slop), a.length = 0, t.collided) {
            for (var d = 0; d < s.length; d++) {
              var u = s[d],
                  p = i.id(u),
                  f = r[p];f ? a.push(f) : a.push(r[p] = i.create(u));
            }e.separation = t.depth, o.setActive(e, !0, n);
          } else e.isActive === !0 && o.setActive(e, !1, n);
        }, o.setActive = function (e, t, n) {
          t ? (e.isActive = !0, e.timeUpdated = n) : (e.isActive = !1, e.activeContacts.length = 0);
        }, o.id = function (e, t) {
          return e.id < t.id ? "A" + e.id + "B" + t.id : "A" + t.id + "B" + e.id;
        };
      }();
    }, { "./Contact": 4 }], 8: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./Pair"),
          r = e("../core/Common");!function () {
        var e = 1e3;o.create = function (e) {
          return r.extend({ table: {}, list: [], collisionStart: [], collisionActive: [], collisionEnd: [] }, e);
        }, o.update = function (e, t, n) {
          var o,
              s,
              a,
              l,
              c = e.list,
              d = e.table,
              u = e.collisionStart,
              p = e.collisionEnd,
              f = e.collisionActive,
              m = [];for (u.length = 0, p.length = 0, f.length = 0, l = 0; l < t.length; l++) {
            o = t[l], o.collided && (s = i.id(o.bodyA, o.bodyB), m.push(s), a = d[s], a ? (a.isActive ? f.push(a) : u.push(a), i.update(a, o, n)) : (a = i.create(o, n), d[s] = a, u.push(a), c.push(a)));
          }for (l = 0; l < c.length; l++) {
            a = c[l], a.isActive && r.indexOf(m, a.id) === -1 && (i.setActive(a, !1, n), p.push(a));
          }
        }, o.removeOld = function (t, n) {
          var o,
              i,
              r,
              s,
              a = t.list,
              l = t.table,
              c = [];for (s = 0; s < a.length; s++) {
            o = a[s], i = o.collision, i.bodyA.isSleeping || i.bodyB.isSleeping ? o.timeUpdated = n : n - o.timeUpdated > e && c.push(s);
          }for (s = 0; s < c.length; s++) {
            r = c[s] - s, o = a[r], delete l[o.id], a.splice(r, 1);
          }
        }, o.clear = function (e) {
          return e.table = {}, e.list.length = 0, e.collisionStart.length = 0, e.collisionActive.length = 0, e.collisionEnd.length = 0, e;
        };
      }();
    }, { "../core/Common": 14, "./Pair": 7 }], 9: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Vector"),
          r = e("./SAT"),
          s = e("../geometry/Bounds"),
          a = e("../factory/Bodies"),
          l = e("../geometry/Vertices");!function () {
        o.ray = function (e, t, n, o) {
          o = o || 1e-100;for (var l = i.angle(t, n), c = i.magnitude(i.sub(t, n)), d = .5 * (n.x + t.x), u = .5 * (n.y + t.y), p = a.rectangle(d, u, c, o, { angle: l }), f = [], m = 0; m < e.length; m++) {
            var v = e[m];if (s.overlaps(v.bounds, p.bounds)) for (var y = 1 === v.parts.length ? 0 : 1; y < v.parts.length; y++) {
              var g = v.parts[y];if (s.overlaps(g.bounds, p.bounds)) {
                var x = r.collides(g, p);if (x.collided) {
                  x.body = x.bodyA = x.bodyB = v, f.push(x);break;
                }
              }
            }
          }return f;
        }, o.region = function (e, t, n) {
          for (var o = [], i = 0; i < e.length; i++) {
            var r = e[i],
                a = s.overlaps(r.bounds, t);(a && !n || !a && n) && o.push(r);
          }return o;
        }, o.point = function (e, t) {
          for (var n = [], o = 0; o < e.length; o++) {
            var i = e[o];if (s.contains(i.bounds, t)) for (var r = 1 === i.parts.length ? 0 : 1; r < i.parts.length; r++) {
              var a = i.parts[r];if (s.contains(a.bounds, t) && l.contains(a.vertices, t)) {
                n.push(i);break;
              }
            }
          }return n;
        };
      }();
    }, { "../factory/Bodies": 23, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29, "./SAT": 11 }], 10: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Vertices"),
          r = e("../geometry/Vector"),
          s = e("../core/Common"),
          a = e("../geometry/Bounds");!function () {
        o._restingThresh = 4, o._restingThreshTangent = 6, o._positionDampen = .9, o._positionWarming = .8, o._frictionNormalMultiplier = 5, o.preSolvePosition = function (e) {
          var t, n, o;for (t = 0; t < e.length; t++) {
            n = e[t], n.isActive && (o = n.activeContacts.length, n.collision.parentA.totalContacts += o, n.collision.parentB.totalContacts += o);
          }
        }, o.solvePosition = function (e, t) {
          var n,
              i,
              s,
              a,
              l,
              c,
              d,
              u,
              p,
              f = r._temp[0],
              m = r._temp[1],
              v = r._temp[2],
              y = r._temp[3];for (n = 0; n < e.length; n++) {
            i = e[n], i.isActive && !i.isSensor && (s = i.collision, a = s.parentA, l = s.parentB, c = s.normal, d = r.sub(r.add(l.positionImpulse, l.position, f), r.add(a.positionImpulse, r.sub(l.position, s.penetration, m), v), y), i.separation = r.dot(c, d));
          }for (n = 0; n < e.length; n++) {
            i = e[n], i.isActive && !i.isSensor && (s = i.collision, a = s.parentA, l = s.parentB, c = s.normal, p = (i.separation - i.slop) * t, (a.isStatic || l.isStatic) && (p *= 2), a.isStatic || a.isSleeping || (u = o._positionDampen / a.totalContacts, a.positionImpulse.x += c.x * p * u, a.positionImpulse.y += c.y * p * u), l.isStatic || l.isSleeping || (u = o._positionDampen / l.totalContacts, l.positionImpulse.x -= c.x * p * u, l.positionImpulse.y -= c.y * p * u));
          }
        }, o.postSolvePosition = function (e) {
          for (var t = 0; t < e.length; t++) {
            var n = e[t];if (n.totalContacts = 0, 0 !== n.positionImpulse.x || 0 !== n.positionImpulse.y) {
              for (var s = 0; s < n.parts.length; s++) {
                var l = n.parts[s];i.translate(l.vertices, n.positionImpulse), a.update(l.bounds, l.vertices, n.velocity), l.position.x += n.positionImpulse.x, l.position.y += n.positionImpulse.y;
              }n.positionPrev.x += n.positionImpulse.x, n.positionPrev.y += n.positionImpulse.y, r.dot(n.positionImpulse, n.velocity) < 0 ? (n.positionImpulse.x = 0, n.positionImpulse.y = 0) : (n.positionImpulse.x *= o._positionWarming, n.positionImpulse.y *= o._positionWarming);
            }
          }
        }, o.preSolveVelocity = function (e) {
          var t,
              n,
              o,
              i,
              s,
              a,
              l,
              c,
              d,
              u,
              p,
              f,
              m,
              v,
              y = r._temp[0],
              g = r._temp[1];for (t = 0; t < e.length; t++) {
            if (o = e[t], o.isActive && !o.isSensor) for (i = o.activeContacts, s = o.collision, a = s.parentA, l = s.parentB, c = s.normal, d = s.tangent, n = 0; n < i.length; n++) {
              u = i[n], p = u.vertex, f = u.normalImpulse, m = u.tangentImpulse, 0 === f && 0 === m || (y.x = c.x * f + d.x * m, y.y = c.y * f + d.y * m, a.isStatic || a.isSleeping || (v = r.sub(p, a.position, g), a.positionPrev.x += y.x * a.inverseMass, a.positionPrev.y += y.y * a.inverseMass, a.anglePrev += r.cross(v, y) * a.inverseInertia), l.isStatic || l.isSleeping || (v = r.sub(p, l.position, g), l.positionPrev.x -= y.x * l.inverseMass, l.positionPrev.y -= y.y * l.inverseMass, l.anglePrev -= r.cross(v, y) * l.inverseInertia));
            }
          }
        }, o.solveVelocity = function (e, t) {
          for (var n = t * t, i = r._temp[0], a = r._temp[1], l = r._temp[2], c = r._temp[3], d = r._temp[4], u = r._temp[5], p = 0; p < e.length; p++) {
            var f = e[p];if (f.isActive && !f.isSensor) {
              var m = f.collision,
                  v = m.parentA,
                  y = m.parentB,
                  g = m.normal,
                  x = m.tangent,
                  h = f.activeContacts,
                  b = 1 / h.length;v.velocity.x = v.position.x - v.positionPrev.x, v.velocity.y = v.position.y - v.positionPrev.y, y.velocity.x = y.position.x - y.positionPrev.x, y.velocity.y = y.position.y - y.positionPrev.y, v.angularVelocity = v.angle - v.anglePrev, y.angularVelocity = y.angle - y.anglePrev;for (var w = 0; w < h.length; w++) {
                var S = h[w],
                    C = S.vertex,
                    A = r.sub(C, v.position, a),
                    P = r.sub(C, y.position, l),
                    B = r.add(v.velocity, r.mult(r.perp(A), v.angularVelocity), c),
                    M = r.add(y.velocity, r.mult(r.perp(P), y.angularVelocity), d),
                    k = r.sub(B, M, u),
                    I = r.dot(g, k),
                    T = r.dot(x, k),
                    V = Math.abs(T),
                    _ = s.sign(T),
                    R = (1 + f.restitution) * I,
                    E = s.clamp(f.separation + I, 0, 1) * o._frictionNormalMultiplier,
                    L = T,
                    F = 1 / 0;V > f.friction * f.frictionStatic * E * n && (F = V, L = s.clamp(f.friction * _ * n, -F, F));var O = r.cross(A, g),
                    q = r.cross(P, g),
                    W = b / (v.inverseMass + y.inverseMass + v.inverseInertia * O * O + y.inverseInertia * q * q);if (R *= W, L *= W, I < 0 && I * I > o._restingThresh * n) S.normalImpulse = 0;else {
                  var D = S.normalImpulse;S.normalImpulse = Math.min(S.normalImpulse + R, 0), R = S.normalImpulse - D;
                }if (T * T > o._restingThreshTangent * n) S.tangentImpulse = 0;else {
                  var N = S.tangentImpulse;S.tangentImpulse = s.clamp(S.tangentImpulse + L, -F, F), L = S.tangentImpulse - N;
                }i.x = g.x * R + x.x * L, i.y = g.y * R + x.y * L, v.isStatic || v.isSleeping || (v.positionPrev.x += i.x * v.inverseMass, v.positionPrev.y += i.y * v.inverseMass, v.anglePrev += r.cross(A, i) * v.inverseInertia), y.isStatic || y.isSleeping || (y.positionPrev.x -= i.x * y.inverseMass, y.positionPrev.y -= i.y * y.inverseMass, y.anglePrev -= r.cross(P, i) * y.inverseInertia);
              }
            }
          }
        };
      }();
    }, { "../core/Common": 14, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 11: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Vertices"),
          r = e("../geometry/Vector");!function () {
        o.collides = function (t, o, s) {
          var a,
              l,
              c,
              d,
              u = !1;if (s) {
            var p = t.parent,
                f = o.parent,
                m = p.speed * p.speed + p.angularSpeed * p.angularSpeed + f.speed * f.speed + f.angularSpeed * f.angularSpeed;u = s && s.collided && m < .2, d = s;
          } else d = { collided: !1, bodyA: t, bodyB: o };if (s && u) {
            var v = d.axisBody,
                y = v === t ? o : t,
                g = [v.axes[s.axisNumber]];if (c = e(v.vertices, y.vertices, g), d.reused = !0, c.overlap <= 0) return d.collided = !1, d;
          } else {
            if (a = e(t.vertices, o.vertices, t.axes), a.overlap <= 0) return d.collided = !1, d;if (l = e(o.vertices, t.vertices, o.axes), l.overlap <= 0) return d.collided = !1, d;a.overlap < l.overlap ? (c = a, d.axisBody = t) : (c = l, d.axisBody = o), d.axisNumber = c.axisNumber;
          }d.bodyA = t.id < o.id ? t : o, d.bodyB = t.id < o.id ? o : t, d.collided = !0, d.depth = c.overlap, d.parentA = d.bodyA.parent, d.parentB = d.bodyB.parent, t = d.bodyA, o = d.bodyB, r.dot(c.axis, r.sub(o.position, t.position)) < 0 ? d.normal = { x: c.axis.x, y: c.axis.y } : d.normal = { x: -c.axis.x, y: -c.axis.y }, d.tangent = r.perp(d.normal), d.penetration = d.penetration || {}, d.penetration.x = d.normal.x * d.depth, d.penetration.y = d.normal.y * d.depth;var x = n(t, o, d.normal),
              h = [];if (i.contains(t.vertices, x[0]) && h.push(x[0]), i.contains(t.vertices, x[1]) && h.push(x[1]), h.length < 2) {
            var b = n(o, t, r.neg(d.normal));i.contains(o.vertices, b[0]) && h.push(b[0]), h.length < 2 && i.contains(o.vertices, b[1]) && h.push(b[1]);
          }return h.length < 1 && (h = [x[0]]), d.supports = h, d;
        };var e = function e(_e3, n, o) {
          for (var i, s, a = r._temp[0], l = r._temp[1], c = { overlap: Number.MAX_VALUE }, d = 0; d < o.length; d++) {
            if (s = o[d], t(a, _e3, s), t(l, n, s), i = Math.min(a.max - l.min, l.max - a.min), i <= 0) return c.overlap = i, c;i < c.overlap && (c.overlap = i, c.axis = s, c.axisNumber = d);
          }return c;
        },
            t = function t(e, _t2, n) {
          for (var o = r.dot(_t2[0], n), i = o, s = 1; s < _t2.length; s += 1) {
            var a = r.dot(_t2[s], n);a > i ? i = a : a < o && (o = a);
          }e.min = o, e.max = i;
        },
            n = function n(e, t, _n2) {
          for (var o, i, s, a, l = Number.MAX_VALUE, c = r._temp[0], d = t.vertices, u = e.position, p = 0; p < d.length; p++) {
            i = d[p], c.x = i.x - u.x, c.y = i.y - u.y, o = -r.dot(_n2, c), o < l && (l = o, s = i);
          }var f = s.index - 1 >= 0 ? s.index - 1 : d.length - 1;i = d[f], c.x = i.x - u.x, c.y = i.y - u.y, l = -r.dot(_n2, c), a = i;var m = (s.index + 1) % d.length;return i = d[m], c.x = i.x - u.x, c.y = i.y - u.y, o = -r.dot(_n2, c), o < l && (a = i), [s, a];
        };
      }();
    }, { "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 12: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Vertices"),
          r = e("../geometry/Vector"),
          s = e("../core/Sleeping"),
          a = e("../geometry/Bounds"),
          l = e("../geometry/Axes"),
          c = e("../core/Common");!function () {
        o._warming = .4, o._torqueDampen = 1, o._minLength = 1e-6, o.create = function (e) {
          var t = e;t.bodyA && !t.pointA && (t.pointA = { x: 0, y: 0 }), t.bodyB && !t.pointB && (t.pointB = { x: 0, y: 0 });var n = t.bodyA ? r.add(t.bodyA.position, t.pointA) : t.pointA,
              o = t.bodyB ? r.add(t.bodyB.position, t.pointB) : t.pointB,
              i = r.magnitude(r.sub(n, o));
          t.length = "undefined" != typeof t.length ? t.length : i, t.id = t.id || c.nextId(), t.label = t.label || "Constraint", t.type = "constraint", t.stiffness = t.stiffness || (t.length > 0 ? 1 : .7), t.damping = t.damping || 0, t.angularStiffness = t.angularStiffness || 0, t.angleA = t.bodyA ? t.bodyA.angle : t.angleA, t.angleB = t.bodyB ? t.bodyB.angle : t.angleB, t.plugin = {};var s = { visible: !0, lineWidth: 2, strokeStyle: "#ffffff", type: "line", anchors: !0 };return 0 === t.length && t.stiffness > .1 ? (s.type = "pin", s.anchors = !1) : t.stiffness < .9 && (s.type = "spring"), t.render = c.extend(s, t.render), t;
        }, o.preSolveAll = function (e) {
          for (var t = 0; t < e.length; t += 1) {
            var n = e[t],
                o = n.constraintImpulse;n.isStatic || 0 === o.x && 0 === o.y && 0 === o.angle || (n.position.x += o.x, n.position.y += o.y, n.angle += o.angle);
          }
        }, o.solveAll = function (e, t) {
          for (var n = 0; n < e.length; n += 1) {
            var i = e[n],
                r = !i.bodyA || i.bodyA && i.bodyA.isStatic,
                s = !i.bodyB || i.bodyB && i.bodyB.isStatic;(r || s) && o.solve(e[n], t);
          }for (n = 0; n < e.length; n += 1) {
            i = e[n], r = !i.bodyA || i.bodyA && i.bodyA.isStatic, s = !i.bodyB || i.bodyB && i.bodyB.isStatic, r || s || o.solve(e[n], t);
          }
        }, o.solve = function (e, t) {
          var n = e.bodyA,
              i = e.bodyB,
              s = e.pointA,
              a = e.pointB;if (n || i) {
            n && !n.isStatic && (r.rotate(s, n.angle - e.angleA, s), e.angleA = n.angle), i && !i.isStatic && (r.rotate(a, i.angle - e.angleB, a), e.angleB = i.angle);var l = s,
                c = a;if (n && (l = r.add(n.position, s)), i && (c = r.add(i.position, a)), l && c) {
              var d = r.sub(l, c),
                  u = r.magnitude(d);u < o._minLength && (u = o._minLength);var p,
                  f,
                  m,
                  v,
                  y,
                  g = (u - e.length) / u,
                  x = e.stiffness < 1 ? e.stiffness * t : e.stiffness,
                  h = r.mult(d, g * x),
                  b = (n ? n.inverseMass : 0) + (i ? i.inverseMass : 0),
                  w = (n ? n.inverseInertia : 0) + (i ? i.inverseInertia : 0),
                  S = b + w;if (e.damping) {
                var C = r.create();m = r.div(d, u), y = r.sub(i && r.sub(i.position, i.positionPrev) || C, n && r.sub(n.position, n.positionPrev) || C), v = r.dot(m, y);
              }n && !n.isStatic && (f = n.inverseMass / b, n.constraintImpulse.x -= h.x * f, n.constraintImpulse.y -= h.y * f, n.position.x -= h.x * f, n.position.y -= h.y * f, e.damping && (n.positionPrev.x -= e.damping * m.x * v * f, n.positionPrev.y -= e.damping * m.y * v * f), p = r.cross(s, h) / S * o._torqueDampen * n.inverseInertia * (1 - e.angularStiffness), n.constraintImpulse.angle -= p, n.angle -= p), i && !i.isStatic && (f = i.inverseMass / b, i.constraintImpulse.x += h.x * f, i.constraintImpulse.y += h.y * f, i.position.x += h.x * f, i.position.y += h.y * f, e.damping && (i.positionPrev.x += e.damping * m.x * v * f, i.positionPrev.y += e.damping * m.y * v * f), p = r.cross(a, h) / S * o._torqueDampen * i.inverseInertia * (1 - e.angularStiffness), i.constraintImpulse.angle += p, i.angle += p);
            }
          }
        }, o.postSolveAll = function (e) {
          for (var t = 0; t < e.length; t++) {
            var n = e[t],
                c = n.constraintImpulse;if (!(n.isStatic || 0 === c.x && 0 === c.y && 0 === c.angle)) {
              s.set(n, !1);for (var d = 0; d < n.parts.length; d++) {
                var u = n.parts[d];i.translate(u.vertices, c), d > 0 && (u.position.x += c.x, u.position.y += c.y), 0 !== c.angle && (i.rotate(u.vertices, c.angle, n.position), l.rotate(u.axes, c.angle), d > 0 && r.rotateAbout(u.position, c.angle, n.position, u.position)), a.update(u.bounds, u.vertices, n.velocity);
              }c.angle *= o._warming, c.x *= o._warming, c.y *= o._warming;
            }
          }
        };
      }();
    }, { "../core/Common": 14, "../core/Sleeping": 22, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 13: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Vertices"),
          r = e("../core/Sleeping"),
          s = e("../core/Mouse"),
          a = e("../core/Events"),
          l = e("../collision/Detector"),
          c = e("./Constraint"),
          d = e("../body/Composite"),
          u = e("../core/Common"),
          p = e("../geometry/Bounds");!function () {
        o.create = function (t, n) {
          var i = (t ? t.mouse : null) || (n ? n.mouse : null);i || (t && t.render && t.render.canvas ? i = s.create(t.render.canvas) : n && n.element ? i = s.create(n.element) : (i = s.create(), u.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var r = c.create({ label: "Mouse Constraint", pointA: i.position, pointB: { x: 0, y: 0 }, length: .01, stiffness: .1, angularStiffness: 1, render: { strokeStyle: "#90EE90", lineWidth: 3 } }),
              l = { type: "mouseConstraint", mouse: i, element: null, body: null, constraint: r, collisionFilter: { category: 1, mask: 4294967295, group: 0 } },
              p = u.extend(l, n);return a.on(t, "beforeUpdate", function () {
            var n = d.allBodies(t.world);o.update(p, n), e(p);
          }), p;
        }, o.update = function (e, t) {
          var n = e.mouse,
              o = e.constraint,
              s = e.body;
          if (0 === n.button) {
            if (o.bodyB) r.set(o.bodyB, !1), o.pointA = n.position;else for (var c = 0; c < t.length; c++) {
              if (s = t[c], p.contains(s.bounds, n.position) && l.canCollide(s.collisionFilter, e.collisionFilter)) for (var d = s.parts.length > 1 ? 1 : 0; d < s.parts.length; d++) {
                var u = s.parts[d];if (i.contains(u.vertices, n.position)) {
                  o.pointA = n.position, o.bodyB = e.body = s, o.pointB = { x: n.position.x - s.position.x, y: n.position.y - s.position.y }, o.angleB = s.angle, r.set(s, !1), a.trigger(e, "startdrag", { mouse: n, body: s });break;
                }
              }
            }
          } else o.bodyB = e.body = null, o.pointB = null, s && a.trigger(e, "enddrag", { mouse: n, body: s });
        };var e = function e(_e4) {
          var t = _e4.mouse,
              n = t.sourceEvents;n.mousemove && a.trigger(_e4, "mousemove", { mouse: t }), n.mousedown && a.trigger(_e4, "mousedown", { mouse: t }), n.mouseup && a.trigger(_e4, "mouseup", { mouse: t }), s.clearSourceEvents(t);
        };
      }();
    }, { "../body/Composite": 2, "../collision/Detector": 5, "../core/Common": 14, "../core/Events": 16, "../core/Mouse": 19, "../core/Sleeping": 22, "../geometry/Bounds": 26, "../geometry/Vertices": 29, "./Constraint": 12 }], 14: [function (e, t, n) {
      var o = {};t.exports = o, function () {
        o._nextId = 0, o._seed = 0, o._nowStartTime = +new Date(), o.extend = function (e, t) {
          var n, i;"boolean" == typeof t ? (n = 2, i = t) : (n = 1, i = !0);for (var r = n; r < arguments.length; r++) {
            var s = arguments[r];if (s) for (var a in s) {
              i && s[a] && s[a].constructor === Object ? e[a] && e[a].constructor !== Object ? e[a] = s[a] : (e[a] = e[a] || {}, o.extend(e[a], i, s[a])) : e[a] = s[a];
            }
          }return e;
        }, o.clone = function (e, t) {
          return o.extend({}, t, e);
        }, o.keys = function (e) {
          if (Object.keys) return Object.keys(e);var t = [];for (var n in e) {
            t.push(n);
          }return t;
        }, o.values = function (e) {
          var t = [];if (Object.keys) {
            for (var n = Object.keys(e), o = 0; o < n.length; o++) {
              t.push(e[n[o]]);
            }return t;
          }for (var i in e) {
            t.push(e[i]);
          }return t;
        }, o.get = function (e, t, n, o) {
          t = t.split(".").slice(n, o);for (var i = 0; i < t.length; i += 1) {
            e = e[t[i]];
          }return e;
        }, o.set = function (e, t, n, i, r) {
          var s = t.split(".").slice(i, r);return o.get(e, t, 0, -1)[s[s.length - 1]] = n, n;
        }, o.shuffle = function (e) {
          for (var t = e.length - 1; t > 0; t--) {
            var n = Math.floor(o.random() * (t + 1)),
                i = e[t];e[t] = e[n], e[n] = i;
          }return e;
        }, o.choose = function (e) {
          return e[Math.floor(o.random() * e.length)];
        }, o.isElement = function (e) {
          return e instanceof HTMLElement;
        }, o.isArray = function (e) {
          return "[object Array]" === Object.prototype.toString.call(e);
        }, o.isFunction = function (e) {
          return "function" == typeof e;
        }, o.isPlainObject = function (e) {
          return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.constructor === Object;
        }, o.isString = function (e) {
          return "[object String]" === toString.call(e);
        }, o.clamp = function (e, t, n) {
          return e < t ? t : e > n ? n : e;
        }, o.sign = function (e) {
          return e < 0 ? -1 : 1;
        }, o.now = function () {
          if (window.performance) {
            if (window.performance.now) return window.performance.now();if (window.performance.webkitNow) return window.performance.webkitNow();
          }return new Date() - o._nowStartTime;
        }, o.random = function (t, n) {
          return t = "undefined" != typeof t ? t : 0, n = "undefined" != typeof n ? n : 1, t + e() * (n - t);
        };var e = function e() {
          return o._seed = (9301 * o._seed + 49297) % 233280, o._seed / 233280;
        };o.colorToNumber = function (e) {
          return e = e.replace("#", ""), 3 == e.length && (e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2)), parseInt(e, 16);
        }, o.logLevel = 1, o.log = function () {
          console && o.logLevel > 0 && o.logLevel <= 3 && console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
        }, o.info = function () {
          console && o.logLevel > 0 && o.logLevel <= 2 && console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
        }, o.warn = function () {
          console && o.logLevel > 0 && o.logLevel <= 3 && console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
        }, o.nextId = function () {
          return o._nextId++;
        }, o.indexOf = function (e, t) {
          if (e.indexOf) return e.indexOf(t);for (var n = 0; n < e.length; n++) {
            if (e[n] === t) return n;
          }return -1;
        }, o.map = function (e, t) {
          if (e.map) return e.map(t);for (var n = [], o = 0; o < e.length; o += 1) {
            n.push(t(e[o]));
          }return n;
        }, o.topologicalSort = function (e) {
          var n = [],
              o = [],
              i = [];for (var r in e) {
            o[r] || i[r] || t(r, o, i, e, n);
          }return n;
        };var t = function t(e, n, o, i, r) {
          var s = i[e] || [];o[e] = !0;for (var a = 0; a < s.length; a += 1) {
            var l = s[a];o[l] || n[l] || t(l, n, o, i, r);
          }o[e] = !1, n[e] = !0, r.push(e);
        };o.chain = function () {
          for (var e = [], t = 0; t < arguments.length; t += 1) {
            var n = arguments[t];
            n._chained ? e.push.apply(e, n._chained) : e.push(n);
          }var o = function o() {
            for (var t, n = new Array(arguments.length), o = 0, i = arguments.length; o < i; o++) {
              n[o] = arguments[o];
            }for (o = 0; o < e.length; o += 1) {
              var r = e[o].apply(t, n);"undefined" != typeof r && (t = r);
            }return t;
          };return o._chained = e, o;
        }, o.chainPathBefore = function (e, t, n) {
          return o.set(e, t, o.chain(n, o.get(e, t)));
        }, o.chainPathAfter = function (e, t, n) {
          return o.set(e, t, o.chain(o.get(e, t), n));
        };
      }();
    }, {}], 15: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../body/World"),
          r = e("./Sleeping"),
          s = e("../collision/Resolver"),
          a = e("../render/Render"),
          l = e("../collision/Pairs"),
          c = (e("./Metrics"), e("../collision/Grid")),
          d = e("./Events"),
          u = e("../body/Composite"),
          p = e("../constraint/Constraint"),
          f = e("./Common"),
          m = e("../body/Body");!function () {
        o.create = function (e, t) {
          t = f.isElement(e) ? t : e, e = f.isElement(e) ? e : null, t = t || {}, (e || t.render) && f.warn("Engine.create: engine.render is deprecated (see docs)");var n = { positionIterations: 6, velocityIterations: 4, constraintIterations: 2, enableSleeping: !1, events: [],
            plugin: {}, timing: { timestamp: 0, timeScale: 1 }, broadphase: { controller: c } },
              o = f.extend(n, t);if (e || o.render) {
            var r = { element: e, controller: a };o.render = f.extend(r, o.render);
          }return o.render && o.render.controller && (o.render = o.render.controller.create(o.render)), o.render && (o.render.engine = o), o.world = t.world || i.create(o.world), o.pairs = l.create(), o.broadphase = o.broadphase.controller.create(o.broadphase), o.metrics = o.metrics || { extended: !1 }, o;
        }, o.update = function (o, i, a) {
          i = i || 1e3 / 60, a = a || 1;var c,
              f = o.world,
              m = o.timing,
              v = o.broadphase,
              y = [];m.timestamp += i * m.timeScale;var g = { timestamp: m.timestamp };d.trigger(o, "beforeUpdate", g);var x = u.allBodies(f),
              h = u.allConstraints(f);for (o.enableSleeping && r.update(x, m.timeScale), t(x, f.gravity), n(x, i, m.timeScale, a, f.bounds), p.preSolveAll(x), c = 0; c < o.constraintIterations; c++) {
            p.solveAll(h, m.timeScale);
          }p.postSolveAll(x), v.controller ? (f.isModified && v.controller.clear(v), v.controller.update(v, x, o, f.isModified), y = v.pairsList) : y = x, f.isModified && u.setModified(f, !1, !1, !0);var b = v.detector(y, o),
              w = o.pairs,
              S = m.timestamp;
          for (l.update(w, b, S), l.removeOld(w, S), o.enableSleeping && r.afterCollisions(w.list, m.timeScale), w.collisionStart.length > 0 && d.trigger(o, "collisionStart", { pairs: w.collisionStart }), s.preSolvePosition(w.list), c = 0; c < o.positionIterations; c++) {
            s.solvePosition(w.list, m.timeScale);
          }for (s.postSolvePosition(x), p.preSolveAll(x), c = 0; c < o.constraintIterations; c++) {
            p.solveAll(h, m.timeScale);
          }for (p.postSolveAll(x), s.preSolveVelocity(w.list), c = 0; c < o.velocityIterations; c++) {
            s.solveVelocity(w.list, m.timeScale);
          }return w.collisionActive.length > 0 && d.trigger(o, "collisionActive", { pairs: w.collisionActive }), w.collisionEnd.length > 0 && d.trigger(o, "collisionEnd", { pairs: w.collisionEnd }), e(x), d.trigger(o, "afterUpdate", g), o;
        }, o.merge = function (e, t) {
          if (f.extend(e, t), t.world) {
            e.world = t.world, o.clear(e);for (var n = u.allBodies(e.world), i = 0; i < n.length; i++) {
              var s = n[i];r.set(s, !1), s.id = f.nextId();
            }
          }
        }, o.clear = function (e) {
          var t = e.world;l.clear(e.pairs);var n = e.broadphase;if (n.controller) {
            var o = u.allBodies(t);n.controller.clear(n), n.controller.update(n, o, e, !0);
          }
        };var e = function e(_e5) {
          for (var t = 0; t < _e5.length; t++) {
            var n = _e5[t];n.force.x = 0, n.force.y = 0, n.torque = 0;
          }
        },
            t = function t(e, _t3) {
          var n = "undefined" != typeof _t3.scale ? _t3.scale : .001;if ((0 !== _t3.x || 0 !== _t3.y) && 0 !== n) for (var o = 0; o < e.length; o++) {
            var i = e[o];i.isStatic || i.isSleeping || (i.force.y += i.mass * _t3.y * n, i.force.x += i.mass * _t3.x * n);
          }
        },
            n = function n(e, t, _n3, o, i) {
          for (var r = 0; r < e.length; r++) {
            var s = e[r];s.isStatic || s.isSleeping || m.update(s, t, _n3, o);
          }
        };
      }();
    }, { "../body/Body": 1, "../body/Composite": 2, "../body/World": 3, "../collision/Grid": 6, "../collision/Pairs": 8, "../collision/Resolver": 10, "../constraint/Constraint": 12, "../render/Render": 31, "./Common": 14, "./Events": 16, "./Metrics": 18, "./Sleeping": 22 }], 16: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./Common");!function () {
        o.on = function (e, t, n) {
          for (var o, i = t.split(" "), r = 0; r < i.length; r++) {
            o = i[r], e.events = e.events || {}, e.events[o] = e.events[o] || [], e.events[o].push(n);
          }return n;
        }, o.off = function (e, t, n) {
          if (!t) return void (e.events = {});"function" == typeof t && (n = t, t = i.keys(e.events).join(" "));for (var o = t.split(" "), r = 0; r < o.length; r++) {
            var s = e.events[o[r]],
                a = [];if (n && s) for (var l = 0; l < s.length; l++) {
              s[l] !== n && a.push(s[l]);
            }e.events[o[r]] = a;
          }
        }, o.trigger = function (e, t, n) {
          var o, r, s, a;if (e.events) {
            n || (n = {}), o = t.split(" ");for (var l = 0; l < o.length; l++) {
              if (r = o[l], s = e.events[r]) {
                a = i.clone(n, !1), a.name = r, a.source = e;for (var c = 0; c < s.length; c++) {
                  s[c].apply(e, [a]);
                }
              }
            }
          }
        };
      }();
    }, { "./Common": 14 }], 17: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./Plugin"),
          r = e("./Common");!function () {
        o.name = "matter-js", o.version = "0.13.0", o.uses = [], o.used = [], o.use = function () {
          i.use(o, Array.prototype.slice.call(arguments));
        }, o.before = function (e, t) {
          return e = e.replace(/^Matter./, ""), r.chainPathBefore(o, e, t);
        }, o.after = function (e, t) {
          return e = e.replace(/^Matter./, ""), r.chainPathAfter(o, e, t);
        };
      }();
    }, { "./Common": 14, "./Plugin": 20 }], 18: [function (e, t, n) {}, { "../body/Composite": 2, "./Common": 14 }], 19: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../core/Common");!function () {
        o.create = function (t) {
          var n = {};return t || i.log("Mouse.create: element was undefined, defaulting to document.body", "warn"), n.element = t || document.body, n.absolute = { x: 0, y: 0 }, n.position = { x: 0, y: 0 }, n.mousedownPosition = { x: 0, y: 0 }, n.mouseupPosition = { x: 0, y: 0 }, n.offset = { x: 0, y: 0 }, n.scale = { x: 1, y: 1 }, n.wheelDelta = 0, n.button = -1, n.pixelRatio = n.element.getAttribute("data-pixel-ratio") || 1, n.sourceEvents = { mousemove: null, mousedown: null, mouseup: null, mousewheel: null }, n.mousemove = function (t) {
            var o = e(t, n.element, n.pixelRatio),
                i = t.changedTouches;i && (n.button = 0, t.preventDefault()), n.absolute.x = o.x, n.absolute.y = o.y, n.position.x = n.absolute.x * n.scale.x + n.offset.x, n.position.y = n.absolute.y * n.scale.y + n.offset.y, n.sourceEvents.mousemove = t;
          }, n.mousedown = function (t) {
            var o = e(t, n.element, n.pixelRatio),
                i = t.changedTouches;i ? (n.button = 0, t.preventDefault()) : n.button = t.button, n.absolute.x = o.x, n.absolute.y = o.y, n.position.x = n.absolute.x * n.scale.x + n.offset.x, n.position.y = n.absolute.y * n.scale.y + n.offset.y, n.mousedownPosition.x = n.position.x, n.mousedownPosition.y = n.position.y, n.sourceEvents.mousedown = t;
          }, n.mouseup = function (t) {
            var o = e(t, n.element, n.pixelRatio),
                i = t.changedTouches;
            i && t.preventDefault(), n.button = -1, n.absolute.x = o.x, n.absolute.y = o.y, n.position.x = n.absolute.x * n.scale.x + n.offset.x, n.position.y = n.absolute.y * n.scale.y + n.offset.y, n.mouseupPosition.x = n.position.x, n.mouseupPosition.y = n.position.y, n.sourceEvents.mouseup = t;
          }, n.mousewheel = function (e) {
            n.wheelDelta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)), e.preventDefault();
          }, o.setElement(n, n.element), n;
        }, o.setElement = function (e, t) {
          e.element = t, t.addEventListener("mousemove", e.mousemove), t.addEventListener("mousedown", e.mousedown), t.addEventListener("mouseup", e.mouseup), t.addEventListener("mousewheel", e.mousewheel), t.addEventListener("DOMMouseScroll", e.mousewheel), t.addEventListener("touchmove", e.mousemove), t.addEventListener("touchstart", e.mousedown), t.addEventListener("touchend", e.mouseup);
        }, o.clearSourceEvents = function (e) {
          e.sourceEvents.mousemove = null, e.sourceEvents.mousedown = null, e.sourceEvents.mouseup = null, e.sourceEvents.mousewheel = null, e.wheelDelta = 0;
        }, o.setOffset = function (e, t) {
          e.offset.x = t.x, e.offset.y = t.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y;
        }, o.setScale = function (e, t) {
          e.scale.x = t.x, e.scale.y = t.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y;
        };var e = function e(_e6, t, n) {
          var o,
              i,
              r = t.getBoundingClientRect(),
              s = document.documentElement || document.body.parentNode || document.body,
              a = void 0 !== window.pageXOffset ? window.pageXOffset : s.scrollLeft,
              l = void 0 !== window.pageYOffset ? window.pageYOffset : s.scrollTop,
              c = _e6.changedTouches;return c ? (o = c[0].pageX - r.left - a, i = c[0].pageY - r.top - l) : (o = _e6.pageX - r.left - a, i = _e6.pageY - r.top - l), { x: o / (t.clientWidth / (t.width || t.clientWidth) * n), y: i / (t.clientHeight / (t.height || t.clientHeight) * n) };
        };
      }();
    }, { "../core/Common": 14 }], 20: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./Common");!function () {
        o._registry = {}, o.register = function (e) {
          if (o.isPlugin(e) || i.warn("Plugin.register:", o.toString(e), "does not implement all required fields."), e.name in o._registry) {
            var t = o._registry[e.name],
                n = o.versionParse(e.version).number,
                r = o.versionParse(t.version).number;
            n > r ? (i.warn("Plugin.register:", o.toString(t), "was upgraded to", o.toString(e)), o._registry[e.name] = e) : n < r ? i.warn("Plugin.register:", o.toString(t), "can not be downgraded to", o.toString(e)) : e !== t && i.warn("Plugin.register:", o.toString(e), "is already registered to different plugin object");
          } else o._registry[e.name] = e;return e;
        }, o.resolve = function (e) {
          return o._registry[o.dependencyParse(e).name];
        }, o.toString = function (e) {
          return "string" == typeof e ? e : (e.name || "anonymous") + "@" + (e.version || e.range || "0.0.0");
        }, o.isPlugin = function (e) {
          return e && e.name && e.version && e.install;
        }, o.isUsed = function (e, t) {
          return e.used.indexOf(t) > -1;
        }, o.isFor = function (e, t) {
          var n = e.for && o.dependencyParse(e.for);return !e.for || t.name === n.name && o.versionSatisfies(t.version, n.range);
        }, o.use = function (e, t) {
          if (e.uses = (e.uses || []).concat(t || []), 0 === e.uses.length) return void i.warn("Plugin.use:", o.toString(e), "does not specify any dependencies to install.");for (var n = o.dependencies(e), r = i.topologicalSort(n), s = [], a = 0; a < r.length; a += 1) {
            if (r[a] !== e.name) {
              var l = o.resolve(r[a]);l ? o.isUsed(e, l.name) || (o.isFor(l, e) || (i.warn("Plugin.use:", o.toString(l), "is for", l.for, "but installed on", o.toString(e) + "."), l._warned = !0), l.install ? l.install(e) : (i.warn("Plugin.use:", o.toString(l), "does not specify an install function."), l._warned = !0), l._warned ? (s.push("🔶 " + o.toString(l)), delete l._warned) : s.push("✅ " + o.toString(l)), e.used.push(l.name)) : s.push("❌ " + r[a]);
            }
          }s.length > 0 && i.info(s.join("  "));
        }, o.dependencies = function (e, t) {
          var n = o.dependencyParse(e),
              r = n.name;if (t = t || {}, !(r in t)) {
            e = o.resolve(e) || e, t[r] = i.map(e.uses || [], function (t) {
              o.isPlugin(t) && o.register(t);var r = o.dependencyParse(t),
                  s = o.resolve(t);return s && !o.versionSatisfies(s.version, r.range) ? (i.warn("Plugin.dependencies:", o.toString(s), "does not satisfy", o.toString(r), "used by", o.toString(n) + "."), s._warned = !0, e._warned = !0) : s || (i.warn("Plugin.dependencies:", o.toString(t), "used by", o.toString(n), "could not be resolved."), e._warned = !0), r.name;
            });for (var s = 0; s < t[r].length; s += 1) {
              o.dependencies(t[r][s], t);
            }return t;
          }
        }, o.dependencyParse = function (e) {
          if (i.isString(e)) {
            var t = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;return t.test(e) || i.warn("Plugin.dependencyParse:", e, "is not a valid dependency string."), { name: e.split("@")[0], range: e.split("@")[1] || "*" };
          }return { name: e.name, range: e.range || e.version };
        }, o.versionParse = function (e) {
          var t = /^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/;t.test(e) || i.warn("Plugin.versionParse:", e, "is not a valid version or range.");var n = e.split("-");e = n[0];var o = isNaN(Number(e[0])),
              r = o ? e.substr(1) : e,
              s = i.map(r.split("."), function (e) {
            return Number(e);
          });return { isRange: o, version: r, range: e, operator: o ? e[0] : "", parts: s, prerelease: n[1], number: 1e8 * s[0] + 1e4 * s[1] + s[2] };
        }, o.versionSatisfies = function (e, t) {
          t = t || "*";var n = o.versionParse(t),
              i = n.parts,
              r = o.versionParse(e),
              s = r.parts;if (n.isRange) {
            if ("*" === n.operator || "*" === e) return !0;if ("~" === n.operator) return s[0] === i[0] && s[1] === i[1] && s[2] >= i[2];if ("^" === n.operator) return i[0] > 0 ? s[0] === i[0] && r.number >= n.number : i[1] > 0 ? s[1] === i[1] && s[2] >= i[2] : s[2] === i[2];
          }return e === t || "*" === e;
        };
      }();
    }, { "./Common": 14 }], 21: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./Events"),
          r = e("./Engine"),
          s = e("./Common");!function () {
        var e, t;if ("undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), !e) {
          var n;e = function e(_e7) {
            n = setTimeout(function () {
              _e7(s.now());
            }, 1e3 / 60);
          }, t = function t() {
            clearTimeout(n);
          };
        }o.create = function (e) {
          var t = { fps: 60, correction: 1, deltaSampleSize: 60, counterTimestamp: 0, frameCounter: 0, deltaHistory: [], timePrev: null, timeScalePrev: 1, frameRequestId: null, isFixed: !1, enabled: !0 },
              n = s.extend(t, e);return n.delta = n.delta || 1e3 / n.fps, n.deltaMin = n.deltaMin || 1e3 / n.fps, n.deltaMax = n.deltaMax || 1e3 / (.5 * n.fps), n.fps = 1e3 / n.delta, n;
        }, o.run = function (t, n) {
          return "undefined" != typeof t.positionIterations && (n = t, t = o.create()), function i(r) {
            t.frameRequestId = e(i), r && t.enabled && o.tick(t, n, r);
          }(), t;
        }, o.tick = function (e, t, n) {
          var o,
              s = t.timing,
              a = 1,
              l = { timestamp: s.timestamp };i.trigger(e, "beforeTick", l), i.trigger(t, "beforeTick", l), e.isFixed ? o = e.delta : (o = n - e.timePrev || e.delta, e.timePrev = n, e.deltaHistory.push(o), e.deltaHistory = e.deltaHistory.slice(-e.deltaSampleSize), o = Math.min.apply(null, e.deltaHistory), o = o < e.deltaMin ? e.deltaMin : o, o = o > e.deltaMax ? e.deltaMax : o, a = o / e.delta, e.delta = o), 0 !== e.timeScalePrev && (a *= s.timeScale / e.timeScalePrev), 0 === s.timeScale && (a = 0), e.timeScalePrev = s.timeScale, e.correction = a, e.frameCounter += 1, n - e.counterTimestamp >= 1e3 && (e.fps = e.frameCounter * ((n - e.counterTimestamp) / 1e3), e.counterTimestamp = n, e.frameCounter = 0), i.trigger(e, "tick", l), i.trigger(t, "tick", l), t.world.isModified && t.render && t.render.controller && t.render.controller.clear && t.render.controller.clear(t.render), i.trigger(e, "beforeUpdate", l), r.update(t, o, a), i.trigger(e, "afterUpdate", l), t.render && t.render.controller && (i.trigger(e, "beforeRender", l), i.trigger(t, "beforeRender", l), t.render.controller.world(t.render), i.trigger(e, "afterRender", l), i.trigger(t, "afterRender", l)), i.trigger(e, "afterTick", l), i.trigger(t, "afterTick", l);
        }, o.stop = function (e) {
          t(e.frameRequestId);
        }, o.start = function (e, t) {
          o.run(e, t);
        };
      }();
    }, { "./Common": 14, "./Engine": 15, "./Events": 16 }], 22: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("./Events");!function () {
        o._motionWakeThreshold = .18, o._motionSleepThreshold = .08, o._minBias = .9, o.update = function (e, t) {
          for (var n = t * t * t, i = 0; i < e.length; i++) {
            var r = e[i],
                s = r.speed * r.speed + r.angularSpeed * r.angularSpeed;if (0 === r.force.x && 0 === r.force.y) {
              var a = Math.min(r.motion, s),
                  l = Math.max(r.motion, s);r.motion = o._minBias * a + (1 - o._minBias) * l, r.sleepThreshold > 0 && r.motion < o._motionSleepThreshold * n ? (r.sleepCounter += 1, r.sleepCounter >= r.sleepThreshold && o.set(r, !0)) : r.sleepCounter > 0 && (r.sleepCounter -= 1);
            } else o.set(r, !1);
          }
        }, o.afterCollisions = function (e, t) {
          for (var n = t * t * t, i = 0; i < e.length; i++) {
            var r = e[i];if (r.isActive) {
              var s = r.collision,
                  a = s.bodyA.parent,
                  l = s.bodyB.parent;if (!(a.isSleeping && l.isSleeping || a.isStatic || l.isStatic) && (a.isSleeping || l.isSleeping)) {
                var c = a.isSleeping && !a.isStatic ? a : l,
                    d = c === a ? l : a;!c.isStatic && d.motion > o._motionWakeThreshold * n && o.set(c, !1);
              }
            }
          }
        }, o.set = function (e, t) {
          var n = e.isSleeping;t ? (e.isSleeping = !0, e.sleepCounter = e.sleepThreshold, e.positionImpulse.x = 0, e.positionImpulse.y = 0, e.positionPrev.x = e.position.x, e.positionPrev.y = e.position.y, e.anglePrev = e.angle, e.speed = 0, e.angularSpeed = 0, e.motion = 0, n || i.trigger(e, "sleepStart")) : (e.isSleeping = !1, e.sleepCounter = 0, n && i.trigger(e, "sleepEnd"));
        };
      }();
    }, { "./Events": 16 }], 23: [function (e, t, n) {
      (function (n) {
        var o = {};t.exports = o;var i = e("../geometry/Vertices"),
            r = e("../core/Common"),
            s = e("../body/Body"),
            a = e("../geometry/Bounds"),
            l = e("../geometry/Vector"),
            c = "undefined" != typeof window ? window.decomp : "undefined" != typeof n ? n.decomp : null;!function () {
          o.rectangle = function (e, t, n, o, a) {
            a = a || {};var l = { label: "Rectangle Body", position: { x: e, y: t }, vertices: i.fromPath("L 0 0 L " + n + " 0 L " + n + " " + o + " L 0 " + o) };if (a.chamfer) {
              var c = a.chamfer;l.vertices = i.chamfer(l.vertices, c.radius, c.quality, c.qualityMin, c.qualityMax), delete a.chamfer;
            }return s.create(r.extend({}, l, a));
          }, o.trapezoid = function (e, t, n, o, a, l) {
            l = l || {}, a *= .5;var c,
                d = (1 - 2 * a) * n,
                u = n * a,
                p = u + d,
                f = p + u;c = a < .5 ? "L 0 0 L " + u + " " + -o + " L " + p + " " + -o + " L " + f + " 0" : "L 0 0 L " + p + " " + -o + " L " + f + " 0";var m = { label: "Trapezoid Body", position: { x: e, y: t }, vertices: i.fromPath(c) };if (l.chamfer) {
              var v = l.chamfer;m.vertices = i.chamfer(m.vertices, v.radius, v.quality, v.qualityMin, v.qualityMax), delete l.chamfer;
            }return s.create(r.extend({}, m, l));
          }, o.circle = function (e, t, n, i, s) {
            i = i || {};var a = { label: "Circle Body", circleRadius: n };s = s || 25;var l = Math.ceil(Math.max(10, Math.min(s, n)));return l % 2 === 1 && (l += 1), o.polygon(e, t, l, n, r.extend({}, a, i));
          }, o.polygon = function (e, t, n, a, l) {
            if (l = l || {}, n < 3) return o.circle(e, t, a, l);for (var c = 2 * Math.PI / n, d = "", u = .5 * c, p = 0; p < n; p += 1) {
              var f = u + p * c,
                  m = Math.cos(f) * a,
                  v = Math.sin(f) * a;d += "L " + m.toFixed(3) + " " + v.toFixed(3) + " ";
            }var y = { label: "Polygon Body", position: { x: e, y: t }, vertices: i.fromPath(d) };if (l.chamfer) {
              var g = l.chamfer;y.vertices = i.chamfer(y.vertices, g.radius, g.quality, g.qualityMin, g.qualityMax), delete l.chamfer;
            }return s.create(r.extend({}, y, l));
          }, o.fromVertices = function (e, t, n, o, d, u, p) {
            var f, m, v, y, g, x, h, b, w;for (o = o || {}, m = [], d = "undefined" != typeof d && d, u = "undefined" != typeof u ? u : .01, p = "undefined" != typeof p ? p : 10, c || r.warn("Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull."), r.isArray(n[0]) || (n = [n]), b = 0; b < n.length; b += 1) {
              if (y = n[b], v = i.isConvex(y), v || !c) y = v ? i.clockwiseSort(y) : i.hull(y), m.push({ position: { x: e, y: t }, vertices: y });else {
                var S = y.map(function (e) {
                  return [e.x, e.y];
                });c.makeCCW(S), u !== !1 && c.removeCollinearPoints(S, u);var C = c.quickDecomp(S);for (g = 0; g < C.length; g++) {
                  var A = C[g],
                      P = A.map(function (e) {
                    return { x: e[0], y: e[1] };
                  });p > 0 && i.area(P) < p || m.push({ position: i.centre(P), vertices: P });
                }
              }
            }for (g = 0; g < m.length; g++) {
              m[g] = s.create(r.extend(m[g], o));
            }if (d) {
              var B = 5;for (g = 0; g < m.length; g++) {
                var M = m[g];for (x = g + 1; x < m.length; x++) {
                  var k = m[x];if (a.overlaps(M.bounds, k.bounds)) {
                    var I = M.vertices,
                        T = k.vertices;for (h = 0; h < M.vertices.length; h++) {
                      for (w = 0; w < k.vertices.length; w++) {
                        var V = l.magnitudeSquared(l.sub(I[(h + 1) % I.length], T[w])),
                            _ = l.magnitudeSquared(l.sub(I[h], T[(w + 1) % T.length]));V < B && _ < B && (I[h].isInternal = !0, T[w].isInternal = !0);
                      }
                    }
                  }
                }
              }
            }return m.length > 1 ? (f = s.create(r.extend({ parts: m.slice(0) }, o)), s.setPosition(f, { x: e, y: t }), f) : m[0];
          };
        }();
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, { "../body/Body": 1, "../core/Common": 14, "../geometry/Bounds": 26, "../geometry/Vector": 28, "../geometry/Vertices": 29 }], 24: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../body/Composite"),
          r = e("../constraint/Constraint"),
          s = e("../core/Common"),
          a = e("../body/Body"),
          l = e("./Bodies");!function () {
        o.stack = function (e, t, n, o, r, s, l) {
          for (var c, d = i.create({ label: "Stack" }), u = e, p = t, f = 0, m = 0; m < o; m++) {
            for (var v = 0, y = 0; y < n; y++) {
              var g = l(u, p, y, m, c, f);if (g) {
                var x = g.bounds.max.y - g.bounds.min.y,
                    h = g.bounds.max.x - g.bounds.min.x;x > v && (v = x), a.translate(g, { x: .5 * h, y: .5 * x }), u = g.bounds.max.x + r, i.addBody(d, g), c = g, f += 1;
              } else u += r;
            }p += v + s, u = e;
          }return d;
        }, o.chain = function (e, t, n, o, a, l) {
          for (var c = e.bodies, d = 1; d < c.length; d++) {
            var u = c[d - 1],
                p = c[d],
                f = u.bounds.max.y - u.bounds.min.y,
                m = u.bounds.max.x - u.bounds.min.x,
                v = p.bounds.max.y - p.bounds.min.y,
                y = p.bounds.max.x - p.bounds.min.x,
                g = { bodyA: u, pointA: { x: m * t, y: f * n }, bodyB: p, pointB: { x: y * o, y: v * a } },
                x = s.extend(g, l);i.addConstraint(e, r.create(x));
          }return e.label += " Chain", e;
        }, o.mesh = function (e, t, n, o, a) {
          var l,
              c,
              d,
              u,
              p,
              f = e.bodies;for (l = 0; l < n; l++) {
            for (c = 1; c < t; c++) {
              d = f[c - 1 + l * t], u = f[c + l * t], i.addConstraint(e, r.create(s.extend({ bodyA: d, bodyB: u }, a)));
            }if (l > 0) for (c = 0; c < t; c++) {
              d = f[c + (l - 1) * t], u = f[c + l * t], i.addConstraint(e, r.create(s.extend({ bodyA: d, bodyB: u }, a))), o && c > 0 && (p = f[c - 1 + (l - 1) * t], i.addConstraint(e, r.create(s.extend({ bodyA: p, bodyB: u }, a)))), o && c < t - 1 && (p = f[c + 1 + (l - 1) * t], i.addConstraint(e, r.create(s.extend({ bodyA: p, bodyB: u }, a))));
            }
          }return e.label += " Mesh", e;
        }, o.pyramid = function (e, t, n, i, r, s, l) {
          return o.stack(e, t, n, i, r, s, function (t, o, s, c, d, u) {
            var p = Math.min(i, Math.ceil(n / 2)),
                f = d ? d.bounds.max.x - d.bounds.min.x : 0;if (!(c > p)) {
              c = p - c;var m = c,
                  v = n - 1 - c;if (!(s < m || s > v)) {
                1 === u && a.translate(d, { x: (s + (n % 2 === 1 ? 1 : -1)) * f, y: 0 });var y = d ? s * f : 0;return l(e + y + s * r, o, s, c, d, u);
              }
            }
          });
        }, o.newtonsCradle = function (e, t, n, o, s) {
          for (var a = i.create({ label: "Newtons Cradle" }), c = 0; c < n; c++) {
            var d = 1.9,
                u = l.circle(e + c * (o * d), t + s, o, { inertia: 1 / 0, restitution: 1, friction: 0, frictionAir: 1e-4, slop: 1 }),
                p = r.create({ pointA: { x: e + c * (o * d), y: t }, bodyB: u });i.addBody(a, u), i.addConstraint(a, p);
          }return a;
        }, o.car = function (e, t, n, o, s) {
          var c = a.nextGroup(!0),
              d = 20,
              u = .5 * -n + d,
              p = .5 * n - d,
              f = 0,
              m = i.create({ label: "Car" }),
              v = l.rectangle(e, t, n, o, { collisionFilter: { group: c }, chamfer: { radius: .5 * o }, density: 2e-4 }),
              y = l.circle(e + u, t + f, s, { collisionFilter: { group: c }, friction: .8 }),
              g = l.circle(e + p, t + f, s, { collisionFilter: { group: c }, friction: .8 }),
              x = r.create({ bodyB: v, pointB: { x: u, y: f }, bodyA: y, stiffness: 1, length: 0 }),
              h = r.create({ bodyB: v, pointB: { x: p, y: f }, bodyA: g, stiffness: 1, length: 0 });return i.addBody(m, v), i.addBody(m, y), i.addBody(m, g), i.addConstraint(m, x), i.addConstraint(m, h), m;
        }, o.softBody = function (e, t, n, i, r, a, c, d, u, p) {
          u = s.extend({ inertia: 1 / 0 }, u), p = s.extend({
            stiffness: .2, render: { type: "line", anchors: !1 } }, p);var f = o.stack(e, t, n, i, r, a, function (e, t) {
            return l.circle(e, t, d, u);
          });return o.mesh(f, n, i, c, p), f.label = "Soft Body", f;
        };
      }();
    }, { "../body/Body": 1, "../body/Composite": 2, "../constraint/Constraint": 12, "../core/Common": 14, "./Bodies": 23 }], 25: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Vector"),
          r = e("../core/Common");!function () {
        o.fromVertices = function (e) {
          for (var t = {}, n = 0; n < e.length; n++) {
            var o = (n + 1) % e.length,
                s = i.normalise({ x: e[o].y - e[n].y, y: e[n].x - e[o].x }),
                a = 0 === s.y ? 1 / 0 : s.x / s.y;a = a.toFixed(3).toString(), t[a] = s;
          }return r.values(t);
        }, o.rotate = function (e, t) {
          if (0 !== t) for (var n = Math.cos(t), o = Math.sin(t), i = 0; i < e.length; i++) {
            var r,
                s = e[i];r = s.x * n - s.y * o, s.y = s.x * o + s.y * n, s.x = r;
          }
        };
      }();
    }, { "../core/Common": 14, "../geometry/Vector": 28 }], 26: [function (e, t, n) {
      var o = {};t.exports = o, function () {
        o.create = function (e) {
          var t = { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } };return e && o.update(t, e), t;
        }, o.update = function (e, t, n) {
          e.min.x = 1 / 0, e.max.x = -(1 / 0), e.min.y = 1 / 0, e.max.y = -(1 / 0);for (var o = 0; o < t.length; o++) {
            var i = t[o];i.x > e.max.x && (e.max.x = i.x), i.x < e.min.x && (e.min.x = i.x), i.y > e.max.y && (e.max.y = i.y), i.y < e.min.y && (e.min.y = i.y);
          }n && (n.x > 0 ? e.max.x += n.x : e.min.x += n.x, n.y > 0 ? e.max.y += n.y : e.min.y += n.y);
        }, o.contains = function (e, t) {
          return t.x >= e.min.x && t.x <= e.max.x && t.y >= e.min.y && t.y <= e.max.y;
        }, o.overlaps = function (e, t) {
          return e.min.x <= t.max.x && e.max.x >= t.min.x && e.max.y >= t.min.y && e.min.y <= t.max.y;
        }, o.translate = function (e, t) {
          e.min.x += t.x, e.max.x += t.x, e.min.y += t.y, e.max.y += t.y;
        }, o.shift = function (e, t) {
          var n = e.max.x - e.min.x,
              o = e.max.y - e.min.y;e.min.x = t.x, e.max.x = t.x + n, e.min.y = t.y, e.max.y = t.y + o;
        };
      }();
    }, {}], 27: [function (e, t, n) {
      var o = {};t.exports = o;e("../geometry/Bounds");!function () {
        o.pathToVertices = function (t, n) {
          var o,
              i,
              r,
              s,
              a,
              l,
              c,
              d,
              u,
              p,
              f,
              m,
              v = [],
              y = 0,
              g = 0,
              x = 0;n = n || 15;var h = function h(e, t, n) {
            var o = n % 2 === 1 && n > 1;if (!u || e != u.x || t != u.y) {
              u && o ? (f = u.x, m = u.y) : (f = 0, m = 0);var i = { x: f + e, y: m + t };!o && u || (u = i), v.push(i), g = f + e, x = m + t;
            }
          },
              b = function b(e) {
            var t = e.pathSegTypeAsLetter.toUpperCase();if ("Z" !== t) {
              switch (t) {case "M":case "L":case "T":case "C":
                case "S":case "Q":
                  g = e.x, x = e.y;break;case "H":
                  g = e.x;break;case "V":
                  x = e.y;}h(g, x, e.pathSegType);
            }
          };for (e(t), r = t.getTotalLength(), l = [], o = 0; o < t.pathSegList.numberOfItems; o += 1) {
            l.push(t.pathSegList.getItem(o));
          }for (c = l.concat(); y < r;) {
            if (p = t.getPathSegAtLength(y), a = l[p], a != d) {
              for (; c.length && c[0] != a;) {
                b(c.shift());
              }d = a;
            }switch (a.pathSegTypeAsLetter.toUpperCase()) {case "C":case "T":case "S":case "Q":case "A":
                s = t.getPointAtLength(y), h(s.x, s.y, 0);}y += n;
          }for (o = 0, i = c.length; o < i; ++o) {
            b(c[o]);
          }return v;
        };var e = function e(_e8) {
          for (var t, n, o, i, r, s, a = _e8.pathSegList, l = 0, c = 0, d = a.numberOfItems, u = 0; u < d; ++u) {
            var p = a.getItem(u),
                f = p.pathSegTypeAsLetter;if (/[MLHVCSQTA]/.test(f)) "x" in p && (l = p.x), "y" in p && (c = p.y);else switch ("x1" in p && (o = l + p.x1), "x2" in p && (r = l + p.x2), "y1" in p && (i = c + p.y1), "y2" in p && (s = c + p.y2), "x" in p && (l += p.x), "y" in p && (c += p.y), f) {case "m":
                a.replaceItem(_e8.createSVGPathSegMovetoAbs(l, c), u);break;case "l":
                a.replaceItem(_e8.createSVGPathSegLinetoAbs(l, c), u);break;case "h":
                a.replaceItem(_e8.createSVGPathSegLinetoHorizontalAbs(l), u);break;
              case "v":
                a.replaceItem(_e8.createSVGPathSegLinetoVerticalAbs(c), u);break;case "c":
                a.replaceItem(_e8.createSVGPathSegCurvetoCubicAbs(l, c, o, i, r, s), u);break;case "s":
                a.replaceItem(_e8.createSVGPathSegCurvetoCubicSmoothAbs(l, c, r, s), u);break;case "q":
                a.replaceItem(_e8.createSVGPathSegCurvetoQuadraticAbs(l, c, o, i), u);break;case "t":
                a.replaceItem(_e8.createSVGPathSegCurvetoQuadraticSmoothAbs(l, c), u);break;case "a":
                a.replaceItem(_e8.createSVGPathSegArcAbs(l, c, p.r1, p.r2, p.angle, p.largeArcFlag, p.sweepFlag), u);break;case "z":case "Z":
                l = t, c = n;}"M" != f && "m" != f || (t = l, n = c);
          }
        };
      }();
    }, { "../geometry/Bounds": 26 }], 28: [function (e, t, n) {
      var o = {};t.exports = o, function () {
        o.create = function (e, t) {
          return { x: e || 0, y: t || 0 };
        }, o.clone = function (e) {
          return { x: e.x, y: e.y };
        }, o.magnitude = function (e) {
          return Math.sqrt(e.x * e.x + e.y * e.y);
        }, o.magnitudeSquared = function (e) {
          return e.x * e.x + e.y * e.y;
        }, o.rotate = function (e, t, n) {
          var o = Math.cos(t),
              i = Math.sin(t);n || (n = {});var r = e.x * o - e.y * i;return n.y = e.x * i + e.y * o, n.x = r, n;
        }, o.rotateAbout = function (e, t, n, o) {
          var i = Math.cos(t),
              r = Math.sin(t);
          o || (o = {});var s = n.x + ((e.x - n.x) * i - (e.y - n.y) * r);return o.y = n.y + ((e.x - n.x) * r + (e.y - n.y) * i), o.x = s, o;
        }, o.normalise = function (e) {
          var t = o.magnitude(e);return 0 === t ? { x: 0, y: 0 } : { x: e.x / t, y: e.y / t };
        }, o.dot = function (e, t) {
          return e.x * t.x + e.y * t.y;
        }, o.cross = function (e, t) {
          return e.x * t.y - e.y * t.x;
        }, o.cross3 = function (e, t, n) {
          return (t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x);
        }, o.add = function (e, t, n) {
          return n || (n = {}), n.x = e.x + t.x, n.y = e.y + t.y, n;
        }, o.sub = function (e, t, n) {
          return n || (n = {}), n.x = e.x - t.x, n.y = e.y - t.y, n;
        }, o.mult = function (e, t) {
          return { x: e.x * t, y: e.y * t };
        }, o.div = function (e, t) {
          return { x: e.x / t, y: e.y / t };
        }, o.perp = function (e, t) {
          return t = t === !0 ? -1 : 1, { x: t * -e.y, y: t * e.x };
        }, o.neg = function (e) {
          return { x: -e.x, y: -e.y };
        }, o.angle = function (e, t) {
          return Math.atan2(t.y - e.y, t.x - e.x);
        }, o._temp = [o.create(), o.create(), o.create(), o.create(), o.create(), o.create()];
      }();
    }, {}], 29: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Vector"),
          r = e("../core/Common");!function () {
        o.create = function (e, t) {
          for (var n = [], o = 0; o < e.length; o++) {
            var i = e[o],
                r = { x: i.x, y: i.y, index: o,
              body: t, isInternal: !1 };n.push(r);
          }return n;
        }, o.fromPath = function (e, t) {
          var n = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/gi,
              i = [];return e.replace(n, function (e, t, n) {
            i.push({ x: parseFloat(t), y: parseFloat(n) });
          }), o.create(i, t);
        }, o.centre = function (e) {
          for (var t, n, r, s = o.area(e, !0), a = { x: 0, y: 0 }, l = 0; l < e.length; l++) {
            r = (l + 1) % e.length, t = i.cross(e[l], e[r]), n = i.mult(i.add(e[l], e[r]), t), a = i.add(a, n);
          }return i.div(a, 6 * s);
        }, o.mean = function (e) {
          for (var t = { x: 0, y: 0 }, n = 0; n < e.length; n++) {
            t.x += e[n].x, t.y += e[n].y;
          }return i.div(t, e.length);
        }, o.area = function (e, t) {
          for (var n = 0, o = e.length - 1, i = 0; i < e.length; i++) {
            n += (e[o].x - e[i].x) * (e[o].y + e[i].y), o = i;
          }return t ? n / 2 : Math.abs(n) / 2;
        }, o.inertia = function (e, t) {
          for (var n, o, r = 0, s = 0, a = e, l = 0; l < a.length; l++) {
            o = (l + 1) % a.length, n = Math.abs(i.cross(a[o], a[l])), r += n * (i.dot(a[o], a[o]) + i.dot(a[o], a[l]) + i.dot(a[l], a[l])), s += n;
          }return t / 6 * (r / s);
        }, o.translate = function (e, t, n) {
          var o;if (n) for (o = 0; o < e.length; o++) {
            e[o].x += t.x * n, e[o].y += t.y * n;
          } else for (o = 0; o < e.length; o++) {
            e[o].x += t.x, e[o].y += t.y;
          }return e;
        }, o.rotate = function (e, t, n) {
          if (0 !== t) {
            for (var o = Math.cos(t), i = Math.sin(t), r = 0; r < e.length; r++) {
              var s = e[r],
                  a = s.x - n.x,
                  l = s.y - n.y;s.x = n.x + (a * o - l * i), s.y = n.y + (a * i + l * o);
            }return e;
          }
        }, o.contains = function (e, t) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n],
                i = e[(n + 1) % e.length];if ((t.x - o.x) * (i.y - o.y) + (t.y - o.y) * (o.x - i.x) > 0) return !1;
          }return !0;
        }, o.scale = function (e, t, n, r) {
          if (1 === t && 1 === n) return e;r = r || o.centre(e);for (var s, a, l = 0; l < e.length; l++) {
            s = e[l], a = i.sub(s, r), e[l].x = r.x + a.x * t, e[l].y = r.y + a.y * n;
          }return e;
        }, o.chamfer = function (e, t, n, o, s) {
          t = t || [8], t.length || (t = [t]), n = "undefined" != typeof n ? n : -1, o = o || 2, s = s || 14;for (var a = [], l = 0; l < e.length; l++) {
            var c = e[l - 1 >= 0 ? l - 1 : e.length - 1],
                d = e[l],
                u = e[(l + 1) % e.length],
                p = t[l < t.length ? l : t.length - 1];if (0 !== p) {
              var f = i.normalise({ x: d.y - c.y, y: c.x - d.x }),
                  m = i.normalise({ x: u.y - d.y, y: d.x - u.x }),
                  v = Math.sqrt(2 * Math.pow(p, 2)),
                  y = i.mult(r.clone(f), p),
                  g = i.normalise(i.mult(i.add(f, m), .5)),
                  x = i.sub(d, i.mult(g, v)),
                  h = n;n === -1 && (h = 1.75 * Math.pow(p, .32)), h = r.clamp(h, o, s), h % 2 === 1 && (h += 1);for (var b = Math.acos(i.dot(f, m)), w = b / h, S = 0; S < h; S++) {
                a.push(i.add(i.rotate(y, w * S), x));
              }
            } else a.push(d);
          }return a;
        }, o.clockwiseSort = function (e) {
          var t = o.mean(e);return e.sort(function (e, n) {
            return i.angle(t, e) - i.angle(t, n);
          }), e;
        }, o.isConvex = function (e) {
          var t,
              n,
              o,
              i,
              r = 0,
              s = e.length;if (s < 3) return null;for (t = 0; t < s; t++) {
            if (n = (t + 1) % s, o = (t + 2) % s, i = (e[n].x - e[t].x) * (e[o].y - e[n].y), i -= (e[n].y - e[t].y) * (e[o].x - e[n].x), i < 0 ? r |= 1 : i > 0 && (r |= 2), 3 === r) return !1;
          }return 0 !== r || null;
        }, o.hull = function (e) {
          var t,
              n,
              o = [],
              r = [];for (e = e.slice(0), e.sort(function (e, t) {
            var n = e.x - t.x;return 0 !== n ? n : e.y - t.y;
          }), n = 0; n < e.length; n += 1) {
            for (t = e[n]; r.length >= 2 && i.cross3(r[r.length - 2], r[r.length - 1], t) <= 0;) {
              r.pop();
            }r.push(t);
          }for (n = e.length - 1; n >= 0; n -= 1) {
            for (t = e[n]; o.length >= 2 && i.cross3(o[o.length - 2], o[o.length - 1], t) <= 0;) {
              o.pop();
            }o.push(t);
          }return o.pop(), r.pop(), o.concat(r);
        };
      }();
    }, { "../core/Common": 14, "../geometry/Vector": 28 }], 30: [function (e, t, n) {
      var o = t.exports = e("../core/Matter");o.Body = e("../body/Body"), o.Composite = e("../body/Composite"), o.World = e("../body/World"), o.Contact = e("../collision/Contact"), o.Detector = e("../collision/Detector"), o.Grid = e("../collision/Grid"), o.Pairs = e("../collision/Pairs"), o.Pair = e("../collision/Pair"), o.Query = e("../collision/Query"), o.Resolver = e("../collision/Resolver"), o.SAT = e("../collision/SAT"), o.Constraint = e("../constraint/Constraint"), o.MouseConstraint = e("../constraint/MouseConstraint"), o.Common = e("../core/Common"), o.Engine = e("../core/Engine"), o.Events = e("../core/Events"), o.Mouse = e("../core/Mouse"), o.Runner = e("../core/Runner"), o.Sleeping = e("../core/Sleeping"), o.Plugin = e("../core/Plugin"), o.Bodies = e("../factory/Bodies"), o.Composites = e("../factory/Composites"), o.Axes = e("../geometry/Axes"), o.Bounds = e("../geometry/Bounds"), o.Svg = e("../geometry/Svg"), o.Vector = e("../geometry/Vector"), o.Vertices = e("../geometry/Vertices"), o.Render = e("../render/Render"), o.RenderPixi = e("../render/RenderPixi"), o.World.add = o.Composite.add, o.World.remove = o.Composite.remove, o.World.addComposite = o.Composite.addComposite, o.World.addBody = o.Composite.addBody, o.World.addConstraint = o.Composite.addConstraint, o.World.clear = o.Composite.clear, o.Engine.run = o.Runner.run;
    }, { "../body/Body": 1, "../body/Composite": 2, "../body/World": 3, "../collision/Contact": 4, "../collision/Detector": 5, "../collision/Grid": 6, "../collision/Pair": 7, "../collision/Pairs": 8, "../collision/Query": 9, "../collision/Resolver": 10, "../collision/SAT": 11, "../constraint/Constraint": 12, "../constraint/MouseConstraint": 13, "../core/Common": 14, "../core/Engine": 15, "../core/Events": 16, "../core/Matter": 17, "../core/Metrics": 18, "../core/Mouse": 19, "../core/Plugin": 20, "../core/Runner": 21, "../core/Sleeping": 22, "../factory/Bodies": 23, "../factory/Composites": 24, "../geometry/Axes": 25, "../geometry/Bounds": 26, "../geometry/Svg": 27, "../geometry/Vector": 28, "../geometry/Vertices": 29, "../render/Render": 31, "../render/RenderPixi": 32 }], 31: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../core/Common"),
          r = e("../body/Composite"),
          s = e("../geometry/Bounds"),
          a = e("../core/Events"),
          l = e("../collision/Grid"),
          c = e("../geometry/Vector"),
          d = e("../core/Mouse");!function () {
        var e, t;"undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
          window.setTimeout(function () {
            e(i.now());
          }, 1e3 / 60);
        }, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), o.create = function (e) {
          var t = { controller: o, engine: null, element: null, canvas: null, mouse: null, frameRequestId: null, options: { width: 800, height: 600, pixelRatio: 1, background: "#18181d", wireframeBackground: "#0f0f13", hasBounds: !!e.bounds, enabled: !0, wireframes: !0, showSleeping: !0, showDebug: !1, showBroadphase: !1, showBounds: !1, showVelocity: !1, showCollisions: !1, showSeparations: !1, showAxes: !1, showPositions: !1, showAngleIndicator: !1, showIds: !1, showShadows: !1, showVertexNumbers: !1, showConvexHulls: !1, showInternalEdges: !1, showMousePosition: !1 } },
              r = i.extend(t, e);return r.canvas && (r.canvas.width = r.options.width || r.canvas.width, r.canvas.height = r.options.height || r.canvas.height), r.mouse = e.mouse, r.engine = e.engine, r.canvas = r.canvas || n(r.options.width, r.options.height), r.context = r.canvas.getContext("2d"), r.textures = {}, r.bounds = r.bounds || { min: { x: 0,
              y: 0 }, max: { x: r.canvas.width, y: r.canvas.height } }, 1 !== r.options.pixelRatio && o.setPixelRatio(r, r.options.pixelRatio), i.isElement(r.element) ? r.element.appendChild(r.canvas) : i.log("Render.create: options.element was undefined, render.canvas was created but not appended", "warn"), r;
        }, o.run = function (t) {
          !function n(i) {
            t.frameRequestId = e(n), o.world(t);
          }();
        }, o.stop = function (e) {
          t(e.frameRequestId);
        }, o.setPixelRatio = function (e, t) {
          var n = e.options,
              o = e.canvas;"auto" === t && (t = u(o)), n.pixelRatio = t, o.setAttribute("data-pixel-ratio", t), o.width = n.width * t, o.height = n.height * t, o.style.width = n.width + "px", o.style.height = n.height + "px", e.context.scale(t, t);
        }, o.lookAt = function (e, t, n, o) {
          o = "undefined" == typeof o || o, t = i.isArray(t) ? t : [t], n = n || { x: 0, y: 0 };for (var r = { min: { x: 1 / 0, y: 1 / 0 }, max: { x: -(1 / 0), y: -(1 / 0) } }, s = 0; s < t.length; s += 1) {
            var a = t[s],
                l = a.bounds ? a.bounds.min : a.min || a.position || a,
                c = a.bounds ? a.bounds.max : a.max || a.position || a;l && c && (l.x < r.min.x && (r.min.x = l.x), c.x > r.max.x && (r.max.x = c.x), l.y < r.min.y && (r.min.y = l.y), c.y > r.max.y && (r.max.y = c.y));
          }var u = r.max.x - r.min.x + 2 * n.x,
              p = r.max.y - r.min.y + 2 * n.y,
              f = e.canvas.height,
              m = e.canvas.width,
              v = m / f,
              y = u / p,
              g = 1,
              x = 1;y > v ? x = y / v : g = v / y, e.options.hasBounds = !0, e.bounds.min.x = r.min.x, e.bounds.max.x = r.min.x + u * g, e.bounds.min.y = r.min.y, e.bounds.max.y = r.min.y + p * x, o && (e.bounds.min.x += .5 * u - u * g * .5, e.bounds.max.x += .5 * u - u * g * .5, e.bounds.min.y += .5 * p - p * x * .5, e.bounds.max.y += .5 * p - p * x * .5), e.bounds.min.x -= n.x, e.bounds.max.x -= n.x, e.bounds.min.y -= n.y, e.bounds.max.y -= n.y, e.mouse && (d.setScale(e.mouse, { x: (e.bounds.max.x - e.bounds.min.x) / e.canvas.width, y: (e.bounds.max.y - e.bounds.min.y) / e.canvas.height }), d.setOffset(e.mouse, e.bounds.min));
        }, o.startViewTransform = function (e) {
          var t = e.bounds.max.x - e.bounds.min.x,
              n = e.bounds.max.y - e.bounds.min.y,
              o = t / e.options.width,
              i = n / e.options.height;e.context.scale(1 / o, 1 / i), e.context.translate(-e.bounds.min.x, -e.bounds.min.y);
        }, o.endViewTransform = function (e) {
          e.context.setTransform(e.options.pixelRatio, 0, 0, e.options.pixelRatio, 0, 0);
        }, o.world = function (e) {
          var t,
              n = e.engine,
              i = n.world,
              u = e.canvas,
              p = e.context,
              m = e.options,
              v = r.allBodies(i),
              y = r.allConstraints(i),
              g = m.wireframes ? m.wireframeBackground : m.background,
              x = [],
              h = [],
              b = {
            timestamp: n.timing.timestamp };if (a.trigger(e, "beforeRender", b), e.currentBackground !== g && f(e, g), p.globalCompositeOperation = "source-in", p.fillStyle = "transparent", p.fillRect(0, 0, u.width, u.height), p.globalCompositeOperation = "source-over", m.hasBounds) {
            for (t = 0; t < v.length; t++) {
              var w = v[t];s.overlaps(w.bounds, e.bounds) && x.push(w);
            }for (t = 0; t < y.length; t++) {
              var S = y[t],
                  C = S.bodyA,
                  A = S.bodyB,
                  P = S.pointA,
                  B = S.pointB;C && (P = c.add(C.position, S.pointA)), A && (B = c.add(A.position, S.pointB)), P && B && (s.contains(e.bounds, P) || s.contains(e.bounds, B)) && h.push(S);
            }o.startViewTransform(e), e.mouse && (d.setScale(e.mouse, { x: (e.bounds.max.x - e.bounds.min.x) / e.canvas.width, y: (e.bounds.max.y - e.bounds.min.y) / e.canvas.height }), d.setOffset(e.mouse, e.bounds.min));
          } else h = y, x = v;!m.wireframes || n.enableSleeping && m.showSleeping ? o.bodies(e, x, p) : (m.showConvexHulls && o.bodyConvexHulls(e, x, p), o.bodyWireframes(e, x, p)), m.showBounds && o.bodyBounds(e, x, p), (m.showAxes || m.showAngleIndicator) && o.bodyAxes(e, x, p), m.showPositions && o.bodyPositions(e, x, p), m.showVelocity && o.bodyVelocity(e, x, p), m.showIds && o.bodyIds(e, x, p), m.showSeparations && o.separations(e, n.pairs.list, p), m.showCollisions && o.collisions(e, n.pairs.list, p), m.showVertexNumbers && o.vertexNumbers(e, x, p), m.showMousePosition && o.mousePosition(e, e.mouse, p), o.constraints(h, p), m.showBroadphase && n.broadphase.controller === l && o.grid(e, n.broadphase, p), m.showDebug && o.debug(e, p), m.hasBounds && o.endViewTransform(e), a.trigger(e, "afterRender", b);
        }, o.debug = function (e, t) {
          var n = t,
              o = e.engine,
              i = o.world,
              s = o.metrics,
              a = e.options,
              l = (r.allBodies(i), "    ");if (o.timing.timestamp - (e.debugTimestamp || 0) >= 500) {
            var c = "";s.timing && (c += "fps: " + Math.round(s.timing.fps) + l), e.debugString = c, e.debugTimestamp = o.timing.timestamp;
          }if (e.debugString) {
            n.font = "12px Arial", a.wireframes ? n.fillStyle = "rgba(255,255,255,0.5)" : n.fillStyle = "rgba(0,0,0,0.5)";for (var d = e.debugString.split("\n"), u = 0; u < d.length; u++) {
              n.fillText(d[u], 50, 50 + 18 * u);
            }
          }
        }, o.constraints = function (e, t) {
          for (var n = t, o = 0; o < e.length; o++) {
            var r = e[o];if (r.render.visible && r.pointA && r.pointB) {
              var s,
                  a,
                  l = r.bodyA,
                  d = r.bodyB;
              if (s = l ? c.add(l.position, r.pointA) : r.pointA, "pin" === r.render.type) n.beginPath(), n.arc(s.x, s.y, 3, 0, 2 * Math.PI), n.closePath();else {
                if (a = d ? c.add(d.position, r.pointB) : r.pointB, n.beginPath(), n.moveTo(s.x, s.y), "spring" === r.render.type) for (var u, p = c.sub(a, s), f = c.perp(c.normalise(p)), m = Math.ceil(i.clamp(r.length / 5, 12, 20)), v = 1; v < m; v += 1) {
                  u = v % 2 === 0 ? 1 : -1, n.lineTo(s.x + p.x * (v / m) + f.x * u * 4, s.y + p.y * (v / m) + f.y * u * 4);
                }n.lineTo(a.x, a.y);
              }r.render.lineWidth && (n.lineWidth = r.render.lineWidth, n.strokeStyle = r.render.strokeStyle, n.stroke()), r.render.anchors && (n.fillStyle = r.render.strokeStyle, n.beginPath(), n.arc(s.x, s.y, 3, 0, 2 * Math.PI), n.arc(a.x, a.y, 3, 0, 2 * Math.PI), n.closePath(), n.fill());
            }
          }
        }, o.bodyShadows = function (e, t, n) {
          for (var o = n, i = (e.engine, 0); i < t.length; i++) {
            var r = t[i];if (r.render.visible) {
              if (r.circleRadius) o.beginPath(), o.arc(r.position.x, r.position.y, r.circleRadius, 0, 2 * Math.PI), o.closePath();else {
                o.beginPath(), o.moveTo(r.vertices[0].x, r.vertices[0].y);for (var s = 1; s < r.vertices.length; s++) {
                  o.lineTo(r.vertices[s].x, r.vertices[s].y);
                }o.closePath();
              }var a = r.position.x - .5 * e.options.width,
                  l = r.position.y - .2 * e.options.height,
                  c = Math.abs(a) + Math.abs(l);o.shadowColor = "rgba(0,0,0,0.15)", o.shadowOffsetX = .05 * a, o.shadowOffsetY = .05 * l, o.shadowBlur = 1 + 12 * Math.min(1, c / 1e3), o.fill(), o.shadowColor = null, o.shadowOffsetX = null, o.shadowOffsetY = null, o.shadowBlur = null;
            }
          }
        }, o.bodies = function (e, t, n) {
          var o,
              i,
              r,
              s,
              a = n,
              l = (e.engine, e.options),
              c = l.showInternalEdges || !l.wireframes;for (r = 0; r < t.length; r++) {
            if (o = t[r], o.render.visible) for (s = o.parts.length > 1 ? 1 : 0; s < o.parts.length; s++) {
              if (i = o.parts[s], i.render.visible) {
                if (l.showSleeping && o.isSleeping ? a.globalAlpha = .5 * i.render.opacity : 1 !== i.render.opacity && (a.globalAlpha = i.render.opacity), i.render.sprite && i.render.sprite.texture && !l.wireframes) {
                  var d = i.render.sprite,
                      u = p(e, d.texture);a.translate(i.position.x, i.position.y), a.rotate(i.angle), a.drawImage(u, u.width * -d.xOffset * d.xScale, u.height * -d.yOffset * d.yScale, u.width * d.xScale, u.height * d.yScale), a.rotate(-i.angle), a.translate(-i.position.x, -i.position.y);
                } else {
                  if (i.circleRadius) a.beginPath(), a.arc(i.position.x, i.position.y, i.circleRadius, 0, 2 * Math.PI);else {
                    a.beginPath(), a.moveTo(i.vertices[0].x, i.vertices[0].y);for (var f = 1; f < i.vertices.length; f++) {
                      !i.vertices[f - 1].isInternal || c ? a.lineTo(i.vertices[f].x, i.vertices[f].y) : a.moveTo(i.vertices[f].x, i.vertices[f].y), i.vertices[f].isInternal && !c && a.moveTo(i.vertices[(f + 1) % i.vertices.length].x, i.vertices[(f + 1) % i.vertices.length].y);
                    }a.lineTo(i.vertices[0].x, i.vertices[0].y), a.closePath();
                  }l.wireframes ? (a.lineWidth = 1, a.strokeStyle = "#bbb", a.stroke()) : (a.fillStyle = i.render.fillStyle, i.render.lineWidth && (a.lineWidth = i.render.lineWidth, a.strokeStyle = i.render.strokeStyle, a.stroke()), a.fill());
                }a.globalAlpha = 1;
              }
            }
          }
        }, o.bodyWireframes = function (e, t, n) {
          var o,
              i,
              r,
              s,
              a,
              l = n,
              c = e.options.showInternalEdges;for (l.beginPath(), r = 0; r < t.length; r++) {
            if (o = t[r], o.render.visible) for (a = o.parts.length > 1 ? 1 : 0; a < o.parts.length; a++) {
              for (i = o.parts[a], l.moveTo(i.vertices[0].x, i.vertices[0].y), s = 1; s < i.vertices.length; s++) {
                !i.vertices[s - 1].isInternal || c ? l.lineTo(i.vertices[s].x, i.vertices[s].y) : l.moveTo(i.vertices[s].x, i.vertices[s].y), i.vertices[s].isInternal && !c && l.moveTo(i.vertices[(s + 1) % i.vertices.length].x, i.vertices[(s + 1) % i.vertices.length].y);
              }l.lineTo(i.vertices[0].x, i.vertices[0].y);
            }
          }l.lineWidth = 1, l.strokeStyle = "#bbb", l.stroke();
        }, o.bodyConvexHulls = function (e, t, n) {
          var o,
              i,
              r,
              s = n;for (s.beginPath(), i = 0; i < t.length; i++) {
            if (o = t[i], o.render.visible && 1 !== o.parts.length) {
              for (s.moveTo(o.vertices[0].x, o.vertices[0].y), r = 1; r < o.vertices.length; r++) {
                s.lineTo(o.vertices[r].x, o.vertices[r].y);
              }s.lineTo(o.vertices[0].x, o.vertices[0].y);
            }
          }s.lineWidth = 1, s.strokeStyle = "rgba(255,255,255,0.2)", s.stroke();
        }, o.vertexNumbers = function (e, t, n) {
          var o,
              i,
              r,
              s = n;for (o = 0; o < t.length; o++) {
            var a = t[o].parts;for (r = a.length > 1 ? 1 : 0; r < a.length; r++) {
              var l = a[r];for (i = 0; i < l.vertices.length; i++) {
                s.fillStyle = "rgba(255,255,255,0.2)", s.fillText(o + "_" + i, l.position.x + .8 * (l.vertices[i].x - l.position.x), l.position.y + .8 * (l.vertices[i].y - l.position.y));
              }
            }
          }
        }, o.mousePosition = function (e, t, n) {
          var o = n;o.fillStyle = "rgba(255,255,255,0.8)", o.fillText(t.position.x + "  " + t.position.y, t.position.x + 5, t.position.y - 5);
        }, o.bodyBounds = function (e, t, n) {
          var o = n,
              i = (e.engine, e.options);o.beginPath();for (var r = 0; r < t.length; r++) {
            var s = t[r];if (s.render.visible) for (var a = t[r].parts, l = a.length > 1 ? 1 : 0; l < a.length; l++) {
              var c = a[l];o.rect(c.bounds.min.x, c.bounds.min.y, c.bounds.max.x - c.bounds.min.x, c.bounds.max.y - c.bounds.min.y);
            }
          }i.wireframes ? o.strokeStyle = "rgba(255,255,255,0.08)" : o.strokeStyle = "rgba(0,0,0,0.1)", o.lineWidth = 1, o.stroke();
        }, o.bodyAxes = function (e, t, n) {
          var o,
              i,
              r,
              s,
              a = n,
              l = (e.engine, e.options);for (a.beginPath(), i = 0; i < t.length; i++) {
            var c = t[i],
                d = c.parts;if (c.render.visible) if (l.showAxes) for (r = d.length > 1 ? 1 : 0; r < d.length; r++) {
              for (o = d[r], s = 0; s < o.axes.length; s++) {
                var u = o.axes[s];a.moveTo(o.position.x, o.position.y), a.lineTo(o.position.x + 20 * u.x, o.position.y + 20 * u.y);
              }
            } else for (r = d.length > 1 ? 1 : 0; r < d.length; r++) {
              for (o = d[r], s = 0; s < o.axes.length; s++) {
                a.moveTo(o.position.x, o.position.y), a.lineTo((o.vertices[0].x + o.vertices[o.vertices.length - 1].x) / 2, (o.vertices[0].y + o.vertices[o.vertices.length - 1].y) / 2);
              }
            }
          }l.wireframes ? (a.strokeStyle = "indianred", a.lineWidth = 1) : (a.strokeStyle = "rgba(255, 255, 255, 0.4)", a.globalCompositeOperation = "overlay", a.lineWidth = 2), a.stroke(), a.globalCompositeOperation = "source-over";
        }, o.bodyPositions = function (e, t, n) {
          var o,
              i,
              r,
              s,
              a = n,
              l = (e.engine, e.options);for (a.beginPath(), r = 0; r < t.length; r++) {
            if (o = t[r], o.render.visible) for (s = 0; s < o.parts.length; s++) {
              i = o.parts[s], a.arc(i.position.x, i.position.y, 3, 0, 2 * Math.PI, !1), a.closePath();
            }
          }for (l.wireframes ? a.fillStyle = "indianred" : a.fillStyle = "rgba(0,0,0,0.5)", a.fill(), a.beginPath(), r = 0; r < t.length; r++) {
            o = t[r], o.render.visible && (a.arc(o.positionPrev.x, o.positionPrev.y, 2, 0, 2 * Math.PI, !1), a.closePath());
          }a.fillStyle = "rgba(255,165,0,0.8)", a.fill();
        }, o.bodyVelocity = function (e, t, n) {
          var o = n;o.beginPath();for (var i = 0; i < t.length; i++) {
            var r = t[i];r.render.visible && (o.moveTo(r.position.x, r.position.y), o.lineTo(r.position.x + 2 * (r.position.x - r.positionPrev.x), r.position.y + 2 * (r.position.y - r.positionPrev.y)));
          }o.lineWidth = 3, o.strokeStyle = "cornflowerblue", o.stroke();
        }, o.bodyIds = function (e, t, n) {
          var o,
              i,
              r = n;
          for (o = 0; o < t.length; o++) {
            if (t[o].render.visible) {
              var s = t[o].parts;for (i = s.length > 1 ? 1 : 0; i < s.length; i++) {
                var a = s[i];r.font = "12px Arial", r.fillStyle = "rgba(255,255,255,0.5)", r.fillText(a.id, a.position.x + 10, a.position.y - 10);
              }
            }
          }
        }, o.collisions = function (e, t, n) {
          var o,
              i,
              r,
              s,
              a = n,
              l = e.options;for (a.beginPath(), r = 0; r < t.length; r++) {
            if (o = t[r], o.isActive) for (i = o.collision, s = 0; s < o.activeContacts.length; s++) {
              var c = o.activeContacts[s],
                  d = c.vertex;a.rect(d.x - 1.5, d.y - 1.5, 3.5, 3.5);
            }
          }for (l.wireframes ? a.fillStyle = "rgba(255,255,255,0.7)" : a.fillStyle = "orange", a.fill(), a.beginPath(), r = 0; r < t.length; r++) {
            if (o = t[r], o.isActive && (i = o.collision, o.activeContacts.length > 0)) {
              var u = o.activeContacts[0].vertex.x,
                  p = o.activeContacts[0].vertex.y;2 === o.activeContacts.length && (u = (o.activeContacts[0].vertex.x + o.activeContacts[1].vertex.x) / 2, p = (o.activeContacts[0].vertex.y + o.activeContacts[1].vertex.y) / 2), i.bodyB === i.supports[0].body || i.bodyA.isStatic === !0 ? a.moveTo(u - 8 * i.normal.x, p - 8 * i.normal.y) : a.moveTo(u + 8 * i.normal.x, p + 8 * i.normal.y), a.lineTo(u, p);
            }
          }l.wireframes ? a.strokeStyle = "rgba(255,165,0,0.7)" : a.strokeStyle = "orange", a.lineWidth = 1, a.stroke();
        }, o.separations = function (e, t, n) {
          var o,
              i,
              r,
              s,
              a,
              l = n,
              c = e.options;for (l.beginPath(), a = 0; a < t.length; a++) {
            if (o = t[a], o.isActive) {
              i = o.collision, r = i.bodyA, s = i.bodyB;var d = 1;s.isStatic || r.isStatic || (d = .5), s.isStatic && (d = 0), l.moveTo(s.position.x, s.position.y), l.lineTo(s.position.x - i.penetration.x * d, s.position.y - i.penetration.y * d), d = 1, s.isStatic || r.isStatic || (d = .5), r.isStatic && (d = 0), l.moveTo(r.position.x, r.position.y), l.lineTo(r.position.x + i.penetration.x * d, r.position.y + i.penetration.y * d);
            }
          }c.wireframes ? l.strokeStyle = "rgba(255,165,0,0.5)" : l.strokeStyle = "orange", l.stroke();
        }, o.grid = function (e, t, n) {
          var o = n,
              r = e.options;r.wireframes ? o.strokeStyle = "rgba(255,180,0,0.1)" : o.strokeStyle = "rgba(255,180,0,0.5)", o.beginPath();for (var s = i.keys(t.buckets), a = 0; a < s.length; a++) {
            var l = s[a];if (!(t.buckets[l].length < 2)) {
              var c = l.split(/C|R/);o.rect(.5 + parseInt(c[1], 10) * t.bucketWidth, .5 + parseInt(c[2], 10) * t.bucketHeight, t.bucketWidth, t.bucketHeight);
            }
          }o.lineWidth = 1, o.stroke();
        }, o.inspector = function (e, t) {
          var n,
              o = (e.engine, e.selected),
              i = e.render,
              r = i.options;if (r.hasBounds) {
            var s = i.bounds.max.x - i.bounds.min.x,
                a = i.bounds.max.y - i.bounds.min.y,
                l = s / i.options.width,
                c = a / i.options.height;t.scale(1 / l, 1 / c), t.translate(-i.bounds.min.x, -i.bounds.min.y);
          }for (var d = 0; d < o.length; d++) {
            var u = o[d].data;switch (t.translate(.5, .5), t.lineWidth = 1, t.strokeStyle = "rgba(255,165,0,0.9)", t.setLineDash([1, 2]), u.type) {case "body":
                n = u.bounds, t.beginPath(), t.rect(Math.floor(n.min.x - 3), Math.floor(n.min.y - 3), Math.floor(n.max.x - n.min.x + 6), Math.floor(n.max.y - n.min.y + 6)), t.closePath(), t.stroke();break;case "constraint":
                var p = u.pointA;u.bodyA && (p = u.pointB), t.beginPath(), t.arc(p.x, p.y, 10, 0, 2 * Math.PI), t.closePath(), t.stroke();}t.setLineDash([]), t.translate(-.5, -.5);
          }null !== e.selectStart && (t.translate(.5, .5), t.lineWidth = 1, t.strokeStyle = "rgba(255,165,0,0.6)", t.fillStyle = "rgba(255,165,0,0.1)", n = e.selectBounds, t.beginPath(), t.rect(Math.floor(n.min.x), Math.floor(n.min.y), Math.floor(n.max.x - n.min.x), Math.floor(n.max.y - n.min.y)), t.closePath(), t.stroke(), t.fill(), t.translate(-.5, -.5)), r.hasBounds && t.setTransform(1, 0, 0, 1, 0, 0);
        };var n = function n(e, t) {
          var n = document.createElement("canvas");return n.width = e, n.height = t, n.oncontextmenu = function () {
            return !1;
          }, n.onselectstart = function () {
            return !1;
          }, n;
        },
            u = function u(e) {
          var t = e.getContext("2d"),
              n = window.devicePixelRatio || 1,
              o = t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1;return n / o;
        },
            p = function p(e, t) {
          var n = e.textures[t];return n ? n : (n = e.textures[t] = new Image(), n.src = t, n);
        },
            f = function f(e, t) {
          var n = t;/(jpg|gif|png)$/.test(t) && (n = "url(" + t + ")"), e.canvas.style.background = n, e.canvas.style.backgroundSize = "contain", e.currentBackground = t;
        };
      }();
    }, { "../body/Composite": 2, "../collision/Grid": 6, "../core/Common": 14, "../core/Events": 16, "../core/Mouse": 19, "../geometry/Bounds": 26, "../geometry/Vector": 28 }], 32: [function (e, t, n) {
      var o = {};t.exports = o;var i = e("../geometry/Bounds"),
          r = e("../body/Composite"),
          s = e("../core/Common"),
          a = e("../core/Events"),
          l = e("../geometry/Vector");
      !function () {
        var e, t;"undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
          window.setTimeout(function () {
            e(s.now());
          }, 1e3 / 60);
        }, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), o.create = function (e) {
          s.warn("RenderPixi.create: Matter.RenderPixi is deprecated (see docs)");var t = { controller: o, engine: null, element: null, frameRequestId: null, canvas: null, renderer: null, container: null, spriteContainer: null, pixiOptions: null, options: { width: 800, height: 600, background: "#fafafa", wireframeBackground: "#222", hasBounds: !1, enabled: !0, wireframes: !0, showSleeping: !0, showDebug: !1, showBroadphase: !1, showBounds: !1, showVelocity: !1, showCollisions: !1, showAxes: !1, showPositions: !1, showAngleIndicator: !1, showIds: !1, showShadows: !1 } },
              n = s.extend(t, e),
              i = !n.options.wireframes && "transparent" === n.options.background;return n.pixiOptions = n.pixiOptions || {
            view: n.canvas, transparent: i, antialias: !0, backgroundColor: e.background }, n.mouse = e.mouse, n.engine = e.engine, n.renderer = n.renderer || new PIXI.WebGLRenderer(n.options.width, n.options.height, n.pixiOptions), n.container = n.container || new PIXI.Container(), n.spriteContainer = n.spriteContainer || new PIXI.Container(), n.canvas = n.canvas || n.renderer.view, n.bounds = n.bounds || { min: { x: 0, y: 0 }, max: { x: n.options.width, y: n.options.height } }, a.on(n.engine, "beforeUpdate", function () {
            o.clear(n);
          }), n.textures = {}, n.sprites = {}, n.primitives = {}, n.container.addChild(n.spriteContainer), s.isElement(n.element) ? n.element.appendChild(n.canvas) : s.warn('No "render.element" passed, "render.canvas" was not inserted into document.'), n.canvas.oncontextmenu = function () {
            return !1;
          }, n.canvas.onselectstart = function () {
            return !1;
          }, n;
        }, o.run = function (t) {
          !function n(i) {
            t.frameRequestId = e(n), o.world(t);
          }();
        }, o.stop = function (e) {
          t(e.frameRequestId);
        }, o.clear = function (e) {
          for (var t = e.container, n = e.spriteContainer; t.children[0];) {
            t.removeChild(t.children[0]);
          }for (; n.children[0];) {
            n.removeChild(n.children[0]);
          }var o = e.sprites["bg-0"];e.textures = {}, e.sprites = {}, e.primitives = {}, e.sprites["bg-0"] = o, o && t.addChildAt(o, 0), e.container.addChild(e.spriteContainer), e.currentBackground = null, t.scale.set(1, 1), t.position.set(0, 0);
        }, o.setBackground = function (e, t) {
          if (e.currentBackground !== t) {
            var n = t.indexOf && t.indexOf("#") !== -1,
                o = e.sprites["bg-0"];if (n) {
              var i = s.colorToNumber(t);e.renderer.backgroundColor = i, o && e.container.removeChild(o);
            } else if (!o) {
              var r = d(e, t);o = e.sprites["bg-0"] = new PIXI.Sprite(r), o.position.x = 0, o.position.y = 0, e.container.addChildAt(o, 0);
            }e.currentBackground = t;
          }
        }, o.world = function (e) {
          var t,
              n = e.engine,
              s = n.world,
              a = e.renderer,
              c = e.container,
              d = e.options,
              u = r.allBodies(s),
              p = r.allConstraints(s),
              f = [];d.wireframes ? o.setBackground(e, d.wireframeBackground) : o.setBackground(e, d.background);var m = e.bounds.max.x - e.bounds.min.x,
              v = e.bounds.max.y - e.bounds.min.y,
              y = m / e.options.width,
              g = v / e.options.height;if (d.hasBounds) {
            for (t = 0; t < u.length; t++) {
              var x = u[t];x.render.sprite.visible = i.overlaps(x.bounds, e.bounds);
            }for (t = 0; t < p.length; t++) {
              var h = p[t],
                  b = h.bodyA,
                  w = h.bodyB,
                  S = h.pointA,
                  C = h.pointB;b && (S = l.add(b.position, h.pointA)), w && (C = l.add(w.position, h.pointB)), S && C && (i.contains(e.bounds, S) || i.contains(e.bounds, C)) && f.push(h);
            }c.scale.set(1 / y, 1 / g), c.position.set(-e.bounds.min.x * (1 / y), -e.bounds.min.y * (1 / g));
          } else f = p;for (t = 0; t < u.length; t++) {
            o.body(e, u[t]);
          }for (t = 0; t < f.length; t++) {
            o.constraint(e, f[t]);
          }a.render(c);
        }, o.constraint = function (e, t) {
          var n = (e.engine, t.bodyA),
              o = t.bodyB,
              i = t.pointA,
              r = t.pointB,
              a = e.container,
              l = t.render,
              c = "c-" + t.id,
              d = e.primitives[c];return d || (d = e.primitives[c] = new PIXI.Graphics()), l.visible && t.pointA && t.pointB ? (s.indexOf(a.children, d) === -1 && a.addChild(d), d.clear(), d.beginFill(0, 0), d.lineStyle(l.lineWidth, s.colorToNumber(l.strokeStyle), 1), n ? d.moveTo(n.position.x + i.x, n.position.y + i.y) : d.moveTo(i.x, i.y), o ? d.lineTo(o.position.x + r.x, o.position.y + r.y) : d.lineTo(r.x, r.y), void d.endFill()) : void d.clear();
        }, o.body = function (e, t) {
          var o = (e.engine, t.render);if (o.visible) if (o.sprite && o.sprite.texture) {
            var i = "b-" + t.id,
                r = e.sprites[i],
                a = e.spriteContainer;
            r || (r = e.sprites[i] = n(e, t)), s.indexOf(a.children, r) === -1 && a.addChild(r), r.position.x = t.position.x, r.position.y = t.position.y, r.rotation = t.angle, r.scale.x = o.sprite.xScale || 1, r.scale.y = o.sprite.yScale || 1;
          } else {
            var l = "b-" + t.id,
                d = e.primitives[l],
                u = e.container;d || (d = e.primitives[l] = c(e, t), d.initialAngle = t.angle), s.indexOf(u.children, d) === -1 && u.addChild(d), d.position.x = t.position.x, d.position.y = t.position.y, d.rotation = t.angle - d.initialAngle;
          }
        };var n = function n(e, t) {
          var n = t.render,
              o = n.sprite.texture,
              i = d(e, o),
              r = new PIXI.Sprite(i);return r.anchor.x = t.render.sprite.xOffset, r.anchor.y = t.render.sprite.yOffset, r;
        },
            c = function c(e, t) {
          var n,
              o = t.render,
              i = e.options,
              r = new PIXI.Graphics(),
              a = s.colorToNumber(o.fillStyle),
              l = s.colorToNumber(o.strokeStyle),
              c = s.colorToNumber(o.strokeStyle),
              d = s.colorToNumber("#bbb"),
              u = s.colorToNumber("#CD5C5C");r.clear();for (var p = t.parts.length > 1 ? 1 : 0; p < t.parts.length; p++) {
            n = t.parts[p], i.wireframes ? (r.beginFill(0, 0), r.lineStyle(1, d, 1)) : (r.beginFill(a, 1), r.lineStyle(o.lineWidth, l, 1)), r.moveTo(n.vertices[0].x - t.position.x, n.vertices[0].y - t.position.y);
            for (var f = 1; f < n.vertices.length; f++) {
              r.lineTo(n.vertices[f].x - t.position.x, n.vertices[f].y - t.position.y);
            }r.lineTo(n.vertices[0].x - t.position.x, n.vertices[0].y - t.position.y), r.endFill(), (i.showAngleIndicator || i.showAxes) && (r.beginFill(0, 0), i.wireframes ? r.lineStyle(1, u, 1) : r.lineStyle(1, c), r.moveTo(n.position.x - t.position.x, n.position.y - t.position.y), r.lineTo((n.vertices[0].x + n.vertices[n.vertices.length - 1].x) / 2 - t.position.x, (n.vertices[0].y + n.vertices[n.vertices.length - 1].y) / 2 - t.position.y), r.endFill());
          }return r;
        },
            d = function d(e, t) {
          var n = e.textures[t];return n || (n = e.textures[t] = PIXI.Texture.fromImage(t)), n;
        };
      }();
    }, { "../body/Composite": 2, "../core/Common": 14, "../core/Events": 16, "../geometry/Bounds": 26, "../geometry/Vector": 28 }] }, {}, [30])(30);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ })

});