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
    freopen("input.txt","r",stdin);
    cin>>h;
    h = h/250+1;
    string wall[h][h];
    for(int i = 0;i<h;i++)
        for(int j = 0; j<h;j++)
            wall[i][j] = "-1";
    h-=1;
    bool lab[h*h][h*h];
    for(int i = 0;i<h*h;i++)
        for(int j = 0; j<h*h;j++)
            lab[i][j] = false;
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
    for(int j = 0;j<h-1;j++)
    {
        for(int i = j*h;i<j*h + h-1;i++)
        {
            lab[i][i+1] = true;
            lab[i+1][i] = true;
            lab[i+h][i] = true;
            lab[i][i+h] = true;
        }
    }
    for(int i = h*h-h;i<h*h-1;i++)
    {
        lab[i][i+1] = true;
        lab[i+1][i] = true;
    }

    /*
    for(int i = 0;i<h*h;i++)
    {
        for(int j = 0; j<h*h;j++)
            cout<<lab[i][j]<<" ";
        cout<<endl;
    }
    cout<<endl;

    */
    //cout<<stX<<" "<<stY<<" "<<fnX<<" "<<fnY<<endl;
    for(int i = 0;i<n;i++)
    {
        int wasX,wafX,wasY,wafY;
        string colWa;
        cin>>wasX>>wasY>>wafX>>wafY>>colWa;
        wasX = staXY(wasX,false,false);
        wafX = staXY(wafX,false,false);
        wafY = staXY(wafY,true,false);
        wasY = staXY(wasY,true,false);
        //cout<<wasX<<" "<<wasY<<" "<<wafX<<" "<<wafY<<endl;
        if(wasX == wafX)
        {
            int ma = min(wasY,wafY);
            int maa = max(wasY,wafY);
            for(int j = ma;j<maa;j++)
            {
                wall[j][wasX] = colWa;
                lab[wasX + j * h][(h+1) * j] = false;
                lab[(h+1) * j][wasX + j * h] = false;
            }
        }
        else if(wasY == wafY)
        {
            int ma = min(wasX,wafX);
            int maa = max(wasX,wafX);
            for(int j = ma;j<maa;j++)
            {
                wall[wasY][j] = colWa;
                lab[h * j+wasX][h * j+wasX+1] = false;
                lab[h * j+wasX+1][h * j+wasX] = false;
            }
        }
        //cout<<wasX<<" "<<wasY<<" "<<wafX<<" "<<wafY<<endl;
    }

/*
    for(int i = 0;i<h*h;i++)
    {
        for(int j = 0; j<h*h;j++)
            cout<<lab[i][j]<<" ";
        cout<<endl;
    }

*/

    for(int i = 0;i<h*h;i++)
    {
        int waCur[4];
        if(i%h != 0)
            waCur[0] =
        for(int j = 0;j<4;j++)
        {
            lab[(int)i/h][i%h];

        }
    }
}
