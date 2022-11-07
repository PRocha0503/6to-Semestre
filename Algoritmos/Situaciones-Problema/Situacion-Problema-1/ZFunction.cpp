/*
ZFunction
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "ZFunction.h"

ZFunction::ZFunction(string transmissionFile,string maliciousCodeFile){
    zValues = vector<char>();
    zFunctionResult = vector<int>();
    zValues = readFromFile(maliciousCodeFile);
    maliciousCodeLength = zValues.size();
    zValues.push_back('$');
    vector<char> zValues2 = readFromFile(transmissionFile);
    zValues.insert(zValues.end(),zValues2.begin(),zValues2.end());
}

vector<char> ZFunction::getZValues(){
    return zValues;
}

vector<char> ZFunction::readFromFile(string fileName){

    vector<char> fileValues;

    ifstream file;
    file.open(fileName);
    if (!file.is_open()){
        cout << "Error opening file" << endl;
        return fileValues;
    }

    string line;
    while(getline(file, line)){
        for (int i = 0; i < line.length(); i++){
            fileValues.push_back(line[i]); 
        }
    }
    
    file.close();
    return fileValues;
}

vector<vector<int>> ZFunction::zFunctionKMP(){
    int left = 0;
    int right = 0;
    int k = 0;
    int n = zValues.size();
    zFunctionResult = vector<int>(n, 0);
    vector<vector<int>> positionsFound;

    for (int i = 1; i < n; i++){
        if (i > right){
            left = right = i;
            while (right < n && zValues[right] == zValues[right - left]){
                right++;
            }
            zFunctionResult[i] = right - left;
            right--;
        }
        else{
            k = i - left;
            if (zFunctionResult[k] < right - i + 1){
                zFunctionResult[i] = zFunctionResult[k];
            }
            else{
                left = i;
                while (right < n && zValues[right] == zValues[right - left]){
                    right++;
                }
                zFunctionResult[i] = right - left;
                right--;
            }
        }
        if (zFunctionResult[i] == maliciousCodeLength){
            int startingPosition = i - maliciousCodeLength - 1;
            positionsFound.push_back(vector<int>(startingPosition, startingPosition + maliciousCodeLength));
        }
    }
    return positionsFound;
}