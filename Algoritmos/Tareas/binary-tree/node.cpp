/*
Binary Tree
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "node.h"

Node::Node(){
    value = 0;
    right = nullptr;
    left = nullptr;
    previous = nullptr;
}

Node::Node(int _value, Node* _right, Node* _left, Node* _previous){
    value = _value;
    right = _right;
    left = _left;
    previous = _previous;
}

Node::Node(int _value, Node* _previous){
    value = _value;
    previous = _previous;
    left = nullptr;
    right =nullptr;
}


void Node::setRight(Node* _right){
    right = _right;
}

void Node::setLeft(Node* _left){
    left = _left;
}

void Node::setPrevious(Node* _previous){
    previous = _previous;
}

int Node::getValue(){
    return value;
}

Node* Node::getRight(){
    return right;
}

Node* Node::getLeft(){
    return left;
}