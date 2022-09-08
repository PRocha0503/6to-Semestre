/*
Binary Tree
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

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

BinaryTree::~BinaryTree(){
    deallocMemory(root);
}

void BinaryTree::deallocMemory(Node* node){
    if( node != nullptr )
    {
        deallocMemory(node->getLeft());
        deallocMemory(node->getRight());
        delete node;
    }
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
                break;
            }
            else{
                current = current->getLeft();
                continue;
            }
        }
    }
}

void BinaryTree::treeToFileHelper(const string& prefix, Node* node, bool isLeft, std::ofstream& myFile){
    if( node != nullptr )
    {
        myFile << prefix;

        myFile << (isLeft ? "├──" : "└──" );

        // print the value of the node
        myFile << node->getValue() << endl;

        // enter the next tree level - left and right branch
        treeToFileHelper( prefix + (isLeft ? "│   " : "    "), node->getLeft(), true, myFile);
        treeToFileHelper( prefix + (isLeft ? "│   " : "    "), node->getRight(), false, myFile);
    }
}

void BinaryTree::treeToFile(Node* node, string filename){
    std::ofstream myfile;
    myfile.open (filename);
    treeToFileHelper("", node, false, myfile);    
    cout<<"Tree created on file: "<<filename<<endl;
    myfile.close();
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
