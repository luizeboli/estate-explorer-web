import { fetcher } from '@/services/fetcher';
import { styled } from '@linaria/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import HouseCoverPlaceholder from '@/assets/house-placeholder.png';
import { ListChecks } from 'lucide-react';
import SimilarProperties from '@/components/SimilarProperties';
import { getProperties } from '@/services/api';
import AmenityIcon from '@/components/AmenityIcon';
import { WordpressPropertyPostType } from '@/types/wordpress';
import Button from '@/components/Button';
import breakpoints, { screenMinWidth } from '@/styles/breakpoints';
import ShareButton from '@/components/ShareButton';
import colors from '@/styles/colors';

const Wrapper = styled.div`
	padding: 5.4rem 5vw 0;
`;

const Container = styled.div`
	max-width: ${breakpoints.lg}px;
	margin: 0 auto;
`;

const Title = styled.h1`
	font-size: 2.4rem;
`;

const Location = styled.p`
	font-size: 1.6rem;
	color: ${colors.neutral[500]};
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
	border: 1px solid ${colors.zinc[300]};
	border-radius: 0.4rem;
	max-width: fit-content;
	margin-bottom: 2.4rem;
`;

const AmenityItem = styled.li`
	font-size: 1.4rem;
	color: ${colors.neutral[500]};

	& svg {
		margin-right: 0.4rem;
		color: ${colors.purple[700]};
		vertical-align: middle;
	}
`;

const Apply = styled.div`
	border: 1px solid ${colors.zinc[300]};
	border-radius: 0.4rem;
	padding: 1.2rem;
	width: 100%;
	flex-shrink: 0;
	height: fit-content;

	${screenMinWidth('md')} {
		max-width: 300px;
	}
`;

const Price = styled.p`
	font-size: 1.4rem;
	font-weight: 700;
	color: ${colors.purple[600]};
	margin-bottom: 1.4rem;

	& span {
		font-size: 1.2rem;
		font-weight: 400;
		color: ${colors.neutral[600]};
	}
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;

	${screenMinWidth('md')} {
		flex-direction: row;
	}
`;

const ApplyTitle = styled.p`
	font-size: 1.4rem;
	margin-bottom: 0.8rem;
	color: ${colors.neutral[600]};
`;

const Social = styled.div`
	margin-bottom: 1.2rem;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1.6rem;
	margin-bottom: 0.8rem;
`;

const PropertyStatusTitle = styled.p`
	font-size: 1.6rem;
	color: #fff;
	background-color: ${colors.purple[500]};
	padding: 0.4rem 0.8rem;
	border-radius: 1.4rem;
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
				<Header>
					<Title>{title}</Title>
					<PropertyStatusTitle>{property_status.name}</PropertyStatusTitle>
				</Header>

				<Location>{location}</Location>

				<Social>
					<ShareButton />
				</Social>

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
							{property_status.slug === 'for-rent' ? 'Rent price' : 'Buy price'}
						</ApplyTitle>
						<Price>
							{price}
							{property_status.slug === 'for-rent' && <span> /month</span>}
						</Price>

						<Button startIcon={<ListChecks />} variant="contained" fullWidth disabled>
							Apply now
						</Button>
					</Apply>
				</BottomWrapper>
			</Container>

			<SimilarProperties baseProperty={property} />
		</Wrapper>
	);
};

export default PropertyPage;

export const generateStaticParams = async () => {
	const properties = await fetcher<WordpressPropertyPostType[]>('/properties?per_page=50');

	return properties.map(({ slug }) => ({ slug }));
};
