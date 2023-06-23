import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import CardImg from '@/assets/home-card.jpg';
import HomeTabs from '@/components/HomeTabs';
import { styled } from '@linaria/react';

const Wrapper = styled.section`
	display: flex;
	position: relative;
	gap: 3.2rem;
`;

const PanelImageWrapper = styled.div`
	position: relative;
	max-width: 30rem;

	& img {
		border-radius: 0.8rem;
	}
`;

const PanelImageTip = styled.div`
	position: absolute;
	top: -1.6rem;
	left: -3.2rem;
	z-index: 1;

	border-radius: 0.8rem;
	background-color: #fff;
	padding: 0.8rem 1.6rem;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

	display: flex;
	align-items: center;
	gap: 1.2rem;

	border: 1px solid #d4d4d8;

	& svg {
		color: rgb(168 85 247);
	}

	& p {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.4rem;
	}

	& span {
		font-size: 1rem;
		margin-bottom: 0.4rem;
	}
`;

const HomeContent = () => {
	return (
		<Wrapper>
			<PanelImageWrapper>
				<PanelImageTip>
					<BadgeCheck size={32} strokeWidth={1.5} />
					<div>
						<p>Find the best deal</p>
						<span>Browse thousands of properties</span>
					</div>
				</PanelImageTip>
				<Image
					src={CardImg}
					placeholder="blur"
					alt="A house with open windows"
					width={200}
					height={200}
					sizes="100vw"
					style={{
						width: '100%',
						height: 'auto',
					}}
				/>
			</PanelImageWrapper>

			<HomeTabs />
		</Wrapper>
	);
};

export default HomeContent;
