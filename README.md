# Tools to import and export Peco Peco cuts.

## About

Requirements : bash, jq
Tested Ubuntu 20.04.1 LTS (Focal Fossa)


## N.A.Q.

### how to clean your cuts ?

- connect your headset

- pull the cuts from header

> ./cutty pull

- edit you keep file (see keep.txt.sample for an example)

> vim stage/keep.txt

- check the cuts you want to keep are flagged with a 'k'

> ./cutty list stage

- clean the stage !

> ./cutty clean

- and push to headset

> ./cutty push

### share a cut

- first extract a cut file (you can use `./cutty export`)

- publish it on the web

- then tell friend to run `curl -s <THIS_REPO_URL/install.bash | bash -s -- <CUT_URL>`

this has not been test yet

### what's the meaning of the flags in cutty list output ?

s -> on stage
k -> k
s -> in cuts
