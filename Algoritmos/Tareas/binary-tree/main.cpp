#include <iostream>
#include "binaryTree.cpp"
#include "node.cpp"

using namespace std;

int main(){
    BinaryTree b =  BinaryTree();
    b.readFile("values.txt");
    b.printTree();
}