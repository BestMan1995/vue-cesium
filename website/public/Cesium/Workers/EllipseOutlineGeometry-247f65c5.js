define([
  'exports',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './ComponentDatatype-93750d1a',
  './when-4bbc8319',
  './RuntimeError-346a3079',
  './EllipseGeometryLibrary-962723df',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6'
], function (e, t, i, r, a, n, o, s, l, u, d) {
  'use strict'
  var p = new r.Cartesian3(),
    f = new r.Cartesian3()
  var c = new i.BoundingSphere(),
    m = new i.BoundingSphere()
  function h(e) {
    var t = (e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT)).center,
      i = n.defaultValue(e.ellipsoid, r.Ellipsoid.WGS84),
      o = e.semiMajorAxis,
      s = e.semiMinorAxis,
      l = n.defaultValue(e.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
      u = n.defaultValue(e.height, 0),
      d = n.defaultValue(e.extrudedHeight, u)
    ;(this._center = r.Cartesian3.clone(t)),
      (this._semiMajorAxis = o),
      (this._semiMinorAxis = s),
      (this._ellipsoid = r.Ellipsoid.clone(i)),
      (this._rotation = n.defaultValue(e.rotation, 0)),
      (this._height = Math.max(d, u)),
      (this._granularity = l),
      (this._extrudedHeight = Math.min(d, u)),
      (this._numberOfVerticalLines = Math.max(n.defaultValue(e.numberOfVerticalLines, 16), 0)),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createEllipseOutlineGeometry')
  }
  ;(h.packedLength = r.Cartesian3.packedLength + r.Ellipsoid.packedLength + 8),
    (h.pack = function (e, t, i) {
      return (
        (i = n.defaultValue(i, 0)),
        r.Cartesian3.pack(e._center, t, i),
        (i += r.Cartesian3.packedLength),
        r.Ellipsoid.pack(e._ellipsoid, t, i),
        (i += r.Ellipsoid.packedLength),
        (t[i++] = e._semiMajorAxis),
        (t[i++] = e._semiMinorAxis),
        (t[i++] = e._rotation),
        (t[i++] = e._height),
        (t[i++] = e._granularity),
        (t[i++] = e._extrudedHeight),
        (t[i++] = e._numberOfVerticalLines),
        (t[i] = n.defaultValue(e._offsetAttribute, -1)),
        t
      )
    })
  var y = new r.Cartesian3(),
    b = new r.Ellipsoid(),
    A = {
      center: y,
      ellipsoid: b,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      rotation: void 0,
      height: void 0,
      granularity: void 0,
      extrudedHeight: void 0,
      numberOfVerticalLines: void 0,
      offsetAttribute: void 0
    }
  ;(h.unpack = function (e, t, i) {
    t = n.defaultValue(t, 0)
    var a = r.Cartesian3.unpack(e, t, y)
    t += r.Cartesian3.packedLength
    var o = r.Ellipsoid.unpack(e, t, b)
    t += r.Ellipsoid.packedLength
    var s = e[t++],
      l = e[t++],
      u = e[t++],
      d = e[t++],
      p = e[t++],
      f = e[t++],
      c = e[t++],
      m = e[t]
    return n.defined(i)
      ? ((i._center = r.Cartesian3.clone(a, i._center)),
        (i._ellipsoid = r.Ellipsoid.clone(o, i._ellipsoid)),
        (i._semiMajorAxis = s),
        (i._semiMinorAxis = l),
        (i._rotation = u),
        (i._height = d),
        (i._granularity = p),
        (i._extrudedHeight = f),
        (i._numberOfVerticalLines = c),
        (i._offsetAttribute = -1 === m ? void 0 : m),
        i)
      : ((A.height = d),
        (A.extrudedHeight = f),
        (A.granularity = p),
        (A.rotation = u),
        (A.semiMajorAxis = s),
        (A.semiMinorAxis = l),
        (A.numberOfVerticalLines = c),
        (A.offsetAttribute = -1 === m ? void 0 : m),
        new h(A))
  }),
    (h.createGeometry = function (e) {
      if (!(e._semiMajorAxis <= 0 || e._semiMinorAxis <= 0)) {
        var o = e._height,
          h = e._extrudedHeight,
          y = !a.CesiumMath.equalsEpsilon(o, h, 0, a.CesiumMath.EPSILON2)
        e._center = e._ellipsoid.scaleToGeodeticSurface(e._center, e._center)
        var b,
          A = {
            center: e._center,
            semiMajorAxis: e._semiMajorAxis,
            semiMinorAxis: e._semiMinorAxis,
            ellipsoid: e._ellipsoid,
            rotation: e._rotation,
            height: o,
            granularity: e._granularity,
            numberOfVerticalLines: e._numberOfVerticalLines
          }
        if (y)
          (A.extrudedHeight = h),
            (A.offsetAttribute = e._offsetAttribute),
            (b = (function (e) {
              var o = e.center,
                f = e.ellipsoid,
                h = e.semiMajorAxis,
                y = r.Cartesian3.multiplyByScalar(f.geodeticSurfaceNormal(o, p), e.height, p)
              ;(c.center = r.Cartesian3.add(o, y, c.center)),
                (c.radius = h),
                (y = r.Cartesian3.multiplyByScalar(f.geodeticSurfaceNormal(o, y), e.extrudedHeight, y)),
                (m.center = r.Cartesian3.add(o, y, m.center)),
                (m.radius = h)
              var b = s.EllipseGeometryLibrary.computeEllipsePositions(e, !1, !0).outerPositions,
                A = new u.GeometryAttributes({
                  position: new l.GeometryAttribute({
                    componentDatatype: a.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: s.EllipseGeometryLibrary.raisePositionsToHeight(b, e, !0)
                  })
                })
              b = A.position.values
              var _ = i.BoundingSphere.union(c, m),
                g = b.length / 3
              if (n.defined(e.offsetAttribute)) {
                var v = new Uint8Array(g)
                if (e.offsetAttribute === t.GeometryOffsetAttribute.TOP) v = t.arrayFill(v, 1, 0, g / 2)
                else {
                  var x = e.offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1
                  v = t.arrayFill(v, x)
                }
                A.applyOffset = new l.GeometryAttribute({
                  componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: v
                })
              }
              var E = n.defaultValue(e.numberOfVerticalLines, 16)
              E = a.CesiumMath.clamp(E, 0, g / 2)
              var M = d.IndexDatatype.createTypedArray(g, 2 * g + 2 * E)
              g /= 2
              var C,
                G,
                L = 0
              for (C = 0; C < g; ++C) (M[L++] = C), (M[L++] = (C + 1) % g), (M[L++] = C + g), (M[L++] = ((C + 1) % g) + g)
              if (E > 0) {
                var O = Math.min(E, g)
                G = Math.round(g / O)
                var S = Math.min(G * E, g)
                for (C = 0; C < S; C += G) (M[L++] = C), (M[L++] = C + g)
              }
              return { boundingSphere: _, attributes: A, indices: M }
            })(A))
        else if (
          ((b = (function (e) {
            var t = e.center
            ;(f = r.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t, f), e.height, f)), (f = r.Cartesian3.add(t, f, f))
            for (
              var n = new i.BoundingSphere(f, e.semiMajorAxis),
                o = s.EllipseGeometryLibrary.computeEllipsePositions(e, !1, !0).outerPositions,
                p = new u.GeometryAttributes({
                  position: new l.GeometryAttribute({
                    componentDatatype: a.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: s.EllipseGeometryLibrary.raisePositionsToHeight(o, e, !1)
                  })
                }),
                c = o.length / 3,
                m = d.IndexDatatype.createTypedArray(c, 2 * c),
                h = 0,
                y = 0;
              y < c;
              ++y
            )
              (m[h++] = y), (m[h++] = (y + 1) % c)
            return { boundingSphere: n, attributes: p, indices: m }
          })(A)),
          n.defined(e._offsetAttribute))
        ) {
          var _ = b.attributes.position.values.length,
            g = new Uint8Array(_ / 3),
            v = e._offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1
          t.arrayFill(g, v),
            (b.attributes.applyOffset = new l.GeometryAttribute({
              componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: g
            }))
        }
        return new l.Geometry({
          attributes: b.attributes,
          indices: b.indices,
          primitiveType: l.PrimitiveType.LINES,
          boundingSphere: b.boundingSphere,
          offsetAttribute: e._offsetAttribute
        })
      }
    }),
    (e.EllipseOutlineGeometry = h)
})
