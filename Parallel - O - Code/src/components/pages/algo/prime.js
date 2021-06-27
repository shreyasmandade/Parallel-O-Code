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

        int n,i,j;
        int prime[1000];

        cout<<"In order to find prime number from 1 - n enter value of n\n";
        cin>>n;

        for(i=1;i<=n;i++)
            prime[i]=1;
        prime[1]=0;

        double start,end;
        //start=omp_get_wtime();

        for(i=2;i*i<=n;i++)
        {

            //#pragma omp parallel for
            for(j=i*i;j<=n;j+=i)
            {
                if(prime[j]==1)
                    prime[j]=0;
            }
        }

        //end=omp_get_wtime();
        cout<<"Prime numbers are as follows\n";
        for(i=1;i<=n;i++)
            if(prime[i])
                cout<<i<<" ";
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

            int n,i,j;
            int prime[1000];

            cout<<"In order to find prime number from 1 - n enter value of n\n";
            cin>>n;

            for(i=1;i<=n;i++)
                prime[i]=1;
            prime[1]=0;

            double start,end;
            start=omp_get_wtime();

            for(i=2;i*i<=n;i++)
            {

                #pragma omp parallel for
                for(j=i*i;j<=n;j+=i)
                {
                    if(prime[j]==1)
                        prime[j]=0;
                }
            }

            end=omp_get_wtime();
            cout<<"Prime numbers are as follows\n";
            for(i=1;i<=n;i++)
                if(prime[i])
                    cout<<i<<" ";
            cout<<"---------------\n Time taken "<<end-start;

            return 0;
        }


              
            `}
        </pre>
        </section>  

        <section>  
        <h1>Results</h1>
        <div className="source-result">
            <img alt="nagation-section" src="/gif/algos/prime.PNG"></img>
        </div>
        </section>
    </div>
    
            	
     
    )
}
