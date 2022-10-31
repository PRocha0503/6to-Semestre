/*
ZFunction
Patricio Bosques Rosas: A01781663
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
        vector<char> zValues;
        vector<int> zFunctionResult;
        
    public:
        ZFunction();
        void readFromFile(string);
        vector<int> calculateZFunction();
        vector<char> getZValues();

};

