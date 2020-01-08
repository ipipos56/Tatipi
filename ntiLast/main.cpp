#include <bits/stdc++.h>

using namespace std;

map<int,string> ma; // Color map
map<int,string>:: iterator mit;

int couColor = 0;
float distan(float _x0, float _x1, float _y0, float _y1)
{
    return float(sqrt((_x1-_x0)*(_x1-_x0)+(_y1-_y0)*(_y1-_y0)));
}
int main()
{
    //freopen("input.txt","r",stdin);
    float k1=0,b1=0,k3=0,b3=0,k2=0,b2=0,x=0,y=0,k=0,b=0;
    int x0=375,y0=1375;
    int x1=0,x2=0,x3=0;
    int y1=0,y2=0,y3=0;
    float d1=0,d2=0,d3=0;
    int l,n;
    float alp;
    cin>>l>>n>>alp;
    char ds;
    cin>>ds;
    int pX,pY;
    float beta;
    cin>>pX>>pY>>beta;
    x0=pX,y0=pY; // X and Y of robot
    int wall[n][5]; // Walls array
    for(int i = 0; i<n; i++)
        for(int j = 0; j<5; j++)
            wall[i][j] = -1;
    for(int i = 0; i<n; i++)
    {
        string colWa;
        for(int j = 0; j<4; j++)
        {
            int a;
            cin>>a;
            wall[i][j] = a;
        }

        cin>>colWa;


        int ins = 0;
        for(mit = ma.begin(); mit!=ma.end(); mit++) // Find old color
            if(mit->second == colWa)
                ins = mit->first;
        if(ins == 0) // new Color set
        {
            ma[couColor] = colWa;
            ins = couColor;
            couColor++;
        }
        wall[i][4] = ins; // Color of wall
    }
    for(int i = 0; i<n; i++)
    {

        if(i != 0)
        {
            for(int j = 0; j<i; j++)
            {
                if(wall[i][0] == wall[j][0] && wall[i][1] == wall[j][1])
                {
                    //cout<<wall[i][2]<<" "<<wall[i][3]<<"  :";
                    //cout<<wall[i][0]<<" "<<wall[i][1]<<" StartCol";
                    //cout<<wall[j][2]<<" "<<wall[j][3]<<endl;
                    x1=wall[i][2],x2=wall[i][0],x3=wall[j][2];
                    y1=wall[i][3],y2=wall[i][1],y3=wall[j][3];
                    d1=distan(x0,x1,y0,y1);
                    d2=distan(x0,x2,y0,y2);
                    d3=distan(x0,x3,y0,y3);
                    if(d2>=d1&&d2>=d3)
                    {
                        k1=float(float(y3-y1)/float(x3-x1));
                        k2=float((y0-y2)/float(x0-x2));
                        b2=y2-k2*x2;
                        b1=y1-k1*x1;
                        x=float(b2-b1)/float(k1-k2);
                        y=k1*x+b1;
                        if((min(x1,x2)<x&&max(x1,x2)>x)||(min(y1,y2)<y&&max(y1,y2)>y)||(min(x2,x3)<x&&max(x2,x3)>x)||(min(y2,y3)<y&&max(y2,y3)>y))
                        {
                            x2=x;
                            y2=y;
                            wall[i][0]=x2;
                            wall[i][1]=y2;
                            wall[j][0]=x2;
                            wall[j][1]=y2;
                            //cout<<x2<<" "<<y2<<endl;
                        }

                    }
                    else if(d2<=d1&&d2<=d3)
                    {
                        k1=float((y1-y0)/float(x1-x0));
                        k2=float((y2-y0)/float(x2-x0));
                        k3=float((y3-y0)/float(x3-x0));
                        b3=y0-k3*x0;
                        b1=y0-k1*x0;
                        if(k2>min(k1,k3)&&k2<max(k1,k3))
                        {
                            k=float(float(y3-y1)/float(x3-x1));
                            x=float(y2-b3-k*x2)/float(k3-k);
                            wall[j][2]=x;
                            wall[j][3]=x*k3+b3;
                            x=float(y2-b1-k*x2)/float(k1-k);
                            wall[i][2]=x;
                            wall[i][3]=x*k1+b1;

                        }
                    }
                    else
                        cout<<d1<<" "<<d2<<" "<<d3<<endl;
                }
                if(wall[i][2] == wall[j][2] && wall[i][3] == wall[j][3])
                {
                    //cout<<wall[i][0]<<" "<<wall[i][1]<<"  :";
                    //cout<<wall[i][2]<<" "<<wall[i][3]<<" FinishCol";
                    //cout<<wall[j][0]<<" "<<wall[j][1]<<endl;
                    x1=wall[i][0],x2=wall[i][2],x3=wall[j][0];
                    y1=wall[i][1],y2=wall[i][3],y3=wall[j][1];
                    d1=distan(x0,x1,y0,y1);
                    d2=distan(x0,x2,y0,y2);
                    d3=distan(x0,x3,y0,y3);
                    if(d2>=d1&&d2>=d3)
                    {
                        k1=float(float(y3-y1)/float(x3-x1));
                        k2=float((y0-y2)/float(x0-x2));
                        b2=y2-k2*x2;
                        b1=y1-k1*x1;
                        x=float(b2-b1)/float(k1-k2);
                        y=k1*x+b1;
                        if((min(x1,x2)<x&&max(x1,x2)>x)||(min(y1,y2)<y&&max(y1,y2)>y)||(min(x2,x3)<x&&max(x2,x3)>x)||(min(y2,y3)<y&&max(y2,y3)>y))
                        {
                            x2=x;
                            y2=y;
                            wall[j][2]=x2;
                            wall[i][2]=x2;
                            wall[i][3]=y2;
                            wall[j][3]=y2;
                            //cout<<x2<<" "<<y2<<endl;
                        }

                    }
                    else if(d2<=d1&&d2<=d3)
                    {
                        k1=float((y1-y0)/float(x1-x0));
                        k2=float((y2-y0)/float(x2-x0));
                        k3=float((y3-y0)/float(x3-x0));
                        b3=y0-k3*x0;
                        b1=y0-k1*x0;
                        if(k2>min(k1,k3)&&k2<max(k1,k3))
                        {
                            k=float(float(y3-y1)/float(x3-x1));
                            x=float(y2-b3-k*x2)/float(k3-k);
                            wall[j][0]=x;
                            wall[j][1]=x*k3+b3;
                            x=float(y2-b1-k*x2)/float(k1-k);
                            wall[i][0]=x;
                            wall[i][1]=x*k1+b1;
                            cout<<"d";
                        }
                    }
                    else
                        cout<<d1<<" "<<d2<<" "<<d3<<endl;
                }
            }
        }
    }
    mit = ma.begin();
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<4;j++)
            cout<<wall[i][j]<<" ";
            cout<<endl;
    }
}
