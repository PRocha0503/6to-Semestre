// Create a graph node class

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