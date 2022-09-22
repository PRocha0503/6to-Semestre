#include "Graph.h"

Graph::Graph(){
    nodes = vector<Node*>();
}

Graph::Graph(string fileName){
    nodes = vector<Node*>();
    readGraphFromFile(fileName);
}

vector<Node*> Graph::getNodes(){
    return nodes;
}

void Graph::addNode(Node* node){
    nodes.push_back(node);
}

Node* Graph::checkIfExists(int nodeId){
    for(int i = 0; i < nodes.size(); i++){
        if(nodes[i]->getId() == nodeId){
            return nodes[i];
        }
    }
    Node* node = new Node(nodeId);
    addNode(node);
    return node;
}

void Graph::readGraphFromFile(string fileName){
    vector<vector<int> > content;
    string line, id;

    fstream file (fileName, ios::in);
    if(file.is_open()){
        while(getline(file, line)){

            stringstream str(line);

            bool first = true;
            Node *from = NULL;
            Node *to = NULL;

            while(getline(str, id, ',')){
                if (first){
                    from = checkIfExists(stoi(id));
                    first = false;    
                }
                else{
                    to = checkIfExists(stoi(id));
                    from->addNeighbor(to);
                }
            }
        }
        file.close();
    }
    else
    cout<<"Could not open the file\n";
}

void Graph::printGraph(){
    for(int i = 0; i < nodes.size(); i++){
        cout << "Node " << nodes[i]->getId() << " has neighbors: ";
        vector<Node*> neighbors = nodes[i]->getNeighbors();
        for(int j = 0; j < neighbors.size(); j++){
            cout << neighbors[j]->getId() << " ";
        }
        cout << endl;
    }
}