/* 
Input: A directed graph where a node represents a town and an edge represents a route
between two towns. The weighting of the edge represents the distance between the two towns.
A given route will never appear more than once, and for a given route, the starting and ending
town will not be the same town.

Output: For test input 1 through 5, if no such route exists, output 'NO SUCH ROUTE'. Otherwise,
follow the route as given; do not make any extra stops! For example, the first problem means to
start at city A, then travel directly to city B (a distance of 5), then directly to city C (a distance of 4).
1. The distance of the route A-B-C.
2. The distance of the route A-D.
3. The distance of the route A-D-C.
4. The distance of the route A-E-B-C-D.
5. The distance of the route A-E-D.
6. The number of trips starting at C and ending at C with a maximum of 3 stops. In the sample
data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops). bfs. Before distance 4, if reaches end node, return the route 
7. The number of trips starting at A and ending at C with exactly 4 stops. In the sample data
below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
8. The length of the shortest route (in terms of distance to travel) from A to C.
9. The length of the shortest route (in terms of distance to travel) from B to B.
10. The number of different routes from C to C with a distance of less than 30. In the sample data,
the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.
*/

/* 

Test Input: For the test input, the towns are named using the first few letters of the alphabet from
A to E. A route between two towns (A to B) with a distance of 5 is represented as AB5.
Graph:
AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7

Expected Output:
Output #1: 9
Output #2: 5
Output #3: 13
Output #4: 22
Output #5: NO SUCH ROUTE
Output #6: 2
Output #7: 3
Output #8: 9
Output #9: 9
Output #10: 7
*/

let { Queue } = require('./util')
let graphString = `AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7`


// Test input 1 -> 5 
const buildGraph = (graphStr) => {
  let vertices = {}
  let edgesArr = graphStr.split(', ')
  let graph = {}
  let edges = {}

  edgesArr.map(el => {
    let parent = el[0]
    let child = el[1]
    let distance = el[2]

    // create edges object 
    if (!edges[parent]) {
      edges[parent] = [] // {}
      edges[parent].push({ [child]: distance })
    } else {
      edges[parent].push({ [child]: distance })
    }

    // create the vertices array in the graph 
    if (!vertices[parent]) vertices[parent] = true
    if (!vertices[child]) vertices[child] = true
  })

  graph.vertices = Object.keys(vertices)
  graph.edges = edges
  return graph
}

// Use bfs to calculate the exact distance. 
// Example: 'A-B-C'
// accept in a route string like 'A-B-C'
const routeDistance = (route, graph) => {
  let routeArr = route.split('-')
  let edges = graph.edges
  let distance = helper(routeArr, edges, 0)
  return distance
}

const helper = (route, edges, distance = 0) => {
  if (route.length === 1) {
    // console.log('route', route, 'distance', distance)
    return distance
  }
  let start = route.shift()
  let end = route[0]
  // if (start in edges && end in edges[start])
  //    return helper(route, edges, distance + edges[start][end])
  // return 'NO SUCH ROUTE'
  let neighbors = edges[start]
  let adjVertices = neighbors.map(el => Object.keys(el)[0])

  if (end && !adjVertices.includes(end)) {
    return 'NO SUCH ROUTE'
  }
  for (let el of neighbors) {
    if (el[end]) {
      distance += parseInt(el[end])
    }
  }
  return helper(route, edges, distance)
}

// Build graph input 
let graphTown = buildGraph(graphString)

// Test input 1 - 5
console.log('The distance of the route A-B-C: ', routeDistance('A-B-C', graphTown))
console.log('The distance of the route A-D', routeDistance('A-D', graphTown))
console.log('The distance of the route A-D-C', routeDistance('A-D-C', graphTown))
console.log('The distance of the route A-E-B-C-D', routeDistance('A-E-B-C-D', graphTown))
console.log('The distance of the route A-E-D', routeDistance('A-E-D', graphTown))