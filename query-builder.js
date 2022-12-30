const createQuery = (requestData) => {
    let query = 'SELECT ad_soyad FROM tbl_musteri';
  
    // Add a WHERE clause to the query based on the request data
    if (requestData.id) {
      query += ` WHERE musteri_id = ${requestData.id}`;
    }
  
    return query;
  };
  
  module.exports = { createQuery };