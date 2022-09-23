#include "Node.h"

Node::Node(){
    nodeId = 0;
    neighbors = vector<Node*>();
}

Node::Node(int id){
    nodeId = id;
    neighbors = vector<Node*>();
}

int Node::getId(){
    return nodeId;
}

vector<Node*> Node::getNeighbors(){
    return neighbors;
}

bool Node::isNeighbor(Node* node){
    for(int i = 0; i < neighbors.size(); i++){
        if(neighbors[i]->getId() == node->getId()){
            return true;
        }
    }
    return false;
}

void Node::addNeighbor(Node* neighbor){
    if (!(isNeighbor(neighbor))){
        neighbors.push_back(neighbor);
    }
}