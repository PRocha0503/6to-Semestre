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
    int elementaryStepsTextboook;
    int elementaryStepsStrassen;
    vector<vector<int> > recursiveStrassen(vector<vector<int> > m1,vector<vector<int> > m2);
    vector<vector<int> > joinMatrix(vector<vector<int> > tl,vector<vector<int> > tr,vector<vector<int> > bl,vector<vector<int> > br);
    vector<vector<int> > split(vector<vector<int> > const &v, int rowStart, int rowEnd,int columnStart,int columnEnd);

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

    // matrix addition
    vector<vector<int> > sumMatrices(vector<vector<int> >m1,vector<vector<int> > m2);

    // matrix subtraction
    vector<vector<int> > substractMatrices(vector<vector<int> >m1,vector<vector<int> > m2);

    // extra methods
    void printMatrix(vector<vector<int> > Matrix);
    void MatrixToFile(vector<vector<int> > matrix, string filename);
    vector<vector<int> > fileToMatrix(string firstScvFile);

};

#endif