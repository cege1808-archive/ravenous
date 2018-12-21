const apiKey = process.env.REACT_APP_YELP_API_KEY;

class Yelp {
  static search(term, location, sortBy){
    const term_query = term ? `term=${term}&` : '';
    const location_query = location ? `location=${location}&` : '';
    const sortBy_query = sortBy ? `sort_by=${sortBy}` : '';
    const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?' + term_query + location_query + sortBy_query;
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.businesses){
        console.log(jsonResponse);
        return jsonResponse.businesses.map((business) => {
          console.log(business);
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.reviewCount
          }
        });
      }
    });
  }
}

export default Yelp;