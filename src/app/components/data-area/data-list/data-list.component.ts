import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { CommonModule } from "@angular/common";
import { GameModel } from "../../../models/game.model";
import { appConfig } from "../../../app.config";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-data-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./data-list.component.html",
  styleUrl: "./data-list.component.css",
})
export class DataListComponent implements OnInit {
  public constructor(private dataService: DataService) {}
  public games: GameModel[];
  public tags = appConfig.categories.sort();
  public tagArray: string[] = [];

  public async ngOnInit(): Promise<void> {
    this.games = await this.dataService.getAllGames();
    console.log(this.games);
  }

  public createTagArray(tag: string) {
    if (this.tagArray.includes(tag))
      this.tagArray.splice(this.tagArray.indexOf(tag), 1);
    else this.tagArray.push(tag);
    console.log(this.tagArray);
  }

  public async filterByTagArray(): Promise<any> {
    if (this.tagArray.length === 0) {
      this.games = await this.dataService.getAllGames();
      return;
    }
    this.games = [];
    const result = await this.dataService.getGamesByTag(
      this.tagArray.join(".")
    );
    if (result.status === 0) return;
    else this.games = result;
  }

  public capitalize(name: string) {
    return `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;
  }
}
