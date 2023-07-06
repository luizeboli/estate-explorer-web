/// <reference types="cypress" />

import type { WordpressPropertyPostType } from '../../src/types/wordpress';
import type { TaxonomyTerm } from '../../src/types/taxonomy';

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Retrieve properties from the Wordpress REST API
			 */
			getProperties: (
				options?: Partial<{
					per_page: number;
					pathname: string;
				}>,
			) => Chainable<Response<WordpressPropertyPostType[]>>;

			/**
			 * Retrieve taxonomies from the Wordpress REST API
			 */
			getTaxonomyTerms: (taxonomy: string) => Chainable<Response<TaxonomyTerm[]>>;

			/**
			 * Check if a property is rendered correctly
			 */
			shouldRenderProperty: (
				property: WordpressPropertyPostType,
				options?: Partial<{ checkStatus: boolean }>,
			) => void;
		}
	}
}
