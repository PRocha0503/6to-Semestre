/*
KSAT Shoning
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#include "KLiteral.h"

KLiteral::KLiteral(){
  variable = 0;
  isNegated = false;
}

KLiteral::KLiteral(int _variable, bool _isNegated){
    variable=_variable;
    isNegated=_isNegated;
}
