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
    void treeToFileHelper(const string& prefix, Node* node, bool isLeft, std::ofstream& myFile);
    void setTreeFromVector(vector<int>& nodeValues);
    void setTreeFromFile(string filename);
    void deallocMemory(Node* node);

    public:
    // getters & setters
    Node* getRoot();

    // constructors
    BinaryTree(); //default
    BinaryTree(vector<int>& nodeValues);
    BinaryTree(string filename);
    ~BinaryTree();

    // extra methods
    void addNode(int nodeValue);
    void treeToFile(Node* node, string filename);
    void printTree(Node* node);
};

#endif