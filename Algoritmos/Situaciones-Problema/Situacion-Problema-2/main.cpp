/*
Situación Integradora 2
Patricio Bosque Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "Graph.cpp"

void printMSTToFile(pair<vector<MSTNode>, int> mst, string fileName) {
    ofstream file;
    file.open(fileName);
    if (!file.is_open()){
        file << "Error opening file" << endl;
        return;
    }

    vector<MSTNode> mstv = mst.first;
    int totalDistance = mst.second;

    file << "TOTAL DISTANCE: " << totalDistance << endl;
    file << "PATH: " << endl;
    for (int i = 0; i < mstv.size(); i++) {
        file << mstv[i].node1 << " -> " << mstv[i].node2 << " Distance: " << mstv[i].weight <<endl;
    }

    file.close();
    cout<<"Results written successfully in file: "<<fileName<<endl;
}

void printMST(pair<vector<MSTNode>, int> mst) {
    vector<MSTNode> mstv = mst.first;
    int totalDistance = mst.second;

    cout << "TOTAL DISTANCE: " << totalDistance << endl;
    cout << "PATH: " << endl;
    for (int i = 0; i < mstv.size(); i++) {
        cout << mstv[i].node1 << " -> " << mstv[i].node2 << " Distance: " << mstv[i].weight <<endl;
    }
}

int main() {

    cout << "\nTEST 1:" << endl;
    Graph g("Tests/graph.txt");
    cout << "Graph:" << endl;
    g.printGraph();
    pair<vector<MSTNode>, int> mst = g.primMST();
    printMSTToFile(mst,"Tests/graph-Result.txt");

    cout << "\nTEST 2:" << endl;
    Graph g2("Tests/graph2.txt");
    cout << "Graph:" << endl;
    g2.printGraph();
    pair<vector<MSTNode>, int> mst2 = g2.primMST();
    printMSTToFile(mst2,"Tests/graph2-Result.txt");

}