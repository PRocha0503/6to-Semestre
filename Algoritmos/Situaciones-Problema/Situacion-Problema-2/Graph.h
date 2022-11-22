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

#include "HeapInfo.h"
#include "Edge.cpp"
using namespace std;


class Graph {
    private:
     map<int,vector<Edge> >nodes;
     vector<HeapInfo> heap ;
     int sum ;
     map<int,bool> visited;
     vector<vector<int>> mst ;

    public:
    Graph(string filename);
    void printGraph();
};

