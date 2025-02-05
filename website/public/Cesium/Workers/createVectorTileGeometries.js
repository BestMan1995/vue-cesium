define([
  './Transforms-d13cc04e',
  './BoxGeometry-bdb0d59d',
  './Matrix2-9aa31791',
  './Color-1ab5c5c7',
  './CylinderGeometry-34e307a4',
  './when-4bbc8319',
  './EllipsoidGeometry-9a4ae869',
  './IndexDatatype-b7d979a6',
  './createTaskProcessorWorker',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './combine-83860057',
  './GeometryOffsetAttribute-1772960d',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './VertexFormat-71718faa',
  './CylinderGeometryLibrary-dc0b434b'
], function (e, t, n, r, a, i, o, d, s, c, f, l, u, h, b, p, y, x) {
  'use strict'
  function g(e) {
    ;(this.offset = e.offset), (this.count = e.count), (this.color = e.color), (this.batchIds = e.batchIds)
  }
  var v = new n.Cartesian3(),
    m = n.Matrix4.packedLength + n.Cartesian3.packedLength,
    C = n.Matrix4.packedLength + 2,
    I = n.Matrix4.packedLength + n.Cartesian3.packedLength,
    k = n.Cartesian3.packedLength + 1,
    M = { modelMatrix: new n.Matrix4(), boundingVolume: new e.BoundingSphere() }
  function B(e, t) {
    var r = t * m,
      a = n.Cartesian3.unpack(e, r, v)
    r += n.Cartesian3.packedLength
    var i = n.Matrix4.unpack(e, r, M.modelMatrix)
    n.Matrix4.multiplyByScale(i, a, i)
    var o = M.boundingVolume
    return n.Cartesian3.clone(n.Cartesian3.ZERO, o.center), (o.radius = Math.sqrt(3)), M
  }
  function w(e, t) {
    var r = t * C,
      a = e[r++],
      i = e[r++],
      o = n.Cartesian3.fromElements(a, a, i, v),
      d = n.Matrix4.unpack(e, r, M.modelMatrix)
    n.Matrix4.multiplyByScale(d, o, d)
    var s = M.boundingVolume
    return n.Cartesian3.clone(n.Cartesian3.ZERO, s.center), (s.radius = Math.sqrt(2)), M
  }
  function A(e, t) {
    var r = t * I,
      a = n.Cartesian3.unpack(e, r, v)
    r += n.Cartesian3.packedLength
    var i = n.Matrix4.unpack(e, r, M.modelMatrix)
    n.Matrix4.multiplyByScale(i, a, i)
    var o = M.boundingVolume
    return n.Cartesian3.clone(n.Cartesian3.ZERO, o.center), (o.radius = 1), M
  }
  function O(e, t) {
    var r = t * k,
      a = e[r++],
      i = n.Cartesian3.unpack(e, r, v),
      o = n.Matrix4.fromTranslation(i, M.modelMatrix)
    n.Matrix4.multiplyByUniformScale(o, a, o)
    var d = M.boundingVolume
    return n.Cartesian3.clone(n.Cartesian3.ZERO, d.center), (d.radius = 1), M
  }
  var L = new n.Cartesian3()
  function E(t, a, o, d, s) {
    if (i.defined(a)) {
      for (
        var c = o.length,
          f = d.attributes.position.values,
          l = d.indices,
          u = t.positions,
          h = t.vertexBatchIds,
          b = t.indices,
          p = t.batchIds,
          y = t.batchTableColors,
          x = t.batchedIndices,
          v = t.indexOffsets,
          m = t.indexCounts,
          C = t.boundingVolumes,
          I = t.modelMatrix,
          k = t.center,
          M = t.positionOffset,
          B = t.batchIdIndex,
          w = t.indexOffset,
          A = t.batchedIndicesOffset,
          O = 0;
        O < c;
        ++O
      ) {
        var E = s(a, O),
          U = E.modelMatrix
        n.Matrix4.multiply(I, U, U)
        for (var G = o[O], S = f.length, T = 0; T < S; T += 3) {
          var V = n.Cartesian3.unpack(f, T, L)
          n.Matrix4.multiplyByPoint(U, V, V), n.Cartesian3.subtract(V, k, V), n.Cartesian3.pack(V, u, 3 * M + T), (h[B++] = G)
        }
        for (var F = l.length, R = 0; R < F; ++R) b[w + R] = l[R] + M
        var Z = O + A
        ;(x[Z] = new g({ offset: w, count: F, color: r.Color.fromRgba(y[G]), batchIds: [G] })),
          (p[Z] = G),
          (v[Z] = w),
          (m[Z] = F),
          (C[Z] = e.BoundingSphere.transform(E.boundingVolume, U)),
          (M += S / 3),
          (w += F)
      }
      ;(t.positionOffset = M), (t.batchIdIndex = B), (t.indexOffset = w), (t.batchedIndicesOffset += c)
    }
  }
  var U = new n.Cartesian3(),
    G = new n.Matrix4()
  function S(t, n, a) {
    var i = a.length,
      o =
        2 +
        i * e.BoundingSphere.packedLength +
        1 +
        (function (e) {
          for (var t = e.length, n = 0, a = 0; a < t; ++a) n += r.Color.packedLength + 3 + e[a].batchIds.length
          return n
        })(n),
      d = new Float64Array(o),
      s = 0
    ;(d[s++] = t), (d[s++] = i)
    for (var c = 0; c < i; ++c) e.BoundingSphere.pack(a[c], d, s), (s += e.BoundingSphere.packedLength)
    var f = n.length
    d[s++] = f
    for (var l = 0; l < f; ++l) {
      var u = n[l]
      r.Color.pack(u.color, d, s), (s += r.Color.packedLength), (d[s++] = u.offset), (d[s++] = u.count)
      var h = u.batchIds,
        b = h.length
      d[s++] = b
      for (var p = 0; p < b; ++p) d[s++] = h[p]
    }
    return d
  }
  return s(function (e, r) {
    var s = i.defined(e.boxes) ? new Float32Array(e.boxes) : void 0,
      c = i.defined(e.boxBatchIds) ? new Uint16Array(e.boxBatchIds) : void 0,
      f = i.defined(e.cylinders) ? new Float32Array(e.cylinders) : void 0,
      l = i.defined(e.cylinderBatchIds) ? new Uint16Array(e.cylinderBatchIds) : void 0,
      u = i.defined(e.ellipsoids) ? new Float32Array(e.ellipsoids) : void 0,
      h = i.defined(e.ellipsoidBatchIds) ? new Uint16Array(e.ellipsoidBatchIds) : void 0,
      b = i.defined(e.spheres) ? new Float32Array(e.spheres) : void 0,
      p = i.defined(e.sphereBatchIds) ? new Uint16Array(e.sphereBatchIds) : void 0,
      y = i.defined(s) ? c.length : 0,
      x = i.defined(f) ? l.length : 0,
      g = i.defined(u) ? h.length : 0,
      v = i.defined(b) ? p.length : 0,
      m = t.BoxGeometry.getUnitBox(),
      C = a.CylinderGeometry.getUnitCylinder(),
      I = o.EllipsoidGeometry.getUnitEllipsoid(),
      k = m.attributes.position.values,
      M = C.attributes.position.values,
      L = I.attributes.position.values,
      T = k.length * y
    ;(T += M.length * x), (T += L.length * (g + v))
    var V = m.indices,
      F = C.indices,
      R = I.indices,
      Z = V.length * y
    ;(Z += F.length * x), (Z += R.length * (g + v))
    var D = new Float32Array(T),
      P = new Uint16Array(T / 3),
      q = d.IndexDatatype.createTypedArray(T / 3, Z),
      W = y + x + g + v,
      _ = new Uint16Array(W),
      N = new Array(W),
      Y = new Uint32Array(W),
      j = new Uint32Array(W),
      z = new Array(W)
    !(function (e) {
      var t = new Float64Array(e),
        r = 0
      n.Cartesian3.unpack(t, r, U), (r += n.Cartesian3.packedLength), n.Matrix4.unpack(t, r, G)
    })(e.packedBuffer)
    var H = {
      batchTableColors: new Uint32Array(e.batchTableColors),
      positions: D,
      vertexBatchIds: P,
      indices: q,
      batchIds: _,
      batchedIndices: N,
      indexOffsets: Y,
      indexCounts: j,
      boundingVolumes: z,
      positionOffset: 0,
      batchIdIndex: 0,
      indexOffset: 0,
      batchedIndicesOffset: 0,
      modelMatrix: G,
      center: U
    }
    E(H, s, c, m, B), E(H, f, l, C, w), E(H, u, h, I, A), E(H, b, p, I, O)
    var J = S(q.BYTES_PER_ELEMENT, N, z)
    return (
      r.push(D.buffer, P.buffer, q.buffer),
      r.push(_.buffer, Y.buffer, j.buffer),
      r.push(J.buffer),
      {
        positions: D.buffer,
        vertexBatchIds: P.buffer,
        indices: q.buffer,
        indexOffsets: Y.buffer,
        indexCounts: j.buffer,
        batchIds: _.buffer,
        packedBuffer: J.buffer
      }
    )
  })
})
