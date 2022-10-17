#include "KSAT.h"

KSAT::KSAT(string fileName){
    failedConstraints = vector<vector<KLiteral>>();
    numOfVariables=0;
    // readFromFile(fileName);
    FromDIMACS(fileName.c_str());
}

void KSAT::readFromFile(string fileName){
    ifstream file;

    file.open(fileName);
    if (!file.is_open()){
        cout << "Could not read file" << endl;
        return;
    }

    regex reg ("[0-9]+(?!cnf )(?=  [0-9]+)");
    vector<KLiteral> literals;
    int var = 0;
    bool negated = false;
    smatch match;
    string line = "";
    string number = "";
    bool matchedNumOfVariables = false;

    numOfVariables = 20;
    
    while(getline(file, line)){
        //while (regex_search(line, match, reg) && !matchedNumOfVariables){
        //    numOfVariables = stoi(match.str());
        //    matchedNumOfVariables = true;
        //}
        //if (!matchedNumOfVariables) continue;
        for (auto x : line){
            if (x == '0'){
                constraints.push_back(literals);
                literals.clear();
                var = 0;
                negated = false;
            }
            else if (x == ' '){
                literals.push_back(KLiteral(var, negated));
                var = 0;
                negated = false;
                literals.clear();
                number = "";
            }
            else if (x == '-')
                negated = true;
            else
                number += x;
        }
    }
    file.close();
}

void KSAT::FromDIMACS(const char * filename) {
        
  std::ifstream file(filename);
  std::string line;
  std::cout << "Parsing file " << filename << std::endl;

  // if cannot open file
  if (!file.is_open()) {
      // throw exception
      throw std::runtime_error("Cannot open file");
      return;
  }

  while (std::getline(file, line)) {
      char COMMENT_CNF = 'c';
      char PARSE_CNF =  'p';
      // trim leading whitespace
      // skip empty lines
      if (line.empty()) {
          continue;
      }

      line = line.substr(line.find_first_not_of(" \t"));

      if (line.length() == 0 || line[0] == COMMENT_CNF) {
          continue;
      } else if (line[0] == PARSE_CNF) {
          parseHeader(line);
      } else if (line[0] == '-' || line[0] > '0' && line[0] <= '9') {
          parseClause(line);
      }else if (line[0] == '0') {
          break;  // end of file
      } else {
          std::cout << "Unknown line type: " << line << " " <<  "Skipping..." << std::endl;
      }
  }
};

void KSAT::parseHeader(std::string line) {
  int numClauses;
  std::stringstream ss(line);
  std::string token;
  ss >> token;
  if (token == "p") {
      ss >> token;
      if (token == "cnf") {
          ss >> numOfVariables;
          ss >> numClauses;
          return;
      }
  }

  throw std::runtime_error("Invalid CNF file format: invalid header");
};

void KSAT::parseClause(std::string line) {
    std::stringstream ss(line);
    std::string token;
    vector<KLiteral> clause;
    while (ss >> token) {
        if (token == "0") {
            constraints.push_back(clause);
            return;
        }

        bool isNegated = token[0] == '-';
        KLiteral literal = KLiteral(std::stoull(isNegated ? token.substr(1) : token),isNegated);
        clause.push_back(literal);
    }

    throw std::runtime_error("Invalid CNF file format: clause not terminated");
};


map<int, bool> KSAT::Shoning(){
  makeRandomVariables();
  for(int i = 0; i<(numOfVariables*3);i++){
      failedConstraints= vector<vector<KLiteral>>();
      cout<<"\nITERATION "<<i<<" :"<<endl;
      printVariables(false);
      if (evaluateClauses()){
        //Encontramos el resultado
        printVariables(true);
        return variables;
      }
      else{
        //No encontramos el resultado aún
        int failedLiteral=getRandomFailedLiteral();
        flipLiteral(failedLiteral);
      }
  }
  printVariables(false);
  return variables;
}

void KSAT::printVariables(bool found){
  if (found){
    cout<<"RESULT FOUND"<<endl;
  }
  else{
    cout<<"RESULT NOT FOUND YET"<<endl;
  }
  cout<<"Tamaño: " << variables.size() <<endl;
  for(auto i = variables.begin(); i != variables.end(); i++){
    cout << i->second << " ";
  }
  cout<<endl;
}

void KSAT::makeRandomVariables(){
    //Por cada variable hacer su valor random
    for (int i=0;i<numOfVariables;i++){
      random_device rd;
      mt19937 gen(rd());
      uniform_int_distribution<> distr(0, 1);
      int random = distr(gen);
      variables[i] = random;
    }
}

void KSAT::printConstraints(){
  for (int i=0;i<constraints.size();i++){
    cout<<"Constraint:"<<endl;
    for (int j=0;j<constraints[i].size();j++){
      cout <<constraints[i][j].variable<<" ";
    }
    cout <<endl;
  }
}

int KSAT::getRandomFailedLiteral(){
    cout << "Constraints: " << constraints.size() << endl;
    cout << "Failed constraints: " << failedConstraints.size() << endl;

    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> distr(0, failedConstraints.size()-1);
    int randomIndex = distr(gen);
    vector<KLiteral> randomConstraint = failedConstraints[randomIndex];

    cout << "Random constraint: " << randomIndex << endl;
    cout << "Random constraint size: " << randomConstraint.size() << endl;
    uniform_int_distribution<> distr2(0, randomConstraint.size()-1);
    int randomIndex2 = distr2(gen);
    KLiteral randomLiteral = randomConstraint[randomIndex2];

    for (int i = 0; i < randomConstraint.size(); i++) {
      cout << randomConstraint[i].variable << " ";
    }
    
    cout << "Random literal: " << randomLiteral.variable << endl;
    return randomLiteral.variable;
}

void KSAT::flipLiteral(int i){
  variables[i]=!variables[i];
}

bool KSAT::evaluateClauses(){
  bool accumulatedResult=true;
  
  for (int i = 0; i < constraints.size();i++){
    for (int j =0; j < constraints[i].size();j++){
      // cout << i << " " << j << endl;
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
            break;
        }
    }
  }
  return accumulatedResult;
}