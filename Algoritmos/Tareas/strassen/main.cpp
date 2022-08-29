#include "matrixOperations.cpp"
#include <iostream>

using namespace std;

int main(){
    // Initialize the matrix controller
    MatrixOperations matrixController = MatrixOperations("01.Matrix_A_16_2_4.csv","02.Matrix_B_16_2_4.csv");
    // Print the two matrices
    // matrixController.printMatrix(matrixController.getFirstMatrix());
    // matrixController.printMatrix(matrixController.getSecondMatrix());
    // Multiplication with the textbook method
    vector<vector<int> > resultFromTextBook = matrixController.textBookMultiplication();
    // Print Resulting Matrix
    // matrixController.printMatrix(resultFromTextBook);
    // Multiplication with the strassen method
    vector<vector<int> > resultFromStrassen = matrixController.strassenMultiplication();
    // Print Resulting Matrix
    // matrixController.printMatrix(resultFromStrassen);

    // Initialize the matrix controller
    MatrixOperations matrixController2 = MatrixOperations("03.Matrix_A_128_2_7.csv","04.Matrix_B_128_2_7.csv");
    // Print the two matrices
    // matrixController2.printMatrix(matrixController2.getFirstMatrix());
    // matrixController2.printMatrix(matrixController2.getSecondMatrix());
    // Multiplication with the textbook method
    vector<vector<int> > resultFromTextBook2 = matrixController2.textBookMultiplication();
    // Print Resulting Matrix
    // matrixController2.printMatrix(resultFromTextBook2);
    // Multiplication with the strassen method
    vector<vector<int> > resultFromStrassen2 = matrixController2.strassenMultiplication();
    // Print Resulting Matrix
    // matrixController2.printMatrix(resultFromStrassen2);

     // Initialize the matrix controller
    MatrixOperations matrixController3 = MatrixOperations("05.Matrix_A_4096_2_12.csv","06.Matrix_B_4096_2_12.csv");
    // Print the two matrices
    // matrixController3.printMatrix(matrixController3.getFirstMatrix());
    // matrixController3.printMatrix(matrixController3.getSecondMatrix());
    // Multiplication with the textbook method
    vector<vector<int> > resultFromTextBook3 = matrixController3.textBookMultiplication();
    // Print Resulting Matrix
    // matrixController3.printMatrix(resultFromTextBook3);
    // Multiplication with the strassen method
    vector<vector<int> > resultFromStrassen3 = matrixController3.strassenMultiplication();
    // Print Resulting Matrix
    // matrixController3.printMatrix(resultFromStrassen3);
}
