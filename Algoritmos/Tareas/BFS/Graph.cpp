/*
BFS
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "Graph.h"

Graph::Graph(){
    nodes = vector<Node*>();
}

Graph::Graph(string fileName){
    nodes = vector<Node*>();
    readGraphFromFile(fileName);
}

Graph::~Graph(){
    for (Node* node : nodes){
        delete node;
    }
}

vector<Node*> Graph::getNodes(){
    return nodes;
}

void Graph::addNode(Node* node){
    nodes.push_back(node);
}

Node* Graph::getNodeById(int id){
    for(int i = 0; i < nodes.size(); i++){
        if(nodes[i]->getId() == id){
            return nodes[i];
        }
    }
    return NULL;
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
                    to->addNeighbor(from);
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

vector <Node*> Graph::BFS(Node *startingNode){
    vector <Node*> visited;
    Queue *queue = new Queue();
    queue->enqueue(startingNode);
    while(!queue->isEmpty()){
        Node *node = queue->dequeue();
        visited.push_back(node);
        vector <Node*> neighbors = node->getNeighbors();
        for(int i = 0; i < neighbors.size(); i++){
            if(find(visited.begin(), visited.end(), neighbors[i]) == visited.end() && 
                                                    !(queue->nodeInQueue(neighbors[i]))){
                queue->enqueue(neighbors[i]);
            }
        }
    }
    delete queue;
    return visited;
}