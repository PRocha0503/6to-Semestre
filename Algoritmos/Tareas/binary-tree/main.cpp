/*
Binary Tree
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "binaryTree.cpp"

using namespace std;

int main(){

    BinaryTree bt1 = BinaryTree("treeExample.csv");
    bt1.printTree(bt1.getRoot());
    bt1.treeToFile(bt1.getRoot(),"testTree.txt");

    return 0;
}
