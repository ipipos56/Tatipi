#include <bits/stdc++.h>

using namespace std;

int h;
int waCur[4];

int cheApl(int als)
{
    if(als >= 5 && als <= 9)
        return 1;
    else
        return 1;
}

int cheDS(char als)
{
    if(als == 'U' || als == 'F')
        return 0;
    else if(als == 'R')
        return 1;
    else if(als == 'D')
        return 2;
    else
        return 3;
}

int turn(int _poi,int _ang,int _tur)
{
    if(_tur == 0)
    {
        if(_ang == 0)
        {
            if(_poi < h)
                return 0;
            else
                return h*-1;
        }
        else if(_ang == 2)
        {
            if(_poi >= h*h-h)
                return 0;
            else
                return h;
        }
        else if(_ang == 3)
        {
            bool ma = false;
            for(int _i = 0;_i<=h*h-h;_i+=h)
            {
                if(_i == _poi)
                {
                    ma=true;
                    break;
                }
            }
            if(ma)
                return 0;
            else
                return -1;
        }
        else if(_ang == 1)
        {
            bool ma = false;
            for(int _i = h-1;_i<=h*h;_i+=h)
            {
                if(_i == _poi)
                {
                    ma=true;
                    break;
                }
            }
            if(ma)
                return 0;
            else
                return 1;
        }
    }
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
    int lab[h*h][4];
    for(int i = 0;i<h*h;i++)
        for(int j = 0; j<4;j++)
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
    //cout<<stX<<" "<<stY<<" "<<fnX<<" "<<fnY<<endl;
    for(int i = 0;i<h-1;i++)
    {
        for(int j = 0;j<h-1;j++)
        {
            lab[i*h+j][1] = true;
            lab[i*h+j+1][3] = true;
            lab[i*h+j+h][0] = true;
            lab[i*h+j][2] = true;
        }
    }
    for(int i = h*h-h;i<h*h-1;i++)
    {
        lab[i][1] = true;
        lab[i+1][3] = true;
    }

    for(int i = h-1;i<h*h-1;i+=h)
    {
        lab[i][2] = true;
        lab[i+h][0] = true;
    }

/*
    for(int i = 0;i<h*h;i++)
    {
        for(int j = 0; j<4;j++)
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
                lab[wasX + j * h][3] = false;
                lab[h * j + wasX - 1][1] = false;
            }
            //cout<<1<<endl;
        }
        else if(wasY == wafY)
        {
            int ma = min(wasX,wafX);
            int maa = max(wasX,wafX);
            for(int j = ma;j<=maa;j++)
            {
                wall[wasY][j] = colWa;
                lab[h * wasY + j][0] = false;
                lab[h * (wasY-1) + j][2] = false;
                //cout<<h * wasY + j<<" "<<(h-1) * wasY + j<<endl;
            }
            //cout<<h<<" "<<wasY<<" "<<h * wasY<<endl;
            //cout<<2<<" "<<ma<<" "<<maa<<endl;
        }
        //cout<<wasX<<" "<<wasY<<" "<<wafX<<" "<<wafY<<endl;
    }

    int labST[h*h][4];
    for(int i = 0;i<h*h;i++)
        for(int j = 0; j<4;j++)
            labST[i][j] = lab[i][j];

    lab[stY * h + stX][0] = false;
    lab[stY * h + stX][1] = false;
    lab[stY * h + stX][2] = false;
    lab[stY * h + stX][3] = false;


    bool che = false;
    for(int i = h-1;i<=h*h-1;i+=h)
        if(i == stY * h + stX)
            che = true;
    if(!che)
        lab[stY * h + stX + 1][3] = false;

    che = false;
    for(int i = 0;i<=h*h-h;i+=h)
        if(i == stY * h + stX)
            che = true;
    if(!che)
        lab[stY * h + stX - 1][1] = false;

    if(stY * h + stX < h*h-h)
        lab[stY * h + stX + h][0] = false;
    if(stY * h + stX > h)
        lab[stY * h + stX - h][2] = false;

  /*  for(int i = 0;i<h*h;i++)
    {
        for(int j = 0; j<4;j++)
            cout<<lab[i][j]<<" ";
        cout<<endl;
    }
*/
    //cout<<lab[8][12]<<" "<<lab[12][8]<<endl;

    int alis[k][3];
    int comAl[k];
    for(int i = 0;i<k;i++)
    {
        cin>>alis[i][0]>>alis[i][1]>>alis[i][2];
        char co;
        cin>>co;
        comAl[i] = cheDS(co);
    }

    int napAl= -1;
    int pointAL = -1;
    bool full = false;

    int inNp = -1;
    int inPo = -1;

    for(int i = 0;i<h*h;i++)
    {
        for(int q = 0;q<4;q++)
        {
            int sumAl = 0;
            for(int a = 0;a<4;a++)
            {
                int curRota = a+q;
                if(curRota > 3)
                    curRota-=4;
                if(lab[i][curRota] != alis[0][a] && i != stY * h + stX)
                    sumAl++;
            }
            if(sumAl == 4)
            {
                pointAL = i;
                napAl = q;
                inNp = napAl;
                inPo = pointAL;
                for(int s = 1;s<k;s++)
                {
                    //cout<<pointAL<<endl;
                    if(comAl[s-1] == 0)
                    {
                        int svi = 0;
                        svi = turn(pointAL,napAl,comAl[s-1]);
                        if(svi != 0)
                            pointAL+=svi;
                        else
                            break;
                    }
                    else if(comAl[s-1] == 1)
                    {
                       napAl++;
                       if(napAl > 3)
                        napAl-=4;
                    }
                    else if(comAl[s-1] == 3)
                    {
                        napAl--;
                        if(napAl < 0)
                            napAl+=4;
                    }

                    sumAl = 0;
                    for(int a = 0;a<4;a++)
                    {
                        int curRota = a + napAl;
                        if(curRota > 3)
                            curRota-=4;
                        if(lab[pointAL][curRota] != alis[s][a] && pointAL != stY * h + stX)
                            sumAl++;
                    }
                    if(sumAl != 4)
                        break;
                    else if(s == k-1)
                        full = true;
                    //cout<<full<<endl;
                }
            }
            if(full)
                break;
        }
        if(full)
            break;
    }
    if(full)
        cout<<inNp<<" "<<inPo<<endl;

    for(int i = 0;i<h*h;i++)
        for(int j = 0; j<4;j++)
            lab[i][j] = labST[i][j];

    int dis[h*h];
    bool vis[h*h];
    pair<int,int> par[h*h];
    queue<int> q;

    for(int i = 0;i<h*h;i++)
    {
        dis[i]= 10000000;
        vis[i] = false;
        par[i] = make_pair(-1,-1);
    }

    vis[stY * h + stX] = true;
    dis[stY * h + stX] = 0;
    par[stY * h + stX] = make_pair(-1,rot);
    q.push(stY * h + stX);

    while(!q.empty())
    {
        int vert = q.front();
        q.pop();

        for(int i = 0;i<4;i++)
        {
            int harb = 0;
            if(i == 0)
                harb = h*-1;
            else if(i == 1)
                harb = 1;
            else if(i == 2)
                harb = h;
            else if(i == 3)
                harb = -1;

            int pri = abs(par[vert].second - i);
            if( pri == 1 || pri == 3)
                pri = 2;
            else if(pri == 2)
                pri = 3;
            else if(pri == 0)
                pri = 1;
            if(lab[vert][i] && !vis[vert + harb] && dis[vert + harb] > dis[vert] + pri)
            {
                dis[vert + harb] = dis[vert] + pri;
                par[vert + harb] = make_pair(vert,i);
            }
        }
    }
}
