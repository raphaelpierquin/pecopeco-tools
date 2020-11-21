const {color} = require('@jscad/csg/api').color
const {cube, sphere, cylinder} = require('@jscad/csg/api').primitives3d
const {square, circle} = require('@jscad/csg/api').primitives2d
const {linear_extrude} = require('@jscad/csg/api').extrusions
const {union, difference} = require('@jscad/csg/api').booleanOps
const {translate} = require('@jscad/csg/api').transformations
const {CSG} = require('@jscad/csg/api').csg

function loadSlicerData(filename) {
 const fs = require('fs')
 console.log('reading ' + filename)
 let rawdata = fs.readFileSync(filename);
 let slicerdata = JSON.parse(rawdata);
 return slicerdata
}

function main(parameters) {
  let data = loadSlicerData(parameters.input);
  let axes = union(
        cube({size: [500,1,1],  center: true}).translate([300,0,0]),
        cube({size: [1,500,1],  center: true}).translate([0,300,0]),
        cube({size: [1,1,500],  center: true}).translate([0,0,300])
  );
  let hand = union(//axes,
        cube({size: [1,4,5],  center: true}).translate([0,.5,0]),
        cube({size: [1,1,4],  center: true}).translate([0,-1,4]),
        cube({size: [1,1,5],  center: true}).translate([0, 0,5]),
        cube({size: [1,1,4],  center: true}).translate([0, 1,4]),
        cube({size: [1,1,3],  center: true}).translate([0, 2,3]).rotateX(-10),
        cube({size: [1,1,4],  center: true}).translate([0, -1,2]).rotateX(30).rotateY(20)
  ).translate([-2,0,-14]).scale(0.03).scale([1,-1,1])
  let volume = union(hand)
  data.volumes.forEach(function(d) {
    let v = null;
    if (d.type == "sphere") {
      v = sphere({center:true, r:0.5});
    } else if (d.type == "box") {
      v = cube({center:true});
    }

    const Quaternion = require("quaternion");
    let q = new Quaternion(d.rotation.x, d.rotation.y,d.rotation.z,d.rotation.w);
    v = v.transform(new CSG.Matrix4x4(q.toMatrix4()));

    v = v.scale([d.scale.x, d.scale.y, d.scale.z]);

    v = v.translate([d.position.x * -1, d.position.y, d.position.z]);

    volume = union(volume, v);
  });
  console.log("done")
  return volume.rotateZ(180).rotateY(-10).rotateX(-60);
}

const getParameterDefinitions = () => {
  return [{"name": "input", type:"text"}]
}

module.exports = {main, getParameterDefinitions}
