#include "strassen.h"

using namespace std;


int main(){
    Strassen strassen("01Matrix.txt","02Matrix.txt");
    vector<vector<int>> result = strassen.strassenMultiplication();
    // strassen.printMatrix(result);
    
}