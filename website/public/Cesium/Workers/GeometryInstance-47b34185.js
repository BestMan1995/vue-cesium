define(['exports', './when-4bbc8319', './RuntimeError-346a3079', './Matrix2-9aa31791'], function (e, t, i, r) {
  'use strict'
  e.GeometryInstance = function (e) {
    ;(e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this.geometry = e.geometry),
      (this.modelMatrix = r.Matrix4.clone(t.defaultValue(e.modelMatrix, r.Matrix4.IDENTITY))),
      (this.id = e.id),
      (this.pickPrimitive = e.pickPrimitive),
      (this.attributes = t.defaultValue(e.attributes, {})),
      (this.westHemisphereGeometry = void 0),
      (this.eastHemisphereGeometry = void 0)
  }
})
