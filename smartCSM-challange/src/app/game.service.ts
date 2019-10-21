import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant, GameTable, GameScores, Person, Stats } from './model/Games';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameSubject = new Subject<GameTable[]>();
  gameStatsSubject = new Subject<Stats>();
  participantsArray = [];
  gameTableArray = [];

  constructor(private http: HttpClient) { }

  //retrieve the games
  getGames(): Observable<GameScores> {
    return this.http.get<GameScores>("http://localhost:3000/games");
  }

  //retrieve the Participant
  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>("http://localhost:3000/participants");
  }

  buildTable() {

    let scoresArray = [];
    let index = 1;
    this.getParticipants()
      .subscribe(participant => {
        while (participant[index]) {

          let gameTable = new GameTable();
          gameTable.id = participant[index].id;
          const winner = new Person();
          winner.id = index;
          winner.Name = `${participant[index]["First Name"]} ${participant[index]["Last Name"]}`;
          winner.banned = (participant[index].Banned) ? participant[index].Banned : false;

          gameTable.winner = winner;
          //store it in array so no need to subscribe again.
          this.participantsArray.push(participant[index]);

          index++;
          this.gameTableArray.push(gameTable);

        }

        this.getGames().subscribe((gamesScores: GameScores) => {

          for (index = 0; index < this.gameTableArray.length; index++) {
            let game = gamesScores[index + 1];

            let gameTable = this.gameTableArray[index];
            gameTable.totalGames = game.length;
            gameTable.won = game.length;

            game.forEach(gamestats => {
              const looser = new Person();
              looser.id = gamestats.looser_id - 1;
              looser.Name = `${this.participantsArray[looser.id]["First Name"]} ${this.participantsArray[looser.id]["Last Name"]}`;
              looser.banned = (this.participantsArray[looser.id].Banned) ? this.participantsArray[looser.id].Banned : false;
              looser.winnerScore = gamestats.winner_score;
              looser.looserScore = gamestats.looser_score;

              if (gameTable.loosers)
                gameTable.loosers.push(looser);
              else
                gameTable.loosers = [looser];

            });

            scoresArray.push(game);
          }
          this.updateLosserList(scoresArray);
        })
      });

  }

  private updateLosserList(gameScores) {
    for (let index = 0; index < gameScores.length; index++) {
      let gameScore: GameScores[] = gameScores[index];
      for (let scoreIndex = 0; scoreIndex < gameScore.length; scoreIndex++) {
        let game: GameScores = gameScore[scoreIndex];
        let looserId = game.looser_id - 1;
        if (this.gameTableArray[looserId]) {
          let gameTable: GameTable = this.gameTableArray[looserId];
          gameTable.totalGames += 1;


          this.gameTableArray[looserId] = gameTable;
        }
      }
    }
    this.gameSubject.next(this.gameTableArray);

  }

  buildPlayerTable(id: number) {

    //Push lost opoonents
    let game: GameTable = this.gameTableArray[id - 1];
    for (let index = 0; game.loosers && index < game.loosers.length; index++) {
      this.gameStatsSubject.next({ name1: game.winner.Name, name2: game.loosers[index].Name, winnerScore: game.loosers[index].winnerScore, looserScore: game.loosers[index].looserScore });
    }
    this.gameTableArray.forEach((game: GameTable) => {
      if (game.loosers) {
        game.loosers.forEach(looser => {
          if (looser.id === id -1) {
            this.gameStatsSubject.next({ name1: game.winner.Name, name2: looser.Name, winnerScore: looser.winnerScore, looserScore: looser.looserScore });
          }
        });
      }
    })
  }
}
