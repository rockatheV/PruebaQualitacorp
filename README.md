# Proyecto de QA - Banca Móvil

Este proyecto contiene pruebas automatizadas en Cypress para validar la funcionalidad de retiro con talonario en el nuevo proyecto Banca Móvil.

## Objetivos de la prueba

- Validar que la cuenta tipo `BM` no permite retiros con talonario.
- Confirmar que solo las cuentas de ahorro activas pueden realizar retiros con talonario.
- Verificar que el monto no exceda el máximo diario de `$1.000.000`.
- Probar comportamientos en combinaciones de tipo y estado de cuenta.
- Comprobar mensajes de error y confirmación coherentes con las reglas de negocio.

## Instalación

1. Abre un terminal en la carpeta `BancaMovilQA`.
2. Ejecuta:

```bash
npm install
```

## Ejecutar pruebas

- Abrir el runner de Cypress:

```bash
npm run cypress:open
```

- Ejecutar en modo headless:

```bash
npm run cypress:run
```

## Archivo de prueba clave

- `cypress/e2e/retiro-talonario.cy.js`

## Ajustes

- Cambia `baseUrl` en `cypress.config.js` si la aplicación corre en otra URL.
- Asegúrate de que los selectores de prueba coincidan con los atributos `data-cy` de la aplicación.
