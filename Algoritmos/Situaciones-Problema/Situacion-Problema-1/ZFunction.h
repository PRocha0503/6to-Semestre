/*
Situación Integradora 1
Patricio Bosque Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include <iostream>
#include <vector>
#include <fstream>

using namespace std;

class ZFunction{
    private:
        int maliciousCodeLength;
        vector<char> zValues;
        vector<int> zFunctionResult;
        vector<int> zFunctionResultReversed;
        
    public:
        ZFunction(string transmissionFile,string maliciousCodeFile);
        vector<char>  readFromFile(string);
        vector<vector<int>> zFunctionKMP();
        vector<char> getZValues();

};

