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
                        English
                        time limit per test: 2 second
                        memory limit per test: 500 bytes
                        input: standard input
                        output: standard output

        Chef is learning English. So far, he knows N words, and he wants to write a verse.

        Let's call a pair of English words a stanza. A verse is a list of stanzas. The prefixal rhyme of a stanza is the longest common prefix of 
        the words in it. Similarly, the suffixal rhyme of a stanza is the longest common suffix of the words in it. The beauty of a stanza whose 
        prefixal and suffixal rhymes have lengths lp and ls respectively is min(lp,ls)2.

        For example, a stanza formed by the words "abcdefghijkl" and "abcxyzhijkl" has a prefixal rhyme "abc" (with length 3), suffixal rhyme 
        "hijkl" (with length 5) and beauty min(3,5)2=32=9. The beauty of a verse is the sum of beauties of all its stanzas. For example, the beauty
        of the verse (("abcdefghijkl", "abcxyzhijkl"), ("world", "word"), ("code", "chef")) is 9+1+0=10.
        
        You are given N words W1,W2,…,WN (they are not necessarily distinct). Help Chef write the most beautiful verse. It is not necessary to use 
        all the words, but each word may be used at most once in the whole verse (more precisely, each element of the sequence W may be used only 
        once, but if some word appears k times in W, we can use it up to k times).


        Input:
        The first line of the input contains a single integer T denoting the number of test cases. The description of T test cases follows.
        The first line of each test case contains a single integer N.
        N lines follow. For each i (1≤i≤N), the i-th of these lines contains a single string Wi.

        Output:
        For each test case, print a single line containing one integer ― the greatest possible beauty of Chef's verse.

        Constraints:
        1≤T≤105
        1≤N≤105
        1≤|Wi|≤105
        for each valid i all words contain only lowercase English letters the sum of |W1|+|W2|+…+|WN| over all test cases does not exceed 105
             
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
              int ans;
              
              struct trie{
                  
                  trie *child[26];
                  int cnt;
              };
              
              trie *NewNode()
              {
                  struct trie *node = new trie();
                  int i;
                  #pragma omp for private(i)
                  for(i = 0;i < 26;++i)
                  {
                      node->child[i] = NULL;    
                  }
                  
                  
                  return node;
              }
              
              int dfs(trie *root,int height)
              {
                  #pragma omp if 
                  if(root == NULL)
                      return 0;
                  
                  int cnt = 0;
                  int i;
                  #pragma omp for private(i)
                  for(i = 0;i < 26;i++)
                  {
                      cnt += dfs(root->child[i],height + 1);
                  }
                  
                  root->cnt = root->cnt - cnt;
                  
                  #pragma omp if 
                  if(root->cnt > 1)
                  {
                      int n = (root->cnt / 2);
                      int tmp = (height / 2) * (height / 2);
                      ans += n * tmp;
                      cnt += 2 * n;
                  }
                  
                  delete root;
                  return cnt;
              }
              
              
              void insert(trie *root,string s)
              {
                  
                  int n = s.size();
                  int i;
                  #pragma omp for private(i)
                  for(i = 0;i < n;i++)
                  {
                      int ind = s[i] - 'a';
                      
                      #pragma omp if 
                      if(root->child[ind] == NULL)
                          root->child[ind] = NewNode();
                      
                      root = root->child[ind];
                      
                      root->cnt = root->cnt + 1;
                  }
                  
              }
              
              
              
              signed main()
              {
                  
                  ios_base::sync_with_stdio(0);
                  cin.tie(0);
                  cout.tie(0);
                  
                 
                  int t = 1;
                  cin >> t;
                  
                  
                  while(t--)
                  {
              
                     
              
                      int n;
                      cin >> n;
                      string s;
                      
                     struct trie *root = NewNode();
              
                     #define pragma parallel{
                      struct timeval tv1, tv2;
                     struct timezone tz;
                     double elapsed; 
                     gettimeofday(&tv1, &tz);
                      
                      while(n--)
                      {
                          cin >> s;
                          int n = s.size();
                          string S = s;
                          reverse(S.begin(),S.end());
                          string SS = "";
                          int i;
                          #pragma omp for private(i)
                          for(i = 0;i < n;++i)
                          {
                              SS += s[i];
                              SS += S[i];
                          }
                          
                          insert(root,SS);
                          
                      }
                      
                      ans = 0;
                      
                      dfs(root,0);
                      
                      cout << ans << '\n';
              
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
              int ans;
              
              struct trie{
                  
                  trie *child[26];
                  int cnt;
              };
              
              trie *NewNode()
              {
                  struct trie *node = new trie();
                  
                  for(int i = 0;i < 26;++i)
                  {
                      node->child[i] = NULL;    
                  }
                  
                  
                  return node;
              }
              
              int dfs(trie *root,int height)
              {
                  if(root == NULL)
                      return 0;
                  
                  int cnt = 0;
                  for(int i = 0;i < 26;i++)
                  {
                      cnt += dfs(root->child[i],height + 1);
                  }
                  
                  root->cnt = root->cnt - cnt;
                  
                  if(root->cnt > 1)
                  {
                      int n = (root->cnt / 2);
                      int tmp = (height / 2) * (height / 2);
                      ans += n * tmp;
                      cnt += 2 * n;
                  }
                  
                  delete root;
                  return cnt;
              }
              
              
              void insert(trie *root,string s)
              {
                  
                  int n = s.size();
                  
                  for(int i = 0;i < n;i++)
                  {
                      int ind = s[i] - 'a';
                      
                      if(root->child[ind] == NULL)
                          root->child[ind] = NewNode();
                      
                      root = root->child[ind];
                      
                      root->cnt = root->cnt + 1;
                  }
                  
              }
              
              
              
              signed main()
              {
                  
                  ios_base::sync_with_stdio(0);
                  cin.tie(0);
                  cout.tie(0);
                  
                 
                  int t = 1;
                  cin >> t;
                  
                  
                  while(t--)
                  {
              
                     struct timeval tv1, tv2;
                     struct timezone tz;
                     double elapsed; 
                     gettimeofday(&tv1, &tz);
              
                      int n;
                      cin >> n;
                      string s;
                      
                     struct trie *root = NewNode();
                      
                      while(n--)
                      {
                          cin >> s;
                          int n = s.size();
                          string S = s;
                          reverse(S.begin(),S.end());
                          string SS = "";
                          
                          for(int i = 0;i < n;++i)
                          {
                              SS += s[i];
                              SS += S[i];
                          }
                          
                          insert(root,SS);
                          
                      }
                      
                      ans = 0;
                      
                      dfs(root,0);
                      
                      cout << ans << '\n';
              
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
        <img alt="nagation-section" src="/gif/algos/que5.PNG"></img>
        </div>
        </section>

    </div>
    
            	
     
    )
}
