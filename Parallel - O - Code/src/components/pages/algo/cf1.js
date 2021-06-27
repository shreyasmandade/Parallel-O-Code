import React from 'react'
import '../algo/sorting.css'

export default function Blurring() {
    return (
    <div className="algo-content">

        <div className="algo-content-inner">
            <div className="stars-container">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
            </div>
        </div>
        <section>

        <h1>Question</h1>
        <pre className="source-code">
            {`
             
                                                D. Sequence and Swaps
                                                time limit per test: 1.5 seconds
                                                memory limit per test: 512 megabytes
                                                input: standard input
                                                output: standard output
             
                You are given a sequence a consisting of n integers a1,a2,…,an, and an integer x. Your task is to make the sequence a sorted (it is 
            considered sorted if the condition a1≤a2≤a3≤⋯≤an holds).To make the sequence sorted, you may perform the following operation any 
            number of times you want (possibly zero): choose an integer i such that 1≤i≤n and ai>x, and swap the values of ai and x
            For example, if a=[0,2,3,5,4], x=1, the following sequence of operations is possible: choose i=2(it is possible since a2>x), then 
            a=[0,1,3,5,4], x=2;  choose i=3 (it is possible since a3>x), then a=[0,1,2,5,4], x=3; choose i=4 (it is possible since a4>x), then 
            a=[0,1,2,3,4], x=5.Calculate the minimum number of operations you have to perform so that a becomes sorted, or report that it is 
            impossible.
             
            Input: The first line contains one integer t(1≤t≤500) — the number of test cases.
             
             Each test case consists of two lines. The first line contains two integers n
             and x (1≤n≤500, 0≤x≤500) — the number of elements in the sequence and the initial value of x. The second line contains n integers 
             a1, a2, ..., an (0≤ai≤500).The sum of values of n over all test cases in the input does not exceed 500.
            
            Output:
             
             For each test case, print one integer — the minimum number of operations you have to perform to make a
             sorted, or −1, if it is impossible.

            `}
        </pre>
  
        </section> 

        <section>  
        <h1>Sequential Code</h1>
        <pre className="source-code">
            {`
              
            #include <bits/stdc++.h>
            #include <omp.h>
            #include <sys/time.h>
            using namespace std;
            const int maxs = 503;
            int n;

            int a[maxs];
            vector<vector<vector<int>>>dp;

            int go(int pos,int prev,int x)
            {
                if(pos > n)
                    return 0;
                
                if(dp[pos][prev][x] != -1)
                    return dp[pos][prev][x];
                
                int res = maxs;
                
                if(a[pos] > x && x >= prev)
                res = min(res,1 + go(pos + 1,x,a[pos]));
                
                if(a[pos] >= prev)
                    res = min(res,go(pos + 1,a[pos],x));
                
                return dp[pos][prev][x] = res;
            }

            int main()
            {
                ios_base::sync_with_stdio(false);
                cin.tie(NULL);
                cout.tie(NULL);
                
                int tt = 1;
                cin >> tt;
                
                while(tt--)
                {

                    struct timeval tv1, tv2;
                    struct timezone tz;
                    double elapsed; 
                    gettimeofday(&tv1, &tz);


                    int x;
                    cin >> n >> x;
                    
                    
                    int maxx = -1;
                    
                    for(int i = 1;i <= n;++i)
                    {
                        cin >> a[i];
                        maxx = max(maxx,a[i]);
                    
                    }
                
                    maxx = max(maxx,x);
                    dp.clear();
                    
                    dp.resize(n + 5,vector<vector<int>>(maxx + 2,vector<int>(maxx + 2,-1)));
                    
                    int res = go(1,0,x);
                    
                    if(res == maxs)
                        res = -1;
                    
                    cout << res;
                    
                    
                    cout << '\n';

                    gettimeofday(&tv2, &tz);

                    
                    elapsed = (double) (tv2.tv_sec-tv1.tv_sec) + (double) (tv2.tv_usec-tv1.tv_usec) * 1.e-6;
                    printf("elapsed time = %f seconds.\n", elapsed);
                }
            }
              
            `}
        </pre>
        </section>  

        <section>  
        <h1>Parallel Code</h1>
        <pre className="source-code">
            {`
              
              #include <bits/stdc++.h>
              #include <omp.h>
              #include <sys/time.h>
              using namespace std;
              const int maxs = 503;
              int n;
              
              int a[maxs];
              vector<vector<vector<int>>>dp;
              
              int go(int pos,int prev,int x)
              {
                  #pragma omp if
                  if(pos > n)
                      return 0;
                  
                  #pragma omp if
                  if(dp[pos][prev][x] != -1)
                      return dp[pos][prev][x];
                  
                  int res = maxs;
                  
                  #pragma omp if
                  if(a[pos] > x && x >= prev)
                     res = min(res,1 + go(pos + 1,x,a[pos]));
                  
                  #pragma omp if
                  if(a[pos] >= prev)
                      res = min(res,go(pos + 1,a[pos],x));
                  
                  return dp[pos][prev][x] = res;
              }
              
              int main()
              {
                  ios_base::sync_with_stdio(false);
                  cin.tie(NULL);
                  cout.tie(NULL);
                  
                  int tt = 1;
                  cin >> tt;
                  
                  while(tt--)
                  {
              
                      int x,i;
                      cin >> n >> x;
                      
                      
                      int maxx = -1;
              
                      
              
                       #pragma omp parallel{
              
                      struct timeval tv1, tv2;
                      struct timezone tz;
                      double elapsed; 
                      gettimeofday(&tv1, &tz);
              
                      #pragma omp for private(i)
                      for(i = 1;i <= n;++i)
                      {
                          cin >> a[i];
                          maxx = max(maxx,a[i]);
                        
                      }
                     
                      maxx = max(maxx,x);
                      dp.clear();
                      
                      dp.resize(n + 5,vector<vector<int>>(maxx + 2,vector<int>(maxx + 2,-1)));
                      
                      int res = go(1,0,x);
                      
                      if(res == maxs)
                          res = -1;
                      
                      cout << res;
                      
                      
                      cout << '\n';
              
                      gettimeofday(&tv2, &tz);
              
                      
                      elapsed = (double) (tv2.tv_sec-tv1.tv_sec) + (double) (tv2.tv_usec-tv1.tv_usec) * 1.e-6;
                      printf("elapsed time = %f seconds.\n", elapsed);
                  }
                  }

            `}
        </pre>
        </section>  

        <section>  
        <h1>Results</h1>
        <div className="source-result">
        <img alt="nagation-section" src="/gif/algos/que1.PNG"></img>
        </div>
        </section>

       
    </div>
    
            	
     
    )
}
