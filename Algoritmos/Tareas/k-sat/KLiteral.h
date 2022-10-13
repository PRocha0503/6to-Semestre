#pragma once

class KLiteral{
  public:
    int variable;
    bool isNegated;
    KLiteral();
    KLiteral(int _variable, bool _isNegated);
};