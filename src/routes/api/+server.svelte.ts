import { json, error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {

	const bearerToken = event.request.headers.get('Authorization');
	if (!bearerToken) throw error(401, 'No Bearer Token Provided');
	const key = bearerToken.split(' ')[1]; // Removes the 'Bearer' Prefix
	if (!key) throw error(401, 'Unauthorized');

	const companyDetails = {
		name: 'My Company',
		employees: [
			{ name: 'John Doe', salary: 45000 },
			{ name: 'Jane Larkin', salary: 42000 },
			{ name: 'Jim Salmon', salary: 38000 }
		],
		customers: [
			{ name: 'Bills Toys Inc', income: 30000 },
			{ name: 'Silly Co', income: 25000 },
			{ name: 'Rox R Us', income: 20000 }
		]
	};

	return json(companyDetails);
};
