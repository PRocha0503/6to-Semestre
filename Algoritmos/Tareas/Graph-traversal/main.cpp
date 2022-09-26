/*
BFS
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

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
    cout << "\nBFS order of visited nodes: ";
    for (int i = 0; i < orderOfVisited.size(); i++) {
        cout << orderOfVisited[i]->getId() << " ";
    }

    // Select the node from which to start DFS
    Node* startingNodeDFS = graph.getNodeById(1);
    // Run DFS
    vector <Node*> orderOfVisitedDFS = graph.DFS(startingNodeDFS);

    // Print the order of visited nodes
    cout << "\nDFS order of visited nodes: ";
    for (int i = 0; i < orderOfVisitedDFS.size(); i++) {
        cout << orderOfVisitedDFS[i]->getId() << " ";
    }

    return 0;
}