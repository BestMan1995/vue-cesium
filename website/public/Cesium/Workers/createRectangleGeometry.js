define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryInstance-47b34185',
  './GeometryPipeline-2356afec',
  './IndexDatatype-b7d979a6',
  './PolygonPipeline-da7fc5ca',
  './RectangleGeometryLibrary-d589ac1e',
  './VertexFormat-71718faa',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './AttributeCompression-af389d04',
  './EncodedCartesian3-f286cedc',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './EllipsoidRhumbLine-30c47ff4'
], function (t, e, a, r, n, i, o, s, l, u, c, m, p, d, g, y, f, h, v, b, _) {
  'use strict'
  var A = new e.Cartesian3(),
    x = new e.Cartesian3(),
    w = new e.Cartesian3(),
    C = new e.Cartesian3(),
    R = new e.Rectangle(),
    E = new e.Cartesian2(),
    F = new r.BoundingSphere(),
    G = new r.BoundingSphere()
  function P(t, e) {
    var a = new o.Geometry({ attributes: new s.GeometryAttributes(), primitiveType: o.PrimitiveType.TRIANGLES })
    return (
      (a.attributes.position = new o.GeometryAttribute({
        componentDatatype: i.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: e.positions
      })),
      t.normal &&
        (a.attributes.normal = new o.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.normals
        })),
      t.tangent &&
        (a.attributes.tangent = new o.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.tangents
        })),
      t.bitangent &&
        (a.attributes.bitangent = new o.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.bitangents
        })),
      a
    )
  }
  var V = new e.Cartesian3(),
    L = new e.Cartesian3()
  function D(t, a) {
    var r = t._vertexFormat,
      n = t._ellipsoid,
      s = a.height,
      l = a.width,
      u = a.northCap,
      m = a.southCap,
      d = 0,
      g = s,
      y = s,
      f = 0
    u && ((d = 1), (y -= 1), (f += 1)), m && ((g -= 1), (y -= 1), (f += 1)), (f += l * y)
    for (
      var h = r.position ? new Float64Array(3 * f) : void 0,
        v = r.st ? new Float32Array(2 * f) : void 0,
        b = 0,
        _ = 0,
        R = A,
        F = E,
        G = Number.MAX_VALUE,
        V = Number.MAX_VALUE,
        L = -Number.MAX_VALUE,
        D = -Number.MAX_VALUE,
        M = d;
      M < g;
      ++M
    )
      for (var T = 0; T < l; ++T)
        p.RectangleGeometryLibrary.computePosition(a, n, r.st, M, T, R, F),
          (h[b++] = R.x),
          (h[b++] = R.y),
          (h[b++] = R.z),
          r.st && ((v[_++] = F.x), (v[_++] = F.y), (G = Math.min(G, F.x)), (V = Math.min(V, F.y)), (L = Math.max(L, F.x)), (D = Math.max(D, F.y)))
    if (
      (u &&
        (p.RectangleGeometryLibrary.computePosition(a, n, r.st, 0, 0, R, F),
        (h[b++] = R.x),
        (h[b++] = R.y),
        (h[b++] = R.z),
        r.st && ((v[_++] = F.x), (v[_++] = F.y), (G = F.x), (V = F.y), (L = F.x), (D = F.y))),
      m &&
        (p.RectangleGeometryLibrary.computePosition(a, n, r.st, s - 1, 0, R, F),
        (h[b++] = R.x),
        (h[b++] = R.y),
        (h[b] = R.z),
        r.st && ((v[_++] = F.x), (v[_] = F.y), (G = Math.min(G, F.x)), (V = Math.min(V, F.y)), (L = Math.max(L, F.x)), (D = Math.max(D, F.y)))),
      r.st && (G < 0 || V < 0 || L > 1 || D > 1))
    )
      for (var O = 0; O < v.length; O += 2) (v[O] = (v[O] - G) / (L - G)), (v[O + 1] = (v[O + 1] - V) / (D - V))
    var N = (function (t, a, r, n) {
        var i = t.length,
          o = a.normal ? new Float32Array(i) : void 0,
          s = a.tangent ? new Float32Array(i) : void 0,
          l = a.bitangent ? new Float32Array(i) : void 0,
          u = 0,
          c = C,
          m = w,
          p = x
        if (a.normal || a.tangent || a.bitangent)
          for (var d = 0; d < i; d += 3) {
            var g = e.Cartesian3.fromArray(t, d, A),
              y = u + 1,
              f = u + 2
            ;(p = r.geodeticSurfaceNormal(g, p)),
              (a.tangent || a.bitangent) &&
                (e.Cartesian3.cross(e.Cartesian3.UNIT_Z, p, m),
                e.Matrix3.multiplyByVector(n, m, m),
                e.Cartesian3.normalize(m, m),
                a.bitangent && e.Cartesian3.normalize(e.Cartesian3.cross(p, m, c), c)),
              a.normal && ((o[u] = p.x), (o[y] = p.y), (o[f] = p.z)),
              a.tangent && ((s[u] = m.x), (s[y] = m.y), (s[f] = m.z)),
              a.bitangent && ((l[u] = c.x), (l[y] = c.y), (l[f] = c.z)),
              (u += 3)
          }
        return P(a, { positions: t, normals: o, tangents: s, bitangents: l })
      })(h, r, n, a.tangentRotationMatrix),
      S = 6 * (l - 1) * (y - 1)
    u && (S += 3 * (l - 1)), m && (S += 3 * (l - 1))
    var I,
      k = c.IndexDatatype.createTypedArray(f, S),
      H = 0,
      z = 0
    for (I = 0; I < y - 1; ++I) {
      for (var B = 0; B < l - 1; ++B) {
        var U = H,
          Y = U + l,
          q = Y + 1,
          X = U + 1
        ;(k[z++] = U), (k[z++] = Y), (k[z++] = X), (k[z++] = X), (k[z++] = Y), (k[z++] = q), ++H
      }
      ++H
    }
    if (u || m) {
      var Q,
        W,
        J = f - 1,
        j = f - 1
      if ((u && m && (J = f - 2), (H = 0), u)) for (I = 0; I < l - 1; I++) (W = (Q = H) + 1), (k[z++] = J), (k[z++] = Q), (k[z++] = W), ++H
      if (m) for (H = (y - 1) * l, I = 0; I < l - 1; I++) (W = (Q = H) + 1), (k[z++] = Q), (k[z++] = j), (k[z++] = W), ++H
    }
    return (
      (N.indices = k),
      r.st && (N.attributes.st = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: v })),
      N
    )
  }
  function M(t, e, a, r, n) {
    return (t[e++] = r[a]), (t[e++] = r[a + 1]), (t[e++] = r[a + 2]), (t[e++] = n[a]), (t[e++] = n[a + 1]), (t[e] = n[a + 2]), t
  }
  function T(t, e, a, r) {
    return (t[e++] = r[a]), (t[e++] = r[a + 1]), (t[e++] = r[a]), (t[e] = r[a + 1]), t
  }
  var O = new d.VertexFormat()
  function N(r, n) {
    var s,
      p = r._shadowVolume,
      g = r._offsetAttribute,
      y = r._vertexFormat,
      f = r._extrudedHeight,
      h = r._surfaceHeight,
      v = r._ellipsoid,
      b = n.height,
      _ = n.width
    if (p) {
      var R = d.VertexFormat.clone(y, O)
      ;(R.normal = !0), (r._vertexFormat = R)
    }
    var E = D(r, n)
    p && (r._vertexFormat = y)
    var F = m.PolygonPipeline.scaleToGeodeticHeight(E.attributes.position.values, h, v, !1),
      G = (F = new Float64Array(F)).length,
      N = 2 * G,
      S = new Float64Array(N)
    S.set(F)
    var I = m.PolygonPipeline.scaleToGeodeticHeight(E.attributes.position.values, f, v)
    S.set(I, G), (E.attributes.position.values = S)
    var k,
      H,
      z,
      B = y.normal ? new Float32Array(N) : void 0,
      U = y.tangent ? new Float32Array(N) : void 0,
      Y = y.bitangent ? new Float32Array(N) : void 0,
      q = y.st ? new Float32Array((N / 3) * 2) : void 0
    if (y.normal) {
      for (H = E.attributes.normal.values, B.set(H), s = 0; s < G; s++) H[s] = -H[s]
      B.set(H, G), (E.attributes.normal.values = B)
    }
    if (p) {
      ;(H = E.attributes.normal.values), y.normal || (E.attributes.normal = void 0)
      var X = new Float32Array(N)
      for (s = 0; s < G; s++) H[s] = -H[s]
      X.set(H, G),
        (E.attributes.extrudeDirection = new o.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: X
        }))
    }
    var Q = t.defined(g)
    if (Q) {
      var W = (G / 3) * 2,
        J = new Uint8Array(W)
      g === a.GeometryOffsetAttribute.TOP
        ? (J = a.arrayFill(J, 1, 0, W / 2))
        : ((z = g === a.GeometryOffsetAttribute.NONE ? 0 : 1), (J = a.arrayFill(J, z))),
        (E.attributes.applyOffset = new o.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: J
        }))
    }
    if (y.tangent) {
      var j = E.attributes.tangent.values
      for (U.set(j), s = 0; s < G; s++) j[s] = -j[s]
      U.set(j, G), (E.attributes.tangent.values = U)
    }
    if (y.bitangent) {
      var Z = E.attributes.bitangent.values
      Y.set(Z), Y.set(Z, G), (E.attributes.bitangent.values = Y)
    }
    y.st && ((k = E.attributes.st.values), q.set(k), q.set(k, (G / 3) * 2), (E.attributes.st.values = q))
    var K = E.indices,
      $ = K.length,
      tt = G / 3,
      et = c.IndexDatatype.createTypedArray(N / 3, 2 * $)
    for (et.set(K), s = 0; s < $; s += 3) (et[s + $] = K[s + 2] + tt), (et[s + 1 + $] = K[s + 1] + tt), (et[s + 2 + $] = K[s] + tt)
    E.indices = et
    var at = n.northCap,
      rt = n.southCap,
      nt = b,
      it = 2,
      ot = 0,
      st = 4,
      lt = 4
    at && ((it -= 1), (nt -= 1), (ot += 1), (st -= 2), (lt -= 1)), rt && ((it -= 1), (nt -= 1), (ot += 1), (st -= 2), (lt -= 1))
    var ut = 2 * ((ot += it * _ + 2 * nt - st) + lt),
      ct = new Float64Array(3 * ut),
      mt = p ? new Float32Array(3 * ut) : void 0,
      pt = Q ? new Uint8Array(ut) : void 0,
      dt = y.st ? new Float32Array(2 * ut) : void 0,
      gt = g === a.GeometryOffsetAttribute.TOP
    Q && !gt && ((z = g === a.GeometryOffsetAttribute.ALL ? 1 : 0), (pt = a.arrayFill(pt, z)))
    var yt,
      ft = 0,
      ht = 0,
      vt = 0,
      bt = 0,
      _t = _ * nt
    for (s = 0; s < _t; s += _)
      (ct = M(ct, ft, (yt = 3 * s), F, I)),
        (ft += 6),
        y.st && ((dt = T(dt, ht, 2 * s, k)), (ht += 4)),
        p && ((vt += 3), (mt[vt++] = H[yt]), (mt[vt++] = H[yt + 1]), (mt[vt++] = H[yt + 2])),
        gt && ((pt[bt++] = 1), (bt += 1))
    if (rt) {
      var At = at ? _t + 1 : _t
      for (yt = 3 * At, s = 0; s < 2; s++)
        (ct = M(ct, ft, yt, F, I)),
          (ft += 6),
          y.st && ((dt = T(dt, ht, 2 * At, k)), (ht += 4)),
          p && ((vt += 3), (mt[vt++] = H[yt]), (mt[vt++] = H[yt + 1]), (mt[vt++] = H[yt + 2])),
          gt && ((pt[bt++] = 1), (bt += 1))
    } else
      for (s = _t - _; s < _t; s++)
        (ct = M(ct, ft, (yt = 3 * s), F, I)),
          (ft += 6),
          y.st && ((dt = T(dt, ht, 2 * s, k)), (ht += 4)),
          p && ((vt += 3), (mt[vt++] = H[yt]), (mt[vt++] = H[yt + 1]), (mt[vt++] = H[yt + 2])),
          gt && ((pt[bt++] = 1), (bt += 1))
    for (s = _t - 1; s > 0; s -= _)
      (ct = M(ct, ft, (yt = 3 * s), F, I)),
        (ft += 6),
        y.st && ((dt = T(dt, ht, 2 * s, k)), (ht += 4)),
        p && ((vt += 3), (mt[vt++] = H[yt]), (mt[vt++] = H[yt + 1]), (mt[vt++] = H[yt + 2])),
        gt && ((pt[bt++] = 1), (bt += 1))
    if (at) {
      var xt = _t
      for (yt = 3 * xt, s = 0; s < 2; s++)
        (ct = M(ct, ft, yt, F, I)),
          (ft += 6),
          y.st && ((dt = T(dt, ht, 2 * xt, k)), (ht += 4)),
          p && ((vt += 3), (mt[vt++] = H[yt]), (mt[vt++] = H[yt + 1]), (mt[vt++] = H[yt + 2])),
          gt && ((pt[bt++] = 1), (bt += 1))
    } else
      for (s = _ - 1; s >= 0; s--)
        (ct = M(ct, ft, (yt = 3 * s), F, I)),
          (ft += 6),
          y.st && ((dt = T(dt, ht, 2 * s, k)), (ht += 4)),
          p && ((vt += 3), (mt[vt++] = H[yt]), (mt[vt++] = H[yt + 1]), (mt[vt++] = H[yt + 2])),
          gt && ((pt[bt++] = 1), (bt += 1))
    var wt = (function (t, a, r) {
      var n = t.length,
        o = a.normal ? new Float32Array(n) : void 0,
        s = a.tangent ? new Float32Array(n) : void 0,
        l = a.bitangent ? new Float32Array(n) : void 0,
        u = 0,
        c = 0,
        m = 0,
        p = !0,
        d = C,
        g = w,
        y = x
      if (a.normal || a.tangent || a.bitangent)
        for (var f = 0; f < n; f += 6) {
          var h = e.Cartesian3.fromArray(t, f, A),
            v = e.Cartesian3.fromArray(t, (f + 6) % n, V)
          if (p) {
            var b = e.Cartesian3.fromArray(t, (f + 3) % n, L)
            e.Cartesian3.subtract(v, h, v), e.Cartesian3.subtract(b, h, b), (y = e.Cartesian3.normalize(e.Cartesian3.cross(b, v, y), y)), (p = !1)
          }
          e.Cartesian3.equalsEpsilon(v, h, i.CesiumMath.EPSILON10) && (p = !0),
            (a.tangent || a.bitangent) &&
              ((d = r.geodeticSurfaceNormal(h, d)), a.tangent && (g = e.Cartesian3.normalize(e.Cartesian3.cross(d, y, g), g))),
            a.normal && ((o[u++] = y.x), (o[u++] = y.y), (o[u++] = y.z), (o[u++] = y.x), (o[u++] = y.y), (o[u++] = y.z)),
            a.tangent && ((s[c++] = g.x), (s[c++] = g.y), (s[c++] = g.z), (s[c++] = g.x), (s[c++] = g.y), (s[c++] = g.z)),
            a.bitangent && ((l[m++] = d.x), (l[m++] = d.y), (l[m++] = d.z), (l[m++] = d.x), (l[m++] = d.y), (l[m++] = d.z))
        }
      return P(a, { positions: t, normals: o, tangents: s, bitangents: l })
    })(ct, y, v)
    y.st && (wt.attributes.st = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: dt })),
      p &&
        (wt.attributes.extrudeDirection = new o.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: mt
        })),
      Q &&
        (wt.attributes.applyOffset = new o.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: pt
        }))
    var Ct,
      Rt,
      Et,
      Ft,
      Gt = c.IndexDatatype.createTypedArray(ut, 6 * ot)
    G = ct.length / 3
    var Pt = 0
    for (s = 0; s < G - 1; s += 2) {
      Ft = ((Ct = s) + 2) % G
      var Vt = e.Cartesian3.fromArray(ct, 3 * Ct, V),
        Lt = e.Cartesian3.fromArray(ct, 3 * Ft, L)
      e.Cartesian3.equalsEpsilon(Vt, Lt, i.CesiumMath.EPSILON10) ||
        ((Et = ((Rt = (Ct + 1) % G) + 2) % G), (Gt[Pt++] = Ct), (Gt[Pt++] = Rt), (Gt[Pt++] = Ft), (Gt[Pt++] = Ft), (Gt[Pt++] = Rt), (Gt[Pt++] = Et))
    }
    return (
      (wt.indices = Gt),
      (wt = u.GeometryPipeline.combineInstances([new l.GeometryInstance({ geometry: E }), new l.GeometryInstance({ geometry: wt })]))[0]
    )
  }
  var S = [new e.Cartesian3(), new e.Cartesian3(), new e.Cartesian3(), new e.Cartesian3()],
    I = new e.Cartographic(),
    k = new e.Cartographic()
  function H(t, a, r, n, i) {
    if (0 === r) return e.Rectangle.clone(t, i)
    var o = p.RectangleGeometryLibrary.computeOptions(t, a, r, 0, R, I),
      s = o.height,
      l = o.width,
      u = S
    return (
      p.RectangleGeometryLibrary.computePosition(o, n, !1, 0, 0, u[0]),
      p.RectangleGeometryLibrary.computePosition(o, n, !1, 0, l - 1, u[1]),
      p.RectangleGeometryLibrary.computePosition(o, n, !1, s - 1, 0, u[2]),
      p.RectangleGeometryLibrary.computePosition(o, n, !1, s - 1, l - 1, u[3]),
      e.Rectangle.fromCartesianArray(u, n, i)
    )
  }
  function z(a) {
    var r = (a = t.defaultValue(a, t.defaultValue.EMPTY_OBJECT)).rectangle,
      n = t.defaultValue(a.height, 0),
      o = t.defaultValue(a.extrudedHeight, n)
    ;(this._rectangle = e.Rectangle.clone(r)),
      (this._granularity = t.defaultValue(a.granularity, i.CesiumMath.RADIANS_PER_DEGREE)),
      (this._ellipsoid = e.Ellipsoid.clone(t.defaultValue(a.ellipsoid, e.Ellipsoid.WGS84))),
      (this._surfaceHeight = Math.max(n, o)),
      (this._rotation = t.defaultValue(a.rotation, 0)),
      (this._stRotation = t.defaultValue(a.stRotation, 0)),
      (this._vertexFormat = d.VertexFormat.clone(t.defaultValue(a.vertexFormat, d.VertexFormat.DEFAULT))),
      (this._extrudedHeight = Math.min(n, o)),
      (this._shadowVolume = t.defaultValue(a.shadowVolume, !1)),
      (this._workerName = 'createRectangleGeometry'),
      (this._offsetAttribute = a.offsetAttribute),
      (this._rotatedRectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0)
  }
  ;(z.packedLength = e.Rectangle.packedLength + e.Ellipsoid.packedLength + d.VertexFormat.packedLength + 7),
    (z.pack = function (a, r, n) {
      return (
        (n = t.defaultValue(n, 0)),
        e.Rectangle.pack(a._rectangle, r, n),
        (n += e.Rectangle.packedLength),
        e.Ellipsoid.pack(a._ellipsoid, r, n),
        (n += e.Ellipsoid.packedLength),
        d.VertexFormat.pack(a._vertexFormat, r, n),
        (n += d.VertexFormat.packedLength),
        (r[n++] = a._granularity),
        (r[n++] = a._surfaceHeight),
        (r[n++] = a._rotation),
        (r[n++] = a._stRotation),
        (r[n++] = a._extrudedHeight),
        (r[n++] = a._shadowVolume ? 1 : 0),
        (r[n] = t.defaultValue(a._offsetAttribute, -1)),
        r
      )
    })
  var B = new e.Rectangle(),
    U = e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
    Y = {
      rectangle: B,
      ellipsoid: U,
      vertexFormat: O,
      granularity: void 0,
      height: void 0,
      rotation: void 0,
      stRotation: void 0,
      extrudedHeight: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0
    }
  ;(z.unpack = function (a, r, n) {
    r = t.defaultValue(r, 0)
    var i = e.Rectangle.unpack(a, r, B)
    r += e.Rectangle.packedLength
    var o = e.Ellipsoid.unpack(a, r, U)
    r += e.Ellipsoid.packedLength
    var s = d.VertexFormat.unpack(a, r, O)
    r += d.VertexFormat.packedLength
    var l = a[r++],
      u = a[r++],
      c = a[r++],
      m = a[r++],
      p = a[r++],
      g = 1 === a[r++],
      y = a[r]
    return t.defined(n)
      ? ((n._rectangle = e.Rectangle.clone(i, n._rectangle)),
        (n._ellipsoid = e.Ellipsoid.clone(o, n._ellipsoid)),
        (n._vertexFormat = d.VertexFormat.clone(s, n._vertexFormat)),
        (n._granularity = l),
        (n._surfaceHeight = u),
        (n._rotation = c),
        (n._stRotation = m),
        (n._extrudedHeight = p),
        (n._shadowVolume = g),
        (n._offsetAttribute = -1 === y ? void 0 : y),
        n)
      : ((Y.granularity = l),
        (Y.height = u),
        (Y.rotation = c),
        (Y.stRotation = m),
        (Y.extrudedHeight = p),
        (Y.shadowVolume = g),
        (Y.offsetAttribute = -1 === y ? void 0 : y),
        new z(Y))
  }),
    (z.computeRectangle = function (a, r) {
      var n = (a = t.defaultValue(a, t.defaultValue.EMPTY_OBJECT)).rectangle,
        o = t.defaultValue(a.granularity, i.CesiumMath.RADIANS_PER_DEGREE),
        s = t.defaultValue(a.ellipsoid, e.Ellipsoid.WGS84)
      return H(n, o, t.defaultValue(a.rotation, 0), s, r)
    })
  var q = new e.Matrix3(),
    X = new r.Quaternion(),
    Q = new e.Cartographic()
  ;(z.createGeometry = function (n) {
    if (
      !i.CesiumMath.equalsEpsilon(n._rectangle.north, n._rectangle.south, i.CesiumMath.EPSILON10) &&
      !i.CesiumMath.equalsEpsilon(n._rectangle.east, n._rectangle.west, i.CesiumMath.EPSILON10)
    ) {
      var s = n._rectangle,
        l = n._ellipsoid,
        u = n._rotation,
        c = n._stRotation,
        d = n._vertexFormat,
        g = p.RectangleGeometryLibrary.computeOptions(s, n._granularity, u, c, R, I, k),
        y = q
      if (0 !== c || 0 !== u) {
        var f = e.Rectangle.center(s, Q),
          h = l.geodeticSurfaceNormalCartographic(f, V)
        r.Quaternion.fromAxisAngle(h, -c, X), e.Matrix3.fromQuaternion(X, y)
      } else e.Matrix3.clone(e.Matrix3.IDENTITY, y)
      var v,
        b,
        _ = n._surfaceHeight,
        A = n._extrudedHeight,
        x = !i.CesiumMath.equalsEpsilon(_, A, 0, i.CesiumMath.EPSILON2)
      if (((g.lonScalar = 1 / n._rectangle.width), (g.latScalar = 1 / n._rectangle.height), (g.tangentRotationMatrix = y), (s = n._rectangle), x)) {
        v = N(n, g)
        var w = r.BoundingSphere.fromRectangle3D(s, l, _, G),
          C = r.BoundingSphere.fromRectangle3D(s, l, A, F)
        b = r.BoundingSphere.union(w, C)
      } else {
        if (
          (((v = D(n, g)).attributes.position.values = m.PolygonPipeline.scaleToGeodeticHeight(v.attributes.position.values, _, l, !1)),
          t.defined(n._offsetAttribute))
        ) {
          var E = v.attributes.position.values.length,
            P = new Uint8Array(E / 3),
            L = n._offsetAttribute === a.GeometryOffsetAttribute.NONE ? 0 : 1
          a.arrayFill(P, L),
            (v.attributes.applyOffset = new o.GeometryAttribute({
              componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: P
            }))
        }
        b = r.BoundingSphere.fromRectangle3D(s, l, _)
      }
      return (
        d.position || delete v.attributes.position,
        new o.Geometry({
          attributes: v.attributes,
          indices: v.indices,
          primitiveType: v.primitiveType,
          boundingSphere: b,
          offsetAttribute: n._offsetAttribute
        })
      )
    }
  }),
    (z.createShadowVolume = function (t, e, a) {
      var r = t._granularity,
        n = t._ellipsoid,
        i = e(r, n),
        o = a(r, n)
      return new z({
        rectangle: t._rectangle,
        rotation: t._rotation,
        ellipsoid: n,
        stRotation: t._stRotation,
        granularity: r,
        extrudedHeight: o,
        height: i,
        vertexFormat: d.VertexFormat.POSITION_ONLY,
        shadowVolume: !0
      })
    })
  var W = new e.Rectangle(),
    J = [new e.Cartesian2(), new e.Cartesian2(), new e.Cartesian2()],
    j = new e.Matrix2(),
    Z = new e.Cartographic()
  return (
    Object.defineProperties(z.prototype, {
      rectangle: {
        get: function () {
          return (
            t.defined(this._rotatedRectangle) || (this._rotatedRectangle = H(this._rectangle, this._granularity, this._rotation, this._ellipsoid)),
            this._rotatedRectangle
          )
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            t.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (t) {
                if (0 === t._stRotation) return [0, 0, 0, 1, 1, 0]
                var a = e.Rectangle.clone(t._rectangle, W),
                  r = t._granularity,
                  n = t._ellipsoid,
                  i = H(a, r, t._rotation - t._stRotation, n, W),
                  o = J
                ;(o[0].x = i.west), (o[0].y = i.south), (o[1].x = i.west), (o[1].y = i.north), (o[2].x = i.east), (o[2].y = i.south)
                for (var s = t.rectangle, l = e.Matrix2.fromRotation(t._stRotation, j), u = e.Rectangle.center(s, Z), c = 0; c < 3; ++c) {
                  var m = o[c]
                  ;(m.x -= u.longitude),
                    (m.y -= u.latitude),
                    e.Matrix2.multiplyByVector(l, m, m),
                    (m.x += u.longitude),
                    (m.y += u.latitude),
                    (m.x = (m.x - s.west) / s.width),
                    (m.y = (m.y - s.south) / s.height)
                }
                var p = o[0],
                  d = o[1],
                  g = o[2],
                  y = new Array(6)
                return e.Cartesian2.pack(p, y), e.Cartesian2.pack(d, y, 2), e.Cartesian2.pack(g, y, 4), y
              })(this)),
            this._textureCoordinateRotationPoints
          )
        }
      }
    }),
    function (a, r) {
      return (
        t.defined(r) && (a = z.unpack(a, r)),
        (a._ellipsoid = e.Ellipsoid.clone(a._ellipsoid)),
        (a._rectangle = e.Rectangle.clone(a._rectangle)),
        z.createGeometry(a)
      )
    }
  )
})
