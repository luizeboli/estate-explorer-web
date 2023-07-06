describe('Search Page', () => {
	it('should render taxonomies terms from the api', () => {
		cy.visit('/search');

		cy.findByTestId('filters-list').findByRole('group', { name: 'Amenities' });
		cy.findByTestId('filters-list').findByRole('group', { name: 'Status' });

		['amenities', 'property_status'].forEach((taxonomy) => {
			cy.getTaxonomyTerms(taxonomy).then(({ body }) => {
				body.forEach((term) => {
					cy.findByTestId('filters-list').findByLabelText(term.name);
				});
			});
		});
	});

	it('should fill filters according to the url and render the properties', () => {
		cy.visit('/search?amenities=pool,gym&property_status=for-sale');

		cy.findByTestId('filters-list')
			.findByRole('group', { name: 'Status' })
			.within(() => {
				cy.findByLabelText('For Sale').should('be.checked');
				cy.findByLabelText('For Rent').should('not.be.checked');
			});

		cy.findByTestId('filters-list')
			.findByRole('group', { name: 'Amenities' })
			.within(() => {
				cy.findByLabelText('Gym').should('be.checked');
				cy.findByLabelText('Parking').should('not.be.checked');
				cy.findByLabelText('Pool').should('be.checked');
			});

		cy.getProperties({
			pathname: '?amenities_slug=pool,gym&property_status_slug=for-sale',
		}).then(({ body }) => {
			cy.findByTestId('properties-list').children().should('have.length', body.length);
			body.forEach((property) =>
				cy.shouldRenderPropertyCard(property, { checkStatus: false }),
			);
		});
	});
});
