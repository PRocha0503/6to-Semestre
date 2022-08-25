#include "matrixOperations.h"
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>

using std::fstream;
using std::ios;
using std::stringstream;
using namespace std;

MatrixOperations::MatrixOperations(){
}

MatrixOperations::MatrixOperations(string firstScvFile, string secondScvFile){
    firstMatrix = fileToMatrix(firstScvFile);
    secondMatrix = fileToMatrix(secondScvFile);
}

vector<vector<int> > MatrixOperations::getFirstMatrix(){
    return firstMatrix;
}

vector<vector<int> > MatrixOperations::getSecondMatrix(){
    return secondMatrix;
}

void MatrixOperations::setFirstMatrix(vector<vector<int> > matrix){
    firstMatrix = matrix;
}

void MatrixOperations::setSecondMatrix(vector<vector<int> > matrix){
    secondMatrix = matrix;
}

vector<vector<int> > MatrixOperations::fileToMatrix(string firstScvFile){
    vector<vector<int> > content;
    vector<int> row;
    string line, word;
 
    fstream file (firstScvFile, ios::in);
    if(file.is_open()){
        while(getline(file, line)){
            row.clear();
            
            stringstream str(line);
            
            while(getline(str, word, ','))
            row.push_back((stoi(word)));
            content.push_back(row);
        }
    }
    else
    cout<<"Could not open the file\n";

    return content;
}

void MatrixOperations::printMatrix(vector<vector<int> > matrix){
    cout << "\nMATRIX:" << endl;
    for (int i = 0; i < matrix.size(); i++){
        cout << "\n" << " ";
        for (int j = 0; j < matrix[i].size(); j++){
            cout << matrix[i][j] << " ";
        }
    }
    cout << endl;
}

vector<vector<int> > MatrixOperations::strassenMultiplication(){
    
}

vector<vector<int> > MatrixOperations::textBookMultiplication(){
    
}
