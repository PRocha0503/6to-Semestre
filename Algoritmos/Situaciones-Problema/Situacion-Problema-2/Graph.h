/*
Situación Integradora 2
Patricio Bosque Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include <iostream>
#include <vector>
#include <fstream>
#include <map>
#include <utility>

#include "HeapInfo.cpp"
#include "Edge.cpp"
#include "MSTNode.cpp"

using namespace std;

class Graph {
    private:
        map<int,vector<Edge> >nodes;
        int numberOfNodes;
        vector<HeapInfo> heap;
        int sum ;
        map<int,bool> visited;
        vector<MSTNode> mst ;

    public:
        Graph(string filename);
        pair<vector<MSTNode>, int> primMST();
        void printGraph();
        void printHeap();
};

