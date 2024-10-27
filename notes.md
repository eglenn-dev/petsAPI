To add the log in auth make sure to implement the following:

Insert at line 54 in the swagger.json file.

```json
"security": [
    {
        "bearerAuth": []
    }
],
```

Insert at line 63, 91, 108, 132, and 155 in the pets area.

```json
"security": [
    {
        "bearerAuth": []
    }
],
```

Insert after line 188

```json
"securitySchemes": {
    "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
    }
}
```
