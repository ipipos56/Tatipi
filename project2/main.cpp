#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n,k;
    cin>>n>>k;
    double x[n],y[n],t[k];
    for(int i=0; i<n; i++)
        cin>>y[i];
    for(int i=0; i<n; i++)
        cin>>x[i];
    for(int i=0; i<k; i++)
        cin>>t[i];
    for(int i=0;i<n-1;i++)
    {
        double res=y[i]*(double(x[i+1]-t[4])/double(x[i+1]-x[i]))+y[i+1]*(double(t[4]-x[i])/double(x[i+1]-x[i]));
        cout<<"ot: "<<x[i]<<": do: "<<x[i+1]<<" "<<res<<endl;
    }
}
