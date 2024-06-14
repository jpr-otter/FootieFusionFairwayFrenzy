import { Course } from '../game/course';
import { Score } from '../score/score';
import { GamePage } from '../game/game.page';

export class Player {

    name: string;
    rank: string;
    scores: Score [];  
         

    constructor(nameOrPlayer: string | Player){
        if(typeof nameOrPlayer === 'string') {
            this.name = nameOrPlayer;
            this.scores = Array.from(Array(18).keys()).map(() => new Score("0"));                        
        } else {
            this.name = nameOrPlayer.name;
            this.scores = nameOrPlayer.scores.map(x => new Score(x));
        }
        this.rank = "";
    }

    getPlayerName(): string {
        return this.name;
    }

    getPlayerRank(): string {
        return this.rank;
    }

    setPlayerRank(rank: string) {
        this.rank = rank;        
    }

    calculateTotalScore(): number {
        return this.scores.reduce((x, i) => x + i.score, 0)
    }
    
    setScore(score: number, courseID: number): void {        
        if (this.scores[courseID] !== null && score >= 0) {            
            this.scores[courseID].set(score);        
        }
    } 

    didThisPlayerCompleteAllCourses(){
        return (this.scores.reduce((x, i) => x + (i.score > 0 ? 0 : 1), 0) == 0)
    }
}
