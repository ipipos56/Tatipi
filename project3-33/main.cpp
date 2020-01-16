#include <bits/stdc++.h>

using namespace std;

map<int,string> ma;
map<int,string>:: iterator mit;

int couColor = 1;

int main()
{
    freopen("input.txt","r",stdin);

    int circ[627];
    double cirR[627];
    for(int i = 0;i<627;i++)
    {
        circ[i] = 100000000;
        cirR[i] = -1;
    }

    int l,n;
    float al;
    cin>>l>>n>>al;
    int alp=100 * al;
    char ds;
    cin>>ds;
    int pX,pY;
    float bet;
    cin>>pX>>pY>>bet;
    int beta=bet * 100;
    int visn = 0;
    for(int i = 0;i<n;i++)
    {
        string colWa;
        int wasX,wasY,wafX,wafY;
        cin>>wasX>>wasY>>wafX>>wafY;
        cin>>colWa;
        int k;
        double ras;

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


        if(ds == 'R')
        {
            wasX-=pX;
            wafX-=pX;
            wafY-=pY;
            wasY-=pY;
        }
        else if(ds == 'L')
        {
            wasY-=pY;
            wafY-=pY;
            wasX-=pX;
            wafX-=pX;
            wasX*=-1;
            wafX*=-1;
            visn = 314;
        }
        else if(ds == 'U')
        {
            int dt = wasX;
            int df = wafX;
            wasX = wasY - pY;
            wafX = wafY - pY;
            wasY = pX - dt;
            wafY = pX - df;
            visn = 157;
        }
        else if(ds == 'D')
        {
            int dt = wasX;
            int df = wafX;
            wasX = pY - wasY;
            wafX = pY - wafY;
            wasY = dt - pX;
            wafY = df - pX;
            visn = 471;
        }



        if(wasX == wafX)
        {
            for(int j = min(wasY,wafY);j<max(wasY,wafY);j++)
            {
                k = atan2(j,wasX) * 100;
                ras = sqrt(wasX*wasX + j*j);
                if(k > 627)
                    k-=628;
                if(k < 0)
                    k+=628;
                if(k > 627)
                    k-=628;
                if(k < 0)
                    k+=628;
                //cout<<k<<" "<<ras<<endl<<endl;
                if(circ[k] > ras)
                {
                    circ[k] = ras;
                    cirR[k] = ins;
                }
            }
        }
        else if(wasY == wafY)
        {
            for(int j = min(wasX,wafX);j<max(wasX,wafX);j++)
            {
                k = atan2(wasY,j) * 100;
                ras = sqrt(wasY*wasY + j*j);
                if(k > 627)
                    k-=628;
                if(k < 0)
                    k+=628;
                if(k > 627)
                    k-=628;
                if(k < 0)
                    k+=628;
                //cout<<k<<" "<<ras<<endl<<endl;
                if(circ[k] > ras)
                {
                    circ[k] = ras;
                    cirR[k] = ins;
                }
            }
        }
    }

    //for(int i = 0;i<628;i++)
      //  cout<<cirR[i]<<endl;

    int cur = -1;
    int ar = alp/2;

    int maa1,maa2;
    maa1 = min(visn - ar,visn + beta + ar);
    maa2 = max(visn - ar,visn + beta + ar);

    int isb = alp * 10;
    if(isb == 0)
        isb = 1;
    //isb = 1;
    //cout<<visn<<" "<<maa1<<" "<<maa2<<endl;

    int sche = 1;
    for(int i = maa1;i<maa2;i++)
    {
        int tt = i;
        if(tt > 627)
            tt-=628;
        if(tt < 0)
            tt+=628;
        if(tt > 627)
            tt-=628;
        if(tt < 0)
            tt+=628;
        int ts = cirR[tt];
        if(ts != cur && ts != -1)
        {
            cur = ts;
            //cout<<ts<<" ";
            if(ts != -1 && sche >= isb && ma[ts].length() > 0)
            {
                cout<<ma[ts]<<" ";
                sche = 1;
            }
        }
        else if(ts == cur && ts != -1)
            sche++;
    }
}
