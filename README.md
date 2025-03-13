# TodoList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Description
This is a simple project in Angular that demonstrates basic knowledge by creating a simple application for assigning tasks that are saved in the browser's localstorage.

No external libraries were used in this project, only components and features present in Angular.

A concept of dependency inversion with Angular was also used to reduce the level of coupling in the project. For this, an interface and an abstract class were defined that define the service contracts for controlling the tasks that are inserted, facilitating the exchange between the different possibilities for saving tasks. This project was exemplified with a solution using localstorage and also a possible implementation using Angular's HttpClient.