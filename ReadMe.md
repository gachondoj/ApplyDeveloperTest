
# Apply Back End Developer Test

## Como correr

1. Clonar el repositorio
```
git clone git@github.com:gachondoj/ApplyDeveloperTest.git
```

2. Levantar docker
```
docker-compose up --build
```
## Docs

Las rutas de la API estan documentadas con Swagger. Dicha documentación se encuentra en la ruta /api/docs


## Reportes

La ruta /products/report entrega un json con la siguiente información:
- Porcentaje de productos eliminados
- Porcentaje de productos no eliminados con precio
- Porcentaje de productos no eliminados sin precio
- Porcentaje de productos no eliminador dentro del rango de fechas entregado
- Porcentaje de productos no eliminados en cada categoria

Adicionalmente, esta ruta esta protegida por lo que es necesario incluir en el header un token que se obtiene a travez de la ruta /login.

Para efectos de esta tarea es necesario enviar el userId = 1 para obtener un token.

## Contentful

La sincronización de productos con Contentful se realiza cada hora en punto. Sin embargo, existe la ruta /contentful/sync la cual permite realizar dicha sincronización de manera manual pero requiere de un token de autorización.

## Variables de Ambiente
Para correr de manera local (sin docker), son necesarias las siguientes variables de ambiente
```
CONTENTFUL_SPACE_ID
CONTENTFUL_ACCESS_TOKEN
CONTENTFUL_ENVIRONMENT
CONTENTFUL_CONTENT_TYPE
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
DB_DATABASE
```

