import type { WordpressPropertyPostType } from '../../src/types/wordpress';

const checkProperty = (property: WordpressPropertyPostType) => {
	cy.findByTestId(`property-${property.id}`).within(() => {
		cy.findByText(property.title.rendered);
		cy.findByText(property.meta.location);

		const price = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(Number(property.meta.price));

		cy.findByText(price);

		property._embedded['wp:term']
			.flatMap((term) => term)
			.forEach((term) => {
				cy.findByText(term.name);
			});
	});
};

describe('Home Page', () => {
	it('should render featured properties from the api', () => {
		cy.visit('/');

		cy.getProperties({ per_page: 10 }).then(({ body }) => {
			body.forEach(checkProperty);
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
