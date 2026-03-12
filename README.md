# Project Management Tool (WIP)

### This project is planned to be completed, at the latest, before the end of March. 

A full-stack project management tool built with React and Express.

(Soon to be) features:
1. Project management
2. Commenting
3. Role-based access
4. User invitation

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Tech Stack](#tech-stack)
4. [Future Plans](#todo)
5. [License](#license)

## Installation
```
git clone https://github.com/logicalPanda2/react-express-fancy-todo-project.git
```

## Usage
TBA

## Tech Stack
- React with React Router
- Express
- Tailwind CSS
- TypeScript

## TODO

### Extraction and refactors
1. Extract task hooks in home page
2. Extract reusable components: buttons, inputs, forms, cards, rows, etc.
3. Do a final type check pass for both frontend and backend

### Integration
4. Integrate API with frontend:
    1. Add all project fetches for homepage
    2. Navigate to Project/:id for project click on homepage
    3. Navigate to CreateEdit/:id for edit button click
    4. Send data to API at creation
    5. Auth

### UI polish
5. Completely rework design and choose a consistent theme
6. Add shadows, transitions and other details for additional polish 

### UX polish
7. Add confirmation dialog box for deletion
8. Add soft deletion and undo toasts for all delete actions
9. Various other small details I most likely have missed but will find out in the process of building &semi;&rpar;

## License
<a href="./LICENSE.txt">MIT License</a>
