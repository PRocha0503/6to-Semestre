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
        void printTree(Node*);
    public:
        BinaryTree(Node*);
        void addNode(Node*);
        void printTree();
        vector<Node> readFile(string);
};

BinaryTree::BinaryTree(Node* r){
    root = r;
};

void BinaryTree::addNode(Node* curr,Node* n){
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
    printTree(root);

};
void BinaryTree::printTree(Node* curr){
    cout << curr->val <<endl;
    if(curr->left != nullptr){
        cout << "LEFT" <<endl;
        printTree(curr->left);
    }else if(curr->right != nullptr){
        cout << "RIGHT" <<endl;
        printTree(curr->right);
    }
};


vector<Node> BinaryTree::readFile(string f){
    vector<Node> content;
    string line, word;

    fstream file (f, ios::in);
    if(file.is_open()){
        while(getline(file, line))
            stringstream str(line);
            while(getline(str, word, ','))
            cout << word <<endl;
        }
        file.close();
    }
    else
    cout<<"Could not open the file\n";

    return content;
}

#endif