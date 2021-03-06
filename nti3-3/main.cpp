#include <bits/stdc++.h>

using namespace std;

#define float double
#define int long long

int h;
int colVis;
map<pair<int,int>,int> wall;
map<pair<int,int>,int>::iterator it;
int rot = -1;
map<int,string> ma;
map<int,string>::iterator mit;

int previs=0;
int curVis= -1;
int prib=0;

int couColor = 2;

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
    //return 5;
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

int colors(int _point)
{
    if(rot == 0)
        prib = h*-1;
    else if(rot == 1)
        prib = 1;
    else if(rot == 2)
        prib = h;
    else if(rot == 3)
        prib = -1;

    for(int _i = 0;_i<colVis;_i++)
    {
        //cout<<curVis<<" ";
        int che = false;
        int pu = _point + (prib * _i);
        if(rot == 1)
        {
            if(pu < (((int)_point/h) + 1)*h)
                che = true;
            else
                break;
        }
        else if(rot == 3)
        {
            if(pu > ((int)_point/h)*h - 1)
                che = true;
            else
                break;
        }
        else if(rot == 0)
        {
            if(pu >= _point%h)
                che = true;
            else
                break;
        }
        else if(rot == 2)
        {
            //cout<<"Colors2 ";
            if(pu <= _point % h + (h*h-h))
                che = true;
            else
                break;
            //cout<<che<<" "<<pu<<" "<<wall[pu][rot]<<endl;
        }
        //cout<<pu<<" "<<rot<<endl;
        it = wall.find(make_pair(pu,rot));
        if(it != wall.end())
        {
            if(it->second != curVis )
            {
                //cout<<pu<<" "<<rot<<" ";
                curVis = it->second;
                if(curVis != 0 && curVis != -1 && che)
                {
                    cout<<ma[curVis];
                    cout<<" ";
                }
               //cout<<endl;
                break;
            }
            else
                break;
        }
    }
    return 0;
}

int turn(int _poi,int _ang)
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
        for(int _i = h-1;_i<=h*h-1;_i+=h)
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

