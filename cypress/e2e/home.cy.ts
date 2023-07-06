describe('Home Page', () => {
	it('should render featured properties from the api', () => {
		cy.visit('/');

		cy.getProperties({ per_page: 10 }).then(({ body }) => {
			body.forEach((property) => cy.shouldRenderProperty(property));
		});
	});

	it('should add property to wishlist and persist state', () => {
		cy.visit('/');

		cy.findByTestId('properties-list')
			.children()
			.first()
			.within(() => {
				cy.findByLabelText('Add to wishlist').click();
				cy.findByLabelText('Remove from wishlist').should('be.visible');
			});

		cy.visit('/');

		cy.findByTestId('properties-list')
			.children()
			.first()
			.within(() => {
				cy.findByLabelText('Remove from wishlist');
			});
	});
});
