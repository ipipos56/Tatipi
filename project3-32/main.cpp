#include <bits/stdc++.h>

using namespace std;

map<int,string> ma;
map<int,string> :: iterator mit;

int couColor = 1;
int h;

double cheDS(char _ds)
{
    if(_ds == 'U')
        return M_PI/2;
    else if(_ds == 'R')
        return 0;
    else if(_ds == 'L')
        return M_PI;
    else if(_ds == 'D')
        return ((M_PI/2) * -1);
}

int staXY(int _xy, bool pal,bool pos)
{
    int _m = 0;
    if(pos)
        _m = 1;
    if(!pal)
        return (_xy)/125;
    else
        return h-(_xy)/125-_m;
}

int main()
{
    //freopen("input.txt","r",stdin);
    int n;
    float alp;
    cin>>h>>n>>alp;
    h/=125;
    h+=2;
    int a[h][h];
    char ds;
    cin>>ds;
    double setu;
    setu = cheDS(ds);
    int pX,pY;
    cin>>pX>>pY;
    float beta;
    cin>>beta;
    pX = staXY(pX,false,true);
    pY = staXY(pY,false,true);
    for(int i = 0;i<h;i++)
        for(int j = 0;j<h;j++)
            a[i][j] = -1;

    ma[0] = "FFFFFF";

    for(int i = 0;i<h;i++)
    {
        a[i][0] = 0;
        a[0][i] = 0;
        a[h-1][i] = 0;
        a[i][h-1] = 0;
    }

    for(int i = 0;i<n;i++)
    {
        int wasX,wasY,wafX,wafY;
        cin>>wasX>>wasY>>wafX>>wafY;
        string colWa;
        cin>>colWa;

        wasX = staXY(wasX,false,false);
        wafX = staXY(wafX,false,false);
        wafY = staXY(wafY,true,false);
        wasY = staXY(wasY,true,false);

        int ins = 0;
        for(mit = ma.begin(); mit!=ma.end();mit++)
            if(mit->second == colWa)
                ins = mit->first;
        if(ins == 0)
        {
            ma[couColor] = colWa;
            ins = couColor;
            couColor++;
        }

        if(wasX == wafX)
        {
            int ma = min(wasY,wafY);
            int maa = max(wasY,wafY);
            for(int j = ma;j<maa;j++)
                a[j][wasX] = ins;
        }
        else if(wasY == wafY)
        {
            int ma = min(wasX,wafX);
            int maa = max(wasX,wafX);
            for(int j = ma;j<maa;j++)
                a[wasY][j] = ins;
        }
    }

/*
    for(int i = 0;i<h;i++)
    {
        for(int j = 0;j<h;j++)
            cout<<a[i][j]<<" ";
        cout<<endl;
    }
*/

    int curColor = -1;
    //cout<<endl;
    for(double k = setu - alp/2; k<setu+beta;k+=alp/2)
    {
        for(int i = pX;i<h;i++)
        {
            int y = i * tan(k) + pY;
            if(y < h && y >= 0)
            {
                if(a[y][i] != -1)
                {
                    int tt = a[y][i];
                    if(tt < couColor && tt != curColor )
                    {
                        curColor = tt;
                        if(ma[tt] != "FFFFFF")
                            cout<<ma[tt]<<" ";
                    }
                    break;
                }
            }
        }
    }
}
