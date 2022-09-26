/*
BFS
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

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