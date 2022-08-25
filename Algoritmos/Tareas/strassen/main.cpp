#include "matrixOperations.cpp"
#include <iostream>

using namespace std;

int main(){
    // Initialize the matrix controller
    MatrixOperations matrixController = MatrixOperations("01.Matrix_A_16_2_4.csv","02.Matrix_B_16_2_4.csv");
    // MatrixOperations matrixController = MatrixOperations("test1.csv","test2.csv");
    // Print the two matrices
    matrixController.printMatrix(matrixController.getFirstMatrix());
    matrixController.printMatrix(matrixController.getSecondMatrix());
    // Multiplication with the textbook method
    vector<vector<int> > resultFromTextBook = matrixController.textBookMultiplication();
    matrixController.printMatrix(resultFromTextBook);
    // TODO: multiply them with Strassen method
}