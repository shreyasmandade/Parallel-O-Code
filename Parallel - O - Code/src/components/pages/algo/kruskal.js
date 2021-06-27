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
        <h1>Sequential Code</h1>
        <pre className="source-code">
            {`
              
              #include<stdio.h>
              //#include<conio.h>
              #include<stdlib.h>
              #include<omp.h>
              #include <sys/time.h>
              int i,j,k,a,b,u,v,n,ne=1,edge1,edge2,e;
              int min,mincost=0,cost[101][101],parent[101];
              int find(int);
              int uni(int,int);
              
              int main()
              {
                 struct timeval tv1, tv2;
                  struct timezone tz;
                double elapsed; 
               printf("Enter the no. of vertices");
               scanf("%d",&n);
               printf("Enter the cost of each cell as adjacency matrix.");
              for(i=1;i<=n;i++)
               {
                for(j=1;j<=n;j++)
                {
                 scanf("%d",&cost[i][j]);
                 if(cost[i][j]==0)
                  cost[i][j]=999;
                }
               }
              
               printf("The edges of Minimum Cost Spanning Tree are");
               gettimeofday(&tv1, &tz);
              //#pragma omp parallel reduction(+: mincost), private(min,a,u,v,b)
               {
               while(ne<n)
               {
                for(i=1,min=999;i<=n;i++)
                {
                 for(j=1;j<=n;j++)
                 {
                  if(cost[i][j]<min)
                  {
                   min=cost[i][j];
                   a=u=i;
                   b=v=j;
                  }
                 }
                }
                u=find(u);
                v=find(v);
                if(uni(u,v))
                {
                 printf("%d edge (%d,%d) =%d",ne++,a,b,min);
                 mincost +=min;
                }
                cost[a][b]=cost[b][a]=999;
               }
               }
              
               printf("Minimum cost = %d",mincost);
                gettimeofday(&tv2, &tz);
                  printf("");
                   elapsed = (double) (tv2.tv_sec-tv1.tv_sec) + (double) (tv2.tv_usec-tv1.tv_usec) * 1.e-6;
                  printf("elapsed time = %f seconds.", elapsed);
              
              }
              int find(int i)
              {
               while(parent[i])
                i=parent[i];
               return i;
              }
              int uni(int i,int j)
              {
               if(i!=j)
               {
                parent[j]=i;
                return 1;
               }
               return 0;
              }
              
            `}
        </pre>
        </section>  

        <section>  
        <h1>Parallel Code</h1>
        <pre className="source-code">
            {`
              
              #include<stdio.h>
              //#include<conio.h>
              #include<stdlib.h>
              #include<omp.h>
              #include <sys/time.h>
              int i,j,k,a,b,u,v,n,ne=1,edge1,edge2,e;
              int min,mincost=0,cost[101][101],parent[101];
              int find(int);
              int uni(int,int);
              
              int main()
              {
                struct timeval tv1, tv2;
                  struct timezone tz;
                double elapsed; 
              
               printf("Enter the no. of vertices");
               scanf("%d",&n);
               printf("Enter the cost of each cell as adjacency matrix. ");
              for(i=1;i<=n;i++)
               {
                for(j=1;j<=n;j++)
                {
                 scanf("%d",&cost[i][j]);
                 if(cost[i][j]==0)
                  cost[i][j]=999;
                }
               }
               
               printf("The edges of Minimum Cost Spanning Tree are");
               gettimeofday(&tv1, &tz);
              #pragma omp parallel reduction(+: mincost), private(min,a,u,v,b)
               {
               while(ne<n)
               {
                for(i=1,min=999;i<=n;i++)
                {
                 for(j=1;j<=n;j++)
                 {
                  if(cost[i][j]<min)
                  {
                   min=cost[i][j];
                   a=u=i;
                   b=v=j;
                  }
                 }
                }
                u=find(u);
                v=find(v);
                if(uni(u,v))
                {
                 printf("%d edge (%d,%d) =%d",ne++,a,b,min);
                 mincost +=min;
                }
                cost[a][b]=cost[b][a]=999;
               }
               }
              gettimeofday(&tv2, &tz);
               printf("Minimum cost = %d",mincost);
                elapsed = (double) (tv2.tv_sec-tv1.tv_sec) + (double) (tv2.tv_usec-tv1.tv_usec) * 1.e-6;
                  printf("elapsed time = %f seconds.", elapsed);
              
              }
              int find(int i)
              {
               while(parent[i])
                i=parent[i];
               return i;
              }
              int uni(int i,int j)
              {
               if(i!=j)
               {
                parent[j]=i;
                return 1;
               }
               return 0;
              }
            `}
        </pre>
        </section>  

        <section>  
        <h1>Results</h1>
        <div className="source-result">
        <img alt="nagation-section" src="/gif/algos/kruskal.PNG"></img>
        </div>
        </section>
       
    </div>
    
            	
     
    )
}
