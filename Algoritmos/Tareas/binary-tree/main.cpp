#include "binaryTree.cpp"

using namespace std;

int main(){

    // vector<int> nodeValues{ 10,20,30,6,298,9,5,7,8,3,4,18,1,2,33,126,23,131,1542,76,134,3146,13,34 };
    // BinaryTree bt = BinaryTree(nodeValues);
    // bt.printTree(bt.getRoot());

    BinaryTree bt1 = BinaryTree("treeExample.csv");
    bt1.printTree(bt1.getRoot());

    return 0;
}
