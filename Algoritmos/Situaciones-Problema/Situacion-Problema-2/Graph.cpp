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
   mst = vector<MSTNode>(); 
   heap = vector<HeapInfo>();

    ifstream file;
    file.open(filename);

    //Check if the file is open
    if(!file.is_open()) {
        cout << "Error opening file" << endl;
        return;
    }
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
                visited[node] = false;
            }
            }
        }
    file.close();
}

// Comparator is used to change maxHeap to minHeap
bool compare(HeapInfo a, HeapInfo b)
{
	if(a<b)
		return 0; //change to 1 if max heap required
	else 
		return 1; //change to 0 if max heap required
}

pair<vector<MSTNode>, int> Graph::primMST(){
    // add the first node to the heap
    heap.push_back(HeapInfo(0,nodes.begin()->first,-1));
    make_heap(heap.begin(),heap.end(),compare);
    // while the heap is not empty
    while(!heap.empty()){
        // get the min
        HeapInfo min = heap.front();
        // pop the min
        pop_heap(heap.begin(),heap.end(),compare);
        heap.pop_back();
        // if the node is not visited
        if(!visited[min.node]){
            // add the node to the mst
            if (min.parent != -1) {
                mst.push_back(MSTNode(min.parent,min.node,min.weight));
            }
            // add the weight to the sum
            sum += min.weight;
            // mark the node as visited
            visited[min.node] = true;
            // add the edges to the heap
            for (int i = 0; i < nodes[min.node].size(); i++) {
                if(!visited[nodes[min.node][i].dest]){
                    heap.push_back(HeapInfo(nodes[min.node][i].weight,nodes[min.node][i].dest,min.node));
                    make_heap(heap.begin(),heap.end(),compare);
                }
            }
        }
    }
    return pair<vector<MSTNode>, int>(mst,sum);
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

void Graph::printHeap() {
    /*
        Print the heap
        input: none
        output: none
    */
    for (int i = 0; i < heap.size(); i++) {
        cout << heap[i].node << " ";
    }
    cout << endl;
}
