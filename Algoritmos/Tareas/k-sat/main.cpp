/*
KSAT Shoning
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include <iostream>
#include "KSAT.cpp"

void runAllTests(string directory){
  //Run all the tests in the given directory
  //Test files within directory need to have the format names "uf20-0X.txt" where X is the file number
  int fileToUse=1;
  while (fileToUse<=20){
    string filename= directory+"/uf20-0"+to_string(fileToUse)+".txt";
    KSAT ksat = KSAT(filename);
    map<int, bool> finalVariables=ksat.Shoning();
    fileToUse++;
    cout<<"--------------------------------"<<endl;
  }
}

map<int, bool> runSingleTest(string filename){
  //Run single test with file name
  KSAT ksat = KSAT(filename);
  map<int, bool> finalVariables=ksat.Shoning();
  cout<<"--------------------------------"<<endl;
  return finalVariables;
}

int main(){
  //Run single test with file name
  string filename= "example_cases/uf20-01.txt";
  runSingleTest(filename);
  //Run all the tests in the given directory
  string directory = "example_cases";  //Test files within directory must have the format names "uf20-0X.txt" where X is the file number
  runAllTests(directory);

  return 0;
}