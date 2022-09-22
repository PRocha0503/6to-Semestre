#include "Node.cpp"
#include <iostream>
#include <fstream>
#include <sstream>

class Graph{
    private:
        vector<Node*> nodes;
    public:
        Graph();
        Graph(string fileName);
        void readGraphFromFile(string fileName);
        vector<Node*> getNodes();
        void addNode(Node* node);
        Node* checkIfExists(int nodeId);
        void printGraph();
};