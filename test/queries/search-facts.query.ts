export const searchFactsQuery = `
  query SearchFacts($query: String) {
    searchFacts(query: $query) {
      result {
        categories
        created_at
        icon_url
        id
        updated_at
        url
        value
      }
    }
  }
`;
