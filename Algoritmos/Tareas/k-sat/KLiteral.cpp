#include "KLiteral.h"

KLiteral::KLiteral(){
  variable = 0;
  isNegated = false;
}

KLiteral::KLiteral(int _variable, bool _isNegated){
    variable=_variable;
    isNegated=_isNegated;
}
