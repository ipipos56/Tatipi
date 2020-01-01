#include <bits/stdc++.h>

using namespace std;

int h;
int colVis;
string wall[1000000][4];
int rot = -1;

int previs=0;
string curVis="-1";
int prib=0;


int cheApl(int _n, int _a)
{
    float a1;
    a1=_a*float(M_PI/180.0);
    float hh1=_n*250.0;
    //a=float(a*180.0/M_PI);
    float ah=sqrt(250.0*250.0+hh1*hh1);
    float bh=tan(float(a1/2.0))*ah  ;
    float hba1=90.0+float(_a/2);
    float bha1=180-(90+atan2(250.0,hh1)*180.0/M_PI);
    float ba1h=float((180-bha1-hba1)*M_PI/180.0);
    hba1=hba1*float(M_PI/180.0);
    float a1h=bh*sin(hba1)/sin(ba1h);
    return (250*_n+a1h) / 250;

    // ≈сли здесь поставить return 1, то заходит 2 теста
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

int colors()
{
    for(int _i = 0;_i<colVis;_i++)
    {
        //cout<<curVis<<" ";
        int che = false;
        int pu = previs + (prib * _i);
        if(rot == 1)
        {
            if(pu < (((int)previs/h) + 1)*h)
                che = true;
            else
                break;
        }
        else if(rot == 3)
        {
            if(pu > ((int)previs/h)*h - 1)
                che = true;
            else
                break;
        }
        else if(rot == 0)
        {
            if(pu >= previs%h)
                che = true;
            else
                break;
        }
        else if(rot == 2)
        {
            if(pu <= previs % h + (h*h-h))
                che = true;
            else
                break;
        }
        //cout<<wall[pu][rot]<<" "<<pu<<" "<<rot<<endl;
        if(wall[pu][rot] != curVis && wall[pu][rot] != "-1" && che)
        {
            curVis = wall[pu][rot];
           //cout<<"____________"<<endl;
           if(curVis != "FFFFFF" && curVis != "")
           {
            cout<<curVis;
            cout<<" ";
           }
           // cout<<"______________"<<endl;
            break;

        }
    }
    return 0;
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
    for(int i = 0;i<1000000;i++)
        for(int j = 0; j<4;j++)
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
    char ds;
    cin>>ds;
    rot = cheDS(ds);
    int stX,stY,fnX,fnY;
    cin>>stX>>stY>>fnX>>fnY;
    stX = staXY(stX,false,true);
    fnX = staXY(fnX,false,true);
    fnY = staXY(fnY,true,true);
    stY = staXY(stY,true,true);
    int cn = 0;
    if(rot == 0)
        cn = stY;
    else if(rot == 3)
        cn = stX;
    else if(rot == 1)
        cn = h - stX - 1;
    else if(rot == 2)
        cn = h - stY - 1;
    colVis = cheApl(cn,alp);
    //cout<<colVis<<endl;
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
        wall[i][2] = "FFFFFF";
        wall[i+1][2] = "FFFFFF";
    }

    for(int i = h-1;i<h*h-1;i+=h)
    {
        lab[i][2] = true;
        lab[i+h][0] = true;
        wall[i][1] = "FFFFFF";
        wall[i+h][1] = "FFFFFF";
    }

    for(int i = 0;i<h;i++)
        wall[i][0] = "FFFFFF";

    for(int i = 0;i<=h*h-h;i+=h)
        wall[i][3] = "FFFFFF";

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
                wall[wasX + j * h][3] = colWa;
                wall[h * j + wasX - 1][1] = colWa;
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
                wall[h * wasY + j][0] = colWa;
                wall[h * (wasY-1) + j][2] = colWa;
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
    //if(full)
     //   cout<<<<" "<<inPo<<endl;

    for(int i = 0;i<h*h;i++)
        for(int j = 0; j<4;j++)
            lab[i][j] = labST[i][j];

    lab[pointAL][0] = false;
    lab[pointAL][1] = false;
    lab[pointAL][2] = false;
    lab[pointAL][3] = false;

    if(wall[pointAL][0] == "-1")
        wall[pointAL][0] = "000000";
    if(wall[pointAL][1] == "-1")
        wall[pointAL][1] = "000000";
    if(wall[pointAL][2] == "-1")
        wall[pointAL][2] = "000000";
    if(wall[pointAL][3] == "-1")
        wall[pointAL][3] = "000000";

    if(pointAL < h*h-h)
        wall[pointAL + h][0] = "000000";

    che = false;
    for(int i = 0;i<=h*h-h;i+=h)
        if(i == pointAL)
            che = true;
    if(!che)
        wall[pointAL - 1][1] = "000000";

    if(pointAL > h-1)
        wall[pointAL - h][2] = "000000";

    che = false;
    for(int i = h-1;i<=h*h-1;i+=h)
        if(i == pointAL)
            che = true;
    if(!che)
        wall[pointAL + 1][3] = "000000";


    che = false;
    for(int i = h-1;i<=h*h-1;i+=h)
        if(i == pointAL)
            che = true;
    if(!che)
        lab[pointAL + 1][3] = false;

    che = false;
    for(int i = 0;i<=h*h-h;i+=h)
        if(i == pointAL)
            che = true;
    if(!che)
        lab[pointAL - 1][1] = false;

    if(pointAL < h*h-h)
        lab[pointAL + h][0] = false;
    if(pointAL > h)
        lab[pointAL - h][2] = false;

    int dis[h*h];
    bool vis[h*h];
    pair<int,int> par[h*h];
    stack<int> q;

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
        int vert = q.top();
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
            if(lab[vert][i] && !vis[vert + harb] && dis[vert + harb] > dis[vert] + pri && vert != pointAL && vert + harb != pointAL)
            {
                dis[vert + harb] = dis[vert] + pri;
                par[vert + harb] = make_pair(vert,i);
                q.push(vert + harb);
            }
        }
    }

    int para = fnY * h + fnX;
    q.push(fnY * h + fnX);
    while(par[para].first != -1)
    {
        para = par[para].first;
        q.push(para);
    }

    previs = q.top();
    q.pop();
    curVis = "-1";
    prib = 0;

    //for(int i = 0;i<h*h;i++)
    //    cout<<wall[i][0]<<" "<<wall[i][1]<<" "<<wall[i][2]<<" "<<wall[i][3]<<endl;

   // cout<<"____________________________________________________"<<endl;

    while(!q.empty())
    {
        int cur = q.top();
        //cout<<endl;
        //cout<<cur<<" "<<prev<<endl;
        //cout<<dis[cur]<<" "<<dis[prev]<<endl;
        //cout<<q.top()<<endl;
        q.pop();
        if(rot == 0)
            prib = h*-1;
        else if(rot == 1)
            prib = 1;
        else if(rot == 2)
            prib = h;
        else if(rot == 3)
            prib = -1;

        if(dis[cur]-dis[previs] == 3)
        {
            for(int j = 0;j<2;j++)
            {
                rot++;
                if(rot > 3)
                    rot-=4;

                colors();
            }
        }
        else if(dis[cur]-dis[previs] == 2)
        {
            if(rot == 0 || rot == 1)
            {
               // cout<<endl;
                //cout<<"+1"<<endl;
                if(cur - previs > 0)
                    rot++;
                else
                    rot--;
                //cout<<rot<<endl;
            }
            else if(rot == 2 || rot == 3)
            {
                if(cur - previs > 0)
                    rot--;
                else
                    rot++;
            }
            if(rot > 3)
                rot-=4;
            if(rot < 0)
                rot+=4;


            colors();
        }

        colors();
        previs = cur;
    }

    //cout<<curVis<<endl;

   colors();
}
