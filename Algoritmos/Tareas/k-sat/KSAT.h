/*
KSAT Shoning
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "KLiteral.cpp"
#include <vector>
#include <string>
#include <map>
#include <fstream>
#include <regex>
#include <random>
#include <iostream>
#include <functional>
#include <sstream>

using namespace std;

class KSAT{
  private:
    map<int, bool> variables;
    int numOfVariables;
    vector<vector<KLiteral>> constraints;
    vector<vector<KLiteral>> failedConstraints;
    int getRandomFailedLiteral();
    void makeRandomVariables();
    void flipLiteral(int);
    void readFromFile(string filename);
    bool evaluateClauses();
    void printVariables(bool found);
    void printConstraints();
    void FromDIMACS(const char *);
    void parseClause(string);
    void parseHeader(string);
  public:
    map<int, bool> Shoning();
    KSAT(string filename);
};