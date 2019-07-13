import { formatWithOptions } from "util";

//backend routes


//frontend components
* Root
    * App
        * Board
//frontend routes
* /starfighter
    * home: board will be here, and game will be played here
* starfighter/newgame
    * new game form: create a nickname, join a room, start game
* starfighter.highscores
    * high score board at the end of the game, also will have play again feature

//backend routes

//users
* POST /player
    * create a new user and set a nickname for the game
    * 
    

Root
App
NavBar(on the left of the screen)
Main components
These routes, defined in App, will render components in main components

    /
    Home
    / login
LoginForm
    / signup
SignupForm
    / notebooks
NotebookIndex
NotebookIndexItem
    / notebooks /: notebookId
NotebookShow
    / notebooks / new
        NotebookForm
    / notebooks /: notebookId / edit
NotebookForm
    / notes
NoteIndex
NoteIndexItem
    / notes /: noteId
NoteShow
    / notes / new
        NoteForm
TagForm
    / notes /: noteId / edit
NoteForm
TagForm
    / tags
TagSearch
