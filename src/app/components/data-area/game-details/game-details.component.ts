import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { GameModel } from "../../../models/game.model";
import { DataService } from "../../../services/data.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-game-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./game-details.component.html",
  styleUrl: "./game-details.component.css",
})
export class GameDetailsComponent implements OnInit {
  public game: GameModel;
  public index: number;

  public constructor(
    private router: Router,
    private title: Title,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  public async ngOnInit(): Promise<void> {
    const id = +this.activatedRoute.snapshot.params["id"];
    this.game = await this.dataService.getGameById(id);
    this.index = this.game.screenshots.length - 1;
  }

  public nextImage() {
    this.index = this.index + 1;
    if (this.index === this.game.screenshots.length) this.index = 0;
  }
  public previousImage() {
    this.index = this.index - 1;
    if (this.index === -1) this.index = this.game.screenshots.length - 1;
  }
}
