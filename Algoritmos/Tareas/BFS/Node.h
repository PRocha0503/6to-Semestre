/*
BFS
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include <vector>

using namespace std;

class Node{
    private:
        int nodeId;
        vector<Node*> neighbors;
        bool isNeighbor(Node* node);
    public:
        Node();
        Node(int id);
        int getId();
        vector<Node*> getNeighbors();
        void addNeighbor(Node* neighbor);
};