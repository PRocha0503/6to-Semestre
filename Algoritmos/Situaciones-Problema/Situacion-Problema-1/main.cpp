/*
Situación Integradora 1
Patricio Bosque Rosas: A01781663
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
    if (v.size() == 0){
        file << "The falicious code was not found in the file" << endl;
        return;
    }

    file<<"Number of times the non reversed malicious code is in the file: "<<v[0][0]<<endl;
    file<<"Number of times the reversed malicious code is in the file: "<<v[0][1]<<endl;
    file<<"Total number of times the malicious code is in the file: "<<v[0][2]<<endl;

    for (int i = 1; i < v.size(); i++){
        if (v[i][2] == 1){
            file<<"\nReversed malicious code found in:"<<endl;
            file <<"Starting Position: " << v[i][0] << " Ending Position: " << v[i][1] << endl;
        }
        else{
            file<<"\nMalicious code found in:"<<endl;
            file <<"Starting Position: " << v[i][0] << " Ending Position: " << v[i][1] << endl;
        }
        
    }
    file.close();
    cout<<"Results written successfully in file: "<<fileName<<endl;
}

void printVector(vector<vector<int>> v){

    if (v.size() == 0){
        cout << "The falicious code was not found in the file" << endl;
        return;
    }

    cout<<"Number of times the non reversed malicious code is in the file: "<<v[0][0]<<endl;
    cout<<"Number of times the reversed malicious code is in the file: "<<v[0][1]<<endl;
    cout<<"Total number of times the malicious code is in the file: "<<v[0][2]<<endl;

    for (int i = 1; i < v.size(); i++){
        if (v[i][2] == 1){
            cout<<"\nReversed malicious code found in:"<<endl;
            cout<<"Starting Position: " << v[i][0] << " Ending Position: " << v[i][1] << endl;
        }
        else{
            cout<<"\nMalicious code found in:"<<endl;
            cout <<"Starting Position: " << v[i][0] << " Ending Position: " << v[i][1] << endl;
        }
    }
    cout << endl;
}

int main(){

    //Quick test
    ZFunction zFunctionQ("Tests/quickTransmissionTest.txt","Tests/quickTest.txt");
    vector<vector<int>>zFunctionResultQ= zFunctionQ.zFunctionKMP();
    printVectorToFile(zFunctionResultQ, "Tests/quickTest-Result.txt");

    //First file
    ZFunction zFunction("Tests/transmission.txt","Tests/mcode1.txt");
    vector<vector<int>>zFunctionResult= zFunction.zFunctionKMP();
    printVectorToFile(zFunctionResult, "Tests/mcode1-Result.txt");

    //Second file
    ZFunction zFunction2("Tests/transmission.txt", "Tests/mcode2.txt");
    vector<vector<int>> zFunctionResult2 = zFunction2.zFunctionKMP();
    printVectorToFile(zFunctionResult2, "Tests/mcode2-Result.txt");
    
    //Third file
    ZFunction zFunction3("Tests/transmission.txt", "Tests/mcode3.txt");
    vector<vector<int>> zFunctionResult3 = zFunction3.zFunctionKMP();
    printVectorToFile(zFunctionResult3, "Tests/mcode3-Result.txt");
    

    return 0;
}