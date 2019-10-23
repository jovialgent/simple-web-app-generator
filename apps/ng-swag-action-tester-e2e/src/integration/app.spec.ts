import { getGreeting } from '../support/app.po';

describe('ng-swag-action-tester', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to ng-swag-action-tester!');
  });
});
