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
  hand2 = union(
    cube().scale([1,4,9]),
    cube().scale([1,1,5]).translate([0,4,0])
  ).scale(0.15).translate(-0.5,-2,5,-13)
  let volume = union(cube().scale([-4,1,1]), cube().scale([1,7,1]), cube().scale([1,1,9])).scale(0.03).translate([0,0,-0.5])
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
  return volume;
}

const getParameterDefinitions = () => {
  return [{"name": "input", type:"text"}]
}

module.exports = {main, getParameterDefinitions}
