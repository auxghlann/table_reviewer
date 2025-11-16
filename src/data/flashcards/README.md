# Flashcards Structure

This directory contains all flashcard data organized by subject.

## Folder Structure

```
flashcards/
├── softeng-2/
│   ├── dependable-systems.json
│   └── reliability-engineering.json
├── ethics/
│   └── professional-ethics.json
├── cs-elective-3/
│   └── machine-learning.json
└── social-issues/
    └── cyberethics-privacy.json
```

## Adding New Flashcard Sets

To add a new flashcard set:

1. Navigate to the appropriate subject folder (or create a new one)
2. Create a new JSON file with the following structure:

```json
{
  "id": "unique-set-id",
  "title": "Display Title",
  "description": "Brief description of the flashcard set",
  "icon": "🎯",
  "flashcards": [
    {
      "id": 1,
      "front": "Question or prompt",
      "back": "Answer or explanation"
    }
  ]
}
```

## Important Notes

- The `id` field should be unique and use kebab-case (e.g., "dependable-systems")
- The `icon` field should be an emoji that represents the flashcard set
- The `cardCount` field is calculated automatically from the flashcards array
- Each flashcard must have a unique `id` within its set
- The folder name must match the subject ID used in the routes

## Subject Folder Names

- `softeng-2` - Software Engineering 2
- `ethics` - Ethics
- `cs-elective-3` - CS Elective 3
- `social-issues` - Social Issues

Make sure to use the exact folder names as they're used in the routing logic.
