/*
Situación Integradora 2
Patricio Bosque Rosas: A01781663
Pablo Rocha Ojeda: A01028638
Luis Javier Karam Galland: A01751941
Miguel Arriaga Velasco: A01028570
*/

class HeapInfo{
    public:
        int weight;
        int node;
        int parent;
        HeapInfo(int,int,int);
        HeapInfo();
        bool operator < (HeapInfo const &obj) const;
        bool operator > (HeapInfo const &obj) const;
};