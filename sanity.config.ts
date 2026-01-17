{
  "$schema": "https://api.sanity.io/v2021-06-07/schema/schema.json",
  "apiVersion": "2023-05-03",
  "name": "default",
  "title": "React TypeScript Project",
  "projectId": "your-project-id",
  "dataset": "production",
  "plugins": [
    "@sanity/vision"
  ],
  "schema": {
    "types": []
  },
  "document": {
    "newDocumentOptions": [
      {
        "type": "page",
        "title": "Page"
      }
    ],
    "actions": [
      "create",
      "update",
      "delete",
      "publish"
    ]
  }
}