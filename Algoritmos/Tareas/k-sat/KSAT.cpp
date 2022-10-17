/*
KSAT Shoning
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "KSAT.h"

KSAT::KSAT(string fileName){
    failedConstraints = vector<vector<KLiteral>>();
    numOfVariables=0;
    filename=fileName;
    FromDIMACS(fileName.c_str());
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
    //Empty the failed constraints
    failedConstraints= vector<vector<KLiteral>>();
    if (evaluateClauses()){
      //Found solution
      printIterationsToFile(true,i);
      return variables;
    }
    else{
      //Not found solution yet
      vector <KLiteral> randomConstraint = getRandomFailedConstraint();
      int failedLiteral=getRandomFailedLiteral(randomConstraint);
      printIterationsToFile(false,i,randomConstraint,failedLiteral);
      flipLiteral(failedLiteral);
    }
  }
  printIterationsToFile(false,numOfVariables*3);
  return variables;
}

void KSAT::printIterations(bool found, int numIteration, vector <KLiteral> failedConstraint, int failedLiteral){
  //Print the iterations
  cout<<"\nITERATION "<<numIteration<<" :"<<endl;
  if (found){
    cout<<"RESULT FOUND"<<endl;
  }
  else{
    cout<<"RESULT NOT FOUND YET"<<endl;
    cout<<"Random failed constraint "<<" ";
    //If its not the final iteration, print the selected failed constraint and literal
    if (failedLiteral!=-1){
      for (int i=0; i<failedConstraint.size(); i++){
        if (failedConstraint[i].isNegated){
          cout<<"-";
        }
        cout<<failedConstraint[i].variable<<" ";
      }
      cout<<endl;
      cout << "Random literal: " << failedLiteral << endl;
    }
  }
  //Print number of failed constraints
  cout << "# Constraints: " << constraints.size() << endl;
  cout << "# Failed constraints: " << failedConstraints.size() << endl;
  //Print the variables
  for(auto i = variables.begin(); i != variables.end(); i++){
    cout << i->second << " ";
  }
  cout<<endl;
}

void KSAT::printIterationsToFile(bool found, int numIteration, vector <KLiteral> failedConstraint, int failedLiteral){
  //Create the filename from the input filename
  std::size_t foundFile = filename.find_last_of("/\\");
  string resultsFileName="result_"+filename.substr(foundFile+1);

  std::ofstream myfile;
  myfile.open (resultsFileName);
  //Print the iterations
  myfile<<"\nITERATION "<<numIteration<<" :"<<endl;
  if (found){
    myfile<<"RESULT FOUND"<<endl;
  }
  else{
    myfile<<"RESULT NOT FOUND YET"<<endl;
    myfile<<"Random failed constraint "<<" ";
    //If its not the final iteration, print the selected failed constraint and literal
    if (failedLiteral!=-1){
      for (int i=0; i<failedConstraint.size(); i++){
        if (failedConstraint[i].isNegated){
          myfile<<"-";
        }
        myfile<<failedConstraint[i].variable<<" ";
      }
      myfile<<endl;
      myfile << "Random literal: " << failedLiteral << endl;
    }
  }
  //Print number of failed constraints
  myfile << "# Constraints: " << constraints.size() << endl;
  myfile << "# Failed constraints: " << failedConstraints.size() << endl;
  //Print the variables
  for(auto i = variables.begin(); i != variables.end(); i++){
    myfile << i->second << " ";
  }
  myfile<<endl;
  myfile.close();
  //If its the final iteration
  if (found || failedLiteral==-1){
    cout<<"Results created on file "<<resultsFileName<<endl;
  }
}

void KSAT::makeRandomVariables(){
    //Make random variables
    for (int i=1;i<=numOfVariables;i++){
      random_device rd;
      mt19937 gen(rd());
      uniform_int_distribution<> distr(0, 1);
      int random = distr(gen);
      variables[i] = random;
    }
}

void KSAT::printConstraints(){
  //Print the constraints
  for (int i=0;i<constraints.size();i++){
    cout<<"Constraint:"<<endl;
    for (int j=0;j<constraints[i].size();j++){
      cout <<constraints[i][j].variable<<" ";
    }
    cout <<endl;
  }
}

vector<KLiteral> KSAT::getRandomFailedConstraint(){
  //Get random failed constraint
  random_device rd;
  mt19937 gen(rd());
  uniform_int_distribution<> distr(0, failedConstraints.size()-1);
  int randomIndex = distr(gen);
  vector<KLiteral> randomConstraint = failedConstraints[randomIndex];
  return randomConstraint;
}

int KSAT::getRandomFailedLiteral(vector<KLiteral> randomConstraint){
  //Get a random failed literal from a failed constraint
  random_device rd;
  mt19937 gen(rd());
  uniform_int_distribution<> distr2(0, randomConstraint.size()-1);
  int randomIndex2 = distr2(gen);
  KLiteral randomLiteral = randomConstraint[randomIndex2];
  return randomLiteral.variable;
}

void KSAT::flipLiteral(int i){
  //Flip the value of a literal
  variables[i]=!variables[i];
}

bool KSAT::evaluateClauses(){
  //Evaluate the constraints with the current variables
  bool accumulatedResult=true;  
  for (int i = 0; i < constraints.size();i++){
    bool valueOfClause=false;
    for (int j =0; j < constraints[i].size();j++){
      KLiteral literal = constraints[i][j];
      bool valueOfLiteral=false;
      //Check if a literal is negated
      if (literal.isNegated){
          valueOfLiteral=!variables[literal.variable];
      }
      else{
          valueOfLiteral=variables[literal.variable];
      }
      //Check if the clause is true
      if (valueOfLiteral){
        valueOfClause=true;
        break;
      }
    }
    //Check if the clause is false
    if (!valueOfClause){
      failedConstraints.push_back(constraints[i]);
      accumulatedResult = false;
    }
  }
  return accumulatedResult;
}