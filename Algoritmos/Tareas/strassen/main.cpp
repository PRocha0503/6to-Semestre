#include "matrixOperations.cpp"
#include <iostream>

using namespace std;

int main(){
    MatrixOperations matrixController = MatrixOperations("01.Matrix_A_16_2_4.csv","02.Matrix_B_16_2_4.csv");
    matrixController.printMatrix(matrixController.getFirstMatrix());
    matrixController.printMatrix(matrixController.getSecondMatrix());
}