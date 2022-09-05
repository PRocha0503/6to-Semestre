#include <iostream>
#include "binaryTree.cpp"
#include "node.cpp"

using namespace std;

int main(){
    Node* n = new Node(2);
    Node* l = new Node(1);
    BinaryTree b =  BinaryTree(n);
    b.addNode(l);
    b.printTree();
}