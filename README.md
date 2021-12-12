# tomorrow TODOs (  3 / 3 hours max)
## Logic
- MMcK: go through the slides and write all the tests for it


## UI
- handle the populating the initial results for every model
- add the validations

### nice addOns
- for DD1k when lambda and mu are entered > check if lambda > mu and disable M ^_^



## Visualisation
1. find the graph you want, read about it (done)
  - https://www.chartjs.org/docs/latest/charts/line.html
2. see how you are going to visualise everything
  - what will be visualised:
    - DD1K
    - MM1
    - MMc
    - MMcK
---------
## refactoring 



## bugs report
### DD1k
- the number in js don't give the right result and the floor make it worse
    - 6.001 > 5.99999 -> Math.floor will give 5 instead of 6
    - the result are not right for a lot of cases because of this
- First case: n(t) should alternate -> we now just return "k-1" as a hard coded value
