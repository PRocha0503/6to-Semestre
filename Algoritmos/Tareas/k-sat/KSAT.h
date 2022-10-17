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
    string filename;
    vector<vector<KLiteral>> constraints;
    vector<vector<KLiteral>> failedConstraints;
    int getRandomFailedLiteral(vector<KLiteral> randomConstraint);
    vector<KLiteral> getRandomFailedConstraint();
    void makeRandomVariables();
    void flipLiteral(int);
    void readFromFile(string filename);
    bool evaluateClauses();
    void printIterations(bool found, int numIteration, vector <KLiteral> failedConstraint=vector<KLiteral>(), int failedLiteral=-1);
    void printIterationsToFile(bool found, int numIteration, vector <KLiteral> failedConstraint=vector<KLiteral>(), int failedLiteral=-1);
    void printConstraints();
    void FromDIMACS(const char *);
    void parseClause(string);
    void parseHeader(string);
  public:
    map<int, bool> Shoning();
    KSAT(string filename);
};