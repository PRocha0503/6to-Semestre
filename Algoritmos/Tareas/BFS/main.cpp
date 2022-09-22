#include "Graph.cpp"

int main(){
    Graph graph = Graph("graphExample.csv");
    // graph.readGraphFromFile("graphExample.csv");
    graph.printGraph();
}