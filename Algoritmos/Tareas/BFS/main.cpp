#include "Graph.cpp"

int main(){

    // Initialize the graph from file
    Graph graph = Graph("graphExample.csv");
    // Print the graph
    graph.printGraph();

    // Select the node from which to start BFS
    Node* startingNode = graph.getNodeById(1);
    // Run BFS
    vector <Node*> orderOfVisited = graph.BFS(startingNode);

    // Print the order of visited nodes
    cout << "Order of visited nodes: ";
    for (int i = 0; i < orderOfVisited.size(); i++) {
        cout << orderOfVisited[i]->getId() << " ";
    }

    return 0;
}