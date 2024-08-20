import PocketBase, { ClientResponseError } from 'pocketbase';

export async function recordExists(pb_instance: PocketBase, collection_name: string, field: string, value: string): Promise<boolean>
{
	try {
		await pb_instance.collection(collection_name).getFirstListItem(`${field}="${value}"`, { requestKey: null });
		return true;

	}
	// what the fuck i dont understand js/ts error handling
	catch (e) {
		if (e instanceof ClientResponseError) {
			if (e.status === 404)
				return false;
		}
		return false;
		throw(e)

	}

}
