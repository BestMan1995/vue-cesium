define(['exports', './Matrix2-9aa31791', './when-4bbc8319', './RuntimeError-346a3079', './ComponentDatatype-93750d1a'], function (t, e, i, a, o) {
  'use strict'
  function r(t) {
    ;(this._ellipsoid = i.defaultValue(t, e.Ellipsoid.WGS84)),
      (this._semimajorAxis = this._ellipsoid.maximumRadius),
      (this._oneOverSemimajorAxis = 1 / this._semimajorAxis)
  }
  Object.defineProperties(r.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    }
  }),
    (r.mercatorAngleToGeodeticLatitude = function (t) {
      return o.CesiumMath.PI_OVER_TWO - 2 * Math.atan(Math.exp(-t))
    }),
    (r.geodeticLatitudeToMercatorAngle = function (t) {
      t > r.MaximumLatitude ? (t = r.MaximumLatitude) : t < -r.MaximumLatitude && (t = -r.MaximumLatitude)
      var e = Math.sin(t)
      return 0.5 * Math.log((1 + e) / (1 - e))
    }),
    (r.MaximumLatitude = r.mercatorAngleToGeodeticLatitude(Math.PI)),
    (r.prototype.project = function (t, a) {
      var o = this._semimajorAxis,
        n = t.longitude * o,
        u = r.geodeticLatitudeToMercatorAngle(t.latitude) * o,
        d = t.height
      return i.defined(a) ? ((a.x = n), (a.y = u), (a.z = d), a) : new e.Cartesian3(n, u, d)
    }),
    (r.prototype.unproject = function (t, a) {
      var o = this._oneOverSemimajorAxis,
        n = t.x * o,
        u = r.mercatorAngleToGeodeticLatitude(t.y * o),
        d = t.z
      return i.defined(a) ? ((a.longitude = n), (a.latitude = u), (a.height = d), a) : new e.Cartographic(n, u, d)
    }),
    (t.WebMercatorProjection = r)
})
