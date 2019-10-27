import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { GameTable, Stats } from './model/Games';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'smartCSM Angular Challange';

  subscribtion: Subscription;
  gameArray = [];

  displayedColumns: string[] = ['name', 'totalLabel', 'id'];
  dataSource = [];

  constructor(private gameService: GameService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.gameService.buildTable();

    this.subscribtion = this.gameService.gameSubject.subscribe((games: GameTable[]) => {
      games.forEach((game) => {
        this.gameArray.push({ name: `${game.winner.Name}`, totalLabel: `${game.totalGames} / ${game.won}`, id: game.winner.id })

      })
      this.dataSource = this.gameArray;
    })

  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  openDialog(id): void {

    const dialogRef = this.dialog.open(ModalDialog, {
      height: '680px',
      width: '600px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}

@Component({
  selector: 'stats-dialog',
  templateUrl: 'stats-dialog.html',
})
export class ModalDialog implements OnDestroy {
  playerStats = [];
  subscription : Subscription;

  constructor(
    private dialogRef: MatDialogRef<ModalDialog>,
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) private id: number
  ) {
    //Decided to not to use Async pipe in the page since it's modal popup and behaviour is different than regular component.
    this.subscription = gameService.gameStatsSubject.subscribe(stats => {
      this.playerStats.push(stats);
    })
    
    this.gameService.buildPlayerTable(id);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
