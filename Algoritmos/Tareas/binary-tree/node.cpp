#ifndef NODE
#define NODE

class Node {
    public:
        int val;
        Node* left;
        Node* right;
        Node(int);
};

Node::Node(int v){
    val = v;
};


#endif