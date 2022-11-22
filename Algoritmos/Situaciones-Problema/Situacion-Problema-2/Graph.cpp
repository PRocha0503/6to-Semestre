/*
Situación Integradora 2
Patricio Bosque Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "Graph.h"



Graph::Graph(string filename) {
    /*
        Read the file and create the graph
        input: filename
        output: none
    */
   //Initialize values
   sum = 0;
   mst = vector<vector<int>>();
   heap = vector<HeapInfo>();


    ifstream file;
    file.open(filename);

    //Check if the file is open
    if(!file.is_open()) {
        cout << "Error opening file" << endl;
        return;
    }
    int numberOfNodes;
    file >> numberOfNodes;
    vector<int> tempNodes = vector<int>(0);
    for (int i = 0; i < numberOfNodes; i++) {
        int node;
        file >> node;
        for (int j = 0; j < numberOfNodes-1; j++) {
            int weight;
            file >>weight;
            if(i==0){
                nodes[weight] = vector<Edge>();
                tempNodes.push_back(weight);
            }
            else {
                if(weight != 0){
                    Edge* e = new Edge(tempNodes[j],weight);
                    nodes[node].push_back(*e);
                }
                //Add the first node as start of heap
                if(i ==1){
                    // heap.push_back(HeapInfo(weight,node,-1));
                }
                visited[node] = false;
            }
            }
        }
    file.close();
}


void Graph::printGraph() {
    /*
        Print the graph
        input: none
        output: none
    */
    for (auto it = nodes.begin(); it != nodes.end(); it++) {
        cout << it->first << ": ";
        for (int i = 0; i < it->second.size(); i++) {
            cout << "{ D:"<<it->second[i].dest << ", W:" << it->second[i].weight << "}";
        }
        cout << endl;
    }
}
