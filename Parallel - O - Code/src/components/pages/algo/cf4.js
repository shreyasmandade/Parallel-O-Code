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

        <h1>Codechef Question</h1>
        <pre className="source-code">
            {`
                        
                        Cute Chef Gift
                        time limit per test: 1 second
                        memory limit per test: 500 bytes
                        input: standard input
                        output: standard output

            Chef wants to give a gift to Chefina to celebrate their anniversary. Of course, he has a sequence a1,a2,…,aN ready for this occasion. 
            Since the half-heart necklace is kind of cliche, he decided to cut his sequence into two pieces and give her a piece instead. Formally, 
            he wants to choose an integer l (1≤l<N) and split the sequence into its prefix with length l and its suffix with length N−l

            Chef wants his gift to be cute; he thinks that it will be cute if the product of the elements in Chefina's piece is coprime with 
            the product of the elements in his piece. Can you tell him where to cut the sequence? Find the smallest valid l such that Chef's gift 
            would be cute.

            Input:
            The first line of the input contains a single integer T denoting the number of test cases. The description of T test cases follows.
            The first line of each test case contains the integer N.
            The second line contains N space-separated integers a1,a2,…,aN.

            Output:
            For each test case, print a single line containing one integer l where Chef should cut the sequence.

            It is guaranteed that a solution exists for the given test data.

            Constraints:
            1≤T≤20
            2≤N≤105
            2≤ai≤105
            for each valid i the sum of N over all test cases does not exceed 3⋅105

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
              
              int TAKE = 0;
              
              const int MAX = 1e5 + 5;
              int isprime[MAX];
              
              struct custom_hash {
                  static uint64_t splitmix64(uint64_t x) {
                     
                      x += 0x9e3779b97f4a7c15;
                      x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
                      x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
                      return x ^ (x >> 31);
                  }
              
                  size_t operator()(uint64_t x) const {
                      static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();
                      return splitmix64(x + FIXED_RANDOM);
                  }
                  
                  //declare : unordered_map<long long, int, custom_hash>mp;  
              };
              
              //to store smallest prime factor of number
              void sieve()
              {
                  for(int i = 1;i < MAX;++i)
                        isprime[i] = i;
              
                  for(int i = 2;i < MAX;++i)
                  {
                      if(i == isprime[i])
                      {
                          for(int j = 2 * i;j <= MAX;j += i)
                          {
                                  if(isprime[j] == j)
                                  isprime[j] = i;
                          }
                      }
                  }
              
              }
              // A O(log n) function returning primefactorization 
               
              vector<int>factorize(int x) 
              { 
                  vector<int>res; 
                  while (x != 1) 
                  { 
                      res.push_back(isprime[x]); 
                      x = x / isprime[x]; 
                  } 
                  return res; 
              } 
              
              //function to store frequency of primefactors
              unordered_map<int,int,custom_hash>mp; 
               unordered_map<int,int,custom_hash>MP; 
              void store(int x)
              {
                   while(x > 1)
                              {
                                  int val = isprime[x];
                                  int cnt = 0;
                                  while(isprime[x] == val)
                                  {
                                      x /= isprime[x];
                                      cnt++;
                                  }
                                  if(TAKE == 1)
                                      MP[val] += cnt;
                                  else
                                      mp[val] += cnt;
                              }
              }
              
              
              signed main()
              {
                  ios_base::sync_with_stdio(false);
                  cin.tie(NULL);
                  cout.tie(NULL);
                  
                  
                  sieve();
                  int testCases = 1;
                  cin >> testCases;
                  
                  while(testCases--)
                  {
              
                     struct timeval tv1, tv2;
                     struct timezone tz;
                     double elapsed; 
                     gettimeofday(&tv1, &tz);
              
                     int n;
                     cin >> n;
                     
                     vector<int>a(n);
                     TAKE = 0;
                     mp.clear();
                     MP.clear();
                      
                     for(auto &it : a)
                          {
                              cin >> it;
                              store(it);
                          }
                     
                     int ans = -1;
                 
                     TAKE = 1;
                     
                     for(int i = 0;i < n;++i)
                     {
                         bool flg = true;
                         store(a[i]);
                         
                        for(auto it : MP)
                        {
                           
                            int val = mp[it.first];
                            if(val != it.second)
                            {
                                flg = false;
                                break;
                            }
                        }
                        
                        if(flg)
                        {
                            ans = i + 1;
                            break;
                        }
                  
                     }
                     
                     assert(ans != -1);
                     
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
              
              int TAKE = 0;
              
              const int MAX = 1e5 + 5;
              int isprime[MAX];
              
              struct custom_hash {
                  static uint64_t splitmix64(uint64_t x) {
                     
                      x += 0x9e3779b97f4a7c15;
                      x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
                      x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
                      return x ^ (x >> 31);
                  }
              
                  size_t operator()(uint64_t x) const {
                      static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();
                      return splitmix64(x + FIXED_RANDOM);
                  }
                  
                  //declare : unordered_map<long long, int, custom_hash>mp;  
              };
              
              //to store smallest prime factor of number
              void sieve()
              {
                 int i,j;
                 #pragma omp for private(i);
                  for(i = 1;i < MAX;++i)
                        isprime[i] = i;
              
                  #pragma omp for private(i,j);
                  for(i = 2;i < MAX;++i)
                  {
                    #pragma omp if
                      if(i == isprime[i])
                      {
                          for(j = 2 * i;j <= MAX;j += i)
                          {
                                  #pragma omp if
                                  if(isprime[j] == j)
                                  isprime[j] = i;
                          }
                      }
                  }
              
              }
              // A O(log n) function returning primefactorization 
               
              vector<int>factorize(int x) 
              { 
                  vector<int>res; 
                  while (x != 1) 
                  { 
                      res.push_back(isprime[x]); 
                      x = x / isprime[x]; 
                  } 
                  return res; 
              } 
              
              //function to store frequency of primefactors
              unordered_map<int,int,custom_hash>mp; 
               unordered_map<int,int,custom_hash>MP; 
              void store(int x)
              {
                   while(x > 1)
                              {
                                  int val = isprime[x];
                                  int cnt = 0;
                                  while(isprime[x] == val)
                                  {
                                      x /= isprime[x];
                                      cnt++;
                                  }
                                  #pragma omp if
                                  if(TAKE == 1)
                                      MP[val] += cnt;
                                  else
                                      mp[val] += cnt;
                              }
              }
              
              
              signed main()
              {
                  ios_base::sync_with_stdio(false);
                  cin.tie(NULL);
                  cout.tie(NULL);
                  
                  
                  sieve();
                  int testCases = 1;
                  cin >> testCases;
                  
                  while(testCases--)
                  {
              
                     
                     int n;
                     cin >> n;
                     
                     vector<int>a(n);
                     TAKE = 0;
                     mp.clear();
                     MP.clear();
                    
                     #pragma omp for
                     for(auto &it : a)
                          {
                              cin >> it;
                              store(it);
                          }
                     
                     int ans = -1;
                 
                     TAKE = 1;
              
                     #define pragma parallel{
              
                    struct timeval tv1, tv2;
                     struct timezone tz;
                     double elapsed; 
                     gettimeofday(&tv1, &tz);
                     int i;
                     #pragma omp for private(i)
                     for(i = 0;i < n;++i)
                     {
                         bool flg = true;
                         store(a[i]);
                         
                        for(auto it : MP)
                        {
                           
                            int val = mp[it.first];
                            #pragma omp if
                            if(val != it.second)
                            {
                                flg = false;
                                break;
                            }
                        }
                        
                        #pragma omp if
                        if(flg)
                        {
                            ans = i + 1;
                            break;
                        }
                  
                     }
                     
                     assert(ans != -1);
                     
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
        <img alt="nagation-section" src="/gif/algos/que4.PNG"></img>
        </div>
        </section>

       
    </div>
    
            	
     
    )
}
