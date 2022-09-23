#include "Node.cpp"

class Queue{
    private:
        vector<Node*> queue;
        int sizeQ;
    public:
        Queue();
        ~Queue();
        void enqueue(Node* node);
        Node* dequeue();
        bool isEmpty();
        bool nodeInQueue(Node* node);
        int size();
};