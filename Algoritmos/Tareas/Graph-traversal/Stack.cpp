/*
BFS
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "Stack.h"

Stack::Stack(){
    stack = vector<Node*>();
    sizeS = 0;
}

Stack::~Stack(){
    for (Node* node : stack){
        delete node;
    }
}

void Stack::push(Node* node){
    stack.push_back(node);
    sizeS++;
}

Node* Stack::pop(){
    Node* node = stack[sizeS-1];
    stack.pop_back();
    sizeS--;
    return node;
}

bool Stack::isEmpty(){
    return sizeS == 0;
}

bool Stack::nodeInStack(Node* node){
    for (int i = 0; i < sizeS; i++) {
        if (stack[i]->getId() == node->getId()) {
            return true;
        }
    }
    return false;
}

int Stack::size(){
    return sizeS;
}

