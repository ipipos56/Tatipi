#include <bits/stdc++.h>

using namespace std;
void bubbleSort(int** arr, int size,string* col);
int quarter(float _sn, float _cs)
{
    int qr=0;
    if(_cs>0&&_cs<1.0&&_sn>0&&_sn<1.0)
        qr=1;
    else if(_cs<0&&_cs>-1.0&&_sn>0&&_sn<1.0)
        qr=2;
    else if(_cs<0&&_cs>-1.0&&_sn<0&&_sn>-1.0)
        qr=3;
    else if(_cs>0&&_cs<1.0&&_sn<0&&_sn>-1.0)
        qr=4;
    else if(_cs==1)
        qr=-1;
    else if(_sn==1)
        qr=-2;
    else if(_cs==-1)
        qr=-3;
    else if(_sn==-1)
        qr=-4;
    return qr;
}
int main()
{
    int n=0,k=12;
    float alfa=0.1;
    string rot="";
    int x0=1625,y0=1125;
    float beta=6.28;
    string wall[k];
    int part[k][7];
    float kleft,kright,bright,bleft,yright,yleft,xright,xleft,k1,k2,cs,sn,d,dleft,dright,d1,d2;
    int qtleft,qtright,q1,q2;
    float quat[k][4];
    for(int i=0; i<k; i++)
    {

        for(int j=0; j<4; j++)
        {
            quat[i][j]=0;
            cin>>part[i][j];
        }
        cin>>wall[i];
    }
    int a1=0,a2=0,a3=0,a4=0;
    for(int i=0; i<k; i++)
    {
        if(wall[i]!="0")
        {
            if(x0<min(part[i][0],part[i][2])&&x0<max(part[i][0],part[i][2]))
            {
                kleft=float((max(part[i][1],part[i][3])-y0)/float(max(part[i][0],part[i][2])-x0));
                dleft=float(sqrt((max(part[i][0],part[i][2])-x0)*(max(part[i][0],part[i][2])-x0)+(max(part[i][1],part[i][3])-y0)*(max(part[i][1],part[i][3])-y0)));
                sn=(max(part[i][1],part[i][3]-y0))/dleft;
                cs=(max(part[i][0],part[i][2])-x0)/dleft;
                qtleft=quarter(sn,cs);
                kright=float((min(part[i][1],part[i][3])-y0)/float(min(part[i][0],part[i][2])-x0));
                dright=float(sqrt((min(part[i][0],part[i][2])-x0)*(min(part[i][0],part[i][2])-x0)+(min(part[i][1],part[i][3])-y0)*(min(part[i][1],part[i][3])-y0)));
                sn=(min(part[i][1],part[i][3])-y0)/dright;
                cs=(min(part[i][0],part[i][2])-x0)/dright;
                qtright=quarter(sn,cs);
                // cout<<qtleft<<" "<<qtright<<endl;
                //cout<<"K: "<<kleft<<" "<<kright<<endl<<endl;
                //cout<<"i "<<part[i][0]<<" : "<<part[i][1]<<" | "<<part[i][2]<<" : "<<part[i][3]<<endl;
                for(int j=0; j<k; j++)
                {
                    if(j!=i&&wall[j]!="0")
                    {
                        d1=float(sqrt((part[j][0]-x0)*(part[j][0]-x0)+(part[j][1]-y0)*(part[j][1]-y0)));
                        if(part[j][1]>y0)
                            sn=(part[j][1]-y0)/d1;
                        else if(part[j][1]<y0)
                            sn=-(y0-part[j][1])/d1;
                        if(part[j][0]>x0)
                            cs=(part[j][0]-x0)/d1;
                        else if(part[j][0]<x0)
                            cs=-(x0-part[j][0])/d1;
                        q1=quarter(sn,cs);
                        d2=float(sqrt((part[j][2]-x0)*(part[j][2]-x0)+(part[j][3]-y0)*(part[j][3]-y0)));
                        if(part[j][3]>y0)
                            sn=(part[j][3]-y0)/d2;
                        else if(part[j][3]<y0)
                            sn=-(y0-part[j][3])/d2;
                        if(part[j][2]>x0)
                            cs=(part[j][2]-x0)/d2;
                        else if(part[j][2]<x0)
                            cs=-(x0-part[j][2])/d2;
                        q2=quarter(sn,cs);
                        k1=float((part[j][1]-y0)/float(part[j][0]-x0));
                        k2=float((part[j][3]-y0)/float(part[j][2]-x0));
                        if(min(kleft,kright)<=k1&&min(kleft,kright)<=k2&&max(kleft,kright)>=k1&&max(kleft,kright)>=k2&&((q1==qtleft)||(q1==qtright))&&((q2==qtleft)||(q2==qtright))
                                &&(max(d1,d2)>max(dright,dleft))&&(min(d1,d2)>min(dright,dleft)))
                            wall[j]="0";

                    }

                }
            }

            else if(x0>max(part[i][0],part[i][2])&&x0>min(part[i][0],part[i][2]))
            {
                kleft=float((min(part[i][1],part[i][3])-y0)/float(max(part[i][0],part[i][2])-x0));
                dleft=float(sqrt((max(part[i][0],part[i][2])-x0)*(max(part[i][0],part[i][2])-x0)+(min(part[i][1],part[i][3])-y0)*(min(part[i][1],part[i][3])-y0)));
                sn=(min(part[i][1],part[i][3]-y0))/dleft;
                cs=(max(part[i][0],part[i][2])-x0)/dleft;
                qtleft=quarter(sn,cs);
                kright=float((max(part[i][1],part[i][3])-y0)/float(min(part[i][0],part[i][2])-x0));
                dright=float(sqrt((min(part[i][0],part[i][2])-x0)*(min(part[i][0],part[i][2])-x0)+(max(part[i][1],part[i][3])-y0)*(max(part[i][1],part[i][3])-y0)));
                sn=(max(part[i][1],part[i][3])-y0)/dright;
                cs=(min(part[i][0],part[i][2])-x0)/dright;
                qtright=quarter(sn,cs);
                for(int j=0; j<k; j++)
                {
                    if(i!=j&&wall[j]!="0")
                    {

                        d1=float(sqrt((part[j][0]-x0)*(part[j][0]-x0)+(part[j][1]-y0)*(part[j][1]-y0)));
                        if(part[j][1]>y0)
                            sn=(part[j][1]-y0)/d1;
                        else if(part[j][1]<y0)
                            sn=-(y0-part[j][1])/d1;
                        if(part[j][0]>x0)
                            cs=(part[j][0]-x0)/d1;
                        else if(part[j][0]<x0)
                            cs=-(x0-part[j][0])/d1;
                        q1=quarter(sn,cs);
                        d2=float(sqrt((part[j][2]-x0)*(part[j][2]-x0)+(part[j][3]-y0)*(part[j][3]-y0)));
                        if(part[j][3]>y0)
                            sn=(part[j][3]-y0)/d2;
                        else if(part[j][3]<y0)
                            sn=-(y0-part[j][3])/d2;
                        if(part[j][2]>x0)
                            cs=(part[j][2]-x0)/d2;
                        else if(part[j][2]<x0)
                            cs=-(x0-part[j][2])/d2;
                        q2=quarter(sn,cs);
                        k1=float((part[j][1]-y0)/float(part[j][0]-x0));
                        k2=float((part[j][3]-y0)/float(part[j][2]-x0));
                        if(min(kleft,kright)<=k1&&min(kleft,kright)<=k2&&max(kleft,kright)>=k1&&max(kleft,kright)>=k2&&((q1==qtleft)||(q1==qtright))&&((q2==qtleft)||(q2==qtright))
                                &&(max(d1,d2)>max(dright,dleft))&&(min(d1,d2)>min(dright,dleft)))
                        {
                            wall[j]="0";
                        }

                    }
                }
            }
            else if(x0<max(part[i][0],part[i][2])&&x0>min(part[i][0],part[i][2]))
            {
                kleft=float((part[i][1]-y0)/float(min(part[i][0],part[i][2])-x0));
                dleft=float(sqrt((min(part[i][0],part[i][2])-x0)*(min(part[i][0],part[i][2])-x0)+(part[i][1]-y0)*(part[i][1]-y0)));
                sn=(part[i][1]-y0)/dleft;
                cs=(min(part[i][0],part[i][2])-x0)/dleft;
                qtleft=quarter(sn,cs);
                kright=float((part[i][1]-y0)/float(max(part[i][0],part[i][2])-x0));
                dright=float(sqrt((max(part[i][0],part[i][2])-x0)*(max(part[i][0],part[i][2])-x0)+(part[i][1]-y0)*(part[i][1]-y0)));
                sn=(part[i][1]-y0)/dright;
                cs=(max(part[i][0],part[i][2])-x0)/dright;
                qtright=quarter(sn,cs);

                //cout<<kleft<<" "<<kright<<endl;
                if(y0>min(part[i][1],part[i][3])&&y0>max(part[i][1],part[i][3]))///correct
                {

                    for(int j=0; j<k; j++)
                    {
                        if(i!=j&&wall[j]!="0")
                        {

                            d1=float(sqrt((part[j][0]-x0)*(part[j][0]-x0)+(part[j][1]-y0)*(part[j][1]-y0)));
                            if(part[j][1]>y0)
                                sn=(part[j][1]-y0)/d1;
                            else if(part[j][1]<y0)
                                sn=-(y0-part[j][1])/d1;
                            if(part[j][0]>x0)
                                cs=(part[j][0]-x0)/d1;
                            else if(part[j][0]<x0)
                                cs=-(x0-part[j][0])/d1;
                            q1=quarter(sn,cs);
                            d2=float(sqrt((part[j][2]-x0)*(part[j][2]-x0)+(part[j][3]-y0)*(part[j][3]-y0)));
                            if(part[j][3]>y0)
                                sn=(part[j][3]-y0)/d2;
                            else if(part[j][3]<y0)
                                sn=-(y0-part[j][3])/d2;
                            if(part[j][2]>x0)
                                cs=(part[j][2]-x0)/d2;
                            else if(part[j][2]<x0)
                                cs=-(x0-part[j][2])/d2;
                            q2=quarter(sn,cs);
                            k1=float((part[j][1]-y0)/float(part[j][0]-x0));
                            k2=float((part[j][3]-y0)/float(part[j][2]-x0));
                            if(min(k1,k2)<kleft&&max(k1,k2)>kright&&(max(d1,d2)>max(dright,dleft))&&(min(d1,d2)>min(dright,dleft))&&((q1==qtleft)||(q1==qtright))&&((q2==qtleft)||(q2==qtright)))
                            {
                                wall[j]="0";
                            }

                        }
                    }
                }
                else if(y0<min(part[i][1],part[i][3])&&y0<max(part[i][1],part[i][3]))///correct
                {

                    for(int j=0; j<k; j++)
                    {
                        if(i!=j&&wall[j]!="0")
                        {
                            d1=float(sqrt((part[j][0]-x0)*(part[j][0]-x0)+(part[j][1]-y0)*(part[j][1]-y0)));
                            if(part[j][1]>y0)
                                sn=(part[j][1]-y0)/d1;
                            else if(part[j][1]<y0)
                                sn=-(y0-part[j][1])/d1;
                            if(part[j][0]>x0)
                                cs=(part[j][0]-x0)/d1;
                            else if(part[j][0]<x0)
                                cs=-(x0-part[j][0])/d1;
                            q1=quarter(sn,cs);
                            d2=float(sqrt((part[j][2]-x0)*(part[j][2]-x0)+(part[j][3]-y0)*(part[j][3]-y0)));
                            if(part[j][3]>y0)
                                sn=(part[j][3]-y0)/d2;
                            else if(part[j][3]<y0)
                                sn=-(y0-part[j][3])/d2;
                            if(part[j][2]>x0)
                                cs=(part[j][2]-x0)/d2;
                            else if(part[j][2]<x0)
                                cs=-(x0-part[j][2])/d2;
                            q2=quarter(sn,cs);
                            k1=float((part[j][1]-y0)/float(part[j][0]-x0));
                            k2=float((part[j][3]-y0)/float(part[j][2]-x0));
                            if(min(k1,k2)<kleft&&max(k1,k2)>kright&&(max(d1,d2)>max(dright,dleft))&&(min(d1,d2)>min(dright,dleft))&&((q1==qtleft)||(q1==qtright))&&((q2==qtleft)||(q2==qtright)))
                            {
                                wall[j]="0";
                            }
                        }
                    }
                }
            }

        }
    }
    cout<<endl;
     for(int i=0; i<k; i++)
     {
         for(int j=0; j<4; j++)
             cout<<part[i][j]<<" ";
         cout<<wall[i]<<endl;
     }

}

