Cypress.Commands.add('getProperties', (options = {}) => {
	return cy.request({
		url: `${Cypress.env('API_URL')}/properties${options.pathname ? options.pathname : ''}`,
		qs: {
			...options,
			_embed: true,
		},
	});
});

Cypress.Commands.add('getTaxonomyTerms', (taxonomy: string) => {
	return cy.request({
		url: `${Cypress.env('API_URL')}/${taxonomy}`,
	});
});

Cypress.Commands.add(
	'shouldRenderProperty',
	{ prevSubject: 'element' },
	(subject, property, options = {}) => {
		cy.wrap(subject).within(() => {
			const { checkStatus = true } = options;

			cy.findByText(property.title.rendered);
			cy.findByText(property.meta.location);

			const price = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(Number(property.meta.price));

			cy.findByText(price);

			property._embedded['wp:term'].flat().forEach((term) => {
				if (term.taxonomy === 'property_status' && !checkStatus) return;
				cy.findByText(term.name);
			});
		});
	},
);
