/*
HW 03 - Strassen's Algorithm
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#ifndef BinaryTree_H
#define BinaryTree_H

#include "node.cpp"
#include <vector>
#include <string>

using std::string;
using std::vector;

class BinaryTree {
    private:
    Node* root;

    // private methods
    void printTreeHelper(const string& prefix, Node* node, bool isLeft);
    void setTreeFromVector(vector<int>& nodeValues);
    void setTreeFromFile(string filename);

    public:
    // getters & setters
    Node* getRoot();

    // constructors
    BinaryTree(); //default
    BinaryTree(vector<int>& nodeValues);
    BinaryTree(string filename);

    // extra methods
    void addNode(int nodeValue);
    void printTree(Node* node);
};

#endif