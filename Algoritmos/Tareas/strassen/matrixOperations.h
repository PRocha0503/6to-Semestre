#ifndef MATRIXOPERATIONS_H
#define MATRIXOPERATIONS_H

#include <vector>
#include <string>

using std::string;
using std::vector;

class MatrixOperations {
    private:
    vector<vector<int> > firstMatrix;
    vector<vector<int> > secondMatrix;

    public:
    // getters & setters
    vector<vector<int> > getFirstMatrix();
    vector<vector<int> > getSecondMatrix();
    void setFirstMatrix(vector<vector<int> > matrix);
    void setSecondMatrix(vector<vector<int> > matrix);

    // constructors
    MatrixOperations(); //default
    MatrixOperations(string firstScvFile, string secondScvFile);

    // matrix multiplication
    vector<vector<int> > strassenMultiplication();
    vector<vector<int> > textBookMultiplication();

    // extra methods
    void printMatrix(vector<vector<int> > Matrix);
    vector<vector<int> > fileToMatrix(string firstScvFile);

};

#endif