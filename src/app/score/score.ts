export class Score {

    score: number;

   // constructor(score: number){
   //     this.score = score;        
   // } 
    constructor(score: string | Score){
        if(typeof score === 'string') {
            this.score = Number(score);                         
        } else {
            this.score = score.score;
        }        
    } 

    set(score: number): void {
        this.score= score;
    }

}
