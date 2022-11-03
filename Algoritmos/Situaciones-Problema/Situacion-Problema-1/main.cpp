/*
ZFunction
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "ZFunction.cpp"

void printVectorToFile(vector<vector<int>> v, string fileName){
    ofstream file;
    file.open(fileName);
    if (!file.is_open()){
        cout << "Error opening file" << endl;
        return;
    }
    file<<"Number of times the malicious code is in the file: "<<v.size()<<endl;
    for (int i = 0; i < v.size(); i++){
        file<<"\nString found in:"<<endl;
        file <<"Starting Position: " << v[i][0] << " Ending Position: " << v[i][1] << endl;
    }
    file.close();
    cout<<"Results written successfully in file: "<<fileName<<endl;
}

void printVector(vector<vector<int>> v){
    for (int i = 0; i < v.size(); i++){
        cout<<"\nString found in:"<<endl;
        cout <<"Starting Position: " << v[i][0] << " Ending Position: " << v[i][1] << endl;
    }
    cout << endl;
}

int main(){

    //First file
    ZFunction zFunction("Tests/transmission.txt","Tests/mcode1.txt");
    vector<vector<int>>zFunctionResult= zFunction.calculateZFunction();
    printVectorToFile(zFunctionResult, "Tests/mcode1-Result.txt");

    //Second file
    ZFunction zFunction2("Tests/transmission.txt", "Tests/mcode2.txt");
    vector<vector<int>> zFunctionResult2 = zFunction2.calculateZFunction();
    printVectorToFile(zFunctionResult2, "Tests/mcode2-Result.txt");
    

    //Third file
    ZFunction zFunction3("Tests/transmission.txt", "Tests/mcode3.txt");
    vector<vector<int>> zFunctionResult3 = zFunction3.calculateZFunction();
    printVectorToFile(zFunctionResult3, "Tests/mcode3-Result.txt");
    

    return 0;
}