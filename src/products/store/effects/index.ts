import { ToppingsEffects } from './toppings.effect';
import { PizzasEffects } from "./pizzas.effects";

export const effects: any[] = [PizzasEffects, ToppingsEffects];

export * from './pizzas.effects';
export * from './toppings.effect';
