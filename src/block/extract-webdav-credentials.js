export default function extractWebDavCredentials(url) {
	try {
		const sharedLink = new URL(url);
		const pathSegments = sharedLink.pathname.split('/');
		const shareToken = pathSegments[pathSegments.length - 1];

		return {
			webDavUrl: `${sharedLink.origin}/public.php/webdav/`,
			credentials: {

				username: shareToken,
				password: '' // Falls ein Passwort erforderlich ist, muss es separat behandelt werden
			}
		};
	} catch (error) {
		console.error('Fehler bei der Verarbeitung der URL', error);
		return null;
	}
}

