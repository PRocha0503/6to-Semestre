/*
Situación Integradora 2
Patricio Bosque Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "MSTNode.h"

MSTNode::MSTNode(int node1, int node2, int weight){
    this->node1 = node1;
    this->node2 = node2;
    this->weight = weight;
}

MSTNode::MSTNode(){
    this->node1 = 0;
    this->node2 = 0;
    this->weight = 0;
}
