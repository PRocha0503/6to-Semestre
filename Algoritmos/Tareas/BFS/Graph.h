#include "Queue.cpp"
#include <iostream>
#include <fstream>
#include <sstream>

class Graph{
    private:

        vector<Node*> nodes;

    public:

        Graph();
        Graph(string fileName);
        ~Graph();

        void readGraphFromFile(string fileName);
        vector<Node*> getNodes();
        void addNode(Node* node);
        Node* checkIfExists(int nodeId);
        Node* getNodeById(int nodeId);
        void printGraph();

        vector <Node*> BFS(Node *startingNode);
};