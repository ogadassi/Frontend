import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { appConfig } from "../app.config";
import { firstValueFrom } from "rxjs";
import { GameModel } from "../models/game.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  public async getAllGames(): Promise<GameModel[]> {
    const observable = this.http.get<GameModel[]>(
      appConfig.APIBaseUrl + "/games",
      appConfig.options
    );
    const games = await firstValueFrom(observable);
    return games;
  }

  public async getGamesByTag(tag_name: string): Promise<any> {
    const observable = this.http.get(
      `${appConfig.APIBaseUrl}/filter?tag=${tag_name}`,
      appConfig.options
    );

    const games = await firstValueFrom(observable);
    return games;
  }

  public async getGamesByPlatform(platform_name: string): Promise<GameModel[]> {
    const observable = this.http.get<GameModel[]>(
      appConfig.APIBaseUrl + `/games?platform=${platform_name}`,
      appConfig.options
    );
    const games = await firstValueFrom(observable);
    return games;
  }

  public async getGameById(game_id: number): Promise<GameModel> {
    const observable = this.http.get<GameModel>(
      appConfig.APIBaseUrl + `/game?id=${game_id}`,
      appConfig.options
    );
    const game = await firstValueFrom(observable);
    return game;
  }
}
