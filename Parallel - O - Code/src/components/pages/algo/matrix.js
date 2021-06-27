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
              
              #include <bits/stdc++.h>
              #include<omp.h>
              using namespace std;
              
              int main()
              {
              
                  int n,i,j,k;
              
                  cout<<"Enter the size of matrix \n";
                  cin>>n;
              
                  int a[n][n],b[n][n],c[n][n];
                  for(i=0;i<n;i++)
                  {
                      for(j=0;j<n;j++)
                      {
                          a[i][j]=2;
                          b[i][j]=2;
                          c[i][j]=0;
                      }
                  }
              
                  double start,end;
                  //start=omp_get_wtime();
              
                  //#pragma omp parallel for private(i,j,k) shared(a,b,c)
                  for(i=0;i<n;i++)
                  {
                      for(j=0;j<n;j++)
                      {
                          for(k=0;k<n;k++)
                              c[i][j]+=a[i][k]*b[k][j];
                      }
                  }
              
                  //end=omp_get_wtime();
                  cout<<"The resultant matrix is as follows\n";
                  for(i=0;i<n;i++)
                  {
                      for(j=0;j<n;j++)
                      {
                          cout<<c[i][j]<<" ";
                      }
                      cout<<endl;
                  }
                  //cout<<"---------------\n Time taken "<<end-start;
              
                  return 0;
              }
              
              
             
              
            `}
        </pre>
        </section>  

        <section>  
        <h1>Parallel Code</h1>
        <pre className="source-code">
            {`
              
            #include <bits/stdc++.h>
            #include<omp.h>
            using namespace std;

            int main()
            {

                int n,i,j,k;

                cout<<"Enter the size of matrix \n";
                cin>>n;

                int a[n][n],b[n][n],c[n][n];
                for(i=0;i<n;i++)
                {
                    for(j=0;j<n;j++)
                    {
                        a[i][j]=2;
                        b[i][j]=2;
                        c[i][j]=0;
                    }
                }

                double start,end;
                start=omp_get_wtime();

                #pragma omp parallel for private(i,j,k) shared(a,b,c)
                for(i=0;i<n;i++)
                {
                    for(j=0;j<n;j++)
                    {
                        for(k=0;k<n;k++)
                            c[i][j]+=a[i][k]*b[k][j];
                    }
                }

                end=omp_get_wtime();
                cout<<"The resultant matrix is as follows\n";
                for(i=0;i<n;i++)
                {
                    for(j=0;j<n;j++)
                    {
                        cout<<c[i][j]<<" ";
                    }
                    cout<<endl;
                }
                cout<<"---------------\n Time taken "<<end-start;

                return 0;
            }


              
            `}
        </pre>
        </section>  

        <section>  
        <h1>Results</h1>
        <div className="source-result">
        <img alt="nagation-section" src="/gif/algos/matrix.PNG"></img>
        </div>
        </section>
    </div>
    
            	
     
    )
}
