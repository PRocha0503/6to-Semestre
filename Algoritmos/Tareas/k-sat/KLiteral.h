/*
KSAT Shoning
Patricio Bosques Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

#pragma once

class KLiteral{
  public:
    int variable;
    bool isNegated = false;
    KLiteral();
    KLiteral(int _variable, bool _isNegated);
};