import PocketBase, { ClientResponseError } from 'pocketbase';

export function recordExists(pb_instance: PocketBase, collection_name: string, field: string, value: string): boolean
{
	try {
		pb_instance.collection(collection_name).getFirstListItem(`${field}="${value}"`);
		return true;

	}
	// what the fuck i dont understand js/ts error handling
	catch (e) {
		if (e instanceof ClientResponseError) {
			if (e.status === 404)
				return false;
		}
		throw(e)

	}

}
