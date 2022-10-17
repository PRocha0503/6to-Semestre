#pragma once

class KLiteral{
  public:
    int variable;
    bool isNegated = false;
    KLiteral();
    KLiteral(int _variable, bool _isNegated);
};