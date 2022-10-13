#include "KSAT.h"

KSAT::KSAT(string fileName){
    failedConstraints = vector<vector<KLiteral>>();
    numOfVariables=0;
    readFromFile(fileName);
}

KSAT::KSAT(int _nVariables,vector<vector<int>> _const){
  numOfVariables = _nVariables;
  for(int i = 0;i<_const.size();i++){
    vector<KLiteral> temp = <vector<KLiteral>();
    for(int j = 0;k<_const[i].size();j++){
        if(_const[i][j]>0){
          temp.push_back(KLiteral(_const[i][j],false));
        }else{
temp.push_back(KLiteral(_const[i][j],true));
        }

    }
    constraints.push_back(temp)
  }
}

void KSAT::readFromFile(string fileName){
  ifstream file;
  bool matchedNumOfVariables = false;

  file.open(fileName);
  if (!file){
    cout << "Could not read file" << endl;
    return;
  }

  smatch match;
  string line;
  while(getline(file, line)){
    if (regex_match(line, match,"/([0-9]+)(?!cnf )(?= [0-9]+)/") && !matchedNumOfVariables){
      numOfVariables = stoi(match[0].str());
      matchedNumOfVariables = true;
    }
    else if ()

  }

  int line1;
  file.close();
}


map<int, bool> KSAT::Shoning(){
    makeRandomVariables();
    for(int i = 0; i<(numOfVariables*3);i++){
        if (evaluateClauses()){
          //Encontramos el resultado
          cout<<"RESULT FOUND"<<endl;
          printVariables();
          return variables;
        }
        else{
          //No encontramos el resultado aún
          int failedLiteral=getRandomFailedLiteral();
          flipLiteral(failedLiteral);
        }
    }
    cout<<"RESULT NOT FOUND"<<endl;
    return variables;
}

void KSAT::printVariables(){
  for(auto i = variables.cbegin(); i != variables; i++){
    cout << i->first << i->second << endl;
  }
}

void KSAT::makeRandomVariables(){
    //Por cada variable hacer su valor random
    for (int i=0;i<numOfVariables;i++){
      auto gen = bind(uniform_int_distribution<>(0,1),default_random_engine());
      variables[i] = gen();
    }
}

int KSAT::getRandomFailedLiteral(){
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> distr(0, failedConstraints.size());
    vector<KLiteral> randomConstraint = failedConstraints[distr(gen)];
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> distr(0, randomConstraint.size());
    KLiteral randomLiteral = randomConstraint[distr(gen)];
    return randomLiteral.variable;
}

void KSAT::flipLiteral(int i){
    variables[i]=!variables[i];
}

bool KSAT::evaluateClauses(){
  bool accumulatedResult=true;
  for (int i=0;i<constraints.size();i++){
    for (int j=0;j<constraints[i].size();j++){
      KLiteral literal = constraints[i][j];
      bool valueOfLiteral=false;
        if (literal.isNegated){
            valueOfLiteral=!variables[literal.variable];
        }
        else{
            valueOfLiteral=variables[literal.variable];
        }
        if (valueOfLiteral){
          continue;
        }
        else{
            failedConstraints.push_back(constraints[i]);
            accumulatedResult = false;
        }
    }
  }
  return accumulatedResult;
}

