#include "ZFunction.cpp"

void printVectorToFile(vector<int> v, string fileName){
    ofstream file;
    file.open(fileName);
    if (!file.is_open()){
        cout << "Error opening file" << endl;
        return;
    }
    for (int i = 0; i < v.size(); i++){
        if (i == v.size() - 1){
            file << v[i];
        }
        else{
            file << v[i] << ",";
        }
    }
    file.close();
    cout<<"Results written successfully in file: "<<fileName<<endl;
}

void printVector(vector<int> v){
    for (int i = 0; i < v.size(); i++){
        cout << v[i] << " ";
    }
    cout << endl;
}

int main(){

    //First file
    ZFunction zFunction;
    zFunction.readFromFile("Tests/Z function-Test01.csv");
    vector<int>zFunctionResult= zFunction.calculateZFunction();
    printVectorToFile(zFunctionResult, "Tests/Z function-Test01-Result.csv");

    //Second file
    ZFunction zFunction2;
    zFunction2.readFromFile("Tests/Z function-Test02.csv");
    vector<int>zFunctionResult2= zFunction2.calculateZFunction();
    printVectorToFile(zFunctionResult, "Tests/Z function-Test02-Result.csv");
    

    //Third file
    ZFunction zFunction3;
    zFunction3.readFromFile("Tests/Z function-Test03.csv");
    vector<int>zFunctionResult3= zFunction3.calculateZFunction();
    printVectorToFile(zFunctionResult, "Tests/Z function-Test03-Result.csv");
    

    return 0;
}