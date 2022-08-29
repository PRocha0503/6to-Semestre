/*
HW 03 - Strassen's Algorithm
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "matrixOperations.cpp"
#include <iostream>

using namespace std;

int main(){

    cout<<"\n--- 16x16 MULTIPLICATION ---"<<endl;
    // Initialize the matrix controller
    MatrixOperations matrixController = MatrixOperations("01.Matrix_A_16_2_4.csv","02.Matrix_B_16_2_4.csv");
    // Print the two matrices
    // matrixController.printMatrix(matrixController.getFirstMatrix());
    // matrixController.printMatrix(matrixController.getSecondMatrix());
    // Multiplication with the textbook method
    vector<vector<int> > resultFromTextBook = matrixController.textBookMultiplication();
    // Print Resulting Matrix to file
    matrixController.MatrixToFile(resultFromTextBook, "07.Matrix_AB_16_2_4_Textbook.csv");
    // Multiplication with the strassen method
    vector<vector<int> > resultFromStrassen = matrixController.strassenMultiplication();
    // Print Resulting Matrix to file
    matrixController.MatrixToFile(resultFromStrassen, "07.Matrix_AB_16_2_4_Strassen.csv");

    cout<<"\n--- 128x128 MULTIPLICATION ---"<<endl;
    // Initialize the matrix controller
    MatrixOperations matrixController2 = MatrixOperations("03.Matrix_A_128_2_7.csv","04.Matrix_B_128_2_7.csv");
    // Print the two matrices
    // matrixController2.printMatrix(matrixController2.getFirstMatrix());
    // matrixController2.printMatrix(matrixController2.getSecondMatrix());
    // Multiplication with the textbook method
    vector<vector<int> > resultFromTextBook2 = matrixController2.textBookMultiplication();
    // Print Resulting Matrix to file
    matrixController.MatrixToFile(resultFromTextBook2, "08.Matrix_AB_128_2_7_Textbook.csv");
    // Multiplication with the strassen method
    vector<vector<int> > resultFromStrassen2 = matrixController2.strassenMultiplication();
    // Print Resulting Matrix to file
    matrixController.MatrixToFile(resultFromStrassen2, "08.Matrix_AB_128_2_7_Strassen.csv");

    cout<<"\n--- 4096x4096 MULTIPLICATION ---"<<endl;
     // Initialize the matrix controller
    MatrixOperations matrixController3 = MatrixOperations("05.Matrix_A_4096_2_12.csv","06.Matrix_B_4096_2_12.csv");
    // Print the two matrices
    // matrixController3.printMatrix(matrixController3.getFirstMatrix());
    // matrixController3.printMatrix(matrixController3.getSecondMatrix());
    // Multiplication with the textbook method
    // vector<vector<int> > resultFromTextBook3 = matrixController3.textBookMultiplication();
    // Print Resulting Matrix to file
    // matrixController.MatrixToFile(resultFromTextBook3, "09.Matrix_AB_4096_2_12.Textbook.csv");
    // Multiplication with the strassen method
    vector<vector<int> > resultFromStrassen3 = matrixController3.strassenMultiplication();
    // Print Resulting Matrix to file
    matrixController.MatrixToFile(resultFromStrassen3, "09.Matrix_AB_4096_2_12.Strassen.csv");

    return 0;
}
