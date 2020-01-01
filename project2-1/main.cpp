#include <bits/stdc++.h>

using namespace std;

int main()
{
    freopen("input.txt","r",stdin);
    float xalfaA=0;
    float alfaB=0;
    float alfaA=0;
    int stat=0;
    float max_dx=0;
    float dx = 0;
    int max_i=0;
    int count_i=0;
    int n,m;
    cin>>n>>m;
    float alfa_pre;
    float S_pre;
    float alfa_cur;
    float S_cur;
    float a[n];
    float s[n];
    for(int i = 0;i<n;i++)
        cin>>a[i];
    for(int i = 0;i<n;i++)
        cin>>s[i];
    alfa_pre = a[0];
    S_pre = s[0];
    for(int i = 1;i<n;i++)
    {
        alfa_cur = a[i];
        S_cur = s[i];
        if(stat == 0)
        {
            if(S_cur - S_pre < 0)
            {
                stat = -1;
                alfaA = alfa_cur;
            }
        }
        else if(stat == -1)
        {
            if(S_cur - S_pre > 0)
                stat = 1;
        }
        else if(stat == 1)
        {
                if(S_cur - S_pre == 0)
                {
                    stat = 0;
                    alfaB = alfa_cur;
                    dx = 3.14*0.09*(alfaB - alfaA)/180;
                    count_i++;
                    if(max_dx < dx)
                    {
                        max_dx = dx;
                        max_i=count_i;
                    }
                }
                else if(S_cur-S_pre < 0)
                {
                    stat = -1;
                    alfaB = alfa_cur;
                    alfaA = alfa_cur;
                    dx = 3.14*0.09*(alfaB - alfaA)/180;
                    count_i++;
                    if(max_dx < dx)
                    {
                        max_dx = dx;
                        max_i=count_i;
                    }
                }
        }
        if(i == n-1)
        {
            if(S_cur - S_pre > 0)
            {
                alfaB = alfa_cur;
                dx = 3.14*0.09*(alfaB - alfaA)/180;
                count_i++;
                if(max_dx < dx)
                {
                    max_dx = dx;
                    max_i=count_i;
                }
            }
        }
        alfa_pre = alfa_cur;
        S_pre = S_cur;
    }
    for(int i =0;i<m;i++)
    {
        int tt;
        cin>>tt;
        //cout<<max_i<<endl;
        cout<<(s[max_i] + a[max_i] + tt)/2<<endl;
    }
}
