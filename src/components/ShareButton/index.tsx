'use client';

import Button from '@/components/Button';
import { Share2 } from 'lucide-react';
import { useState } from 'react';

const ShareButton = () => {
	const [isCopied, setIsCopied] = useState(false);

	const handleClick = () => {
		navigator.clipboard.writeText(window.location.href);

		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<Button startIcon={<Share2 />} variant="outlined" onClick={handleClick}>
			{isCopied ? 'Link Copied' : 'Share'}
		</Button>
	);
};

export default ShareButton;
