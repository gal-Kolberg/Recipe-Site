import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Tasty Schnitzel', 'A super-tasty Schnitzel - just awesome!',
  //   'https://www.simplyrecipes.com/thmb/UTeRNml_-UbVxMhb5AiwHNOu50E=/3900x2600/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Pork-Schnitzel-LEAD-3-e36c4502197641ecbbe1fdcd0c4760c7.jpg',
  //   [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('French Fries', 20),
  //   ]),
  //   new Recipe('Big Fat Burger', 'What else you need to say?',
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_zMm_BLu7moQeGjSjAeR5jTkn1C3uVG1XKA&usqp=CAU',
  //   [
  //     new Ingredient('Buns', 2),
  //     new Ingredient('Meat', 1),
  //   ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngerdientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index]= newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
