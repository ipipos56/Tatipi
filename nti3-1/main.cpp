#include <bits/stdc++.h>

using namespace std;

#define float long double
#define int long long

float centre(float x1,float x2,float x3, float y1,float y2,float y3)
{
    float k1 = (y2-y1)/(x2-x1);
    float k2 = (y3-y2)/(y3-y2);
    float b1 = y2-k1*x2;
    float b2 = y3-k2*x3;
    float L[2][2];
    L[0][0]=(x1+x2)/2;
    L[0][1]=(y1+y2)/2;
    L[1][0]=(x3+x2)/2;
    L[1][1]=(y3+y2)/2;
    float kp1 = -1/k1;
    float kp2 = -1/k2;
    float bp1 = L[0][1]-kp1*L[0][0];
    float bp2 = L[1][1]-kp2*L[1][0];
    float xc = (bp1-bp2)/(kp2-kp1);
    float yc = kp1*xc+bp1;
    return 2*sqrt((xc-x1)*(xc-x1)+(yc-y1)*(yc-y1));
}

main()
{
    freopen("output.txt","w",stdout);
    freopen("input.txt","r",stdin);
    const float r = 90.0;
    const float t = 0.1;
    int n;
    cin>>n;


    float w=0.0,w0=0.0,u=0.0;

    float mas[n][3],xy[n][2];
    float sor[n];
    for(int i=0; i<n; i++)
    {
        cin>>mas[i][0]>>mas[i][1];
        xy[i][0]=mas[i][0]*M_PI*2*r/360;
        sor[i]=mas[i][1];
    }
    //for(int i=0; i<n; i++)
     // cout<<(int)sor[i]<<endl;

    sort(sor,sor+n);
    int med = sor[n/2];
    for(int i = 0;i<n-1;i++)
    {
        if(abs(mas[i][1] - med) > 1000)
            mas[i][1] = 3700.0;
        if(abs(mas[i][1] - mas[i+1][1]) > 150)
            mas[i][1] = mas[i+1][1];
    }

    for(int j=0;j<5;j++)
    {
        xy[0][1] = mas[0][1];
        xy[1][1] = mas[1][1];
        xy[2][1] = mas[2][1];
        for(int i =3;i<n-3;i++)
        {
            int ss[7];
            ss[0]=mas[i-3][1];
            ss[1]=mas[i-2][1];
            ss[2]=mas[i-1][1];
            ss[3]=mas[i][1];
            ss[4]=mas[i+1][1];
            ss[5]=mas[i+2][1];
            ss[6]=mas[i+3][1];
            sort(ss,ss+7);
            xy[i][1] = ss[3];
        }
        xy[n-1][1] = mas[n-1][1];
        xy[n-2][1] = mas[n-2][1];
        xy[n-3][1] = mas[n-3][1];
        for(int i = 0;i<n;i++)
            mas[i][1] = xy[i][1];
    }

    /*for(int j = 0;j<2;j++)
        for(int i = 0;i<n;i+=3)
        {
            int su = xy[i][1]+xy[i+1][1]+xy[i+2][1];
            su/=3;
            xy[i][1]=su;
            xy[i+1][1]=su;
            xy[i+2][1]=su;
        }
*/
    for(int i = 0;i<n-1;i++)
    {
        if(abs(mas[i][1] - mas[i+1][1]) > 150)
            mas[i][1] = mas[i+1][1];
    }
    for(int i=0; i<n; i++)
      cout<<(int)xy[i][1]<<endl;
     //for(int i = 0;i<n;i++)
      //cout<<(int)xy[i][1]<<endl;
    bool first = false;
    float maxdi=0;
    int lastind = 0;
    int indci=0;
    int mxci = 0;
    while(lastind < n)
    {
        float dii = 0; // Диаметр текущего цилиндра
        int imy = lastind; // Индекс первой крайней точки
        while((int)xy[imy][1] == 3700)
            imy++;
        int iyou = imy+1; // Индекс второй крайней точки
        bool che = true;
        while(che)
        {
            che = false;
            int id = 1;
            for(int i =1;i<2;i++)
                if(xy[iyou + i][1] <= xy[iyou][1] && abs(xy[iyou + id][1] - xy[iyou][1]) < 500)
                {
                    che = true;
                    id = i;
                }
            if(che)
                iyou++;
            else
                break;

        }
        int iwe=iyou +1; // Индекс третьей крайней точки
        che = true;
        while( che && xy[iwe+1][1] != 3700)
        {
            che = false;
            int id = 0;
            for(int i =1;i<2;i++)
                if(xy[iwe+i][1] >= xy[iwe][1] && abs(xy[iwe + i][1] - xy[iwe][1]) < 500)
                {
                    che = true;
                    id = i;
                }
            if(che)
                iyou++;
            else
                break;
        }
        iwe++;
        lastind = iwe;
        if(imy < n && iyou < n && iwe < n && (int)xy[imy][1] != 3700 && (int)xy[iyou][1] != 3700 && (int)xy[iwe][1] != 3700)
        {
            dii = centre(xy[imy][0],xy[iyou][0],xy[iwe][0],xy[imy][1],xy[iyou][1],xy[iwe][1]);
            //cout<<(int)xy[imy][1]<<endl<<(int)xy[iyou][1]<<endl<<(int)xy[iwe][1]<<endl;
            //cout<<(int)xy[imy][0]<<endl<<(int)xy[iyou][0]<<endl<<(int)xy[iwe][0]<<endl;
        //cout<<imy<<endl<<iyou<<endl<<iwe<<endl;
          //  cout<<dii<<endl;
            if(dii > maxdi)
            {
                maxdi = dii;
                mxci = indci;
            }
            if(dii > 0)
                indci++;
        }
    }
    //cout<<mxci+1;
}
