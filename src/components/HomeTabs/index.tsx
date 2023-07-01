'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { styled } from '@linaria/react';
import Button from '@/components/Button';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;

	@media screen and (min-width: 425px) {
		max-width: 32rem;
	}
`;

const ContentButtons = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;

	border: 1px solid #d4d4d8;
	border-radius: 0.4rem;
	padding: 0.8rem;
	margin-bottom: 3.2rem;

	gap: 1.2rem;

	background-color: rgb(245 245 245);
`;

const TabPanel = styled.div`
	& h2 {
		font-size: 2.4rem;
		margin-bottom: 2.4rem;
	}

	& p {
		font-size: 1.4rem;
		margin-bottom: 2.4rem;
	}
`;

const HomeTabs = () => {
	const [activePanel, setActivePanel] = useState(0);

	return (
		<Wrapper>
			<ContentButtons role="tablist">
				<Button
					role="tab"
					variant={activePanel === 0 ? 'outlined' : 'text'}
					onClick={() => setActivePanel(0)}
					aria-selected={activePanel === 0}
					disableElevation={activePanel !== 0}
				>
					For tenants
				</Button>
				<Button
					role="tab"
					variant={activePanel === 1 ? 'outlined' : 'text'}
					onClick={() => setActivePanel(1)}
					aria-selected={activePanel === 1}
					disableElevation={activePanel !== 1}
				>
					For buyers
				</Button>
			</ContentButtons>

			<TabPanel role="tabpanel" hidden={activePanel !== 0}>
				<h2>Your gateway to dream rentals</h2>
				<p>
					Our app provides a seamless and user-friendly experience, ensuring that you can
					find your dream rental effortlessly. From cozy apartments to spacious houses, we
					have a diverse range of properties to suit every lifestyle. Start your journey
					today and discover your ideal rental home with us.
				</p>
			</TabPanel>

			<TabPanel role="tabpanel" hidden={activePanel !== 1}>
				<h2>Unlock your dream home</h2>
				<p>
					Ready to make that long-awaited leap into homeownership? Our app is your key to
					unlocking your dream home. Explore a wide range of properties for sale, from
					charming starter homes to luxurious estates, all conveniently categorized to
					suit your preferences.
				</p>
			</TabPanel>

			<Button variant="contained" endIcon={<ChevronRight size={20} />}>
				See more
			</Button>
		</Wrapper>
	);
};

export default HomeTabs;
