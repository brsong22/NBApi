export function HandleErrors(response){
  if(!response.ok){
    throw Error(response.statusText);
  }
  return response.json();
}

export function GetPickStats(endpoint){
	fetch(endpoint)
	.then(HandleErrors)
	.then(data => {
		return {data};
	})
	.catch(error => {
	  return {error: true};
	});
}