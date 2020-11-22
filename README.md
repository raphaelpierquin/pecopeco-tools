# cutty : a tools to manage your cuts.

## About

Requirements : bash, jq
Tested Ubuntu 20.04.1 LTS (Focal Fossa)

[shared cuts here](shared/)

## HOWTO

### How to clean my cuts ?

- connect your headset

- pull the cuts from headset

> $ ./cutty pull

- edit you keep file (see keep.txt.sample for an example)

> $ vim stage/cuts/keep.txt

- check the cuts you want to keep are flagged with a 'k'

> $ ./cutty list stage

- remove any cut on stage that is not listed in keep.txt

> $../cutty clean

- and push to headset

> $ ./cutty push

### How to share a cut

- pull the cuts from headset

> $ ./cutty pull

- find the id (which is also the filename) of the cut you want to share

NB: you can use `./cutty list` to find it.

Here we want to share the cut "abcdef012-34567890a".
We can use the full id to identify this cuts, or only the first letters (we will use "abdc")

- add metadata to this cut

> ./cutty set name "A close shave" abcd
> ./cutty set author "Gromit" abcd
> ./cutty set timeToSolve "15" abcd

- set a meaningfull id too.

> ./cutty set id "abcd-model-name-20-pieces-a-close-shave" abcd

NB: changing the id will update both the id property in the file, and the file name.

> share the file

The file is in `stage/cuts`.
(In our example, it would be `/stage/cuts/abcd-model-name-20-pieces-a-close-shave.json`.)

Share it with you friends.

### How to publish a cut on this repo ?

- add metadata to the cut you want to publish (see previous answer)

- copy the cut file to the shared directory

> $ cp /stage/cuts/abcd-model-name-20-pieces-a-close-shave.json shared/cuts

- update the index

> $ ./create_index

- create a pull request with git

### what's the meaning of the flags in cutty list output ?

exemple : (sks)

first s -> on stage

k -> keep it /
d -> drop it

second s -> shared


example : 

- `(sks)` -> the file is shared and staged, it should be kept at clean)
- `(sd.)` -> the file in on stage but not staged, it should be dropped at next clean)
- `(.ds)` -> the file is shared but not on stage but, it should be drppped at next clean)

# viewslicer

I use this to visualize a slicer template, while I edit it.

## requirement

- node
- fstl
- inotifywait


```
npm install @jscad/cli
npm install quaternion
```

## usage

> > ./viewslicer stage/slicer-templates/myslicer.json


