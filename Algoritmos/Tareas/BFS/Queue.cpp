#include "Queue.h"


Queue::Queue(){
    queue = vector<Node*>();
    sizeQ = 0;
}

Queue::~Queue(){
    for (Node* node : queue){
        delete node;
    }
}

void Queue::enqueue(Node* node){
    queue.push_back(node);
    sizeQ++;
}

Node* Queue::dequeue(){
    Node* node = queue[0];
    queue.erase(queue.begin());
    sizeQ--;
    return node;
}

bool Queue::isEmpty(){
    return sizeQ == 0;
}

int Queue::size(){
    return sizeQ;
}

bool Queue::nodeInQueue(Node* node){
    for (int i = 0; i < sizeQ; i++) {
        if (queue[i]->getId() == node->getId()) {
            return true;
        }
    }
    return false;
}