import Stepper from './Stepper.vue'
import "cypress-real-events/support";
    
    describe('<Stepper>', () => {

    it('mounts', () => {
        cy.mount(Stepper)
    })

    // Set up some constants for the selectors
    const counterSelector = '[data-cy=counter]'
    const incrementSelector = '[aria-label=increment]'
    const decrementSelector = '[aria-label=decrement]'

    it('stepper should default to 0', () => {
        // Arrange
        cy.mount(Stepper)
        // Assert
        cy.get(counterSelector).should('have.text', '0')
    })

    it('supports an "initial" prop to set the value', () => {
        // Arrange
        cy.mount(Stepper, { props: { initial: 100 } })
        // Assert
        cy.get(counterSelector).should('have.text', '100')
    })

    it('when the increment button is pressed, the counter is incremented', () => {
        // Arrange
        cy.mount(Stepper)
        // Act
        cy.get(incrementSelector).click()
        // Assert
        cy.get(counterSelector).should('have.text', '1')
    })
      
    it('when the decrement button is pressed, the counter is decremented', () => {
        // Arrange
        cy.mount(Stepper)
        // Act
        cy.get(decrementSelector).click()
        // Assert
        cy.get(counterSelector).should('have.text', '-1')
    })

    it('when clicking increment and decrement buttons, the counter is changed as expected', () => {
        cy.mount(Stepper, { props: { initial: 100 } })
        cy.get(counterSelector).should('have.text', '100')
        cy.get(incrementSelector).click()
        cy.get(counterSelector).should('have.text', '101')
        cy.get(decrementSelector).click().click().click()
        cy.get(counterSelector).should('have.text', '98')
    })

    it('clicking + fires a change event with the incremented value', () => {
        // Arrange
        const onChangeSpy = cy.spy().as('onChangeSpy')
        cy.mount(Stepper, { props: { onChange: onChangeSpy } })
        // Act
        cy.get(incrementSelector).click().click()
        cy.get('@onChangeSpy').should('have.been.calledWith', 2)
    })

    it('home link should be active when url is "/"', () => {
        // No need to pass in custom router as default url is '/'
        cy.mount(Stepper)
        cy.get('a').contains('Home').should('have.class', 'router-link-active')
        cy.contains("a", "Home").should("have.attr", "href", "#home");
    })

    it('set resolution to 1000x1000px', () =>{
        cy.viewport(1000, 1000)
        cy.mount(Stepper)
    })

    it('button name set properly', () =>{
        cy.mount(Stepper)
        cy.get('button').contains('Test Button')
    })

    it('check button color and hover it', () =>{
        cy.mount(Stepper)
        cy.get('button').contains('Test Button').trigger("mouseover").should('have.css', 'background-color').and('eq', 'rgb(0, 255, 255)')
    })
})