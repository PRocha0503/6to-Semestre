#include "matrixOperations.h"
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>

using namespace std;

MatrixOperations::MatrixOperations(){
}

MatrixOperations::MatrixOperations(string firstScvFile, string secondScvFile){
    firstMatrix = fileToMatrix(firstScvFile);
    secondMatrix = fileToMatrix(secondScvFile);
}

vector<vector<int> > MatrixOperations::getFirstMatrix(){
    return firstMatrix;
}

vector<vector<int> > MatrixOperations::getSecondMatrix(){
    return secondMatrix;
}

void MatrixOperations::setFirstMatrix(vector<vector<int> > matrix){
    firstMatrix = matrix;
}

void MatrixOperations::setSecondMatrix(vector<vector<int> > matrix){
    secondMatrix = matrix;
}

vector<vector<int> > MatrixOperations::fileToMatrix(string firstScvFile){
    vector<vector<int> > content;
    vector<int> row;
    string line, word;

    fstream file (firstScvFile, ios::in);
    if(file.is_open()){
        while(getline(file, line)){
            row.clear();

            stringstream str(line);

            while(getline(str, word, ','))
            row.push_back((stoi(word)));
            content.push_back(row);
        }
        file.close();
    }
    else
    cout<<"Could not open the file\n";

    return content;
}

void MatrixOperations::printMatrix(vector<vector<int> > matrix){
    cout << "\nMATRIX:" << endl;
    for (int i = 0; i < matrix.size(); i++){
        cout << "\n" << " ";
        for (int j = 0; j < matrix[i].size(); j++){
            cout << matrix[i][j] << " ";
        }
    }
    cout << endl;
}

void MatrixOperations::MatrixToFile(vector<vector<int> > matrix, string filename){
    std::ofstream myfile;
    myfile.open (filename);
    for (int i = 0; i < matrix.size(); i++){
        if (i>0)
            myfile << "\n" << " ";
        for (int j = 0; j < matrix[i].size(); j++){
            myfile << matrix[i][j] << ",";
        }
    }
    myfile << endl;
    myfile.close();
    cout<<"Matrix created on file: "<<filename<<endl;
}

vector<vector<int> > MatrixOperations::textBookMultiplication(){
    vector<vector<int> > resultingMatrix;
    elementaryStepsTextboook = 0;
    for (int r1 = 0; r1 < firstMatrix.size(); r1++){
        vector<int> row;
        for (int c2 = 0; c2 < secondMatrix[r1].size(); c2++){
            int result=0;
            for (int c1 = 0; c1 < firstMatrix[c2].size(); c1++){
                result += firstMatrix[r1][c1]*secondMatrix[c1][c2];
                elementaryStepsTextboook += 1;
            }
            row.push_back(result);
        }
        resultingMatrix.push_back(row);
    }
    cout<<"Number of multiplications for textbook multiplication: "<<elementaryStepsTextboook<<endl;
    return resultingMatrix;
}

vector<vector<int> > MatrixOperations::split(vector<vector<int> > const &v, int rowStart, int rowEnd,int columnStart,int columnEnd) {
   vector<vector<int> > sub_vector;
    for (std::size_t i = rowStart; i < rowEnd; ++i) {
        sub_vector.emplace_back(v[i].begin() + columnStart, v[i].begin() + columnEnd);
    }
   return sub_vector;
}

vector<vector<int> > MatrixOperations::joinMatrix(vector<vector<int> > tl,vector<vector<int> > tr,vector<vector<int> > bl,vector<vector<int> > br){
    // First join the rows
    vector<vector<int> > top;
    vector<vector<int> > bottom;
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

vector<vector<int> > MatrixOperations::recursiveStrassen(vector<vector<int> > m1,vector<vector<int> > m2){
    if (m1.size() == 2){

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

        elementaryStepsStrassen += 7;

        int c11 = M1 + M4 -M5 +M7;
        int c12 = M3 + M5;
        int c21 = M2 + M4;
        int c22 = M1-M2+M3+M6;

        vector<vector<int> > c{{c11,c12},{c21,c22}};
        return c;
    }else{
        int divideIndex = m1.size()/2;

        vector<vector<int> > aTopLeft = split(m1,0,divideIndex,0,divideIndex);
        vector<vector<int> > aTopRight = split(m1,0,divideIndex,divideIndex,m1.size());
        vector<vector<int> > aBottomLeft = split(m1,divideIndex,m1.size(),0,divideIndex);
        vector<vector<int> > aBottomRight = split(m1,divideIndex,m1.size(),divideIndex,m1.size());

        vector<vector<int> > bTopLeft = split(m2,0,divideIndex,0,divideIndex);
        vector<vector<int> > bTopRight = split(m2,0,divideIndex,divideIndex,m2.size());
        vector<vector<int> > bBottomLeft = split(m2,divideIndex,m2.size(),0,divideIndex);
        vector<vector<int> > bBottomRight = split(m2,divideIndex,m2.size(),divideIndex,m2.size());

        vector<vector<int> >  M1 = recursiveStrassen(sumMatrices(aTopLeft,aBottomRight) , sumMatrices(bTopLeft,bBottomRight));
        vector<vector<int> >  M2 = recursiveStrassen(sumMatrices(aBottomLeft,aBottomRight) , (bTopLeft));
        vector<vector<int> >  M3 = recursiveStrassen(aTopLeft , substractMatrices(bTopRight , bBottomRight));
        vector<vector<int> >  M4 = recursiveStrassen(aBottomRight , substractMatrices(bBottomLeft , bTopLeft));
        vector<vector<int> >  M5 = recursiveStrassen(sumMatrices(aTopLeft , aTopRight) , bBottomRight);
        vector<vector<int> >  M6 = recursiveStrassen(substractMatrices(aBottomLeft,aTopLeft) , sumMatrices(bTopLeft,bTopRight));
        vector<vector<int> >  M7 = recursiveStrassen(substractMatrices(aTopRight , aBottomRight) , sumMatrices(bBottomLeft,bBottomRight));

        vector<vector<int> > c11 = sumMatrices(substractMatrices(sumMatrices(M1 , M4) , M5) , M7);
        vector<vector<int> > c12 = sumMatrices(M3 , M5);
        vector<vector<int> > c21 = sumMatrices(M2 , M4);
        vector<vector<int> > c22 = sumMatrices(sumMatrices(substractMatrices(M1,M2),M3),M6);

        return joinMatrix(c11,c12,c21,c22);
    }

}

vector<vector<int> > MatrixOperations::sumMatrices(vector<vector<int> >m1,vector<vector<int> > m2){
    vector<vector<int> > result;
    for (int i = 0; i < m1.size(); i++){
        vector<int> row;
        for (int j = 0; j < m1[i].size(); j++){
            row.push_back(m1[i][j]+m2[i][j]);
        }
        result.push_back(row);
    }
    return result;
}

vector<vector<int> > MatrixOperations::substractMatrices(vector<vector<int> >m1,vector<vector<int> > m2){
    vector<vector<int> > result;
    for (int i = 0; i < m1.size(); i++){
        vector<int> row;
        for (int j = 0; j < m1[i].size(); j++){
            row.push_back(m1[i][j]-m2[i][j]);
        }
        result.push_back(row);
    }
    return result;
}

vector<vector<int> > MatrixOperations::strassenMultiplication(){
    elementaryStepsStrassen = 0;
    vector<vector<int> > res = recursiveStrassen(firstMatrix,secondMatrix) ;
    cout<<"Number of multiplications for Strassen multiplication: "<<elementaryStepsStrassen<<endl;
    return res;
}
