/*
Situación Integradora 2
Patricio Bosque Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "HeapInfo.h"

HeapInfo::HeapInfo(){
    this->weight = 0;
    this->node = 0;
    this->parent = 0;
}

HeapInfo::HeapInfo(int weight, int node, int parent){
    this->weight = weight;
    this->node = node;
    this->parent = parent;
}

bool HeapInfo::operator > (HeapInfo const &obj) const{
    return weight > obj.weight;
}

bool HeapInfo::operator < (HeapInfo const &obj) const{
    return weight < obj.weight;
}