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
              
              #include <omp.h>
              #include <stdio.h>
              #include <stdlib.h>
              //#define MAX_THREADS 8
              
              static long steps = 1000000000;
              double step;
              
              int main () {
              
                  int i,j;
                  double x;
                  double pi, sum = 0.0;
                  //double start, delta;
              
                  double start = omp_get_wtime();
                  step = 1.0/(double) steps;
              
              
                      for (i=0; i < steps; i++)
                      {
                          x = (i+0.5)*step;
                          sum += 4.0 / (1.0+x*x);
                      }
              
                      // Out of the parallel region, finialize computation
                      pi = step * sum;
                      double delta = omp_get_wtime() - start;
                      printf("PI = %.16g computed in %.4g seconds", pi, delta);
              
                      return 0;
              
                  }              
             
              
            `}
        </pre>
        </section>  

        <section>  
        <h1>Parallel Code</h1>
        <pre className="source-code">
            {`
              
              #include <omp.h>
              #include <stdio.h>
              #include <stdlib.h>
              #define MAX_THREADS 8
              
              static long steps = 1000000000;
              double step;
              
              int main (int argc, const char *argv[]) {
              
                  int i,j;
                  double x;
                  double pi, sum = 0.0;
                  double start, delta;
              
                  step = 1.0/(double) steps;
              
                  // Compute parallel compute times for 1-MAX_THREADS
                  for (j=1; j<= MAX_THREADS; j++) {
              
                      printf(" running on %d threads: ", j);
              
                      // This is the beginning of a single PI computation
                      omp_set_num_threads(j);
              
                      sum = 0.0;
                      double start = omp_get_wtime();
              
              
                      #pragma omp parallel for reduction(+:sum) private(x)
                      for (i=0; i < steps; i++) {
                          x = (i+0.5)*step;
                          sum += 4.0 / (1.0+x*x);
                      }
              
                      // Out of the parallel region, finialize computation
                      pi = step * sum;
                      delta = omp_get_wtime() - start;
                      printf("PI = %.16g computed in %.4g seconds", pi, delta);
              
                  }
                  return 0;
              
              }
              
              
            `}
        </pre>
        </section>  

        <section>  
        <h1>Results</h1>
        <div className="source-result">
        <img alt="nagation-section" src="/gif/algos/pi.PNG"></img>
        </div>
        </section>
    </div>
    
            	
     
    )
}
