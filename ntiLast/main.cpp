#include <bits/stdc++.h>

using namespace std;

map<int,string> ma; // Color map
map<int,string>:: iterator mit;

int couColor = 0;

int main()
{
    freopen("input.txt","r",stdin);

    int l,n;
    float alp;
    cin>>l>>n>>alp;
    char ds;
    cin>>ds;
    int pX,pY;
    float beta;
    cin>>pX>>pY>>beta; // X and Y of robot
    int wall[n][5]; // Walls array
    for(int i = 0;i<n;i++)
        for(int j = 0; j<5;j++)
            wall[i][j] = -1;
    for(int i = 0;i<n;i++)
    {
        string colWa;
        for(int j = 0;j<4;j++)
        {
            int a;
            cin>>a;
            wall[i][j] = a;
        }

        cin>>colWa;


        int ins = 0;
        for(mit = ma.begin(); mit!=ma.end();mit++) // Find old color
            if(mit->second == colWa)
                ins = mit->first;
        if(ins == 0) // new Color set
        {
            ma[couColor] = colWa;
            ins = couColor;
            couColor++;
        }
        wall[i][4] = ins; // Color of wall

        if(i != 0)
        {
            for(int j = 0;j<i;j++)
            {
                if(wall[i][0] == wall[j][0] && wall[i][1] == wall[j][1])
                    cout<<wall[i][0]<<" "<<wall[i][1]<<" StartCol"<<endl;
                if(wall[i][2] == wall[j][2] && wall[i][3] == wall[j][3])
                    cout<<wall[i][2]<<" "<<wall[i][3]<<" FinishCol"<<endl;
            }
        }
    }
}
