#ifndef STRASSEN
#define STRASSEN

#include <vector>
#include <string>
#include <sstream>
#include <fstream>
#include <iostream>
using namespace std;

class Strassen{
    private:
        vector<vector<int>> matrixOne;
        vector<vector<int>> matrixTwo;
        vector<vector<int>> fileMatrix(string file);
        vector<vector<int>> recursiveStrassen(vector<vector<int>>,vector<vector<int>>);
        vector<vector<int>> s(vector<vector<int>> const &, int, int,int,int);
        vector<vector<int>> joinMatrix(vector<vector<int>>,vector<vector<int>>,vector<vector<int>>,vector<vector<int>>);
    public:
        Strassen(string,string);
        vector<vector<int>> strassenMultiplication();
        void printMatrix(vector<vector<int>>);
};

Strassen::Strassen(string file1,string file2){
    matrixOne = fileMatrix(file1);
    matrixTwo = fileMatrix(file2);
}
vector<vector<int>> Strassen::fileMatrix(string fileName){
    string line,number;
    vector<vector<int> > matrix;
    vector<int> row;

    ifstream file(fileName);
    if(file.is_open()){
        while (getline (file, line)) {
            row.clear();
            stringstream str(line);
            while(getline(str, number, ',')){
                row.push_back(stoi(number));
            }
            matrix.push_back(row);
            }
    }
    return matrix;
}

void Strassen::printMatrix(vector<vector<int> > matrix){
    cout << "\nMATRIX:" << endl;
    for (int i = 0; i < matrix.size(); i++){
        cout << "\n" << " ";
        for (int j = 0; j < matrix[i].size(); j++){
            cout << matrix[i][j] << " ";
        }
    }
    cout << endl;
}

vector<vector<int>> Strassen::s(vector<vector<int>> const &v, int rowStart, int rowEnd,int columnStart,int columnEnd) {
   vector<vector<int>> sub_vector;
    for (std::size_t i = rowStart; i < rowEnd; ++i) {
        sub_vector.emplace_back(v[i].begin() + columnStart, v[i].begin() + columnEnd);
    }
   return sub_vector;
}

vector<vector<int>> Strassen::joinMatrix(vector<vector<int>> tl,vector<vector<int>> tr,vector<vector<int>> bl,vector<vector<int>> br){
    // First join the rows
    vector<vector<int>> top;
    vector<vector<int>> bottom;
    int size = tl.size();

    for(int i = 0;i<size;i++){
        for(int j= 0;j<size;j++){
            tl[i].push_back(tr[i][j]);
            bl[i].push_back(br[i][j]);
        }
        tl.push_back(bl[i]);
    }
    return tl;
}


vector<vector<int>> Strassen::recursiveStrassen(vector<vector<int>> m1,vector<vector<int>> m2){
    if (m1.size() == 2){
        // printMatrix(m1);
        // printMatrix(m2);

        int aTopLeft = m1[0][0];
        int aTopRight = m1[0][1];
        int aBottomLeft = m1[1][0];
        int aBottomRight = m1[1][1];

        int bTopLeft = m2[0][0];
        int bTopRight = m2[0][1];
        int bBottomLeft = m2[1][0];
        int bBottomRight = m2[1][1];

        int M1 = (aTopLeft+aBottomRight) * (bTopLeft+bBottomRight);
        int M2 =  (aBottomLeft+aBottomRight) * (bTopLeft);
        int M3 = aTopLeft * (bTopRight - bBottomRight);
        int M4 = aBottomRight * (bBottomLeft - bTopLeft);
        int M5 = (aTopLeft + aTopRight) * bBottomRight;
        int M6 = (aBottomLeft-aTopLeft) * (bTopLeft+bTopRight);
        int M7 = (aTopRight - aBottomRight) * (bBottomLeft+bBottomRight);

        int c11 = M1 + M4 -M5 +M7;
        int c12 = M3 + M5;
        int c21 = M2 + M4;
        int c22 = M1-M2+M3+M6; 

        vector<vector<int>> c{{c11,c12},{c21,c22}};
        // printMatrix(c);

        return c;
    }else{
        int divideIndex = m1.size()/2;
        // printMatrix(s(m,0,divideIndex,0,divideIndex));
        vector<vector<int>> topLeft = recursiveStrassen(s(m1,0,divideIndex,0,divideIndex),s(m2,0,divideIndex,0,divideIndex));
        vector<vector<int>> topRight = recursiveStrassen(s(m1,0,divideIndex,divideIndex,m1.size()),s(m2,0,divideIndex,divideIndex,m1.size()));
        vector<vector<int>> bottomLeft = recursiveStrassen(s(m1,divideIndex,m1.size(),0,divideIndex),s(m2,divideIndex,m1.size(),0,divideIndex));
        vector<vector<int>> bottomRight = recursiveStrassen(s(m1,divideIndex,m1.size(),divideIndex,m1.size()),s(m2,divideIndex,m1.size(),divideIndex,m1.size()));

        // vector<vector<int>> bTopLeft = recursiveStrassen(s(m1,0,divideIndex,0,divideIndex),s(m2,0,divideIndex,0,divideIndex));
        // vector<vector<int>> bTopRight = recursiveStrassen(s(m1,0,divideIndex,divideIndex,m1.size()),s(m2,0,divideIndex,divideIndex,m1.size()));
        // vector<vector<int>> bBottomLeft = recursiveStrassen(s(m1,divideIndex,m1.size(),0,divideIndex),s(m2,divideIndex,m1.size(),0,divideIndex));
        // vector<vector<int>> bBottomRight = recursiveStrassen(s(m1,divideIndex,m1.size(),divideIndex,m1.size()),s(m2,divideIndex,m1.size(),divideIndex,m1.size()));

        return joinMatrix(topLeft,topRight,bottomLeft,bottomRight);
    }

}


vector<vector<int>> Strassen::strassenMultiplication(){
    return recursiveStrassen(matrixOne,matrixTwo) ;
}



#endif