import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home-area/home/home.component";
import { DataListComponent } from "./components/data-area/data-list/data-list.component";
import { GameDetailsComponent } from "./components/data-area/game-details/game-details.component";

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "list", component: DataListComponent },
  { path: "games/details/:id", component: GameDetailsComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];
