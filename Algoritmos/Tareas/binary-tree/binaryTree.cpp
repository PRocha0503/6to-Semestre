#include "binaryTree.h"
#include <iostream>
#include <fstream>
#include <sstream>

using namespace std;

BinaryTree::BinaryTree(){
    root = nullptr;
}

BinaryTree::BinaryTree(vector<int>& nodeValues){
    setTreeFromVector(nodeValues);
}

BinaryTree::BinaryTree(string filename){
    setTreeFromFile(filename);
}


void BinaryTree::setTreeFromVector(vector<int>& nodeValues){
    for(int i = 0; i < nodeValues.size(); i++){
        if (i==0){
            root = new Node(nodeValues[i], nullptr);
        }
        else{
            addNode(nodeValues[i]);
        }
    }
}

void BinaryTree::setTreeFromFile(string firstScvFile){
    vector<int > content;
    string line, word;

    fstream file (firstScvFile, ios::in);
    if(file.is_open()){
        while(getline(file, line)){

            stringstream str(line);

            while(getline(str, word, ',')){
                content.push_back((stoi(word)));
            }
        }
        file.close();
    }
    else
    cout<<"Could not open the file\n";

    // vector<int> nodeValues{ 10, 20, 30, 6, 298, 9, 5, 7, 8, 3,4, 18, 19};
    // setTreeFromVector(content);
    setTreeFromVector(content);

}

Node* BinaryTree::getRoot(){
    return root;
}

void BinaryTree::addNode(int node){
    Node * current=root;
    while (current != nullptr){
        if (node>current->getValue()){
            if (current->getRight() == nullptr){
                Node * toInsert= new Node(node,current);
                current -> setRight(toInsert);
                toInsert -> setPrevious(current);
                current = root;
                break;
            }
            else{
                current = current->getRight();
                continue;
            }
        }
        else if (node<current->getValue()){
            if (current->getLeft() == nullptr){
                Node * toInsert= new Node(node,current);
                current -> setLeft(toInsert);
                toInsert -> setPrevious(current);
                current = root;
                break;
            }
            else{
                current = current->getLeft();
                continue;
            }
        }
    }
}

void BinaryTree::printTreeHelper(const string& prefix, Node* node, bool isLeft){
    if( node != nullptr )
    {
        cout << prefix;

        cout << (isLeft ? "├──" : "└──" );

        // print the value of the node
        cout << node->getValue() << endl;

        // enter the next tree level - left and right branch
        printTreeHelper( prefix + (isLeft ? "│   " : "    "), node->getLeft(), true);
        printTreeHelper( prefix + (isLeft ? "│   " : "    "), node->getRight(), false);
    }
}

void BinaryTree::printTree(Node* node){
    printTreeHelper("", node, false);    
}