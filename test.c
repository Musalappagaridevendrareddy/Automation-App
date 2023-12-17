#include <stdio.h>

void recur(char x){
    if(x=='A'){
        printf("%c",x);
        return ;
    }
    if(x%2==0){
        printf("%c",x);
        recur(x-1);
    }
    else{
        recur(x-1);
        printf("%c",x);
        
    }
}
int main(void){
    char x[]="Sampe String";
    printf("%s\n",x+4/2);
    return 0;
}