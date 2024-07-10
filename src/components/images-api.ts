import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "shACk5C_ifX3fCmqEw3T1rVcg4-l_Ll-L6gBwxogGQ8";

interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string
  };
  alt_description?: string;
};

interface UnsplashResponse {
  results: UnsplashPhoto[];
  total_pages: number;
};

interface FetchPhotoResult {
  images: UnsplashPhoto[];
  hasMore: boolean;
}

export const fetchPhotosWithQuery = async (
  keyword: string, 
  page: number = 1, 
  perPage: number = 10): Promise<FetchPhotoResult> => {
  try {
    const response = await axios.get<UnsplashResponse>(`/search/photos`, {
      params: {
        query: keyword,
        page: page,
        per_page: perPage,
        client_id: ACCESS_KEY
      }
    });
    
    return {
      images: response.data.results,
      hasMore: response.data.total_pages > page
    };
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
