import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { DataService } from "../../../services/data.service";
import { CommonModule } from "@angular/common";
import { GameModel } from "../../../models/game.model";
import { appConfig } from "../../../app.config";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-data-list",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./data-list.component.html",
  styleUrl: "./data-list.component.css",
})
export class DataListComponent implements OnInit {
  @ViewChildren("tagCheckbox") tagCheckboxes: QueryList<ElementRef>;
  public constructor(private dataService: DataService, private title: Title) {}
  public games: GameModel[];
  public tags = appConfig.categories.sort();
  public tagArray: string[] = [];
  public loading = false;

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    this.title.setTitle("Gaming Helper | Tags");
    this.games = await this.dataService.getAllGames();
    this.loading = false;
  }

  public createTagArray(tag: string) {
    if (this.tagArray.includes(tag))
      this.tagArray.splice(this.tagArray.indexOf(tag), 1);
    else this.tagArray.push(tag);
  }

  public async filterByTagArray(): Promise<any> {
    this.loading = true;
    try {
      if (this.tagArray.length === 0) {
        this.games = await this.dataService.getAllGames();
      } else {
        const result = await this.dataService.getGamesByTag(
          this.tagArray.join(".")
        );
        if (result.status === 0) {
          this.games = [];
        } else {
          this.games = result;
        }
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      this.loading = false;
    }
  }

  public capitalize(name: string) {
    return `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;
  }
  public async uncheckAllTags() {
    this.tagCheckboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
    this.tagArray = [];
    this.games = await this.dataService.getAllGames();
  }
}
