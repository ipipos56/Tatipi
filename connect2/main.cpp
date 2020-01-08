#include <bits/stdc++.h>

using namespace std;

float line(float k, float x, float b)
{
    return (k*x + b);
}
float ok(float x1,float x2,float y1,float y2,float x0,float y0,float r);
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
float X1,X2,Y1,Y2;
int main()
{
    float kleft,kright,bright,bleft,yright,yleft,xright,xleft,k1,k2,cs,sn,d,dleft,dright,d1,d2;
    int qtleft,qtright,q1,q2;
    int n;
    cin>>n;
    int x0=1625,y0=1125;
    float part[n][4],r=0;
    string wall[n];
    for(int i=0; i<n; i++)
    {
        for(int j=0; j<4; j++)
        {
            cin>>part[i][j];
        }

        cin>>wall[i];

    }
    //mp[make_pair(make_pair(part[i][0],part[i][1]),make_pair(part[i][2],part[i][3]))]=wall[i];
    //map<pair<pair<float,float>,pair<float,float> > ,string> :: iterator it=mp.begin();
    for(int i=0; i<n; i++)
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
                for(int j=0; j<n; j++)
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
                for(int j=0; j<n; j++)
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

                    for(int j=0; j<n; j++)
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

                    for(int j=0; j<n; j++)
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
    float minn=99999,x1,y1;

    //cout<<x1<<" "<<y1<<" "<<min;
//for (int i = 0; it != mp.end(); it++, i++) {  // выводим их
    //   cout<<((it->first).first).first<<endl;
    // }
    for(int i=0; i<n; i++)
    {
        if(wall[i]!="0")
        {
            float d=float(sqrt((x0-part[i][0])*(x0-part[i][0])+(y0-part[i][1])*(y0-part[i][1])));
            float kf=float(part[i][1]-y0)/float(part[i][0]-x0);
            float sn=float((part[i][1]-y0)/float(d)),cs=float((part[i][0]-x0)/float(d));
            int qu1=quarter(sn,cs);
            float bf=y0-kf*x0;
            float d2=float(sqrt((x0-part[i][2])*(x0-part[i][2])+(y0-part[i][3])*(y0-part[i][3])));
            float kf2=float(part[i][3]-y0)/float(part[i][2]-x0);
            float sn2=float((part[i][3]-y0)/float(d2)),cs2=float((part[i][2]-x0)/float(d2));
            int qu2=quarter(sn2,cs2);
            float bf2=y0-kf2*x0;
            //cout<<qu1<<" "<<qu2<<endl;
            for(int j=0; j<n; j++)
            {
                if(wall[j]!="0")
                {
                    if(i!=j)
                    {
                        if(part[j][2]==part[j][0])
                        {
                            float y=kf*part[j][0]+bf;
                            float dist=float(sqrt((part[j][0]-x0)*(part[j][0]-x0)+(y-y0)*(y-y0)));
                            float s=float(y-y0)/float(dist);
                            float c=float(part[j][0]-x0)/float(dist);
                            float _q=quarter(s,c);
                            //cout<<i<<"->"<<j<<" "<<y<<endl;
                            float y2=kf2*part[j][2]+bf2;
                            float dist2=float(sqrt((part[j][2]-x0)*(part[j][2]-x0)+(y2-y0)*(y2-y0)));
                            float s2=float(y2-y0)/float(dist2);
                            float c2=float(part[j][2]-x0)/float(dist2);
                            float _q2=quarter(s2,c2);
                            y=round(y);
                            y2=round(y2);
                            //cout<<i<<"->"<<j<<" "<<y2<<" "<<min(part[j][1],part[j][3])<<" "<<max(part[j][1],part[j][3])<<endl;
                            if(y2<max(part[j][1],part[j][3])&&y2>min(part[j][1],part[j][3])&&dist2>d2&&(_q2==qu2||_q2==qu1))
                            {
                                //cout<<part[j][1]<<" "<<y2<<endl;
                                //cout<<"->"<<min(y,y2)<<" "<<max(y,y2)<<" "<<min(part[j][1],part[j][3])<<" "<<max(part[j][1],part[j][3])<<endl;

                                if(part[j][1]>min(y,y2)&&part[j][1]<max(y,y2))
                                    part[j][1]=y2;
                                if(part[j][3]>min(y,y2)&&part[j][3]<max(y,y2))
                                    part[j][3]=y2;
                            }
                            if(y<max(part[j][1],part[j][3])&&y>min(part[j][1],part[j][3])&&dist>d&&(_q==qu2||_q==qu1))
                            {
                                // cout<<i<<"->"<<j<<" "<<y<<endl;
                                if(part[j][1]>min(y,y2)&&part[j][1]<max(y,y2))
                                    part[j][1]=y;
                                if(part[j][3]>min(y,y2)&&part[j][3]<max(y,y2))
                                    part[j][3]=y;

                            }
                        }
                        else if(part[j][1]==part[j][3])
                        {
                            float x=(part[j][1]-bf)/float(kf);
                            float dist=float(sqrt((x-x0)*(x-x0)+(part[i][1]-y0)*(part[i][1]-y0)));
                            float s=float(part[j][1]-y0)/float(dist);
                            float c=float(x-x0)/float(dist);
                            float _q=quarter(s,c);

                            float x2=(part[j][1]-bf2)/float(kf2);
                            float dist2=float(sqrt((x2-x0)*(x2-x0)+(part[i][1]-y0)*(part[i][1]-y0)));
                            float s2=float(part[i][1]-y0)/float(dist2);
                            float c2=float(x2-x0)/float(dist2);
                            float _q2=quarter(s2,c2);
                            x2=round(x2);
                            x=round(x);
                            if(x2<max(part[j][0],part[j][2])&&x2>min(part[j][0],part[j][2])&&dist2>d2&&(_q2==qu2&&_q2==qu1))
                            {
                                //cout<<part[j][1]<<" "<<y2<<endl;
                                //cout<<i<<" "<<j<<"->"<<min(x,x2)<<" "<<max(x,x2)<<" "<<min(part[j][0],part[j][2])<<" "<<max(part[j][0],part[j][2])<<endl;

                                if(part[j][0]>min(x,x2)&&part[j][0]<max(x,x2))
                                    part[j][0]=x2;
                                if(part[j][2]>min(x,x2)&&part[j][2]<max(x,x2))
                                    part[j][2]=x2;
                            }
                            if(x<max(part[j][0],part[j][2])&&x>min(part[j][0],part[j][2])&&dist>d&&(_q==qu2&&_q==qu1))
                            {
                                //cout<<i<<"->"<<j<<" "<<y<<endl;
                                if(part[j][0]>min(x,x2)&&part[j][0]<max(x,x2))
                                    part[j][0]=x;
                                if(part[j][2]>min(x,x2)&&part[j][2]<max(x,x2))
                                    part[j][2]=x;

                            }

                        }

                    }


                }

            }
        }
    }
    cout<<endl;
    float polar[n][4];
    int it=0;
    string pol[n];
    /*for(int i=0; i<n; i++)
    {
        for(int j=0; j<4; j++)
            cout<<part[i][j]<<" ";
        cout<<wall[i]<<endl;
    }*/
    minn=175;
    for(int i=0; i<n; i++)
    {
        if(wall[i]!="0")
        {
            float d=float(sqrt((part[i][0]-x0)*(part[i][0]-x0)+(part[i][1]-y0)*(part[i][1]-y0)));
            float s=float(part[i][1]-y0)/float(d),c=float(part[i][0]-x0)/float(d);
            int qu=quarter(s,c);
            ok(part[i][0],x0,part[i][1],y0,x0,y0,minn);
            float _q,_q1;

            s=float(Y1)/float(minn);
            c=float(X1)/float(minn);
            _q=quarter(s,c);

            s=float(Y2)/float(minn);
            c=float(X2)/float(minn);
            _q1=quarter(s,c);
           // cout<<"i "<<i<<" "<<_q<<endl;
            if(qu==_q)
            {
                polar[it][0]=X1+x0;
                polar[it][1]=Y1+y0;
                pol[it]=wall[i];
            }
            else if(qu==_q1)
            {
                polar[it][0]=X2+x0;
                polar[it][1]=Y2+y0;
                pol[it]=wall[i];

            }
            d=float(sqrt((part[i][2]-x0)*(part[i][2]-x0)+(part[i][3]-y0)*(part[i][3]-y0)));
            s=float(part[i][3]-y0)/float(d),c=float(part[i][2]-x0)/float(d);
            qu=quarter(s,c);
            ok(part[i][2],x0,part[i][3],y0,x0,y0,minn);
            s=float(Y1)/float(minn);
            c=float(X1)/float(minn);
            _q=quarter(s,c);
            s=float(Y2)/float(minn);
            c=float(X2)/float(minn);
            _q1=quarter(s,c);
            if(qu==_q)
            {
                polar[it][2]=X1+x0;
                polar[it][3]=Y1+y0;
                pol[it]=wall[i];
            }
            else if(qu==_q1)
            {
                polar[it][2]=X2+x0;
                polar[it][3]=Y2+y0;
                pol[it]=wall[i];

            }
            it++;
        }

    }
for(int i=0;i<it;i++)
{
    for(int j=0;j<4;j++)
        cout<<int(polar[i][j])<<" ";
    cout<<pol[i]<<endl;
}



}

float ok(float x1,float x2,float y1,float y2,float x0,float y0,float r)
{


    float _k = (y2 - y1)/(x2 - x1);
    float _b = (y2*x1 - y1*x2)/(x1 - x2);

    _b += (_k*x0 - y0);

    float D = pow(2*_b*_k,2) + 4*(1 + pow(_k,2))*(pow(r,2) - pow(_b,2));
    if(0 <= D)
    {
        X1 = (-2*_b*_k - sqrt(D))/(-2*(1 + pow(_k,2)));
        Y1 = line(_k,X1,_b);
        //printf("coord point of intersection P1(%lf;%lf)\r\n",X1 + x0,Y1 + y0);

        X2 = (-2*_b*_k + sqrt(D))/(-2*(1 + pow(_k,2)));
        Y2 = line(_k,X2,_b);
        //printf("coord point of intersection P2(%.2f;%.2f)\r\n",X2 + x0,Y2 + y0);
        //printf("\tline cross circle in two points\r\n");
    }
}
