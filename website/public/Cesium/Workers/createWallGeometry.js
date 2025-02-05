define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './Transforms-d13cc04e',
  './ComponentDatatype-93750d1a',
  './RuntimeError-346a3079',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './VertexFormat-71718faa',
  './WallGeometryLibrary-d3b18e7c',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './arrayRemoveDuplicates-18786327',
  './PolylinePipeline-64021a2e',
  './EllipsoidGeodesic-dd8f2afb',
  './EllipsoidRhumbLine-30c47ff4',
  './IntersectionTests-96a04219',
  './Plane-318d6937'
], function (e, t, a, i, r, n, o, s, m, l, u, p, d, c, y, f, g, v) {
  'use strict'
  var h = new t.Cartesian3(),
    C = new t.Cartesian3(),
    x = new t.Cartesian3(),
    A = new t.Cartesian3(),
    b = new t.Cartesian3(),
    _ = new t.Cartesian3(),
    E = new t.Cartesian3()
  function w(a) {
    var r = (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT)).positions,
      n = a.maximumHeights,
      o = a.minimumHeights,
      s = e.defaultValue(a.vertexFormat, m.VertexFormat.DEFAULT),
      l = e.defaultValue(a.granularity, i.CesiumMath.RADIANS_PER_DEGREE),
      u = e.defaultValue(a.ellipsoid, t.Ellipsoid.WGS84)
    ;(this._positions = r),
      (this._minimumHeights = o),
      (this._maximumHeights = n),
      (this._vertexFormat = m.VertexFormat.clone(s)),
      (this._granularity = l),
      (this._ellipsoid = t.Ellipsoid.clone(u)),
      (this._workerName = 'createWallGeometry')
    var p = 1 + r.length * t.Cartesian3.packedLength + 2
    e.defined(o) && (p += o.length),
      e.defined(n) && (p += n.length),
      (this.packedLength = p + t.Ellipsoid.packedLength + m.VertexFormat.packedLength + 1)
  }
  w.pack = function (a, i, r) {
    var n
    r = e.defaultValue(r, 0)
    var o = a._positions,
      s = o.length
    for (i[r++] = s, n = 0; n < s; ++n, r += t.Cartesian3.packedLength) t.Cartesian3.pack(o[n], i, r)
    var l = a._minimumHeights
    if (((s = e.defined(l) ? l.length : 0), (i[r++] = s), e.defined(l))) for (n = 0; n < s; ++n) i[r++] = l[n]
    var u = a._maximumHeights
    if (((s = e.defined(u) ? u.length : 0), (i[r++] = s), e.defined(u))) for (n = 0; n < s; ++n) i[r++] = u[n]
    return (
      t.Ellipsoid.pack(a._ellipsoid, i, r),
      (r += t.Ellipsoid.packedLength),
      m.VertexFormat.pack(a._vertexFormat, i, r),
      (i[(r += m.VertexFormat.packedLength)] = a._granularity),
      i
    )
  }
  var F = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    L = new m.VertexFormat(),
    k = { positions: void 0, minimumHeights: void 0, maximumHeights: void 0, ellipsoid: F, vertexFormat: L, granularity: void 0 }
  return (
    (w.unpack = function (a, i, r) {
      var n
      i = e.defaultValue(i, 0)
      var o,
        s,
        l = a[i++],
        u = new Array(l)
      for (n = 0; n < l; ++n, i += t.Cartesian3.packedLength) u[n] = t.Cartesian3.unpack(a, i)
      if ((l = a[i++]) > 0) for (o = new Array(l), n = 0; n < l; ++n) o[n] = a[i++]
      if ((l = a[i++]) > 0) for (s = new Array(l), n = 0; n < l; ++n) s[n] = a[i++]
      var p = t.Ellipsoid.unpack(a, i, F)
      i += t.Ellipsoid.packedLength
      var d = m.VertexFormat.unpack(a, i, L),
        c = a[(i += m.VertexFormat.packedLength)]
      return e.defined(r)
        ? ((r._positions = u),
          (r._minimumHeights = o),
          (r._maximumHeights = s),
          (r._ellipsoid = t.Ellipsoid.clone(p, r._ellipsoid)),
          (r._vertexFormat = m.VertexFormat.clone(d, r._vertexFormat)),
          (r._granularity = c),
          r)
        : ((k.positions = u), (k.minimumHeights = o), (k.maximumHeights = s), (k.granularity = c), new w(k))
    }),
    (w.fromConstantHeights = function (t) {
      var a,
        i,
        r = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions,
        n = t.minimumHeight,
        o = t.maximumHeight,
        s = e.defined(n),
        m = e.defined(o)
      if (s || m) {
        var l = r.length
        ;(a = s ? new Array(l) : void 0), (i = m ? new Array(l) : void 0)
        for (var u = 0; u < l; ++u) s && (a[u] = n), m && (i[u] = o)
      }
      return new w({ positions: r, maximumHeights: i, minimumHeights: a, ellipsoid: t.ellipsoid, vertexFormat: t.vertexFormat })
    }),
    (w.createGeometry = function (r) {
      var m = r._positions,
        u = r._minimumHeights,
        p = r._maximumHeights,
        d = r._vertexFormat,
        c = r._granularity,
        y = r._ellipsoid,
        f = l.WallGeometryLibrary.computePositions(y, m, p, u, c, !0)
      if (e.defined(f)) {
        var g,
          v = f.bottomPositions,
          w = f.topPositions,
          F = f.numCorners,
          L = w.length,
          k = 2 * L,
          H = d.position ? new Float64Array(k) : void 0,
          V = d.normal ? new Float32Array(k) : void 0,
          G = d.tangent ? new Float32Array(k) : void 0,
          D = d.bitangent ? new Float32Array(k) : void 0,
          P = d.st ? new Float32Array((k / 3) * 2) : void 0,
          T = 0,
          z = 0,
          O = 0,
          R = 0,
          S = 0,
          I = E,
          N = _,
          M = b,
          W = !0,
          B = 0,
          U = 1 / ((L /= 3) - F - 1)
        for (g = 0; g < L; ++g) {
          var q = 3 * g,
            J = t.Cartesian3.fromArray(w, q, h),
            Y = t.Cartesian3.fromArray(v, q, C)
          if (
            (d.position && ((H[T++] = Y.x), (H[T++] = Y.y), (H[T++] = Y.z), (H[T++] = J.x), (H[T++] = J.y), (H[T++] = J.z)),
            d.st && ((P[S++] = B), (P[S++] = 0), (P[S++] = B), (P[S++] = 1)),
            d.normal || d.tangent || d.bitangent)
          ) {
            var Z = t.Cartesian3.clone(t.Cartesian3.ZERO, A),
              j = t.Cartesian3.subtract(J, y.geodeticSurfaceNormal(J, C), C)
            if ((g + 1 < L && (Z = t.Cartesian3.fromArray(w, q + 3, A)), W)) {
              var K = t.Cartesian3.subtract(Z, J, x),
                Q = t.Cartesian3.subtract(j, J, h)
              ;(I = t.Cartesian3.normalize(t.Cartesian3.cross(Q, K, I), I)), (W = !1)
            }
            t.Cartesian3.equalsEpsilon(J, Z, i.CesiumMath.EPSILON10)
              ? (W = !0)
              : ((B += U),
                d.tangent && (N = t.Cartesian3.normalize(t.Cartesian3.subtract(Z, J, N), N)),
                d.bitangent && (M = t.Cartesian3.normalize(t.Cartesian3.cross(I, N, M), M))),
              d.normal && ((V[z++] = I.x), (V[z++] = I.y), (V[z++] = I.z), (V[z++] = I.x), (V[z++] = I.y), (V[z++] = I.z)),
              d.tangent && ((G[R++] = N.x), (G[R++] = N.y), (G[R++] = N.z), (G[R++] = N.x), (G[R++] = N.y), (G[R++] = N.z)),
              d.bitangent && ((D[O++] = M.x), (D[O++] = M.y), (D[O++] = M.z), (D[O++] = M.x), (D[O++] = M.y), (D[O++] = M.z))
          }
        }
        var X = new o.GeometryAttributes()
        d.position && (X.position = new n.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: H })),
          d.normal && (X.normal = new n.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: V })),
          d.tangent && (X.tangent = new n.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: G })),
          d.bitangent &&
            (X.bitangent = new n.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: D })),
          d.st && (X.st = new n.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: P }))
        var $ = k / 3
        k -= 6 * (F + 1)
        var ee = s.IndexDatatype.createTypedArray($, k),
          te = 0
        for (g = 0; g < $ - 2; g += 2) {
          var ae = g,
            ie = g + 2,
            re = t.Cartesian3.fromArray(H, 3 * ae, h),
            ne = t.Cartesian3.fromArray(H, 3 * ie, C)
          if (!t.Cartesian3.equalsEpsilon(re, ne, i.CesiumMath.EPSILON10)) {
            var oe = g + 1,
              se = g + 3
            ;(ee[te++] = oe), (ee[te++] = ae), (ee[te++] = se), (ee[te++] = se), (ee[te++] = ae), (ee[te++] = ie)
          }
        }
        return new n.Geometry({
          attributes: X,
          indices: ee,
          primitiveType: n.PrimitiveType.TRIANGLES,
          boundingSphere: new a.BoundingSphere.fromVertices(H)
        })
      }
    }),
    function (a, i) {
      return e.defined(i) && (a = w.unpack(a, i)), (a._ellipsoid = t.Ellipsoid.clone(a._ellipsoid)), w.createGeometry(a)
    }
  )
})
