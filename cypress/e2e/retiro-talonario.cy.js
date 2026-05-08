describe('Retiro con talonario - Banca Móvil', () => {
  const selectors = {
    cuentaTipo: '[data-cy=cuenta-tipo]',
    cuentaEstado: '[data-cy=cuenta-estado]',
    metodoRetiro: '[data-cy=metodo-retiro]',
    montoInput: '[data-cy=monto-retiro]',
    enviarBtn: '[data-cy=submit-retiro]',
    mensajeError: '[data-cy=mensaje-error]',
    mensajeExito: '[data-cy=mensaje-exito]',
  };

  const visitarRetiro = () => {
    cy.visit('/retiro-talonario');
  };

  const seleccionarCuenta = (tipo, estado) => {
    cy.get(selectors.cuentaTipo).select(tipo);
    cy.get(selectors.cuentaEstado).select(estado);
  };

  const intentarRetiro = (monto) => {
    cy.get(selectors.metodoRetiro).check('talonario');
    cy.get(selectors.montoInput).clear().type(monto.toString());
    cy.get(selectors.enviarBtn).click();
  };

  beforeEach(() => {
    visitarRetiro();
  });

  it('no permite retiros con talonario en cuenta BM', () => {
    seleccionarCuenta('BM', 'activa');
    intentarRetiro(500000);

    cy.get(selectors.mensajeError)
      .should('be.visible')
      .and('contain', 'La cuenta BM no permite retiros con talonario');
    cy.get(selectors.mensajeExito).should('not.exist');
  });

  it('permite retiro con talonario solo en cuenta de ahorro activa', () => {
    seleccionarCuenta('Ahorro', 'activa');
    intentarRetiro(500000);

    cy.get(selectors.mensajeExito)
      .should('be.visible')
      .and('contain', 'Retiro con talonario realizado correctamente');
    cy.get(selectors.mensajeError).should('not.exist');
  });

  it('rechaza retiro con talonario en cuenta de ahorro inactiva', () => {
    seleccionarCuenta('Ahorro', 'inactiva');
    intentarRetiro(500000);

    cy.get(selectors.mensajeError)
      .should('be.visible')
      .and('contain', 'Solo las cuentas de ahorros activas pueden realizar retiros con talonario');
    cy.get(selectors.mensajeExito).should('not.exist');
  });

  it('rechaza retiro con talonario en cuenta corriente activa', () => {
    seleccionarCuenta('Corriente', 'activa');
    intentarRetiro(500000);

    cy.get(selectors.mensajeError)
      .should('be.visible')
      .and('contain', 'Solo las cuentas de ahorros activas pueden realizar retiros con talonario');
    cy.get(selectors.mensajeExito).should('not.exist');
  });

  it('no permite retirar más del monto máximo diario de $1.000.000', () => {
    seleccionarCuenta('Ahorro', 'activa');
    intentarRetiro(1000001);

    cy.get(selectors.mensajeError)
      .should('be.visible')
      .and('contain', 'El monto máximo diario es $1.000.000');
    cy.get(selectors.mensajeExito).should('not.exist');
  });

  it('permite exactamente $1.000.000 en una cuenta de ahorro activa', () => {
    seleccionarCuenta('Ahorro', 'activa');
    intentarRetiro(1000000);

    cy.get(selectors.mensajeExito)
      .should('be.visible')
      .and('contain', 'Retiro con talonario realizado correctamente');
    cy.get(selectors.mensajeError).should('not.exist');
  });
});
