/*
KSAT Shoning
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include <iostream>
#include "KSAT.cpp"

int main(){

  string filename= "example_cases/uf20-01.txt";
  KSAT ksat = KSAT(filename);
  map<int, bool> finalVariables=ksat.Shoning();

}