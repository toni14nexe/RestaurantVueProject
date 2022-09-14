import Account from './Account.vue'
import "cypress-real-events/support";

//first comment Navbar component in Account.vue to turn it off

describe('<Account />', () => {
  it('renders', () => {
    cy.mount(Account)
  })

  it('set cookies', () => {
    cy.setCookie('username', 'toni5555', '15min')
    cy.setCookie('password', 'Toni5555', '15min')
    cy.getCookie('username').should('exist')
    cy.getCookie('password').should('exist')
  })

  it('check cookies', () => {
    cy.setCookie('username', 'toni5555', '15min')
    cy.setCookie('password', 'Toni5555', '15min')
    cy.getCookie('username').should('have.property', 'value', 'toni5555')
    cy.getCookie('password').should('have.property', 'value', 'Toni5555')
  })

  

  
})