'use client';
export default function Error({error}: { error: Error }) {
	return (
		<>
			<div>Что-то пошло не так!</div>
			<div>{JSON.stringify(error)}</div>
		</>
	);
};
