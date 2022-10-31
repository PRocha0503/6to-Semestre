/*
ZFunction
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "ZFunction.h"

ZFunction::ZFunction(){
    zValues = vector<char>();
    zFunctionResult = vector<int>();
}

vector<char> ZFunction::getZValues(){
    return zValues;
}

void ZFunction::readFromFile(string fileName){
    ifstream file;
    file.open(fileName);
    if (!file.is_open()){
        cout << "Error opening file" << endl;
        return;
    }

    string line;
    while(getline(file, line)){
        for (int i = 0; i < line.length(); i++){
            if (line[i] == ','){
                continue;
            }
            zValues.push_back(line[i]); 
        }
    }
    
    file.close();
}

vector<int> ZFunction::calculateZFunction(){
    int left = 0;
    int right = 0;
    int k = 0;
    int n = zValues.size();
    zFunctionResult = vector<int>(n, 0);

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
    }
    return zFunctionResult;
}