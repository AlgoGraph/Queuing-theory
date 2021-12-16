# tomorrow TODOs (  3 / 3 hours max)

## UI
- handle the populating the initial results for every model
- add the validations

### nice addOns


## Visualisation
1. find the graph you want, read about it (done) >> add option (stepped: true)

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
- DD1K: take t in the result page
- First case: n(t) should alternate -> we now just return "k-1" as a hard coded value
    - process N ( t ) is known as the multiple Poisson
- the "//" in eval
    - possible solution:
        - regex to detect it and replace all of them by one
- MMcK: Lq doesn't depend on n:
    - so fix the method + the result page for it 
- for DD1k when lambda and mu are entered > check if lambda > mu and disable M ^_^
- eval doesn't handle zeros on the left > ex. "03" 
## Tasks
- AE:
    - the validation >> done
- AM:
    - Redo stuff you have deleted by mistake
    - reorganize testcases in describe
    - the design
    - add the problem of WQ,mu,
