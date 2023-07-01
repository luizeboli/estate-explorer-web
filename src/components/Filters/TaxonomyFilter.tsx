import Checkbox from '@/components/Checkbox';
import { screenMinWidth } from '@/styles/breakpoints';
import { TaxonomyTerm } from '@/types/taxonomy';
import { styled } from '@linaria/react';

const Wrapper = styled.li`
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 1.4rem;
	flex-grow: 1;

	:not(:last-child) {
		border-right: 1px solid #d4d4d8;

		${screenMinWidth('xmd')} {
			border-right: none;
			border-bottom: 1px solid #d4d4d8;
			padding-bottom: 2.4rem;
		}
	}

	${screenMinWidth('xmd')} {
		flex-grow: 0;
	}
`;

const Container = styled.fieldset`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const Title = styled.legend`
	font-size: 1.6rem;
	font-weight: 500;
	margin-bottom: 0.8rem;
`;

type TaxonomyFilterProps = {
	title: string;
	terms: TaxonomyTerm[];
	values: { [key: string]: boolean };
	onChange: (slug: string, value: boolean) => void;
};

const TaxonomyFilter = ({ title, terms, values, onChange }: TaxonomyFilterProps) => {
	return (
		<Wrapper>
			<Container>
				<Title id="status-title">{title}</Title>
				{terms.map(({ slug, name }) => (
					<Checkbox
						key={`${name}-${slug}`}
						label={name}
						name={slug}
						checked={values[slug]}
						onChange={(e) => onChange(slug, e.target.checked)}
					/>
				))}
			</Container>
		</Wrapper>
	);
};

export default TaxonomyFilter;
