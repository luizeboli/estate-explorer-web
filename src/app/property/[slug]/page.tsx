import { fetcher } from '@/services/fetcher';
import { WordpressPropertyPostType } from '@/types';
import { styled } from '@linaria/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import HouseCoverPlaceholder from '@/assets/house-placeholder.png';
import { ListChecks } from 'lucide-react';
import SimilarProperties from '@/components/SimilarProperties';
import { getProperties } from '@/services/api';
import AmenityIcon from '@/components/AmenityIcon';

const Wrapper = styled.div`
	padding: 5.4rem 5% 0;
`;

const Container = styled.div`
	max-width: 1440px;
	margin: 0 auto;
`;

const Title = styled.h1`
	font-size: 2.4rem;
	margin-bottom: 0.8rem;
`;

const Location = styled.p`
	font-size: 1.6rem;
	color: rgb(115 115 115);
	margin-bottom: 1.4rem;
`;

const CoverWrapper = styled.div`
	position: relative;
	overflow: hidden;
	border-radius: 0.8rem;
	margin-bottom: 1.4rem;
	max-width: 60rem;
`;

const Description = styled.div``;

const DescriptionTitle = styled.h2`
	font-size: 1.6rem;
	margin-bottom: 1.2rem;
`;

const DescriptionContent = styled.p`
	font-size: 1.4rem;
	text-align: justify;
`;

const Amenities = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 1.2rem;
	padding: 1.2rem;
	border: 1px solid #d4d4d8;
	border-radius: 0.4rem;
	max-width: fit-content;
	margin-bottom: 2.4rem;
`;

const AmenityItem = styled.li`
	font-size: 1.4rem;
	color: rgb(115 115 115);

	& svg {
		margin-right: 0.4rem;
		color: rgb(126 34 206);
		vertical-align: middle;
	}
`;

const Apply = styled.div`
	border: 1px solid #d4d4d8;
	border-radius: 0.4rem;
	padding: 1.2rem;
	width: 100%;
	flex-shrink: 0;
	height: fit-content;

	@media screen and (min-width: 768px) {
		max-width: 300px;
	}
`;

const Price = styled.p`
	font-size: 1.4rem;
	font-weight: 700;
	color: rgb(147 51 234);
	margin-bottom: 1.4rem;

	& span {
		font-size: 1.2rem;
		font-weight: 400;
		color: rgb(82 82 82);
	}
`;

const BuyButton = styled.button`
	align-self: flex-start;
	color: #fff;
	padding: 0.8rem 1.2rem;
	background-color: rgb(168 85 247);
	border-radius: 0.6rem;
	font-size: 1.4rem;
	font-weight: 500;
	width: 100%;

	&:hover {
		background-color: rgb(126 34 206);
	}

	& svg {
		margin-right: 0.8rem;
		vertical-align: middle;
	}
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;

	@media screen and (min-width: 768px) {
		flex-direction: row;
	}
`;

const ApplyTitle = styled.p`
	font-size: 1.4rem;
	margin-bottom: 0.8rem;
	color: rgb(82 82 82);
`;

type PropertyPageProps = {
	params: {
		slug: string;
	};
};

const PropertyPage = async ({ params }: PropertyPageProps) => {
	const [property] = await getProperties({ params: { slug: params.slug } });

	if (!property) notFound();

	const { title, cover, location, description, amenities, property_status, price } = property;

	return (
		<Wrapper>
			<Container>
				<Title>{title}</Title>
				<Location>{location}</Location>

				<CoverWrapper>
					<Image
						src={cover ?? HouseCoverPlaceholder}
						alt={`${title} property`}
						width={300}
						height={160}
						sizes="100vw"
						style={{
							display: 'block',
							width: '100%',
							height: 'auto',
							aspectRatio: '16/9',
							objectFit: 'cover',
						}}
					/>
				</CoverWrapper>

				<Amenities>
					{amenities.map((amenity) => (
						<AmenityItem key={amenity.id}>
							<AmenityIcon slug={amenity.slug} size={16} />
							{amenity.name}
						</AmenityItem>
					))}
				</Amenities>

				<BottomWrapper>
					<Description>
						<DescriptionTitle>About this home</DescriptionTitle>
						<DescriptionContent>{description}</DescriptionContent>
					</Description>

					<Apply>
						<ApplyTitle>
							{property_status === 'for-rent' ? 'Rent price' : 'Buy price'}
						</ApplyTitle>
						<Price>
							{price}
							{property_status === 'for-rent' && <span> /month</span>}
						</Price>

						<BuyButton>
							<ListChecks />
							Apply now
						</BuyButton>
					</Apply>
				</BottomWrapper>

				<SimilarProperties baseProperty={property} />
			</Container>
		</Wrapper>
	);
};

export default PropertyPage;

export const generateStaticParams = async () => {
	const properties = await fetcher<WordpressPropertyPostType[]>('/properties?per_page=50');

	return properties.map(({ slug }) => ({ slug }));
};
