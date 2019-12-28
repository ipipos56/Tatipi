#include <bits/stdc++.h>

using namespace std;

int h;

int cheApl(int als)
{
    if(als >= 5 && als <= 9)
        return 1;
    else
        return 1;
}
int cheDS(char als)
{
    if(als == 'U')
        return 0;
    else if(als == 'R')
        return 1;
    else if(als == 'D')
        return 2;
    else
        return 3;
}
int staXY(int _xy, bool pal,bool pos)
{
    int _min = 0;
    int _m = 0;
    if(pos)
    {
        _min = 125;
        _m = 1;
    }
    if(!pal)
        return (_xy-_min)/250;
    else
        return h-(_xy-_min)/250-_m;
}

// 0
//3 1
// 2

int main()
{
    cin>>h;
    h = h/250+1;
    string wall[h][h]={"-1"};
    h-=1;
    int lab[h*h][h*h]={0};
    int n,k;
    cin>>n>>k;
    int alp;
    cin>>alp;
    int colVis = cheApl(alp);
    char ds;
    cin>>ds;
    int rot = cheDS(ds);
    int stX,stY,fnX,fnY;
    cin>>stX>>stY>>fnX>>fnY;
    stX = staXY(stX,false,true);
    fnX = staXY(fnX,false,true);
    fnY = staXY(fnY,true,true);
    stY = staXY(stY,true,true);
    for(int i = 0;i<n;i++)
    {
        int wasX,wafX,wasY,wafY;
        string wallCol;
        cin>>wasX>>wasY>>wafX>>wafY>>wallCol;

    }
}
