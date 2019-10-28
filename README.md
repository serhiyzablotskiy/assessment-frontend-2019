# Slate Frontend Test Assignment

You should spend no more than **4 hours** on this test assignment.

When you are done with the test, please send a link to your repo to your recruiter.  Thank you for your time and interest in Slate!

## Description

For this test assignment, you will have to create your own simple state management library like Redux or MobX to handle events and store data across the application.

1. You should store your library code in the `/lib` folder of this repository.
2. You are free to use any architecture pattern for designing your library. It can be **Flux**, **Redux**, **BloC**, etc.
3. Your library should be integrated with a simple example app in `src` folder.
    1. You should create a form component for creating a new incident
    2. When an incident is created, an action must be dispatched notifying the rest of the app that a new incident is created
    3. Home page should get a list of incident from your library's store instead of hardcoded values
4. You should bring some essential styling to the app (currently it has no styling at all).
    1. You can use any styling framework you want.
    2. The information should be displayed appropriately on devices of all sizes

## Evaluation

You will be judged by following criteria:

- Re-usability of your state management library
- Amount of boilerplate code
- Usage of new language and library features as you see fit
- Component styling
- Component breakdown (do not put everything into one big component, create a few smaller ones instead)

## Start the development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Run `npm start` in the root of the project.
