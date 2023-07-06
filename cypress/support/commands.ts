Cypress.Commands.add('getProperties', (options = {}) => {
	return cy.request({
		url: `${Cypress.env('API_URL')}/properties`,
		qs: {
			...options,
			_embed: true,
		},
	});
});
