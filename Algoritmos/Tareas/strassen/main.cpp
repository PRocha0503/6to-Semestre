#include "matrixOperations.cpp"
#include <iostream>

using namespace std;

int main(){
    // Initialize the matrix controller
    MatrixOperations matrixController = MatrixOperations("01.Matrix_A_16_2_4.csv","02.Matrix_B_16_2_4.csv");
    // Print the two matrices
    matrixController.printMatrix(matrixController.getFirstMatrix());
    matrixController.printMatrix(matrixController.getSecondMatrix());
    // TODO: multiply them with both methods
}