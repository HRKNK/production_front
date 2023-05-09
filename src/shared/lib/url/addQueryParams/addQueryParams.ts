export function getQueryParams(params: Record<string, string>) {
	const searchParams = new URLSearchParams(window.location.search);
	Object.entries(params).forEach(([name, value]) => {
		if (value !== undefined) {
			searchParams.set(name, value);
		}
	});
	// строка параметров (квери)
	return `?${searchParams.toString()}`;
}

//  Функция добавления параметров строки запроса в URL
export function addQueryParams(params: Record<string, string>) {
	window.history.pushState(null, '', getQueryParams(params));
}
