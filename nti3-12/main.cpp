#include <bits/stdc++.h>

using namespace std;
#define float double
#define int long

double fx(double kf,double bf,double xx)
{
    return kf*xx+bf;
}

double centre(double x1,double x2,double x3, double y1,double y2,double y3)
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
    const double r = 90.0;
    int n;
    cin>>n;
    float w=0.0,w0=0.0,u=0.0;
    double mas[n][2],xy[n][4];
    double eps = 1E-10;
    double h=0.1;
    int cl=0;
    for(int i=0; i<n; i++)
    {
        cin>>mas[i][0]>>mas[i][1];
        if(i>0)
        {
            if((abs(mas[i-1][0]-mas[i][0])<eps)==0)
            {
                xy[cl][0]=mas[i][0]*M_PI*2.0*r/360.0;
                xy[cl][1]=mas[i][1];
                // cout<<"Dist : "<<xy[cl][1]<<endl;
                cl++;
            }
        }

    }
    for(int i=0; i<cl-1; i++)
    {
        xy[i][2]=(xy[i+1][1]-xy[i][1])/(xy[i+1][0]-xy[i][0]);
        xy[i][3]=xy[i+1][1]-xy[i][2]*xy[i+1][0];
    }
    int nac=0,kon=cl-1;
    while(xy[nac][1]==3700)
        nac++;
    while(xy[kon][1]==3700)
        kon--;
    double kpr = (xy[kon][1]-xy[nac][1])/(xy[kon][0]-xy[nac][0]);
    double bpr = xy[kon][1]-kpr*xy[kon][0];
    for(int i=0; i<cl; i++)
    {
        if(xy[i][1]==3700.0)
        {
            xy[i][1]=fx(kpr,bpr,xy[i][0]);
            xy[i][2]=kpr;
            xy[i][3]=bpr;
            cout<<(int)xy[i][1]<<endl;
        }
    }
    return 0;
    double fc,analis[cl][3];
    for(int i=0; i<cl; i++)
    {
        fc=(xy[i][2]-kpr);
        //cout<<fc<<endl;
        analis[i][0]=xy[i][0];
        analis[i][1]=xy[i][1];
        analis[i][2]=fc;
    }
    bool bye=0;
    int frick=0;
    double dii = 0;
    double maxdi=0;
    int ind = 1;
    int maxind=0;
    double xf=0,xc=0,xs=0,yf=0,yc=0,ys=0;
    if(kpr<0)
    {
    while(frick!=cl&&bye==0)
    {
        while(((analis[frick][2]>0)||(analis[frick][2]==0))&&bye==0)
        {
            frick++;
            if(frick==cl)
                bye=1;
        }
        if(bye==1)
            break;
        xf=analis[frick][0];
        yf=analis[frick][1];
        while((analis[frick][2]<0)&&bye==0)
        {

            frick++;
            if(frick==cl)
                bye=1;
        }
        if(bye==1)
            break;
        xc=analis[frick-1][0];
        yc=analis[frick-1][1];
        while(((analis[frick][2]>0)||(analis[frick][2]!=0))&&bye==0)
        {
            frick++;
            if(frick==cl)
                bye=1;
        }
        if(bye==1)
            break;
        xs=analis[frick-1][0];
        ys=analis[frick-1][1];

        dii = centre(xf,xc,xs,yf,yc,ys);
        //cout<<xf<<" "<<yf<<" "<<xc<<" "<<yc<<" "<<xs<<" "<<ys<<" di "<<dii<<endl;
        if(dii>maxdi)
        {
            maxdi=dii;
            maxind=ind;

        }
        ind++;
        xf=0,xc=0,xs=0,yf=0,yc=0,ys=0;
        //char space = getchar();
       // while(space!=' ')
          //  space = getchar();

        //cout<<maxind<<endl;
    }
//cout<<maxind;
    }
   // else
     //   while(1);
}
