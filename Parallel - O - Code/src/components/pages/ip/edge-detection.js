import React from 'react'
import '../algo/sorting.css'

export default function Negation() {
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

        <h1>Edge Detection Sequential</h1>
        <pre className="source-code">
            {`
                  
                  
    #include <stdlib.h>
    #include <stdio.h>
    #include <png.h>
    #include<omp.h>
    #include<string.h>

    int width,height,dimensions;
    png_byte color_type;
    png_byte bit_depth;
    png_bytep *row_pointers = NULL;

    void read_png_file(char *filename) {
        fflush(stdin);
        FILE *fp = fopen(filename, "rb");
      if(fp==NULL){
        return ;
      }
        png_structp png = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
        if(!png) {
            abort();
        }

        
        png_infop info = png_create_info_struct(png);
        if(!info){
          
          abort();
        } 
      
        if(setjmp(png_jmpbuf(png))){
          abort();
        } 

        png_init_io(png, fp);

        png_read_info(png, info);

        width     = png_get_image_width(png, info);
        height    = png_get_image_height(png, info);
        
        color_type = png_get_color_type(png, info);
        bit_depth  = png_get_bit_depth(png, info);
      
        dimensions = height;
        if(bit_depth == 16)
          png_set_strip_16(png);

        if(color_type == PNG_COLOR_TYPE_PALETTE)
          png_set_palette_to_rgb(png);

        // PNG_COLOR_TYPE_GRAY_ALPHA is always 8 or 16bit depth.
        if(color_type == PNG_COLOR_TYPE_GRAY && bit_depth < 8)
          png_set_expand_gray_1_2_4_to_8(png);

        if(png_get_valid(png, info, PNG_INFO_tRNS))
          png_set_tRNS_to_alpha(png);

        // These color_type don't have an alpha channel then fill it with 0xff.
        if(color_type == PNG_COLOR_TYPE_RGB ||
          color_type == PNG_COLOR_TYPE_GRAY ||
          color_type == PNG_COLOR_TYPE_PALETTE)
          png_set_filler(png, 0xFF, PNG_FILLER_AFTER);

        if(color_type == PNG_COLOR_TYPE_GRAY ||
          color_type == PNG_COLOR_TYPE_GRAY_ALPHA)
          png_set_gray_to_rgb(png);

        png_read_update_info(png, info);

        //if (row_pointers) abort();

        row_pointers = (png_bytep*)malloc(sizeof(png_bytep) * height);
        for(int y = 0; y < height; y++) {
          row_pointers[y] = (png_byte*)malloc(png_get_rowbytes(png,info));
        }

        png_read_image(png, row_pointers);
        
        fclose(fp);
      
        png_destroy_read_struct(&png, &info, NULL);
    }

    void write_png_file(char *filename) {
      int y;
      FILE *fp = fopen(filename, "wb");
      if(!fp) abort();

      png_structp png = png_create_write_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
      if (!png) abort();

      png_infop info = png_create_info_struct(png);
      if (!info) abort();

      if (setjmp(png_jmpbuf(png))) abort();

      png_init_io(png, fp);

      // Output is 8bit depth, RGBA format.
    // printf("\nBefore png set IHDR\n");
      png_set_IHDR(
        png,
        info,
        width, height,
        8,
        PNG_COLOR_TYPE_RGBA,
        PNG_INTERLACE_NONE,
        PNG_COMPRESSION_TYPE_DEFAULT,
        PNG_FILTER_TYPE_DEFAULT
      );
    //  printf("\nbefore png write info\n");  
      png_write_info(png, info);

      // To remove the alpha channel for PNG_COLOR_TYPE_RGB format,
      // Use png_set_filler().
      
        png_write_image(png, row_pointers);
        png_write_end(png, NULL);
      for(int y = 0; y < height; y++) {
          free(row_pointers[y]);
        }
      free(row_pointers);
        fclose(fp);

        png_destroy_write_struct(&png, &info);
    }

    void maskRGB(){
      //sobel edge operators for y direction
        int maskMatrix[3][3]={-1,-2,-1,0,0,0,1,2,1};
        int size  = height * width;
        int *maskedImageR = (int*)malloc(size*sizeof(int));
        int *maskedImageG = (int*)malloc(size*sizeof(int));
        int *maskedImageB = (int*)malloc(size*sizeof(int));
    
        for(int i=0;i<size;i++){
          maskedImageR[i]=0;
          maskedImageG[i]=0;
          maskedImageB[i]=0;
        }
        int averageR = 0,averageG = 0,averageB = 0;
        int val=0,maskDimensions=3;
        for(int i=0 ; i < height; i++){
          
              for(int j=0 ; j < width ; j++){
                  averageR = 0;
                  averageG = 0;
                  averageB = 0;

                  for(int itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++){
                          if(itImageX>=0 && itImageX< height)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(int itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++){
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                                  
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;

              }
        }

        
        val=0;
        //sobel edge operators for y direction
        maskMatrix[0][0] = -1;
        maskMatrix[0][1] = 0;
        maskMatrix[0][2] = 1;
        maskMatrix[1][0] = -2;
        maskMatrix[1][1] = 0;
        maskMatrix[1][2] = 2;
        maskMatrix[2][0] = -1;
        maskMatrix[2][1] = 0;
        maskMatrix[2][2] = 1;
      
        for(int i=0 ; i < height; i++){
          
              for(int j=0 ; j < width ; j++){

                  averageR = 0;
                  averageG = 0;
                  averageB = 0;

                  for(int itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++)
                  {
                          if(itImageX>=0 && itImageX< height)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(int itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++){
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;
              }
        }
        val=0;
        //sobel point operators
        maskMatrix[0][0] = -1;
        maskMatrix[0][1] = -1;
        maskMatrix[0][2] = -1;
        maskMatrix[1][0] = -1;
        maskMatrix[1][1] =  8;
        maskMatrix[1][2] = -1;
        maskMatrix[2][0] = -1;
        maskMatrix[2][1] = -1;
        maskMatrix[2][2] = -1;
        
        for(int i=0 ; i < height; i++){
          
              for(int j=0 ; j < width ; j++){
                  averageR = 0;
                  averageG = 0;
                  averageB = 0;
                  for(int itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++)
                  {
                          if(itImageX!=-1)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(int itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++){
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                                
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;

              }
          }

          int x = 0;
          for(int i=0;i<height;i++){ 
              png_bytep row = row_pointers[i];
              for(int j=0;j<width;j++){
                png_bytep px = &(row[j * 4]);
                px[0] = maskedImageR[x];
                px[1] = maskedImageG[x];
                px[2] = maskedImageB[x];
                x++;
                  

              }
          }  
      free(maskedImageR);
      free(maskedImageG);
      free(maskedImageB);
      //free(maskMatrix);
    }

    void process_png_file() {
        maskRGB();

    }

    int main() 
    {
        double startTime = omp_get_wtime();
        for(int i=1;i<=20;i++)
        {
                char str[25]="cat (";
                char out[25]="out (";
                int a=i;
                int tmp=i;
                int cnt=0;
                while(tmp)
                {
                    tmp=tmp/10;
                    cnt++;
                }
                int j=cnt-1;
                char pok[25]=").png";
                char lok[25];
                while(a)
                {
                    int k=a%10;
                    lok[j]=(char)('0'+k);
                    a=a/10;
                    j--;
                }
                lok[cnt]='\0';
                strcat(str,lok);
                strcat(str,pok);
                strcat(out,lok);
                strcat(out,pok);
                char* s=out;
                char* p=str;
                read_png_file(p);
                process_png_file();
                write_png_file(s);
        
          }
          double endTime = omp_get_wtime();
          printf("The time required is %lf\n",endTime - startTime);
      return 0;
    }
             
            `}
        </pre>
  
        </section> 

        <section>  
        <h1>Edge Detection Parallel</h1>
        <pre className="source-code">
            {`


    #include <stdlib.h>
    #include <stdio.h>
    #include <png.h>
    #include<omp.h>
    #include<string.h>

    int width,height,dimensions;
    png_byte color_type;
    png_byte bit_depth;
    png_bytep *row_pointers = NULL;

    void read_png_file(char *filename) {
        fflush(stdin);
        FILE *fp = fopen(filename, "rb");
      if(fp==NULL){
        return ;
      }
        png_structp png = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
        if(!png) {
            abort();
        }

        
        png_infop info = png_create_info_struct(png);
        if(!info){
          
          abort();
        } 
      
        if(setjmp(png_jmpbuf(png))){
          abort();
        } 

        png_init_io(png, fp);

        png_read_info(png, info);

        width     = png_get_image_width(png, info);
        height    = png_get_image_height(png, info);
        
        color_type = png_get_color_type(png, info);
        bit_depth  = png_get_bit_depth(png, info);
      
        dimensions = height;
        if(bit_depth == 16)
          png_set_strip_16(png);

        if(color_type == PNG_COLOR_TYPE_PALETTE)
          png_set_palette_to_rgb(png);

        // PNG_COLOR_TYPE_GRAY_ALPHA is always 8 or 16bit depth.
        if(color_type == PNG_COLOR_TYPE_GRAY && bit_depth < 8)
          png_set_expand_gray_1_2_4_to_8(png);

        if(png_get_valid(png, info, PNG_INFO_tRNS))
          png_set_tRNS_to_alpha(png);

        // These color_type don't have an alpha channel then fill it with 0xff.
        if(color_type == PNG_COLOR_TYPE_RGB ||
          color_type == PNG_COLOR_TYPE_GRAY ||
          color_type == PNG_COLOR_TYPE_PALETTE)
          png_set_filler(png, 0xFF, PNG_FILLER_AFTER);

        if(color_type == PNG_COLOR_TYPE_GRAY ||
          color_type == PNG_COLOR_TYPE_GRAY_ALPHA)
          png_set_gray_to_rgb(png);

        png_read_update_info(png, info);

        //if (row_pointers) abort();

        row_pointers = (png_bytep*)malloc(sizeof(png_bytep) * height);
        for(int y = 0; y < height; y++) {
          row_pointers[y] = (png_byte*)malloc(png_get_rowbytes(png,info));
        }

        png_read_image(png, row_pointers);
        
        fclose(fp);
      
        png_destroy_read_struct(&png, &info, NULL);
    }

    void write_png_file(char *filename) {
      int y;
      FILE *fp = fopen(filename, "wb");
      if(!fp) abort();

      png_structp png = png_create_write_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
      if (!png) abort();

      png_infop info = png_create_info_struct(png);
      if (!info) abort();

      if (setjmp(png_jmpbuf(png))) abort();

      png_init_io(png, fp);

      // Output is 8bit depth, RGBA format.
    // printf("\nBefore png set IHDR\n");
      png_set_IHDR(
        png,
        info,
        width, height,
        8,
        PNG_COLOR_TYPE_RGBA,
        PNG_INTERLACE_NONE,
        PNG_COMPRESSION_TYPE_DEFAULT,
        PNG_FILTER_TYPE_DEFAULT
      );
    //  printf("\nbefore png write info\n");  
      png_write_info(png, info);

      // To remove the alpha channel for PNG_COLOR_TYPE_RGB format,
      // Use png_set_filler().
      
        png_write_image(png, row_pointers);
        png_write_end(png, NULL);
      for(int y = 0; y < height; y++) {
          free(row_pointers[y]);
        }
      free(row_pointers);
        fclose(fp);

        png_destroy_write_struct(&png, &info);
    }

    void maskRGB(){
        //sobel edge operator for y direction
        int maskMatrix[3][3]={-1,-2,-1,0,0,0,1,2,1};
        int size  = height * width;
        int *maskedImageR = (int*)malloc(size*sizeof(int));
        int *maskedImageG = (int*)malloc(size*sizeof(int));
        int *maskedImageB = (int*)malloc(size*sizeof(int));
    
        for(int i=0;i<size;i++){
          maskedImageR[i]=0;
          maskedImageG[i]=0;
          maskedImageB[i]=0;
        }
        int averageR = 0,averageG = 0,averageB = 0;
        int val=0,maskDimensions=3;
        int i,j,itImageX,itImageY,itMaskX,itMaskY;
        #pragma omp parallel shared(maskedImageB) private(i,j,itImageX,itImageY,itMaskX,itMaskY,averageR,averageG,averageB)
        {
            #pragma omp for schedule(static)
        for(i=0 ; i < height; i++){
          
              for(j=0 ; j < width ; j++){
                  averageR = 0;
                  averageG = 0;
                  averageB = 0;

                  for(itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++){
                          if(itImageX>=0 && itImageX< height)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++){
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                                  
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;

              }
        }

        }
        val=0;
        //sobel edge operators for x direction
        maskMatrix[0][0] = -1;
        maskMatrix[0][1] = 0;
        maskMatrix[0][2] = 1;
        maskMatrix[1][0] = -2;
        maskMatrix[1][1] = 0;
        maskMatrix[1][2] = 2;
        maskMatrix[2][0] = -1;
        maskMatrix[2][1] = 0;
        maskMatrix[2][2] = 1;
      
        #pragma omp parallel shared(maskedImageB) private(i,j,itImageX,itImageY,itMaskX,itMaskY,averageR,averageG,averageB)
        {
            #pragma omp for schedule(static)
        for(i=0 ; i < height; i++){
          
              for(j=0 ; j < width ; j++){

                  averageR = 0;
                  averageG = 0;
                  averageB = 0;

                  for(itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++)
                  {
                          if(itImageX>=0 && itImageX< height)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++){
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;
              }
              }
        }
        val=0;
        //sobel point operators
        maskMatrix[0][0] = -1;
        maskMatrix[0][1] = -1;
        maskMatrix[0][2] = -1;
        maskMatrix[1][0] = -1;
        maskMatrix[1][1] =  8;
        maskMatrix[1][2] = -1;
        maskMatrix[2][0] = -1;
        maskMatrix[2][1] = -1;
        maskMatrix[2][2] = -1;
        
        #pragma omp parallel shared(maskedImageB) private(i,j,itImageX,itImageY,itMaskX,itMaskY,averageR,averageG,averageB)
        {
            #pragma omp for schedule(static)
        for(i=0 ; i < height; i++){
          
              for(j=0 ; j < width ; j++){
                  averageR = 0;
                  averageG = 0;
                  averageB = 0;
                  for(itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++)
                  {
                          if(itImageX!=-1)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++){
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                                
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;

              }
              }
          }

          int x = 0;
          for(i=0;i<height;i++){ 
              png_bytep row = row_pointers[i];
              for(j=0;j<width;j++){
                png_bytep px = &(row[j * 4]);
                px[0] = maskedImageR[x];
                px[1] = maskedImageG[x];
                px[2] = maskedImageB[x];
                x++;
                  

              }
          }  
      free(maskedImageR);
      free(maskedImageG);
      free(maskedImageB);
      //free(maskMatrix);
    }

    void process_png_file() {
        maskRGB();

    }

    int main() 
    {
        double startTime = omp_get_wtime();
        for(int i=1;i<=20;i++)
        {
                char str[25]="cat (";
                char out[25]="out (";
                int a=i;
                int tmp=i;
                int cnt=0;
                while(tmp)
                {
                    tmp=tmp/10;
                    cnt++;
                }
                int j=cnt-1;
                char pok[25]=").png";
                char lok[25];
                while(a)
                {
                    int k=a%10;
                    lok[j]=(char)('0'+k);
                    a=a/10;
                    j--;
                }
                lok[cnt]='\0';
                strcat(str,lok);
                strcat(str,pok);
                strcat(out,lok);
                strcat(out,pok);
                char* s=out;
                char* p=str;
                read_png_file(p);
                process_png_file();
                write_png_file(s);
        
          }
          double endTime = omp_get_wtime();
          printf("The time required is %lf\n",endTime - startTime);
      return 0;
    }   

            `}
        </pre>
        </section>  

        <section>  
        <h1>Image Parallel</h1>
        <pre className="source-code">
            {`
   
   
    #include <stdlib.h>
    #include <stdio.h>
    #include <png.h>
    #include<omp.h>
    #include<string.h>


    void edgeDetection(char *filename,char *outputFileName) 
    {
        int width,height,dimensions;
        png_byte color_type;
        png_byte bit_depth;
        png_bytep *row_pointers = NULL;
        fflush(stdin);
        FILE *fp = fopen(filename, "rb");
      if(fp==NULL){
        return ;
      }
        png_structp png = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
        if(!png) {
            abort();
        }
      
        png_infop info = png_create_info_struct(png);
        if(!info){
          abort();
        } 

        if(setjmp(png_jmpbuf(png))){
          abort();
        } 

        png_init_io(png, fp);

        png_read_info(png, info);

        width     = png_get_image_width(png, info);
        height    = png_get_image_height(png, info);
        
        color_type = png_get_color_type(png, info);
        bit_depth  = png_get_bit_depth(png, info);
        // Read any color_type into 8bit depth, RGBA format.
        // See http://www.libpng.org/pub/png/libpng-manual.txt
        dimensions = height;
        if(bit_depth == 16)
          png_set_strip_16(png);

        if(color_type == PNG_COLOR_TYPE_PALETTE)
          png_set_palette_to_rgb(png);

        // PNG_COLOR_TYPE_GRAY_ALPHA is always 8 or 16bit depth.
        if(color_type == PNG_COLOR_TYPE_GRAY && bit_depth < 8)
          png_set_expand_gray_1_2_4_to_8(png);

        if(png_get_valid(png, info, PNG_INFO_tRNS))
          png_set_tRNS_to_alpha(png);

        // These color_type don't have an alpha channel then fill it with 0xff.
        if(color_type == PNG_COLOR_TYPE_RGB ||
          color_type == PNG_COLOR_TYPE_GRAY ||
          color_type == PNG_COLOR_TYPE_PALETTE)
          png_set_filler(png, 0xFF, PNG_FILLER_AFTER);

        if(color_type == PNG_COLOR_TYPE_GRAY ||
          color_type == PNG_COLOR_TYPE_GRAY_ALPHA)
          png_set_gray_to_rgb(png);

        png_read_update_info(png, info);

        //if (row_pointers) abort();

        row_pointers = (png_bytep*)malloc(sizeof(png_bytep) * height);
        for(int y = 0; y < height; y++) {
          row_pointers[y] = (png_byte*)malloc(png_get_rowbytes(png,info));
        }

        png_read_image(png, row_pointers);
      
        fclose(fp);
        png_destroy_read_struct(&png, &info, NULL);


    //sobel edge operators for y direction
        int maskMatrix[3][3]={-1,-2,-1,0,0,0,1,2,1};
        
        int averageR,averageG,averageB;
        int size  = height * width;
        int *maskedImageR = (int*)malloc(size*sizeof(int));
        int *maskedImageG = (int*)malloc(size*sizeof(int));
        int *maskedImageB = (int*)malloc(size*sizeof(int));
    
        for(int i=0;i<size;i++){
          maskedImageR[i]=0;
          maskedImageG[i]=0;
          maskedImageR[i]=0;
        }
        //maskR function begins
        int val=0,maskDimensions=3;
        for(int i=0 ; i < height; i++)
        {
          
              for(int j=0 ; j < width ; j++)
              {
                  averageR = 0;
                  averageG = 0;
                  averageB = 0;

                  for(int itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++)
                  {
                          if(itImageX!=-1)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(int itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++)
                            {
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                                    
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;

              }
        }
        
        val=0;
        //sobel edge operators for x direction
        maskMatrix[0][0] = -1;
        maskMatrix[0][1] = 0;
        maskMatrix[0][0] = 1;
        maskMatrix[1][0] = -2;
        maskMatrix[1][1] = 0;
        maskMatrix[1][2] = 2;
        maskMatrix[2][0] = -1;
        maskMatrix[2][1] = 0;
        maskMatrix[2][2] = 1;
        
        for(int i=0 ; i < height; i++)
        {
          
              for(int j=0 ; j < width ; j++)
              {
                  averageR = 0;
                  averageG = 0;
                  averageB = 0;
                  for(int itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++)
                  {
                          if(itImageX!=-1)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(int itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++)
                            {
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;

              }
        }
        val=0;
        //sobel edge operators
        maskMatrix[0][0] = -1;
        maskMatrix[0][1] = -1;
        maskMatrix[0][0] = -1;
        maskMatrix[1][0] = -1;
        maskMatrix[1][1] =  8;
        maskMatrix[1][2] = -1;
        maskMatrix[2][0] = -1;
        maskMatrix[2][1] = -1;
        maskMatrix[2][2] = -1;
        
        for(int i=0 ; i < height; i++){
          
              for(int j=0 ; j < width ; j++){
                  averageR = 0;
                  averageG = 0;
                  averageB = 0;
                  for(int itImageX = i-1, itMaskX = 0; itImageX < (i+maskDimensions) && itMaskX < maskDimensions ;itImageX++,itMaskX++)
                  {
                          if(itImageX!=-1)
                          {
                            png_bytep row = row_pointers[itImageX];
                            for(int itImageY = j-1, itMaskY =0; itImageY < (j+maskDimensions) && itMaskY < maskDimensions; itImageY++,itMaskY++){
                                png_bytep px = &(row[itImageY * 4]);
                                if(itImageX >= 0 && itImageX < height && itImageY >= 0 && itImageY < width){
                                      averageR += (px[0] * maskMatrix[itMaskX][itMaskY]);
                                      averageG += (px[1] * maskMatrix[itMaskX][itMaskY]);
                                      averageB += (px[2] * maskMatrix[itMaskX][itMaskY]);
                                }
                            }
                          }
                  }
                  if(averageR < 0)
                      averageR = 0;
                  else if(averageR > 255)
                            averageR = 255;
                  maskedImageR[i*width + j]+= averageR/9;

                  if(averageG < 0)
                      averageG = 0;
                  else if(averageG > 255)
                            averageG = 255;
                  maskedImageG[i*width + j] += averageG/9;

                  if(averageB < 0)
                      averageB = 0;
                  else if(averageB > 255)
                            averageB = 255;
                  maskedImageB[i*width + j] += averageB/9;


              }
          }
          int x=0;
          for(int i=0;i<height;i++)
          { 
            png_bytep row = row_pointers[i];
            for(int j=0;j<width;j++)
            {
              png_bytep px = &(row[j * 4]);
              px[0] = maskedImageR[x];
              px[1] = maskedImageG[x];
              px[2] = maskedImageB[x];
              x++;
            }
          }

      fp = fopen(outputFileName, "wb");
      if(!fp) abort();

      png = png_create_write_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
      if (!png) abort();

      info = png_create_info_struct(png);
      if (!info) abort();

      if (setjmp(png_jmpbuf(png))) abort();

      png_init_io(png, fp);

      // Output is 8bit depth, RGBA format.
      png_set_IHDR(
        png,
        info,
        width, height,
        8,
        PNG_COLOR_TYPE_RGBA,
        PNG_INTERLACE_NONE,
        PNG_COMPRESSION_TYPE_DEFAULT,
        PNG_FILTER_TYPE_DEFAULT
      );
        png_write_info(png, info);
        png_write_image(png, row_pointers);
        png_write_end(png, NULL);
      for(int y = 0; y < height; y++) {
          free(row_pointers[y]);
        }
      free(row_pointers);
      //free(maskMatrix);
      free(maskedImageR);
      free(maskedImageG);
      free(maskedImageB);
        fclose(fp);

        png_destroy_write_struct(&png, &info);
    }

        

    int main() {
      double startTime = omp_get_wtime();
      #pragma omp parallel for schedule(static)
      for(int i=1;i<=20;i++)
          {
                char str[25]="cat (";
                char out[25]="out (";
                int a=i;
                int tmp=i;
                int cnt=0;
                while(tmp)
                {
                    tmp=tmp/10;
                    cnt++;
                }
                int j=cnt-1;
                char pok[25]=").png";
                char lok[25];
                while(a)
                {
                    int k=a%10;
                    lok[j]=(char)('0'+k);
                    a=a/10;
                    j--;
                }
                lok[cnt]='\0';
                strcat(str,lok);
                strcat(str,pok);
                strcat(out,lok);
                strcat(out,pok);
                char* s=out;
                char* p=str;
                edgeDetection(p,s);
          }
          double endTime = omp_get_wtime();
          printf("\nThe time required is %lf\n",endTime - startTime);
      return 0;

    }
             
            `}
        </pre>
        </section>  

        <section>  
        <h1>Images Output</h1>
        <div className="gif-here">
            <img alt="edge-detection" src="/gif/edge/micky.gif"></img>
            <img alt="edge-detection" src="/gif/edge/blackp.gif"></img>
            <img alt="edge-detection" src="/gif/edge/dn.gif"></img>
            <img alt="edge-detection" src="/gif/edge/car.gif"></img>
            <img alt="edge-detection" src="/gif/edge/peak.gif"></img>
        </div>
        </section>  

        <section>  
        <h1>Results</h1>
        <div className="source-result">
            <img alt="edge-detection" src="/gif/edge/graph.PNG"></img>
        </div>
        </section>  
    </div>
    
            	
     
    )
}