main()
{
    //freopen("input.txt","r",stdin);
    cin>>h;
    h = h/250;
    //for(int i = 0;i<3000000;i++)
     //   for(int j = 0; j<4;j++)
     //       wall[i][j] = "-1";
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
    colVis = h;
    //cout<<colVis<<endl;
    //cout<<stX<<" "<<stY<<" "<<fnX<<" "<<fnY<<endl;
    ma[0] = "FFFFFF";
    ma[1] = "000000";
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
        wall[make_pair(i,2)] = 0;
        wall[make_pair(i+1,2)] = 0;
    }

    for(int i = h-1;i<h*h-1;i+=h)
    {
        lab[i][2] = true;
        lab[i+h][0] = true;
        wall[make_pair(i,1)] = 0;
        wall[make_pair(i+h,1)] = 0;
    }

    for(int i = 0;i<h;i++)
        wall[make_pair(i,0)] = 0;

    for(int i = 0;i<=h*h-h;i+=h)
        wall[make_pair(i,3)] = 0;

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
        wafY = staXY(wafY,true,false);//ff
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
        //cout<<wasX<<" "<<wasY<<" "<<wafX<<" "<<wafY<<endl;
        if(wasX == wafX)
        {
            int ma = min(wasY,wafY);
            int maa = max(wasY,wafY);
            for(int j = ma;j<maa;j++)
            {
                wall[make_pair(wasX + j * h,3)] = ins;
                wall[make_pair(h * j + wasX - 1,1)] = ins;
                lab[wasX + j * h][3] = false;
                lab[h * j + wasX - 1][1] = false;
            }
            //cout<<1<<endl;
        }
        else if(wasY == wafY)
        {
            int ma = min(wasX,wafX);
            int maa = max(wasX,wafX);
            for(int j = ma;j<maa;j++)
            {
                wall[make_pair(h * wasY + j,0)] = ins;
                wall[make_pair(h * (wasY-1) + j,2)] = ins;
                lab[h * wasY + j][0] = false;
                lab[h * (wasY-1) + j][2] = false;
                //cout<<h * wasY + j<<" "<<(h-1) * wasY + j<<endl;
            }
            //cout<<h<<" "<<wasY<<" "<<h * wasY<<endl;
            //cout<<2<<" "<<ma<<" "<<maa<<endl;
        }
        //cout<<wasX<<" "<<wasY<<" "<<wafX<<" "<<wafY<<endl;
    }
    //cout<<lab[14][3]<<endl;

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

    bool alis[k][3];
    int comAl[k];
    for(int i = 0;i<k;i++)
    {
        int s1,s2,s3;
        cin>>s1>>s2>>s3;
        if(s1 == 1)
            alis[i][0] = false;
        else
            alis[i][0] = true;
        if(s2 == 1)
            alis[i][1] = false;
        else
            alis[i][1] = true;
        if(s3 == 1)
            alis[i][2] = false;
        else
            alis[i][2] = true;

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
            for(int a = 0;a<3;a++)
            {
                int curRota = a+q-1;
                if(curRota > 3)
                    curRota-=4;
                if(curRota < 0)
                    curRota+=4;
                if(curRota > 3)
                    curRota-=4;
                if(curRota < 0)
                    curRota+=4;
                if(lab[i][curRota] == alis[0][a] && i != stY * h + stX)
                    sumAl++;
            }
            if(sumAl == 3)
            {
                //cout<<i<<endl;
                pointAL = i;
                napAl = q;
                for(int s = 1;s<k;s++)
                {
                    //cout<<pointAL<<endl;
                    if(comAl[s-1] == 0)
                    {
                        int svi = 0;
                        svi = turn(pointAL,napAl);
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
                    for(int a = 0;a<3;a++)
                    {
                        int curRota = a + napAl - 1;
                        if(curRota > 3)
                            curRota-=4;
                        if(curRota < 0)
                            curRota+=4;
                        if(curRota > 3)
                            curRota-=4;
                        if(curRota < 0)
                            curRota+=4;
                        if(lab[pointAL][curRota] == alis[s][a] && pointAL != stY * h + stX)
                            sumAl++;
                    }
                    if(sumAl != 3)
                        break;
                    else if(s == k-1)
                    {
                        int lastCheck = false;
                        if(comAl[k-1] == 0)
                        {
                            int svi = 0;
                            svi = turn(pointAL,napAl);
                            if(svi != 0)
                            {
                                pointAL+=svi;
                                lastCheck = true;
                            }
                        }
                        else
                            lastCheck = true;
                        if(lastCheck)
                        {
                            full = true;
                            break;
                        }
                    }
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

    //cout<<pointAL<<endl;

    lab[pointAL][0] = false;
    lab[pointAL][1] = false;
    lab[pointAL][2] = false;
    lab[pointAL][3] = false;


    for(int i = 0;i<4;i++)
    {
        it = wall.find(make_pair(pointAL,i));
        if(it == wall.end())
            wall[make_pair(pointAL,i)] = 1;
    }

    it = wall.find(make_pair(pointAL+h,0));
    if(pointAL < h*h-h && it == wall.end())
        wall[make_pair(pointAL + h,0)] = 1;

    it = wall.find(make_pair(pointAL - 1,1));
    che = false;
    for(int i = 0;i<=h*h-h;i+=h)
        if(i == pointAL)
            che = true;
    if(!che && it == wall.end())
        wall[make_pair(pointAL - 1,1)] = 1;

    it = wall.find(make_pair(pointAL - h,2));
    if(pointAL > h-1 && it == wall.end())
        wall[make_pair(pointAL - h,2)] = 1;

    it = wall.find(make_pair(pointAL + 1,3));
    che = false;
    for(int i = h-1;i<=h*h-1;i+=h)
        if(i == pointAL)
            che = true;
    if(!che && it == wall.end())
        wall[make_pair(pointAL + 1,3)] = 1;


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
        dis[i]= 1000000000;
        vis[i] = false;
        par[i] = make_pair(-1,-1);
    }
    //cout<<lab[14][3]<<" "<<lab[13][3]<<" "<<pointAL<<endl;

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
            if(lab[vert][i] && !vis[vert + harb] && dis[vert + harb] > dis[vert] + pri && vert != pointAL && vert + harb != pointAL && harb != 0)
            {
                dis[vert + harb] = dis[vert] + pri;
                par[vert + harb] = make_pair(vert,i);
                q.push(vert + harb);
            }
        }
    }


    //cout<<endl;
    //cout<<dis[13]<<" "<<dis[9]<<" "<<dis[5]<<" "<<dis[14]<<endl;

    int para = fnY * h + fnX;
    q.push(para);

    while(par[para].first != -1)
    {
        para = par[para].first;
        q.push(para);
    }

    previs = q.top();
    q.pop();
    curVis = -1;
    prib = 0;
    //cout<<previs<<endl;
    colors(previs);

    //for(int i = 0;i<h*h;i++)
    //    cout<<wall[i][0]<<" "<<wall[i][1]<<" "<<wall[i][2]<<" "<<wall[i][3]<<endl;

    //cout<<wall[77][0]<<" "<<wall[77][1]<<" "<<wall[77][2]<<" "<<wall[77][3]<<endl;

   // cout<<"____________________________________________________"<<endl;

    while(!q.empty())
    {
        int cur = q.top();
        //cout<<endl;
        //cout<<previs<<" "<<cur<<endl;
        //cout<<dis[cur]<<" "<<dis[previs]<<endl;
        //cout<<q.top()<<" "<<rot<<endl;

        q.pop();
        if(abs(dis[cur]-dis[previs]) == 3)
        {
            for(int j = 0;j<2;j++)
            {
                rot++;
                if(rot > 3)
                    rot-=4;

                colors(previs);
            }
        }
        else if(abs(dis[cur]-dis[previs]) == 2)
        {
            if(rot == 0 || rot == 1)
            {
                //cout<<endl;
                //cout<<"+1"<<endl;
                if(cur - previs > 0)
                    rot++;
                else if(cur - previs < 0)
                    rot--;
                //cout<<rot<<endl;
            }
            else if(rot == 2 || rot == 3)
            {
                if(cur - previs > 0)
                    rot--;
                else if(cur - previs < 0)
                    rot++;
            }
            if(rot > 3)
                rot-=4;
            if(rot < 0)
                rot+=4;

            colors(previs);
        }
        //cout<<rot<<endl;
        colors(cur);
        previs = cur;
    }

    //cout<<curVis<<endl;
   colors(previs);
}
