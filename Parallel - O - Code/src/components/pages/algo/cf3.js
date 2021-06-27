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
               
                                    D. Radio Towers
                                    time limit per test: 2 second
                                    memory limit per test: 512 megabytes
                                    input: standard input
                                    output: standard output

            There are n+2 towns located on a coordinate line, numbered from 0 to n+1. The i-th town is located at the point i.

            You build a radio tower in each of the towns 1,2,…,n with probability 12 (these events are independent). After that, you want to set the 
            signal power on each tower to some integer from 1 to n (signal powers are not necessarily the same, but also not necessarily different). The 
            signal from a tower located in a town i with signal power p reaches every city c such that |c−i|<p.
            After building the towers, you want to choose signal powers in such a way that:

            * towns 0 and n+1 don't get any signal from the radio towers;
            * towns 1,2,…,n get signal from exactly one radio tower each.       
            
            For example, if n=5, and you have built the towers in towns 2, 4 and 5, you may set the signal power of the tower in town 2 to 2, and the 
            signal power of the towers in towns 4 and 5 to 1. That way, towns 0 and n+1 don't get the signal from any tower, towns 1, 2 and 3 get the 
            signal from the tower in town 2, town 4 gets the signal from the tower in town 4, and town 5 gets the signal from the tower in town 5.

            Calculate the probability that, after building the towers, you will have a way to set signal powers to meet all constraints.

            Input:
            The first (and only) line of the input contains one integer n (1≤n≤2⋅105).

            Output:
            Print one integer — the probability that there will be a way to set signal powers so that all constraints are met, taken modulo 998244353.
            Formally, the probability can be expressed as an irreducible fraction xy. You have to print the value of x⋅y−1mod998244353, where y−1 is an 
            integer such that y⋅y−1mod998244353=1.

            `}
        </pre>
  
        </section> 

        <section>  
        <h1>Sequential Code</h1>
        <pre className="source-code">
            {`
              
              #include <bits/stdc++.h>
              using namespace std;
              #include <omp.h>
              #include <sys/time.h>
              
              const int maxs = 5000;
              long long int fact[maxs];
              long long int invfact[maxs];
              const long long mod = 998244353;
               
              inline long long add(long long a,long long b) 
              {
                  long long ADD = (a % mod + b % mod) % mod;
                  return ADD;
              }
              inline long long mul(long long a,long long b) 
              {
                  long long MUL = (a % mod * b % mod) % mod;
                  return MUL;
              }
              long long fastpow(long long x,long long y)
              {
                  long long res = 1;
                  x = x % mod;
                  while (y > 0)
                  {
                      if(y & 1)
                          res = (res * x) % mod;
                      y = y >> 1;
                      x = (x * x) % mod;
                  }
                  return res;
              }
               
              void pre()
              {
                  fact[0] = 1;
                  int i;
                  for(i = 1;i < maxs;i++)
                  {
                      fact[i] = mul(i,fact[i - 1]);
                  }
                  
                  --i;
                  
                  invfact[i] = fastpow(fact[i],mod - 2);
                  
                  for(i--;i >= 0;--i)
                  {
                      invfact[i] = mul(invfact[i + 1],(i + 1));
                  }
              }
               
              long long int ncr(long long int n,long long int r)
              {
                  if(r > n || n < 0 || r < 0)
                      return 0;
                  
                  long long int res = mul(mul(fact[n],invfact[r]),invfact[n-r]);
                  
                  return res;
              }
               
              const int maxs1 = 2e5 + 3;
              long long int A[maxs1];
               
              void pre1()
              {
                  A[1] = A[2] = 1;
                  
                  for(int i = 3;i < maxs1;++i)
                      A[i] = add(A[i - 1] , A[i - 2]);
              }
               
              signed main()
              {
                      
                    int tt;
                    cin >> tt;
                    pre1();
                    while(tt--)
                    {
                      struct timeval tv1, tv2;
                      struct timezone tz;
                      double elapsed; 
                      gettimeofday(&tv1, &tz);
              
                      
                    
                      long long int n,i,j;
                      cin >> n;
                         
                      long long int ways = A[n];
                         
                             
                      long long int denm = fastpow(2LL,n);
                      long long int invdenm = fastpow(denm,mod - 2LL);
                      long long int ans = mul(ways,invdenm);
                      cout << ans;
                         
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
              using namespace std;
              #include <omp.h>
              #include <sys/time.h>
              
              const int maxs = 5000;
              long long int fact[maxs];
              long long int invfact[maxs];
              const long long mod = 998244353;
               
              inline long long add(long long a,long long b) 
              {
                  long long ADD = (a % mod + b % mod) % mod;
                  return ADD;
              }
              inline long long mul(long long a,long long b) 
              {
                  long long MUL = (a % mod * b % mod) % mod;
                  return MUL;
              }
              long long fastpow(long long x,long long y)
              {
                  long long res = 1;
                  x = x % mod;
                  while (y > 0)
                  {
                      #pragma omp if
                      if(y & 1)
                          res = (res * x) % mod;
                      y = y >> 1;
                      x = (x * x) % mod;
                  }
                  return res;
              }
               
              void pre()
              {
                  fact[0] = 1;
                  int i;
                  #pragma omp for private(i)
                  for(i = 1;i < maxs;i++)
                  {
                      fact[i] = mul(i,fact[i - 1]);
                  }
                  
                  --i;
                  
                  invfact[i] = fastpow(fact[i],mod - 2);
                  
                  #pragma omp for private(i)
                  for(i--;i >= 0;--i)
                  {
                      invfact[i] = mul(invfact[i + 1],(i + 1));
                  }
              }
               
              long long int ncr(long long int n,long long int r)
              {
                  #pragma omp if
                  if(r > n || n < 0 || r < 0)
                      return 0;
                  
                  long long int res = mul(mul(fact[n],invfact[r]),invfact[n-r]);
                  
                  return res;
              }
               
              const int maxs1 = 2e5 + 3;
              long long int A[maxs1];
               
              void pre1()
              {
                  A[1] = A[2] = 1;
                  int i;
                  #pragma omp for private(i)
                  for(i = 3;i < maxs1;++i)
                      A[i] = add(A[i - 1] , A[i - 2]);
              }
               
              signed main()
              {
                      
                    int tt;
                    cin >> tt;
                    pre1();
                    while(tt--)
                    {
                      
              
                      
                    
                      long long int n,i,j;
                      cin >> n;
                         
                      long long int ways = A[n];
                  
                      #define pragma parallel{
                      struct timeval tv1, tv2;
                      struct timezone tz;
                      double elapsed; 
                      gettimeofday(&tv1, &tz);
                             
                      long long int denm = fastpow(2LL,n);
                      long long int invdenm = fastpow(denm,mod - 2LL);
                      long long int ans = mul(ways,invdenm);
                      cout << ans;
                         
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
        <img alt="nagation-section" src="/gif/algos/que3.PNG"></img>
        </div>
        </section>

    </div>
    
            	
     
    )
}
