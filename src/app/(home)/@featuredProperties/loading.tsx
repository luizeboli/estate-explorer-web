import Spinner from '@/components/Spinner';
import { Wrapper } from './page';

const Loading = () => {
	return (
		<Wrapper>
			<Spinner size={32} />
		</Wrapper>
	);
};

export default Loading;
