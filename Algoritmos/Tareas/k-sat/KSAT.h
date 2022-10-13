#include "KLiteral.cpp"
#include <vector>
#include <string>
#include <map>
#include <fstream>
#include <regex>
#include <random>
#include <iostream>
#include <functional>

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
    void readFromFile(string);
    bool evaluateClauses();
    void printVariables();
  public:
    map<int, bool> Shoning();
    KSAT(string);
    KSAT(int,vector<vector<int>>);
};