#ifndef BINARYTREE
#define BINARYTREE


#include "node.cpp"
using namespace std;
#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>

class BinaryTree{
    private:
        Node* root;
        void addNode(Node*,Node*);
        void printTree(const string& prefix, Node* node, bool isLeft);
    public:
        BinaryTree();
        BinaryTree(Node*);
        void addNode(Node*);
        void printTree();
        void readFile(string);
};

BinaryTree::BinaryTree(){
    root = nullptr;
};
BinaryTree::BinaryTree(Node* r){
    root = r;
};

void BinaryTree::addNode(Node* curr,Node* n){
    if(root==nullptr){
        root = n;
        return;
    }
    if(n->val < curr->val){
        if (curr->left == nullptr) {
            curr->left = n;
            return;
        }else{
            addNode(curr->left, n);
        }
    }else{
        if (curr->right == nullptr) {
            curr->right = n;
            return;
        }else{
            addNode(curr->right, n);
        }
    }
};

void BinaryTree::addNode(Node* n){
    addNode(root,n);
};

void BinaryTree::printTree(){
    printTree("", root, false);

};
void BinaryTree::printTree(const string& prefix, Node* node, bool isLeft){
    if( node != nullptr )
    {
        cout << prefix;

        cout << (isLeft ? "├──" : "└──" );

        // print the value of the node
        cout << node->val << endl;

        // enter the next tree level - left and right branch
        printTree( prefix + (isLeft ? "│   " : "    "), node->left, true);
        printTree( prefix + (isLeft ? "│   " : "    "), node->right, false);
    }
};


void BinaryTree::readFile(string f){
    vector<Node> content;
    string line, word;

    fstream file (f, ios::in);
    if(file.is_open()){
        while(getline(file, line)){
            stringstream str(line);

            while(getline(str, word, ',')){
                Node* temp = new Node(stoi(word));
                addNode(temp);
            }
        }
        file.close();
    }
    else
    cout<<"Could not open the file\n";
    return;
}

#endif