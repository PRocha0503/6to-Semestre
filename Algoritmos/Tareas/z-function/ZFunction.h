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

