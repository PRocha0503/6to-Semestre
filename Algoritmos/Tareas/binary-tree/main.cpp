#include "binaryTree.cpp"

using namespace std;

int main(){

    BinaryTree bt1 = BinaryTree("treeExample.csv");
    bt1.printTree(bt1.getRoot());
    bt1.treeToFile(bt1.getRoot(),"testTree.txt");

    return 0;
}
