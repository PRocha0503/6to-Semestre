/*
Binary Tree
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#ifndef Node_H
#define Node_H

class Node {
    private:
    int value;
    Node* right;
    Node* left;
    Node* previous;

    public:
    // getters & setters
    void setRight(Node* right);
    void setLeft(Node* left);
    Node* getRight();
    Node* getLeft();
    void setPrevious(Node* previous);
    int getValue();

    // constructors
    Node(); //default
    Node(int value, Node* previous);
    Node(int value, Node* right, Node* left, Node* previous);
};

#endif