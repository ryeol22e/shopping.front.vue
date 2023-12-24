export const useEnum = () => {
	const MEMBER_CONST = {
		ADMIN: '10003',
		MEMBER: '10000',
		ANONYMOUS: '9999',
		VIP: '10001',
	};
	const COMMON_CONST = {};

	return {
		COMMON_CONST,
		MEMBER_CONST,
	};
};
