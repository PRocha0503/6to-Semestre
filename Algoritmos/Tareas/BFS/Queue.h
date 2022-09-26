/*
BFS
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

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