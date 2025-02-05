define([
  './AxisAlignedBoundingBox-07c6b7f2',
  './Matrix2-9aa31791',
  './when-4bbc8319',
  './TerrainEncoding-ba779f11',
  './IndexDatatype-b7d979a6',
  './ComponentDatatype-93750d1a',
  './RuntimeError-346a3079',
  './Transforms-d13cc04e',
  './WebMercatorProjection-58801a11',
  './createTaskProcessorWorker',
  './AttributeCompression-af389d04',
  './WebGLConstants-1c8239cc',
  './combine-83860057'
], function (e, t, r, i, n, o, a, s, d, c, h, u, I) {
  'use strict'
  function l() {
    a.DeveloperError.throwInstantiationError()
  }
  Object.defineProperties(l.prototype, {
    errorEvent: { get: a.DeveloperError.throwInstantiationError },
    credit: { get: a.DeveloperError.throwInstantiationError },
    tilingScheme: { get: a.DeveloperError.throwInstantiationError },
    ready: { get: a.DeveloperError.throwInstantiationError },
    readyPromise: { get: a.DeveloperError.throwInstantiationError },
    hasWaterMask: { get: a.DeveloperError.throwInstantiationError },
    hasVertexNormals: { get: a.DeveloperError.throwInstantiationError },
    availability: { get: a.DeveloperError.throwInstantiationError }
  })
  var g = []
  l.getRegularGridIndices = function (e, t) {
    var i = g[e]
    r.defined(i) || (g[e] = i = [])
    var n = i[t]
    return (
      r.defined(n) ||
        v(
          e,
          t,
          (n =
            e * t < o.CesiumMath.SIXTY_FOUR_KILOBYTES
              ? (i[t] = new Uint16Array((e - 1) * (t - 1) * 6))
              : (i[t] = new Uint32Array((e - 1) * (t - 1) * 6))),
          0
        ),
      n
    )
  }
  var m = []
  l.getRegularGridIndicesAndEdgeIndices = function (e, t) {
    var i = m[e]
    r.defined(i) || (m[e] = i = [])
    var n = i[t]
    if (!r.defined(n)) {
      var o = l.getRegularGridIndices(e, t),
        a = E(e, t),
        s = a.westIndicesSouthToNorth,
        d = a.southIndicesEastToWest,
        c = a.eastIndicesNorthToSouth,
        h = a.northIndicesWestToEast
      n = i[t] = { indices: o, westIndicesSouthToNorth: s, southIndicesEastToWest: d, eastIndicesNorthToSouth: c, northIndicesWestToEast: h }
    }
    return n
  }
  var T = []
  function E(e, t) {
    var r,
      i = new Array(t),
      n = new Array(e),
      o = new Array(t),
      a = new Array(e)
    for (r = 0; r < e; ++r) (a[r] = r), (n[r] = e * t - 1 - r)
    for (r = 0; r < t; ++r) (o[r] = (r + 1) * e - 1), (i[r] = (t - r - 1) * e)
    return { westIndicesSouthToNorth: i, southIndicesEastToWest: n, eastIndicesNorthToSouth: o, northIndicesWestToEast: a }
  }
  function v(e, t, r, i) {
    for (var n = 0, o = 0; o < t - 1; ++o) {
      for (var a = 0; a < e - 1; ++a) {
        var s = n,
          d = s + e,
          c = d + 1,
          h = s + 1
        ;(r[i++] = s), (r[i++] = d), (r[i++] = h), (r[i++] = h), (r[i++] = d), (r[i++] = c), ++n
      }
      ++n
    }
  }
  function p(e, t, r, i) {
    for (var n = e[0], o = e.length, a = 1; a < o; ++a) {
      var s = e[a]
      ;(r[i++] = n), (r[i++] = s), (r[i++] = t), (r[i++] = t), (r[i++] = s), (r[i++] = t + 1), (n = s), ++t
    }
    return i
  }
  ;(l.getRegularGridAndSkirtIndicesAndEdgeIndices = function (e, t) {
    var i = T[e]
    r.defined(i) || (T[e] = i = [])
    var o = i[t]
    if (!r.defined(o)) {
      var a = e * t,
        s = (e - 1) * (t - 1) * 6,
        d = 2 * e + 2 * t,
        c = a + d,
        h = s + 6 * Math.max(0, d - 4),
        u = E(e, t),
        I = u.westIndicesSouthToNorth,
        g = u.southIndicesEastToWest,
        m = u.eastIndicesNorthToSouth,
        p = u.northIndicesWestToEast,
        f = n.IndexDatatype.createTypedArray(c, h)
      v(e, t, f, 0),
        l.addSkirtIndices(I, g, m, p, a, f, s),
        (o = i[t] =
          {
            indices: f,
            westIndicesSouthToNorth: I,
            southIndicesEastToWest: g,
            eastIndicesNorthToSouth: m,
            northIndicesWestToEast: p,
            indexCountWithoutSkirts: s
          })
    }
    return o
  }),
    (l.addSkirtIndices = function (e, t, r, i, n, o, a) {
      var s = n
      ;(a = p(e, s, o, a)), (a = p(t, (s += e.length), o, a)), (a = p(r, (s += t.length), o, a)), p(i, (s += r.length), o, a)
    }),
    (l.heightmapTerrainQuality = 0.25),
    (l.getEstimatedLevelZeroGeometricErrorForAHeightmap = function (e, t, r) {
      return (2 * e.maximumRadius * Math.PI * l.heightmapTerrainQuality) / (t * r)
    }),
    (l.prototype.requestTileGeometry = a.DeveloperError.throwInstantiationError),
    (l.prototype.getLevelMaximumGeometricError = a.DeveloperError.throwInstantiationError),
    (l.prototype.getTileDataAvailable = a.DeveloperError.throwInstantiationError),
    (l.prototype.loadTileDataAvailability = a.DeveloperError.throwInstantiationError)
  var f = 32767,
    y = new t.Cartesian3(),
    N = new t.Cartesian3(),
    w = new t.Cartesian3(),
    S = new t.Cartographic(),
    M = new t.Cartesian2()
  function x(e, r, i, n, a, s, d, c, h) {
    var u = Number.POSITIVE_INFINITY,
      I = a.north,
      l = a.south,
      g = a.east,
      m = a.west
    g < m && (g += o.CesiumMath.TWO_PI)
    for (var T = e.length, E = 0; E < T; ++E) {
      var v = e[E],
        p = i[v],
        f = n[v]
      ;(S.longitude = o.CesiumMath.lerp(m, g, f.x)), (S.latitude = o.CesiumMath.lerp(l, I, f.y)), (S.height = p - r)
      var N = s.cartographicToCartesian(S, y)
      t.Matrix4.multiplyByPoint(d, N, N),
        t.Cartesian3.minimumByComponent(N, c, c),
        t.Cartesian3.maximumByComponent(N, h, h),
        (u = Math.min(u, S.height))
    }
    return u
  }
  function b(e, t, i, n, a, s, c, h, u, I, l, g, m, T) {
    var E = r.defined(c),
      v = u.north,
      p = u.south,
      f = u.east,
      N = u.west
    f < N && (f += o.CesiumMath.TWO_PI)
    for (var w = i.length, x = 0; x < w; ++x) {
      var b = i[x],
        A = a[b],
        C = s[b]
      ;(S.longitude = o.CesiumMath.lerp(N, f, C.x) + m), (S.latitude = o.CesiumMath.lerp(p, v, C.y) + T), (S.height = A - I)
      var W,
        P,
        D = h.cartographicToCartesian(S, y)
      if (E) {
        var k = 2 * b
        ;(M.x = c[k]), (M.y = c[k + 1])
      }
      n.hasWebMercatorT && (W = (d.WebMercatorProjection.geodeticLatitudeToMercatorAngle(S.latitude) - l) * g),
        n.hasGeodeticSurfaceNormals && (P = h.geodeticSurfaceNormal(D)),
        (t = n.encode(e, t, D, C, S.height, M, W, P))
    }
  }
  function A(e, t) {
    var i
    return (
      'function' == typeof e.slice && 'function' != typeof (i = e.slice()).sort && (i = void 0),
      r.defined(i) || (i = Array.prototype.slice.call(e)),
      i.sort(t),
      i
    )
  }
  return c(function (a, c) {
    var h,
      u,
      I = a.quantizedVertices,
      g = I.length / 3,
      m = a.octEncodedNormals,
      T = a.westIndices.length + a.eastIndices.length + a.southIndices.length + a.northIndices.length,
      E = a.includeWebMercatorT,
      v = a.exaggeration,
      p = a.exaggerationRelativeHeight,
      C = 1 !== v,
      W = t.Rectangle.clone(a.rectangle),
      P = W.west,
      D = W.south,
      k = W.east,
      F = W.north,
      H = t.Ellipsoid.clone(a.ellipsoid),
      _ = a.minimumHeight,
      G = a.maximumHeight,
      V = a.relativeToCenter,
      Y = s.Transforms.eastNorthUpToFixedFrame(V, H),
      O = t.Matrix4.inverseTransformation(Y, new t.Matrix4())
    E &&
      ((h = d.WebMercatorProjection.geodeticLatitudeToMercatorAngle(D)), (u = 1 / (d.WebMercatorProjection.geodeticLatitudeToMercatorAngle(F) - h)))
    var B = I.subarray(0, g),
      R = I.subarray(g, 2 * g),
      L = I.subarray(2 * g, 3 * g),
      j = r.defined(m),
      U = new Array(g),
      z = new Array(g),
      q = new Array(g),
      Q = E ? new Array(g) : [],
      K = C ? new Array(g) : [],
      X = N
    ;(X.x = Number.POSITIVE_INFINITY), (X.y = Number.POSITIVE_INFINITY), (X.z = Number.POSITIVE_INFINITY)
    var Z = w
    ;(Z.x = Number.NEGATIVE_INFINITY), (Z.y = Number.NEGATIVE_INFINITY), (Z.z = Number.NEGATIVE_INFINITY)
    for (
      var J = Number.POSITIVE_INFINITY, $ = Number.NEGATIVE_INFINITY, ee = Number.POSITIVE_INFINITY, te = Number.NEGATIVE_INFINITY, re = 0;
      re < g;
      ++re
    ) {
      var ie = B[re],
        ne = R[re],
        oe = ie / f,
        ae = ne / f,
        se = o.CesiumMath.lerp(_, G, L[re] / f)
      ;(S.longitude = o.CesiumMath.lerp(P, k, oe)),
        (S.latitude = o.CesiumMath.lerp(D, F, ae)),
        (S.height = se),
        (J = Math.min(S.longitude, J)),
        ($ = Math.max(S.longitude, $)),
        (ee = Math.min(S.latitude, ee)),
        (te = Math.max(S.latitude, te))
      var de = H.cartographicToCartesian(S)
      ;(U[re] = new t.Cartesian2(oe, ae)),
        (z[re] = se),
        (q[re] = de),
        E && (Q[re] = (d.WebMercatorProjection.geodeticLatitudeToMercatorAngle(S.latitude) - h) * u),
        C && (K[re] = H.geodeticSurfaceNormal(de)),
        t.Matrix4.multiplyByPoint(O, de, y),
        t.Cartesian3.minimumByComponent(y, X, X),
        t.Cartesian3.maximumByComponent(y, Z, Z)
    }
    var ce,
      he = A(a.westIndices, function (e, t) {
        return U[e].y - U[t].y
      }),
      ue = A(a.eastIndices, function (e, t) {
        return U[t].y - U[e].y
      }),
      Ie = A(a.southIndices, function (e, t) {
        return U[t].x - U[e].x
      }),
      le = A(a.northIndices, function (e, t) {
        return U[e].x - U[t].x
      })
    _ < 0 && (ce = new i.EllipsoidalOccluder(H).computeHorizonCullingPointPossiblyUnderEllipsoid(V, q, _))
    var ge = _
    ;(ge = Math.min(ge, x(a.westIndices, a.westSkirtHeight, z, U, W, H, O, X, Z))),
      (ge = Math.min(ge, x(a.southIndices, a.southSkirtHeight, z, U, W, H, O, X, Z))),
      (ge = Math.min(ge, x(a.eastIndices, a.eastSkirtHeight, z, U, W, H, O, X, Z))),
      (ge = Math.min(ge, x(a.northIndices, a.northSkirtHeight, z, U, W, H, O, X, Z)))
    for (
      var me = new e.AxisAlignedBoundingBox(X, Z, V),
        Te = new i.TerrainEncoding(V, me, ge, G, Y, j, E, C, v, p),
        Ee = Te.stride,
        ve = new Float32Array(g * Ee + T * Ee),
        pe = 0,
        fe = 0;
      fe < g;
      ++fe
    ) {
      if (j) {
        var ye = 2 * fe
        ;(M.x = m[ye]), (M.y = m[ye + 1])
      }
      pe = Te.encode(ve, pe, q[fe], U[fe], z[fe], M, Q[fe], K[fe])
    }
    var Ne = Math.max(0, 2 * (T - 4)),
      we = a.indices.length + 3 * Ne,
      Se = n.IndexDatatype.createTypedArray(g + T, we)
    Se.set(a.indices, 0)
    var Me = 1e-4,
      xe = ($ - J) * Me,
      be = (te - ee) * Me,
      Ae = -xe,
      Ce = xe,
      We = be,
      Pe = -be,
      De = g * Ee
    return (
      b(ve, De, he, Te, z, U, m, H, W, a.westSkirtHeight, h, u, Ae, 0),
      b(ve, (De += a.westIndices.length * Ee), Ie, Te, z, U, m, H, W, a.southSkirtHeight, h, u, 0, Pe),
      b(ve, (De += a.southIndices.length * Ee), ue, Te, z, U, m, H, W, a.eastSkirtHeight, h, u, Ce, 0),
      b(ve, (De += a.eastIndices.length * Ee), le, Te, z, U, m, H, W, a.northSkirtHeight, h, u, 0, We),
      l.addSkirtIndices(he, Ie, ue, le, g, Se, a.indices.length),
      c.push(ve.buffer, Se.buffer),
      {
        vertices: ve.buffer,
        indices: Se.buffer,
        westIndicesSouthToNorth: he,
        southIndicesEastToWest: Ie,
        eastIndicesNorthToSouth: ue,
        northIndicesWestToEast: le,
        vertexStride: Ee,
        center: V,
        minimumHeight: _,
        maximumHeight: G,
        occludeePointInScaledSpace: ce,
        encoding: Te,
        indexCountWithoutSkirts: a.indices.length
      }
    )
  })
})
