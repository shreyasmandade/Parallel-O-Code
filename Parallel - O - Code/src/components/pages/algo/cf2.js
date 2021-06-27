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
               
                                            C. Peaceful Rooks
                                            time limit per test: 1 second
                                            memory limit per test: 256 megabytes
                                            input: standard input
                                            output: standard output

                    You are given a n×n chessboard. Rows and columns of the board are numbered from 1 to n. Cell (x,y) lies on the intersection of 
               column number x and row number y.
               Rook is a chess piece, that can in one turn move any number of cells vertically or horizontally. There are m rooks (m<n) placed on 
               the chessboard in such a way that no pair of rooks attack each other. I.e. there are no pair of rooks that share a row or a column.In
                one turn you can move one of the rooks any number of cells vertically or horizontally. Additionally, it shouldn't be attacked by any
                other rook after movement. What is the minimum number of moves required to place all the rooks on the main diagonal?The main diagonal
                of the chessboard is all the cells (i,i), where 1≤i≤n.

                Input:
                The first line contains the number of test cases t (1≤t≤103). Description of the t test cases follows.
                The first line of each test case contains two integers n and m — size of the chessboard and the number of rooks (2≤n≤105, 1≤m<n). 
                Each of the next m lines contains two integers xi and yi — positions of rooks, i-th rook is placed in the cell (xi,yi) (1≤xi,yi≤n). 
                It's guaranteed that no two rooks attack each other in the initial placement.

                The sum of n over all test cases does not exceed 105.

                Output:
                For each of t test cases print a single integer — the minimum number of moves required to place all the rooks on the main diagonal.
                It can be proved that this is always possible.

             
            `}
        </pre>
  
        </section> 

        <section>  
        <h1>Sequential Code</h1>
        <pre className="source-code">
            {`
             
             #include<bits/stdc++.h>
            using namespace std;
            #include <omp.h>
            #include <sys/time.h>
            const int MAX = 1e5 + 5;

            int answer;


            bool dfs(vector<int>adj[],int u,vector<bool>&visited,vector<bool>&recStack) 
            { 
                if(!visited[u]) 
                { 
                    visited[u] = recStack[u] = true; 
            
                    for(auto v : adj[u]) 
                    { 
                        if (!visited[v] && dfs(adj, v, visited, recStack)) 
                            return true; 
                        else if (recStack[v]) 
                            return true; 
                    } 
            
                } 

                recStack[u] = false;  
                return false; 
            } 
                
            signed main() 
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

                    int n, m;
                    cin >> n >> m;

                    vector<pair<int,int>>v(m); 

                    for(int i = 0;i < m;++i)
                        cin >> v[i].first >> v[i].second;
                    
                    answer = 0; 

                    vector<int>adj[n+1];

                    for(int i = 0;i < m;++i)
                    {
                        if(v[i].first != v[i].second)
                        {
                            adj[v[i].first].push_back(v[i].second);
                            answer++;
                        }
                    }

                    vector<bool>visited(n+1,false),recStack(n+1, false);

                    for(int i = 1;i <= n;++i)
                    {
                        if(!visited[i] && dfs(adj, i, visited, recStack))
                            answer++;
                    }

                    cout << answer << '\n';

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
              
              #include<bits/stdc++.h>
              using namespace std;
              #include <omp.h>
              #include <sys/time.h>
              const int MAX = 1e5 + 5;
              
              int answer;
              
              
              bool dfs(vector<int>adj[],int u,vector<bool>&visited,vector<bool>&recStack) 
              { 
                 #pragma omp if
                  if(!visited[u]) 
                  { 
                      visited[u] = recStack[u] = true; 
                
                      for(auto v : adj[u]) 
                      { 
                          if (!visited[v] && dfs(adj, v, visited, recStack)) 
                              return true; 
                          else if (recStack[v]) 
                              return true; 
                      } 
                
                  } 
              
                  recStack[u] = false;  
                  return false; 
              } 
                  
              signed main() 
              {
                 ios_base::sync_with_stdio(false);
                 cin.tie(NULL);
                 cout.tie(NULL);
                  
                  int tt = 1;
                  cin >> tt;
                  
                 while(tt--)
                  {
                      
                      int n, m;
                      cin >> n >> m;
              
                      vector<pair<int,int>>v(m); 
              
                      for(int i = 0;i < m;++i)
                          cin >> v[i].first >> v[i].second;
              
                       
              
                      
                      answer = 0; 
              
                      vector<int>adj[n+1];
              
                      for(int i = 0;i < m;++i)
                      {
                          if(v[i].first != v[i].second)
                          {
                              adj[v[i].first].push_back(v[i].second);
                              answer++;
                          }
                      }
              
                      vector<bool>visited(n+1,false),recStack(n+1, false);
              
                      struct timeval tv1, tv2;
                      struct timezone tz;
                      double elapsed;
              
                      gettimeofday(&tv1, &tz);
              
                      for(int i = 1;i <= n;++i)
                      {
                          #pragma omp parallel
                          {
                              #pragma omp if
                              if(!visited[i] && dfs(adj, i, visited, recStack))
                                  answer++;
                          }
                      }
              
                      cout << answer << '\n';
              
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
        <img alt="nagation-section" src="/gif/algos/que2.PNG"></img>
        </div>
        </section>

       
    </div>
    
            	
     
    )
}
