/*
BFS
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "Node.cpp"

class Stack{
    private:
        vector<Node*> stack;
        int sizeS;
    public:
        Stack();
        ~Stack();
        void push(Node* node);
        Node* pop();
        bool isEmpty();
        bool nodeInStack(Node* node);
        int size();
};