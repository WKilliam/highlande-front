# HighlandeFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


[ 1,  6,  11]
[ 2,  7,  12]
[ 3,  8,  13]
[ 4,  9,  14]
[ 5,  10, 15]
je suis sur 9 et je peut me déplacé de 3 donc j'ai accées a 6,12,2,10
et voici ce que j'entend par route :
pour 10 : [4,5,10] ,[14,15,10]
pour 6 : [8,7,6]
pour 12 : [14,13,12] [8,7,12] 
pour 2 : [4,3,2] [8,7,2]


il faudrait faire ceci :
createRoute(startId: number, distance: number)
dans cette methode tu vas utilisé findCellsAtDistance pour avoir la liste des destinations possible
puis tu fera un rapport inversé en comparant la destination et le start position 
imagions que nous somme sur 0 et que nous avons une distance de 3 une destination possible serait 3 ce que tu vas faire 
en partant de 3 tu vas trouvé toute les route avec distance 1 ce qui si tu lance findCellsAtDistance sur la cellule 3 tu tombera sur 2 une fois cela fais tu vas comparé startId pour une destination qui vaudrait
3 - 1 ce qui donnera 2 et tu va faire un rapport inversé tu tombera sur la case 2 ce qui confirmerra que pour ta premiere destination la case 2 est une route possible tu decrémentra destination pour startid et incrémentera destination pour la destination

list 1
{id: 319, x: 581, y: 325, value: 1}
{id: 290, x: 613, y: 293, value: 1}
{id: 350, x: 613, y: 357, value: 1}
{id: 261, x: 645, y: 261, value: 1}
{id: 381, x: 645, y: 389, value: 1}
{id: 292, x: 677, y: 293, value: 1}
{id: 352, x: 677, y: 357, value: 1}
{id: 323, x: 709, y: 325, value: 1}
{id: 320, x: 613, y: 325, value: 1}
{id: 291, x: 645, y: 293, value: 1}
{id: 351, x: 645, y: 357, value: 1}
{id: 322, x: 677, y: 325, value: 1}


list 2
{id: 317, x: 517, y: 325, value: 1}
{id: 288, x: 549, y: 293, value: 1}
{id: 348, x: 549, y: 357, value: 1}
{id: 259, x: 581, y: 261, value: 1}
{id: 379, x: 581, y: 389, value: 1}
{id: 290, x: 613, y: 293, value: 1}
{id: 350, x: 613, y: 357, value: 1}
{id: 321, x: 645, y: 325, value: 1}
{id: 318, x: 549, y: 325, value: 1}
{id: 289, x: 581, y: 293, value: 1}
{id: 349, x: 581, y: 357, value: 1}
{id: 320, x: 613, y: 325, value: 1}
