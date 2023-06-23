'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { styled } from '@linaria/react';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 32rem;
`;

const ContentButtons = styled.div`
	border: 1px solid #d4d4d8;
	border-radius: 0.4rem;
	padding: 0.8rem;
	width: max-content;

	display: flex;
	gap: 1.2rem;

	margin-bottom: 3.2rem;

	background: rgb(245 245 245);

	& button {
		padding: 0.8rem 1.6rem;
		border-radius: 0.4rem;
		color: rgb(115 115 115);
	}

	& button[aria-selected='true'] {
		border: 1px solid #d4d4d8;
		background: #fff;
		color: rgb(168 85 247);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	}
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

const SeeMore = styled.button`
	align-self: flex-start;
	color: #fff;
	padding: 0.8rem 1.2rem;
	background-color: rgb(168 85 247);
	border-radius: 0.6rem;
	font-size: 1.4rem;
	font-weight: 500;

	&:hover {
		background-color: rgb(126 34 206);
	}

	& svg {
		vertical-align: middle;
	}
`;

const HomeTabs = () => {
	const [activePanel, setActivePanel] = useState(0);

	return (
		<Wrapper>
			<ContentButtons role="tablist">
				<button
					type="button"
					role="tab"
					onClick={() => setActivePanel(0)}
					aria-selected={activePanel === 0}
				>
					For tenants
				</button>
				<button
					type="button"
					role="tab"
					onClick={() => setActivePanel(1)}
					aria-selected={activePanel === 1}
				>
					For landlords
				</button>
			</ContentButtons>

			<TabPanel role="tabpanel" hidden={activePanel !== 0}>
				<h2>Find your perfect home with ease</h2>
				<p>
					Simply browse through thousands of listings, filter by location, price range,
					amenities, and more. Save your favorite properties, schedule viewings, and even
					submit rental applications seamlessly through the app. Say goodbye to endless
					hours of searching and streamline your rental journey with us.
				</p>
			</TabPanel>

			<TabPanel role="tabpanel" hidden={activePanel !== 1}>
				<h2>Streamline property management effortlessly</h2>
				<p>
					Easily create appealing listings with detailed property information and
					high-quality images. Screen potential tenants through our integrated application
					process, complete with background checks and references. Experience hassle-free
					property management like never before.
				</p>
			</TabPanel>

			<SeeMore type="button">
				See more <ChevronRight size={20} />
			</SeeMore>
		</Wrapper>
	);
};

export default HomeTabs;
