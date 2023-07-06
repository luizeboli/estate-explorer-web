describe('Property Page', () => {
	it('should render the property informations', () => {
		cy.getProperties({ per_page: 1 }).then(({ body }) => {
			const property = body[0];
			cy.visit(`/property/${property.slug}`);

			cy.findByTestId('property-data').shouldRenderProperty(property);
		});
	});

	it('should render similar properties', () => {
		cy.getProperties({
			amenities_slug: 'gym',
			property_status_slug: 'for-sale',
			per_page: 6,
		}).then(({ body }) => {
			const [mainProperty, ...similarProperties] = body;

			cy.visit(`/property/${mainProperty.slug}`);

			cy.findByTestId('similar-properties-list')
				.children()
				.should('have.length', similarProperties.length);

			cy.findByTestId('similar-properties-list').within(() => {
				similarProperties.forEach((property) =>
					cy
						.findByTestId(`property-${property.id}`)
						.shouldRenderProperty(property, { checkStatus: false }),
				);
			});
		});
	});
});
