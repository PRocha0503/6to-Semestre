/*
Situación Integradora 1
Patricio Bosque Rosas: A01781663
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

vector<vector<int>> ZFunction::zFunction(){

    int left = 0;
    int right = 0;
    int k = 0;

    int leftReversed = 0;
    int rightReversed = 0;
    int kReversed = 0;

    int n = zValues.size();
    zFunctionResult = vector<int>(n, 0);
    int nonReversedNumberOfMatches = 0;
    zFunctionResultReversed = vector<int>(n, 0);
    int reversedNumberOfMatches = 0;
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
            vector<int> malicious = vector<int>();
            malicious.push_back(startingPosition);
            malicious.push_back(startingPosition + maliciousCodeLength);
            malicious.push_back(0); //0 means the malicious code is not reversed
            nonReversedNumberOfMatches++;
            positionsFound.push_back(malicious);
        }

        //Check for reversed malicious code
        if (i > rightReversed){
            leftReversed = rightReversed = i;
            int extraReversed = 1;
            while (rightReversed < n && zValues[rightReversed] == zValues[maliciousCodeLength - extraReversed]){
                extraReversed+=1;
                rightReversed++;
            }
            zFunctionResultReversed[i] = rightReversed - leftReversed;
            rightReversed--;
        }
        else{
            kReversed = maliciousCodeLength-1-(i - leftReversed);
            if (zFunctionResultReversed[kReversed] < rightReversed - i + 1){
                zFunctionResultReversed[i] = zFunctionResultReversed[kReversed];
            }
            else{
                leftReversed = i;
                int extraReversed = 1;
                while (rightReversed < n && zValues[rightReversed] == zValues[maliciousCodeLength - extraReversed]){
                    extraReversed+=1;
                    rightReversed++;
                }
                zFunctionResultReversed[i] = rightReversed - leftReversed;
                rightReversed--;
            }
        }
        if (zFunctionResultReversed[i] == maliciousCodeLength){
            int startingPosition = i - maliciousCodeLength - 1;
            vector<int> malicious = vector<int>();
            malicious.push_back(startingPosition);
            malicious.push_back(startingPosition + maliciousCodeLength);
            malicious.push_back(1); //1 means the malicious code is reversed
            reversedNumberOfMatches++;
            positionsFound.push_back(malicious);
        }
        
    }

    // The first element of the vector has the number of matches found in the following format: [number of matches, number of reversed matches, total number of matches]
    vector<int> matchesCount = vector<int>();
    matchesCount.push_back(nonReversedNumberOfMatches);
    matchesCount.push_back(reversedNumberOfMatches);
    matchesCount.push_back(reversedNumberOfMatches+nonReversedNumberOfMatches);
    positionsFound.insert(positionsFound.begin(), matchesCount);

    return positionsFound;
}