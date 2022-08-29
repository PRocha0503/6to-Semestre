#include "strassen.h"

using namespace std;


int main(){
    Strassen strassen("05Matrix.txt","06Matrix.txt");
    vector<vector<int>> result = strassen.strassenMultiplication();
    strassen.printMatrix(result);
    
}