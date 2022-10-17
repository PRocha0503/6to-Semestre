#include <iostream>
#include "KSAT.cpp"

int main(){

  string filename= "uf20-01.txt";
  KSAT ksat = KSAT(filename);
  map<int, bool> finalVariables=ksat.Shoning();

}