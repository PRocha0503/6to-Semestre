    regex reg ("[0-9]+(?!cnf )(?=  [0-9]+)");
    vector<Kliteral> literals;
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
                literals.push_back(Kliteral(var, negated));
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